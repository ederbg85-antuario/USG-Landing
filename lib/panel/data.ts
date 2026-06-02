import "server-only";
import { createClient } from "@/lib/supabase/server";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/lib/supabase/config";

export type Ticket = {
  status: string | null;
  puntos_ticket: number | null;
  url_imagen: string | null;
  fecha_envio: string | null;
  tienda: string | null;
  sucursal: string | null;
};

export type ParticipanteRow = {
  telefono: string;
  nombre: string | null;
  nombre_publico: string | null;
  estado: string | null;
  ciudad: string | null;
  email: string | null;
  rol: string | null;
  puntos_total: number | null;
  tickets_aprobados: number | null;
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
};

const FN = `${SUPABASE_URL}/functions/v1/panel-data`;

/**
 * Llama a la Edge Function `panel-data` con el token de la sesión del usuario.
 * La función está protegida con verify_jwt, así que solo responde a usuarios
 * con sesión iniciada. La service_role vive dentro de Supabase (no en Vercel).
 */
async function callPanelFn<T>(view: "ranking" | "resumen"): Promise<T> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) throw new Error("Sesión no válida. Vuelve a iniciar sesión.");

  const res = await fetch(`${FN}?view=${view}`, {
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
