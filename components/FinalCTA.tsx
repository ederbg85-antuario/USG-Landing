import Image from "next/image";
import { getWhatsAppUrl } from "@/lib/config";

export default function FinalCTA() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Big red diagonal background */}
      <div className="absolute inset-0 bg-gradient-to-br from-usg-red via-usg-red-dark to-black" />

      {/* Fondo proporcionado por el cliente (túnel con jugadores USG).
          Encuadrado en la parte inferior para resaltar la "selección" USG. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover pointer-events-none opacity-45"
        style={{
          backgroundImage: "url('/backgrounds/tunnel-usg-team.jpg')",
          backgroundPosition: "center 70%",
        }}
      />
      {/* Capa para asegurar legibilidad del texto principal */}
      <div className="absolute inset-0 bg-gradient-to-b from-usg-red/70 via-usg-red-dark/55 to-black/85 pointer-events-none" />

      <div className="absolute inset-0 diagonal-stripes opacity-30" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/5 rounded-full blur-3xl" />

      {/* Marca de agua gigante del logo USG */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.07]">
        <Image
          src="/usg-logo.png"
          alt=""
          width={1200}
          height={520}
          className="w-[85%] max-w-5xl h-auto"
        />
      </div>

      {/* Banda superior estilo valla USG */}
      <div className="absolute top-0 left-0 right-0 h-8 usg-board" />
      <div className="absolute bottom-0 left-0 right-0 h-8 usg-board" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo USG en una "tarjeta" blanca para dar protagonismo a la marca */}
          <div className="inline-flex items-center justify-center bg-white rounded-2xl px-8 py-4 shadow-2xl shadow-black/40 mb-8">
            <Image
              src="/usg-logo-dark.png"
              alt="USG"
              width={180}
              height={80}
              className="h-12 sm:h-14 w-auto"
            />
          </div>
          <div className="text-7xl mb-6">⚽</div>
          <h2 className="font-display text-5xl sm:text-6xl md:text-8xl text-white tracking-tight leading-[0.9] mb-6">
            ¡La mejor selección
            <span className="block">es con USG!</span>
          </h2>
          <p className="text-xl sm:text-2xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto">
            No necesitas registrar correo ni descargar nada. Inicia tu chat por
            WhatsApp y empieza a meter goles desde tu primera compra.
          </p>

          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-white text-usg-red font-bold px-10 py-5 rounded-full text-lg sm:text-xl shadow-2xl hover:bg-white hover:scale-105 transition-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Inicia tu registro en WhatsApp
          </a>

          <p className="text-sm text-white/70 mt-8">
            🟢 Servicio activo · Respuesta inmediata · 100% gratis
          </p>
        </div>
      </div>
    </section>
  );
}
