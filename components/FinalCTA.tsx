import Image from "next/image";
import { getWhatsAppUrl } from "@/lib/config";
import UsgLogo from "@/components/UsgLogo";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-black/40">
      {/* ─── BANNER GIGANTE — IMAGEN TÚNEL USG ─── */}
      <div className="relative w-full">
        {/* Aspect ratio adaptado para móvil para que la escena se aprecie mejor */}
        <div className="relative aspect-[4/5] sm:aspect-[16/9] lg:aspect-[16/7] w-full overflow-hidden">
          <Image
            src="/backgrounds/tunnel-usg-team.jpg"
            alt="¡La mejor selección es con USG! — Selección USG saliendo al campo"
            fill
            className="object-cover wa-img-mobile-fix"
            sizes="100vw"
            priority={false}
          />
          {/* Veladura para legibilidad — más fuerte en móvil para que el texto destaque */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

          {/* Texto sobrepuesto sobre la imagen grande */}
          <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/30 backdrop-blur-md rounded-full px-4 sm:px-5 py-1.5 sm:py-2 mb-5 sm:mb-6">
                <span className="w-2 h-2 bg-usg-red rounded-full animate-pulse" />
                <span className="text-[10px] sm:text-sm font-semibold text-white tracking-widest uppercase">
                  ÚLTIMO LLAMADO A LA CANCHA
                </span>
              </div>
              <h2 className="font-display text-white tracking-tight leading-[0.88] text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] drop-shadow-2xl">
                ¡La mejor selección
                <span className="block text-usg-red drop-shadow-[0_4px_24px_rgba(200,16,46,0.5)]">
                  es con USG!
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* ─── PANEL DE ACCIÓN — debajo de la imagen ─── */}
      <div className="relative bg-gradient-to-br from-usg-red via-usg-red-dark to-black overflow-hidden">
        <div className="absolute inset-0 diagonal-stripes opacity-25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Tarjeta blanca con el logo USG en rojo oficial (variant="red") */}
            <div className="inline-flex items-center justify-center bg-white rounded-2xl px-7 sm:px-10 py-4 sm:py-6 shadow-2xl shadow-black/60 mb-6 sm:mb-8 ring-1 ring-black/5">
              <UsgLogo
                variant="dark"
                className="h-12 sm:h-16 lg:h-20 w-auto"
                ariaLabel="USG"
              />
            </div>

            <p className="text-lg sm:text-2xl text-white font-semibold mb-3 sm:mb-4 leading-snug max-w-2xl mx-auto">
              No necesitas registrar correo ni descargar nada.
            </p>
            <p className="text-sm sm:text-lg text-white/85 mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto">
              Inicia tu chat por WhatsApp y empieza a meter goles desde tu
              primera compra.
            </p>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-white text-usg-red font-bold px-8 sm:px-10 py-4 sm:py-5 rounded-full text-base sm:text-xl shadow-2xl hover:scale-105 transition-transform"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 sm:w-7 sm:h-7"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Inicia tu registro en WhatsApp
            </a>

            <p className="text-xs sm:text-sm text-white/75 mt-6 sm:mt-7">
              🟢 Servicio activo · Respuesta inmediata · 100% gratis
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
