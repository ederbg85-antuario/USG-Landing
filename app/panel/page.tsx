import Link from "next/link";
import { hasServiceKey } from "@/lib/supabase/admin";
import { getResumen } from "@/lib/panel/data";
import ConfigNotice from "./ConfigNotice";

export const dynamic = "force-dynamic";

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="card-glow rounded-2xl p-5">
      <p className="text-[11px] uppercase tracking-widest text-white/50 mb-2">
        {label}
      </p>
      <p className="font-display text-4xl text-white tabular-nums leading-none">
        {value}
      </p>
      {sub && <p className="text-xs text-white/45 mt-2">{sub}</p>}
    </div>
  );
}

export default async function PanelHome() {
  if (!hasServiceKey()) {
    return (
      <div>
        <Header />
        <ConfigNotice />
      </div>
    );
  }

  let resumen;
  try {
    resumen = await getResumen();
  } catch (e) {
    return (
      <div>
        <Header />
        <ConfigNotice message={(e as Error).message} />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Stat label="Participantes" value={resumen.totalParticipantes} />
        <Stat label="Tickets recibidos" value={resumen.totalTickets} />
        <Stat
          label="Tickets aprobados"
          value={resumen.ticketsAprobados}
          sub={`de ${resumen.totalTickets} totales`}
        />
        <Stat
          label="Líder actual"
          value={resumen.liderPuntos.toLocaleString("es-MX")}
          sub={resumen.lider}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Link
          href="/panel/ranking"
          className="card-glow rounded-2xl p-6 hover:border-usg-red/50 transition-colors"
        >
          <p className="text-2xl mb-2">🏆</p>
          <p className="font-bold text-white mb-1">Ranking y registros</p>
          <p className="text-sm text-white/55">
            Ver todos los participantes, puntos y tickets. Descargar en CSV.
          </p>
        </Link>
        <Link
          href="/panel/bandeja"
          className="card-glow rounded-2xl p-6 hover:border-usg-red/50 transition-colors"
        >
          <p className="text-2xl mb-2">💬</p>
          <p className="font-bold text-white mb-1">Bandeja de entrada</p>
          <p className="text-sm text-white/55">
            Conversaciones de WhatsApp (Chatwoot) dentro del panel.
          </p>
        </Link>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="mb-8">
      <h1 className="font-display text-4xl sm:text-5xl text-white tracking-wide">
        RESUMEN
      </h1>
      <p className="text-sm text-white/55 mt-1">
        Vista general de la promoción Liga de Campeones.
      </p>
    </div>
  );
}
