import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { Section, Eyebrow } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";
import { hotmart, prices, brand } from "@/config/funnel";
import { withUTMs } from "@/lib/utm";
import { track } from "@/lib/analytics";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

/**
 * Guion VSL editable (no visible como bloque técnico).
 * Actualízalo aquí; el copy visible se deriva de estos campos.
 */
const vslScript = {
  hook: "Si has estudiado inglés varias veces y sigues sin ser constante, no necesitas otra clase.",
  bigIdea:
    "Ya consumes horas de contenido en inglés en YouTube y TikTok. El problema es que consumes en modo pasivo.",
  mechanism:
    `El ${brand.method} convierte esos minutos en entrenamiento real con 5 pasos: observar, capturar, repetir, aplicar y medir.`,
  offer:
    `Acceso al ebook completo por $${prices.ebookUSD} ${prices.currency}, con los bonos incluidos.`,
  faq: [
    { q: "¿En cuánto tiempo veré resultados?", a: "El método propone 21 días de práctica diaria. La constancia manda; no es magia." },
    { q: "¿Y si mi nivel es bajo?", a: "Sirve si ya entiendes algo. Si estás desde cero, primero conviene un curso base." },
    { q: "¿Cómo lo recibo?", a: "Pago en Hotmart, acceso inmediato por email." },
  ],
};

export const Route = createFileRoute("/vsl")({
  head: () => ({
    meta: [
      { title: "Cómo funciona el Método INMERSIÓN 21 — Video" },
      { name: "description", content: "Video corto que explica cómo convertir YouTube y TikTok en tu entrenamiento diario de inglés." },
      { property: "og:title", content: "Método INMERSIÓN 21 — Video" },
      { property: "og:description", content: "El sistema práctico para volver a entrenar inglés en 21 días." },
      { property: "og:url", content: "/vsl" },
    ],
    links: [{ rel: "canonical", href: "/vsl" }],
  }),
  component: VSLPage,
});

function VSLPage() {
  const [checkout, setCheckout] = useState<string>(hotmart.ebookCheckoutURL);
  useEffect(() => {
    setCheckout(withUTMs(hotmart.ebookCheckoutURL));
    track("ViewVSL");
  }, []);

  return (
    <SiteLayout pageName="vsl" mobileCta={{ to: "/ebook-sale", label: "Comprar ebook" }}>
      <Section className="max-w-4xl">
        <div className="text-center">
          <Eyebrow>Video · 6 minutos</Eyebrow>
          <h1 className="mt-4 text-3xl font-extrabold md:text-5xl">{vslScript.hook}</h1>
        </div>

        {/* Player placeholder 16:9 */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-night shadow-elegant">
          <div className="relative aspect-video">
            <div className="absolute inset-0 grid-dots opacity-30" aria-hidden />
            <div className="absolute inset-0 grid place-items-center">
              <button
                type="button"
                className="grid h-20 w-20 place-items-center rounded-full bg-highlight text-highlight-foreground shadow-elegant transition-transform hover:scale-105"
                aria-label="Reproducir video"
              >
                <Play className="h-8 w-8" />
              </button>
            </div>
            <div className="absolute bottom-3 left-4 text-xs text-white/70">
              Video placeholder · reemplazar por embed real
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-lg font-semibold">La gran idea</h2>
            <p className="mt-2 text-muted-foreground">{vslScript.bigIdea}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-lg font-semibold">El mecanismo</h2>
            <p className="mt-2 text-muted-foreground">{vslScript.mechanism}</p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-gradient-hero p-8 text-white">
          <h2 className="text-2xl font-bold">La oferta</h2>
          <p className="mt-2 text-white/80">{vslScript.offer}</p>
          <div className="mt-6">
            <Button
              asChild size="lg"
              onClick={() => track("InitiateCheckout", { product: "ebook", source: "vsl" })}
              className="bg-highlight text-highlight-foreground hover:opacity-90"
            >
              <a href={checkout} rel="noopener">
                Quiero empezar mi práctica de 21 días
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold">Preguntas rápidas</h2>
          <Accordion type="single" collapsible className="mt-4">
            {vslScript.faq.map((f, i) => (
              <AccordionItem key={i} value={`f-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>
    </SiteLayout>
  );
}
