"use client";

import Image from "next/image";
import { PRIZES } from "@/lib/config";

/**
 * Banner corredizo de premios para el Hero.
 * Carrusel infinito sin pausa, duplicando el contenido y desplazando -50%.
 * Velocidad: 40s para una vuelta completa (suave y legible).
 */
export default function PrizeMarquee() {
  const items = [...PRIZES, ...PRIZES];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Fade laterales para integrar con el fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28 bg-gradient-to-r from-black via-black/60 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28 bg-gradient-to-l from-black via-black/60 to-transparent"
      />

      <div className="prize-marquee-track flex gap-4 sm:gap-6 py-4">
        {items.map((prize, idx) => (
          <article
            key={`${prize.name}-${idx}`}
            className="prize-marquee-card relative shrink-0 w-[240px] sm:w-[280px] md:w-[300px] rounded-2xl overflow-hidden border-2 border-usg-red/40 bg-gradient-to-br from-black/80 via-[#1a0207]/70 to-black/80 shadow-2xl shadow-usg-red/30 backdrop-blur-sm"
          >
            {/* Glow esquinas */}
            <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-usg-red/40 blur-3xl pointer-events-none" />

            {/* Badge cantidad */}
            <div className="absolute top-3 left-3 z-20">
              <div className="flex items-center gap-1.5 rounded-full bg-usg-red text-white px-2.5 py-1 shadow-lg">
                <span className="font-display text-sm leading-none">
                  ×{prize.quantity}
                </span>
                <span className="text-[8px] font-bold uppercase tracking-widest">
                  Ganadores
                </span>
              </div>
            </div>

            {/* Imagen — fondo blanco uniforme */}
            <div className="relative aspect-[4/3] p-3">
              <div className="relative w-full h-full bg-white rounded-xl overflow-hidden">
                <Image
                  src={prize.image}
                  alt={prize.name}
                  fill
                  sizes="300px"
                  className="object-contain p-3"
                />
              </div>
            </div>

            {/* Info */}
            <div className="relative z-10 px-4 py-3 border-t border-white/10">
              <p className="font-display text-sm sm:text-base text-white leading-tight tracking-wide line-clamp-2">
                {prize.name}
              </p>
              <p className="text-[10px] text-white/55 uppercase tracking-wider mt-1 line-clamp-1">
                {prize.subtitle}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
