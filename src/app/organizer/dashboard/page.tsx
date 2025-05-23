
'use client';

import { useAuth } from "@/contexts/AuthContext";
import { PlusCircle, CalendarDays, Users, Loader2, AlertTriangle, Pencil, DollarSign, WalletCards, Settings, Eye, Send, Activity, ListChecks, ChevronLeft, ChevronRight, ListFilter, CheckSquare, Clock, Hourglass } from "lucide-react"; 
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import type { EventData, SaleData, WithdrawalRequestData } from "@/lib/types"; 
import { getEventsByOrganizerId, getSalesByOrganizerId, addWithdrawalRequest, getWithdrawalRequestsByOrganizerId, processRevenueClearance as serverProcessRevenueClearance } from "@/lib/data-service.server"; 
import Image from "next/image";
import { useToast } from "@/hooks/use-toast"; 
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"; 
import { Input } from "@/components/ui/input"; 
import { Label } from "@/components/ui/label";
import { Button as ShadButton } from "@/components/ui/button";

interface DisplayEventData extends EventData {
  paidTicketsCount: number;
  netRevenueFromPaid: number; // Total net from paid sales
  netRevenuePendingClearance: number; // Net from paid sales, still pending clearance
  netRevenueCleared: number; // Net from paid sales, cleared and available
  uniquePaidBuyersCount: number;
}

type OrganizerSection = 'overview' | 'events' | 'withdrawals';
const ITEMS_PER_PAGE = 5;

