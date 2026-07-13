/**
 * Adaptador de captura de leads.
 *
 * Actualmente NO envía a ningún backend real. Guarda localmente y expone una
 * interfaz clara para conectar Brevo, MailerLite, ConvertKit o Make/Zapier.
 *
 * Cómo conectar (ejemplo Brevo):
 *   1. Crear una lista y obtener API key.
 *   2. Implementar `submitLead` con un fetch a
 *      https://api.brevo.com/v3/contacts con headers { 'api-key': ... }.
 *   3. Mover la key a variable de entorno VITE_BREVO_API_KEY o preferentemente
 *      a una server function para no exponerla al cliente.
 */

export type LeadPayload = {
  name: string;
  email: string;
  source: string; // ej: "leadmagnet", "evergreen", "reto-21"
  meta?: Record<string, string | number | boolean | null>;
};

const STORAGE_KEY = "dea_leads_pending";

export async function submitLead(payload: LeadPayload): Promise<{ ok: true }> {
  if (typeof window !== "undefined") {
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      existing.push({ ...payload, at: new Date().toISOString() });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    } catch {
      /* noop */
    }
  }
  // Simular latencia
  await new Promise((r) => setTimeout(r, 400));
  return { ok: true };
}

export function getPendingLeads(): unknown[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}
