import { createClient } from "jsr:@supabase/supabase-js@2";

function j(o: unknown, s = 200) {
  return new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });
}

// Normaliza nombres de tienda/sucursal para agrupar variantes
// ("DYC MATERIALES" / "D Y C MATERIALES" / "DYC Materiales" -> misma clave).
function normLabel(s: string | null | undefined): string {
  return (s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, " ")
    .trim();
}
function normKey(s: string | null | undefined): string {
  return normLabel(s).replace(/\s+/g, "");
}

type Producto = { sku?: string; nombre?: string; cantidad?: number; puntos_unit?: number; puntos_subtotal?: number };
type TicketRow = {
  telefono: string;
  status: string | null;
  puntos_ticket: number | null;
  tienda: string | null;
  sucursal: string | null;
  total_ticket: number | string | null;
  subtotal_participante: number | string | null;
  productos_detectados: Producto[] | null;
};

const num = (v: unknown): number => {
  const n = typeof v === "string" ? parseFloat(v) : (v as number);
  return Number.isFinite(n) ? n : 0;
};

Deno.serve(async (req: Request) => {
  // verify_jwt=true: el gateway de Supabase ya validó que hay un JWT válido
  // (un usuario con sesión iniciada). Aquí solo servimos los datos.
  const url = new URL(req.url);
  const view = url.searchParams.get("view") || "ranking";
  const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  if (view === "web") {
    const raw = parseInt(url.searchParams.get("days") || "30", 10);
    const days = Math.min(365, Math.max(1, Number.isFinite(raw) ? raw : 30));
    const { data, error } = await sb.rpc("web_analytics", { days });
    if (error) return j({ error: error.message }, 500);
    return j(data);
  }

  if (view === "resumen") {
    const [p, t, ta, top, montos] = await Promise.all([
      sb.from("participantes").select("*", { count: "exact", head: true }),
      sb.from("tickets").select("*", { count: "exact", head: true }),
      sb.from("tickets").select("*", { count: "exact", head: true }).eq("status", "aprobado"),
      sb.from("participantes").select("nombre,puntos_total").order("puntos_total", { ascending: false }).limit(1),
      sb.from("tickets").select("total_ticket,puntos_ticket").eq("status", "aprobado"),
    ]);
    let compraTotal = 0;
    let puntosTotal = 0;
    for (const r of (montos.data || []) as { total_ticket: number | string | null; puntos_ticket: number | null }[]) {
      compraTotal += num(r.total_ticket);
      puntosTotal += num(r.puntos_ticket);
    }
    return j({
      totalParticipantes: p.count || 0,
      totalTickets: t.count || 0,
      ticketsAprobados: ta.count || 0,
      lider: top.data?.[0]?.nombre || "—",
      liderPuntos: top.data?.[0]?.puntos_total || 0,
      compraTotal,
      puntosTotal,
    });
  }

  if (view === "informe") {
    // Agregados para el informe del cliente. Solo tickets APROBADOS (validados).
    const { data, error } = await sb
      .from("tickets")
      .select("telefono,status,puntos_ticket,tienda,sucursal,total_ticket,subtotal_participante,productos_detectados")
      .eq("status", "aprobado");
    if (error) return j({ error: error.message }, 500);
    const tickets = (data || []) as TicketRow[];

    const productos = new Map<string, { sku: string; nombre: string; unidades: number; puntos: number; tickets: Set<string>; participantes: Set<string> }>();
    const distribs = new Map<string, { tienda: string; tickets: number; puntos: number; monto: number; participantes: Set<string> }>();
    const sucursales = new Map<string, { tienda: string; sucursal: string; tickets: number; puntos: number; monto: number }>();
    let compraTotal = 0;
    let puntosTotal = 0;
    let ticketsConMonto = 0;

    for (const [i, t] of tickets.entries()) {
      const tid = `${t.telefono}-${i}`;
      const pts = num(t.puntos_ticket);
      const monto = num(t.total_ticket);
      compraTotal += monto;
      puntosTotal += pts;
      if (monto > 0) ticketsConMonto++;

      // Distribuidor (tienda)
      const dKey = normKey(t.tienda) || "SIN_TIENDA";
      const dLabel = (t.tienda || "Sin distribuidor").trim();
      const d = distribs.get(dKey) || { tienda: dLabel, tickets: 0, puntos: 0, monto: 0, participantes: new Set<string>() };
      d.tickets++; d.puntos += pts; d.monto += monto; d.participantes.add(t.telefono);
      distribs.set(dKey, d);

      // Sucursal (tienda + sucursal)
      if (t.sucursal && normLabel(t.sucursal)) {
        const sKey = `${dKey}|${normKey(t.sucursal)}`;
        const s = sucursales.get(sKey) || { tienda: dLabel, sucursal: t.sucursal.trim(), tickets: 0, puntos: 0, monto: 0 };
        s.tickets++; s.puntos += pts; s.monto += monto;
        sucursales.set(sKey, s);
      }

      // Productos (inventario)
      for (const prod of t.productos_detectados || []) {
        const sku = prod.sku || prod.nombre || "DESCONOCIDO";
        const p = productos.get(sku) || { sku, nombre: prod.nombre || sku, unidades: 0, puntos: 0, tickets: new Set<string>(), participantes: new Set<string>() };
        p.unidades += num(prod.cantidad);
        p.puntos += num(prod.puntos_subtotal);
        p.tickets.add(tid);
        p.participantes.add(t.telefono);
        productos.set(sku, p);
      }
    }

    return j({
      productos: [...productos.values()]
        .map((p) => ({ sku: p.sku, nombre: p.nombre, unidades: p.unidades, puntos: p.puntos, tickets: p.tickets.size, participantes: p.participantes.size }))
        .sort((a, b) => b.unidades - a.unidades),
      distribuidores: [...distribs.values()]
        .map((d) => ({ tienda: d.tienda, tickets: d.tickets, puntos: d.puntos, monto: d.monto, participantes: d.participantes.size }))
        .sort((a, b) => b.puntos - a.puntos),
      sucursales: [...sucursales.values()].sort((a, b) => b.puntos - a.puntos),
      montos: {
        compraTotal,
        ticketsAprobados: tickets.length,
        ticketsConMonto,
        ticketPromedio: ticketsConMonto ? compraTotal / ticketsConMonto : 0,
        puntosTotal,
      },
    });
  }

  // ranking
  const [{ data: participantes, error: e1 }, { data: tickets, error: e2 }] = await Promise.all([
    sb
      .from("participantes")
      .select(
        "telefono,nombre,nombre_publico,estado,ciudad,email,rol,empresa,puntos_total,tickets_aprobados,compras_total_mxn,productos_unicos,estado_cuenta,fecha_registro",
      )
      .order("puntos_total", { ascending: false }),
    sb
      .from("tickets")
      .select(
        "telefono,status,puntos_ticket,url_imagen,fecha_envio,fecha_ticket,folio_ticket,tienda,sucursal,total_ticket,subtotal_participante,productos_detectados",
      )
      .order("fecha_envio", { ascending: false }),
  ]);
  if (e1) return j({ error: e1.message }, 500);
  if (e2) return j({ error: e2.message }, 500);

  const byPhone: Record<string, unknown[]> = {};
  for (const t of (tickets || []) as { telefono: string }[]) {
    (byPhone[t.telefono] ||= []).push(t);
  }
  const rows = (participantes || []).map((p: { telefono: string }) => ({ ...p, tickets: byPhone[p.telefono] || [] }));
  return j(rows);
});
