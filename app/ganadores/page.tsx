import type { Metadata } from "next";
import {
  getPublicRanking,
  type PublicRankingEntry,
} from "@/lib/public-ranking";
import WinnersExperience from "./WinnersExperience";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ganadores 2026 | USG Liga de Campeones",
  description:
    "Conoce a los 100 ganadores de USG Liga de Campeones y consulta el ranking nacional actualizado de la promoción.",
  alternates: {
    canonical: "/ganadores",
  },
  openGraph: {
    title: "Los 100 ganadores | USG Liga de Campeones",
    description:
      "La tabla final de campeones: consulta posiciones, puntos y resultados de la temporada 2026.",
    url: "/ganadores",
    type: "website",
    images: [
      {
        url: "/og-ganadores.jpg",
        width: 1729,
        height: 910,
        alt: "Los 100 Campeones de USG Liga de Campeones — Resultados 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Los 100 ganadores | USG Liga de Campeones",
    description:
      "Consulta posiciones, puntos y resultados de la temporada 2026.",
    images: ["/og-ganadores.jpg"],
  },
};

export default async function WinnersPage() {
  let initialEntries: PublicRankingEntry[] = [];

  try {
    initialEntries = await getPublicRanking(100);
  } catch {
    // El cliente vuelve a intentar inmediatamente y después cada 30 segundos.
  }

  return (
    <WinnersExperience
      initialEntries={initialEntries}
      initialUpdatedAt={new Date().toISOString()}
    />
  );
}
