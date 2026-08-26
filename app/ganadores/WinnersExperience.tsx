"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { PublicRankingEntry } from "@/lib/public-ranking";
import UsgLogo from "@/components/UsgLogo";

type WinnersExperienceProps = {
  initialEntries: PublicRankingEntry[];
};

const PODIUM_PRIZES: Record<
  number,
  { amount: string; label: string; accent: string; surface: string; medal: string }
> = {
  1: {
    amount: "$100,000",
    label: "en productos USG",
    accent: "text-[#ffd55c]",
    surface: "from-[#7d5300]/80 via-[#291b04]/95 to-black",
    medal: "ORO",
  },
  2: {
    amount: "$50,000",
    label: "en productos USG",
    accent: "text-[#e5e7eb]",
    surface: "from-slate-500/55 via-slate-950/95 to-black",
    medal: "PLATA",
  },
  3: {
    amount: "$30,000",
    label: "en productos USG",
    accent: "text-[#f3a56f]",
    surface: "from-orange-800/55 via-[#2b1308]/95 to-black",
    medal: "BRONCE",
  },
};

const PRIZE_CATEGORIES = [
  {
    name: "Motocicletas",
    kicker: "Para los líderes de la tabla",
    image: "/prizes/motocicleta-italika-ft200.jpeg",
  },
  {
    name: "Smart TVs",
    kicker: "Tecnología para disfrutar",
    image: "/prizes/smart-tv-lg-65.jpeg",
  },
  {
    name: "Herramienta profesional",
    kicker: "Potencia para cada proyecto",
    image: "/prizes/rotomartillo-bosch.jpeg",
  },
  {
    name: "Equipo y accesorios",
    kicker: "Premios para los 115 campeones",
    image: "/prizes/audifonos-beats-studio3.jpg",
  },
];

const numberFormatter = new Intl.NumberFormat("es-MX");

