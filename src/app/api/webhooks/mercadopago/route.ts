// src/app/api/webhooks/mercadopago/route.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { updateSale, getSaleByMercadoPagoExternalReference, updateEventStock, getEventById } from '@/lib/data-service.server';
import type { SaleData } from '@/lib/types';
import { revalidatePath } from 'next/cache';

const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;

export async function POST(request: NextRequest) {
  console.log('Mercado Pago Webhook Received -- LOGGING_ROUTE_ENTRY_V3_API_CONFIRM');
  let paymentIdFromMP: string | undefined;
  let saleExternalRefFromMPAPI: string | undefined; 

  try {
    const body = await request.json();
    console.log('Webhook Body V3_API_CONFIRM:', JSON.stringify(body, null, 2));

    // TODO: Implement Webhook Signature Verification here

    if (body.type === 'payment') {
      paymentIdFromMP = body.data?.id?.toString();

      if (!paymentIdFromMP) {
        console.error('Webhook V3_API_CONFIRM: Payment ID (body.data.id) not found in webhook payload.');
        return NextResponse.json({ error: 'Payment ID missing in webhook data' }, { status: 400 });
      }

      console.log(`Webhook V3_API_CONFIRM: Processing MP Payment ID ${paymentIdFromMP} from type '${body.type}'. Action: '${body.action}'.`);

      const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

      if (!accessToken) {
        console.error('Webhook V3_API_CONFIRM: Mercado Pago Access Token is not configured.');
        return NextResponse.json({ error: 'Payment processing configuration error.' }, { status: 500 });
      }

      console.log(`Webhook V3_API_CONFIRM: Attempting to fetch payment details from Mercado Pago API for MP Payment ID: ${paymentIdFromMP}.`);
      const mpPaymentResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentIdFromMP}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      console.log(`Webhook V3_API_CONFIRM: Received API response for MP Payment ID ${paymentIdFromMP}. HTTP Status: ${mpPaymentResponse.status}`);
      const mpPayment = await mpPaymentResponse.json();

      if (!mpPaymentResponse.ok) {
        console.error(`Webhook V3_API_CONFIRM: Failed to fetch payment details from Mercado Pago API for ID ${paymentIdFromMP}. Status: ${mpPaymentResponse.status}. Response: ${JSON.stringify(mpPayment)}`);
        return NextResponse.json({ error: 'Failed to verify payment details with Mercado Pago.' }, { status: mpPaymentResponse.status === 401 ? 401 : 500 });
      }

      console.log(`Webhook V3_API_CONFIRM: Successfully fetched MP Payment Details from API for MP Payment ID ${paymentIdFromMP}. Full API Response:`, JSON.stringify(mpPayment, null, 2));

      saleExternalRefFromMPAPI = mpPayment.external_reference;
      const paymentStatusFromAPI = mpPayment.status;

      console.log(`Webhook V3_API_CONFIRM: Details from Mercado Pago API for payment ${paymentIdFromMP} - Status: '${paymentStatusFromAPI}', External Reference: '${saleExternalRefFromMPAPI}'.`);


      if (!saleExternalRefFromMPAPI) {
        console.error(`Webhook V3_API_CONFIRM: external_reference (our MP external_reference) not found in Mercado Pago payment details (fetched from API) for MP Payment ID ${paymentIdFromMP}.`);
        return NextResponse.json({ message: 'Webhook acknowledged, but external_reference missing in MP payment details from API.' }, { status: 200 });
      }

      const sale = await getSaleByMercadoPagoExternalReference(saleExternalRefFromMPAPI);

      if (!sale) {
        console.error(`Webhook V3_API_CONFIRM: Sale with MP External Reference ${saleExternalRefFromMPAPI} (for MP Payment ${paymentIdFromMP}) not found in our database.`);
        return NextResponse.json({ message: 'Sale not found in local DB using MP external_reference, but webhook acknowledged.' }, { status: 200 });
      }

      console.log(`Webhook V3_API_CONFIRM: Found local sale ${sale.id} (MP Ext Ref: ${sale.mercado_pago_external_reference}). Current DB status: '${sale.status}'. Status from Mercado Pago API for payment ${paymentIdFromMP} is: '${paymentStatusFromAPI}'.`);

      if (paymentStatusFromAPI === 'approved') {
        console.log(`Webhook V3_API_CONFIRM: Processing 'approved' status from API for Sale ID: ${sale.id}, MP Payment ID: ${paymentIdFromMP}`);
        if (sale.status === 'pending_payment') {
          console.log(`Webhook V3_API_CONFIRM: Local sale ${sale.id} is 'pending_payment'. Attempting to update to 'paid'.`);
          
          const organizerNetRevenue = sale.preco_ingresso_unitario * sale.quantidade;
          const clearanceDate = new Date(Date.now() + THREE_DAYS_IN_MS).toISOString();

          const updatedSaleData: Partial<SaleData> = {
            status: 'paid',
            data_pagamento_confirmado: new Date().toISOString(),
            mp_payment_id: paymentIdFromMP,
            organizer_net_revenue: organizerNetRevenue,
            organizer_revenue_status: 'pending_clearance',
            organizer_revenue_clearance_date: clearanceDate,
          };
          const updatedSale = await updateSale(sale.id, updatedSaleData);

          if (!updatedSale) {
            console.error(`Webhook V3_API_CONFIRM: CRITICAL - Failed to update sale ${sale.id} to 'paid' in DB.`);
            return NextResponse.json({ error: 'Failed to update sale status in DB' }, { status: 500 });
          }
          console.log(`Webhook V3_API_CONFIRM: Sale ${updatedSale.id} successfully updated to 'paid'. Organizer revenue fields set.`);

          console.log(`Webhook V3_API_CONFIRM: Attempting to update stock for Event ID: ${updatedSale.evento_id} by quantity: ${updatedSale.quantidade}.`);
          const stockUpdated = await updateEventStock(updatedSale.evento_id, updatedSale.quantidade);
          if (!stockUpdated) {
            console.error(`Webhook V3_API_CONFIRM: CRITICAL - Failed to update stock for event ${updatedSale.evento_id} after sale ${updatedSale.id} confirmation. Manual correction REQUIRED.`);
          } else {
            console.log(`Webhook V3_API_CONFIRM: Stock for Event ID ${updatedSale.evento_id} successfully updated.`);
          }

          console.log(`Webhook V3_API_CONFIRM: Payment for sale ${updatedSale.id} approved (confirmed via API) and processed. Stock updated: ${stockUpdated}. Revalidating paths...`);
          revalidatePath('/');
          revalidatePath(`/event/${updatedSale.evento_id}`);
          revalidatePath('/admin/dashboard');
          revalidatePath(`/admin/events/${updatedSale.evento_id}/buyers`);
          revalidatePath('/organizer/dashboard');
          revalidatePath(`/organizer/events/${updatedSale.evento_id}/buyers`);
          console.log(`Webhook V3_API_CONFIRM: Paths revalidated for sale ${updatedSale.id}.`);

        } else if (sale.status === 'paid') {
          console.log(`Webhook V3_API_CONFIRM: Sale ${sale.id} was already 'paid'. MP Payment ID in DB: ${sale.mp_payment_id}, Received MP Payment ID: ${paymentIdFromMP}. API status is 'approved'. No action taken for core sale status, but checking organizer revenue fields.`);
          if (sale.mp_payment_id && sale.mp_payment_id !== paymentIdFromMP) {
            console.warn(`Webhook V3_API_CONFIRM: Sale ${sale.id} was 'paid' with MP_ID ${sale.mp_payment_id}, but API confirmed 'approved' for a new MP_ID ${paymentIdFromMP}. This might be a duplicate payment attempt or a new payment on an already paid sale.`);
          }
          if (!sale.organizer_revenue_clearance_date) {
            const organizerNetRevenue = sale.preco_ingresso_unitario * sale.quantidade;
            const clearanceDate = new Date(Date.now() + THREE_DAYS_IN_MS).toISOString();
            const updatedSale = await updateSale(sale.id, {
                organizer_net_revenue: organizerNetRevenue,
                organizer_revenue_status: 'pending_clearance',
                organizer_revenue_clearance_date: clearanceDate,
            });
             console.log(`Webhook V3_API_CONFIRM: Organizer revenue fields updated for already paid sale ${updatedSale?.id}.`);
          }

        } else {
          console.warn(`Webhook V3_API_CONFIRM: Sale ${sale.id} has status ${sale.status}, but API confirmed 'approved' for MP_ID ${paymentIdFromMP}. Attempting to recover to 'paid'.`);
          
          const organizerNetRevenue = sale.preco_ingresso_unitario * sale.quantidade;
          const clearanceDate = new Date(Date.now() + THREE_DAYS_IN_MS).toISOString();

          const updatedSaleData: Partial<SaleData> = {
            status: 'paid',
            data_pagamento_confirmado: new Date().toISOString(),
            mp_payment_id: paymentIdFromMP,
            organizer_net_revenue: organizerNetRevenue,
            organizer_revenue_status: 'pending_clearance',
            organizer_revenue_clearance_date: clearanceDate,
          };
          const recoveredSale = await updateSale(sale.id, updatedSaleData);
          if (recoveredSale) {
            console.log(`Webhook V3_API_CONFIRM: Sale ${recoveredSale.id} recovered to 'paid'. Attempting stock update.`);
            const stockUpdateRes = await updateEventStock(recoveredSale.evento_id, recoveredSale.quantidade);
            console.log(`Webhook V3_API_CONFIRM: Stock update result for recovered sale ${recoveredSale.id}: ${stockUpdateRes}. Revalidating paths...`);
            revalidatePath('/');
            revalidatePath(`/event/${recoveredSale.evento_id}`);
            revalidatePath('/admin/dashboard');
            revalidatePath(`/admin/events/${recoveredSale.evento_id}/buyers`);
            revalidatePath('/organizer/dashboard');
            revalidatePath(`/organizer/events/${recoveredSale.evento_id}/buyers`);
            console.log(`Webhook V3_API_CONFIRM: Paths revalidated for recovered sale ${recoveredSale.id}.`);
          } else {
            console.error(`Webhook V3_API_CONFIRM: CRITICAL - Failed to recover sale ${sale.id} to 'paid'.`);
          }
        }
      } else if (['rejected', 'cancelled', 'refunded', 'charged_back'].includes(paymentStatusFromAPI)) {
        console.log(`Webhook V3_API_CONFIRM: Processing API status '${paymentStatusFromAPI}' for Sale ID: ${sale.id}, MP Payment ID: ${paymentIdFromMP}`);
        const newStatus = (paymentStatusFromAPI === 'rejected' || paymentStatusFromAPI === 'charged_back') ? 'failed' : 'cancelled';
        if (sale.status === 'pending_payment' || (sale.status === 'paid' && ['refunded', 'charged_back'].includes(paymentStatusFromAPI))) {
          console.log(`Webhook V3_API_CONFIRM: Sale ${sale.id} (current status: ${sale.status}) will be updated to '${newStatus}' based on API.`);
          const updatedSaleData: Partial<SaleData> = {
            status: newStatus as 'failed' | 'cancelled',
            mp_payment_id: paymentIdFromMP,
          };
          const saleBeforeUpdate = { ...sale };
          const updatedSale = await updateSale(sale.id, updatedSaleData);

          if (!updatedSale) {
            console.error(`Webhook V3_API_CONFIRM: CRITICAL - Failed to update sale ${sale.id} to '${newStatus}'.`);
            return NextResponse.json({ error: `Failed to update sale to ${newStatus}` }, { status: 500 });
          }
          console.log(`Webhook V3_API_CONFIRM: Sale ${updatedSale.id} successfully updated to '${newStatus}'.`);

          if (saleBeforeUpdate.status === 'paid' && ['refunded', 'charged_back'].includes(paymentStatusFromAPI)) {
            console.log(`Webhook V3_API_CONFIRM: Sale ${updatedSale.id} changed from 'paid' to '${newStatus}'. Attempting to revert stock for Event ID: ${saleBeforeUpdate.evento_id}.`);
            const event = await getEventById(saleBeforeUpdate.evento_id);
            if (event) {
              const newAvailable = event.quantidade_disponivel + saleBeforeUpdate.quantidade;
              const finalAvailable = Math.min(newAvailable, event.quantidade_total);
              const stockReverted = await updateEventStock(saleBeforeUpdate.evento_id, -saleBeforeUpdate.quantidade, finalAvailable); 
              if (stockReverted) {
                console.log(`Webhook V3_API_CONFIRM: Stock successfully reverted for Event ID ${saleBeforeUpdate.evento_id}.`);
              } else {
                 console.error(`Webhook V3_API_CONFIRM: CRITICAL - Failed to revert stock for Event ID ${saleBeforeUpdate.evento_id}.`);
              }
            } else {
              console.error(`Webhook V3_API_CONFIRM: CRITICAL - Event ${saleBeforeUpdate.evento_id} not found for stock reversion.`);
            }
          }
          console.log(`Webhook V3_API_CONFIRM: Revalidating paths for sale ${updatedSale.id} due to status ${newStatus}.`);
          revalidatePath(`/event/${updatedSale.evento_id}`);
          revalidatePath('/admin/dashboard');
          revalidatePath(`/admin/events/${updatedSale.evento_id}/buyers`);
          revalidatePath('/organizer/dashboard');
          revalidatePath(`/organizer/events/${updatedSale.evento_id}/buyers`);
          console.log(`Webhook V3_API_CONFIRM: Paths revalidated for sale ${updatedSale.id}.`);
        } else {
          console.log(`Webhook V3_API_CONFIRM: Sale ${sale.id} (status: ${sale.status}) received API status '${paymentStatusFromAPI}'. No status change needed based on current logic.`);
        }
      } else if (paymentStatusFromAPI === 'pending' || paymentStatusFromAPI === 'in_process') {
        console.log(`Webhook V3_API_CONFIRM: Processing API status '${paymentStatusFromAPI}' for Sale ID: ${sale.id}, MP Payment ID: ${paymentIdFromMP}`);
        if (sale.status !== 'pending_payment' && sale.status !== 'paid') {
          console.log(`Webhook V3_API_CONFIRM: Sale ${sale.id} (current status: ${sale.status}) will be updated to 'pending_payment' based on API.`);
          const updatedSaleData: Partial<SaleData> = {
            status: 'pending_payment',
            mp_payment_id: paymentIdFromMP,
          };
          await updateSale(sale.id, updatedSaleData);
          console.log(`Webhook V3_API_CONFIRM: Sale ${sale.id} updated to 'pending_payment'.`);
        } else {
          console.log(`Webhook V3_API_CONFIRM: Received API status '${paymentStatusFromAPI}' for sale ${sale.id}. Local status is '${sale.status}'. No change made.`);
        }
      } else {
        console.warn(`Webhook V3_API_CONFIRM: Received unhandled MP payment status "${paymentStatusFromAPI}" from API for MP Payment ID ${paymentIdFromMP} (Sale ID ${sale.id}).`);
      }

      console.log(`Webhook V3_API_CONFIRM: Successfully processed request for Sale ID: ${sale?.id}, MP Payment ID: ${paymentIdFromMP}. Returning 200 OK to Mercado Pago.`);
      return NextResponse.json({ message: 'Webhook processed successfully using API confirmation.' }, { status: 200 });
    }

    console.warn('Webhook V3_API_CONFIRM: Event type not handled or missing payment data. Type:', body.type, 'Action:', body.action);
    return NextResponse.json({ message: 'Event type not handled by this webhook.' }, { status: 200 });

  } catch (error) {
    let errorMessage = 'Internal server error processing webhook';
    if (error instanceof SyntaxError) {
      errorMessage = 'Invalid JSON payload from webhook';
      console.error(`Webhook V3_API_CONFIRM Syntax Error: ${errorMessage}. Request details may not be available if parsing failed early.`, error);
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error(`Webhook V3_API_CONFIRM General Error: ${errorMessage}. MP Payment ID (if available): ${paymentIdFromMP}, Sale Ext Ref from MP API (if available): ${saleExternalRefFromMPAPI}.`, error);
    return NextResponse.json({ error: 'Internal server error processing webhook' }, { status: 500 });
  }
}
