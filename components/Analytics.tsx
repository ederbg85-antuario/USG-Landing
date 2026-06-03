"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { SUPABASE_URL } from "@/lib/supabase/config";

const ENDPOINT = `${SUPABASE_URL}/functions/v1/track`;

// IDs anónimos (sin PII). visitor_id persiste entre sesiones; session_id por pestaña.
function uid() {
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2, 10)
  );
}
function getVisitorId(): string {
  try {
    let v = localStorage.getItem("usg_vid");
    if (!v) {
      v = uid();
      localStorage.setItem("usg_vid", v);
    }
    return v;
  } catch {
    return "anon";
  }
}
function getSessionId(): string {
  try {
    let s = sessionStorage.getItem("usg_sid");
    if (!s) {
      s = uid();
      sessionStorage.setItem("usg_sid", s);
    }
    return s;
  } catch {
    return "anon";
  }
}

function getDevice(): "mobile" | "tablet" | "desktop" {
  const ua = navigator.userAgent || "";
  if (/iPad|Tablet/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua))) return "tablet";
  if (/Mobi|Android|iPhone|iPod/i.test(ua)) return "mobile";
  return "desktop";
}

function getUtm() {
  try {
    const p = new URLSearchParams(window.location.search);
    return {
      utm_source: p.get("utm_source") || undefined,
      utm_medium: p.get("utm_medium") || undefined,
      utm_campaign: p.get("utm_campaign") || undefined,
    };
  } catch {
    return {};
  }
}

function referrerHost(): string | undefined {
  try {
    if (!document.referrer) return undefined;
    const h = new URL(document.referrer).hostname;
    if (h === window.location.hostname) return undefined; // navegación interna
    return h;
  } catch {
    return undefined;
  }
}

function send(event: Record<string, unknown>) {
  const payload = JSON.stringify({
    events: [
      {
        visitor_id: getVisitorId(),
        session_id: getSessionId(),
        device: getDevice(),
        ...event,
      },
    ],
  });
  try {
    // text/plain → sendBeacon cross-origin sin preflight.
    const blob = new Blob([payload], { type: "text/plain;charset=UTF-8" });
    if (navigator.sendBeacon && navigator.sendBeacon(ENDPOINT, blob)) return;
  } catch {
    /* fallback abajo */
  }
  fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "text/plain;charset=UTF-8" },
    body: payload,
    keepalive: true,
  }).catch(() => {});
}

function elementLabel(el: HTMLElement): string {
  const dt = el.getAttribute("data-track");
  if (dt) return dt;
  const aria = el.getAttribute("aria-label");
  if (aria) return aria.trim().slice(0, 80);
  const txt = (el.textContent || "").replace(/\s+/g, " ").trim();
  if (txt) return txt.slice(0, 80);
  const href = el.getAttribute("href");
  if (href) return href.slice(0, 120);
  return el.tagName.toLowerCase();
}

const isTracked = (path: string) => !path.startsWith("/panel") && !path.startsWith("/login");
const isLocal = () =>
  typeof window !== "undefined" &&
  /^(localhost|127\.0\.0\.1|0\.0\.0\.0)$/.test(window.location.hostname);

export default function Analytics() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  // Pageview en carga inicial y en cada cambio de ruta.
  useEffect(() => {
    if (isLocal() || !isTracked(pathname)) return;
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    send({
      event_type: "pageview",
      path: pathname,
      referrer: document.referrer || undefined,
      referrer_host: referrerHost(),
      ...getUtm(),
    });
  }, [pathname]);

  // Clics en enlaces, botones o elementos con [data-track].
  useEffect(() => {
    if (isLocal()) return;
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest("a,button,[data-track]") as HTMLElement | null;
      if (!el) return;
      const path = window.location.pathname;
      if (!isTracked(path)) return;
      send({ event_type: "click", path, element: elementLabel(el) });
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
