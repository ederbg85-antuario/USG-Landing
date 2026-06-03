"use client";

import { useState } from "react";
import type { Informe } from "@/lib/panel/data";

const fmtN = (n: number) => Math.round(n).toLocaleString("es-MX");
const fmtMXN = (n: number) =>
  n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });

function downloadCSV(filename: string, headers: string[], rows: (string | number)[][]) {
  const esc = (v: unknown) => {
    const s = v == null ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csv = [headers.join(","), ...rows.map((r) => r.map(esc).join(","))].join("\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function Kpi({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="card-glow rounded-2xl p-5">
      <p className="text-[11px] uppercase tracking-widest text-white/50 mb-2">{label}</p>
      <p className="font-display text-3xl text-white tabular-nums leading-none">{value}</p>
      {sub && <p className="text-xs text-white/45 mt-2">{sub}</p>}
    </div>
  );
}

function CsvButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 text-xs font-semibold px-3 py-1.5 transition-colors whitespace-nowrap"
    >
      ⬇ CSV
    </button>
  );
}

function SectionHead({
  title,
  desc,
  onCsv,
}: {
  title: string;
  desc?: string;
  onCsv?: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-3 mb-3">
      <div>
        <h2 className="font-display text-2xl text-white tracking-wide">{title}</h2>
        {desc && <p className="text-xs text-white/45 mt-0.5">{desc}</p>}
      </div>
      {onCsv && <CsvButton onClick={onCsv} />}
    </div>
  );
}

const MEDAL = ["🥇", "🥈", "🥉"];

