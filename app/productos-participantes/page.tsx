import type { Metadata } from "next";
import SubPageHeader from "@/components/SubPageHeader";
import Footer from "@/components/Footer";
import ProductosList from "./ProductosList";
import { SKU_CATEGORIAS, SKU_TOTAL } from "@/lib/promo/skus";

export const metadata: Metadata = {
  title: "Productos participantes — USG Liga de Campeones",
  description:
    "Consulta el listado completo de SKUs participantes en la promoción USG Liga de Campeones y el nivel de puntos de cada producto.",
};

export default function ProductosParticipantesPage() {
  return (
    <main className="usg-global-bg min-h-screen overflow-x-hidden">
      <SubPageHeader />

      <section className="relative py-12 sm:py-16 overflow-hidden bg-gradient-to-b from-black/60 via-[#0a1208]/45 to-black/55">
        <div className="absolute top-1/4 -left-32 w-72 h-72 bg-usg-red/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block text-usg-red text-sm font-bold tracking-widest uppercase mb-3">
              Promoción USG Liga de Campeones
            </span>
            <h1 className="font-display text-4xl xs:text-5xl sm:text-6xl text-white tracking-tight leading-[0.95] mb-4">
              Productos participantes
            </h1>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">
              Listado oficial de los{" "}
              <span className="text-white font-semibold">{SKU_TOTAL} SKUs</span>{" "}
              participantes y el nivel de puntos que otorga cada uno. Cada pieza
              comprada suma puntos según su nivel:{" "}
              <span className="text-white/90 font-semibold">Básico 100</span>,{" "}
              <span className="text-amber-300 font-semibold">Medio 500</span> y{" "}
              <span className="text-usg-red font-semibold">Premium 1,000</span>.
            </p>
          </div>
        </div>
      </section>

      <section className="relative pb-20 bg-black/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ProductosList categorias={SKU_CATEGORIAS} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
