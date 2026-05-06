import { PRIZES, getWhatsAppUrl } from "@/lib/config";
import UsgLogo from "@/components/UsgLogo";

const PRIZE_SHOTS = [
  {
    name: "Motocicleta",
    desc: "Premio destacado",
    icon: "🏍️",
  },
  {
    name: "Smart TV",
    desc: "Pantalla premium",
    icon: "📺",
  },
  {
    name: "Bicicletas",
    desc: "Modelos premium",
    icon: "🚲",
  },
  {
    name: "Cajas de herramientas",
    desc: "Equipo profesional",
    icon: "🧰",
  },
];

export default function Prizes() {
  return (
    <section
      id="premios"
      className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-black via-[#100407] to-black"
    >
      {/* Spotlight rojo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-usg-red/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Marca de agua del logo USG (vector) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
        <UsgLogo variant="light" className="w-[80%] max-w-4xl h-auto" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-usg-red text-sm font-bold tracking-widest uppercase mb-3">
            Premios
          </span>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[0.92] mb-6">
            ¡La mejor selección
            <span className="block gradient-text-red">se lleva los premios!</span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Los líderes de la liga se llevan{" "}
            <span className="text-usg-red font-semibold">producto USG</span> +{" "}
            <span className="text-usg-red font-semibold">premios físicos</span>{" "}
            de alto valor: motos, pantallas, bicicletas y cajas de herramientas.
          </p>
        </div>

        {/* Tarjetas — premios físicos */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {PRIZE_SHOTS.map((p) => (
              <div
                key={p.name}
                className="group relative card-glow rounded-3xl p-6 text-center overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-usg-red to-usg-red-dark" />
                <div className="relative z-10">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-2xl bg-gradient-to-br from-usg-red/20 to-usg-red-dark/30 border border-usg-red/40 flex items-center justify-center text-4xl sm:text-5xl mb-4 group-hover:scale-110 transition-transform">
                    {p.icon}
                  </div>
                  <p className="font-display text-lg sm:text-xl text-white tracking-wide mb-1 leading-tight">
                    {p.name}
                  </p>
                  <p className="text-[10px] sm:text-xs text-white/55 uppercase tracking-widest">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Niveles de premio */}
        <div className="grid md:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto mb-10">
          {PRIZES.map((prize, idx) => (
            <div
              key={prize.place}
              className={`relative rounded-3xl p-8 overflow-hidden ${
                idx === 0
                  ? "bg-gradient-to-br from-yellow-500/20 via-black to-black border-2 border-yellow-400/50 md:scale-105 md:shadow-2xl md:shadow-yellow-400/20"
                  : "card-glow"
              }`}
            >
              {/* Glow */}
              <div
                className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-40 bg-gradient-to-br ${prize.accent}`}
              />

              <div className="relative z-10">
                <div className="text-7xl mb-4 text-center">{prize.medal}</div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/60 text-center mb-2">
                  {prize.place}
                </p>
                <p className="font-display text-4xl sm:text-5xl text-white text-center leading-none mb-4">
                  {prize.value}
                </p>
                <p className="text-sm text-white/70 text-center leading-relaxed">
                  {prize.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-white/40 max-w-2xl mx-auto mb-8">
          *Los premios económicos en producto se otorgarán mediante NDC al
          distribuidor. Al momento de premiar se entregará un cheque
          representativo al ganador para redimir en POV.
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
