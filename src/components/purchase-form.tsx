
'use client';

import type { EventData, PurchaseFormValues } from '@/lib/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect, useMemo } from 'react';
import { Loader2, ShoppingCart, ClipboardCopy, CreditCard, AlertTriangle, Info, CheckCircle, RefreshCw, MinusCircle, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import { initiatePurchaseAction, checkPaymentStatusAction } from '@/app/actions/purchase-actions';
import { getServiceFeeAction } from '@/app/actions/settings-actions'; // Import to get service fee
import { Textarea } from '@/components/ui/textarea';


interface PurchaseFormProps {
  event: EventData;
  onModalClose?: () => void; 
}

const purchaseSchema = z.object({
  nome_comprador: z.string().min(3, { message: 'Nome completo é obrigatório e deve ter pelo menos 3 caracteres.' }),
  email_comprador: z.string().email({ message: 'E-mail inválido.' }),
  whatsapp: z.string().regex(/^\d{10,11}$/, { message: 'WhatsApp inválido. Use apenas números (Ex: 11988887777).' }),
  quantidade: z.number().min(1, { message: 'Selecione pelo menos 1 ingresso.' }).max(5, {message: 'Máximo de 5 ingressos por compra.'}),
});

interface StoredPurchaseDetails {
  eventId: string;
  pixCopyPaste: string;
  qrCodeBase64: string | null;
  saleId: string;
  totalAmount: number;
  mpPaymentId: string;
  mpExternalReference: string;
  formValues?: PurchaseFormValues;
}

export default function PurchaseForm({ event, onModalClose }: PurchaseFormProps) {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [currentPixCode, setCurrentPixCode] = useState<string | null>(null);
  const [currentQrCodeBase64, setCurrentQrCodeBase64] = useState<string | null>(null);
  const [currentSaleId, setCurrentSaleId] = useState<string | null>(null);
  const [currentTotalAmount, setCurrentTotalAmount] = useState<number>(0);
  const [currentMpPaymentId, setCurrentMpPaymentId] = useState<string | null>(null);
  const [currentMpExternalReference, setCurrentMpExternalReference] = useState<string | null>(null);
  const [paymentConfirmedByClientCheck, setPaymentConfirmedByClientCheck] = useState(false);
  
  const [maxTickets, setMaxTickets] = useState(5); 
  const [serviceFeePerTicket, setServiceFeePerTicket] = useState<number>(0);

  const storageKey = useMemo(() => `trinkapass_pending_purchase_${event?.id}`, [event?.id]);

  const form = useForm<PurchaseFormValues>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {
      nome_comprador: '',
      email_comprador: '',
      whatsapp: '',
      quantidade: 1,
    },
  });

  const { register, handleSubmit, watch, setValue, formState: { errors }, reset, getValues } = form;
  const selectedQuantity = watch('quantidade');

  const totalEventPrice = useMemo(() => event.preco_ingresso * selectedQuantity, [event.preco_ingresso, selectedQuantity]);
  const totalServiceFee = useMemo(() => serviceFeePerTicket * selectedQuantity, [selectedQuantity, serviceFeePerTicket]);
  const finalPurchaseAmount = useMemo(() => totalEventPrice + totalServiceFee, [totalEventPrice, totalServiceFee]);

  useEffect(() => {
    async function fetchFee() {
        const fee = await getServiceFeeAction();
        setServiceFeePerTicket(fee);
    }
    fetchFee();
  }, []);

  useEffect(() => {
    setMaxTickets(Math.min(5, event.quantidade_disponivel));
    if (selectedQuantity > Math.min(5, event.quantidade_disponivel)) {
        setValue('quantidade', Math.min(5, event.quantidade_disponivel));
    }
  }, [event.quantidade_disponivel, selectedQuantity, setValue]);
  
  useEffect(() => {
    if (maxTickets > 0 && selectedQuantity === 0) {
        setValue('quantidade', 1);
    } else if (maxTickets === 0) {
        setValue('quantidade', 0);
    }
  }, [maxTickets, selectedQuantity, setValue]);


  useEffect(() => {
    if (!event?.id) return;
    const storedPurchaseDataString = localStorage.getItem(storageKey);
    if (storedPurchaseDataString) {
      try {
        const parsedData: StoredPurchaseDetails = JSON.parse(storedPurchaseDataString);
        if (parsedData.eventId === event.id) {
          setCurrentPixCode(parsedData.pixCopyPaste);
          setCurrentQrCodeBase64(parsedData.qrCodeBase64 || null);
          setCurrentSaleId(parsedData.saleId);
          setCurrentTotalAmount(parsedData.totalAmount);
          setCurrentMpPaymentId(parsedData.mpPaymentId);
          setCurrentMpExternalReference(parsedData.mpExternalReference);
          if (parsedData.formValues) {
            reset(parsedData.formValues);
            if (parsedData.formValues.quantidade > maxTickets) {
                setValue('quantidade', maxTickets > 0 ? 1 : 0);
            }
          } else if (maxTickets > 0) {
             setValue('quantidade', 1);
          } else {
             setValue('quantidade', 0);
          }
          setShowPaymentDetails(true);
        } else {
          localStorage.removeItem(storageKey);
        }
      } catch (e) {
        console.error("Error parsing pending purchase data from localStorage", e);
        localStorage.removeItem(storageKey);
      }
    } else if (maxTickets > 0) { 
        setValue('quantidade', 1);
    }
  }, [event?.id, storageKey, reset, maxTickets, setValue]);

  useEffect(() => {
    if (paymentConfirmedByClientCheck && event?.id) {
      localStorage.removeItem(storageKey);
    }
  }, [paymentConfirmedByClientCheck, event?.id, storageKey]);

  const onSubmit: SubmitHandler<PurchaseFormValues> = async (data) => {
    if (data.quantidade === 0 && maxTickets > 0) {
        toast({ title: 'Quantidade Inválida', description: 'Selecione pelo menos 1 ingresso.', variant: 'destructive'});
        return;
    }
    if (data.quantidade === 0 && maxTickets === 0) {
        toast({ title: 'Ingressos Esgotados', description: 'Não há ingressos disponíveis para este evento.', variant: 'destructive'});
        return;
    }
    setIsProcessing(true); 
    setPaymentConfirmedByClientCheck(false);
    
    const result = await initiatePurchaseAction({ evento_id: event.id, ...data });

    if (result.success && result.pixCopyPaste && result.saleId && result.totalAmount && result.mpPaymentId && result.mpExternalReference) {
      setCurrentPixCode(result.pixCopyPaste);
      setCurrentQrCodeBase64(result.qrCodeBase64 || null);
      setCurrentSaleId(result.saleId); 
      setCurrentTotalAmount(result.totalAmount);
      setCurrentMpPaymentId(result.mpPaymentId);
      setCurrentMpExternalReference(result.mpExternalReference);
      setShowPaymentDetails(true);

      const purchaseToStore: StoredPurchaseDetails = {
        eventId: event.id,
        pixCopyPaste: result.pixCopyPaste,
        qrCodeBase64: result.qrCodeBase64 || null,
        saleId: result.saleId,
        totalAmount: result.totalAmount,
        mpPaymentId: result.mpPaymentId,
        mpExternalReference: result.mpExternalReference,
        formValues: getValues(),
      };
      localStorage.setItem(storageKey, JSON.stringify(purchaseToStore));
      
      toast({
        title: 'PIX Gerado com Sucesso!',
        description: 'Copie o código PIX ou escaneie o QR Code para finalizar. A confirmação será automática.',
        variant: 'default',
        duration: 8000,
      });
    } else {
       toast({ title: 'Erro ao Iniciar Compra', description: result.error || 'Não foi possível gerar os detalhes de pagamento. Tente novamente.', variant: 'destructive'});
    }
    setIsProcessing(false); 
  };

  const handleCopyPixCode = async () => {
    if (!currentPixCode) return;
    try {
      await navigator.clipboard.writeText(currentPixCode);
      toast({ title: 'Código PIX Copiado!', description: 'O código PIX foi copiado para a área de transferência.', variant: 'default'});
    } catch (err) {
      console.error('Failed to copy PIX code: ', err);
      toast({ title: 'Erro ao Copiar', description: 'Não foi possível copiar o código PIX. Tente manualmente.', variant: 'destructive'});
    }
  };

  const handleCheckPaymentStatus = async () => {
    if (!currentMpPaymentId) {
      toast({ title: 'Erro', description: 'ID de pagamento não encontrado para verificação.', variant: 'destructive' });
      return;
    }
    setIsCheckingStatus(true);
    const result = await checkPaymentStatusAction(currentMpPaymentId, currentMpExternalReference || undefined);
    setIsCheckingStatus(false);

    if (result.success && result.paymentStatus === 'approved') {
      setPaymentConfirmedByClientCheck(true); 
      localStorage.removeItem(storageKey);
      if (result.organizerWhatsAppNumber && result.prefilledWhatsAppMessageToOrganizer) {
        const whatsappUrl = `https://wa.me/${result.organizerWhatsAppNumber}?text=${encodeURIComponent(result.prefilledWhatsAppMessageToOrganizer)}`;
        window.open(whatsappUrl, '_blank');
        toast({ title: "Pagamento Confirmado!", description: result.message + " Você será redirecionado para o WhatsApp para informar o organizador.", variant: "default", duration: 10000 });
      } else {
         toast({ title: 'Pagamento Aprovado!', description: result.message, variant: 'default' });
      }
      if (onModalClose) onModalClose(); 
    } else {
       toast({ title: result.success ? 'Status do Pagamento' : 'Erro ao Verificar Status', description: result.message, variant: result.success ? 'default' : 'destructive' });
    }
  };
  
  const resetFormAndHideDetails = (clearStorage = true) => {
    setShowPaymentDetails(false); setCurrentPixCode(null); setCurrentQrCodeBase64(null); setCurrentSaleId(null);
    setCurrentMpPaymentId(null); setCurrentMpExternalReference(null); setPaymentConfirmedByClientCheck(false);
    setIsProcessing(false); 
    form.reset({
      nome_comprador: '',
      email_comprador: '',
      whatsapp: '',
      quantidade: maxTickets > 0 ? 1 : 0,
    }); 
    if (clearStorage && event?.id) localStorage.removeItem(storageKey);
    if (onModalClose) onModalClose(); 
  };

  const handleQuantityChange = (change: number) => {
    const currentVal = selectedQuantity;
    const newVal = currentVal + change;
    if (newVal >= 1 && newVal <= maxTickets) {
      setValue('quantidade', newVal, { shouldValidate: true });
    }
  };

  if (showPaymentDetails && currentPixCode) {
    return (
      <div className="card border-0"> 
        <div className="card-body p-0"> 
          {paymentConfirmedByClientCheck ? (
            <div className="text-center p-3 bg-success-subtle border border-success rounded-3">
                <CheckCircle className="h-16 w-16 text-success mx-auto mb-3" />
                <p className="fs-5 fw-semibold text-success">Seu pagamento foi aprovado!</p>
                <p className="small text-success-emphasis">A confirmação foi processada. Seus ingressos estão garantidos! Se aplicável, você foi redirecionado para notificar o organizador via WhatsApp.</p>
                 <button onClick={() => resetFormAndHideDetails(true)} className="btn btn-primary w-100 mt-3">
                    Comprar Mais Ingressos (Fechar)
                </button>
            </div>
          ) : (
            <div className="vstack gap-4">
              {currentQrCodeBase64 ? (
                <div className="d-flex justify-content-center p-3 bg-light rounded-3">
                  <Image src={`data:image/png;base64,${currentQrCodeBase64}`} alt={`QR Code para ${event.nome_evento}`} width={200} height={200} className="rounded" data-ai-hint="payment QR code"/>
                </div>
              ) : (
                <div className="d-flex justify-content-center p-3 bg-light rounded-3 position-relative" style={{height: '200px'}}>
                  <Image src={event.imagem_url || `https://picsum.photos/seed/${event.id}/400/200`} alt={`Imagem ${event.nome_evento}`} layout="fill" objectFit="cover" className="rounded" data-ai-hint="event image banner"/>
                </div>
              )}
              <div>
                <label htmlFor="pixCode" className="form-label small text-muted">PIX Copia e Cola (Mercado Pago):</label>
                <div className="input-group">
                    <Textarea 
                        id="pixCode" 
                        readOnly 
                        value={currentPixCode} 
                        className="form-control form-control-sm small bg-light" 
                        rows={3} 
                        style={{resize: 'none'}} 
                    />
                    <button className="btn btn-secondary" type="button" onClick={handleCopyPixCode} aria-label="Copiar código PIX">
                        <ClipboardCopy className="h-4 w-4" />
                    </button>
                </div>
              </div>
              
              <p className="text-center fw-semibold fs-5 text-dark">Valor Total: R$ {currentTotalAmount.toFixed(2).replace('.', ',')}</p>
              
              <div className="alert alert-info small d-flex align-items-start gap-2">
                <Info className="h-5 w-5 flex-shrink-0 mt-1" />
                <div>
                    <strong className="d-block">Aguardando Pagamento</strong>
                    <p className="mb-1">Após efetuar o pagamento PIX, a confirmação será processada automaticamente pelo nosso sistema (via webhook). Você pode usar o botão abaixo para uma verificação manual.</p>
                    <p className="mb-0">Se você fechar esta página, pode acompanhar o status da sua compra através do seu e-mail ou contato com o organizador caso tenha problemas.</p>
                </div>
              </div>

              <button onClick={handleCheckPaymentStatus} className="btn btn-secondary w-100 d-flex align-items-center justify-content-center gap-2" disabled={isCheckingStatus}>
                {isCheckingStatus ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : <RefreshCw className="me-2 h-4 w-4" />}
                Verificar Status
              </button>

              <button onClick={() => resetFormAndHideDetails(true)} className="btn btn-dark w-100 text-white" disabled={isProcessing || isCheckingStatus}>
                Voltar e Alterar Dados (Cancela este PIX)
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="card border-0"> 
      <div className="card-body p-0"> 
        <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" noValidate>
          <div className="mb-3">
            <label htmlFor="nome_comprador" className="form-label fw-medium">Nome Completo</label>
            <input id="nome_comprador" {...register('nome_comprador')} className={`form-control ${errors.nome_comprador ? 'is-invalid' : ''}`} />
            {errors.nome_comprador && <div className="invalid-feedback">{errors.nome_comprador.message}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="email_comprador" className="form-label fw-medium">E-mail</label>
            <input id="email_comprador" type="email" {...register('email_comprador')} className={`form-control ${errors.email_comprador ? 'is-invalid' : ''}`} />
            {errors.email_comprador && <div className="invalid-feedback">{errors.email_comprador.message}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="whatsapp" className="form-label fw-medium">WhatsApp (somente números)</label>
            <input id="whatsapp" type="tel" {...register('whatsapp')} className={`form-control ${errors.whatsapp ? 'is-invalid' : ''}`} placeholder="Ex: 11988887777" />
            {errors.whatsapp && <div className="invalid-feedback">{errors.whatsapp.message}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="quantidade" className="form-label fw-medium">Quantidade de Ingressos</label>
            <div className={`d-flex align-items-center justify-content-center border rounded-2 p-2 ${maxTickets === 0 || errors.quantidade ? 'border-danger' : 'border-input'}`}>
              <button 
                type="button" 
                onClick={() => handleQuantityChange(-1)} 
                disabled={selectedQuantity <= 1 || maxTickets === 0}
                className="btn btn-outline-secondary btn-sm p-1"
                aria-label="Diminuir quantidade"
              >
                <MinusCircle size={20} />
              </button>
              <input 
                type="text"
                id="quantidade-display"
                value={maxTickets === 0 ? 'Esgotado' : selectedQuantity} 
                readOnly 
                className="form-control-plaintext text-center fw-bold mx-2" 
                style={{width: '60px', appearance: 'none', MozAppearance: 'textfield'}}
                aria-live="polite"
              />
              <button 
                type="button" 
                onClick={() => handleQuantityChange(1)} 
                disabled={selectedQuantity >= maxTickets || maxTickets === 0}
                className="btn btn-outline-secondary btn-sm p-1"
                aria-label="Aumentar quantidade"
              >
                <PlusCircle size={20} />
              </button>
            </div>
            <input type="hidden" {...register('quantidade', { valueAsNumber: true })} />
            {errors.quantidade && <div className="text-danger small mt-1">{errors.quantidade.message}</div>}
            {maxTickets === 0 && !errors.quantidade && <div className="text-danger small mt-1">Não há ingressos disponíveis.</div>}
          </div>
          
          <div className="text-end small text-muted pt-2">
            <p className="mb-0">Ingressos: R$ {totalEventPrice.toFixed(2).replace('.', ',')}</p>
            <p className="mb-0">Taxa de Serviço: R$ {totalServiceFee.toFixed(2).replace('.', ',')}</p>
          </div>
          <div className="fs-5 fw-semibold text-end text-primary mb-3">
            Total: R$ {finalPurchaseAmount.toFixed(2).replace('.', ',')}
          </div>

          <button type="submit" className="btn btn-accent w-100 btn-lg fw-semibold d-flex align-items-center justify-content-center gap-2" disabled={isProcessing || maxTickets === 0 || selectedQuantity === 0}>
            {isProcessing ? <Loader2 className="me-2 h-5 w-5 animate-spin" /> : <CreditCard className="me-2 h-5 w-5" />}
            Gerar PIX para Pagamento
          </button>
        </form>
      </div>
    </div>
  );
}

