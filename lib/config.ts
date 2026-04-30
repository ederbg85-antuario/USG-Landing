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
  // Reemplazar por el número real cuando esté disponible
  whatsappNumber: "5215512345678", // PLACEHOLDER — cambiar antes de lanzar
  whatsappMessage:
    "¡Hola! Quiero registrarme en la Promo USG Liga de Campeones ⚽",
  campaignName: "USG Liga de Campeones",
  campaignDuration: "2 meses",
  totalPrize: "$500,000 MXN",
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
 * Catálogo de productos participantes
 */
export const PRODUCTS_BASIC = [
  { name: "USG TABLAROCA®", points: 100 },
  { name: "USG DUROCK FORTE®", points: 100 },
  { name: "USG REDIMIX®", points: 100 },
  { name: "USG BASECOAT® REGULAR", points: 100 },
  { name: "USG TABLAROCA® ANTI-MOHO®", points: 100 },
];

export const PRODUCTS_PREMIUM = [
  { name: "USG BASECOAT FINO®", points: 1000 },
  { name: "USG TABLAROCA® FIRECODE®", points: 1000 },
  { name: "USG SECUROCK®", points: 1000 },
  { name: "USG PLAFONES®", points: 1000 },
  { name: "USG DONN®", points: 1000 },
];

/**
 * Niveles de premio
 */
export const PRIZES = [
  {
    place: "1° Lugar",
    value: "$100,000 MXN",
    description: "En productos USG + Moto / TV / Bicicletas / Cajas de herramientas",
    accent: "from-yellow-400 to-yellow-600",
    medal: "🥇",
  },
  {
    place: "2° Lugar",
    value: "$70,000 MXN",
    description: "En productos USG + Moto / TV / Bicicletas / Cajas de herramientas",
    accent: "from-gray-300 to-gray-500",
    medal: "🥈",
  },
  {
    place: "3° Lugar",
    value: "$50,000 MXN",
    description: "En productos USG + Moto / TV / Bicicletas / Cajas de herramientas",
    accent: "from-orange-400 to-orange-700",
    medal: "🥉",
  },
];
