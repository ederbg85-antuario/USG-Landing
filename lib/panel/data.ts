import "server-only";
import { createClient } from "@/lib/supabase/server";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/lib/supabase/config";

export type ProductoDetectado = {
  sku?: string;
  nombre?: string;
  cantidad?: number;
  puntos_unit?: number;
  puntos_subtotal?: number;
};

export type Ticket = {
  status: string | null;
  puntos_ticket: number | null;
  url_imagen: string | null;
  fecha_envio: string | null;
  fecha_ticket: string | null;
  folio_ticket: string | null;
  tienda: string | null;
  sucursal: string | null;
  total_ticket: number | string | null;
  subtotal_participante: number | string | null;
  productos_detectados: ProductoDetectado[] | null;
};

export type ParticipanteRow = {
  telefono: string;
  nombre: string | null;
  nombre_publico: string | null;
  estado: string | null;
  ciudad: string | null;
  email: string | null;
  rol: string | null;
  empresa: string | null;
  puntos_total: number | null;
  tickets_aprobados: number | null;
  compras_total_mxn: number | string | null;
  productos_unicos: number | null;
  estado_cuenta: string | null;
  fecha_registro: string | null;
  tickets: Ticket[];
};

export type Resumen = {
  totalParticipantes: number;
  totalTickets: number;
  ticketsAprobados: number;
  lider: string;
  liderPuntos: number;
  compraTotal: number;
  puntosTotal: number;
};

export type ProductoInventario = {
  sku: string;
  nombre: string;
  unidades: number;
  puntos: number;
  tickets: number;
  participantes: number;
};

export type DistribuidorAgg = {
  tienda: string;
  tickets: number;
  puntos: number;
  monto: number;
  participantes: number;
};

export type SucursalAgg = {
  tienda: string;
  sucursal: string;
  tickets: number;
  puntos: number;
  monto: number;
};

export type Informe = {
  productos: ProductoInventario[];
  distribuidores: DistribuidorAgg[];
  sucursales: SucursalAgg[];
  montos: {
    compraTotal: number;
    ticketsAprobados: number;
    ticketsConMonto: number;
    ticketPromedio: number;
    puntosTotal: number;
  };
};

export type WebAnalytics = {
  rangeDays: number;
  totals: { pageviews: number; visitors: number; sessions: number; clicks: number };
  byDay: { day: string; pageviews: number; visitors: number }[];
  topPages: { path: string; pageviews: number; visitors: number }[];
  topReferrers: { host: string; count: number }[];
  topClicks: { element: string; count: number }[];
  devices: Record<string, number>;
  sources: { source: string; count: number }[];
};

const FN = `${SUPABASE_URL}/functions/v1/panel-data`;

/**
 * Llama a la Edge Function `panel-data` con el token de la sesión del usuario.
 * La función está protegida con verify_jwt, así que solo responde a usuarios
 * con sesión iniciada. La service_role vive dentro de Supabase (no en Vercel).
 */
async function callPanelFn<T>(
  view: "ranking" | "resumen" | "informe" | "web",
  params: Record<string, string | number> = {},
): Promise<T> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) throw new Error("Sesión no válida. Vuelve a iniciar sesión.");

  const qs = new URLSearchParams({ view, ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])) });
  const res = await fetch(`${FN}?${qs}`, {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      apikey: SUPABASE_ANON_KEY,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`No se pudieron cargar los datos (${res.status}). ${txt.slice(0, 120)}`);
  }
  return res.json() as Promise<T>;
}

export function getRankingData() {
  return callPanelFn<ParticipanteRow[]>("ranking");
}

export function getResumen() {
  return callPanelFn<Resumen>("resumen");
}

export function getInforme() {
  return callPanelFn<Informe>("informe");
}

export function getWebAnalytics(days = 30) {
  return callPanelFn<WebAnalytics>("web", { days });
}
