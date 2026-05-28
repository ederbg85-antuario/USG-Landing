"use client";

import { useMemo, useState } from "react";
import type { Distribuidor } from "@/lib/promo/distribuidores";

export default function DistribuidoresList({
  distribuidores,
}: {
  distribuidores: Distribuidor[];
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q === "") return distribuidores;
    return distribuidores
      .map((d) => {
        const matchName =
          d.nombre.toLowerCase().includes(q) ||
          d.razon.toLowerCase().includes(q);
        if (matchName) return d;
        const sucursales = d.sucursales.filter((s) =>
          s.toLowerCase().includes(q),
        );
        return sucursales.length > 0 ? { ...d, sucursales } : null;
      })
      .filter((d): d is Distribuidor => d !== null);
  }, [distribuidores, query]);

  const totalShown = filtered.length;

  return (
    <div className="-mt-8">
      {/* Buscador */}
      <div className="sticky top-[64px] z-30 -mx-4 px-4 sm:mx-0 sm:px-0 py-4 bg-black/70 backdrop-blur-md mb-6">
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar distribuidor, marca o sucursal…"
            className="w-full bg-white/5 border border-white/15 rounded-full pl-11 pr-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-usg-red/60 transition-colors"
          />
        </div>
        <p className="text-xs text-white/45 mt-3">
          Mostrando {totalShown} distribuidor{totalShown === 1 ? "" : "es"}
        </p>
      </div>

      {/* Tarjetas */}
      {filtered.length === 0 ? (
        <p className="text-center text-white/50 py-16">
          No se encontraron distribuidores con esa búsqueda.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((d) => (
            <div
              key={d.nombre + d.razon}
              className="card-glow rounded-2xl p-5 flex flex-col"
            >
              <h2 className="font-display text-xl text-white tracking-wide leading-tight">
                {d.nombre}
              </h2>
              {d.razon && d.razon.toLowerCase() !== d.nombre.toLowerCase() && (
                <p className="text-xs text-white/40 mt-0.5 mb-3">{d.razon}</p>
              )}
              <p className="text-[11px] uppercase tracking-wider text-usg-red font-semibold mb-2 mt-auto pt-3">
                {d.sucursales.length} sucursal
                {d.sucursales.length === 1 ? "" : "es"}
              </p>
              <ul className="space-y-1.5">
                {d.sucursales.map((s, i) => (
                  <li
                    key={`${s}-${i}`}
                    className="flex items-start gap-2 text-sm text-white/80"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-usg-red/70 flex-shrink-0" />
                    <span className="leading-snug">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
