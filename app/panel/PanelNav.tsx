"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import UsgLogo from "@/components/UsgLogo";

const NAV = [
  { href: "/panel", label: "Resumen", icon: "📊" },
  { href: "/panel/bandeja", label: "Bandeja de entrada", icon: "💬" },
  { href: "/panel/ranking", label: "Ranking y registros", icon: "🏆" },
  { href: "/panel/analitica", label: "Analítica (GA4)", icon: "📈" },
];

export default function PanelNav({ email }: { email?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <>
      {/* Top bar móvil */}
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between bg-black/90 backdrop-blur border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="bg-white rounded px-2 py-1">
            <UsgLogo variant="dark" className="h-5 w-auto" />
          </div>
          <span className="font-display text-lg text-white tracking-wide">
            PANEL
          </span>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-white/70 text-2xl leading-none"
          aria-label="Menú"
        >
          ☰
        </button>
      </div>

      <aside
        className={`${
          open ? "block" : "hidden"
        } lg:block w-full lg:w-64 lg:flex-shrink-0 bg-black/80 backdrop-blur border-r border-white/10 lg:min-h-screen`}
      >
        <div className="hidden lg:flex items-center gap-2 px-6 py-6 border-b border-white/10">
          <div className="bg-white rounded px-2 py-1.5">
            <UsgLogo variant="dark" className="h-6 w-auto" />
          </div>
          <span className="font-display text-xl text-white tracking-wide">
            PANEL
          </span>
        </div>

        <nav className="p-3 space-y-1">
          {NAV.map((item) => {
            const active =
              item.href === "/panel"
                ? pathname === "/panel"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors ${
                  active
                    ? "bg-usg-red text-white font-semibold"
                    : "text-white/65 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 mt-auto border-t border-white/10">
          <p className="px-4 text-[11px] text-white/40 truncate mb-2">{email}</p>
          <button
            onClick={logout}
            className="w-full text-left rounded-lg px-4 py-2.5 text-sm text-white/65 hover:bg-white/5 hover:text-white transition-colors"
          >
            ↩ Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}
