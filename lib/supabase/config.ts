/**
 * Valores PÚBLICOS de Supabase (seguros en el cliente y en el repo —
 * la publishable key solo permite operaciones permitidas por RLS).
 * Se pueden sobreescribir por variables de entorno, pero NO es necesario:
 * el panel funciona sin configurar nada en Vercel.
 */
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://rdkirexlorprugkavbba.supabase.co";

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_Lq1_SrFXK2qlDyRmWlUOrA_LNvgAph2";
