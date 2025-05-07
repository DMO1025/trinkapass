
import * as React from "react"; // Added import
import Image from "next/image";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"; // Keep ShadCN Accordion
import { HelpCircle, Lightbulb, Mail, CheckSquare, BarChart2, ShieldCheck, Share2 } from "lucide-react";

export default function LearnMorePage() {
  return (
    <div className="container-fluid container-lg py-5 px-3">
      <div className="card border overflow-hidden"> {/* Removed shadow-xl */}
        <div className="position-relative" style={{ height: '350px' }}>
          <Image
            src="https://picsum.photos/seed/trinkapass-learn/1200/400"
            alt="Banner Saiba Mais TrinkaPass"
            layout="fill"
            objectFit="cover"
            data-ai-hint="technology innovation"
          />
          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <Lightbulb className="h-16 w-16 text-accent mb-4" />
            <h1 className="display-4 fw-bold text-white">Descubra o Poder do TrinkaPass</h1>
            <p className="fs-5 text-light mt-2 mx-auto" style={{maxWidth: '700px'}}>
              Transforme a gestão dos seus eventos com nossa plataforma intuitiva e completa.
            </p>
          </div>
        </div>

        <div className="card-body p-4 p-md-5">
          <section className="mb-5">
            <h2 className="display-5 fw-semibold text-primary mb-4 text-center">Por que escolher o TrinkaPass?</h2>
            <div className="row row-cols-1 row-cols-md-2 g-4">
              <FeatureCard
                icon={<CheckSquare className="text-accent" />}
                title="Gestão Simplificada"
                description="Crie e gerencie seus eventos com facilidade, desde a configuração inicial até o acompanhamento das vendas em tempo real."
              />
              <FeatureCard
                icon={<BarChart2 className="text-accent" />}
                title="Vendas Otimizadas"
                description="Ofereça uma experiência de compra fluida para seus clientes com integração direta ao Mercado Pago para pagamentos PIX seguros."
              />
              <FeatureCard
                icon={<ShieldCheck className="text-accent" />}
                title="Segurança e Confiança"
                description="Transações protegidas e dados dos compradores gerenciados com responsabilidade, garantindo tranquilidade para você e seus clientes."
              />
              <FeatureCard
                icon={<Share2 className="text-accent" />}
                title="Alcance Ampliado"
                description="Divulgue seus eventos em uma plataforma com visibilidade, atraindo mais participantes e impulsionando suas vendas."
              />
            </div>
          </section>

          <section className="mb-5">
            <h2 className="display-5 fw-semibold text-primary mb-4 text-center">Como Funciona?</h2>
            <div className="d-grid gap-3">
              <StepItem number="1" title="Cadastre-se Gratuitamente" description="Crie sua conta de organizador em minutos e comece a explorar a plataforma." />
              <StepItem number="2" title="Crie seu Evento" description="Adicione todas as informações do seu evento: nome, descrição, data, local, preço e quantidade de ingressos." />
              <StepItem number="3" title="Configure o Pagamento" description="Integre sua conta Mercado Pago para receber os pagamentos dos ingressos vendidos de forma segura e automática." />
              <StepItem number="4" title="Divulgue e Venda" description="Compartilhe o link do seu evento e acompanhe as vendas através do seu painel de organizador." />
              <StepItem number="5" title="Acompanhe seus Compradores" description="Visualize a lista de compradores, com nome, e-mail e WhatsApp para facilitar a comunicação e o check-in." />
            </div>
          </section>
          
          <section className="mb-5">
            <h2 className="display-5 fw-semibold text-primary mb-4 text-center">Perguntas Frequentes</h2>
            {/* Using ShadCN Accordion as it provides good structure. Bootstrap accordion requires more specific markup. */}
            <Accordion type="single" collapsible className="w-full border rounded-3 overflow-hidden">
              <AccordionItem value="item-1" className="border-bottom">
                <AccordionTrigger className="fs-5 p-3 hover:text-secondary bg-light">Quais são as taxas do TrinkaPass?</AccordionTrigger>
                <AccordionContent className="p-3 text-muted">
                  Atualmente, o TrinkaPass opera com uma taxa de serviço de R$ 2,00 por ingresso vendido. Não há custos para listar eventos. Esta taxa é adicionada ao valor do ingresso pago pelo comprador.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-bottom">
                <AccordionTrigger className="fs-5 p-3 hover:text-secondary bg-light">Como recebo o dinheiro das vendas?</AccordionTrigger>
                <AccordionContent className="p-3 text-muted">
                  Os pagamentos são processados diretamente pela sua conta Mercado Pago. Após a confirmação do pagamento PIX pelo comprador, o valor (descontadas as taxas do Mercado Pago, se houver) é creditado na sua conta Mercado Pago conforme os prazos e políticas deles.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-bottom">
                <AccordionTrigger className="fs-5 p-3 hover:text-secondary bg-light">Posso vender ingressos gratuitos?</AccordionTrigger>
                <AccordionContent className="p-3 text-muted">
                  Sim! Você pode configurar o preço do ingresso como R$ 0,00 para eventos gratuitos. Nesse caso, a taxa de serviço do TrinkaPass não é aplicada.
                </AccordionContent>
              </AccordionItem>
               <AccordionItem value="item-4" className="border-0">
                <AccordionTrigger className="fs-5 p-3 hover:text-secondary bg-light">Como funciona o suporte ao cliente?</AccordionTrigger>
                <AccordionContent className="p-3 text-muted">
                  Oferecemos suporte por e-mail para todos os usuários. Organizadores com planos futuros poderão ter acesso a canais de suporte prioritário. Nosso objetivo é responder a todas as questões o mais rápido possível.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <section id="contact" className="text-center pt-4">
            <HelpCircle className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="display-5 fw-semibold text-primary mb-3">Ainda tem dúvidas?</h2>
            <p className="text-muted mb-4 mx-auto" style={{maxWidth: '600px'}}>
              Nossa equipe está pronta para ajudar você a ter a melhor experiência com o TrinkaPass.
            </p>
            <Link href="mailto:contato@trinkapass.com.br?subject=Dúvida sobre o TrinkaPass" className="btn btn-accent btn-lg fs-5 py-2 px-4">
                <Mail className="me-2 h-5 w-5" /> Entre em Contato
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="col">
      <div className="card bg-light h-100 p-4 rounded-3 border"> {/* Removed shadow-sm */}
        <div className="d-flex align-items-center gap-3 mb-3">
          {React.cloneElement(icon as React.ReactElement, { className: 'h-8 w-8' })}
          <h3 className="fs-4 fw-semibold text-secondary mb-0">{title}</h3>
        </div>
        <p className="text-muted small lh-base">{description}</p>
      </div>
    </div>
  );
}

interface StepItemProps {
  number: string;
  title: string;
  description: string;
}

function StepItem({ number, title, description }: StepItemProps) {
  return (
    <div className="d-flex align-items-start gap-3 p-3 bg-white rounded-3 border">
      <div className="flex-shrink-0 h-10 w-10 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fs-5 fw-bold">
        {number}
      </div>
      <div>
        <h4 className="fs-5 fw-semibold text-dark mb-1">{title}</h4>
        <p className="text-muted small mb-0">{description}</p>
      </div>
    </div>
  );
}

