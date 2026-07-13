import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { SiteLayout } from "@/components/site/Layout";
import { Section, Eyebrow } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Loader2, Sparkles } from "lucide-react";
import { submitLead } from "@/lib/lead-adapter";
import { track } from "@/lib/analytics";

export const Route = createFileRoute("/reto-21-dias")({
  head: () => ({
    meta: [
      { title: "Reto INMERSIÓN 21 — Próximamente" },
      { name: "description", content: "Un programa guiado de 21 días para entrenar inglés con YouTube y TikTok. Únete a la lista de espera." },
      { property: "og:title", content: "Reto INMERSIÓN 21 — Próximamente" },
      { property: "og:description", content: "Programa guiado de 21 días. Lista de espera abierta." },
      { property: "og:url", content: "/reto-21-dias" },
    ],
    links: [{ rel: "canonical", href: "/reto-21-dias" }],
  }),
  component: RetoPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre").max(80),
  email: z.string().trim().email("Correo inválido").max(255),
});

function RetoPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse({ name, email });
    if (!parsed.success) {
      const e2: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (e2[i.path[0] as string] = i.message));
      setErrors(e2);
      return;
    }
    setErrors({});
    setLoading(true);
    await submitLead({ name, email, source: "reto-21-waitlist" });
    track("Lead", { source: "reto-21-waitlist" });
    setLoading(false);
    setDone(true);
  }

  return (
    <SiteLayout pageName="reto-21" mobileCta={false}>
      <div className="bg-gradient-hero text-white">
        <Section>
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <Eyebrow>
                <Sparkles className="h-3.5 w-3.5" /> Próximamente
              </Eyebrow>
              <h1 className="mt-4 text-3xl font-extrabold md:text-5xl">
                Reto INMERSIÓN 21 — 21 días acompañados
              </h1>
              <p className="mt-4 text-white/85">
                Un programa guiado con retos diarios, checkpoints semanales y comunidad para completar tu primer ciclo del método sin abandonar.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {[
                  "Un reto claro cada día durante 21 días.",
                  "Recordatorios y estructura para no perder la racha.",
                  "Sesiones de puesta en común para resolver dudas.",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <Check className="h-4 w-4 text-highlight" />
                    <span className="text-white/85">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-6 text-foreground shadow-elegant">
              {done ? (
                <div className="py-6 text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-teal/20 text-teal">
                    <Check className="h-6 w-6" />
                  </div>
                  <h2 className="mt-4 text-xl font-bold">¡Estás en la lista!</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Te avisaremos por email cuando abramos el próximo cupo.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  <h2 className="text-xl font-bold">Lista de espera</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Sé de los primeros en enterarte cuando abramos inscripciones.
                  </p>
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
                    <Button type="submit" disabled={loading} className="w-full bg-electric text-electric-foreground hover:opacity-90">
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Unirme a la lista
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
