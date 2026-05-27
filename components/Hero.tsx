import Image from "next/image";
import { getWhatsAppUrl } from "@/lib/config";

/**
 * ============================================================
 * HERO PRINCIPAL — USG LIGA DE CAMPEONES
 * ============================================================
 *
 *  · Desktop (lg+): rejilla 6/6 equilibrada. El banner cuadrado
 *    de premios se ve COMPLETO (object-contain, sin recortes),
 *    con altura controlada para que nunca supere el viewport.
 *  · Mobile: stack vertical con el titular arriba y el banner
 *    de premios debajo, manteniendo la misma estética.
 *  · Texto con jerarquía y tamaños calibrados para no romper
 *    la proporción visual con la imagen.
 * ============================================================
 */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex flex-col overflow-hidden
                 min-h-[100svh] lg:min-h-screen
                 pt-24 sm:pt-28 lg:pt-32
                 pb-12 sm:pb-16 lg:pb-20"
    >
      {/* ─── Capa de fondo: oscurecedor + halos rojos ─── */}
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
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-20 diagonal-stripes pointer-events-none"
      />

      <div className="container relative mx-auto flex flex-1 items-center px-4 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          {/* ─── COLUMNA TEXTO ─── */}
          <div className="text-center lg:col-span-6 lg:text-left xl:col-span-6">
            {/* Badge superior */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-usg-red/50 bg-usg-red/15 px-4 py-2 shadow-lg shadow-usg-red/20 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-usg-red opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-usg-red" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-white sm:text-xs">
                Promoción Oficial USG · Temporada 2026
              </span>
            </div>

            {/* Antetítulo */}
            <p className="mt-5 font-display text-base uppercase tracking-[0.4em] text-white/60 sm:text-lg">
              ¡Mete goles y gana!
            </p>

            {/* Logo oficial de la promo — Liga de Campeones */}
            <h1 className="mt-3 flex justify-center lg:justify-start">
              <Image
                src="/liga-de-campeones-logo.png"
                alt="USG Liga de Campeones"
                width={4536}
                height={2267}
                priority
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 85vw, 50vw"
                className="h-auto w-[22rem] xs:w-[24rem] sm:w-[34rem] md:w-[40rem]
                           lg:w-[36rem] xl:w-[44rem] 2xl:w-[52rem]
                           drop-shadow-[0_8px_32px_rgba(0,0,0,0.55)]"
              />
            </h1>

            {/* Separador con info clave */}
            <div className="mt-5 flex justify-center lg:justify-start">
              <div className="flex items-center gap-3">
                <span className="block h-1 w-10 rounded-full bg-usg-red" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/80 sm:text-xs">
                  +100 premios · Vigencia 01 jun – 31 jul
                </span>
                <span className="block h-1 w-10 rounded-full bg-usg-red" />
              </div>
            </div>

            {/* Descripción */}
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base lg:mx-0 lg:text-[17px]">
              Acumula puntos con cada compra USG, sube en el ranking nacional
              y llévate{" "}
              <span className="font-bold text-white">
                motocicletas, Smart TVs, herramienta profesional
              </span>{" "}
              y mucho más.
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row lg:justify-start">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-bold text-white sm:px-8 sm:py-4 sm:text-base lg:px-9 lg:py-[1.05rem] lg:text-[17px]"
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
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 bg-black/30 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-usg-red hover:bg-usg-red/15 sm:px-8 sm:py-4 sm:text-base lg:px-9 lg:py-[1.05rem] lg:text-[17px]"
              >
                Ver premios →
              </a>
            </div>

            {/* Microcopy */}
            <p className="mx-auto mt-5 max-w-md text-[11px] leading-relaxed text-white/55 sm:text-xs lg:mx-0">
              Registro rápido por WhatsApp · Toma menos de 1 minuto
            </p>
          </div>

          {/* ─── COLUMNA BANNER DE PREMIOS ─── */}
          <div className="relative lg:col-span-6 xl:col-span-6">
            <div className="relative mx-auto w-full max-w-[32rem] lg:max-w-none">
              {/* Halo decorativo controlado (no afecta el bounding box) */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-usg-red/35 via-usg-red-dark/20 to-transparent blur-3xl"
              />

              {/* Wrapper con altura segura: nunca supera el viewport.
                  object-contain garantiza que la imagen completa siempre se vea. */}
              <div className="relative mx-auto w-full">
                <Image
                  src="/arte-premios.png"
                  alt="Premios USG Liga de Campeones: motocicleta, Smart TV, scooter, rotomartillo, herramienta y notas de crédito $100,000, $50,000 y $30,000 MXN"
                  width={2112}
                  height={1408}
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="mx-auto block h-auto w-full max-h-[70vh] object-contain
                             lg:max-h-[78vh] xl:max-h-[82vh]
                             drop-shadow-[0_25px_45px_rgba(0,0,0,0.55)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
