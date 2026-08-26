import type { Metadata } from "next";
import {
  getPublicRanking,
  type PublicRankingEntry,
} from "@/lib/public-ranking";
import { CLIENT_WINNERS_TOTAL } from "@/lib/client-winners-ranking";
import WinnersExperience from "./WinnersExperience";

export const metadata: Metadata = {
  title: "Ganadores 2026 | USG Liga de Campeones",
  description:
    "Conoce a los 115 ganadores de USG Liga de Campeones y consulta la lista oficial de resultados de la promoción.",
  alternates: {
    canonical: "/ganadores",
  },
  openGraph: {
    title: "Los 115 ganadores | USG Liga de Campeones",
    description:
      "La tabla final de campeones: consulta posiciones, puntos y resultados de la temporada 2026.",
    url: "/ganadores",
    type: "website",
    images: [
      {
        url: "/og-ganadores-115.png",
        width: 1729,
        height: 910,
        alt: "Los 115 Campeones de USG Liga de Campeones — Resultados 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Los 115 ganadores | USG Liga de Campeones",
    description:
      "Consulta posiciones, puntos y resultados de la temporada 2026.",
    images: ["/og-ganadores-115.png"],
  },
};

export default async function WinnersPage() {
  const initialEntries: PublicRankingEntry[] = await getPublicRanking(
    CLIENT_WINNERS_TOTAL,
  );

  return <WinnersExperience initialEntries={initialEntries} />;
}