function formatPoints(value: number) {
  return numberFormatter.format(value);
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function PodiumCard({
  entry,
  rank,
}: {
  entry?: PublicRankingEntry;
  rank: 1 | 2 | 3;
}) {
  const prize = PODIUM_PRIZES[rank];
  const isFirst = rank === 1;

  return (
    <article
      className={`relative overflow-hidden rounded-[2rem] border bg-gradient-to-b ${prize.surface} p-5 sm:p-6 ${
        isFirst
          ? "border-[#ffd55c]/70 shadow-[0_28px_80px_rgba(255,188,39,0.22)] lg:-translate-y-7"
          : "border-white/15 shadow-2xl shadow-black/40"
      }`}
    >
      <div
        aria-hidden
        className={`absolute inset-x-0 top-0 h-px ${
          isFirst
            ? "bg-gradient-to-r from-transparent via-[#ffd55c] to-transparent"
            : "bg-gradient-to-r from-transparent via-white/60 to-transparent"
        }`}
      />
      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/10 blur-3xl" />

      <div className="relative flex items-center justify-between gap-3">
        <span
          className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-black tracking-[0.22em] ${prize.accent} border-current/30 bg-black/30`}
        >
          {prize.medal}
        </span>
        <span className="font-display text-5xl leading-none text-white/15">
          0{rank}
        </span>
      </div>

      <div className="relative mt-7 flex items-center gap-4">
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border font-display text-2xl ${
            isFirst
              ? "border-[#ffd55c]/50 bg-[#ffd55c]/15 text-[#ffd55c]"
              : "border-white/15 bg-white/10 text-white"
          }`}
        >
          {entry ? initials(entry.name) : "USG"}
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
            {rank}° lugar nacional
          </p>
          <h3 className="mt-1 truncate text-lg font-black text-white sm:text-xl">
            {entry?.name ?? "Actualizando…"}
          </h3>
          <p className="mt-1 truncate text-xs uppercase tracking-wider text-white/45">
            {[entry?.state ?? "México", entry?.distributor]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
      </div>

      <div className="relative mt-7 grid grid-cols-2 gap-3 border-t border-white/10 pt-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
            Marcador final
          </p>
          <p className="mt-1 font-display text-2xl text-white sm:text-3xl">
            {entry ? formatPoints(entry.points) : "—"}
            <span className="ml-1 text-xs font-sans text-white/45">pts</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
            Premio principal
          </p>
          <p className={`mt-1 font-display text-2xl sm:text-3xl ${prize.accent}`}>
            {prize.amount}
          </p>
          <p className="text-[10px] text-white/45">{prize.label}</p>
        </div>
      </div>
    </article>
  );
}

function RankingRow({ entry }: { entry: PublicRankingEntry }) {
  const isTopThree = entry.rank <= 3;

  return (
    <li
      className={`group grid grid-cols-[3.25rem_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3.5 [contain-intrinsic-size:0_72px] [content-visibility:auto] transition-colors sm:grid-cols-[4.25rem_minmax(0,1.15fr)_minmax(12rem,0.85fr)_auto] sm:gap-4 sm:px-6 sm:py-4 lg:px-8 ${
        isTopThree
          ? "bg-usg-red/[0.08] hover:bg-usg-red/[0.13]"
          : "hover:bg-white/[0.035]"
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-xl border font-display text-xl tabular-nums sm:h-11 sm:w-11 sm:text-2xl ${
            entry.rank === 1
              ? "border-yellow-400/40 bg-yellow-400/10 text-yellow-300"
              : entry.rank === 2
                ? "border-slate-300/30 bg-slate-300/10 text-slate-200"
                : entry.rank === 3
                  ? "border-orange-400/35 bg-orange-400/10 text-orange-300"
                  : "border-white/10 bg-white/[0.035] text-white/50"
          }`}
        >
          {entry.rank}
        </span>
      </div>

      <div className="flex min-w-0 items-center gap-3">
        <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-usg-red/30 to-black text-[11px] font-black text-white/75 xs:flex">
          {initials(entry.name)}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-white sm:text-base">
            {entry.name}
          </p>
          <p className="mt-0.5 truncate text-[10px] uppercase tracking-[0.16em] text-white/40 sm:text-xs">
            {[entry.state || "México", entry.distributor]
              .filter(Boolean)
              .join(" · ")}
          </p>
          {entry.prize ? (
            <p className="mt-1.5 line-clamp-2 text-[9px] font-bold uppercase leading-tight tracking-[0.12em] text-emerald-300/75 sm:hidden">
              {entry.prize}
            </p>
          ) : null}
        </div>
      </div>

      <div className="hidden sm:block">
        <span className="inline-flex max-w-full rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-2.5 py-1 text-[9px] font-black uppercase leading-tight tracking-[0.12em] text-emerald-300/80">
          {entry.prize ?? "Ganador 2026"}
        </span>
      </div>

      <div className="text-right">
        <p className="font-display text-xl tabular-nums text-white sm:text-2xl">
          {formatPoints(entry.points)}
        </p>
        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-usg-red">
          puntos
        </p>
      </div>
    </li>
  );
}

export default function WinnersExperience({
  initialEntries,
}: WinnersExperienceProps) {
  const [query, setQuery] = useState("");

  const filteredEntries = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("es-MX");
    if (!normalized) return initialEntries;

    return initialEntries.filter((entry) =>
      [
        entry.rank,
        entry.name,
        entry.state,
        entry.distributor,
        entry.prize,
        entry.points,
      ]
        .filter((value) => value !== undefined)
        .some((value) =>
          String(value).toLocaleLowerCase("es-MX").includes(normalized),
        ),
    );
  }, [initialEntries, query]);

  const topThree = initialEntries.slice(0, 3);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#070907] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-[4.5rem] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3"
            aria-label="Volver a USG Liga de Campeones"
          >
            <UsgLogo
              variant="light"
              className="h-8 w-auto brightness-0 invert sm:h-10"
              ariaLabel="USG"
            />
            <span className="hidden border-l border-white/15 pl-3 font-display text-lg tracking-wider sm:block">
              LIGA DE CAMPEONES
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-xs font-bold uppercase tracking-widest text-white/60 md:flex">
            <a href="#podio" className="transition-colors hover:text-white">
              Podio
            </a>
            <a href="#premios" className="transition-colors hover:text-white">
              Premios
            </a>
            <a href="#ranking" className="transition-colors hover:text-white">
              Top 115
            </a>
          </nav>

          <a
            href="#ranking"
            className="rounded-full bg-usg-red px-4 py-2.5 text-xs font-black uppercase tracking-wider shadow-lg shadow-usg-red/25 transition-transform hover:-translate-y-0.5 sm:px-5"
          >
            Ver ganadores
          </a>
        </div>
      </header>

      <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 -z-20 bg-[url('/backgrounds/hero-stadium-usg.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/90 to-black/45" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#070907] via-transparent to-black/40" />
        <div className="absolute -left-36 top-1/4 -z-10 h-[32rem] w-[32rem] rounded-full bg-usg-red/25 blur-[140px]" />
        <div className="absolute inset-0 -z-10 opacity-20 diagonal-stripes" />

        <div className="container mx-auto grid min-h-[calc(100svh-4.5rem)] items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-12 lg:gap-8 lg:px-8">
          <div className="relative z-10 text-center lg:col-span-7 lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.08] px-3.5 py-2 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-200 sm:text-xs">
                Resultados 2026 · Lista oficial
              </span>
            </div>

            <p className="mt-7 font-display text-lg uppercase tracking-[0.35em] text-white/55 sm:text-xl">
              USG Liga de Campeones
            </p>
            <h1 className="mx-auto mt-2 max-w-4xl font-display text-[4.25rem] leading-[0.82] tracking-[-0.035em] text-white xs:text-7xl sm:text-8xl md:text-[7.5rem] lg:mx-0 lg:text-[8.4rem] xl:text-[9.5rem]">
              LOS 115
              <span className="block bg-gradient-to-r from-[#ff526e] via-usg-red to-[#8d071c] bg-clip-text text-transparent">
                CAMPEONES
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg lg:mx-0 lg:text-xl">
              El esfuerzo, la constancia y cada punto los trajeron hasta aquí.
              Conoce a quienes llegaron más alto en la temporada 2026.
            </p>

            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
              <a
                href="#ranking"
                className="inline-flex items-center justify-center rounded-full bg-usg-red px-7 py-4 text-sm font-black uppercase tracking-wider shadow-[0_18px_50px_rgba(200,16,46,0.38)] transition-transform hover:-translate-y-1"
              >
                Consultar Top 115
              </a>
              <a
                href="#podio"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.06] px-7 py-4 text-sm font-black uppercase tracking-wider backdrop-blur-md transition-colors hover:bg-white/10"
              >
                Conocer el podio
              </a>
            </div>

            <div className="mx-auto mt-10 grid max-w-xl grid-cols-3 divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-black/35 py-4 backdrop-blur-md lg:mx-0">
              <div className="px-3 text-center">
                <p className="font-display text-3xl text-white sm:text-4xl">115</p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white/40 sm:text-[10px]">
                  Ganadores
                </p>
              </div>
              <div className="px-3 text-center">
                <p className="font-display text-3xl text-white sm:text-4xl">Nacional</p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white/40 sm:text-[10px]">
                  Competencia
                </p>
              </div>
              <div className="px-3 text-center">
                <p className="font-display text-3xl text-emerald-300 sm:text-4xl">13</p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white/40 sm:text-[10px]">
                  Tipos de premio
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-2xl lg:col-span-5 lg:max-w-none">
            <div className="absolute inset-1/4 rounded-full bg-usg-red/35 blur-[90px]" />
            <Image
              src="/imagen-premios.png"
              alt="Selección de premios de USG Liga de Campeones"
              width={2496}
              height={1664}
              priority
              sizes="(max-width: 1024px) 90vw, 44vw"
              className="relative h-auto w-full object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.65)]"
            />
            <div className="relative mx-auto -mt-4 w-[88%] rounded-2xl border border-white/10 bg-black/65 px-5 py-4 text-center shadow-2xl backdrop-blur-xl sm:-mt-8">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-usg-red">
                Llegaron a la cima
              </p>
              <p className="mt-1 font-display text-2xl tracking-wide text-white sm:text-3xl">
                HOY CELEBRAMOS A LOS GANADORES
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="podio"
        className="relative scroll-mt-20 overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#070907] via-[#120508] to-[#070907] py-20 sm:py-28"
      >
        <div className="absolute left-1/2 top-20 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-usg-red/15 blur-[130px]" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-usg-red">
              El podio de la temporada
            </p>
            <h2 className="mt-4 font-display text-5xl leading-[0.92] text-white sm:text-7xl lg:text-8xl">
              TRES HISTORIAS
              <span className="block text-white/35">EN LO MÁS ALTO</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-base">
              Los primeros lugares encabezan la lista final validada por la
              Organizadora para la temporada 2026.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-6xl gap-5 md:grid-cols-3 lg:mt-24 lg:gap-6">
            <div className="order-2 md:order-1">
              <PodiumCard entry={topThree[1]} rank={2} />
            </div>
            <div className="order-1 md:order-2">
              <PodiumCard entry={topThree[0]} rank={1} />
            </div>
            <div className="order-3">
              <PodiumCard entry={topThree[2]} rank={3} />
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-[11px] leading-relaxed text-white/35">
            Valores aproximados de los incentivos principales conforme a las
            Bases. Los premios económicos se entregan mediante un cheque
            representativo para redimir por productos USG con el distribuidor
            autorizado.
          </p>
        </div>
      </section>

      <section
        id="premios"
        className="scroll-mt-20 border-b border-white/10 bg-[#0a0c0a] py-20 sm:py-28"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-end gap-8 lg:grid-cols-2">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-usg-red">
                Premios escalonados
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-5xl leading-[0.9] text-white sm:text-7xl">
                MÁS ALTO EL LUGAR,
                <span className="block text-usg-red">MAYOR EL PREMIO</span>
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-white/55 sm:text-base lg:justify-self-end">
              Los 115 lugares forman parte de la selección ganadora.
              Los incentivos se asignan de mayor a menor de acuerdo con la
              posición final, la validación documental y la disponibilidad
              indicada por la Organizadora.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRIZE_CATEGORIES.map((category, index) => (
              <article
                key={category.name}
                className="group relative min-h-[22rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-black"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="font-display text-5xl text-white/20">
                    0{index + 1}
                  </span>
                  <h3 className="mt-2 font-display text-3xl leading-none text-white">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-xs uppercase tracking-wider text-white/50">
                    {category.kicker}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <p className="mx-auto mt-7 max-w-3xl text-center text-[11px] leading-relaxed text-white/35">
            Imágenes ilustrativas. Las marcas o modelos pueden variar por
            disponibilidad; se mantiene el tipo de premio asignado por la
            Organizadora.
          </p>
        </div>
      </section>

      <section
        id="ranking"
        className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-[#070907] to-black py-20 sm:py-28"
      >
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-usg-red/10 blur-[130px]" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3.5 py-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-200">
                Lista oficial de ganadores
              </span>
            </div>
            <h2 className="mt-5 font-display text-5xl leading-[0.9] text-white sm:text-7xl lg:text-8xl">
              RANKING COMPLETO
              <span className="block text-usg-red">TOP 115</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-base">
              Consulta la posición, los puntos y el premio asignado a cada
              ganador conforme a la lista proporcionada por la Organizadora.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-6xl overflow-hidden rounded-[2rem] border border-usg-red/35 bg-[#0b0c0b]/95 shadow-[0_30px_100px_rgba(200,16,46,0.15)]">
            <div className="border-b border-white/10 bg-gradient-to-r from-usg-red/15 via-black to-black p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-white px-2.5 py-2">
                    <UsgLogo variant="dark" className="h-6 w-auto sm:h-7" />
                  </div>
                  <div>
                    <p className="font-display text-xl tracking-wide text-white sm:text-2xl">
                      TABLA DE CAMPEONES
                    </p>
                    <p
                      className="mt-0.5 text-[10px] uppercase tracking-widest text-white/40"
                      aria-live="polite"
                    >
                      {initialEntries.length} ganadores · Corte 26 ago 2026
                    </p>
                  </div>
                </div>

                <div className="sm:w-80">
                  <label className="relative block min-w-0 sm:w-72">
                    <span className="sr-only">
                      Buscar por nombre, estado, lugar o puntos
                    </span>
                    <input
                      type="search"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Buscar ganador o premio…"
                      className="w-full rounded-full border border-white/10 bg-white/[0.055] px-5 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-usg-red/70 focus:bg-white/[0.08]"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="hidden grid-cols-[4.25rem_minmax(0,1.15fr)_minmax(12rem,0.85fr)_auto] gap-4 border-b border-white/10 bg-black/45 px-8 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-white/30 sm:grid">
              <span>Lugar</span>
              <span>Ganador</span>
              <span>Premio</span>
              <span className="text-right">Marcador</span>
            </div>

            {filteredEntries.length > 0 ? (
              <ol className="divide-y divide-white/[0.055]">
                {filteredEntries.map((entry) => (
                  <RankingRow key={entry.rank} entry={entry} />
                ))}
              </ol>
            ) : (
              <div className="px-6 py-20 text-center">
                <p className="font-display text-3xl text-white/50">
                  SIN RESULTADOS
                </p>
                <p className="mt-2 text-sm text-white/35">
                  Prueba con otro nombre, estado, lugar o puntaje.
                </p>
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="mt-5 text-xs font-bold uppercase tracking-wider text-usg-red hover:underline"
                >
                  Limpiar búsqueda
                </button>
              </div>
            )}

            <div className="flex flex-col gap-2 border-t border-white/10 bg-black/55 px-5 py-4 text-[10px] leading-relaxed text-white/35 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <p>Datos públicos: nombre abreviado, estado, distribuidor, posición, puntos y premio.</p>
              <p className="font-mono text-usg-red/70">USG · TEMPORADA 2026</p>
            </div>
          </div>

          <p className="mx-auto mt-6 max-w-3xl text-center text-[11px] leading-relaxed text-white/30">
            El orden y la asignación de premios corresponden a la lista final
            proporcionada por la Organizadora, con corte al 26 de agosto de
            2026.
          </p>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#110508] py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-usg-red/30 bg-gradient-to-br from-usg-red/20 via-black to-black p-6 sm:p-10 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-usg-red">
                  ¿Apareces en la lista?
                </p>
                <h2 className="mt-4 font-display text-5xl leading-[0.9] text-white sm:text-6xl">
                  LO QUE SIGUE
                  <span className="block text-white/30">PARA TI</span>
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-white/55">
                  El equipo organizador se pondrá en contacto utilizando los
                  datos registrados durante la promoción.
                </p>
              </div>

              <ol className="grid gap-3 sm:grid-cols-2">
                {[
                  ["01", "Confirma tu posición", "Localízate en el Top 115 y revisa tus puntos y premio."],
                  ["02", "Espera el contacto", "La Organizadora contactará a cada ganador."],
                  ["03", "Prepara tus documentos", "Conserva comprobantes originales e identificación vigente."],
                  ["04", "Recibe tu premio", "Se coordinará contigo la validación y entrega correspondiente."],
                ].map(([number, title, body]) => (
                  <li
                    key={number}
                    className="rounded-2xl border border-white/10 bg-white/[0.045] p-4"
                  >
                    <span className="font-display text-3xl text-usg-red">
                      {number}
                    </span>
                    <h3 className="mt-2 text-sm font-black uppercase tracking-wider text-white">
                      {title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-white/45">
                      {body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-7 sm:flex-row">
              <Link
                href="/bases"
                className="inline-flex items-center justify-center rounded-full bg-usg-red px-6 py-3.5 text-xs font-black uppercase tracking-wider transition-transform hover:-translate-y-0.5"
              >
                Consultar Bases
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                Volver a la página principal
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black py-10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
          <div className="flex items-center gap-3">
            <UsgLogo
              variant="light"
              className="h-8 w-auto brightness-0 invert"
              ariaLabel="USG"
            />
            <span className="border-l border-white/15 pl-3 font-display text-lg tracking-wider text-white">
              LIGA DE CAMPEONES
            </span>
          </div>
          <div className="text-[10px] leading-relaxed text-white/30 md:text-right">
            <p>Promoción USG Liga de Campeones · México · 2026</p>
            <p className="mt-1">
              Los nombres se muestran de forma abreviada para proteger los
              datos personales.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
