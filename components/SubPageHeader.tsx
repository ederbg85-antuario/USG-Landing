import Link from "next/link";
import UsgLogo from "@/components/UsgLogo";

export default function SubPageHeader() {
  return (
    <header className="sticky top-0 z-50 bg-black/85 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 group">
          <UsgLogo
            variant="light"
            className="h-10 sm:h-12 w-auto brightness-0 invert transition-transform group-hover:scale-105"
            ariaLabel="USG Liga de Campeones"
          />
          <span className="hidden sm:block border-l border-white/15 pl-3 font-display text-white text-base sm:text-lg leading-none tracking-wide">
            LIGA DE CAMPEONES
          </span>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-usg-red transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          Volver al inicio
        </Link>
      </div>
    </header>
  );
}
