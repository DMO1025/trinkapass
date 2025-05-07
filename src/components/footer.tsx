export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-4 text-center mt-auto"> {/* mt-auto for sticky footer with flexbox */}
      <div className="container"> {/* Bootstrap container */}
        <p className="mb-1">
          &copy; {new Date().getFullYear()} TrinkaPass. Todos os direitos reservados.
        </p>
        <p className="text-light opacity-75 small">
          Sua plataforma completa para ingressos de eventos.
        </p>
      </div>
    </footer>
  );
}
