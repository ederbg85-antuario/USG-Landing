import type { Metadata } from "next";
import WinnersExperience from "@/app/ganadores/WinnersExperience";
import {
  CLIENT_WINNERS_TOTAL,
  type PublicRankingEntry,
} from "@/lib/client-winners-ranking";
import { getPublicRanking } from "@/lib/public-ranking";

export const metadata: Metadata = {
  title: "Ganadores 2026 | USG Liga de Campeones",
  description:
    "Consulta la lista oficial de los 115 ganadores de USG Liga de Campeones, su posición, puntos, distribuidor y premio asignado.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Los 115 ganadores | USG Liga de Campeones",
    description:
      "Consulta el podio, los 13 niveles de premios y la lista final de los 115 campeones de la temporada 2026.",
    url: "/",
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
      "Consulta posiciones, puntos y premios de la lista oficial 2026.",
    images: ["/og-ganadores-115.png"],
  },
};

export default async function Home() {
  const initialEntries: PublicRankingEntry[] = await getPublicRanking(
    CLIENT_WINNERS_TOTAL,
  );

  return <WinnersExperience initialEntries={initialEntries} />;
}
