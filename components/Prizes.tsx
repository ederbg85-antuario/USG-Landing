import Image from "next/image";
import { PRIZES, getWhatsAppUrl } from "@/lib/config";
import UsgLogo from "@/components/UsgLogo";

const TOTAL_PRIZES = PRIZES.reduce((acc, p) => acc + p.quantity, 0);

export default function Prizes() {
  return (
    <section
      id="premios"
      className="relative py-16 sm:py-24 lg:py-28 overflow-hidden bg-gradient-to-b from-black/85 via-[#100407]/90 to-black/85"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-usg-red/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
        <UsgLogo variant="light" className="w-[80%] max-w-4xl h-auto" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-usg-red text-sm font-bold tracking-widest uppercase mb-3">
            Premios
          </span>
          <h2 className="font-display text-4xl xs:text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[0.92] mb-5 sm:mb-6">
            ¡La mejor selección
            <span className="block gradient-text-red">se lleva los premios!</span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            <span className="text-usg-red font-semibold">{TOTAL_PRIZES} premios</span>{" "}
            físicos en juego: motocicletas Italika, Smart TVs LG y TCL,
            rotomartillos Bosch, audífonos Beats y herramienta profesional.
          </p>
        </div>

        {/* Premios reales — grid con imágenes oficiales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto mb-12">
          {PRIZES.map((prize, idx) => {
            const isTop = idx === 0;
            return (
              <div
                key={prize.name}
                className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 ${
                  isTop
                    ? "border-yellow-400/60 bg-gradient-to-br from-yellow-500/15 via-black to-black shadow-2xl shadow-yellow-400/15 lg:scale-[1.02]"
                    : "border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] hover:border-usg-red/50"
                } transition-all duration-300`}
              >
                {/* Glow accent */}
                <div
                  className={`absolute -top-20 -right-20 w-44 h-44 rounded-full blur-3xl opacity-40 bg-gradient-to-br ${prize.accent}`}
                />

                {/* Badge cantidad */}
                <div className="absolute top-3 left-3 z-20">
                  <div
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 backdrop-blur-md shadow-lg ${
                      isTop
                        ? "bg-yellow-400 text-black"
                        : "bg-usg-red text-white"
                    }`}
                  >
                    <span className="font-display text-base leading-none">
                      ×{prize.quantity}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-widest">
                      Ganadores
                    </span>
                  </div>
                </div>

                {/* Medal */}
                {isTop && (
                  <div className="absolute top-3 right-3 z-20 text-3xl drop-shadow-lg">
                    {prize.medal}
                  </div>
                )}

                {/* Imagen del premio — fondo blanco uniforme para homogeneizar proporciones */}
                <div className="relative aspect-[4/3] overflow-hidden p-3 sm:p-4">
                  <div className="relative w-full h-full bg-white rounded-xl overflow-hidden shadow-inner">
                    <Image
                      src={prize.image}
                      alt={prize.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-3 sm:p-5 group-hover:scale-[1.04] transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="relative z-10 p-5 sm:p-6 border-t border-white/10">
                  <p className="font-display text-lg sm:text-xl text-white leading-tight tracking-wide mb-1.5">
                    {prize.name}
                  </p>
                  <p className="text-[11px] sm:text-xs text-white/60 uppercase tracking-wider leading-snug">
                    {prize.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tira de resumen */}
        <div className="max-w-4xl mx-auto mb-10 bg-gradient-to-r from-usg-red/10 via-usg-red/25 to-usg-red/10 border border-usg-red/30 rounded-2xl p-5 sm:p-6 backdrop-blur-sm text-center">
          <p className="text-white font-display text-2xl sm:text-3xl tracking-wide leading-tight">
            {TOTAL_PRIZES} ganadores · {PRIZES.length} categorías
          </p>
          <p className="text-white/70 text-sm sm:text-base mt-2">
            Mientras más alto subas en el ranking, mejor el premio que te llevas.
          </p>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-white/40 max-w-2xl mx-auto mb-8">
          *Los premios físicos se entregan a los ganadores oficiales conforme a
          la posición final en el ranking. Productos USG se otorgan mediante NDC
          al distribuidor.
        </p>

        {/* CTA */}
        <div className="text-center">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-white font-bold px-8 py-4 rounded-full text-lg inline-flex items-center justify-center gap-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Quiero competir por estos premios
          </a>
        </div>
      </div>
    </section>
  );
}
