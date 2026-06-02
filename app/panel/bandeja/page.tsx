"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Conv = {
  id: string;
  name: string;
  phone: string;
  last: string;
  unread: number;
  ts: string;
};
type Msg = {
  id: number;
  content: string;
  outgoing: boolean;
  ts: string;
  attachments: { url: string; type: string }[];
};

function hora(ts: string) {
  if (!ts) return "";
  const d = new Date(ts);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });
}
function inicial(name: string) {
  return (name || "?").trim().charAt(0).toUpperCase();
}

export default function BandejaPage() {
  const [convs, setConvs] = useState<Conv[]>([]);
  const [sel, setSel] = useState<Conv | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [error, setError] = useState<string>("");
  const [loadingConvs, setLoadingConvs] = useState(true);
  const [loadingMsgs, setLoadingMsgs] = useState(false);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [sendNote, setSendNote] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const loadConvs = useCallback(async () => {
    try {
      const r = await fetch("/api/panel/chatwoot?action=conversations");
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || `HTTP ${r.status}`);
      setConvs(d.conversations || []);
      setError("");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoadingConvs(false);
    }
  }, []);

  const loadMsgs = useCallback(async (id: string, silent = false) => {
    if (!silent) setLoadingMsgs(true);
    try {
      const r = await fetch(
        `/api/panel/chatwoot?action=messages&id=${encodeURIComponent(id)}`,
      );
      const d = await r.json();
      if (r.ok) setMsgs(d.messages || []);
    } finally {
      if (!silent) setLoadingMsgs(false);
    }
  }, []);

  useEffect(() => {
    loadConvs();
    const t = setInterval(loadConvs, 15000);
    return () => clearInterval(t);
  }, [loadConvs]);

  useEffect(() => {
    if (!sel) return;
    setSendNote("");
    loadMsgs(sel.id);
    const t = setInterval(() => loadMsgs(sel.id, true), 8000);
    return () => clearInterval(t);
  }, [sel, loadMsgs]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  async function enviar() {
    if (!sel || !reply.trim() || sending) return;
    setSending(true);
    setSendNote("");
    const text = reply.trim();
    setReply("");
    try {
      const r = await fetch(
        `/api/panel/chatwoot?action=send&id=${encodeURIComponent(sel.id)}`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ content: text }),
        },
      );
      const d = await r.json().catch(() => ({}));
      if (r.ok) {
        await loadMsgs(sel.id, true);
      } else {
        setReply(text);
        setSendNote(d.error || "No se pudo enviar.");
      }
    } catch {
      setReply(text);
      setSendNote("No se pudo enviar.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-display text-4xl sm:text-5xl text-white tracking-wide">
          BANDEJA DE ENTRADA
        </h1>
        <p className="text-sm text-white/55 mt-1">
          Conversaciones de WhatsApp de hoy.
        </p>
      </div>

      {error && (
        <div className="card-glow rounded-2xl p-5 border-red-500/30 mb-4 max-w-2xl">
          <p className="font-bold text-white mb-1">No se pudieron cargar</p>
          <p className="text-sm text-white/65 break-all">{error}</p>
        </div>
      )}

      <div className="card-glow rounded-2xl overflow-hidden h-[72vh] flex">
        {/* Lista de conversaciones — estilo USG */}
        <div
          className={`${
            sel ? "hidden md:flex" : "flex"
          } w-full md:w-80 flex-shrink-0 flex-col border-r border-white/10 bg-black/40`}
        >
          <div className="px-4 py-3 border-b border-white/10 text-xs uppercase tracking-widest text-white/45">
            {loadingConvs ? "Cargando…" : `${convs.length} conversaciones · hoy`}
          </div>
          <div className="flex-1 overflow-y-auto">
            {convs.map((c) => (
              <button
                key={c.id}
                onClick={() => setSel(c)}
                className={`w-full text-left flex items-center gap-3 px-3 py-3 border-b border-white/5 transition-colors ${
                  sel?.id === c.id ? "bg-usg-red/15" : "hover:bg-white/5"
                }`}
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-usg-red/30 border border-usg-red/40 flex items-center justify-center text-white font-bold">
                  {inicial(c.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-white text-sm font-medium truncate">
                      {c.name}
                    </p>
                    <span className="text-[10px] text-white/35 flex-shrink-0">
                      {hora(c.ts)}
                    </span>
                  </div>
                  <p className="text-white/45 text-xs truncate">
                    {c.last || c.phone}
                  </p>
                </div>
              </button>
            ))}
            {!loadingConvs && convs.length === 0 && !error && (
              <p className="text-center text-white/35 text-sm p-8">
                No hay conversaciones hoy.
              </p>
            )}
          </div>
        </div>

        {/* Chat — estilo iPhone WhatsApp */}
        <div
          className={`${
            sel ? "flex" : "hidden md:flex"
          } flex-1 flex-col min-w-0`}
        >
          {!sel ? (
            <div className="flex-1 flex items-center justify-center text-white/35 text-sm bg-black/20">
              Selecciona una conversación
            </div>
          ) : (
            <>
              {/* Header del chat (claro, tipo WhatsApp iPhone) */}
              <div className="flex items-center gap-3 px-4 py-2.5 bg-[#f6f6f6] border-b border-black/10">
                <button
                  onClick={() => setSel(null)}
                  className="md:hidden text-[#007aff] text-2xl leading-none"
                  aria-label="Atrás"
                >
                  ‹
                </button>
                <div className="w-9 h-9 rounded-full bg-[#25d366]/20 flex items-center justify-center text-[#075e54] font-bold">
                  {inicial(sel.name)}
                </div>
                <div className="min-w-0">
                  <p className="text-[#111] text-sm font-semibold truncate leading-tight">
                    {sel.name}
                  </p>
                  <p className="text-[#667781] text-xs truncate">{sel.phone}</p>
                </div>
              </div>

              {/* Mensajes */}
              <div className="wa-chat-bg flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
                {loadingMsgs && msgs.length === 0 && (
                  <p className="text-center text-[#667781] text-xs py-6">
                    Cargando mensajes…
                  </p>
                )}
                {msgs.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.outgoing ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`wa-bubble max-w-[78%] px-2.5 py-1.5 ${
                        m.outgoing ? "wa-bubble-out" : "wa-bubble-in"
                      }`}
                    >
                      {m.attachments?.map((a, i) =>
                        a.type === "image" ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <a key={i} href={a.url} target="_blank" rel="noreferrer">
                            <img
                              src={a.url}
                              alt="adjunto"
                              className="rounded-md mb-1 max-h-60 object-cover"
                            />
                          </a>
                        ) : (
                          <a
                            key={i}
                            href={a.url}
                            target="_blank"
                            rel="noreferrer"
                            className="block text-xs text-[#027eb5] underline mb-1"
                          >
                            📎 Ver adjunto
                          </a>
                        ),
                      )}
                      {m.content && (
                        <p className="text-[#111b21] text-sm whitespace-pre-wrap break-words">
                          {m.content}
                        </p>
                      )}
                      <p className="text-[10px] text-[#667781] text-right mt-0.5 leading-none">
                        {hora(m.ts)}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={endRef} />
              </div>

              {/* Caja de respuesta */}
              <div className="bg-[#f0f0f0] border-t border-black/10">
                {sendNote && (
                  <p className="px-4 pt-2 text-[11px] text-[#b00020]">{sendNote}</p>
                )}
                <div className="flex items-center gap-2 px-3 py-2.5">
                  <input
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && enviar()}
                    placeholder="Escribe un mensaje…"
                    className="flex-1 rounded-full bg-white border border-black/10 px-4 py-2 text-sm text-[#111] placeholder-[#8696a0] focus:outline-none"
                  />
                  <button
                    onClick={enviar}
                    disabled={sending || !reply.trim()}
                    className="flex-shrink-0 w-10 h-10 rounded-full bg-[#25d366] disabled:opacity-40 text-white flex items-center justify-center text-lg"
                    aria-label="Enviar"
                  >
                    ➤
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
