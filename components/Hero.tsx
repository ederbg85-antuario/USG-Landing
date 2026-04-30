import { getWhatsAppUrl } from "@/lib/config";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden stadium-bg pt-24 pb-16"
    >
      {/* Diagonal red accent */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-usg-red/30 via-usg-red/5 to-transparent transform skew-x-12 origin-top-right" />
      </div>

      {/* Field lines pattern */}
      <div className="absolute inset-0 diagonal-stripes opacity-50 pointer-events-none" />

      {/* Animated soccer ball decoration */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-usg-red/10 blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-usg-red/15 blur-3xl pointer-events-none animate-pulse-slow" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-usg-red/15 border border-usg-red/40 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-usg-red rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-white tracking-wider uppercase">
                Promoción Oficial 2026
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[0.9] mb-4">
              <span className="block text-white/70 text-3xl sm:text-4xl md:text-5xl mb-2">
                PROMO
              </span>
              <span className="gradient-text-red">USG LIGA</span>
              <span className="block text-white">DE CAMPEONES</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/80 mt-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              No todos los productos juegan igual. Acumula puntos por cada
              compra, sube en el ranking nacional y{" "}
              <span className="text-usg-red font-bold">mete más goles</span>{" "}
              por premios reales.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mt-8 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <p className="font-display text-3xl sm:text-4xl text-usg-red leading-none">
                  $500K
                </p>
                <p className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wider mt-1">
                  En premios
                </p>
              </div>
              <div className="text-center lg:text-left border-x border-white/10 px-2">
                <p className="font-display text-3xl sm:text-4xl text-usg-red leading-none">
                  10
                </p>
                <p className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wider mt-1">
                  Productos
                </p>
              </div>
              <div className="text-center lg:text-left">
                <p className="font-display text-3xl sm:text-4xl text-usg-red leading-none">
                  100%
                </p>
                <p className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wider mt-1">
                  Por WhatsApp
                </p>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center lg:justify-start">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-white font-bold px-8 py-4 rounded-full text-base sm:text-lg inline-flex items-center justify-center gap-3 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Inicia tu registro en WhatsApp
              </a>
              <a
                href="#mecanica"
                className="border-2 border-white/30 hover:border-usg-red hover:bg-usg-red/10 text-white font-semibold px-8 py-4 rounded-full text-base sm:text-lg transition-all inline-flex items-center justify-center gap-2"
              >
                Cómo se juega
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </a>
            </div>

            <p className="text-xs text-white/40 mt-6 max-w-md mx-auto lg:mx-0">
              Sin descargas. Sin formularios largos. Todo el registro y la
              gestión de tickets se hace por WhatsApp.
            </p>
          </div>

          {/* Visual side — soccer/trophy illustration */}
          <div className="relative hidden lg:flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              {/* Trophy circle */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-usg-red via-usg-red-dark to-black opacity-90" />
              <div className="absolute inset-4 rounded-full border-2 border-white/20 backdrop-blur-sm" />
              <div className="absolute inset-8 rounded-full border border-white/10" />

              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <div className="text-7xl mb-4 animate-bounce-slow">🏆</div>
                <p className="font-display text-5xl text-white leading-none mb-2">
                  $500,000
                </p>
                <p className="font-display text-2xl text-white/90 mb-1">MXN</p>
                <p className="text-sm text-white/70 uppercase tracking-widest">
                  Bolsa total de premios
                </p>
              </div>

              {/* Floating ball */}
              <div className="absolute -top-4 -right-4 text-6xl animate-bounce-slow">
                ⚽
              </div>
              <div className="absolute -bottom-2 -left-2 text-5xl animate-pulse-slow">
                🥇
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
        <div className="flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
