/**
 * ============================================================
 * CONFIGURACIÓN GLOBAL — USG LIGA DE CAMPEONES
 * ============================================================
 *
 * 👉 IMPORTANTE: Reemplaza el número de WhatsApp cuando lo tengas.
 *    Formato internacional sin signos: 521XXXXXXXXXX
 *    (52 = México, 1 = celular, luego 10 dígitos)
 *
 *    Ejemplo: para +52 55 1234 5678 → "5215512345678"
 * ============================================================
 */

export const SITE_CONFIG = {
  // Número oficial de la promoción: 55 2972 5267
  whatsappNumber: "5215529725267",
  whatsappMessage:
    "¡Hola! Quiero registrarme en la Promo USG Liga de Campeones ⚽",
  campaignName: "USG Liga de Campeones",
  campaignDuration: "2 meses",
  brandName: "USG",
  email: "contacto@usg.com.mx", // Cambiar por correo oficial cuando lo proporcionen
};

/**
 * Construye la URL de WhatsApp con mensaje pre-llenado
 */
export const getWhatsAppUrl = (customMessage?: string): string => {
  const message = encodeURIComponent(
    customMessage || SITE_CONFIG.whatsappMessage,
  );
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${message}`;
};

/**
 * Catálogo de productos participantes — 3 niveles
 *  · BÁSICO  → 100 puntos / pieza
 *  · MEDIO   → 500 puntos / pieza
 *  · PREMIUM → 1000 puntos / pieza
 */
export const PRODUCTS_BASIC = [
  { name: "USG TABLAROCA® ULTRALIGHT", points: 100 },
  { name: "USG BASECOAT® REGULAR", points: 100 },
  { name: "USG TABLAROCA® ANTI-MOHO®", points: 100 },
];

export const PRODUCTS_MEDIUM = [
  { name: "USG REDIMIX®", points: 500 },
  { name: "USG DUROCK FORTE®", points: 500 },
  { name: "USG SECUROCK®", points: 500 },
  { name: "USG STEELROCK®", points: 500 },
];

export const PRODUCTS_PREMIUM = [
  { name: "USG BASECOAT FINO®", points: 1000 },
  { name: "USG TABLAROCA® FIRECODE®", points: 1000 },
  { name: "USG PLAFONES®", points: 1000 },
  { name: "USG DONN®", points: 1000 },
];

/**
 * Premios físicos reales (con imágenes y cantidades oficiales)
 * Ordenados de mayor a menor valor.
 */
export const PRIZES = [
  {
    name: "Motocicleta Italika FT200 GTS",
    subtitle: "De trabajo · Color gris · con GPS",
    quantity: 3,
    image: "/prizes/motocicleta-italika-ft200.jpeg",
    accent: "from-yellow-400 to-yellow-600",
    medal: "🥇",
  },
  {
    name: "Smart TV LG 65\" UHD AI 4K",
    subtitle: "Modelo 65UA7500PSA · 2025",
    quantity: 5,
    image: "/prizes/smart-tv-lg-65.jpeg",
    accent: "from-gray-200 to-gray-400",
    medal: "🥈",
  },
  {
    name: "Smart TV TCL 50\" QLED 4K",
    subtitle: "Google TV · Voice Control",
    quantity: 4,
    image: "/prizes/smart-tv-tcl-50.jpg",
    accent: "from-orange-300 to-orange-500",
    medal: "🥉",
  },
  {
    name: "Rotomartillo Bosch GSB 183-LI",
    subtitle: "Con maletín · Color azul",
    quantity: 10,
    image: "/prizes/rotomartillo-bosch.jpeg",
    accent: "from-blue-400 to-blue-600",
    medal: "🛠️",
  },
  {
    name: "Escalera Telescópica de Aluminio",
    subtitle: "16 peldaños tipo tijera · 5 m",
    quantity: 6,
    image: "/prizes/escalera-telescopica.png",
    accent: "from-slate-300 to-slate-500",
    medal: "🪜",
  },
  {
    name: "Audífonos Beats Studio3 Wireless",
    subtitle: "Over-ear · Negro mate",
    quantity: 10,
    image: "/prizes/audifonos-beats-studio3.jpg",
    accent: "from-zinc-500 to-zinc-700",
    medal: "🎧",
  },
  {
    name: "Nivel Láser Verde Autonivelante",
    subtitle: "16 líneas · Profesional",
    quantity: 10,
    image: "/prizes/nivel-laser.jpg",
    accent: "from-green-400 to-green-600",
    medal: "📏",
  },
];
