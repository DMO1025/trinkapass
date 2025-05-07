
import Image from "next/image";
import { Info, Target, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container-fluid container-lg py-5 px-3">
      <div className="card border"> {/* Removed shadow-xl */}
        <div className="card-header text-center p-4 p-md-5 bg-light">
          <Info className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="display-4 fw-bold text-primary">Sobre o TrinkaPass</h1>
          <p className="fs-5 text-muted mt-2">
            Conectando você às melhores experiências, de forma simples e segura.
          </p>
        </div>
        <div className="card-body p-4 p-md-5">
          <div className="text-center mb-5">
            <Image
              src="https://picsum.photos/seed/trinkapass-about/800/400"
              alt="Equipe TrinkaPass"
              width={800}
              height={400}
              className="rounded-3 img-fluid border" /* Removed shadow-sm */
              data-ai-hint="team collaboration"
            />
          </div>

          <section className="mb-5">
            <h2 className="fs-2 fw-semibold text-secondary d-flex align-items-center gap-2 mb-3">
              <Target className="h-7 w-7" /> Nossa Missão
            </h2>
            <p className="text-dark lh-lg">
              No TrinkaPass, nossa missão é revolucionar a maneira como as pessoas descobrem e participam de eventos.
              Acreditamos que o acesso a experiências memoráveis deve ser fácil, seguro e acessível a todos.
              Trabalhamos para empoderar organizadores de eventos com ferramentas poderosas e intuitivas,
              enquanto oferecemos aos participantes uma plataforma confiável para encontrar e adquirir ingressos
              para os eventos que amam.
            </p>
            <p className="text-dark lh-lg mt-3">
              Buscamos constantemente inovação, priorizando a transparência e a satisfação de nossos usuários,
              sejam eles organizadores planejando seu próximo grande evento ou participantes ansiosos pela próxima
              aventura cultural, esportiva ou de entretenimento.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="fs-2 fw-semibold text-secondary d-flex align-items-center gap-2 mb-3">
              <Users className="h-7 w-7" /> Quem Somos
            </h2>
            <p className="text-dark lh-lg">
              O TrinkaPass é uma plataforma idealizada por entusiastas de eventos, para entusiastas de eventos.
              Nascemos da necessidade de simplificar a complexa tarefa de gerenciamento e venda de ingressos online,
              oferecendo uma solução completa que atende desde pequenos encontros locais até grandes festivais.
              Nossa equipe é composta por desenvolvedores, designers e especialistas em eventos dedicados a criar
              a melhor experiência possível.
            </p>
            <p className="text-dark lh-lg mt-3">
              Valorizamos a comunidade, a inovação e a paixão por criar momentos inesquecíveis. Estamos comprometidos
              em fornecer um serviço de excelência, com suporte ágil e focado nas necessidades de nossos clientes.
            </p>
          </section>

          <section>
            <h2 className="fs-2 fw-semibold text-secondary mb-3">Nossos Valores</h2>
            <ul className="list-group list-group-flush">
              <li className="list-group-item border-0 px-0 py-2"><strong className="text-primary">Inovação:</strong> Buscar constantemente novas soluções para melhorar a experiência de eventos.</li>
              <li className="list-group-item border-0 px-0 py-2"><strong className="text-primary">Confiança:</strong> Garantir transações seguras e transparentes para todos os usuários.</li>
              <li className="list-group-item border-0 px-0 py-2"><strong className="text-primary">Comunidade:</strong> Fomentar conexões entre organizadores e participantes.</li>
              <li className="list-group-item border-0 px-0 py-2"><strong className="text-primary">Simplicidade:</strong> Tornar o processo de compra e venda de ingressos o mais fácil possível.</li>
              <li className="list-group-item border-0 px-0 py-2"><strong className="text-primary">Paixão:</strong> Dedicação em ajudar a criar eventos e experiências memoráveis.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

