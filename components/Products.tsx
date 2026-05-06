import Image from "next/image";
import { PRODUCTS_BASIC, PRODUCTS_PREMIUM } from "@/lib/config";

export default function Products() {
  return (
    <section
      id="productos"
      className="relative py-20 sm:py-28 usg-pitch-bg overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-usg-red/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-72 h-72 bg-usg-red/15 rounded-full blur-3xl pointer-events-none" />

      {/* Marca de agua del logo USG */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
        <Image
          src="/images.png"
          alt=""
          width={1100}
          height={480}
          className="w-[80%] max-w-4xl h-auto"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-usg-red/15 border border-usg-red/40 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-usg-red rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-white tracking-wider uppercase">
              Reglas del juego
            </span>
          </div>
          <span className="inline-block text-usg-red text-sm font-bold tracking-widest uppercase mb-3">
            Sistema de Puntos · Productos participantes
          </span>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none mb-6">
            No todos los productos
            <span className="block gradient-text-red">juegan igual</span>
          </h2>
          <p className="text-lg text-white/70">
            Conoce los puntos que vale cada pieza y elige los productos que te
            den mayor ventaja en el ranking. Los productos{" "}
            <span className="text-usg-red font-semibold">premium</span> otorgan{" "}
            <span className="text-usg-red font-semibold">10× más puntos</span>{" "}
            por unidad.
          </p>
        </div>

        {/* Two tier cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* BÁSICO */}
          <div className="card-glow rounded-3xl p-8 relative overflow-hidden border-2 border-white/10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-1">
                    Nivel
                  </p>
                  <h3 className="font-display text-4xl text-white tracking-wide">
                    BÁSICO
                  </h3>
                </div>
                <div className="text-right">
                  <p className="font-display text-6xl text-white leading-none">
                    100
                  </p>
                  <p className="text-xs uppercase tracking-widest text-white/60 mt-1">
                    Puntos / pieza
                  </p>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />

              <ul className="space-y-3">
                {PRODUCTS_BASIC.map((product) => (
                  <li
                    key={product.name}
                    className="flex items-center justify-between text-white/90 py-2 border-b border-white/5 last:border-0"
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-white/40" />
                      <span className="font-medium">{product.name}</span>
                    </span>
                    <span className="text-white/50 font-mono text-sm">
                      +{product.points}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* PREMIUM */}
          <div className="rounded-3xl p-8 relative overflow-hidden bg-gradient-to-br from-usg-red via-usg-red-dark to-black border-2 border-usg-red shadow-2xl shadow-usg-red/20">
            {/* Premium badge */}
            <div className="absolute top-0 right-0">
              <div className="bg-yellow-400 text-black font-bold text-xs uppercase tracking-widest px-4 py-1 transform rotate-12 translate-x-3 -translate-y-1 shadow-lg">
                ⭐ Premium
              </div>
            </div>

            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/70 mb-1">
                    Nivel
                  </p>
                  <h3 className="font-display text-4xl text-white tracking-wide">
                    PREMIUM
                  </h3>
                </div>
                <div className="text-right">
                  <p className="font-display text-6xl text-white leading-none drop-shadow-lg">
                    1000
                  </p>
                  <p className="text-xs uppercase tracking-widest text-white/80 mt-1">
                    Puntos / pieza
                  </p>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mb-6" />

              <ul className="space-y-3">
                {PRODUCTS_PREMIUM.map((product) => (
                  <li
                    key={product.name}
                    className="flex items-center justify-between text-white py-2 border-b border-white/15 last:border-0"
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-yellow-400" />
                      <span className="font-medium">{product.name}</span>
                    </span>
                    <span className="text-yellow-300 font-mono text-sm font-bold">
                      +{product.points}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Insight bar */}
        <div className="mt-12 max-w-4xl mx-auto bg-gradient-to-r from-usg-red/10 via-usg-red/20 to-usg-red/10 border border-usg-red/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="grid sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚽</span>
              <div>
                <p className="font-bold text-white text-sm">
                  Los puntos se acumulan por pieza comprada
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 sm:border-x sm:border-white/10 sm:px-6">
              <span className="text-2xl">🔥</span>
              <div>
                <p className="font-bold text-white text-sm">
                  Productos premium = más puntos por unidad
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🏆</span>
              <div>
                <p className="font-bold text-white text-sm">
                  Mejor producto = mayor ventaja en el ranking
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
