import Image from "next/image";
import { getWhatsAppUrl } from "@/lib/config";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-black pt-28 pb-20"
    >
      {/* Fondo: gradiente + halos rojos */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0d0306] to-black" />
      <div className="absolute -top-40 -right-40 w-[34rem] h-[34rem] rounded-full bg-usg-red/25 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[28rem] h-[28rem] rounded-full bg-usg-red/15 blur-[110px] pointer-events-none" />

      {/* Patrón sutil de cancha */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.6) 0 1px, transparent 1px 140px)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* ─── COLUMNA TEXTO ─── */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-usg-red/15 border border-usg-red/40 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-usg-red rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-white tracking-wider uppercase">
                Promoción Oficial USG · 2026
              </span>
            </div>

            <h1 className="font-display text-white tracking-tight leading-[0.88]">
              <span className="block text-white/70 text-xl sm:text-2xl md:text-3xl mb-3 tracking-[0.25em]">
                PROMOCIÓN
              </span>
              <span className="gradient-text-red block text-6xl sm:text-7xl md:text-[5.5rem]">
                USG LIGA
              </span>
              <span className="block text-white text-5xl sm:text-6xl md:text-[4.5rem]">
                DE CAMPEONES
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/75 mt-7 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              No todos los productos juegan igual. Acumula puntos por cada
              compra, sube en el ranking nacional y{" "}
              <span className="text-usg-red font-bold">mete más goles</span>{" "}
              por premios reales.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <p className="font-display text-3xl sm:text-4xl text-usg-red leading-none">
                  10
                </p>
                <p className="text-[10px] sm:text-xs text-white/55 uppercase tracking-wider mt-1">
                  Productos
                </p>
              </div>
              <div className="text-center lg:text-left border-x border-white/10 px-2">
                <p className="font-display text-3xl sm:text-4xl text-usg-red leading-none">
                  3
                </p>
                <p className="text-[10px] sm:text-xs text-white/55 uppercase tracking-wider mt-1">
                  Lugares ganadores
                </p>
              </div>
              <div className="text-center lg:text-left">
                <p className="font-display text-3xl sm:text-4xl text-usg-red leading-none">
                  100%
                </p>
                <p className="text-[10px] sm:text-xs text-white/55 uppercase tracking-wider mt-1">
                  Por WhatsApp
                </p>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-9 justify-center lg:justify-start">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-white font-bold px-7 py-4 rounded-full text-base sm:text-lg inline-flex items-center justify-center gap-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Inicia tu registro
              </a>
              <a
                href="#productos"
                className="border-2 border-white/25 hover:border-usg-red hover:bg-usg-red/10 text-white font-semibold px-7 py-4 rounded-full text-base sm:text-lg transition-all inline-flex items-center justify-center gap-2"
              >
                Ver reglas de puntos
              </a>
            </div>

            <p className="text-xs text-white/40 mt-6 max-w-md mx-auto lg:mx-0">
              Sin descargas · Sin formularios largos · Todo el registro y la
              gestión de tickets se hace por WhatsApp.
            </p>
          </div>

          {/* ─── COLUMNA IMAGEN GRANDE ─── */}
          <div className="lg:col-span-7 relative">
            <div className="relative">
              {/* Glow exterior */}
              <div className="absolute -inset-6 bg-gradient-to-br from-usg-red/50 via-usg-red-dark/30 to-transparent rounded-[2.5rem] blur-3xl pointer-events-none" />

              {/* Marco principal — la imagen es protagonista */}
              <div className="relative rounded-3xl overflow-hidden border border-usg-red/40 shadow-2xl shadow-usg-red/30">
                <Image
                  src="/backgrounds/hero-stadium-usg.jpg"
                  alt="¡La mejor selección es con USG! — Estadio USG con productos USG"
                  width={1920}
                  height={1080}
                  className="w-full h-auto object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                {/* Tinte sutil para integrar con la paleta */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/35 via-transparent to-usg-red/10 pointer-events-none" />
              </div>

              {/* Etiqueta flotante decorativa */}
              <div className="absolute -bottom-5 -right-3 sm:-right-5 bg-usg-red text-white font-display text-lg sm:text-2xl tracking-widest px-5 sm:px-7 py-3 rounded-full shadow-2xl shadow-usg-red/50 rotate-[-3deg] hidden sm:block">
                ¡A METER GOLES!
              </div>
              <div className="absolute -top-4 -left-3 sm:-left-5 bg-white text-black font-bold text-xs sm:text-sm tracking-widest px-4 sm:px-5 py-2 rounded-full shadow-2xl rotate-[2deg] hidden sm:block">
                ⚽ TEMPORADA 2026
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banda inferior estilo valla USG */}
      <div className="absolute bottom-0 left-0 right-0 h-7 usg-board hidden md:block" />
    </section>
  );
}
