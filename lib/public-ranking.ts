import {
  CLIENT_WINNERS_RANKING,
  type PublicRankingEntry,
} from "@/lib/client-winners-ranking";

export type { PublicRankingEntry };

/**
 * Lee exclusivamente la lista pública entregada por el cliente. Esta fuente
 * permanece separada del ranking operativo almacenado en Supabase.
 */
export async function getPublicRanking(
  requestedLimit: number,
): Promise<PublicRankingEntry[]> {
  const limit = Math.min(
    CLIENT_WINNERS_RANKING.length,
    Math.max(1, Math.trunc(requestedLimit)),
  );

  return CLIENT_WINNERS_RANKING.slice(0, limit);
}
