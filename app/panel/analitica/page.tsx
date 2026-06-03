import Link from "next/link";
import { getWebAnalytics } from "@/lib/panel/data";
import type { WebAnalytics } from "@/lib/panel/data";
import ConfigNotice from "../ConfigNotice";

export const dynamic = "force-dynamic";
export const metadata = { title: "Analítica — Panel USG" };

const fmtN = (n: number) => (n || 0).toLocaleString("es-MX");

function Kpi({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="card-glow rounded-2xl p-5">
      <p className="text-[11px] uppercase tracking-widest text-white/50 mb-2">{label}</p>
      <p className="font-display text-4xl text-white tabular-nums leading-none">{value}</p>
      {sub && <p className="text-xs text-white/45 mt-2">{sub}</p>}
    </div>
  );
}

function BarChart({ data }: { data: WebAnalytics["byDay"] }) {
  const max = Math.max(1, ...data.map((d) => d.pageviews));
  if (data.length === 0) {
    return <p className="text-sm text-white/40 py-8 text-center">Aún no hay visitas registradas en este rango.</p>;
  }
  return (
    <div className="flex items-end gap-1 h-44 overflow-x-auto pt-4">
      {data.map((d) => (
        <div key={d.day} className="flex flex-col items-center gap-1 flex-1 min-w-[14px] group">
          <span className="text-[10px] text-white/0 group-hover:text-white/70 tabular-nums transition-colors">
            {d.pageviews}
          </span>
          <div
            className="w-full bg-usg-red/70 group-hover:bg-usg-red rounded-t transition-colors"
            style={{ height: `${(d.pageviews / max) * 100}%`, minHeight: d.pageviews > 0 ? 3 : 0 }}
            title={`${d.day}: ${d.pageviews} visitas, ${d.visitors} visitantes`}
          />
          <span className="text-[9px] text-white/35 tabular-nums rotate-0 whitespace-nowrap">
            {d.day.slice(5)}
          </span>
        </div>
      ))}
    </div>
  );
}

function ListCard({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: number | string }[];
}) {
  const max = Math.max(1, ...rows.map((r) => (typeof r.value === "number" ? r.value : 0)));
  return (
    <div className="card-glow rounded-2xl p-5">
      <h2 className="font-bold text-white text-sm mb-3">{title}</h2>
      <div className="space-y-2">
        {rows.length === 0 && <p className="text-xs text-white/40">Sin datos.</p>}
        {rows.map((r, i) => (
          <div key={i} className="relative">
            <div
              className="absolute inset-y-0 left-0 bg-white/[0.06] rounded"
              style={{ width: typeof r.value === "number" ? `${(r.value / max) * 100}%` : "0%" }}
            />
            <div className="relative flex items-center justify-between px-2 py-1.5 text-sm">
              <span className="text-white/80 truncate mr-2">{r.label}</span>
              <span className="text-white tabular-nums font-semibold">
                {typeof r.value === "number" ? fmtN(r.value) : r.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const RANGES = [
  { d: 7, label: "7 días" },
  { d: 30, label: "30 días" },
  { d: 90, label: "90 días" },
];

export default async function AnaliticaPage({
  searchParams,
}: {
  searchParams: { days?: string };
}) {
  const days = Math.min(365, Math.max(1, parseInt(searchParams.days || "30", 10) || 30));
  let data: WebAnalytics;
  try {
    data = await getWebAnalytics(days);
  } catch (e) {
    return (
      <div>
        <Header />
        <ConfigNotice message={(e as Error).message} />
      </div>
    );
  }

  const deviceRows = Object.entries(data.devices || {})
    .map(([k, v]) => ({ label: k === "mobile" ? "📱 Móvil" : k === "tablet" ? "📲 Tablet" : "💻 Escritorio", value: v }))
    .sort((a, b) => b.value - a.value);

  return (
    <div>
      <Header />

      <div className="flex gap-2 mb-5">
        {RANGES.map((r) => (
          <Link
            key={r.d}
            href={`/panel/analitica?days=${r.d}`}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              days === r.d ? "bg-usg-red text-white" : "bg-white/5 text-white/65 hover:bg-white/10"
            }`}
          >
            {r.label}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Kpi label="Visitas (pageviews)" value={fmtN(data.totals.pageviews)} sub={`últimos ${days} días`} />
        <Kpi label="Visitantes únicos" value={fmtN(data.totals.visitors)} />
        <Kpi label="Sesiones" value={fmtN(data.totals.sessions)} />
        <Kpi label="Clics registrados" value={fmtN(data.totals.clicks)} />
      </div>

      <div className="card-glow rounded-2xl p-5 mb-6">
        <h2 className="font-bold text-white text-sm mb-1">Visitas por día</h2>
        <BarChart data={data.byDay} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <ListCard
          title="Páginas más visitadas"
          rows={data.topPages.map((p) => ({ label: p.path, value: p.pageviews }))}
        />
        <ListCard
          title="Clics más frecuentes"
          rows={data.topClicks.map((c) => ({ label: c.element, value: c.count }))}
        />
        <ListCard
          title="Fuentes de tráfico (UTM)"
          rows={data.sources.map((s) => ({ label: s.source, value: s.count }))}
        />
        <ListCard
          title="Sitios de referencia"
          rows={data.topReferrers.map((r) => ({ label: r.host, value: r.count }))}
        />
        <ListCard title="Dispositivos" rows={deviceRows} />
      </div>

      <p className="text-xs text-white/35 mt-6">
        Medición nativa (sin Google Analytics): los datos se recolectan de forma anónima desde la
        landing pública y se guardan en la base de la promoción. No incluye el panel ni el login.
      </p>
    </div>
  );
}

function Header() {
  return (
    <div className="mb-6">
      <h1 className="font-display text-4xl sm:text-5xl text-white tracking-wide">ANALÍTICA</h1>
      <p className="text-sm text-white/55 mt-1">
        Visitas, clics y fuentes de tráfico de la landing pública — medición propia.
      </p>
    </div>
  );
}
