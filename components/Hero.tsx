import { getWhatsAppUrl } from "@/lib/config";
import PrizeMarquee from "@/components/PrizeMarquee";

/**
 * ============================================================
 * HERO PRINCIPAL — USG LIGA DE CAMPEONES
 * ============================================================
 *
 *  · Layout asimétrico desktop (7 / 5): titular épico a la
 *    izquierda y un "tablero / marcador deportivo" a la derecha
 *    con las cifras clave de la promoción.
 *  · Mobile: stack vertical compacto con jerarquía clara.
 *  · Banner CORREDIZO de premios reales (PrizeMarquee) al pie,
 *    full-width, sin pausa.
 * ============================================================
 */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex flex-col overflow-hidden
                 min-h-[100svh] lg:min-h-screen
                 pt-24 sm:pt-28 lg:pt-32
                 pb-8 sm:pb-12"
    >
      {/* Capa de fondo — gradiente sutil para integrar la cancha sin perder legibilidad */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/65 via-black/40 to-black/70"
      />
      <div
        aria-hidden
        className="absolute -top-40 -right-40 -z-10 h-[34rem] w-[34rem] rounded-full bg-usg-red/35 blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-32 -z-10 h-[26rem] w-[26rem] rounded-full bg-usg-red/20 blur-[120px] pointer-events-none"
      />
      {/* Patrón de líneas diagonal sutil */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-30 diagonal-stripes pointer-events-none"
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex items-center">
        <div className="grid w-full items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* ─── COLUMNA TEXTO (7 cols en desktop) ─── */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Badge superior con shield/star */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-usg-red/50 bg-usg-red/15 px-4 py-2 backdrop-blur-md shadow-lg shadow-usg-red/20">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-usg-red opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-usg-red" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-white sm:text-xs">
                Promoción Oficial USG · Temporada 2026
              </span>
            </div>

            {/* Pre-titular (eyebrow) */}
            <p className="mt-6 font-display text-base uppercase tracking-[0.4em] text-white/60 sm:text-lg">
              ¡Mete goles y gana!
            </p>

            {/* Titular épico con outline + drop shadow */}
            <h1 className="mt-3 font-display tracking-tight text-white">
              <span className="block text-[3rem] leading-[0.86] gradient-text-red xs:text-[3.5rem] sm:text-[5.5rem] md:text-[6rem] lg:text-[6.5rem] xl:text-[7.5rem] drop-shadow-[0_6px_28px_rgba(200,16,46,0.45)]">
                USG LIGA
              </span>
              <span className="mt-1 block text-[2.5rem] leading-[0.9] text-white xs:text-[2.85rem] sm:text-[4.5rem] md:text-[5rem] lg:text-[5.25rem] xl:text-[5.75rem] drop-shadow-[0_4px_20px_rgba(0,0,0,0.65)]">
                DE CAMPEONES
              </span>
            </h1>

            {/* Línea decorativa */}
            <div className="mt-6 flex justify-center lg:justify-start">
              <div className="flex items-center gap-3">
                <span className="block h-1 w-12 rounded-full bg-usg-red" />
                <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-white/80 sm:text-xs">
                  48 premios · 3 niveles · 2 meses
                </span>
                <span className="block h-1 w-12 rounded-full bg-usg-red" />
              </div>
            </div>

            {/* Descripción */}
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg lg:mx-0">
              Acumula puntos con cada compra USG, sube en el ranking nacional
              y llévate{" "}
              <span className="font-bold text-white">motocicletas, Smart TVs, herramienta profesional</span>{" "}
              y mucho más.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row lg:justify-start">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-4 text-base font-bold text-white sm:px-9 sm:py-5 sm:text-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 sm:h-7 sm:w-7"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Inicia tu registro
              </a>
              <a
                href="#premios"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 bg-black/30 px-7 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-usg-red hover:bg-usg-red/15 sm:px-9 sm:py-5 sm:text-lg"
              >
                Ver premios →
              </a>
            </div>

            <p className="mx-auto mt-5 max-w-md text-[11px] leading-relaxed text-white/55 sm:text-xs lg:mx-0">
              Registro rápido por WhatsApp · Toma menos de 1 minuto
            </p>
          </div>

          {/* ─── COLUMNA TABLERO/MARCADOR (5 cols en desktop) ─── */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Glow detrás */}
              <div
                aria-hidden
                className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-usg-red/50 via-usg-red-dark/30 to-transparent opacity-80 blur-2xl"
              />

              {/* Tarjeta principal — estilo "scoreboard / tablero deportivo" */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-usg-red/50 bg-gradient-to-br from-black/90 via-[#1a0207]/85 to-black/95 shadow-2xl shadow-usg-red/25 backdrop-blur-md sm:rounded-3xl">
                {/* Header del tablero */}
                <div className="relative border-b-2 border-usg-red/40 bg-gradient-to-r from-usg-red via-usg-red-dark to-usg-red px-5 py-3 sm:px-7 sm:py-4">
                  <div className="absolute inset-0 diagonal-stripes opacity-30" />
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl sm:text-2xl">⚽</span>
                      <span className="font-display text-sm tracking-[0.18em] text-white sm:text-base">
                        MARCADOR · 2026
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                      Activo
                    </span>
                  </div>
                </div>

                {/* Body — stats grid */}
                <div className="p-5 sm:p-7">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <ScoreCell
                      number="48"
                      label="Premios físicos"
                      icon="🏆"
                      accent="from-yellow-400/20 to-yellow-600/5"
                    />
                    <ScoreCell
                      number="3"
                      label="Niveles de puntos"
                      icon="🎯"
                      accent="from-usg-red/30 to-usg-red/5"
                    />
                    <ScoreCell
                      number="11"
                      label="Productos USG"
                      icon="📦"
                      accent="from-blue-400/20 to-blue-600/5"
                    />
                    <ScoreCell
                      number="100%"
                      label="Por WhatsApp"
                      icon="💬"
                      accent="from-green-400/20 to-green-600/5"
                    />
                  </div>

                  {/* Divisor con tagline */}
                  <div className="mt-5 flex items-center gap-3">
                    <span className="h-px flex-1 bg-gradient-to-r from-transparent via-usg-red/50 to-transparent" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">
                      Cómo ganar
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-transparent via-usg-red/50 to-transparent" />
                  </div>

                  {/* Mini-pasos */}
                  <ol className="mt-4 space-y-2.5">
                    <ScoreStep n="1" text="Regístrate por WhatsApp" />
                    <ScoreStep n="2" text="Envía tickets de compra USG" />
                    <ScoreStep n="3" text="Sube en el ranking y gana" />
                  </ol>
                </div>
              </div>

              {/* Etiquetas flotantes — pequeñas decoraciones */}
              <div className="absolute -top-3 -left-3 rotate-[-4deg] rounded-full bg-yellow-400 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black shadow-xl sm:-top-4 sm:-left-4 sm:px-4 sm:py-1.5 sm:text-xs">
                ★ Oficial
              </div>
              <div className="absolute -bottom-3 -right-3 rotate-[3deg] rounded-full bg-white px-3.5 py-1.5 font-display text-xs tracking-widest text-usg-red shadow-2xl sm:-bottom-4 sm:-right-4 sm:px-5 sm:py-2 sm:text-sm">
                ¡A METER GOLES!
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── BANNER CORREDIZO DE PREMIOS — full-width ─── */}
      <div className="relative mt-10 sm:mt-14">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-usg-red to-transparent" />

        <div className="relative bg-gradient-to-b from-black/45 via-black/65 to-black/85 pt-5 sm:pt-7">
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

/* ────────────────────────────────────────────────────────────
 *  Subcomponentes del tablero
 * ────────────────────────────────────────────────────────── */

function ScoreCell({
  number,
  label,
  icon,
  accent,
}: {
  number: string;
  label: string;
  icon: string;
  accent: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${accent} px-3 py-3 sm:px-4 sm:py-4`}
    >
      <div className="absolute top-2 right-2 text-base sm:text-lg opacity-60">
        {icon}
      </div>
      <p className="font-display text-3xl leading-none text-white sm:text-4xl">
        {number}
      </p>
      <p className="mt-1.5 text-[10px] font-semibold uppercase leading-tight tracking-wider text-white/65 sm:text-[11px]">
        {label}
      </p>
    </div>
  );
}

function ScoreStep({ n, text }: { n: string; text: string }) {
  return (
    <li className="flex items-center gap-3 text-sm text-white/85 sm:text-[15px]">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-usg-red font-display text-xs text-white shadow-md shadow-usg-red/40 sm:h-7 sm:w-7 sm:text-sm">
        {n}
      </span>
      <span className="font-medium">{text}</span>
    </li>
  );
}
