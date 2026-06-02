export const metadata = { title: "Bandeja de entrada — Panel USG" };

export default function BandejaPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-4xl sm:text-5xl text-white tracking-wide">
          BANDEJA DE ENTRADA
        </h1>
        <p className="text-sm text-white/55 mt-1">
          Conversaciones de WhatsApp (Chatwoot) dentro del panel.
        </p>
      </div>

      <div className="card-glow rounded-2xl p-6 border-yellow-500/30 max-w-2xl">
        <p className="text-2xl mb-3">🚧</p>
        <p className="font-bold text-white mb-2">En construcción (Fase 3)</p>
        <p className="text-sm text-white/65 leading-relaxed">
          Aquí verás las conversaciones de Chatwoot con un estilo tipo WhatsApp.
          Para conectarla necesito que agregues en Vercel la variable{" "}
          <code className="text-usg-red">CHATWOOT_API_TOKEN</code> (token de
          agente de Chatwoot). En cuanto esté, activo esta bandeja.
        </p>
      </div>
    </div>
  );
}
