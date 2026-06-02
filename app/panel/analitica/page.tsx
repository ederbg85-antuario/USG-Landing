export const metadata = { title: "Analítica — Panel USG" };

export default function AnaliticaPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-4xl sm:text-5xl text-white tracking-wide">
          ANALÍTICA
        </h1>
        <p className="text-sm text-white/55 mt-1">
          Métricas de la landing sincronizadas con Google Analytics 4.
        </p>
      </div>

      <div className="card-glow rounded-2xl p-6 border-yellow-500/30 max-w-2xl">
        <p className="text-2xl mb-3">🚧</p>
        <p className="font-bold text-white mb-2">En construcción (Fase 4)</p>
        <p className="text-sm text-white/65 leading-relaxed">
          Aquí se mostrarán visitas, fuentes de tráfico y conversiones de la
          landing. Requiere: (1) conectar GA4 a la landing, y (2) credenciales
          de la GA4 Data API (cuenta de servicio) + el ID de propiedad. En
          cuanto tengas el GA4 configurado lo integramos.
        </p>
      </div>
    </div>
  );
}
