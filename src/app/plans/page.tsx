
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Package, TrendingUp, Zap } from "lucide-react";

interface PlanFeatureProps {
  feature: string;
}

function PlanFeature({ feature }: PlanFeatureProps) {
  return (
    <li className="d-flex align-items-center gap-2">
      <CheckCircle className="h-5 w-5 text-success" />
      <span>{feature}</span>
    </li>
  );
}

export default function PlansPage() {
  return (
    <div className="container-fluid container-lg py-5 px-3">
      <header className="text-center mb-5">
        <Package className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="display-4 fw-bold text-primary">Nossos Planos</h1>
        <p className="fs-5 text-muted mt-2 mx-auto" style={{maxWidth: '700px'}}>
          Escolha o plano TrinkaPass perfeito para o sucesso dos seus eventos. Simples, transparente e poderoso.
        </p>
      </header>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
        {/* Plano Básico */}
        <div className="col">
          <div className="card border h-100"> {/* Removed shadow-lg */}
            <div className="card-header bg-light p-4">
              <Zap className="h-10 w-10 text-primary mb-3" />
              <h3 className="fs-3 fw-semibold text-primary">Plano Essencial</h3>
              <p className="text-muted">Ideal para começar e eventos menores.</p>
              <p className="display-6 fw-bold text-dark mt-2">R$ 2,00 <span className="fs-6 fw-normal text-muted">/ ingresso vendido</span></p>
            </div>
            <div className="card-body p-4 d-flex flex-column">
              <ul className="list-unstyled space-y-2 mb-4">
                <PlanFeature feature="Publicação de eventos ilimitada" />
                <PlanFeature feature="Venda de ingressos online" />
                <PlanFeature feature="Integração com Mercado Pago" />
                <PlanFeature feature="Página do evento personalizável" />
                <PlanFeature feature="QR Code para check-in (em breve)" />
                <PlanFeature feature="Suporte básico por e-mail" />
              </ul>
              <div className="mt-auto">
                <Link href="/organizer/register" className="btn btn-primary w-100 fs-5 py-2">Comece Agora</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Plano Pro (Placeholder) */}
        <div className="col">
          <div className="card border h-100 border-2 border-accent position-relative"> {/* Removed shadow-lg */}
            <div className="position-absolute top-0 end-0 bg-accent text-white small fw-semibold px-3 py-1 rounded-bottom-start rounded-top-end">Mais Popular</div>
            <div className="card-header p-4" style={{backgroundColor: 'var(--bs-accent-bg-subtle)'}}>
              <TrendingUp className="h-10 w-10 text-accent mb-3" />
              <h3 className="fs-3 fw-semibold text-accent">Plano Pro</h3>
              <p className="text-muted">Para organizadores que buscam mais.</p>
              <p className="display-6 fw-bold text-dark mt-2">Em Breve</p>
            </div>
            <div className="card-body p-4 d-flex flex-column">
              <ul className="list-unstyled space-y-2 mb-4">
                <PlanFeature feature="Todos os recursos do Plano Essencial" />
                <PlanFeature feature="Relatórios avançados de vendas" />
                <PlanFeature feature="Cupons de desconto personalizáveis" />
                <PlanFeature feature="Suporte prioritário" />
                <PlanFeature feature="Integração com ferramentas de marketing" />
                <PlanFeature feature="Múltiplos usuários por organização" />
              </ul>
              <div className="mt-auto">
                <button className="btn btn-accent w-100 fs-5 py-2" disabled>
                  Saiba Mais (Em Breve)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Plano Enterprise (Placeholder) */}
        <div className="col">
          <div className="card border h-100"> {/* Removed shadow-lg */}
            <div className="card-header bg-light p-4">
              <Package className="h-10 w-10 text-secondary mb-3" />
              <h3 className="fs-3 fw-semibold text-secondary">Plano Enterprise</h3>
              <p className="text-muted">Soluções customizadas para grandes eventos.</p>
              <p className="display-6 fw-bold text-dark mt-2">Sob Consulta</p>
            </div>
            <div className="card-body p-4 d-flex flex-column">
              <ul className="list-unstyled space-y-2 mb-4">
                <PlanFeature feature="Todos os recursos do Plano Pro" />
                <PlanFeature feature="Gerente de contas dedicado" />
                <PlanFeature feature="Desenvolvimento de funcionalidades sob demanda" />
                <PlanFeature feature="SLA personalizado" />
                <PlanFeature feature="Consultoria especializada" />
                <PlanFeature feature="White label options" />
              </ul>
              <div className="mt-auto">
                <Link href="mailto:contato@trinkapass.com.br?subject=Consulta Plano Enterprise" className="btn btn-secondary w-100 fs-5 py-2">Entre em Contato</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 text-center">
         <Image
            src="https://picsum.photos/seed/trinkapass-plans-footer/800/300"
            alt="Pessoas em um evento"
            width={800}
            height={300}
            className="rounded-3 border img-fluid mx-auto mb-4" /* Removed shadow-sm */
            data-ai-hint="event crowd concert"
          />
        <p className="text-muted">
          Dúvidas sobre qual plano escolher? <Link href="/learn-more#contact" className="text-primary text-decoration-none hover-underline">Fale conosco</Link>.
        </p>
      </div>
    </div>
  );
}

