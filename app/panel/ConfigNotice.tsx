export default function ConfigNotice({ message }: { message?: string }) {
  return (
    <div className="card-glow rounded-2xl p-6 border-yellow-500/30">
      <p className="text-2xl mb-3">⚙️</p>
      <p className="font-bold text-white mb-2">Falta configurar el acceso a datos</p>
      <p className="text-sm text-white/65 leading-relaxed mb-4">
        Para que el panel lea los datos de la promoción, agrega la variable de
        entorno <code className="text-usg-red">SUPABASE_SERVICE_ROLE_KEY</code> en
        Vercel (Settings → Environment Variables) con la <em>service_role key</em>{" "}
        de Supabase, y vuelve a desplegar.
      </p>
      {message && (
        <p className="text-xs text-red-400/80 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 font-mono">
          {message}
        </p>
      )}
    </div>
  );
}
