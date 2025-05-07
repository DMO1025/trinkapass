// src/app/event/[id]/page.tsx
'use client'; 

import * as React from 'react';
import { getEventById } from '@/lib/data-service'; 
import type { EventData } from '@/lib/types';
import Image from 'next/image';
import { CalendarDays, MapPin, ShoppingCart, Share2 } from 'lucide-react';
import PurchaseForm from '@/components/purchase-form';
import { useState, useEffect, use } from 'react';
import { useToast } from '@/hooks/use-toast';


interface EventPageParams {
  params: { id: string };
}

export default function EventPage({ params: paramsProp }: EventPageParams) {
  const params = use(paramsProp);
  const { toast } = useToast();

  const [event, setEvent] = useState<EventData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [formattedDate, setFormattedDate] = useState('');
  const [formattedTime, setFormattedTime] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');

  useEffect(() => {
    setIsMounted(true); 
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    const eventId = params?.id; 

    async function fetchEventDetails() {
      if (!eventId) {
        setError("ID do evento não fornecido.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true); 
      setError(null);
      try {
        const fetchedEvent = await getEventById(eventId);
        if (!fetchedEvent) {
          setError("Evento não encontrado.");
        } else {
          setEvent(fetchedEvent);
          const eventDateObj = new Date(fetchedEvent.data_horario);
          const timeZone = 'America/Sao_Paulo';
          setFormattedDate(eventDateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', timeZone }));
          setFormattedTime(eventDateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone, hour12: false }).replace(':', 'H'));
          setDayOfWeek(eventDateObj.toLocaleDateString('pt-BR', { weekday: 'long', timeZone }).replace("-feira", ""));
        }
      } catch (e) {
        console.error("Failed to fetch event details:", e);
        setError("Falha ao carregar detalhes do evento.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchEventDetails();
  }, [params?.id, isMounted]);


  const copyToClipboardFallback = async (url: string, failureMessage?: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: 'Link Copiado!',
        description: failureMessage || 'O link do evento foi copiado para a área de transferência.',
        variant: 'default',
      });
    } catch (copyError) {
      toast({
        title: 'Erro ao Copiar Link',
        description: 'Não foi possível copiar o link do evento. Por favor, copie manualmente.',
        variant: 'destructive',
      });
      console.error('Error copying link to clipboard:', copyError);
    }
  };

  const handleShare = async () => {
    if (!event) return;
    const shareData = {
      title: event.nome_evento,
      text: `Confira este evento: ${event.nome_evento} - ${formattedDate} às ${formattedTime}. Saiba mais e compre ingressos!`,
      url: window.location.href,
    };

    if (navigator.share && typeof navigator.share === 'function') {
      try {
        await navigator.share(shareData);
        toast({
          title: 'Evento Compartilhado!',
          description: 'O link do evento foi compartilhado.',
        });
      } catch (error) {
        await copyToClipboardFallback(shareData.url, 'Compartilhamento nativo falhou. Link copiado!');
      }
    } else {
      await copyToClipboardFallback(shareData.url, 'Compartilhamento nativo não disponível. Link copiado!');
    }
  };


  if (!isMounted) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando detalhes do evento...</span>
        </div>
        <p className="mt-2">Carregando detalhes do evento...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center py-5">
        <h1 className="display-5 fw-bold text-danger">Erro</h1>
        <p className="text-muted mt-2">{error}</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container text-center py-5">
        <h1 className="display-5 fw-bold text-danger">Evento não encontrado</h1>
        <p className="text-muted mt-2">O evento que você está procurando não existe ou foi removido.</p>
      </div>
    );
  }

  const isSoldOut = event.quantidade_disponivel <= 0;

  return (
    <div className="container-fluid container-lg py-4 py-md-5">
      <div className="card border">
        <div className="card-body p-3 p-md-4">
          <div className="row g-3 g-md-4">
            <div className="col-md-4 col-lg-3">
              <div className="position-relative w-100" style={{ aspectRatio: '3/4' }}>
                <Image
                  src={event.imagem_url || `https://picsum.photos/seed/${event.id}/600/800`}
                  alt={event.nome_evento}
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                  priority
                  data-ai-hint="event poster"
                />
              </div>
            </div>
            <div className="col-md-8 col-lg-9">
              <div className="d-flex flex-column h-100">
                <div className="position-relative">
                  <button 
                    onClick={handleShare} 
                    className="btn btn-sm btn-link text-secondary p-0 position-absolute top-0 end-0"
                    aria-label="Compartilhar evento"
                    title="Compartilhar evento"
                  >
                    <Share2 size={24} />
                  </button>
                  <h1 className="fs-2 fw-bold text-primary mb-1">
                    {event.nome_evento} - {formattedTime}
                  </h1>
                  <p className="text-muted mb-2">
                    {dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)}, {formattedDate}
                  </p>
                </div>

                <div className="mt-2">
                  <p className="fw-semibold text-dark mb-0">{event.nome_local_evento || 'Local a definir'}</p>
                  <p className="text-muted small">{event.local}, {event.cidade} - {event.cep}</p>
                </div>
                
                <div className="mt-auto d-flex flex-column align-items-start align-items-md-end pt-3">
                    <div className="mb-2 text-md-end">
                        <p className="fs-5 fw-bold text-primary mb-0">R$ {event.preco_ingresso.toFixed(2).replace('.', ',')}</p>
                        <p className="small text-muted">
                            {isSoldOut ? <span className="text-danger fw-semibold">Esgotado</span> : `${event.quantidade_disponivel} ingressos disponíveis`}
                        </p>
                    </div>
                    {isSoldOut ? (
                        <button 
                            type="button" 
                            className="btn btn-danger btn-lg fw-semibold w-100 w-md-auto"
                            disabled
                        >
                            Ingressos Esgotados
                        </button>
                    ) : (
                        <button 
                            type="button" 
                            className="btn btn-accent btn-lg fw-semibold w-100 w-md-auto d-flex align-items-center justify-content-center gap-2"
                            onClick={() => setShowPurchaseModal(true)}
                        >
                            <ShoppingCart className="h-5 w-5" /> Comprar
                        </button>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {event.descricao && (
          <>
            <hr className="my-0" />
            <div className="card-body p-3 p-md-4">
              <h2 className="fs-4 fw-semibold text-dark mb-3">Sobre o Evento</h2>
              <div className="text-dark lh-lg" dangerouslySetInnerHTML={{ __html: event.descricao.replace(/\n/g, '<br />') }} />
            </div>
          </>
        )}
      </div>

      {showPurchaseModal && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={(e) => { if (e.target === e.currentTarget) setShowPurchaseModal(false);}}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-light">
                <h5 className="modal-title text-primary d-flex align-items-center gap-2">
                   <ShoppingCart className="h-6 w-6" /> Comprar Ingresso - {event.nome_evento}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowPurchaseModal(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body p-4">
                <PurchaseForm event={event} onModalClose={() => setShowPurchaseModal(false)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
