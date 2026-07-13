import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { Section, Eyebrow } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { hotmart } from "@/config/funnel";
import { withUTMs } from "@/lib/utm";
import { track } from "@/lib/analytics";

export const Route = createFileRoute("/downsell")({
  head: () => ({
    meta: [
      { title: "Kit de implementación 21 días — Alternativa" },
      { name: "description", content: "Alternativa reducida al reto guiado: kit de implementación para 21 días de práctica." },
      { name: "robots", content: "noindex" },
      { property: "og:url", content: "/downsell" },
    ],
    links: [{ rel: "canonical", href: "/downsell" }],
  }),
  component: Downsell,
});

function Downsell() {
  const [url, setUrl] = useState(hotmart.downsellCheckoutURL);
  useEffect(() => {
    setUrl(withUTMs(hotmart.downsellCheckoutURL));
  }, []);

  return (
    <SiteLayout pageName="downsell" mobileCta={false} hideNav>
      <Section className="max-w-3xl">
        <Eyebrow>Alternativa</Eyebrow>
        <h1 className="mt-4 text-3xl font-extrabold md:text-5xl">
          Kit de implementación 21 días
        </h1>
        <p className="mt-4 text-muted-foreground">
          Si el reto guiado no encaja hoy, este kit te da las herramientas prácticas sin acompañamiento.
          Menor alcance que el reto, más simple de aplicar por tu cuenta.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-lg font-semibold">Reto guiado</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>✓ Reto diario</li>
              <li>✓ Recordatorios</li>
              <li>✓ Checkpoints</li>
              <li>✓ Acompañamiento</li>
            </ul>
          </div>
          <div className="rounded-2xl border-2 border-electric bg-card p-6 shadow-elegant">
            <h2 className="text-lg font-semibold">Kit de implementación</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                "Plantillas imprimibles.",
                "Checklist diario.",
                "Guía de errores comunes.",
                "Sin acompañamiento en vivo.",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild size="lg"
            className="w-full bg-electric text-electric-foreground hover:opacity-90 sm:w-auto"
            onClick={() => track("InitiateCheckout", { product: "kit-implementacion" })}
          >
            <a href={url} rel="noopener">
              Agregar el kit
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
            <Link to="/">No, gracias</Link>
          </Button>
        </div>
      </Section>
    </SiteLayout>
  );
}
