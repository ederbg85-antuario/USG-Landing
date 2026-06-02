"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import UsgLogo from "@/components/UsgLogo";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);
    if (error) {
      setError("Correo o contraseña incorrectos.");
      return;
    }
    router.push("/panel");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-white inline-flex items-center justify-center rounded-xl px-5 py-3 mb-5 shadow-lg ring-1 ring-black/5">
            <UsgLogo variant="dark" className="h-10 w-auto" />
          </div>
          <h1 className="font-display text-4xl text-white tracking-wide">
            PANEL DE CONTROL
          </h1>
          <p className="text-sm text-white/55 mt-1">
            Liga de Campeones · Acceso para administradores
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="card-glow rounded-2xl p-6 sm:p-8 space-y-5"
        >
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
              Correo
            </label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-usg-red transition-colors"
              placeholder="tucorreo@dominio.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-usg-red transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2.5">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-usg-red hover:bg-usg-red-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold uppercase tracking-widest text-sm py-3.5 transition-colors"
          >
            {loading ? "Entrando…" : "Iniciar sesión"}
          </button>

          <p className="text-center text-xs text-white/40 pt-1">
            El acceso es solo por invitación. ¿Necesitas una cuenta? Solicítala
            al administrador.
          </p>
        </form>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-white/50 hover:text-usg-red transition-colors"
          >
            ← Volver a la página principal
          </Link>
        </div>
      </div>
    </main>
  );
}
