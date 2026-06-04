import { createClient } from "jsr:@supabase/supabase-js@2";

function j(o: unknown, s = 200) {
  return new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });
}
function disp(tipo: string, contenido: string): string {
  const c = (contenido || "").trim();
  if (tipo === "image") return c || "📷 Imagen";
  if (tipo === "document") return c || "📄 Documento";
  if (tipo === "audio") return "🎤 Audio";
  if (tipo === "video") return "🎬 Video";
  if (tipo === "sticker") return "🏷️ Sticker";
  return c;
}

Deno.serve(async (req: Request) => {
  const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const url = new URL(req.url);
  const action = url.searchParams.get("action") || "conversations";
  const token = Deno.env.get("CHATWOOT_API_TOKEN");

  try {
    if (token) {
      const { data: cfg } = await sb.from("config").select("clave,valor").in("clave", ["chatwoot_base_url", "chatwoot_account_id", "chatwoot_inbox_id"]);
      const C: Record<string, string> = Object.fromEntries((cfg || []).map((r: any) => [r.clave, r.valor]));
      const base = (C.chatwoot_base_url || "").replace(/\/$/, "");
      const acc = C.chatwoot_account_id || "1";
      const inbox = C.chatwoot_inbox_id || "2";
      const H = { "api_access_token": token, "content-type": "application/json" };
      const abs = (u: string) => (!u ? u : (u.startsWith("http") ? u : base + u));
      if (action === "conversations") {
        const r = await fetch(`${base}/api/v1/accounts/${acc}/conversations?inbox_id=${inbox}&status=all&assignee_type=all`, { headers: H });
        const data = await r.json();
        const raw = data?.data?.payload || data?.payload || [];
        const list = raw.map((c: any) => ({ id: c.id, name: c.meta?.sender?.name || c.meta?.sender?.phone_number || ("Contacto " + c.id), phone: c.meta?.sender?.phone_number || "", last: c.last_non_activity_message?.content || "", unread: c.unread_count || 0, ts: (c.last_activity_at || c.timestamp || 0) * 1000 })).sort((a: any, b: any) => b.ts - a.ts);
        return j({ conversations: list });
      }
      if (action === "messages") {
        const id = url.searchParams.get("id");
        const r = await fetch(`${base}/api/v1/accounts/${acc}/conversations/${id}/messages`, { headers: H });
        const data = await r.json();
        const msgs = (data?.payload || []).filter((m: any) => m.message_type === 0 || m.message_type === 1).map((m: any) => ({ id: m.id, content: m.content || "", outgoing: m.message_type === 1, ts: (m.created_at || 0) * 1000, attachments: (m.attachments || []).map((a: any) => ({ url: abs(a.data_url || a.thumb_url), type: a.file_type })) }));
        return j({ messages: msgs });
      }
      if (action === "send" && req.method === "POST") {
        const id = url.searchParams.get("id");
        const body = await req.json();
        const r = await fetch(`${base}/api/v1/accounts/${acc}/conversations/${id}/messages`, { method: "POST", headers: H, body: JSON.stringify({ content: body.content, message_type: "outgoing" }) });
        return j({ ok: r.ok }, r.ok ? 200 : 502);
      }
      return j({ error: "accion no valida" }, 400);
    }

    // ===== MODO BASE DE DATOS (sin token) =====
    if (action === "conversations") {
      const { data: inter, error } = await sb.from("interacciones").select("telefono,direccion,tipo,contenido,fecha").order("fecha", { ascending: true }).limit(5000);
      if (error) return j({ error: error.message }, 500);
      const phones = [...new Set((inter || []).map((i: any) => i.telefono).filter(Boolean))];
      const { data: parts } = await sb.from("participantes").select("telefono,nombre").in("telefono", phones.length ? phones : ["_none_"]);
      const nameBy: Record<string, string> = Object.fromEntries((parts || []).map((p: any) => [p.telefono, p.nombre]));
      const map = new Map<string, any>();
      for (const i of (inter || []) as any[]) { if (!i.telefono) continue; map.set(i.telefono, { id: i.telefono, name: nameBy[i.telefono] || i.telefono, phone: i.telefono, last: disp(i.tipo, i.contenido), ts: i.fecha, unread: 0 }); }
      const list = [...map.values()].sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime());
      return j({ conversations: list });
    }
    if (action === "messages") {
      const phone = url.searchParams.get("id");
      const { data: inter, error } = await sb.from("interacciones").select("id_mensaje,direccion,tipo,contenido,fecha").eq("telefono", phone).order("fecha", { ascending: true }).limit(2000);
      if (error) return j({ error: error.message }, 500);

      // 1) Colapsa duplicados de log: mismo sentido + tipo + contenido en una ventana corta.
      //    (El agente a veces registra dos veces el mismo mensaje con milisegundos de diferencia.)
      const dedup: any[] = [];
      for (const m of (inter || []) as any[]) {
        const prev = dedup[dedup.length - 1];
        if (
          prev && prev.direccion === m.direccion && prev.tipo === m.tipo &&
          (prev.contenido || "") === (m.contenido || "") &&
          Math.abs(new Date(m.fecha).getTime() - new Date(prev.fecha).getTime()) < 5000
        ) continue;
        dedup.push(m);
      }

      // 2) Enlace de archivos por CERCANIA DE TIEMPO (no por posicion):
      //    cada archivo guardado en ticket_media se asigna al mensaje entrante
      //    (imagen/documento) mas cercano en tiempo, consumiendolo una sola vez.
      const { data: media } = await sb.from("ticket_media").select("url,created_at").eq("telefono", phone).order("created_at", { ascending: true });
      const mediaSorted = (media || []) as any[];
      const imgInter = dedup.filter((m: any) => (m.tipo === "image" || m.tipo === "document") && m.direccion === "in");
      const used = new Set<number>();
      const urlByMsg: Record<string, string> = {};
      for (const md of mediaSorted) {
        if (!md.url) continue;
        const mt = new Date(md.created_at).getTime();
        let best = -1, bestDiff = Infinity;
        for (let k = 0; k < imgInter.length; k++) {
          if (used.has(k)) continue;
          const diff = Math.abs(new Date(imgInter[k].fecha).getTime() - mt);
          if (diff < bestDiff) { bestDiff = diff; best = k; }
        }
        if (best >= 0) { used.add(best); urlByMsg[imgInter[best].id_mensaje] = md.url; }
      }

      const msgs = dedup.map((m: any) => {
        const u = urlByMsg[m.id_mensaje];
        const attachments = u ? [{ url: u, type: u.toLowerCase().endsWith(".pdf") ? "file" : "image" }] : [];
        return { id: m.id_mensaje, content: attachments.length ? "" : disp(m.tipo, m.contenido), outgoing: m.direccion === "out", ts: m.fecha, attachments };
      });
      return j({ messages: msgs });
    }
    if (action === "send") {
      return j({ error: "Para responder desde el panel agrega CHATWOOT_API_TOKEN en Supabase (Edge Functions → Secrets)." }, 503);
    }
    return j({ error: "accion no valida" }, 400);
  } catch (e) {
    return j({ error: String((e as Error).message || e) }, 502);
  }
});
