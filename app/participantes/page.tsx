import Link from "next/link";

const participants = [
  { name: "Ana Clara Silva Vila Nova", initials: "AC", color: "participant-blue" },
  { name: "Bruna Ferreira da Silva", initials: "BF", color: "participant-sky" },
  { name: "Júlia Gomes Teixeira", initials: "JG", color: "participant-indigo" },
];

export default function ParticipantsPage() {
  return (
    <main className="participants-page">
      <header className="participants-header">
        <Link aria-label="Voltar ao sistema" className="participants-brand" href="/">
          <span className="participants-brand-mark" aria-hidden="true">✦</span>
          <span>Achados<span>&amp;</span>Perdidos<small>ESCOLAR</small></span>
        </Link>
        <Link className="participants-back" href="/">Voltar ao sistema</Link>
      </header>

      <section className="participants-content">
        <span className="eyebrow">S.C.O.P.E. · ACHADOS E PERDIDOS ESCOLAR</span>
        <h1>Participantes</h1>
        <p className="participants-lead">
          Este projeto foi desenvolvido em equipe para facilitar a consulta e o
          gerenciamento de objetos encontrados no ambiente escolar.
        </p>

        <div className="participants-grid">
          {participants.map((participant) => (
            <article className="participant-card" key={participant.name}>
              <span className={`participant-avatar ${participant.color}`}>
                {participant.initials}
              </span>
              <span className="participant-label">Integrante do projeto</span>
              <h2>{participant.name}</h2>
              <p>Achados e Perdidos Escolar</p>
            </article>
          ))}
        </div>

        <div className="participants-purpose">
          <span className="participants-purpose-icon" aria-hidden="true">✦</span>
          <p>
            <strong>Nosso propósito</strong>
            Facilitar o reencontro entre a comunidade escolar e os objetos
            perdidos, com uma consulta simples e acessível.
          </p>
        </div>
      </section>

      <footer className="participants-footer">
        Projeto escolar · Next.js, React, TypeScript e LocalStorage
      </footer>
    </main>
  );
}
