export default function MoreProductsCTA() {
  return (
    <section className="relative bg-black/70 border-t border-white/10 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h2 className="font-display text-2xl sm:text-4xl text-white tracking-wide leading-tight mb-2">
              ¿Quieres conocer todo el catálogo USG?
            </h2>
            <p className="text-white/65 text-sm sm:text-base">
              Para consultar más productos USG da click aquí.
            </p>
          </div>
          <a
            href="https://www.usg.com/es-MX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-usg-red text-white font-bold px-7 sm:px-9 py-4 rounded-full text-base shadow-2xl shadow-usg-red/30 hover:scale-105 transition-transform flex-shrink-0"
          >
            Ver más productos USG
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
