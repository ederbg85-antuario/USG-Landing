import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Analytics from "@/components/Analytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ligausgdecampeones.com"),
  title: "Ganadores 2026 | USG Liga de Campeones",
  description:
    "Resultados oficiales de USG Liga de Campeones: consulta los 115 ganadores, sus puntos y el premio asignado.",
  keywords: [
    "USG",
    "USG Liga de Campeones",
    "ganadores USG",
    "resultados USG",
    "tablaroca",
    "construcción",
    "premios",
  ],
  openGraph: {
    title: "Ganadores 2026 | USG Liga de Campeones",
    description:
      "Consulta la lista oficial de los 115 ganadores, sus puntos y el premio asignado.",
    type: "website",
    locale: "es_MX",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${bebas.variable}`}>
      <body>
        {children}
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
