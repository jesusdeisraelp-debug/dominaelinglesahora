import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { SiteLayout } from "@/components/site/Layout";
import { Section, Eyebrow } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, Clock, Loader2 } from "lucide-react";
import { submitLead } from "@/lib/lead-adapter";
import { evergreenSchedule } from "@/config/funnel";
import { track } from "@/lib/analytics";

export const Route = createFileRoute("/evergreen")({
  head: () => ({
    meta: [
      { title: "Clase gratis — 30 min de YouTube o TikTok en sesión de inglés" },
      { name: "description", content: "Regístrate a la clase evergreen: cómo convertir 30 minutos de YouTube o TikTok en una sesión real de inglés." },
      { property: "og:title", content: "Clase gratis — Método INMERSIÓN 21" },
      { property: "og:description", content: "Regístrate a la clase evergreen." },
      { property: "og:url", content: "/evergreen" },
    ],
    links: [{ rel: "canonical", href: "/evergreen" }],
  }),
  component: Evergreen,
});

const schema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre").max(80),
  email: z.string().trim().email("Correo inválido").max(255),
  slot: z.string().min(1, "Elige un horario"),
});

/**
 * Contador honesto: calcula el próximo slot real (hoy o mañana),
 * asumiendo horarios en hora local del navegador. Sin cupos falsos.
 */
function useNextSlot(times: readonly string[]) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const next = useMemo(() => {
    for (const t of times) {
      const [h, m] = t.split(":").map(Number);
      const d = new Date(now);
      d.setHours(h, m, 0, 0);
      if (d.getTime() > now.getTime()) return d;
    }
    const [h, m] = times[0].split(":").map(Number);
    const d = new Date(now);
    d.setDate(d.getDate() + 1);
    d.setHours(h, m, 0, 0);
    return d;
  }, [now, times]);

  const diff = Math.max(0, next.getTime() - now.getTime());
  const hh = Math.floor(diff / 3_600_000);
  const mm = Math.floor((diff % 3_600_000) / 60_000);
  const ss = Math.floor((diff % 60_000) / 1000);
  return { next, hh, mm, ss };
}

function Evergreen() {
  const { next, hh, mm, ss } = useNextSlot(evergreenSchedule.timesLocal);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [slot, setSlot] = useState<string>(evergreenSchedule.timesLocal[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse({ name, email, slot });
    if (!parsed.success) {
      const e2: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (e2[i.path[0] as string] = i.message));
      setErrors(e2);
      return;
    }
    setErrors({});
    setLoading(true);
    await submitLead({ name, email, source: "evergreen", meta: { slot } });
    track("CompleteRegistration", { source: "evergreen", slot });
    setLoading(false);
    setDone(true);
  }

  return (
    <SiteLayout pageName="evergreen" mobileCta={false}>
      <div className="bg-gradient-hero text-white">
        <Section>
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <Eyebrow>Clase gratuita</Eyebrow>
              <h1 className="mt-4 text-3xl font-extrabold md:text-5xl">
                Cómo convertir 30 minutos de YouTube o TikTok en una <span className="text-highlight">sesión real de inglés</span>.
              </h1>
              <p className="mt-4 text-white/85">
                Sesión de {evergreenSchedule.durationMinutes} minutos con el método completo, ejemplos reales y espacio para preguntas.
              </p>

              <div className="mt-6 inline-flex items-center gap-3 rounded-xl bg-white/10 p-4 backdrop-blur">
                <Clock className="h-5 w-5 text-highlight" />
                <div>
                  <div className="text-xs uppercase tracking-wide text-white/70">Próxima sesión inicia en</div>
                  <div className="text-2xl font-bold tabular-nums">
                    {String(hh).padStart(2, "0")}:{String(mm).padStart(2, "0")}:{String(ss).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-white/60">
                    {next.toLocaleString("es-MX", { weekday: "long", hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 text-foreground shadow-elegant">
              {done ? (
                <div className="py-6 text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-teal/20 text-teal">
                    <Check className="h-6 w-6" />
                  </div>
                  <h2 className="mt-4 text-xl font-bold">¡Registro confirmado!</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Te enviaremos el enlace de acceso por email antes de la sesión de las {slot}.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  <h2 className="text-xl font-bold">Reserva tu lugar</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Elige el horario que mejor te acomode.</p>
                  <div className="mt-5 space-y-4">
                    <div>
                      <Label htmlFor="name">Nombre</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
                      {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">Correo</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
                      {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                    </div>
                    <div>
                      <Label>Horario</Label>
                      <RadioGroup value={slot} onValueChange={setSlot} className="mt-2 grid grid-cols-3 gap-2">
                        {evergreenSchedule.timesLocal.map((t) => (
                          <label key={t} className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-border p-2 text-sm hover:bg-muted has-[[data-state=checked]]:border-electric has-[[data-state=checked]]:bg-electric/10">
                            <RadioGroupItem value={t} className="sr-only" />
                            {t}
                          </label>
                        ))}
                      </RadioGroup>
                    </div>
                    <Button type="submit" disabled={loading} className="w-full bg-electric text-electric-foreground hover:opacity-90">
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Confirmar mi lugar
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </Section>
      </div>
    </SiteLayout>
  );
}
