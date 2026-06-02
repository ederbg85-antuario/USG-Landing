import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

const FN = `${SUPABASE_URL}/functions/v1/chatwoot-proxy`;

/**
 * Proxy server-side hacia la Edge Function `chatwoot-proxy`.
 * Toma el token de sesión del usuario logueado y lo reenvía
 * (la función valida el JWT). El token de Chatwoot vive en Supabase.
 */
async function forward(req: NextRequest, method: "GET" | "POST") {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: "Sesión no válida" }, { status: 401 });
  }

  const qs = req.nextUrl.searchParams.toString();
  const init: RequestInit = {
    method,
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      apikey: SUPABASE_ANON_KEY,
      "content-type": "application/json",
    },
    cache: "no-store",
  };
  if (method === "POST") init.body = await req.text();

  const r = await fetch(`${FN}?${qs}`, init);
  const data = await r.json().catch(() => ({}));
  return NextResponse.json(data, { status: r.status });
}

export async function GET(req: NextRequest) {
  return forward(req, "GET");
}
export async function POST(req: NextRequest) {
  return forward(req, "POST");
}
