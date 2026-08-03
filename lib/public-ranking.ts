import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/lib/supabase/config";

export type PublicRankingEntry = {
  rank: number;
  name: string;
  state?: string;
  stars: number;
  points: number;
};

type SupabaseRankingRow = {
  rank?: unknown;
  name?: unknown;
  state?: unknown;
  stars?: unknown;
  points?: unknown;
};

const PUBLIC_STATE_LABELS: Record<string, string> = {
  "Ciudad de Mexico": "Ciudad de México",
  "Estado de Mexico": "Estado de México",
  Michoacan: "Michoacán",
  "Nuevo Leon": "Nuevo León",
  Quintanarro: "Quintana Roo",
  Yucatan: "Yucatán",
};

function publicStateLabel(value: unknown) {
  if (typeof value !== "string" || !value.trim()) return undefined;
  const state = value.trim();
  return PUBLIC_STATE_LABELS[state] ?? state;
}

/**
 * Lee exclusivamente la vista pública del ranking. Nunca consulta teléfonos,
 * correos, tickets ni ningún otro dato privado de los participantes.
 */
export async function getPublicRanking(
  requestedLimit: number,
): Promise<PublicRankingEntry[]> {
  const limit = Math.min(100, Math.max(1, Math.trunc(requestedLimit)));
  const endpoint = new URL(`${SUPABASE_URL}/rest/v1/ranking`);
  endpoint.searchParams.set(
    "select",
    "rank,name:nombre_publico,state:estado,stars,points",
  );
  endpoint.searchParams.set("order", "rank.asc");
  endpoint.searchParams.set("limit", String(limit));

  const response = await fetch(endpoint, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Supabase respondió ${response.status}`);
  }

  const payload: unknown = await response.json();
  if (!Array.isArray(payload)) return [];

  return (payload as SupabaseRankingRow[])
    .map((row) => ({
      rank: Number(row.rank),
      name:
        typeof row.name === "string" && row.name.trim()
          ? row.name.trim()
          : "Participante USG",
      state: publicStateLabel(row.state),
      stars: Math.min(5, Math.max(0, Number(row.stars) || 0)),
      points: Math.max(0, Number(row.points) || 0),
    }))
    .filter(
      (entry) =>
        Number.isInteger(entry.rank) && entry.rank >= 1 && entry.rank <= limit,
    )
    .sort((a, b) => a.rank - b.rank);
}
