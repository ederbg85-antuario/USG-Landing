import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

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

export async function getRankingData(): Promise<ParticipanteRow[]> {
  const sb = createAdminClient();

  const [{ data: participantes, error: e1 }, { data: tickets, error: e2 }] =
    await Promise.all([
      sb
        .from("participantes")
        .select(
          "telefono,nombre,nombre_publico,estado,ciudad,email,rol,puntos_total,tickets_aprobados,estado_cuenta,fecha_registro",
        )
        .order("puntos_total", { ascending: false }),
      sb
        .from("tickets")
        .select("telefono,status,puntos_ticket,url_imagen,fecha_envio,tienda,sucursal")
        .order("fecha_envio", { ascending: false }),
    ]);

  if (e1) throw new Error(e1.message);
  if (e2) throw new Error(e2.message);

  const byPhone = new Map<string, Ticket[]>();
  for (const t of (tickets ?? []) as (Ticket & { telefono: string })[]) {
    const arr = byPhone.get(t.telefono) ?? [];
    arr.push(t);
    byPhone.set(t.telefono, arr);
  }

  return ((participantes ?? []) as Omit<ParticipanteRow, "tickets">[]).map(
    (p) => ({ ...p, tickets: byPhone.get(p.telefono) ?? [] }),
  );
}

export async function getResumen() {
  const sb = createAdminClient();
  const [participantes, tickets, ticketsAprob] = await Promise.all([
    sb.from("participantes").select("*", { count: "exact", head: true }),
    sb.from("tickets").select("*", { count: "exact", head: true }),
    sb
      .from("tickets")
      .select("*", { count: "exact", head: true })
      .eq("status", "aprobado"),
  ]);

  const { data: top } = await sb
    .from("participantes")
    .select("nombre,puntos_total")
    .order("puntos_total", { ascending: false })
    .limit(1);

  return {
    totalParticipantes: participantes.count ?? 0,
    totalTickets: tickets.count ?? 0,
    ticketsAprobados: ticketsAprob.count ?? 0,
    lider: top?.[0]?.nombre ?? "—",
    liderPuntos: top?.[0]?.puntos_total ?? 0,
  };
}
