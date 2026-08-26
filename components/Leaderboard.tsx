"use client";

/**
 * ============================================================
 * RESUMEN DE LA LISTA OFICIAL DE GANADORES
 * ============================================================
 *
 * El endpoint público lee la misma lista final del cliente que alimenta
 * /ganadores. Esa fuente permanece separada del ranking operativo.
 * ============================================================
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import UsgLogo from "@/components/UsgLogo";

type LeaderboardEntry = {
  rank: number;
  name: string;
  state?: string;
  stars: number; // 0..5
  points: number;
  distributor?: string;
  prize?: string;
};

const MEDALS: Record<number, { emoji: string; ring: string }> = {
  1: { emoji: "🥇", ring: "ring-yellow-400/60" },
  2: { emoji: "🥈", ring: "ring-gray-300/60" },
  3: { emoji: "🥉", ring: "ring-orange-400/60" },
};

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelado = false;

    const cargarRanking = async () => {
      try {
        const res = await fetch("/api/leaderboard");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: LeaderboardEntry[] = await res.json();
        if (cancelado) return;
        setEntries(data);
        setError(false);
      } catch {
        if (!cancelado) setError(true);
      } finally {
        if (cancelado) return;
        setLoading(false);
      }
    };

    cargarRanking();
    return () => {
      cancelado = true;
    };
  }, []);

  return (
    <section
      id="ranking"
      className="relative py-16 sm:py-24 lg:py-28 overflow-hidden bg-gradient-to-b from-black/45 via-usg-black/35 to-black/45"
    >
      {/* Marca de agua del logo USG (vector) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
        <UsgLogo variant="light" className="w-[80%] max-w-4xl h-auto" />
      </div>

      {/* Spotlights rojos USG */}
      <div className="absolute top-0 left-1/4 w-[480px] h-[480px] rounded-full bg-usg-red/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[480px] h-[480px] rounded-full bg-usg-red/15 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-usg-red/15 border border-usg-red/40 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
            <span className="text-xs sm:text-sm font-semibold text-white tracking-wider uppercase">
              RESULTADOS OFICIALES · LISTA FINAL
            </span>
          </div>
          <span className="inline-block text-usg-red text-sm font-bold tracking-widest uppercase mb-3">
            Tabla de posiciones nacional
          </span>
          <h2 className="font-display text-4xl xs:text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[0.92] mb-5 sm:mb-6">
            <span className="block">Ranking de ganadores</span>
            <span className="block gradient-text-red">lista oficial</span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Consulta a los primeros lugares de la lista final proporcionada
            por la Organizadora. La página completa incluye a los 115
            ganadores y el premio asignado a cada uno.
          </p>
        </div>

        {/* Tarjeta principal del leaderboard — paleta USG (rojo/negro) */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border-2 border-usg-red/50 shadow-2xl shadow-usg-red/30 bg-gradient-to-br from-usg-red-dark/30 via-black to-black">
            {/* Glows USG */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-usg-red/30 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-usg-red/20 blur-3xl pointer-events-none" />

            {/* Cabecera de la tarjeta */}
            <div className="relative z-10 flex items-center justify-between gap-3 px-5 sm:px-8 py-5 border-b border-usg-red/30 bg-gradient-to-r from-usg-red/20 via-usg-red/10 to-transparent">
              <div className="flex items-center gap-3 min-w-0">
                <div className="bg-white rounded-md px-2.5 py-1.5 shadow-lg flex-shrink-0">
                  <UsgLogo variant="dark" className="h-6 sm:h-7 w-auto" />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-lg sm:text-2xl text-white tracking-wide leading-none truncate">
                    RANKING USG
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-white/60 mt-1 truncate">
                    Primeros {entries.length} de 115 · Liga de Campeones
                  </p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[10px] uppercase tracking-widest text-white/60">
                  {loading ? "Cargando…" : "Corte oficial"}
                </p>
                <p className="text-xs text-white font-mono">26 AGO 2026</p>
              </div>
            </div>

            {/* Filas */}
            {loading ? (
              <div className="relative z-10 px-6 sm:px-8 py-16 text-center text-sm text-white/50">
                Cargando ranking…
              </div>
            ) : error ? (
              <div className="relative z-10 px-6 sm:px-8 py-16 text-center text-sm text-white/50">
                No pudimos cargar el ranking ahora mismo. Vuelve a intentar en
                un momento.
              </div>
            ) : entries.length === 0 ? (
              <div className="relative z-10 px-6 sm:px-8 py-16 text-center text-sm text-white/50">
                Aún no hay participantes en el ranking. ¡Registra tus compras
                por WhatsApp y aparece aquí!
              </div>
            ) : (
            <ol className="relative z-10 divide-y divide-white/5">
              {entries.map((entry) => {
                const medal = MEDALS[entry.rank];
                const isTop3 = entry.rank <= 3;
                return (
                  <li
                    key={entry.rank}
                    className={`flex items-center gap-3 sm:gap-4 px-4 sm:px-8 py-4 transition-colors ${
                      isTop3 ? "bg-usg-red/[0.06]" : ""
                    } hover:bg-usg-red/10`}
                  >
                    {/* Rank / medalla */}
                    <div className="flex-shrink-0 w-10 sm:w-12 flex items-center justify-center">
                      {medal ? (
                        <span
                          className={`text-3xl sm:text-4xl drop-shadow-lg ring-2 ${medal.ring} rounded-full`}
                          title={`${entry.rank}° lugar`}
                        >
                          {medal.emoji}
                        </span>
                      ) : (
                        <span className="font-display text-2xl sm:text-3xl text-white/40 tabular-nums">
                          {entry.rank}
                        </span>
                      )}
                    </div>

                    {/* Avatar */}
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-usg-red/40 flex items-center justify-center text-white/70 overflow-hidden">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-7 h-7 sm:w-8 sm:h-8 opacity-80"
                      >
                        <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.4c-3.3 0-9.8 1.6-9.8 4.9V22h19.6v-2.7c0-3.3-6.5-4.9-9.8-4.9z" />
                      </svg>
                    </div>

                    {/* Nombre + estado */}
                    <div className="flex-1 min-w-0 bg-gradient-to-r from-usg-red/15 via-usg-red/5 to-transparent rounded-xl px-3 sm:px-4 py-2 border-l-2 border-usg-red">
                      <p className="text-white font-semibold text-sm sm:text-base truncate">
                        {entry.name}
                      </p>
                      {(entry.state || entry.distributor) && (
                        <p className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider truncate">
                          {[entry.state, entry.distributor]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      )}
                      {entry.prize ? (
                        <p className="mt-1 truncate text-[9px] font-bold uppercase tracking-wider text-emerald-300/75 sm:hidden">
                          {entry.prize}
                        </p>
                      ) : null}
                    </div>

                    {/* Premio */}
                    <div className="hidden max-w-[12rem] flex-shrink-0 sm:block">
                      <p className="text-right text-[9px] font-black uppercase leading-tight tracking-[0.1em] text-emerald-300/75">
                        {entry.prize}
                      </p>
                    </div>

                    {/* Puntos */}
                    <div className="flex-shrink-0 text-right min-w-[70px] sm:min-w-[90px]">
                      <p className="font-display text-xl sm:text-2xl text-white leading-none tabular-nums">
                        {entry.points.toLocaleString("es-MX")}
                      </p>
                      <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-usg-red mt-1">
                        pts
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
            )}

            {/* Footer de la tarjeta */}
            <div className="relative z-10 px-6 sm:px-8 py-4 border-t border-usg-red/30 bg-black/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/60">
              <p>
                Lista final proporcionada por la Organizadora.
              </p>
              <Link
                href="/ganadores"
                className="font-black uppercase tracking-wider text-usg-red transition-colors hover:text-white"
              >
                Ver los 115 ganadores →
              </Link>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-center text-xs text-white/40 max-w-2xl mx-auto mt-6">
            Posiciones, puntos y premios publicados conforme a la lista final
            de la Organizadora, con corte al 26 de agosto de 2026.
          </p>
        </div>
      </div>
    </section>
  );
}
