/**
 * Configuración central — Domina el Inglés Ahora / Método YouTalk 21.
 *
 * PARA REEMPLAZAR LAS URLS DE HOTMART:
 *   Edita únicamente las tres constantes de `checkout` a continuación.
 *   Todo el sitio consume estos valores desde este archivo.
 */

export const brand = {
  name: "Domina el Inglés Ahora",
  shortName: "Domina el Inglés",
  domain: "dominaelinglesahora.lat",
  product: "Método YouTalk 21",
  author: "Israel Ponce",
  tagline:
    "Convierte el contenido que ya consumes en una rutina práctica de inglés durante 21 días.",
  community: "más de 6,500",
} as const;

export const prices = {
  mainUSD: 17,
  upsellUSD: 27,
  orderBumpUSD: 7,
  stackReferenceUSD: 97,
  currency: "USD",
} as const;

/**
 * ✳️ SUSTITUYE AQUÍ LAS URLS DE HOTMART CUANDO ESTÉN LISTAS.
 * Todos los CTA del sitio consumen exclusivamente estas constantes.
 */
export const checkout = {
  HOTMART_MAIN_URL: "https://pay.hotmart.com/Q100176724J?checkoutMode=10",
  HOTMART_UPSELL_URL: "#checkout-upsell-pendiente",
  SUPPORT_URL: "mailto:soporte@dominaelinglesahora.lat",
} as const;

export const social = {
  instagram: { handle: "@dominaelinglesahora", url: "https://instagram.com/dominaelinglesahora" },
  facebook: { handle: "@dominaelinglesahora", url: "https://facebook.com/dominaelinglesahora" },
  email: "soporte@dominaelinglesahora.lat",
} as const;

export const analyticsIds = {
  metaPixelId: "" as string,
  ga4Id: "" as string,
};

export const legal = {
  companyName: "Domina el Inglés Ahora",
  lastUpdated: "2026-07-16",
};
