import { getWhatsAppUrl } from "@/lib/config";
import PrizeMarquee from "@/components/PrizeMarquee";

/**
 * ============================================================
 * HERO PRINCIPAL — USG LIGA DE CAMPEONES
 * ============================================================
 *
 *  · Texto/CTAs centrados en la parte superior.
 *  · Banner CORREDIZO de premios reales full-width en la parte
 *    inferior — se desplaza solo sin pausa.
 *  · Diseñado para máximo impacto visual.
 * ============================================================
 */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex flex-col overflow-hidden
                 min-h-[100svh] lg:min-h-screen
                 pt-24 sm:pt-28 lg:pt-32
                 pb-10 sm:pb-14"
    >
      {/* Capa de fondo: oscurecedor + halos rojos suaves */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/45 to-black/75"
      />
      <div
        aria-hidden
        className="absolute -top-40 -right-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-usg-red/30 blur-[110px] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-32 -z-10 h-[24rem] w-[24rem] rounded-full bg-usg-red/20 blur-[120px] pointer-events-none"
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
        {/* ─── TEXTO + CTA — centrados ─── */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge superior */}
          <div className="inline-flex items-center gap-2 rounded-full border border-usg-red/40 bg-usg-red/10 px-3 py-1.5 backdrop-blur-sm sm:px-4 sm:py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-usg-red" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white sm:text-xs">
              Promoción Oficial USG · 2026
            </span>
          </div>

          {/* Titular principal */}
          <h1 className="mt-5 font-display tracking-tight text-white">
            <span className="block text-sm font-semibold uppercase tracking-[0.32em] text-white/55 sm:text-base">
              Promoción
            </span>
            <span className="mt-2 block text-[2.75rem] leading-[0.9] gradient-text-red xs:text-[3.25rem] sm:text-7xl lg:text-[6rem] xl:text-[7rem]">
              USG LIGA
            </span>
            <span className="mt-1 block text-[2.25rem] leading-[0.92] text-white xs:text-[2.75rem] sm:text-6xl lg:text-[5rem] xl:text-[5.5rem]">
              DE CAMPEONES
            </span>
          </h1>

          {/* Descripción */}
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/85 sm:mt-6 sm:text-base lg:text-lg">
            Acumula puntos con cada compra USG, sube en el ranking nacional y{" "}
            <span className="font-bold text-usg-red">mete más goles</span> por
            premios reales.
          </p>

          {/* Stats — 3 columnas compactas */}
          <div className="mx-auto mt-6 grid max-w-md grid-cols-3 gap-3 sm:mt-7 sm:gap-4">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] px-2 py-3 text-center backdrop-blur-sm sm:py-4">
              <p className="font-display text-3xl leading-none text-usg-red sm:text-4xl">
                48
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-white/70 sm:text-xs">
                Premios físicos
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] px-2 py-3 text-center backdrop-blur-sm sm:py-4">
              <p className="font-display text-3xl leading-none text-usg-red sm:text-4xl">
                3
              </p>
              <p className="mt-1 text-[10px] uppercase leading-tight tracking-wider text-white/70 sm:text-xs">
                Niveles de puntos
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] px-2 py-3 text-center backdrop-blur-sm sm:py-4">
              <p className="font-display text-3xl leading-none text-usg-red sm:text-4xl">
                100%
              </p>
              <p className="mt-1 text-[10px] uppercase leading-tight tracking-wider text-white/70 sm:text-xs">
                Por WhatsApp
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:mt-8 sm:flex-row">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-bold text-white sm:px-7 sm:py-4 sm:text-base lg:text-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 sm:h-6 sm:w-6"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Inicia tu registro
            </a>
            <a
              href="#premios"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-usg-red hover:bg-usg-red/10 sm:px-7 sm:py-4 sm:text-base lg:text-lg"
            >
              Ver premios
            </a>
          </div>

          <p className="mx-auto mt-5 max-w-md text-[11px] leading-relaxed text-white/55 sm:mt-6 sm:text-xs">
            Registro rápido por WhatsApp · Sin descargas · Sin formularios largos.
          </p>
        </div>
      </div>

      {/* ─── BANNER CORREDIZO DE PREMIOS — full-width ─── */}
      <div className="relative mt-8 sm:mt-12">
        {/* Línea superior decorativa */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-usg-red to-transparent" />

        <div className="relative bg-gradient-to-b from-black/40 via-black/60 to-black/80 pt-5 sm:pt-7">
          {/* Etiqueta arriba */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-3 sm:mb-4">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 sm:w-14 bg-usg-red/50" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.32em] text-white/80">
                ⚽ Estos son los premios que juegas
              </span>
              <span className="h-px w-8 sm:w-14 bg-usg-red/50" />
            </div>
          </div>

          <PrizeMarquee />
        </div>
      </div>
    </section>
  );
}
