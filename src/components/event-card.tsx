
'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { EventData } from '@/lib/types';
import { CalendarDays, MapPin, Ticket, Users, DollarSign, Building, Home as HomeIcon, Share2 } from 'lucide-react';
import * as React from 'react';
import { useToast } from '@/hooks/use-toast';

interface EventCardProps {
  event: EventData;
  isFeatured?: boolean;
}

export default function EventCard({ event, isFeatured = false }: EventCardProps) {
  const { toast } = useToast();
  const [formattedDate, setFormattedDate] = React.useState('');
  const [formattedTime, setFormattedTime] = React.useState('');

  React.useEffect(() => {
    if (event.data_horario) {
      const eventDate = new Date(event.data_horario);
      const timeZone = 'America/Sao_Paulo'; 

      setFormattedDate(eventDate.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        timeZone,
      }));
      setFormattedTime(eventDate.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone,
      }));
    }
  }, [event.data_horario]);

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
    const shareData = {
      title: event.nome_evento,
      text: `Confira este evento: ${event.nome_evento} - ${formattedDate} às ${formattedTime}. Saiba mais e compre ingressos!`,
      url: `${window.location.origin}/event/${event.id}`,
    };

    if (navigator.share && typeof navigator.share === 'function') {
      try {
        await navigator.share(shareData);
        toast({
          title: 'Evento Compartilhado!',
          description: 'O link do evento foi compartilhado.',
        });
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            console.log('Share cancelled by user.');
          } else if (error.name === 'NotAllowedError' || error.message.toLowerCase().includes('permission denied')) {
            console.warn('Native share failed (NotAllowedError/PermissionDenied):', error.message, 'Attempting to copy link to clipboard.');
            toast({
              title: 'Compartilhamento Falhou',
              description: 'Não foi possível usar o compartilhamento nativo. Tentando copiar o link...',
              variant: 'warning', 
              duration: 4000,
            });
            await copyToClipboardFallback(shareData.url);
          } else {
            console.error('Error sharing natively:', error);
            toast({
              title: 'Erro ao Compartilhar',
              description: 'Não foi possível compartilhar o evento. Tentando copiar o link...',
              variant: 'destructive',
            });
            await copyToClipboardFallback(shareData.url);
          }
        } else {
          console.error('Unknown error sharing natively:', error);
          toast({
            title: 'Erro Desconhecido',
            description: 'Ocorreu um erro desconhecido ao tentar compartilhar. Tentando copiar o link...',
            variant: 'destructive',
          });
          await copyToClipboardFallback(shareData.url);
        }
      }
    } else {
      console.log('Web Share API not supported. Falling back to clipboard copy.');
      await copyToClipboardFallback(shareData.url, 'Compartilhamento nativo não disponível. Link copiado!');
    }
  };


  if (isFeatured) {
    const backgroundImageUrl = event.imagem_url || `https://picsum.photos/seed/${event.id}/1200/800`;
    return (
      <div 
        className="position-relative text-white w-100" 
        style={{
          minHeight: '60vh', 
          maxHeight: '85vh', 
          height: 'calc(100vw * 9 / 16 * 0.8)', 
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
        }}
        data-ai-hint="event hero background"
      >
        <div 
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)' }} 
        />
        <div className="container-fluid container-lg h-100">
            <div className="position-relative z-1 d-flex flex-column justify-content-end h-100 p-3 p-sm-4 p-md-5">
                <h2 className="display-4 display-sm-3 display-md-2 fw-bold mb-2">{event.nome_evento}</h2>
                <p className="fs-5 fs-sm-4 mb-1"><CalendarDays className="d-inline me-2 h-5 w-5" />{formattedDate} às {formattedTime}</p>
                {event.nome_local_evento && <p className="fs-5 fs-sm-4 mb-1"><HomeIcon className="d-inline me-2 h-5 w-5" />{event.nome_local_evento}</p>}
                <p className="fs-5 fs-sm-4 mb-1"><MapPin className="d-inline me-2 h-5 w-5" />{event.local}</p>
                <p className="fs-5 fs-sm-4 mb-3"><Building className="d-inline me-2 h-5 w-5" />{event.cidade}</p>
                <div className="d-flex flex-wrap gap-2 align-self-start">
                  <Link href={`/event/${event.id}`} className="btn btn-primary btn-lg fw-semibold py-2 px-4 fs-5"> 
                    <Ticket className="me-2 h-5 w-5" />
                    Ver Detalhes
                  </Link>
                  {/* Share button removed from featured card as per request */}
                </div>
            </div>
        </div>
      </div>
    );
  }

  // Standard card
  return (
    <div className="card h-100 border"> {/* Removed shadow-sm hover-shadow-lg transition-shadow */}
      <div className="position-relative" style={{paddingTop: '56.25%' /* 16:9 Aspect Ratio */}}>
        <Image
          src={event.imagem_url || `https://picsum.photos/seed/${event.id}/600/338`}
          alt={event.nome_evento}
          layout="fill"
          objectFit="cover"
          className="card-img-top"
          data-ai-hint="event concert festival"
        />
      </div>
      <div className="card-body d-flex flex-column">
        <h3 className="card-title fs-4 fw-semibold text-primary">{event.nome_evento}</h3>
        <p className="card-text text-muted small flex-grow-1" style={{maxHeight: '60px', overflow: 'hidden', textOverflow: 'ellipsis'}}>
          {event.descricao}
        </p>
        <div className="vstack gap-2 small text-dark mt-2">
          <div className="d-flex align-items-center"><CalendarDays className="me-2 h-5 w-5 text-primary flex-shrink-0" /><span>{formattedDate} às {formattedTime}</span></div>
          {event.nome_local_evento && <div className="d-flex align-items-center"><HomeIcon className="me-2 h-5 w-5 text-primary flex-shrink-0" /><span>{event.nome_local_evento}</span></div>}
          <div className="d-flex align-items-center"><MapPin className="me-2 h-5 w-5 text-primary flex-shrink-0" /><span>{event.local}</span></div>
          <div className="d-flex align-items-center"><Building className="me-2 h-5 w-5 text-primary flex-shrink-0" /><span>{event.cidade}</span></div>
          <div className="d-flex align-items-center"><DollarSign className="me-2 h-5 w-5 text-primary flex-shrink-0" /><span>R$ {event.preco_ingresso.toFixed(2).replace('.', ',')}</span></div>
          <div className="d-flex align-items-center"><Users className="me-2 h-5 w-5 text-primary flex-shrink-0" /><span>{event.quantidade_disponivel} ingressos disponíveis</span></div>
        </div>
      </div>
      <div className="card-footer bg-transparent border-top-0 p-3 d-flex flex-column flex-sm-row gap-2">
        <Link href={`/event/${event.id}`} className="btn btn-primary w-100 fw-semibold d-flex align-items-center justify-content-center gap-2">
          <Ticket className="h-5 w-5" /> Comprar Ingresso
        </Link>
        <button onClick={handleShare} className="btn btn-outline-secondary btn-sm p-2" title="Compartilhar"> {/* Changed to icon-only */}
          <Share2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