export default function OrganizerDashboardPage() {
  const { organizerUser, isLoading: authLoading } = useAuth();
  const { toast } = useToast(); 
  const router = useRouter();

  const [events, setEvents] = useState<DisplayEventData[]>([]);
  const [organizerWithdrawals, setOrganizerWithdrawals] = useState<WithdrawalRequestData[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [totalNetRevenueAllEventsCleared, setTotalNetRevenueAllEventsCleared] = useState<number>(0);
  const [totalNetRevenueAllEventsPendingClearance, setTotalNetRevenueAllEventsPendingClearance] = useState<number>(0); 
  const [totalApprovedWithdrawalsAmount, setTotalApprovedWithdrawalsAmount] = useState<number>(0);
  const [totalPendingWithdrawalsAmount, setTotalPendingWithdrawalsAmount] = useState<number>(0);
  
  const [showWithdrawalInputModal, setShowWithdrawalInputModal] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState<string>("");
  const [withdrawalAmountError, setWithdrawalAmountError] = useState<string | null>(null);
  const [isSubmittingWithdrawal, setIsSubmittingWithdrawal] = useState(false);

  const [activeSection, setActiveSection] = useState<OrganizerSection>('overview');
  const [eventsCurrentPage, setEventsCurrentPage] = useState(1);
  const [withdrawalsCurrentPage, setWithdrawalsCurrentPage] = useState(1);
  
  const currentAvailableForWithdrawal = useMemo(() => {
    return totalNetRevenueAllEventsCleared - (totalApprovedWithdrawalsAmount + totalPendingWithdrawalsAmount);
  }, [totalNetRevenueAllEventsCleared, totalApprovedWithdrawalsAmount, totalPendingWithdrawalsAmount]);

  const hasPendingWithdrawal = useMemo(() => totalPendingWithdrawalsAmount > 0, [totalPendingWithdrawalsAmount]);

  async function fetchDashboardData() {
      if (!organizerUser || !organizerUser.id) {
          setIsLoadingData(false);
          return;
      }
      setIsLoadingData(true);
      setError(null);
      
      try {
        await serverProcessRevenueClearance();

        const [fetchedEvents, fetchedOrganizerWithdrawals, fetchedOrganizerSales] = await Promise.all([
          getEventsByOrganizerId(organizerUser.id),
          getWithdrawalRequestsByOrganizerId(organizerUser.id),
          getSalesByOrganizerId(organizerUser.id)
        ]);

        setOrganizerWithdrawals(fetchedOrganizerWithdrawals.sort((a,b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime()));

        const approvedWithdrawalsSum = fetchedOrganizerWithdrawals
          .filter(req => req.status === 'approved')
          .reduce((sum, req) => sum + req.amount, 0);
        setTotalApprovedWithdrawalsAmount(approvedWithdrawalsSum);

        const pendingWithdrawalsSum = fetchedOrganizerWithdrawals
          .filter(req => req.status === 'pending')
          .reduce((sum, req) => sum + req.amount, 0);
        setTotalPendingWithdrawalsAmount(pendingWithdrawalsSum);
        
        let overallClearedRevenue = 0;
        let overallPendingClearanceRevenue = 0; 

        const eventsWithFinancials: DisplayEventData[] = fetchedEvents.map(event => {
            const salesForThisEvent = fetchedOrganizerSales.filter(s => s.evento_id === event.id && s.status === 'paid');
            
            const paidTicketsCount = salesForThisEvent.reduce((acc, s) => acc + s.quantidade, 0);
            const netRevenueFromPaid = salesForThisEvent.reduce(
              (acc, sale) => acc + (sale.organizer_net_revenue || 0), 0
            );
            const netRevenuePendingClearanceForEvent = salesForThisEvent
              .filter(s => s.organizer_revenue_status === 'pending_clearance')
              .reduce((acc, s) => acc + (s.organizer_net_revenue || 0), 0);
            
            const netRevenueClearedForEvent = salesForThisEvent
              .filter(s => s.organizer_revenue_status === 'cleared')
              .reduce((acc, s) => acc + (s.organizer_net_revenue || 0), 0);
            
            overallClearedRevenue += netRevenueClearedForEvent;
            overallPendingClearanceRevenue += netRevenuePendingClearanceForEvent; 
            
            const uniquePaidBuyersCount = new Set(salesForThisEvent.map(s => s.email_comprador)).size; 
            
            return { 
              ...event, 
              paidTicketsCount,
              netRevenueFromPaid,
              netRevenuePendingClearance: netRevenuePendingClearanceForEvent,
              netRevenueCleared: netRevenueClearedForEvent,
              uniquePaidBuyersCount
            };
          });

        setEvents(eventsWithFinancials.sort((a, b) => new Date(b.data_horario).getTime() - new Date(a.data_horario).getTime()));
        setTotalNetRevenueAllEventsCleared(overallClearedRevenue);
        setTotalNetRevenueAllEventsPendingClearance(overallPendingClearanceRevenue); 

      } catch (err) {
        console.error("Failed to fetch events or sales for dashboard:", err);
        setError("Não foi possível carregar os dados do painel. Tente novamente mais tarde.");
      } finally {
        setIsLoadingData(false);
      }
    }


  useEffect(() => {
    if (organizerUser && !authLoading) {
      fetchDashboardData();
    } else if (!authLoading && !organizerUser) {
      setIsLoadingData(false); 
    }
  }, [organizerUser, authLoading]);

  const handleOpenWithdrawalModal = () => {
    if (!organizerUser) return;
    if (!organizerUser.is_verified || !organizerUser.pix_key || !organizerUser.id_photo_data_uri) {
      toast({
        title: "Configurações Incompletas ou Verificação Pendente",
        description: "Por favor, complete sua Chave PIX e envie sua foto com documento nas Configurações de Saque e Verificação antes de solicitar um saque.",
        variant: "destructive",
        duration: 10000,
        action: (
          <ShadButton variant="secondary" size="sm" onClick={() => router.push('/organizer/settings/withdrawal')}>
            Ir para Configurações
          </ShadButton>
        ),
      });
      return;
    }
    setWithdrawalAmount(currentAvailableForWithdrawal > 0 ? currentAvailableForWithdrawal.toFixed(2).replace('.',',') : "0,00");
    setWithdrawalAmountError(null);
    setShowWithdrawalInputModal(true);
  };

  const handleConfirmWithdrawalRequest = async () => {
    if (!organizerUser) return;
    const amount = parseFloat(withdrawalAmount.replace(',', '.'));
    if (isNaN(amount) || amount <= 0) {
      setWithdrawalAmountError("Por favor, insira um valor de saque válido e positivo."); return;
    }
    if (amount > currentAvailableForWithdrawal) {
      setWithdrawalAmountError(`O valor do saque não pode exceder R$ ${currentAvailableForWithdrawal.toFixed(2).replace('.',',')}.`); return;
    }
    setIsSubmittingWithdrawal(true);
    try {
      const requestPayload: Omit<WithdrawalRequestData, 'id' | 'requestDate' | 'status' | 'processedDate' | 'adminNotes'> = {
        organizerId: organizerUser.id,
        organizerName: organizerUser.nome,
        organizerWhatsapp: organizerUser.whatsapp,
        amount: amount,
        pixKeyType: organizerUser.pix_key_type,
        pixKey: organizerUser.pix_key,
        idPhotoDataUri: organizerUser.id_photo_data_uri,
      };
      const newRequest = await addWithdrawalRequest(requestPayload);
      
      await fetchDashboardData();

      setShowWithdrawalInputModal(false);
      toast({
        title: "Solicitação de Saque Enviada",
        description: `Sua solicitação de saque no valor de R$ ${amount.toFixed(2).replace('.', ',')} foi enviada. O valor será transferido para sua conta PIX em até 3 dias úteis após aprovação.`,
        variant: "default",
        duration: 10000,
      });
    } catch (error) {
      console.error("Error submitting withdrawal request:", error);
      toast({ title: "Erro ao Solicitar Saque", description: "Ocorreu um erro ao enviar sua solicitação.", variant: "destructive" });
    } finally {
      setIsSubmittingWithdrawal(false);
    }
  };

  const paginate = <T,>(items: T[], pageNumber: number, pageSize: number): T[] => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  };

  const paginatedEvents = paginate(events, eventsCurrentPage, ITEMS_PER_PAGE);
  const paginatedWithdrawals = paginate(organizerWithdrawals, withdrawalsCurrentPage, ITEMS_PER_PAGE);
  const totalEventsPages = Math.ceil(events.length / ITEMS_PER_PAGE);
  const totalWithdrawalsPages = Math.ceil(organizerWithdrawals.length / ITEMS_PER_PAGE);

  const renderPaginationControls = (
    currentPage: number,
    totalPages: number,
    setCurrentPage: (page: number) => void,
    sectionName: string
  ) => {
    if (totalPages <= 1) return null;
    return (
      <div className="d-flex justify-content-between align-items-center p-3 border-top">
        <ShadButton
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" /> Anterior
        </ShadButton>
        <span className="text-muted small">
          Página {currentPage} de {totalPages} ({sectionName})
        </span>
        <ShadButton
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
        >
          Próxima <ChevronRight className="h-4 w-4" />
        </ShadButton>
      </div>
    );
  };
  
  const getStatusBadgeClass = (status: WithdrawalRequestData['status']) => {
    switch (status) {
      case 'approved': return 'bg-success text-white';
      case 'pending': return 'bg-warning text-dark';
      case 'rejected': return 'bg-danger text-white';
      default: return 'bg-light text-dark border';
    }
  };

  const getStatusText = (status: WithdrawalRequestData['status']) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'approved': return 'Aprovado';
      case 'rejected': return 'Rejeitado';
      default: return status;
    }
  };


  if (authLoading || (isLoadingData && organizerUser)) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ms-3 fs-5">Carregando painel...</p>
      </div>
    );
  }
  
  if (!organizerUser) {
     return (
      <div className="text-center py-5">
        <AlertTriangle className="mx-auto h-12 w-12 text-danger" />
        <h2 className="mt-4 fs-2 fw-semibold">Acesso Negado</h2>
        <p className="mt-2 text-muted">Você precisa estar logado como organizador.</p>
        <Link href="/login" className="btn btn-primary mt-4">Fazer Login</Link>
      </div>
    );
  }

  const sectionNavItems = [
    { id: 'overview', label: 'Visão Geral', icon: <Activity /> },
    { id: 'events', label: 'Meus Eventos', icon: <CalendarDays /> },
    { id: 'withdrawals', label: 'Meus Saques', icon: <WalletCards /> },
  ] as const;

  return (
    <div className="container-fluid container-lg py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h1 className="display-5 fw-bold text-primary">Painel do Organizador</h1>
          <p className="text-muted fs-5">Bem-vindo, {organizerUser.nome}!</p>
        </div>
        <Link href="/organizer/events/create" className="btn btn-accent btn-lg d-flex align-items-center gap-2">
          <PlusCircle className="h-5 w-5" /> Criar Novo Evento
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger d-flex align-items-center gap-2" role="alert">
          <AlertTriangle /> {error}
        </div>
      )}

      <ul className="nav nav-tabs nav-fill mb-4 border-bottom-0" id="organizerDashboardTabs" role="tablist">
        {sectionNavItems.map(item => (
          <li className="nav-item" role="presentation" key={item.id}>
            <button
              className={`nav-link w-100 d-flex align-items-center justify-content-center gap-2 ${activeSection === item.id ? 'active fw-semibold bg-light border-primary border-bottom-0 text-primary' : 'text-muted'}`}
              id={`${item.id}-tab`}
              data-bs-toggle="tab"
              data-bs-target={`#${item.id}-tab-pane`}
              type="button"
              role="tab"
              aria-controls={`${item.id}-tab-pane`}
              aria-selected={activeSection === item.id}
              onClick={() => setActiveSection(item.id as OrganizerSection)}
            >
              {item.icon} {item.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="tab-content" id="organizerDashboardTabsContent">
        {/* Overview / Financial Section */}
        <div className={`tab-pane fade ${activeSection === 'overview' ? 'show active' : ''}`} id="overview-tab-pane" role="tabpanel" aria-labelledby="overview-tab">
          <div className="card border">
            <div className="card-header bg-light p-3 p-md-4 d-flex justify-content-between align-items-center">
              <h2 className="card-title fs-4 fw-semibold d-flex align-items-center gap-2 mb-0">
                <DollarSign className="text-primary" /> Resumo Financeiro
              </h2>
              <ShadButton onClick={fetchDashboardData} variant="outline" size="sm" className="btn-sm d-flex align-items-center gap-1">
                <Clock className="h-4 w-4" /> Atualizar Saldos
              </ShadButton>
            </div>
            <div className="card-body p-3 p-md-4">
                <div className="mb-3">
                    <span className="display-4 fw-bold text-primary">
                        R$ {currentAvailableForWithdrawal.toFixed(2).replace('.', ',')}
                    </span>
                    <p className="text-muted small mt-1">Disponível para saque (Saldo liberado menos saques pendentes/aprovados)</p>
                </div>
                <div className="row g-3 mb-3">
                     <div className="col-md-4 col-sm-6">
                        <p className="fs-5 text-info mb-0 d-flex align-items-center gap-1">
                           <Hourglass size={16} className="text-info-emphasis"/> R$ {totalNetRevenueAllEventsPendingClearance.toFixed(2).replace('.', ',')}
                        </p>
                        <p className="small text-muted">Total pendente de liberação (3 dias úteis)</p>
                    </div>
                    <div className="col-md-4 col-sm-6">
                        <p className="fs-5 text-success-emphasis mb-0">R$ {totalApprovedWithdrawalsAmount.toFixed(2).replace('.', ',')}</p>
                        <p className="small text-muted">Total já sacado (aprovado)</p>
                    </div>
                    <div className="col-md-4 col-sm-6">
                        <p className="fs-5 text-warning-emphasis mb-0">R$ {totalPendingWithdrawalsAmount.toFixed(2).replace('.', ',')}</p>
                        <p className="small text-muted">Saques pendentes (aguardando aprovação)</p>
                    </div>
                </div>
              
              {hasPendingWithdrawal ? (
                <div className="alert alert-info small mt-3">
                  Sua última solicitação de saque está sendo processada. O valor será transferido para sua conta PIX em até 3 dias úteis após aprovação pela administração.
                </div>
              ) : (
                <button 
                  className="btn btn-primary mt-3 d-flex align-items-center gap-2" 
                  disabled={currentAvailableForWithdrawal <= 0 || isSubmittingWithdrawal || !organizerUser.is_verified}
                  onClick={handleOpenWithdrawalModal}
                >
                  {isSubmittingWithdrawal ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />} 
                  Solicitar Saque
                </button>
              )}
              {currentAvailableForWithdrawal <= 0 && !hasPendingWithdrawal && (
                <p className="text-muted small mt-2">
                  Não há valores disponíveis para saque no momento.
                </p>
              )}
              {(!organizerUser.is_verified || !organizerUser.pix_key || !organizerUser.id_photo_data_uri) && currentAvailableForWithdrawal > 0 && !hasPendingWithdrawal && (
                <div className="alert alert-warning small mt-3 d-flex align-items-center gap-2">
                  <AlertTriangle className="h-5 w-5 shrink-0" />
                  <div>
                    Para solicitar saques, por favor, complete suas <Link href="/organizer/settings/withdrawal" className="alert-link">configurações de saque e verificação</Link>.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* My Events Section */}
        <div className={`tab-pane fade ${activeSection === 'events' ? 'show active' : ''}`} id="events-tab-pane" role="tabpanel" aria-labelledby="events-tab">
          <div className="card border">
            <div className="card-header bg-light p-3 p-md-4">
              <h2 className="card-title fs-4 fw-semibold d-flex align-items-center gap-2 mb-0">
                <CalendarDays className="text-primary" /> Seus Eventos Criados ({events.length})
              </h2>
              <p className="card-text text-muted small">Acompanhe os ingressos vendidos e informações dos compradores.</p>
            </div>
            <div className="card-body p-0">
              {paginatedEvents.length > 0 ? (
                <div className="vstack gap-0">
                  {paginatedEvents.map(event => {
                    const eventDate = new Date(event.data_horario).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
                    const displayTitle = `${event.nome_evento}`;
                    return (
                    <div key={event.id} className="card-item border-bottom"> 
                      <div className="row g-0">
                        <div className="col-md-3 position-relative" style={{ minHeight: '150px' }}>
                          <Image 
                              src={event.imagem_url || `https://picsum.photos/seed/${event.id}/300/200`}
                              alt={event.nome_evento}
                              layout="fill"
                              objectFit="cover"
                              data-ai-hint="event image"
                            />
                        </div>
                        <div className="col-md-9">
                          <div className="card-body d-flex flex-column h-100 p-3">
                            <h3 className="card-title fs-5 fw-semibold text-primary mb-1">
                            {displayTitle}
                            </h3>
                            <p className="card-text text-muted small mb-2">
                              {eventDate} às {new Date(event.data_horario).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} - {event.local}
                            </p>
                            
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3 mt-2 mb-3">
                              <div className="col">
                                <div className="p-2 bg-light-subtle border rounded-2 text-center">
                                  <p className="small fw-medium mb-0 text-muted">Ing. Pagos</p>
                                  <p className="fs-6 fw-bold mb-0 text-success">{event.paidTicketsCount} / {event.quantidade_total}</p>
                                </div>
                              </div>
                               <div className="col">
                                <div className="p-2 bg-light-subtle border rounded-2 text-center">
                                  <p className="small fw-medium mb-0 text-muted">Receita (Bruta)</p>
                                  <p className="fs-6 fw-bold mb-0 text-primary">R$ {event.netRevenueFromPaid.toFixed(2).replace('.', ',')}</p>
                                </div>
                              </div>
                               <div className="col">
                                <div className="p-2 bg-light-subtle border rounded-2 text-center">
                                  <p className="small fw-medium mb-0 text-muted">A Liberar</p>
                                  <p className="fs-6 fw-bold mb-0 text-warning-emphasis">R$ {event.netRevenuePendingClearance.toFixed(2).replace('.', ',')}</p>
                                </div>
                              </div>
                              <div className="col">
                                <div className="p-2 bg-light-subtle border rounded-2 text-center">
                                  <p className="small fw-medium mb-0 text-muted">Liberado</p>
                                  <p className="fs-6 fw-bold mb-0 text-success-emphasis">R$ {event.netRevenueCleared.toFixed(2).replace('.', ',')}</p>
                                </div>
                              </div>
                            </div>

                          <div className="mt-auto d-flex flex-wrap gap-2"> 
                              <Link href={`/organizer/events/${event.id}/buyers`} className="btn btn-sm btn-secondary d-flex align-items-center gap-1">
                                <Users className="h-4 w-4" /> Ver Compradores ({event.uniquePaidBuyersCount})
                              </Link>
                              <Link href={`/organizer/events/${event.id}/edit`} className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1">
                                <Pencil className="h-4 w-4" /> Editar Evento
                              </Link>
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )})}
                </div>
              ) : (
                <div className="text-center py-5 p-3">
                  <CalendarDays className="mx-auto h-12 w-12 text-muted" />
                  <p className="mt-4 fs-5 text-muted">Você ainda não criou nenhum evento.</p>
                  <Link href="/organizer/events/create" className="btn btn-accent mt-3 btn-lg d-flex align-items-center gap-2 mx-auto" style={{width: 'fit-content'}}>
                    <PlusCircle className="h-5 w-5" /> Criar Meu Primeiro Evento
                  </Link>
                </div>
              )}
              {renderPaginationControls(eventsCurrentPage, totalEventsPages, setEventsCurrentPage, "Eventos")}
            </div>
          </div>
        </div>

        {/* My Withdrawals Section */}
        <div className={`tab-pane fade ${activeSection === 'withdrawals' ? 'show active' : ''}`} id="withdrawals-tab-pane" role="tabpanel" aria-labelledby="withdrawals-tab">
          <div className="card border">
            <div className="card-header bg-light p-3 p-md-4">
              <h2 className="card-title fs-4 fw-semibold d-flex align-items-center gap-2 mb-0">
                <ListChecks className="text-primary" /> Minhas Solicitações de Saque ({organizerWithdrawals.length})
              </h2>
            </div>
            <div className="card-body p-0">
              {paginatedWithdrawals.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover table-striped align-middle mb-0 small">
                    <thead className="table-light">
                      <tr>
                        <th>Data Solic.</th>
                        <th>Valor (R$)</th>
                        <th>Chave PIX</th>
                        <th>Status</th>
                        <th>Data Proc.</th>
                        <th>Notas Admin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedWithdrawals.map(req => (
                        <tr key={req.id}>
                          <td>{new Date(req.requestDate).toLocaleDateString('pt-BR', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit'})}</td>
                          <td>R$ {req.amount.toFixed(2).replace('.', ',')}</td>
                          <td>{req.pixKeyType?.toUpperCase()}: {req.pixKey}</td>
                          <td><span className={`badge small ${getStatusBadgeClass(req.status)}`}>{getStatusText(req.status)}</span></td>
                          <td>{req.processedDate ? new Date(req.processedDate).toLocaleDateString('pt-BR', { day:'2-digit', month:'2-digit', year:'numeric'}) : '-'}</td>
                          <td className="text-muted">{req.adminNotes || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted text-center p-4">Nenhuma solicitação de saque encontrada.</p>
              )}
              {renderPaginationControls(withdrawalsCurrentPage, totalWithdrawalsPages, setWithdrawalsCurrentPage, "Saques")}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showWithdrawalInputModal} onOpenChange={setShowWithdrawalInputModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Solicitar Saque</DialogTitle>
            <DialogDescription>
              Disponível para saque: R$ {currentAvailableForWithdrawal.toFixed(2).replace('.', ',')}.
              Insira o valor que deseja sacar.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="withdrawal-amount">Valor do Saque (R$)</Label>
              <Input
                id="withdrawal-amount"
                type="text"
                value={withdrawalAmount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[\d]*[,.]?[\d]{0,2}$/.test(value) || value === "") {
                    setWithdrawalAmount(value);
                  }
                  setWithdrawalAmountError(null); 
                }}
                className="mt-1"
                placeholder="Ex: 150,00"
              />
              {withdrawalAmountError && <p className="text-sm text-danger mt-1">{withdrawalAmountError}</p>}
            </div>
            <p className="text-xs text-muted-foreground">
                O valor será transferido para a Chave PIX: <span className="font-medium text-foreground">{organizerUser.pix_key_type?.toUpperCase()}: {organizerUser.pix_key}</span>.
            </p>
             <p className="text-xs text-muted-foreground">
                A transferência será realizada em até 3 dias úteis após a aprovação da administração.
            </p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <ShadButton type="button" variant="secondary">Cancelar</ShadButton>
            </DialogClose>
            <ShadButton type="button" onClick={handleConfirmWithdrawalRequest} disabled={isSubmittingWithdrawal}>
                {isSubmittingWithdrawal && <Loader2 className="me-2 h-4 w-4 animate-spin" /> }
                Confirmar Solicitação
            </ShadButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

    
