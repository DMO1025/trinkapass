
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getEventById, getSalesByEventId } from '@/lib/data-service.server';
import type { EventData, SaleData } from '@/lib/types';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, ArrowLeft, Users, AlertTriangle, Ticket, Send, BadgeCheck, BadgeAlert, BadgeX } from 'lucide-react';
import Link from 'next/link';

export default function AdminEventBuyersPage() {
  const params = useParams();
  const eventId = params.eventId as string;
  const router = useRouter();
  const { adminUser, isLoading: authLoading } = useAuth(); 

  const [event, setEvent] = useState<EventData | null>(null);
  const [sales, setSales] = useState<SaleData[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!eventId || !adminUser) return; 
      setIsLoadingData(true);
      setError(null);
      try {
        const fetchedEvent = await getEventById(eventId);
        if (!fetchedEvent) {
          setError("Evento não encontrado.");
          setEvent(null);
          setSales([]);
          setIsLoadingData(false);
          return;
        }
        setEvent(fetchedEvent);
        const fetchedSales = await getSalesByEventId(eventId);
        setSales(fetchedSales);
      } catch (err) {
        console.error("Failed to fetch event/sales data for admin:", err);
        setError("Não foi possível carregar os dados dos compradores. Tente novamente.");
      } finally {
        setIsLoadingData(false);
      }
    }

    if (!authLoading && adminUser) { 
      fetchData();
    } else if (!authLoading && !adminUser) { 
      router.replace('/login?redirect=/admin/dashboard'); 
    }
  }, [eventId, adminUser, authLoading, router]);

  const getStatusBadgeClass = (status: SaleData['status']) => {
    switch (status) {
      case 'paid': return 'bg-success text-white';
      case 'pending_payment': return 'bg-warning text-dark';
      case 'failed': return 'bg-danger text-white';
      case 'cancelled': return 'bg-secondary text-white';
      default: return 'bg-light text-dark border';
    }
  };

  const getStatusIcon = (status: SaleData['status']) => {
    switch (status) {
      case 'paid': return <BadgeCheck className="me-1 h-3 w-3" />;
      case 'pending_payment': return <BadgeAlert className="me-1 h-3 w-3" />;
      case 'failed': case 'cancelled': return <BadgeX className="me-1 h-3 w-3" />;
      default: return null;
    }
  };

  const getStatusText = (status: SaleData['status']) => {
    switch (status) {
      case 'paid': return 'Pago';
      case 'pending_payment': return 'Pendente';
      case 'failed': return 'Falhou';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  if (authLoading || isLoadingData) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ms-3 fs-5 text-muted">Carregando informações dos compradores...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5">
        <AlertTriangle className="mx-auto h-12 w-12 text-danger" />
        <h2 className="mt-4 fs-2 fw-semibold text-danger">Erro</h2>
        <p className="mt-2 text-muted">{error}</p>
        <button onClick={() => router.push('/admin/dashboard')} className="btn btn-secondary mt-4 d-flex align-items-center gap-2 mx-auto">
          <ArrowLeft className="me-2 h-4 w-4" /> Voltar para o Painel de Admin
        </button>
      </div>
    );
  }
  
  if (!event) {
     return (
      <div className="text-center py-5">
        <AlertTriangle className="mx-auto h-12 w-12 text-muted" />
        <h2 className="mt-4 fs-2 fw-semibold">Evento Não Encontrado</h2>
        <button onClick={() => router.push('/admin/dashboard')} className="btn btn-secondary mt-4 d-flex align-items-center gap-2 mx-auto">
          <ArrowLeft className="me-2 h-4 w-4" /> Voltar para o Painel de Admin
        </button>
      </div>
    );
  }

  return (
    <div className="container-fluid container-lg py-4">
      <button onClick={() => router.push('/admin/dashboard')} className="btn btn-secondary mb-4 d-flex align-items-center gap-2">
        <ArrowLeft className="me-2 h-4 w-4" /> Voltar para o Painel de Admin
      </button>
      <div className="card border">
        <div className="card-header p-3 p-md-4 bg-light">
          <h1 className="card-title fs-2 fw-bold text-primary d-flex align-items-center gap-2">
            <Users className="h-7 w-7 md:h-8 md:w-8" /> Lista de Compradores (Admin)
          </h1>
          <p className="card-text text-muted">
            Compradores para o evento: <span className="fw-semibold text-dark">{event.nome_evento}</span>
          </p>
        </div>
        <div className="card-body p-0 p-md-2">
          {sales.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover table-striped align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">WhatsApp</th>
                    <th scope="col" className="text-center">Ingressos</th>
                    <th scope="col" className="text-end">Preço Un. (Org)</th>
                    <th scope="col" className="text-end">Taxa Serv. Un.</th>
                    <th scope="col" className="text-end">Valor Total (Venda)</th>
                    <th scope="col">Data da Compra</th>
                    <th scope="col">ID Pag. MP</th>
                    <th scope="col" className="text-center">Status</th>
                    <th scope="col" className="text-center">Contato</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((sale) => (
                    <tr key={sale.id}>
                      <td className="fw-medium">{sale.nome_comprador}</td>
                      <td>{sale.email_comprador}</td>
                      <td>{sale.whatsapp}</td>
                      <td className="text-center">{sale.quantidade}</td>
                      <td className="text-end">R$ {sale.preco_ingresso_unitario.toFixed(2).replace('.', ',')}</td>
                      <td className="text-end">R$ {sale.taxa_servico_unitaria.toFixed(2).replace('.', ',')}</td>
                      <td className="text-end fw-bold">R$ {sale.valor_total_compra.toFixed(2).replace('.', ',')}</td>
                      <td>{new Date(sale.data_compra).toLocaleString('pt-BR')}</td>
                      <td>{sale.mp_payment_id || '-'}</td>
                      <td className="text-center">
                        <span className={`badge small ${getStatusBadgeClass(sale.status)} d-inline-flex align-items-center`}>
                          {getStatusIcon(sale.status)} {getStatusText(sale.status)}
                        </span>
                      </td>
                      <td className="text-center">
                        {sale.whatsapp ? (
                          <a href={`https://wa.me/55${sale.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-success d-inline-flex align-items-center gap-1">
                            <Send className="h-4 w-4" /> Abrir
                          </a>
                        ) : (
                          '-'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-5">
              <Ticket className="mx-auto h-12 w-12 text-muted" />
              <p className="mt-4 fs-5 text-muted">
                Ainda não há compradores para este evento.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
