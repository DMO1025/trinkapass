// src/app/actions/purchase-actions.ts
'use server';

import { 
  addSale, 
  getEventById, 
  updateEventStock, 
  getUserById, 
  getSaleById, // Keep for direct sale lookup if needed elsewhere, but webhook will use mpExternalRef
  updateSale,
  updateEventSaleReferenceCounter, // New function to update event counter
  getSaleByMercadoPagoExternalReference 
} from '@/lib/data-service';
import type { PurchaseInitiationData, SaleData, UserData, NewSaleDataInternal, CheckPaymentStatusResult, InitiatePurchaseResult } from '@/lib/types';
import { SERVICE_FEE_PER_TICKET } from '@/lib/constants';
import { createPixPaymentMP, getPaymentStatusMP } from '@/services/mercado-pago-service';
// import { v4 as uuidv4 } from 'uuid'; // No longer needed for tempSaleId if mpExternalReference is the primary external key for MP
import { revalidatePath } from 'next/cache';

export async function initiatePurchaseAction(purchaseData: PurchaseInitiationData): Promise<InitiatePurchaseResult> {
  try {
    const event = await getEventById(purchaseData.evento_id);
    if (!event) {
      return { success: false, error: 'Evento não encontrado.' };
    }
    if (event.quantidade_disponivel < purchaseData.quantidade) {
      return { success: false, error: 'Ingressos insuficientes disponíveis.' };
    }

    // Generate sequential external reference for Mercado Pago
    const currentCounter = event.next_sale_reference_number || 1;
    const eventIdPart = event.id.startsWith('evt-') ? event.id.substring(4, 12) : event.id.substring(0,8);
    const mercadoPagoExternalReference = `TRK-${eventIdPart}-${String(currentCounter).padStart(9, '0')}`;

    const precoIngressoUnitario = event.preco_ingresso;
    const taxaServicoUnitaria = SERVICE_FEE_PER_TICKET;
    const valorTotalItem = precoIngressoUnitario + taxaServicoUnitaria;
    const valorTotalCompra = valorTotalItem * purchaseData.quantidade;

    const mpResult = await createPixPaymentMP(
      valorTotalCompra,
      `Ingressos para ${event.nome_evento} (TrinkaPass)`,
      purchaseData.email_comprador,
      mercadoPagoExternalReference // Use the new sequential reference for MP
    );

    if (!mpResult.success || !mpResult.pixCopyPaste || !mpResult.paymentId) {
      return { success: false, error: mpResult.error || 'Falha ao gerar PIX com o Mercado Pago.' };
    }

    // Update event counter after successful MP PIX generation
    const counterUpdated = await updateEventSaleReferenceCounter(event.id, currentCounter + 1);
    if (!counterUpdated) {
      console.error(`CRITICAL: Failed to update sale reference counter for event ${event.id} after MP PIX generation. Expected next: ${currentCounter + 1}`);
    }

    const newSaleRecord: NewSaleDataInternal = {
      evento_id: purchaseData.evento_id,
      nome_comprador: purchaseData.nome_comprador,
      email_comprador: purchaseData.email_comprador,
      whatsapp: purchaseData.whatsapp,
      quantidade: purchaseData.quantidade,
      preco_ingresso_unitario: precoIngressoUnitario,
      taxa_servico_unitaria: taxaServicoUnitaria,
      valor_total_item: valorTotalItem,
      valor_total_compra: valorTotalCompra,
      data_compra: new Date().toISOString(),
      status: 'pending_payment', 
      pix_copia_cola_mp: mpResult.pixCopyPaste,
      mp_payment_id: mpResult.paymentId, 
      mercado_pago_external_reference: mercadoPagoExternalReference,
    };

    const createdSale = await addSale(newSaleRecord); 
    
    return {
      success: true,
      pixCopyPaste: mpResult.pixCopyPaste,
      qrCodeBase64: mpResult.qrCodeBase64,
      saleId: createdSale.id, 
      totalAmount: valorTotalCompra,
      mpPaymentId: mpResult.paymentId,
      mpExternalReference: mercadoPagoExternalReference, 
    };

  } catch (error) {
    console.error('Error initiating purchase:', error);
    let errorMessage = 'Ocorreu um erro ao iniciar sua compra.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  }
}

export async function checkPaymentStatusAction(mpPaymentId: string, mpExternalReference?: string): Promise<CheckPaymentStatusResult> {
  if (!mpPaymentId) {
    return { success: false, message: 'ID do Pagamento do Mercado Pago não fornecido.' };
  }

  try {
    const mpApiResult = await getPaymentStatusMP(mpPaymentId);

    if (!mpApiResult.success || !mpApiResult.status) {
      return { 
        success: false, 
        message: mpApiResult.error || 'Falha ao verificar status do pagamento com Mercado Pago.',
        mpPaymentId: mpPaymentId,
        saleId: mpExternalReference || mpApiResult.externalReference 
      };
    }

    let userMessage = `Status do Pagamento: ${mpApiResult.status}`;
    let organizerWhatsAppNumber: string | undefined;
    let prefilledWhatsAppMessageToOrganizer: string | undefined;
    
    const effectiveExternalReference = mpApiResult.externalReference || mpExternalReference;

    if (mpApiResult.status === 'approved' && effectiveExternalReference) {
      const saleToConfirm = await getSaleByMercadoPagoExternalReference(effectiveExternalReference);
      if (saleToConfirm) {
        if (saleToConfirm.status === 'pending_payment') {
          console.log(`checkPaymentStatusAction: Confirming sale ${saleToConfirm.id} (MP Ext Ref: ${effectiveExternalReference}) based on MP status 'approved'. Current DB status: '${saleToConfirm.status}'.`);
          const updatedSale = await updateSale(saleToConfirm.id, {
              status: 'paid',
              data_pagamento_confirmado: new Date().toISOString(),
              mp_payment_id: mpApiResult.paymentId, 
          });

          if (updatedSale) {
              console.log(`checkPaymentStatusAction: Sale ${updatedSale.id} status updated to 'paid'. Updating stock.`);
              const stockUpdated = await updateEventStock(updatedSale.evento_id, updatedSale.quantidade);
              if (!stockUpdated) {
                  console.error(`checkPaymentStatusAction: CRITICAL - Failed to update stock for event ${updatedSale.evento_id} after sale ${updatedSale.id} confirmation.`);
              } else {
                  console.log(`checkPaymentStatusAction: Stock for event ${updatedSale.evento_id} updated.`);
              }
              revalidatePath('/');
              revalidatePath(`/event/${updatedSale.evento_id}`);
              revalidatePath('/admin/dashboard'); 
              revalidatePath(`/admin/events/${updatedSale.evento_id}/buyers`); 
              revalidatePath('/organizer/dashboard'); 
              revalidatePath(`/organizer/events/${updatedSale.evento_id}/buyers`); 
              console.log(`checkPaymentStatusAction: Paths revalidated for sale ${updatedSale.id}.`);
          } else {
               console.error(`checkPaymentStatusAction: Failed to update sale ${saleToConfirm.id} in DB.`);
          }
        } else {
            console.log(`checkPaymentStatusAction: Sale ${saleToConfirm.id} (MP Ext Ref: ${effectiveExternalReference}) is already in status '${saleToConfirm.status}'. No DB update needed by manual check.`);
        }
        
        // Prepare WhatsApp info regardless of DB update if MP says approved
        const event = await getEventById(saleToConfirm.evento_id);
        if (event && event.organizer_id) {
            const organizer = await getUserById(event.organizer_id);
            if (organizer && organizer.whatsapp) {
                organizerWhatsAppNumber = `55${organizer.whatsapp.replace(/\D/g, '')}`;
                prefilledWhatsAppMessageToOrganizer = 
`Olá ${organizer.nome || 'Organizador(a)'},
Uma compra de ${saleToConfirm.quantidade} ingresso(s) para o seu evento "${event.nome_evento}" (TrinkaPass) foi APROVADA!
Referência da Compra (Mercado Pago): ${effectiveExternalReference}.
ID da Venda (TrinkaPass): ${saleToConfirm.id}.
Valor total da compra: R$ ${saleToConfirm.valor_total_compra.toFixed(2).replace('.', ',')}.
Nome do Comprador: ${saleToConfirm.nome_comprador}.
Obrigado(a)!`;
            }
        }
      } else {
          console.warn(`checkPaymentStatusAction: Sale with MP External Reference ${effectiveExternalReference} not found, but MP API reported 'approved'.`);
          // User message will be set below if not 'approved'
      }
      userMessage = 'Pagamento Aprovado!'; // This is the primary message if MP status is 'approved'
    } else { // Handle non-approved statuses from MP
        switch (mpApiResult.status) {
        case 'pending_payment':
        case 'in_process':
        case 'pending':
            userMessage = 'Pagamento ainda está pendente ou em processamento.';
            break;
        case 'rejected':
            userMessage = 'Pagamento Rejeitado.';
            break;
        case 'cancelled':
            userMessage = 'Pagamento Cancelado.';
            break;
        case 'refunded':
            userMessage = 'Pagamento Estornado.';
            break;
        case 'charged_back':
            userMessage = 'Pagamento Revertido (Chargeback).';
            break;
        default:
            userMessage = `Status do pagamento: ${mpApiResult.status || 'Desconhecido'}. Aguarde a confirmação.`;
        }
    }

    return {
      success: true,
      paymentStatus: mpApiResult.status, // Return the actual status from MP API
      message: userMessage,
      saleId: effectiveExternalReference, 
      mpPaymentId: mpApiResult.paymentId,
      organizerWhatsAppNumber,
      prefilledWhatsAppMessageToOrganizer,
    };

  } catch (error) {
    console.error(`Error in checkPaymentStatusAction for MP Payment ID ${mpPaymentId}:`, error);
    return { 
      success: false, 
      message: 'Ocorreu um erro interno ao verificar o status do pagamento.',
      mpPaymentId: mpPaymentId,
      saleId: mpExternalReference
    };
  }
}
