/**
 * Meta Pixel loader — SSR-safe.
 *
 * Se inicializa una sola vez en el navegador. Idempotente ante re-montajes
 * y navegaciones cliente-side. Dispara PageView tras `init`.
 */

import { analyticsIds } from "@/config/funnel";

declare global {
  interface Window {
    _fbq?: unknown;
    __metaPixelInitialized?: boolean;
  }
}

function getPixelId(): string {
  return (
    (import.meta.env.VITE_META_PIXEL_ID as string | undefined) ||
    analyticsIds.metaPixelId ||
    ""
  );
}

export function initMetaPixel(): void {
  if (typeof window === "undefined") return;
  const pixelId = getPixelId();
  if (!pixelId) return;
  if (window.__metaPixelInitialized) return;

  // Stub oficial de Meta (adaptado para TS).
  if (!window.fbq) {
    const n: ((...args: unknown[]) => void) & Record<string, unknown> = function (
      ...args: unknown[]
    ) {
      const self = n as unknown as { callMethod?: (...a: unknown[]) => void; queue: unknown[] };
      if (self.callMethod) self.callMethod.apply(n, args);
      else self.queue.push(args);
    } as ((...args: unknown[]) => void) & Record<string, unknown>;
    n.queue = [];
    n.loaded = true;
    n.version = "2.0";
    n.push = n;
    window.fbq = n;
    window._fbq = n;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    const first = document.getElementsByTagName("script")[0];
    first?.parentNode?.insertBefore(script, first);
  }

  window.fbq!("init", pixelId);
  window.fbq!("track", "PageView");
  window.__metaPixelInitialized = true;
}

export function trackPageView(): void {
  if (typeof window === "undefined") return;
  if (!window.__metaPixelInitialized) return;
  window.fbq?.("track", "PageView");
}
