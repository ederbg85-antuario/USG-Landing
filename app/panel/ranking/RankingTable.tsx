"use client";

import { Fragment, useMemo, useState } from "react";
import type { ParticipanteRow, Ticket } from "@/lib/panel/data";

function fmtDate(s: string | null) {
  if (!s) return "—";
  return new Date(s).toLocaleString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const num = (v: number | string | null | undefined): number => {
  const n = typeof v === "string" ? parseFloat(v) : (v as number);
  return Number.isFinite(n) ? n : 0;
};

const fmtMXN = (n: number) =>
  n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });

// Compra total de un participante = suma del total de sus tickets aprobados.
function compraTotal(r: ParticipanteRow): number {
  return r.tickets
    .filter((t) => t.status === "aprobado")
    .reduce((acc, t) => acc + num(t.total_ticket), 0);
}

function productosResumen(t: Ticket): string {
  return (t.productos_detectados || [])
    .map((p) => `${p.cantidad ?? "?"}× ${p.nombre ?? p.sku ?? "?"}`)
    .join("; ");
}

function toCSV(rows: ParticipanteRow[]) {
  const headers = [
    "posicion",
    "nombre",
    "nombre_publico",
    "empresa",
    "estado",
    "ciudad",
    "telefono",
    "email",
    "rol",
    "puntos_total",
    "tickets_aprobados",
    "compra_total_mxn",
    "estado_cuenta",
    "fecha_registro",
    "distribuidores",
    "sucursales",
    "productos",
    "imagenes_tickets",
  ];
  const esc = (v: unknown) => {
    const s = v == null ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const uniq = (arr: (string | null)[]) =>
    [...new Set(arr.filter((x): x is string => !!x && x.trim() !== ""))].join(" | ");
  const lines = rows.map((r, i) =>
    [
      i + 1,
      r.nombre,
      r.nombre_publico,
      r.empresa,
      r.estado,
      r.ciudad,
      r.telefono,
      r.email,
      r.rol,
      r.puntos_total ?? 0,
      r.tickets_aprobados ?? 0,
      Math.round(compraTotal(r)),
      r.estado_cuenta,
      r.fecha_registro,
      uniq(r.tickets.map((t) => t.tienda)),
      uniq(r.tickets.map((t) => t.sucursal)),
      uniq(r.tickets.map((t) => productosResumen(t)).filter(Boolean)),
      r.tickets
        .map((t) => t.url_imagen)
        .filter(Boolean)
        .join(" | "),
    ]
      .map(esc)
      .join(","),
  );
  return [headers.join(","), ...lines].join("\n");
}

export default function RankingTable({ rows }: { rows: ParticipanteRow[] }) {
  const [q, setQ] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return rows;
    return rows.filter((r) =>
      [
        r.nombre,
        r.estado,
        r.ciudad,
        r.telefono,
        r.email,
        r.rol,
        r.empresa,
        ...r.tickets.map((tk) => tk.tienda),
        ...r.tickets.map((tk) => tk.sucursal),
      ]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(t)),
    );
  }, [rows, q]);

  function downloadCSV() {
    const blob = new Blob(["﻿" + toCSV(filtered)], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ranking-usg-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nombre, estado, distribuidor…"
          className="w-full sm:max-w-xs rounded-lg bg-black/40 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-usg-red"
        />
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/45">
            {filtered.length} registro{filtered.length === 1 ? "" : "s"}
          </span>
          <button
            onClick={downloadCSV}
            className="rounded-lg bg-usg-red hover:bg-usg-red-dark text-white text-sm font-semibold px-4 py-2.5 transition-colors whitespace-nowrap"
          >
            ⬇ Descargar CSV
          </button>
        </div>
      </div>

      <div className="card-glow rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-widest text-white/45 border-b border-white/10">
                <th className="px-4 py-3 font-semibold">#</th>
                <th className="px-4 py-3 font-semibold">Participante</th>
                <th className="px-4 py-3 font-semibold">Ubicación</th>
                <th className="px-4 py-3 font-semibold">Contacto</th>
                <th className="px-4 py-3 font-semibold text-right">Puntos</th>
                <th className="px-4 py-3 font-semibold text-right">Compra</th>
                <th className="px-4 py-3 font-semibold text-center">Tickets</th>
                <th className="px-4 py-3 font-semibold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((r, i) => {
                const isOpen = expanded === r.telefono;
                const conImg = r.tickets.filter((t) => t.url_imagen);
                const compra = compraTotal(r);
                return (
                  <Fragment key={r.telefono}>
                    <tr className="hover:bg-white/[0.03]">
                      <td className="px-4 py-3 text-white/40 tabular-nums">{i + 1}</td>
                      <td className="px-4 py-3">
                        <p className="text-white font-medium">{r.nombre ?? "—"}</p>
                        <p className="text-[11px] text-white/40">
                          {r.rol ?? ""} · {r.estado_cuenta ?? ""}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-white/60">
                        {[r.ciudad, r.estado].filter(Boolean).join(", ") || "—"}
                      </td>
                      <td className="px-4 py-3 text-white/60">
                        <p className="tabular-nums">{r.telefono}</p>
                        {r.email && (
                          <p className="text-[11px] text-white/40 truncate max-w-[180px]">
                            {r.email}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="font-display text-xl text-white tabular-nums">
                          {(r.puntos_total ?? 0).toLocaleString("es-MX")}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-white/70 tabular-nums">
                        {compra > 0 ? fmtMXN(compra) : "—"}
                      </td>
                      <td className="px-4 py-3 text-center text-white/60 tabular-nums">
                        {r.tickets.length}
                        {conImg.length > 0 && (
                          <span className="text-[11px] text-usg-red ml-1">
                            ({conImg.length}📎)
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {r.tickets.length > 0 && (
                          <button
                            onClick={() => setExpanded(isOpen ? null : r.telefono)}
                            className="text-xs text-usg-red hover:underline whitespace-nowrap"
                          >
                            {isOpen ? "Ocultar" : "Ver tickets"}
                          </button>
                        )}
                      </td>
                    </tr>
                    {isOpen && (
                      <tr className="bg-black/30">
                        <td colSpan={8} className="px-4 py-4">
                          <div className="flex flex-wrap gap-3">
                            {r.tickets.map((t, ti) => (
                              <div
                                key={ti}
                                className="w-56 rounded-lg border border-white/10 overflow-hidden bg-black/40"
                              >
                                {t.url_imagen ? (
                                  t.url_imagen.toLowerCase().endsWith(".pdf") ? (
                                    <a
                                      href={t.url_imagen}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="flex items-center justify-center h-28 text-4xl hover:bg-white/5"
                                    >
                                      📄
                                    </a>
                                  ) : (
                                    <a href={t.url_imagen} target="_blank" rel="noreferrer">
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img
                                        src={t.url_imagen}
                                        alt="Ticket"
                                        className="h-28 w-full object-cover hover:opacity-80 transition-opacity"
                                      />
                                    </a>
                                  )
                                ) : (
                                  <div className="flex items-center justify-center h-28 text-xs text-white/30">
                                    sin imagen
                                  </div>
                                )}
                                <div className="px-2.5 py-2 text-[11px] space-y-1.5">
                                  <p className="text-white/70 capitalize">
                                    {t.status ?? "—"} ·{" "}
                                    {(t.puntos_ticket ?? 0).toLocaleString("es-MX")} pts
                                  </p>
                                  {(t.tienda || t.sucursal) && (
                                    <p className="text-white/60 leading-snug">
                                      🏬 {t.tienda ?? "—"}
                                      {t.sucursal ? ` · ${t.sucursal}` : ""}
                                    </p>
                                  )}
                                  {num(t.total_ticket) > 0 && (
                                    <p className="text-white/50">
                                      Compra: {fmtMXN(num(t.total_ticket))}
                                    </p>
                                  )}
                                  {(t.productos_detectados?.length ?? 0) > 0 && (
                                    <ul className="text-white/55 leading-snug list-none space-y-0.5 pt-1 border-t border-white/10">
                                      {t.productos_detectados!.map((p, pi) => (
                                        <li key={pi}>
                                          {p.cantidad ?? "?"}× {p.nombre ?? p.sku}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                  <p className="text-white/35">{fmtDate(t.fecha_envio)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-white/40 text-sm">
                    Sin resultados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
