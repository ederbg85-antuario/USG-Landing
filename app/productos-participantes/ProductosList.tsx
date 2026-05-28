"use client";

import { useMemo, useState } from "react";
import type { SkuCategoria, Nivel } from "@/lib/promo/skus";

const NIVEL_STYLES: Record<Nivel, string> = {
  "BÁSICO": "bg-white/10 text-white/80 border-white/20",
  "MEDIO": "bg-amber-400/15 text-amber-300 border-amber-400/40",
  "PREMIUM": "bg-usg-red/20 text-usg-red-light border-usg-red/50",
};

const NIVEL_PUNTOS: Record<Nivel, string> = {
  "BÁSICO": "100 pts",
  "MEDIO": "500 pts",
  "PREMIUM": "1,000 pts",
};

export default function ProductosList({
  categorias,
}: {
  categorias: SkuCategoria[];
}) {
  const [query, setQuery] = useState("");
  const [nivel, setNivel] = useState<"TODOS" | Nivel>("TODOS");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categorias
      .map((c) => ({
        ...c,
        items: c.items.filter((it) => {
          const matchNivel = nivel === "TODOS" || it.nivel === nivel;
          const matchQuery =
            q === "" ||
            it.sku.toLowerCase().includes(q) ||
            it.desc.toLowerCase().includes(q);
          return matchNivel && matchQuery;
        }),
      }))
      .filter((c) => c.items.length > 0);
  }, [categorias, query, nivel]);

  const totalShown = filtered.reduce((n, c) => n + c.items.length, 0);

  const niveles: ("TODOS" | Nivel)[] = ["TODOS", "BÁSICO", "MEDIO", "PREMIUM"];

  return (
    <div className="-mt-8">
      {/* Controles */}
      <div className="sticky top-[64px] z-30 -mx-4 px-4 sm:mx-0 sm:px-0 py-4 bg-black/70 backdrop-blur-md mb-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="relative flex-1">
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
              placeholder="Buscar por SKU o nombre del producto…"
              className="w-full bg-white/5 border border-white/15 rounded-full pl-11 pr-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-usg-red/60 transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {niveles.map((n) => (
              <button
                key={n}
                onClick={() => setNivel(n)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                  nivel === n
                    ? "bg-usg-red text-white border-usg-red"
                    : "bg-white/5 text-white/70 border-white/15 hover:border-white/40"
                }`}
              >
                {n === "TODOS" ? "Todos" : n.charAt(0) + n.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>
        <p className="text-xs text-white/45 mt-3">
          Mostrando {totalShown} producto{totalShown === 1 ? "" : "s"}
        </p>
      </div>

      {/* Listado */}
      {filtered.length === 0 ? (
        <p className="text-center text-white/50 py-16">
          No se encontraron productos con esos filtros.
        </p>
      ) : (
        <div className="space-y-10">
          {filtered.map((cat) => (
            <div key={cat.cat}>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="font-display text-2xl sm:text-3xl text-white tracking-wide uppercase">
                  {cat.cat}
                </h2>
                <span className="text-xs text-white/40">
                  {cat.items.length} producto{cat.items.length === 1 ? "" : "s"}
                </span>
                <span className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10">
                <table className="w-full text-left">
                  <thead className="bg-white/[0.06] text-white/55 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3 font-semibold w-36 sm:w-44">
                        SKU
                      </th>
                      <th className="px-4 py-3 font-semibold">Producto</th>
                      <th className="px-4 py-3 font-semibold text-right w-28 sm:w-40">
                        Nivel
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cat.items.map((it, i) => (
                      <tr
                        key={`${it.sku}-${i}`}
                        className="border-t border-white/[0.06] hover:bg-white/[0.03] transition-colors"
                      >
                        <td className="px-4 py-3 align-top font-mono text-xs sm:text-sm text-white/80">
                          {it.sku}
                        </td>
                        <td className="px-4 py-3 align-top text-sm text-white/90 leading-snug">
                          {it.desc}
                        </td>
                        <td className="px-4 py-3 align-top text-right">
                          <span
                            className={`inline-block whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-semibold ${NIVEL_STYLES[it.nivel]}`}
                          >
                            {it.nivel.charAt(0) + it.nivel.slice(1).toLowerCase()}
                            <span className="hidden sm:inline">
                              {" · "}
                              {NIVEL_PUNTOS[it.nivel]}
                            </span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
