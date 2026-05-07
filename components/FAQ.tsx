"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "¿Cómo me registro a la promoción?",
    a: "El registro es 100% por WhatsApp. Solo da clic en cualquier botón verde de esta página y nuestro agente automatizado te guiará paso a paso. Tarda menos de un minuto.",
  },
  {
    q: "¿Cómo subo mis tickets de compra?",
    a: "Toma una foto clara de tu ticket y envíala por WhatsApp al agente oficial USG. Nuestra IA lee el ticket, valida los productos USG y suma los puntos a tu cuenta automáticamente.",
  },
  {
    q: "¿Cuántos puntos vale cada producto?",
    a: "Los productos básicos (Tablaroca, Durock Forte, Redimix, Basecoat Regular y Tablaroca Anti-Moho) suman 100 puntos por pieza. Los productos premium (Basecoat Fino, Tablaroca Firecode, Securock, Plafones y Donn) suman 1,000 puntos por pieza.",
  },
  {
    q: "¿Cómo consulto mis puntos y mi posición en el ranking?",
    a: "Solo escribe a nuestro WhatsApp '¿Cuántos puntos tengo?' o '¿En qué lugar voy?' y el agente te responde al instante con tu estatus actualizado.",
  },
  {
    q: "¿Hay algún costo o inscripción adicional?",
    a: "No. La participación es totalmente gratuita. Solo necesitas comprar productos USG participantes y registrar tus tickets.",
  },
  {
    q: "¿Puedo registrar tickets de compras anteriores al inicio de la promo?",
    a: "Solo cuentan los tickets emitidos dentro del periodo oficial de la promoción. Las fechas exactas se comunican al iniciar el chat con el agente.",
  },
  {
    q: "¿Cómo se entregan los premios?",
    a: "Los ganadores serán notificados por WhatsApp al cierre de la promo. Los premios económicos se otorgan mediante NDC al distribuidor; al momento de premiar se entrega un cheque representativo al ganador para redimir en POV.",
  },
  {
    q: "¿Qué pasa si mi ticket no se valida?",
    a: "Si nuestra IA detecta dudas, el ticket pasa a revisión manual. Te avisamos por WhatsApp con el estatus en un plazo máximo de 24-48 hrs.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-16 sm:py-24 lg:py-28 bg-gradient-to-b from-black/65 via-black/55 to-usg-black/65 overflow-hidden"
    >
      {/* Marca de agua sutil del logo USG */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='200' viewBox='0 0 320 200'><g fill='%23ffffff'><text x='20' y='110' font-family='Arial Black, sans-serif' font-size='64' font-weight='900' letter-spacing='3'>USG</text></g></svg>\")",
          backgroundRepeat: "repeat",
          backgroundSize: "320px 200px",
        }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-usg-red text-sm font-bold tracking-widest uppercase mb-3">
            Resolvemos tus dudas
          </span>
          <h2 className="font-display text-4xl xs:text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none mb-5 sm:mb-6">
            Preguntas <span className="gradient-text-red">frecuentes</span>
          </h2>
          <p className="text-base sm:text-lg text-white/70">
            Si tienes una pregunta que no está aquí, escríbenos directo por
            WhatsApp y un asesor te ayuda al momento.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = open === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? "border-usg-red/50 bg-usg-red/5"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-3 sm:gap-4 text-left"
                >
                  <span className="font-semibold text-white text-sm sm:text-lg leading-snug">
                    {faq.q}
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                      isOpen
                        ? "border-usg-red bg-usg-red text-white rotate-45"
                        : "border-white/30 text-white/60"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all ${
                    isOpen ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-sm sm:text-base text-white/75 leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
