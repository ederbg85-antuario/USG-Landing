import { getWhatsAppUrl } from "@/lib/config";
import UsgLogo from "@/components/UsgLogo";

const STEPS = [
  {
    number: "01",
    icon: "📱",
    title: "Regístrate por WhatsApp",
    description:
      "Inicia el chat con nuestro agente oficial. En menos de un minuto creas tu perfil sin formularios largos.",
  },
  {
    number: "02",
    icon: "🧾",
    title: "Sube tus tickets de compra",
    description:
      "Toma foto del ticket y envíalo por WhatsApp. Nuestra IA valida la compra y suma tus puntos automáticamente.",
  },
  {
    number: "03",
    icon: "⚽",
    title: "Cada pieza suma GOLES",
    description:
      "Productos básicos = 100 puntos · Productos premium = 1,000 puntos. Mientras más compras, más metes goles.",
  },
  {
    number: "04",
    icon: "🏆",
    title: "Sube en el ranking nacional",
    description:
      "Consulta tu posición en tiempo real. Los líderes al cierre de la promo se llevan los premios principales.",
  },
];

export default function HowToPlay() {
  return (
    <section
      id="mecanica"
      className="relative py-20 sm:py-28 bg-gradient-to-b from-black via-usg-black to-black overflow-hidden"
    >
      {/* Línea decorativa superior */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-usg-red to-transparent" />

      {/* Halos rojos */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-usg-red/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-usg-red/8 rounded-full blur-[120px] pointer-events-none" />

      {/* Marca de agua del logo USG (vector) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
        <UsgLogo variant="light" className="w-[70%] max-w-3xl h-auto" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-usg-red text-sm font-bold tracking-widest uppercase mb-3">
            Mecánica de la promoción
          </span>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[0.92] mb-6">
            ¿Cómo se <span className="gradient-text-red">juega</span>?
          </h2>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed">
            Cuatro jugadas simples para entrar a la cancha y empezar a sumar
            puntos. Todo el proceso es{" "}
            <span className="text-usg-red font-semibold">100% por WhatsApp</span>
            , sin descargas ni apps adicionales.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {STEPS.map((step, idx) => (
            <div
              key={step.number}
              className="card-glow rounded-2xl p-7 relative group"
            >
              {/* Number background */}
              <span className="absolute top-3 right-4 font-display text-7xl text-white/[0.06] group-hover:text-usg-red/25 transition-colors leading-none">
                {step.number}
              </span>

              <div className="text-5xl mb-5 relative z-10">{step.icon}</div>
              <h3 className="font-display text-2xl text-white tracking-wide leading-tight mb-3 relative z-10">
                {step.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed relative z-10">
                {step.description}
              </p>

              {/* Connection line for desktop */}
              {idx < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-usg-red/50 to-transparent" />
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
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
            Empezar mi registro ahora
          </a>
        </div>
      </div>
    </section>
  );
}
