import type { Metadata } from "next";
import SubPageHeader from "@/components/SubPageHeader";
import Footer from "@/components/Footer";
import DistribuidoresList from "./DistribuidoresList";
import {
  DISTRIBUIDORES,
  DISTRIBUIDORES_TOTAL,
  SUCURSALES_TOTAL,
} from "@/lib/promo/distribuidores";

export const metadata: Metadata = {
  title: "Distribuidores oficiales — USG Liga de Campeones",
  description:
    "Consulta el listado de distribuidores y tiendas oficiales participantes en la promoción USG Liga de Campeones, con todas sus sucursales.",
};

export default function DistribuidoresPage() {
  return (
    <main className="usg-global-bg min-h-screen overflow-x-hidden">
      <SubPageHeader />

      <section className="relative py-12 sm:py-16 overflow-hidden bg-gradient-to-b from-black/60 via-[#0a1208]/45 to-black/55">
        <div className="absolute top-1/4 -right-32 w-72 h-72 bg-usg-red/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block text-usg-red text-sm font-bold tracking-widest uppercase mb-3">
              Promoción USG Liga de Campeones
            </span>
            <h1 className="font-display text-4xl xs:text-5xl sm:text-6xl text-white tracking-tight leading-[0.95] mb-4">
              Distribuidores oficiales
            </h1>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">
              Compra tus productos USG participantes en cualquiera de los{" "}
              <span className="text-white font-semibold">
                {DISTRIBUIDORES_TOTAL} distribuidores autorizados
              </span>{" "}
              y sus{" "}
              <span className="text-white font-semibold">
                {SUCURSALES_TOTAL} sucursales
              </span>{" "}
              a nivel nacional. También participan las tiendas Home Depot México
              participantes.
            </p>
          </div>
        </div>
      </section>

      <section className="relative pb-20 bg-black/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <DistribuidoresList distribuidores={DISTRIBUIDORES} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
