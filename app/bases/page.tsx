import type { Metadata } from "next";
import Link from "next/link";
import SubPageHeader from "@/components/SubPageHeader";
import Footer from "@/components/Footer";
import { BASES_BLOCKS, type BaseBlock } from "@/lib/promo/bases";

export const metadata: Metadata = {
  title: "Bases, términos y condiciones — USG Liga de Campeones",
  description:
    "Bases oficiales, términos y condiciones de la promoción USG Liga de Campeones: mecánica, vigencia, requisitos, incentivos y restricciones.",
};

// Agrupa los bloques de lista consecutivos para renderizarlos como <ul>.
function renderBlocks(blocks: BaseBlock[]) {
  const out: React.ReactNode[] = [];
  let liBuffer: string[] = [];

  const flushList = (key: string) => {
    if (liBuffer.length === 0) return;
    out.push(
      <ul key={key} className="space-y-2 my-4 pl-1">
        {liBuffer.map((t, i) => (
          <li key={i} className="flex items-start gap-3 text-white/75">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-usg-red flex-shrink-0" />
            <span className="leading-relaxed">{t}</span>
          </li>
        ))}
      </ul>,
    );
    liBuffer = [];
  };

  blocks.forEach((b, i) => {
    if (b.kind === "li") {
      liBuffer.push(b.text);
      return;
    }
    flushList(`ul-${i}`);
    if (b.kind === "h2") {
      out.push(
        <h2
          key={i}
          className="font-display text-2xl sm:text-3xl text-white tracking-wide uppercase mt-10 mb-3 scroll-mt-24"
        >
          <span className="text-usg-red mr-2">{b.num}.</span>
          {b.text}
        </h2>,
      );
    } else {
      out.push(
        <p key={i} className="text-white/75 leading-relaxed my-3">
          {b.text}
        </p>,
      );
    }
  });
  flushList("ul-final");
  return out;
}

export default function BasesPage() {
  return (
    <main className="usg-global-bg min-h-screen overflow-x-hidden">
      <SubPageHeader />

      <section className="relative py-12 sm:py-16 overflow-hidden bg-gradient-to-b from-black/60 via-[#0a1208]/45 to-black/55">
        <div className="absolute top-1/4 -left-32 w-72 h-72 bg-usg-red/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block text-usg-red text-sm font-bold tracking-widest uppercase mb-3">
              Documento oficial
            </span>
            <h1 className="font-display text-4xl xs:text-5xl sm:text-6xl text-white tracking-tight leading-[0.95] mb-4">
              Bases de la promoción
              <span className="block gradient-text-red">
                USG Liga de Campeones
              </span>
            </h1>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">
              Lee íntegramente las siguientes bases y condiciones. Tu
              participación implica la total comprensión y aceptación de las
              mismas.
            </p>
          </div>
        </div>
      </section>

      <section className="relative pb-20 bg-black/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <article className="max-w-3xl bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-10">
            {renderBlocks(BASES_BLOCKS)}

            {/* Anexos */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <h2 className="font-display text-2xl sm:text-3xl text-white tracking-wide uppercase mb-4">
                Anexos
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Link
                  href="/distribuidores"
                  className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 hover:border-usg-red/50 transition-colors"
                >
                  <span>
                    <span className="block text-xs text-white/40 uppercase tracking-wider">
                      Anexo 01
                    </span>
                    <span className="text-white font-semibold">
                      Distribuidores oficiales
                    </span>
                  </span>
                  <span className="text-usg-red group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </Link>
                <Link
                  href="/productos-participantes"
                  className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 hover:border-usg-red/50 transition-colors"
                >
                  <span>
                    <span className="block text-xs text-white/40 uppercase tracking-wider">
                      Anexo 02
                    </span>
                    <span className="text-white font-semibold">
                      Productos participantes (SKUs)
                    </span>
                  </span>
                  <span className="text-usg-red group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}
