import { NextResponse } from "next/server";

/**
 * Endpoint del ranking público — USG Liga de Campeones.
 *
 * Lee la vista `ranking` de Supabase (Top 10, sólo datos públicos:
 * nombre_publico, estado, stars, puntos — nunca teléfonos).
 * Se revalida cada 30 s para mantener la sensación de "tiempo real"
 * sin saturar la base.
 *
 * Nota de seguridad: la clave de abajo es la "publishable key" de
 * Supabase — está diseñada para ser pública. Con RLS activado sólo
 * permite leer la vista `ranking`; no expone teléfonos ni ninguna
 * otra tabla. Por eso es seguro tenerla en el repo.
 */

export const revalidate = 30;

const SUPABASE_URL = "https://rdkirexlorprugkavbba.supabase.co";
const SUPABASE_KEY = "sb_publishable_Lq1_SrFXK2qlDyRmWlUOrA_LNvgAph2";

type LeaderboardEntry = {
  rank: number;
  name: string;
  state?: string;
  stars: number;
  points: number;
};

export async function GET() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/ranking?select=rank,name:nombre_publico,state:estado,stars,points&order=rank&limit=10`,
      {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
        next: { revalidate: 30 },
      },
    );

    if (!res.ok) {
      throw new Error(`Supabase respondió ${res.status}`);
    }

    const data: LeaderboardEntry[] = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "No se pudo cargar el ranking." },
      { status: 502 },
    );
  }
}
