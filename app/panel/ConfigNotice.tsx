export default function ConfigNotice({ message }: { message?: string }) {
  return (
    <div className="card-glow rounded-2xl p-6 border-yellow-500/30">
      <p className="text-2xl mb-3">⚠️</p>
      <p className="font-bold text-white mb-2">No se pudieron cargar los datos</p>
      <p className="text-sm text-white/65 leading-relaxed mb-4">
        Ocurrió un problema al leer la información de la promoción. Si acabas de
        iniciar sesión, recarga la página. Si persiste, vuelve a iniciar sesión.
      </p>
      {message && (
        <p className="text-xs text-red-400/80 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 font-mono break-all">
          {message}
        </p>
      )}
    </div>
  );
}
