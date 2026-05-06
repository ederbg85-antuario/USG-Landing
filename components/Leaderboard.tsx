"use client";

/**
 * ============================================================
 * LEADERBOARD — Top de la USG Liga de Campeones
 * ============================================================
 *
 * Por ahora usa datos ficticios (mock) para mostrar el diseño.
 *
 * 🔌 Cuando se conecte a Google Sheets:
 *    1. Crea un endpoint en /app/api/leaderboard/route.ts que
 *       consulte la hoja (con la API de Google Sheets o un
 *       script Apps Script publicado como webapp).
 *    2. Reemplaza la constante MOCK_LEADERBOARD por una
 *       llamada `fetch("/api/leaderboard")` dentro de un
 *       useEffect (ver bloque comentado más abajo).
 *    3. Listo — la sección refrescará en tiempo real.
 * ============================================================
 */

import { useEffect, useState } from "react";
import Image from "next/image";

type LeaderboardEntry = {
  rank: number;
  name: string;
  state?: string;
  stars: number; // 0..5
  points: number;
};

/**
 * Datos ficticios — REEMPLAZAR por fetch a la API cuando esté lista.
 */
const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: "Carlos M.", state: "CDMX", stars: 5, points: 14820 },
  { rank: 2, name: "María G.", state: "Jalisco", stars: 5, points: 13110 },
  { rank: 3, name: "Roberto S.", state: "Nuevo León", stars: 4, points: 11890 },
  { rank: 4, name: "Ana L.", state: "Querétaro", stars: 4, points: 9740 },
  { rank: 5, name: "Jorge V.", state: "Puebla", stars: 4, points: 8650 },
  { rank: 6, name: "Patricia R.", state: "Yucatán", stars: 3, points: 7220 },
  { rank: 7, name: "Diego H.", state: "Estado de México", stars: 3, points: 6430 },
  { rank: 8, name: "Lucía F.", state: "Guanajuato", stars: 3, points: 5810 },
  { rank: 9, name: "Miguel A.", state: "Veracruz", stars: 2, points: 4920 },
  { rank: 10, name: "Sofía T.", state: "Sinaloa", stars: 2, points: 4150 },
];

/**
 * Cuando se integre Google Sheets, el endpoint debería responder:
 *  [{ "rank": 1, "name": "...", "state": "...", "stars": 5, "points": 14820 }, ...]
 *  ordenado por puntos desc.
 */

const MEDALS: Record<number, { emoji: string; bg: string; ring: string }> = {
  1: { emoji: "🥇", bg: "from-yellow-400 to-yellow-600", ring: "ring-yellow-400/60" },
  2: { emoji: "🥈", bg: "from-gray-300 to-gray-500", ring: "ring-gray-300/60" },
  3: { emoji: "🥉", bg: "from-orange-400 to-orange-700", ring: "ring-orange-400/60" },
};

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`w-4 h-4 sm:w-[18px] sm:h-[18px] ${
            i < count ? "text-yellow-400" : "text-white/15"
          }`}
        >
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>(MOCK_LEADERBOARD);
  const [loading, setLoading] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<string>("");

  useEffect(() => {
    // marca el momento del último refresh con la hora local del cliente
    const now = new Date();
    setUpdatedAt(
      now.toLocaleString("es-MX", {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    );

    /**
     * 🔌 Cuando esté lista la API conectada a Google Sheets,
     * descomenta este bloque y elimina el setEntries inicial.
     *
     * setLoading(true);
     * fetch("/api/leaderboard")
     *   .then((r) => r.json())
     *   .then((data: LeaderboardEntry[]) => {
     *     setEntries(data);
     *     setUpdatedAt(new Date().toLocaleString("es-MX"));
     *   })
     *   .catch(() => {})
     *   .finally(() => setLoading(false));
     */
  }, []);

  return (
    <section
      id="ranking"
      className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-black via-usg-black to-black"
    >
      {/* Marca de agua del logo USG */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
        <Image
          src="/images.png"
          alt=""
          width={1100}
          height={480}
          className="w-[80%] max-w-4xl h-auto"
        />
      </div>

      {/* Spotlights */}
      <div className="absolute top-0 left-1/4 w-[480px] h-[480px] rounded-full bg-usg-red/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[480px] h-[480px] rounded-full bg-usg-red/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-usg-red/15 border border-usg-red/40 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-usg-red rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-white tracking-wider uppercase">
              Ranking en vivo
            </span>
          </div>
          <span className="inline-block text-usg-red text-sm font-bold tracking-widest uppercase mb-3">
            Tabla de posiciones nacional
          </span>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none mb-6">
            <span className="gradient-text-red">LEADERBOARD</span>
            <span className="block text-white text-3xl sm:text-4xl md:text-5xl mt-2">
              Liga de Campeones
            </span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Estos son los líderes de la promoción en tiempo real. Sube en el
            ranking acumulando goles (puntos) por cada compra USG registrada
            por WhatsApp.
          </p>
        </div>

        {/* Tarjeta principal del leaderboard */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border-2 border-usg-red/40 shadow-2xl shadow-usg-red/20 bg-gradient-to-br from-[#0a1530] via-[#06122a] to-black">
            {/* Glow lateral */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-usg-red/20 blur-3xl pointer-events-none" />

            {/* Cabecera de la tarjeta */}
            <div className="relative z-10 flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="bg-white rounded-md p-1.5 shadow-lg">
                  <Image
                    src="/images.png"
                    alt="USG"
                    width={50}
                    height={22}
                    className="h-5 w-auto"
                  />
                </div>
                <div>
                  <p className="font-display text-xl sm:text-2xl text-white tracking-wide leading-none">
                    LEADERBOARD
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-white/50 mt-1">
                    Top {entries.length} · USG Liga de Campeones
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest text-white/50">
                  {loading ? "Actualizando…" : "Última actualización"}
                </p>
                <p className="text-xs text-white/80 font-mono">{updatedAt}</p>
              </div>
            </div>

            {/* Filas */}
            <ol className="relative z-10 divide-y divide-white/5">
              {entries.map((entry) => {
                const medal = MEDALS[entry.rank];
                const isTop3 = entry.rank <= 3;
                return (
                  <li
                    key={entry.rank}
                    className={`flex items-center gap-3 sm:gap-4 px-4 sm:px-8 py-4 transition-colors ${
                      isTop3 ? "bg-white/[0.02]" : ""
                    } hover:bg-usg-red/5`}
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
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/70 overflow-hidden">
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
                    <div className="flex-1 min-w-0 bg-gradient-to-r from-white/[0.06] to-transparent rounded-xl px-3 sm:px-4 py-2 border-l-2 border-usg-red/40">
                      <p className="text-white font-semibold text-sm sm:text-base truncate">
                        {entry.name}
                      </p>
                      {entry.state && (
                        <p className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider truncate">
                          {entry.state}
                        </p>
                      )}
                    </div>

                    {/* Estrellas — ocultas en mobile muy estrecho */}
                    <div className="hidden sm:flex flex-shrink-0">
                      <StarRow count={entry.stars} />
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

            {/* Footer de la tarjeta */}
            <div className="relative z-10 px-6 sm:px-8 py-4 border-t border-white/10 bg-black/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
              <p>
                🔄 Datos sincronizados con la base de datos oficial de la
                promoción.
              </p>
              <p className="font-mono">USG · 2026</p>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-center text-xs text-white/40 max-w-2xl mx-auto mt-6">
            *Tabla de posiciones referencial. La posición final se determina al
            cierre oficial de la promoción según los puntos validados de
            tickets enviados por WhatsApp.
          </p>
        </div>
      </div>
    </section>
  );
}
