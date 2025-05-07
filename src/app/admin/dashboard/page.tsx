// src/app/admin/dashboard/page.tsx
'use client';

import { useAuth } from "@/contexts/AuthContext";
import { ShieldCheck, User, Users, Trash2, Eye, BarChartHorizontalBig, Loader2, AlertTriangle, ShoppingBag, Ticket, DollarSign, TrendingUp, BadgeCheck, BadgeAlert, BadgeX, Send, WalletCards, CheckCircle, XCircle, MessageSquare, ListFilter, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import type { UserData, EventData, SaleData, WithdrawalRequestData } from "@/lib/types";
import { getUsers, getEvents, getAllSales, getWithdrawalRequests } from "@/lib/data-service.server";
import { adminDeleteUserAction, adminDeleteEventAction, adminUpdateWithdrawalStatusAction } from "@/app/actions/admin-actions";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button as ShadButton } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

interface CustomerSalesSummary {
  email: string;
  name: string;
  totalTickets: number;
  totalValue: number;
}

type AdminSection = 'withdrawals' | 'users' | 'events' | 'revenue' | 'customers';

const ITEMS_PER_PAGE = 10;

export default function AdminDashboardPage() {
  const { adminUser, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  const [users, setUsers] = useState<UserData[]>([]);
  const [events, setEvents] = useState<EventData[]>([]);
  const [sales, setSales] = useState<SaleData[]>([]);
  const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequestData[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState<Record<string, string>>({});
  const [activeSection, setActiveSection] = useState<AdminSection>('withdrawals');

  // Pagination states
  const [withdrawalCurrentPage, setWithdrawalCurrentPage] = useState(1);
  const [usersCurrentPage, setUsersCurrentPage] = useState(1);
  const [eventsCurrentPage, setEventsCurrentPage] = useState(1);
  const [salesDetailsCurrentPage, setSalesDetailsCurrentPage] = useState(1);
  const [customerSummaryCurrentPage, setCustomerSummaryCurrentPage] = useState(1);


  useEffect(() => {
    async function fetchData() {
      if (!adminUser) return;
      setIsLoadingData(true);
      setError(null);
      try {
        const [fetchedUsers, fetchedEvents, fetchedSales, fetchedWithdrawalRequests] = await Promise.all([
          getUsers(),
          getEvents(),
          getAllSales(),
          getWithdrawalRequests()
        ]);
        setUsers(fetchedUsers);
        setEvents(fetchedEvents.sort((a,b) => new Date(b.data_horario).getTime() - new Date(a.data_horario).getTime()));
        setSales(fetchedSales.sort((a, b) => new Date(b.data_compra).getTime() - new Date(a.data_compra).getTime()));
        setWithdrawalRequests(fetchedWithdrawalRequests.sort((a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime()));
      } catch (err) {
        console.error("Failed to fetch admin data:", err);
        setError("Não foi possível carregar os dados administrativos. Tente novamente mais tarde.");
      } finally {
        setIsLoadingData(false);
      }
    }

    if (adminUser && !authLoading) {
      fetchData();
    } else if (!authLoading && !adminUser) {
      setIsLoadingData(false);
    }
  }, [adminUser, authLoading]);

  const paidSales = useMemo(() => sales.filter(s => s.status === 'paid'), [sales]);
  const totalGrossSales = useMemo(() => paidSales.reduce((acc, s) => acc + s.valor_total_compra, 0), [paidSales]);
  const totalPlatformRevenue = useMemo(() => paidSales.reduce((acc, s) => acc + (s.taxa_servico_unitaria * s.quantidade), 0), [paidSales]);
  const totalNetRevenueForOrganizers = useMemo(() => paidSales.reduce((acc, s) => acc + (s.preco_ingresso_unitario * s.quantidade), 0), [paidSales]);
  const totalPaidTicketsSold = useMemo(() => paidSales.reduce((acc, s) => acc + s.quantidade, 0), [paidSales]);
  const eventNameMap = useMemo(() => new Map(events.map(e => [e.id, e.nome_evento])), [events]);

  const customerSalesSummary = useMemo(() => {
    const summary: Record<string, CustomerSalesSummary> = {};
    sales.forEach(sale => {
      if (!summary[sale.email_comprador]) {
        summary[sale.email_comprador] = {
          email: sale.email_comprador,
          name: sale.nome_comprador,
          totalTickets: 0,
          totalValue: 0
        };
      }
      summary[sale.email_comprador].totalTickets += sale.quantidade;
      summary[sale.email_comprador].totalValue += sale.valor_total_compra;
    });
    return Object.values(summary).sort((a, b) => b.totalValue - a.totalValue);
  }, [sales]);

  const handleDeleteUser = async (userId: string) => {
    if (!adminUser?.id) {
      toast({ title: "Erro de Autenticação", description: "ID do administrador não encontrado.", variant: "destructive" });
      return;
    }
    const result = await adminDeleteUserAction(userId, adminUser.id);
    toast({
      title: result.success ? "Sucesso" : "Erro",
      description: result.message,
      variant: result.success ? "default" : "destructive",
    });
    if (result.success) {
      setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    const result = await adminDeleteEventAction(eventId);
    toast({
      title: result.success ? "Sucesso" : "Erro",
      description: result.message,
      variant: result.success ? "default" : "destructive",
    });
    if (result.success) {
      setEvents(prevEvents => prevEvents.filter(e => e.id !== eventId));
      setSales(prevSales => prevSales.filter(s => s.evento_id !== eventId));
    }
  };

  const handleUpdateWithdrawalStatus = async (requestId: string, status: 'approved' | 'rejected') => {
    const notes = adminNotes[requestId] || '';
    const result = await adminUpdateWithdrawalStatusAction(requestId, status, notes);
    toast({
      title: result.success ? "Sucesso" : "Erro",
      description: result.message,
      variant: result.success ? "default" : "destructive",
    });
    if (result.success && result.request) {
      setWithdrawalRequests(prev =>
        prev.map(req => req.id === requestId ? result.request! : req)
      );
      setAdminNotes(prev => ({ ...prev, [requestId]: '' }));
    }
  };

  const getStatusBadgeClass = (status: SaleData['status'] | WithdrawalRequestData['status']) => {
    switch (status) {
      case 'paid': case 'approved': return 'bg-success text-white';
      case 'pending_payment': case 'pending': return 'bg-warning text-dark';
      case 'failed': case 'cancelled': case 'rejected': return 'bg-danger text-white';
      default: return 'bg-light text-dark border';
    }
  };

  const getStatusIcon = (status: SaleData['status'] | WithdrawalRequestData['status']) => {
    switch (status) {
      case 'paid': case 'approved': return <BadgeCheck className="me-1 h-3 w-3" />;
      case 'pending_payment': case 'pending': return <BadgeAlert className="me-1 h-3 w-3" />;
      case 'failed': case 'cancelled': case 'rejected': return <BadgeX className="me-1 h-3 w-3" />;
      default: return null;
    }
  };

  const getStatusText = (status: SaleData['status'] | WithdrawalRequestData['status']) => {
    switch (status) {
      case 'paid': return 'Pago';
      case 'pending_payment': return 'Pendente';
      case 'failed': return 'Falhou';
      case 'cancelled': return 'Cancelado';
      case 'pending': return 'Pendente (Saque)';
      case 'approved': return 'Aprovado (Saque)';
      case 'rejected': return 'Rejeitado (Saque)';
      default: return status;
    }
  };

  // Generic pagination function
  const paginate = <T,>(items: T[], pageNumber: number, pageSize: number): T[] => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  };

  // Paginated data
  const paginatedWithdrawalRequests = paginate(withdrawalRequests, withdrawalCurrentPage, ITEMS_PER_PAGE);
  const paginatedUsers = paginate(users, usersCurrentPage, ITEMS_PER_PAGE);
  const paginatedEvents = paginate(events, eventsCurrentPage, ITEMS_PER_PAGE);
  const paginatedSalesDetails = paginate(sales, salesDetailsCurrentPage, ITEMS_PER_PAGE);
  const paginatedCustomerSummary = paginate(customerSalesSummary, customerSummaryCurrentPage, ITEMS_PER_PAGE);

  // Total pages
  const totalWithdrawalPages = Math.ceil(withdrawalRequests.length / ITEMS_PER_PAGE);
  const totalUsersPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const totalEventsPages = Math.ceil(events.length / ITEMS_PER_PAGE);
  const totalSalesDetailsPages = Math.ceil(sales.length / ITEMS_PER_PAGE);
  const totalCustomerSummaryPages = Math.ceil(customerSalesSummary.length / ITEMS_PER_PAGE);

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


  if (authLoading || (isLoadingData && adminUser)) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ms-3 fs-5">Carregando painel administrativo...</p>
      </div>
    );
  }

  if (!adminUser) {
    return (
      <div className="text-center py-5">
        <AlertTriangle className="mx-auto h-12 w-12 text-danger" />
        <h2 className="mt-4 fs-2 fw-semibold">Acesso Negado</h2>
        <p className="mt-2 text-muted">Você precisa estar logado como administrador.</p>
        <Link href="/login" className="btn btn-primary mt-4">Fazer Login</Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5">
        <AlertTriangle className="mx-auto h-12 w-12 text-danger" />
        <h2 className="mt-4 fs-2 fw-semibold text-danger">Erro ao Carregar Dados</h2>
        <p className="mt-2 text-muted">{error}</p>
      </div>
    );
  }

  const sectionNavItems = [
    { id: 'withdrawals', label: 'Saques', icon: <WalletCards /> },
    { id: 'users', label: 'Usuários', icon: <Users /> },
    { id: 'events', label: 'Eventos', icon: <ShoppingBag /> },
    { id: 'revenue', label: 'Receita', icon: <DollarSign /> },
    { id: 'customers', label: 'Clientes', icon: <BarChartHorizontalBig /> },
  ] as const;


  return (
    <div className="container-fluid container-lg py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <h1 className="display-5 fw-bold text-primary d-flex align-items-center gap-2">
          <ShieldCheck className="h-8 w-8" /> Painel Administrativo
        </h1>
        {adminUser && (
            <div className="p-2 bg-light rounded-3 d-flex align-items-center gap-2 small text-muted">
              <User className="h-5 w-5" />
              <span className="fw-semibold text-dark">{adminUser.nome}</span>
            </div>
          )}
      </div>

      {/* Bootstrap Tabs Navigation */}
      <ul className="nav nav-tabs nav-fill mb-4 border-bottom-0" id="adminDashboardTabs" role="tablist">
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
              onClick={() => setActiveSection(item.id as AdminSection)}
            >
              {item.icon} {item.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Tab Content Panes */}
      <div className="tab-content" id="adminDashboardTabsContent">

        {/* Withdrawal Requests Section */}
        <div className={`tab-pane fade ${activeSection === 'withdrawals' ? 'show active' : ''}`} id="withdrawals-tab-pane" role="tabpanel" aria-labelledby="withdrawals-tab">
          <div className="card border">
            <div className="card-header bg-light p-3">
              <h2 className="card-title fs-4 fw-semibold d-flex align-items-center gap-2 mb-0">
                <WalletCards className="text-primary" /> Solicitações de Saque ({withdrawalRequests.filter(r => r.status === 'pending').length} pendentes)
              </h2>
              <p className="card-text text-muted small">Gerencie as solicitações de saque dos organizadores.</p>
            </div>
            <div className="card-body p-0">
              {paginatedWithdrawalRequests.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover table-striped align-middle mb-0 small">
                    <thead className="table-light">
                      <tr>
                        <th>Organizador</th>
                        <th>Valor (R$)</th>
                        <th>Chave PIX</th>
                        <th>WhatsApp</th>
                        <th>Data Solic.</th>
                        <th>Status</th>
                        <th className="text-center">ID Foto</th>
                        <th>Notas Admin</th>
                        <th className="text-center">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedWithdrawalRequests.map(req => (
                        <tr key={req.id}>
                          <td className="fw-medium">{req.organizerName}</td>
                          <td>R$ {req.amount.toFixed(2).replace('.', ',')}</td>
                          <td>{req.pixKeyType?.toUpperCase()}: {req.pixKey}</td>
                          <td>
                            {req.organizerWhatsapp ? (
                              <a href={`https://wa.me/55${req.organizerWhatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-success p-1 d-inline-flex align-items-center gap-1">
                                <Send className="h-3 w-3" /> Contatar
                              </a>
                            ) : '-'}
                          </td>
                          <td>{new Date(req.requestDate).toLocaleDateString('pt-BR')}</td>
                          <td>
                            <span className={`badge small ${getStatusBadgeClass(req.status)} d-inline-flex align-items-center`}>
                              {getStatusIcon(req.status)} {getStatusText(req.status)}
                            </span>
                          </td>
                          <td className="text-center">
                            {req.idPhotoDataUri ? (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <ShadButton variant="outline" size="sm" className="btn-sm p-1"><Eye className="h-4 w-4" /></ShadButton>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader><AlertDialogTitle>Foto Documento</AlertDialogTitle></AlertDialogHeader>
                                  <Image src={req.idPhotoDataUri} alt={`Documento ${req.organizerName}`} width={400} height={300} className="img-fluid rounded border" data-ai-hint="identity document" />
                                  <AlertDialogFooter><AlertDialogCancel>Fechar</AlertDialogCancel></AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            ) : <span className="text-muted small">Não</span>}
                          </td>
                          <td>
                            {req.status === 'pending' ? (
                              <Textarea
                                placeholder="Notas (opcional)"
                                value={adminNotes[req.id] || ''}
                                onChange={(e) => setAdminNotes(prev => ({ ...prev, [req.id]: e.target.value }))}
                                className="form-control form-control-sm"
                                rows={1}
                              />
                            ) : (
                              req.adminNotes || '-'
                            )}
                          </td>
                          <td className="text-center">
                            {req.status === 'pending' ? (
                              <div className="d-flex gap-1 justify-content-center">
                                <AlertDialog>
                                  <AlertDialogTrigger asChild><ShadButton variant="default" size="sm" className="btn-sm btn-success p-1"><CheckCircle className="h-4 w-4" /></ShadButton></AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader><AlertDialogTitle>Aprovar Saque?</AlertDialogTitle><AlertDialogDescription>Deseja aprovar o saque de R$ {req.amount.toFixed(2).replace('.', ',')} para {req.organizerName}?</AlertDialogDescription></AlertDialogHeader>
                                    <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={() => handleUpdateWithdrawalStatus(req.id, 'approved')} className="btn-success">Aprovar</AlertDialogAction></AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild><ShadButton variant="destructive" size="sm" className="btn-sm btn-danger p-1"><XCircle className="h-4 w-4" /></ShadButton></AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader><AlertDialogTitle>Rejeitar Saque?</AlertDialogTitle><AlertDialogDescription>Deseja rejeitar o saque de R$ {req.amount.toFixed(2).replace('.', ',')} para {req.organizerName}? {adminNotes[req.id] ? 'Suas notas serão salvas.' : 'Considere adicionar uma nota.'}</AlertDialogDescription></AlertDialogHeader>
                                    <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={() => handleUpdateWithdrawalStatus(req.id, 'rejected')} className="btn-danger">Rejeitar</AlertDialogAction></AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            ) : (
                              <MessageSquare className="h-4 w-4 text-muted mx-auto" title={req.adminNotes || "Processado"} />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted text-center p-4">Nenhuma solicitação de saque encontrada.</p>
              )}
              {renderPaginationControls(withdrawalCurrentPage, totalWithdrawalPages, setWithdrawalCurrentPage, "Saques")}
            </div>
          </div>
        </div>

        {/* Manage Users Section */}
        <div className={`tab-pane fade ${activeSection === 'users' ? 'show active' : ''}`} id="users-tab-pane" role="tabpanel" aria-labelledby="users-tab">
          <div className="card border">
            <div className="card-header bg-light p-3">
              <h2 className="card-title fs-4 fw-semibold d-flex align-items-center gap-2 mb-0">
                <Users className="text-primary" /> Gerenciar Usuários ({users.length})
              </h2>
              <p className="card-text text-muted small">Visualize e gerencie todos os usuários cadastrados no sistema.</p>
            </div>
            <div className="card-body p-0">
              {paginatedUsers.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover table-striped align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Email</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">WhatsApp</th>
                        <th scope="col" className="text-end">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="fw-medium">{user.nome}</td>
                          <td>{user.email}</td>
                          <td><span className={`badge small ${user.tipo === 'admin' ? 'bg-primary text-white' : user.tipo === 'organizer' ? 'bg-secondary text-white' : 'bg-info text-white'}`}>{user.tipo}</span></td>
                          <td>{user.whatsapp || '-'}</td>
                          <td className="text-end">
                            {user.id !== adminUser.id && user.tipo !== 'admin' ? (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <ShadButton variant="destructive" size="sm" className="btn btn-sm btn-danger p-1">
                                    <Trash2 className="h-4 w-4" />
                                  </ShadButton>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader><AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Tem certeza que deseja excluir o usuário {user.nome} ({user.email})? Esta ação não pode ser desfeita.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteUser(user.id)} className="btn-danger">Excluir</AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            ) : (
                              <ShadButton variant="secondary" size="sm" disabled className="btn btn-sm p-1 opacity-50">
                                <Trash2 className="h-4 w-4" />
                              </ShadButton>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted text-center p-4">Nenhum usuário encontrado.</p>
              )}
              {renderPaginationControls(usersCurrentPage, totalUsersPages, setUsersCurrentPage, "Usuários")}
            </div>
          </div>
        </div>

        {/* Manage Events Section */}
        <div className={`tab-pane fade ${activeSection === 'events' ? 'show active' : ''}`} id="events-tab-pane" role="tabpanel" aria-labelledby="events-tab">
          <div className="card border">
            <div className="card-header bg-light p-3">
              <h2 className="card-title fs-4 fw-semibold d-flex align-items-center gap-2 mb-0">
                <ShoppingBag className="text-primary" /> Gerenciar Eventos ({events.length})
              </h2>
              <p className="card-text text-muted small">Visualize e gerencie todos os eventos cadastrados.</p>
            </div>
            <div className="card-body p-3">
              {paginatedEvents.length > 0 ? (
                <div className="vstack gap-3">
                  {paginatedEvents.map((event) => {
                    const organizerNamePart = users.find(u => u.id === event.organizer_id)?.nome.substring(0,5) || event.organizer_id.split('-')[1]?.substring(0,4) || 'N/A';
                    const eventDate = new Date(event.data_horario).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
                    const displayTitle = `${organizerNamePart} - ${event.nome_evento} - ${eventDate}`;
                    const eventTime = new Date(event.data_horario).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                    return (
                      <div key={event.id} className="card overflow-hidden border">
                        <div className="card-header bg-light-subtle p-3 d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2">
                          <div>
                            <h3 className="card-title fs-5 text-primary fw-semibold mb-0">
                              {displayTitle}
                            </h3>
                            <p className="card-text text-muted small mb-0">
                              {eventTime} - {event.local}
                            </p>
                          </div>
                          <div className="d-flex align-items-center gap-2 mt-2 mt-sm-0">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <ShadButton variant="destructive" size="sm" className="btn btn-sm btn-danger p-1"><Trash2 className="h-4 w-4" /></ShadButton>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader><AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                                  <AlertDialogDescription>Tem certeza que deseja excluir o evento "{event.nome_evento}" e todas as suas vendas associadas? Esta ação não pode ser desfeita.</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteEvent(event.id)} className="btn-danger">Excluir Evento</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                        <div className="card-body p-3">
                          <div className="row row-cols-2 row-cols-md-4 g-3 small">
                            <div><p className="fw-semibold mb-0">Total:</p> <p className="mb-0">{event.quantidade_total} ingressos</p></div>
                            <div><p className="fw-semibold mb-0">Vendidos:</p> <p className="mb-0">{event.quantidade_total - event.quantidade_disponivel} ingressos</p></div>
                            <div><p className="fw-semibold mb-0">Disponíveis:</p> <p className="mb-0">{event.quantidade_disponivel} ingressos</p></div>
                            <div>
                              <Link href={`/admin/events/${event.id}/buyers`} className="btn btn-sm btn-primary p-1 d-flex align-items-center gap-1">
                                <Eye className="h-4 w-4" />Ver Compradores
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-muted text-center p-4">Nenhum evento encontrado.</p>
              )}
               {renderPaginationControls(eventsCurrentPage, totalEventsPages, setEventsCurrentPage, "Eventos")}
            </div>
          </div>
        </div>

        {/* Platform Revenue Report Section */}
        <div className={`tab-pane fade ${activeSection === 'revenue' ? 'show active' : ''}`} id="revenue-tab-pane" role="tabpanel" aria-labelledby="revenue-tab">
          <div className="card border">
            <div className="card-header bg-light p-3">
              <h2 className="card-title fs-4 fw-semibold d-flex align-items-center gap-2 mb-0">
                <DollarSign className="text-primary" /> Relatório de Receita da Plataforma
              </h2>
              <p className="card-text text-muted small">Visão geral das finanças da plataforma TrinkaPass.</p>
            </div>
            <div className="card-body p-3">
              <div className="row g-3 mb-4">
                <div className="col-md-3 col-6">
                  <div className="p-3 bg-light-subtle border rounded-2">
                    <p className="small text-muted mb-0">Total Bruto Arrecadado</p>
                    <p className="fs-5 fw-bold text-primary mb-0">R$ {totalGrossSales.toFixed(2).replace('.', ',')}</p>
                  </div>
                </div>
                <div className="col-md-3 col-6">
                  <div className="p-3 bg-light-subtle border rounded-2">
                    <p className="small text-muted mb-0">Total Taxas TrinkaPass</p>
                    <p className="fs-5 fw-bold text-success mb-0">R$ {totalPlatformRevenue.toFixed(2).replace('.', ',')}</p>
                  </div>
                </div>
                <div className="col-md-3 col-6">
                  <div className="p-3 bg-light-subtle border rounded-2">
                    <p className="small text-muted mb-0">Total para Organizadores</p>
                    <p className="fs-5 fw-bold text-secondary mb-0">R$ {totalNetRevenueForOrganizers.toFixed(2).replace('.', ',')}</p>
                  </div>
                </div>
                <div className="col-md-3 col-6">
                  <div className="p-3 bg-light-subtle border rounded-2">
                    <p className="small text-muted mb-0">Total Ingressos Pagos</p>
                    <p className="fs-5 fw-bold text-info mb-0">{totalPaidTicketsSold}</p>
                  </div>
                </div>
              </div>

              <h3 className="fs-5 fw-semibold mb-2">Detalhes de Todas as Vendas</h3>
              {paginatedSalesDetails.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover table-striped align-middle mb-0 small">
                    <thead className="table-light">
                      <tr>
                        <th>Evento</th>
                        <th>Comprador</th>
                        <th>Email</th>
                        <th className="text-center">Qtd.</th>
                        <th className="text-end">Preço Un. (Org)</th>
                        <th className="text-end">Taxa Un. (Plat.)</th>
                        <th className="text-end">Total Venda</th>
                        <th>Data Compra</th>
                        <th className="text-center">Status</th>
                        <th>ID Pag. MP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedSalesDetails.map(sale => (
                        <tr key={sale.id}>
                          <td className="fw-medium">{eventNameMap.get(sale.evento_id) || sale.evento_id}</td>
                          <td>{sale.nome_comprador}</td>
                          <td>{sale.email_comprador}</td>
                          <td className="text-center">{sale.quantidade}</td>
                          <td className="text-end">R$ {sale.preco_ingresso_unitario.toFixed(2).replace('.', ',')}</td>
                          <td className="text-end">R$ {sale.taxa_servico_unitaria.toFixed(2).replace('.', ',')}</td>
                          <td className="text-end fw-bold">R$ {sale.valor_total_compra.toFixed(2).replace('.', ',')}</td>
                          <td>{new Date(sale.data_compra).toLocaleString('pt-BR')}</td>
                          <td className="text-center">
                            <span className={`badge small ${getStatusBadgeClass(sale.status)} d-inline-flex align-items-center`}>
                              {getStatusIcon(sale.status)} {getStatusText(sale.status)}
                            </span>
                          </td>
                          <td>{sale.mp_payment_id || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted text-center p-4">Nenhuma venda registrada.</p>
              )}
              {renderPaginationControls(salesDetailsCurrentPage, totalSalesDetailsPages, setSalesDetailsCurrentPage, "Vendas")}
            </div>
          </div>
        </div>

        {/* Sales Overview by Customer Section */}
        <div className={`tab-pane fade ${activeSection === 'customers' ? 'show active' : ''}`} id="customers-tab-pane" role="tabpanel" aria-labelledby="customers-tab">
          <div className="card border">
            <div className="card-header bg-light p-3">
              <h2 className="card-title fs-4 fw-semibold d-flex align-items-center gap-2 mb-0">
                <BarChartHorizontalBig className="text-primary" /> Visão Geral de Vendas (por Cliente)
              </h2>
              <p className="card-text text-muted small">Total de ingressos vendidos e valor gasto por cliente.</p>
            </div>
            <div className="card-body p-0">
              {paginatedCustomerSummary.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover table-striped align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">Nome do Cliente</th>
                        <th scope="col">Email do Cliente</th>
                        <th scope="col" className="text-center">Total de Ingressos</th>
                        <th scope="col" className="text-end">Valor Total Gasto (R$)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedCustomerSummary.map((summary) => (
                        <tr key={summary.email}>
                          <td className="fw-medium">{summary.name}</td>
                          <td>{summary.email}</td>
                          <td className="text-center">{summary.totalTickets}</td>
                          <td className="text-end">{summary.totalValue.toFixed(2).replace('.', ',')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted text-center p-4">Nenhuma venda registrada ainda.</p>
              )}
              {renderPaginationControls(customerSummaryCurrentPage, totalCustomerSummaryPages, setCustomerSummaryCurrentPage, "Clientes")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


