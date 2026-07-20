/**
 * Helper de eventos para Meta Pixel y GA4.
 * No hace nada hasta que se configuren IDs reales en src/config/funnel.ts o
 * mediante variables de entorno VITE_META_PIXEL_ID / VITE_GA4_ID.
 *
 * Eventos soportados: ViewContent, Lead, InitiateCheckout, Purchase,
 * ViewVSL, CompleteRegistration, UpsellView, UpsellAccept.
 */

import { analyticsIds } from "@/config/funnel";

type AnalyticsEvent =
  | "ViewContent"
  | "Lead"
  | "InitiateCheckout"
  | "Purchase"
  | "ViewVSL"
  | "CompleteRegistration"
  | "UpsellView"
  | "UpsellAccept";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function getMetaId(): string {
  return (import.meta.env.VITE_META_PIXEL_ID as string | undefined) || analyticsIds.metaPixelId;
}
function getGaId(): string {
  return (import.meta.env.VITE_GA4_ID as string | undefined) || analyticsIds.ga4Id;
}

const META_STANDARD_EVENTS: ReadonlySet<AnalyticsEvent> = new Set<AnalyticsEvent>([
  "ViewContent",
  "Lead",
  "InitiateCheckout",
  "Purchase",
  "CompleteRegistration",
]);

export function track(event: AnalyticsEvent, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  // Meta Pixel
  if (getMetaId() && typeof window.fbq === "function") {
    try {
      const method = META_STANDARD_EVENTS.has(event) ? "track" : "trackCustom";
      window.fbq(method, event, params ?? {});
    } catch {
      /* noop */
    }
  }

  // GA4
  if (getGaId() && typeof window.gtag === "function") {
    try {
      window.gtag("event", event, params ?? {});
    } catch {
      /* noop */
    }
  }

  // Log en dev para verificar
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, params);
  }
}
