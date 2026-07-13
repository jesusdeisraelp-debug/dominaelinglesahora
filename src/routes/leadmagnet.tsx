import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { SiteLayout } from "@/components/site/Layout";
import { Section, Eyebrow } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { submitLead } from "@/lib/lead-adapter";
import { track } from "@/lib/analytics";
import { Check, Loader2 } from "lucide-react";

export const Route = createFileRoute("/leadmagnet")({
  head: () => ({
    meta: [
      { title: "Plan gratis de 7 días — Domina el Inglés Ahora" },
      {
        name: "description",
        content:
          "Recibe por email el plan de 7 días para dejar de ver inglés pasivamente y empezar a entrenarlo con YouTube y TikTok.",
      },
      { property: "og:title", content: "Plan gratis de 7 días" },
      { property: "og:description", content: "Guía por email para reactivar tu práctica de inglés." },
      { property: "og:url", content: "/leadmagnet" },
    ],
    links: [{ rel: "canonical", href: "/leadmagnet" }],
  }),
  component: LeadMagnet,
});

const schema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre").max(80),
  email: z.string().trim().email("Correo inválido").max(255),
  consent: z.literal(true, { errorMap: () => ({ message: "Debes aceptar recibir el plan por email" }) }),
});

function LeadMagnet() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse({ name, email, consent });
    if (!parsed.success) {
      const e2: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (e2[i.path[0] as string] = i.message));
      setErrors(e2);
      return;
    }
    setErrors({});
    setLoading(true);
    await submitLead({ name, email, source: "leadmagnet" });
    track("Lead", { source: "leadmagnet" });
    setLoading(false);
    navigate({ to: "/gracias-recurso" });
  }

  return (
    <SiteLayout pageName="leadmagnet" mobileCta={false}>
      <div className="bg-gradient-hero text-white">
        <Section>
          <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:items-center">
            <div>
              <Eyebrow>Recurso gratuito</Eyebrow>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
                Plan de 7 días para dejar de ver inglés <span className="text-highlight">pasivamente</span>.
              </h1>
              <p className="mt-4 text-white/85">
                Recibe por email una guía corta con pasos concretos para reactivar tu práctica sin cursos nuevos ni horarios imposibles.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {[
                  "Qué hacer cada día durante 7 días.",
                  "Cómo elegir 1 video útil sin perder 20 minutos decidiendo.",
                  "El truco de captura de frases que multiplica lo que retienes.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-highlight" />
                    <span className="text-white/85">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <form
              onSubmit={onSubmit}
              className="rounded-2xl bg-white p-6 text-foreground shadow-elegant"
              noValidate
            >
              <h2 className="text-xl font-bold">Envíame el plan</h2>
              <p className="mt-1 text-sm text-muted-foreground">Es gratis. Puedes cancelar cuando quieras.</p>

              <div className="mt-5 space-y-4">
                <div>
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name" value={name} onChange={(e) => setName(e.target.value)}
                    autoComplete="given-name" placeholder="Tu nombre"
                    aria-invalid={!!errors.name}
                    className="mt-1"
                  />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email" placeholder="tucorreo@ejemplo.com"
                    aria-invalid={!!errors.email}
                    className="mt-1"
                  />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                </div>
                <div className="flex items-start gap-2">
                  <Checkbox id="consent" checked={consent} onCheckedChange={(v) => setConsent(v === true)} className="mt-0.5" />
                  <Label htmlFor="consent" className="text-xs font-normal leading-relaxed text-muted-foreground">
                    Acepto recibir el plan y comunicaciones ocasionales de Domina el Inglés Ahora.
                    Puedes darte de baja cuando quieras. Ver <a href="/privacidad" className="underline">privacidad</a>.
                  </Label>
                </div>
                {errors.consent && <p className="text-xs text-destructive">{errors.consent}</p>}

                <Button type="submit" disabled={loading} className="w-full bg-electric text-electric-foreground hover:opacity-90">
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Envíame el plan de 7 días
                </Button>
              </div>
            </form>
          </div>
        </Section>
      </div>
    </SiteLayout>
  );
}
