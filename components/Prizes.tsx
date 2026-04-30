import { PRIZES, getWhatsAppUrl } from "@/lib/config";

export default function Prizes() {
  return (
    <section
      id="premios"
      className="relative py-20 sm:py-28 bg-black overflow-hidden"
    >
      {/* Spotlight effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-usg-red/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-usg-red text-sm font-bold tracking-widest uppercase mb-3">
            Premios
          </span>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none mb-6">
            Compite por la
            <span className="block gradient-text-red">Bolsa de Campeones</span>
          </h2>

          {/* Total prize big highlight */}
          <div className="inline-block mt-4 bg-gradient-to-r from-usg-red via-usg-red-dark to-usg-red p-1 rounded-2xl shadow-2xl shadow-usg-red/30">
            <div className="bg-black rounded-xl px-8 py-5">
              <p className="text-xs uppercase tracking-widest text-white/60 mb-2">
                Bolsa total de premios
              </p>
              <p className="font-display text-6xl sm:text-7xl text-white leading-none">
                $500,000{" "}
                <span className="text-3xl sm:text-4xl text-usg-red">MXN</span>
              </p>
            </div>
          </div>
        </div>

        {/* Prize tiers */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
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
                <p className="text-xs uppercase tracking-widest text-white/60 text-center mb-2">
                  {prize.place}
                </p>
                <p className="font-display text-5xl text-white text-center leading-none mb-4">
                  {prize.value}
                </p>
                <p className="text-sm text-white/70 text-center leading-relaxed">
                  {prize.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Prize visuals */}
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-3xl p-8 sm:p-10 mb-10">
          <p className="text-center text-xs uppercase tracking-widest text-white/50 mb-8">
            Algunos de los premios incluidos
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-usg-red/20 border border-usg-red/40 flex items-center justify-center text-3xl">
                🏍️
              </div>
              <p className="text-white font-semibold text-sm">Motocicleta</p>
              <p className="text-white/50 text-xs">Premio destacado</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-usg-red/20 border border-usg-red/40 flex items-center justify-center text-3xl">
                📺
              </div>
              <p className="text-white font-semibold text-sm">Televisión</p>
              <p className="text-white/50 text-xs">Smart TV</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-usg-red/20 border border-usg-red/40 flex items-center justify-center text-3xl">
                🚲
              </div>
              <p className="text-white font-semibold text-sm">Bicicletas</p>
              <p className="text-white/50 text-xs">Premium</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-usg-red/20 border border-usg-red/40 flex items-center justify-center text-3xl">
                🧰
              </div>
              <p className="text-white font-semibold text-sm">Herramientas</p>
              <p className="text-white/50 text-xs">Cajas profesionales</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-white/40 max-w-2xl mx-auto mb-10">
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
