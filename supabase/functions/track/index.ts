import { createClient } from "jsr:@supabase/supabase-js@2";

// Ingesta de analítica nativa de la landing pública (visitas y clics).
// verify_jwt=false: la llaman visitantes anónimos desde el navegador.
// Acepta el body como text/plain (para que navigator.sendBeacon funcione
// cross-origin sin preflight) y lo parsea como JSON.

const CORS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(o: unknown, status = 200) {
  return new Response(JSON.stringify(o), {
    status,
    headers: { ...CORS, "content-type": "application/json" },
  });
}

function str(v: unknown, max: number): string | null {
  if (v == null) return null;
  const s = String(v).trim();
  if (!s) return null;
  return s.slice(0, max);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "method not allowed" }, 405);

  let body: unknown;
  try {
    const raw = await req.text();
    body = JSON.parse(raw);
  } catch {
    return json({ error: "bad json" }, 400);
  }

  const list = Array.isArray((body as { events?: unknown })?.events)
    ? (body as { events: unknown[] }).events
    : Array.isArray(body)
      ? (body as unknown[])
      : body
        ? [body]
        : [];

  const ua = (req.headers.get("user-agent") || "").slice(0, 300);

  const rows = list
    .slice(0, 50)
    .map((raw) => {
      const e = (raw || {}) as Record<string, unknown>;
      const path = str(e.path, 300);
      return {
        visitor_id: str(e.visitor_id, 64),
        session_id: str(e.session_id, 64),
        event_type: e.event_type === "click" ? "click" : "pageview",
        path,
        referrer: str(e.referrer, 500),
        referrer_host: str(e.referrer_host, 200),
        utm_source: str(e.utm_source, 100),
        utm_medium: str(e.utm_medium, 100),
        utm_campaign: str(e.utm_campaign, 100),
        element: str(e.element, 200),
        device: e.device === "mobile" ? "mobile" : e.device === "tablet" ? "tablet" : "desktop",
        user_agent: ua,
      };
    })
    // No registramos el propio panel ni el login: solo páginas públicas.
    .filter((r) => r.path && !r.path.startsWith("/panel") && !r.path.startsWith("/login"));

  if (!rows.length) return json({ ok: true, inserted: 0 });

  const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const { error } = await sb.from("web_events").insert(rows);
  if (error) return json({ error: error.message }, 500);
  return json({ ok: true, inserted: rows.length });
});
