import {
  PRODUCTS_BASIC,
  PRODUCTS_MEDIUM,
  PRODUCTS_PREMIUM,
} from "@/lib/config";
import UsgLogo from "@/components/UsgLogo";

type Tier = {
  level: string;
  points: number;
  products: { name: string; points: number }[];
  highlight: "basic" | "medium" | "premium";
};

const TIERS: Tier[] = [
  {
    level: "BÁSICO",
    points: 100,
    products: PRODUCTS_BASIC,
    highlight: "basic",
  },
  {
    level: "MEDIO",
    points: 500,
    products: PRODUCTS_MEDIUM,
    highlight: "medium",
  },
  {
    level: "PREMIUM",
    points: 1000,
    products: PRODUCTS_PREMIUM,
    highlight: "premium",
  },
];

export default function Products() {
  return (
    <section
      id="productos"
      className="relative py-16 sm:py-24 lg:py-28 overflow-hidden bg-gradient-to-b from-black/55 via-[#0a1208]/45 to-black/55"
    >
      <div className="absolute top-1/4 -left-32 w-72 h-72 bg-usg-red/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-usg-red/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
        <UsgLogo variant="light" className="w-[80%] max-w-4xl h-auto" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-usg-red/15 border border-usg-red/40 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-usg-red rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-white tracking-wider uppercase">
              Reglas del juego
            </span>
          </div>
          <span className="inline-block text-usg-red text-sm font-bold tracking-widest uppercase mb-3">
            Sistema de Puntos · Productos participantes
          </span>
          <h2 className="font-display text-4xl xs:text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[0.92] mb-5 sm:mb-6">
            No todos los productos
            <span className="block gradient-text-red">juegan igual</span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed">
            Conoce los puntos que vale cada pieza y elige los productos que te
            den mayor ventaja en el ranking. Los productos{" "}
            <span className="text-usg-red font-semibold">premium</span> otorgan{" "}
            <span className="text-usg-red font-semibold">10× más puntos</span>{" "}
            por unidad.
          </p>
        </div>

        {/* 3 tier cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
          {TIERS.map((tier) => {
            const isBasic = tier.highlight === "basic";
            const isMedium = tier.highlight === "medium";
            const isPremium = tier.highlight === "premium";

            return (
              <div
                key={tier.level}
                className={`relative rounded-2xl sm:rounded-3xl p-5 sm:p-7 overflow-hidden border-2 ${
                  isPremium
                    ? "bg-gradient-to-br from-usg-red via-usg-red-dark to-[#3a040d] border-usg-red shadow-2xl shadow-usg-red/30"
                    : isMedium
                      ? "bg-gradient-to-br from-amber-500/20 via-orange-700/15 to-black/40 border-amber-400/50 shadow-xl shadow-amber-500/15"
                      : "card-glow border-white/10"
                }`}
              >
                {isPremium && (
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-yellow-400 text-black font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                      <span>★</span>
                      <span>Premium</span>
                    </div>
                  </div>
                )}
                {isMedium && (
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-amber-400 text-black font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                      <span>🔥</span>
                      <span>Medio</span>
                    </div>
                  </div>
                )}

                <div
                  className={`absolute top-0 ${isPremium ? "left-0 -translate-x-1/2 -translate-y-1/2 bg-white/10" : "right-0 translate-x-1/2 -translate-y-1/2 bg-white/5"} w-40 h-40 rounded-full blur-2xl`}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5 sm:mb-7">
                    <div>
                      <p
                        className={`text-xs uppercase tracking-[0.25em] mb-1 ${
                          isPremium ? "text-white/70" : "text-white/50"
                        }`}
                      >
                        Nivel
                      </p>
                      <h3 className="font-display text-3xl sm:text-4xl text-white tracking-wide">
                        {tier.level}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-display text-4xl sm:text-5xl text-white leading-none ${
                          isPremium ? "drop-shadow-lg" : ""
                        }`}
                      >
                        {tier.points}
                      </p>
                      <p
                        className={`text-xs uppercase tracking-widest mt-1 ${
                          isPremium ? "text-white/85" : "text-white/60"
                        }`}
                      >
                        Puntos / pieza
                      </p>
                    </div>
                  </div>

                  <div
                    className={`h-px bg-gradient-to-r from-transparent ${
                      isPremium ? "via-white/40" : "via-white/20"
                    } to-transparent mb-5`}
                  />

                  <ul className="space-y-1">
                    {tier.products.map((product) => (
                      <li
                        key={product.name}
                        className={`flex items-center justify-between py-2.5 border-b last:border-0 ${
                          isPremium
                            ? "text-white border-white/15"
                            : "text-white/90 border-white/5"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isPremium
                                ? "bg-yellow-400"
                                : isMedium
                                  ? "bg-amber-300"
                                  : "bg-white/40"
                            }`}
                          />
                          <span className="font-medium text-sm sm:text-base">
                            {product.name}
                          </span>
                        </span>
                        <span
                          className={`font-mono text-sm ${
                            isPremium
                              ? "text-yellow-300 font-bold"
                              : isMedium
                                ? "text-amber-300 font-semibold"
                                : "text-white/55"
                          }`}
                        >
                          +{product.points}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 max-w-5xl mx-auto bg-gradient-to-r from-usg-red/10 via-usg-red/20 to-usg-red/10 border border-usg-red/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="grid sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚽</span>
              <div>
                <p className="font-semibold text-white text-sm leading-snug">
                  Los puntos se acumulan por pieza comprada
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 sm:border-x sm:border-white/10 sm:px-6">
              <span className="text-2xl">🔥</span>
              <div>
                <p className="font-semibold text-white text-sm leading-snug">
                  Productos premium = más puntos por unidad
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🏆</span>
              <div>
                <p className="font-semibold text-white text-sm leading-snug">
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
