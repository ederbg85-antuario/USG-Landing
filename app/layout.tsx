import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

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
  title: "USG Liga de Campeones — Promo Oficial 2026",
  description:
    "Acumula puntos por cada compra USG, sube en el ranking nacional y gana hasta $100,000 MXN. Bolsa total de premios: $500,000 MXN. Regístrate por WhatsApp.",
  keywords: [
    "USG",
    "USG Liga de Campeones",
    "promoción USG",
    "puntos USG",
    "tablaroca",
    "construcción",
    "premios",
  ],
  openGraph: {
    title: "USG Liga de Campeones — Promo Oficial",
    description:
      "Acumula goles (puntos) por cada compra USG y compite por $500,000 MXN en premios. Regístrate por WhatsApp.",
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
      <body>{children}</body>
    </html>
  );
}
