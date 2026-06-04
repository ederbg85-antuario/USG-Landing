import Link from "next/link";
import { getResumen, getInforme } from "@/lib/panel/data";
import type { Informe } from "@/lib/panel/data";
import ConfigNotice from "./ConfigNotice";

export const dynamic = "force-dynamic";

const fmtN = (n: number) => Math.round(n).toLocaleString("es-MX");
const fmtMXN = (n: number) =>
  n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });

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

const MEDAL = ["🥇", "🥈", "🥉"];

function TopList({
  title,
  emoji,
  items,
  href,
}: {
  title: string;
  emoji: string;
  items: { label: string; sub?: string; value: string }[];
  href: string;
}) {
  return (
    <div className="card-glow rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="font-bold text-white text-sm">
          {emoji} {title}
        </p>
        <Link href={href} className="text-[11px] text-usg-red hover:underline">
          Ver todo →
        </Link>
      </div>
      <ol className="space-y-2">
        {items.length === 0 && (
          <li className="text-xs text-white/40">Sin datos todavía.</li>
        )}
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2.5">
            <span className="w-5 text-center text-sm">{MEDAL[i] ?? `${i + 1}.`}</span>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-white truncate">{it.label}</p>
              {it.sub && <p className="text-[11px] text-white/40 truncate">{it.sub}</p>}
            </div>
            <span className="text-sm text-white/80 tabular-nums font-semibold whitespace-nowrap">
              {it.value}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default async function PanelHome() {
  let resumen;
  let informe: Informe | null = null;
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
  // El informe es complementario: si falla, el Resumen sigue mostrando los KPIs.
  try {
    informe = await getInforme();
  } catch {
    informe = null;
  }

  return (
    <div>
      <Header />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
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
        <Stat
          label="Compra total registrada"
          value={fmtMXN(resumen.compraTotal)}
          sub="tickets aprobados"
        />
        <Stat
          label="Puntos otorgados"
          value={resumen.puntosTotal.toLocaleString("es-MX")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Stat
          label="Participantes activos"
          value={resumen.participantesActivos}
          sub="con al menos 1 ticket aprobado"
        />
        <Stat
          label="Registrados sin ticket válido"
          value={resumen.participantesSinAprobado}
          sub="registrados pero aún sin aprobar"
        />
        <Stat
          label="Sin enviar ningún ticket"
          value={resumen.participantesSinTicket}
          sub="registrados que no han participado"
        />
      </div>

      {informe && (
        <div className="grid lg:grid-cols-3 gap-4 mb-8">
          <TopList
            title="Productos más vendidos"
            emoji="📦"
            href="/panel/informe"
            items={informe.productos.slice(0, 3).map((p) => ({
              label: p.nombre,
              sub: `${fmtN(p.puntos)} pts`,
              value: `${fmtN(p.unidades)} u`,
            }))}
          />
          <TopList
            title="Distribuidores top"
            emoji="🏬"
            href="/panel/informe"
            items={informe.distribuidores.slice(0, 3).map((d) => ({
              label: d.tienda,
              sub: `${d.tickets} tickets · ${d.participantes} part.`,
              value: `${fmtN(d.puntos)} pts`,
            }))}
          />
          <TopList
            title="Sucursales top"
            emoji="📍"
            href="/panel/informe"
            items={informe.sucursales.slice(0, 3).map((s) => ({
              label: s.sucursal,
              sub: s.tienda,
              value: `${fmtN(s.puntos)} pts`,
            }))}
          />
        </div>
      )}

      <div className="grid sm:grid-cols-3 gap-4">
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
          href="/panel/informe"
          className="card-glow rounded-2xl p-6 hover:border-usg-red/50 transition-colors"
        >
          <p className="text-2xl mb-2">📦</p>
          <p className="font-bold text-white mb-1">Informe</p>
          <p className="text-sm text-white/55">
            Productos más vendidos, distribuidores, sucursales y montos.
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
