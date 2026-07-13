/**
 * Preserva parámetros UTM y variantes A/B a través de la navegación
 * y los agrega automáticamente a las URLs de checkout externas.
 */

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "variant",
] as const;

const STORAGE_KEY = "dea_utms";

export function captureUTMs() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const collected: Record<string, string> = {};
  UTM_KEYS.forEach((k) => {
    const v = params.get(k);
    if (v) collected[k] = v;
  });
  if (Object.keys(collected).length) {
    try {
      const existing = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}");
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...existing, ...collected }));
    } catch {
      /* noop */
    }
  }
}

export function getStoredUTMs(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function withUTMs(url: string): string {
  const utms = getStoredUTMs();
  if (!Object.keys(utms).length) return url;
  try {
    const u = new URL(url);
    Object.entries(utms).forEach(([k, v]) => {
      if (!u.searchParams.has(k)) u.searchParams.set(k, v);
    });
    return u.toString();
  } catch {
    return url;
  }
}