export default function InformeView({ data }: { data: Informe }) {
  const [tab, setTab] = useState<"productos" | "distribuidores" | "sucursales">("productos");
  const { productos, distribuidores, sucursales, montos } = data;

  return (
    <div className="space-y-8">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi label="Compra total registrada" value={fmtMXN(montos.compraTotal)} sub="suma de tickets aprobados" />
        <Kpi label="Ticket promedio" value={fmtMXN(montos.ticketPromedio)} sub={`${montos.ticketsConMonto} con monto`} />
        <Kpi label="Puntos otorgados" value={fmtN(montos.puntosTotal)} />
        <Kpi label="Tickets aprobados" value={fmtN(montos.ticketsAprobados)} />
      </div>

      <p className="text-xs text-white/40 -mt-4">
        * Los montos corresponden al total de cada ticket aprobado. El monto desglosado solo de
        productos USG participantes se habilita en la siguiente fase (lectura de importe por
        renglón en el agente).
      </p>

      {/* Podio de productos */}
      <div>
        <SectionHead
          title="Inventario de productos"
          desc="Productos USG registrados en tickets aprobados, por unidades."
        />
        <div className="grid sm:grid-cols-3 gap-4 mb-5">
          {productos.slice(0, 3).map((p, i) => (
            <div key={p.sku} className="card-glow rounded-2xl p-5 border-yellow-500/20">
              <p className="text-3xl mb-1">{MEDAL[i]}</p>
              <p className="font-bold text-white text-sm leading-snug">{p.nombre}</p>
              <p className="font-display text-3xl text-white tabular-nums mt-2">{fmtN(p.unidades)}</p>
              <p className="text-[11px] text-white/45">unidades · {fmtN(p.puntos)} pts</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs de tablas */}
      <div>
        <div className="flex gap-2 mb-4 flex-wrap">
          {([
            ["productos", "Productos"],
            ["distribuidores", "Distribuidores"],
            ["sucursales", "Sucursales"],
          ] as const).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                tab === k ? "bg-usg-red text-white" : "bg-white/5 text-white/65 hover:bg-white/10"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "productos" && (
          <div className="card-glow rounded-2xl overflow-hidden">
            <div className="flex justify-end p-3 border-b border-white/10">
              <CsvButton
                onClick={() =>
                  downloadCSV(
                    "inventario-productos-usg.csv",
                    ["posicion", "producto", "sku", "unidades", "puntos", "tickets", "participantes"],
                    productos.map((p, i) => [i + 1, p.nombre, p.sku, p.unidades, p.puntos, p.tickets, p.participantes]),
                  )
                }
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-widest text-white/45 border-b border-white/10">
                    <th className="px-4 py-3 font-semibold">#</th>
                    <th className="px-4 py-3 font-semibold">Producto</th>
                    <th className="px-4 py-3 font-semibold text-right">Unidades</th>
                    <th className="px-4 py-3 font-semibold text-right">Puntos</th>
                    <th className="px-4 py-3 font-semibold text-center">Tickets</th>
                    <th className="px-4 py-3 font-semibold text-center">Participantes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {productos.map((p, i) => (
                    <tr key={p.sku} className="hover:bg-white/[0.03]">
                      <td className="px-4 py-3 text-white/40 tabular-nums">{i + 1}</td>
                      <td className="px-4 py-3 text-white">{p.nombre}</td>
                      <td className="px-4 py-3 text-right text-white tabular-nums font-semibold">{fmtN(p.unidades)}</td>
                      <td className="px-4 py-3 text-right text-white/70 tabular-nums">{fmtN(p.puntos)}</td>
                      <td className="px-4 py-3 text-center text-white/60 tabular-nums">{p.tickets}</td>
                      <td className="px-4 py-3 text-center text-white/60 tabular-nums">{p.participantes}</td>
                    </tr>
                  ))}
                  {productos.length === 0 && <EmptyRow cols={6} />}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "distribuidores" && (
          <div className="card-glow rounded-2xl overflow-hidden">
            <div className="flex justify-end p-3 border-b border-white/10">
              <CsvButton
                onClick={() =>
                  downloadCSV(
                    "ranking-distribuidores.csv",
                    ["posicion", "distribuidor", "tickets", "puntos", "compra_total_mxn", "participantes"],
                    distribuidores.map((d, i) => [i + 1, d.tienda, d.tickets, d.puntos, Math.round(d.monto), d.participantes]),
                  )
                }
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-widest text-white/45 border-b border-white/10">
                    <th className="px-4 py-3 font-semibold">#</th>
                    <th className="px-4 py-3 font-semibold">Distribuidor</th>
                    <th className="px-4 py-3 font-semibold text-center">Tickets</th>
                    <th className="px-4 py-3 font-semibold text-right">Puntos</th>
                    <th className="px-4 py-3 font-semibold text-right">Compra total</th>
                    <th className="px-4 py-3 font-semibold text-center">Participantes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {distribuidores.map((d, i) => (
                    <tr key={d.tienda + i} className="hover:bg-white/[0.03]">
                      <td className="px-4 py-3 text-white/40 tabular-nums">{i + 1}</td>
                      <td className="px-4 py-3 text-white">{d.tienda}</td>
                      <td className="px-4 py-3 text-center text-white/60 tabular-nums">{d.tickets}</td>
                      <td className="px-4 py-3 text-right text-white tabular-nums font-semibold">{fmtN(d.puntos)}</td>
                      <td className="px-4 py-3 text-right text-white/70 tabular-nums">{fmtMXN(d.monto)}</td>
                      <td className="px-4 py-3 text-center text-white/60 tabular-nums">{d.participantes}</td>
                    </tr>
                  ))}
                  {distribuidores.length === 0 && <EmptyRow cols={6} />}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "sucursales" && (
          <div className="card-glow rounded-2xl overflow-hidden">
            <div className="flex justify-end p-3 border-b border-white/10">
              <CsvButton
                onClick={() =>
                  downloadCSV(
                    "ranking-sucursales.csv",
                    ["posicion", "distribuidor", "sucursal", "tickets", "puntos", "compra_total_mxn"],
                    sucursales.map((s, i) => [i + 1, s.tienda, s.sucursal, s.tickets, s.puntos, Math.round(s.monto)]),
                  )
                }
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-widest text-white/45 border-b border-white/10">
                    <th className="px-4 py-3 font-semibold">#</th>
                    <th className="px-4 py-3 font-semibold">Distribuidor</th>
                    <th className="px-4 py-3 font-semibold">Sucursal</th>
                    <th className="px-4 py-3 font-semibold text-center">Tickets</th>
                    <th className="px-4 py-3 font-semibold text-right">Puntos</th>
                    <th className="px-4 py-3 font-semibold text-right">Compra total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {sucursales.map((s, i) => (
                    <tr key={s.tienda + s.sucursal + i} className="hover:bg-white/[0.03]">
                      <td className="px-4 py-3 text-white/40 tabular-nums">{i + 1}</td>
                      <td className="px-4 py-3 text-white/70">{s.tienda}</td>
                      <td className="px-4 py-3 text-white">{s.sucursal}</td>
                      <td className="px-4 py-3 text-center text-white/60 tabular-nums">{s.tickets}</td>
                      <td className="px-4 py-3 text-right text-white tabular-nums font-semibold">{fmtN(s.puntos)}</td>
                      <td className="px-4 py-3 text-right text-white/70 tabular-nums">{fmtMXN(s.monto)}</td>
                    </tr>
                  ))}
                  {sucursales.length === 0 && <EmptyRow cols={6} />}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyRow({ cols }: { cols: number }) {
  return (
    <tr>
      <td colSpan={cols} className="px-4 py-12 text-center text-white/40 text-sm">
        Sin datos todavía.
      </td>
    </tr>
  );
}
