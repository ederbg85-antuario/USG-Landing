import { createClient } from "@supabase/supabase-js";

/**
 * Cliente ADMIN (service_role) — SOLO servidor.
 * Lee datos completos (con RLS bypass) para el panel de administración.
 * NUNCA importar esto en un componente "use client".
 * La llave vive en la variable de entorno SUPABASE_SERVICE_ROLE_KEY (Vercel).
 */
export function createAdminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) {
    throw new Error(
      "Falta SUPABASE_SERVICE_ROLE_KEY. Agrégala en las variables de entorno (Vercel → Settings → Environment Variables).",
    );
  }
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function hasServiceKey() {
  return Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
}
