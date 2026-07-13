/**
 * Configuración central del embudo "Domina el Inglés Ahora".
 * TODO: reemplazar precios, URLs de Hotmart e IDs de analítica cuando estén definitivos.
 * Todos los valores aquí son provisionales y seguros de editar.
 */

export const brand = {
  name: "Domina el Inglés Ahora",
  shortName: "Domina el Inglés",
  domain: "dominaelinglesahora.lat",
  tagline:
    "Convierte el contenido que ya consumes en YouTube y TikTok en tu entrenamiento diario de inglés.",
  method: "Método INMERSIÓN 21",
  promise:
    "Un sistema práctico de 21 días para dejar de consumir inglés pasivamente y empezar a entrenar comprensión, vocabulario y expresión reales.",
} as const;

export const prices = {
  // Precio provisional visto en link-in-bio. Editar cuando se defina el final.
  ebookUSD: 11,
  currency: "USD",
} as const;

export const hotmart = {
  // URLs placeholder. Reemplazar por checkout real de Hotmart.
  ebookCheckoutURL: "https://pay.hotmart.com/PLACEHOLDER_EBOOK",
  upsellCheckoutURL: "https://pay.hotmart.com/PLACEHOLDER_UPSELL",
  downsellCheckoutURL: "https://pay.hotmart.com/PLACEHOLDER_DOWNSELL",
} as const;

export const social = {
  instagram: {
    handle: "@dominaelinglesahora",
    url: "https://instagram.com/dominaelinglesahora",
  },
  facebook: {
    handle: "@dominaelinglesahora",
    url: "https://facebook.com/dominaelinglesahora",
  },
  tiktok: {
    handle: "@dominaelinglesahora",
    url: "https://tiktok.com/@dominaelinglesahora",
  },
  youtube: {
    handle: "@dominaelinglesahora",
    url: "https://youtube.com/@dominaelinglesahora",
  },
  email: "hola@dominaelinglesahora.lat",
} as const;

export const bonuses = {
  // Activar/desactivar cada bono desde aquí. No inventar valores monetarios.
  tracker21: { enabled: true, name: "Tracker imprimible de 21 días" },
  contentPicker: {
    enabled: true,
    name: "Guía para elegir contenido según tu nivel",
  },
  promptsBank: {
    enabled: true,
    name: "Banco inicial de prompts de práctica",
  },
} as const;

/**
 * Order bumps del checkout-preview. Los precios se ocultan mientras sea null.
 * Los bumps reales se configuran dentro de Hotmart; esto es solo simulación visual.
 */
export const orderBumps = [
  {
    id: "workbook",
    name: "Workbook imprimible de 21 días",
    description:
      "Cuaderno de trabajo para capturar frases, medir minutos y registrar tu progreso día por día.",
    priceUSD: null as number | null,
    enabled: true,
  },
  {
    id: "vocab-pack",
    name: "Pack de vocabulario por intereses",
    description:
      "Listas temáticas (viajes, trabajo, entretenimiento, tecnología) con ejemplos reales.",
    priceUSD: null as number | null,
    enabled: true,
  },
  {
    id: "shadowing-audios",
    name: "Audios de repetición y shadowing",
    description:
      "Pistas cortas para entrenar pronunciación imitando el ritmo natural del inglés hablado.",
    priceUSD: null as number | null,
    enabled: true,
  },
] as const;

/**
 * Horarios base de la clase evergreen. Contador honesto = próxima ocurrencia real.
 * No usar escasez falsa (cupos limitados inventados).
 */
export const evergreenSchedule = {
  // Hora local de México (America/Mexico_City).
  timesLocal: ["10:00", "16:00", "20:00"] as const,
  timezone: "America/Mexico_City",
  durationMinutes: 45,
};

export const analyticsIds = {
  // Reemplazar cuando se cuenten con IDs reales. No inventar.
  metaPixelId: "" as string, // e.g. "1234567890"
  ga4Id: "" as string, // e.g. "G-XXXXXXX"
};

export const abTest = {
  // Query param ?variant=b para probar hero alternativo.
  heroVariantParam: "variant",
};

export const legal = {
  companyName: "Domina el Inglés Ahora",
  lastUpdated: "2026-07-13",
};
