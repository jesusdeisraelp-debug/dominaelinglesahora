import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Check, X, Sparkles, BookOpen, Repeat, Compass, Activity, Timer,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { Section, Eyebrow } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { OrderBumpCard } from "@/components/site/OrderBumpCard";
import { bonuses, hotmart, orderBumps, prices, brand } from "@/config/funnel";
import { track } from "@/lib/analytics";
import { withUTMs } from "@/lib/utm";

export const Route = createFileRoute("/ebook-sale")({
  head: () => ({
    meta: [
      { title: "Ebook Domina el Inglés con YouTube y TikTok — Método INMERSIÓN 21" },
      {
        name: "description",
        content:
          "El sistema práctico de 21 días para convertir el contenido que ya ves en YouTube y TikTok en tu entrenamiento diario de inglés.",
      },
      { property: "og:title", content: "Ebook — Método INMERSIÓN 21" },
      { property: "og:description", content: "21 técnicas prácticas para entrenar inglés con YouTube y TikTok." },
      { property: "og:url", content: "/ebook-sale" },
      { property: "og:type", content: "product" },
    ],
    links: [{ rel: "canonical", href: "/ebook-sale" }],
  }),
  component: SalesPage,
});

function SalesPage() {
  const [checkoutURL, setCheckoutURL] = useState<string>(hotmart.ebookCheckoutURL);
  useEffect(() => {
    setCheckoutURL(withUTMs(hotmart.ebookCheckoutURL));
  }, []);
  const bonusList = Object.values(bonuses).filter((b) => b.enabled);

  return (
    <SiteLayout pageName="ebook-sale" mobileCta={{ to: "/ebook-sale", label: `Comprar ebook — $${prices.ebookUSD} USD` }}>
      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="pointer-events-none absolute inset-0 grid-dots opacity-40" aria-hidden />
        <Section className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Ebook · {brand.method}</Eyebrow>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              Convierte 30 minutos de <span className="text-highlight">YouTube o TikTok</span> en una sesión real de inglés.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">
              21 técnicas prácticas para dejar de consumir contenido pasivamente y empezar a entrenar comprensión, vocabulario y expresión durante 21 días.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild size="lg"
                onClick={() => track("InitiateCheckout", { product: "ebook", price: prices.ebookUSD })}
                className="bg-highlight text-highlight-foreground hover:opacity-90"
              >
                <a href={checkoutURL} rel="noopener">
                  Quiero empezar mi práctica de 21 días
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <span className="text-sm text-white/70">Acceso inmediato · Precio provisional ${prices.ebookUSD} USD</span>
            </div>
          </div>
        </Section>
      </header>

      {/* Dolor + nueva oportunidad */}
      <Section>
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <Eyebrow>El problema real</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Ya intentaste cursos. Entiendes algo. Y aun así no eres constante.
            </h2>
            <p className="mt-4 text-muted-foreground">
              No es falta de inteligencia ni de material. Es que estudiar más inglés no te dio un
              <strong> sistema para entrenarlo dentro de tu vida diaria</strong>. Y cada intento nuevo se choca con el mismo muro:
              no tienes tiempo, te distraes, no sabes qué videos elegir y tu nivel se siente muy bajo para conversar.
            </p>
          </div>
          <div>
            <Eyebrow>La nueva oportunidad</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Ya consumes horas de inglés cada semana. Sólo falta convertirlas en práctica.
            </h2>
            <p className="mt-4 text-muted-foreground">
              YouTube y TikTok son el input más constante que tienes. {brand.method} te da un guion claro
              para transformarlo en entrenamiento: qué elegir, cómo capturarlo, cómo repetirlo y cómo medir tu avance.
            </p>
          </div>
        </div>
      </Section>

      {/* Diagnóstico */}
      <div className="bg-muted/40">
        <Section>
          <Eyebrow>Diagnóstico</Eyebrow>
          <h2 className="mt-4 max-w-3xl text-3xl font-bold md:text-4xl">
            Por qué estudiar más no siempre resuelve la constancia.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                t: "Estudias en modo 'clase'",
                d: "Sin un sistema para usar el inglés fuera del cuaderno, todo se olvida al cerrar la app.",
              },
              {
                t: "Consumes sin capturar",
                d: "Ver un video en inglés no es entrenar inglés. Falta un paso: extraer lo útil y repetirlo.",
              },
              {
                t: "Mides nada",
                d: "Sin métrica visible, tu cerebro no reconoce el avance y abandonas en la segunda semana.",
              },
            ].map((it) => (
              <div key={it.t} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h3 className="font-semibold text-foreground">{it.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{it.d}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Método */}
      <Section>
        <div className="text-center">
          <Eyebrow><Sparkles className="h-3.5 w-3.5" /> {brand.method}</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">Los 5 pasos que sostienen el hábito</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Cortos, medibles y compatibles con tu día real. No requieren fluidez para empezar.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-5">
          {[
            { i: Compass, n: "Observar", d: "Elige el video correcto según tu nivel y objetivo del día." },
            { i: BookOpen, n: "Capturar", d: "Extrae 3–5 frases útiles, no traduzcas palabra por palabra." },
            { i: Repeat, n: "Repetir", d: "Escucha y reproduce hasta que suene natural en tu boca." },
            { i: Activity, n: "Aplicar", d: "Úsalo en un mensaje, nota de voz o conversación real." },
            { i: Timer, n: "Medir", d: "Registra minutos, frases y racha. Tu progreso se vuelve visible." },
          ].map((s, i) => (
            <div key={s.n} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-accent text-white">
                  <s.i className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold text-muted-foreground">Paso {i + 1}</span>
              </div>
              <h3 className="mt-3 font-semibold text-foreground">{s.n}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Qué incluye */}
      <div className="bg-muted/40">
        <Section>
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <Eyebrow>Qué incluye el ebook</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold md:text-4xl">21 técnicas listas para aplicar hoy</h2>
              <ul className="mt-6 space-y-3">
                {[
                  "Guía paso a paso del Método INMERSIÓN 21.",
                  "Cómo elegir videos por objetivo (comprensión, vocabulario o expresión).",
                  "Rutina de 20 a 30 minutos diarios adaptable a tu agenda.",
                  "Ejemplos con canales y creadores reales de YouTube y TikTok.",
                  "Plantillas para capturar frases y hacer shadowing.",
                  "Sistema simple para medir minutos, frases y racha.",
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-sm">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                    <span className="text-foreground">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Preview de 3 páginas simuladas */}
            <div>
              <div className="relative grid grid-cols-3 gap-3">
                {["Método", "Capturar", "Medir"].map((label, i) => (
                  <div
                    key={label}
                    className="relative aspect-[3/4] overflow-hidden rounded-xl border border-border bg-card shadow-soft"
                    style={{ transform: `rotate(${(i - 1) * 3}deg)` }}
                  >
                    <div className="h-2 w-full bg-gradient-accent" />
                    <div className="space-y-2 p-3">
                      <div className="h-3 w-2/3 rounded bg-muted" />
                      <div className="h-2 w-full rounded bg-muted" />
                      <div className="h-2 w-5/6 rounded bg-muted" />
                      <div className="mt-3 h-16 w-full rounded bg-muted" />
                      <div className="h-2 w-4/6 rounded bg-muted" />
                    </div>
                    <span className="absolute bottom-2 left-2 text-[10px] font-semibold uppercase text-electric">{label}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Preview visual · las páginas reales del ebook pueden variar.
              </p>
            </div>
          </div>
        </Section>
      </div>

      {/* Esto es / esto no es */}
      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border-2 border-teal/30 bg-card p-6 shadow-soft">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Check className="h-5 w-5 text-teal" /> Esto sí es
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>· Un sistema práctico para entrenar con contenido real.</li>
              <li>· Un método que respeta tu tiempo y tu nivel actual.</li>
              <li>· Una forma de medir tu constancia día a día.</li>
              <li>· Ideal si ya entiendes algo pero no logras hablar con soltura.</li>
            </ul>
          </div>
          <div className="rounded-2xl border-2 border-border bg-card p-6 shadow-soft">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <X className="h-5 w-5 text-destructive" /> Esto no es
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>· Una promesa de fluidez instantánea.</li>
              <li>· Un curso de gramática desde cero.</li>
              <li>· Clases en vivo con profesor.</li>
              <li>· Un reemplazo si no dedicas ningún tiempo diario.</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Bonos */}
      {bonusList.length > 0 && (
        <div className="bg-muted/40">
          <Section>
            <Eyebrow>Incluido en la oferta</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">Bonos que aceleran tu primer ciclo</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Piezas complementarias diseñadas para bajar la fricción del día 1 al 21.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {bonusList.map((b) => (
                <div key={b.name} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <span className="inline-flex items-center gap-1 rounded-full bg-highlight/20 px-2 py-0.5 text-xs font-semibold text-night">
                    Bono incluido
                  </span>
                  <h3 className="mt-3 font-semibold text-foreground">{b.name}</h3>
                </div>
              ))}
            </div>
          </Section>
        </div>
      )}

      {/* Complementa tu método (order bumps preview) */}
      <Section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <Eyebrow>Complementa tu método</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">Extras opcionales</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Complementos configurables para quienes quieren llevar la práctica más lejos.
              Los bumps reales se configuran dentro de Hotmart.
            </p>
          </div>
          <Link to="/checkout-preview" className="hidden text-sm font-semibold text-electric hover:underline md:inline">
            Ver checkout preview →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {orderBumps.map((b) => (
            <OrderBumpCard key={b.id} bump={{ ...b }} />
          ))}
        </div>
      </Section>

      {/* Precio */}
      <div className="bg-gradient-hero text-white">
        <Section className="text-center">
          <Eyebrow>Acceso inmediato</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold md:text-5xl">Un pago único, provisional</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Precio de introducción. Tu compra incluye el ebook completo y los bonos activos.
          </p>
          <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3 rounded-2xl bg-white/10 p-6 backdrop-blur">
            <div className="text-5xl font-extrabold text-highlight">
              ${prices.ebookUSD}
              <span className="ml-1 text-lg font-medium text-white/70">{prices.currency}</span>
            </div>
            <Button
              asChild size="lg"
              onClick={() => track("InitiateCheckout", { product: "ebook", price: prices.ebookUSD })}
              className="w-full bg-highlight text-highlight-foreground hover:opacity-90"
            >
              <a href={checkoutURL} rel="noopener">
                Comprar ahora
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <p className="text-xs text-white/60">Checkout seguro vía Hotmart</p>
          </div>
        </Section>
      </div>

      {/* Resultados que buscarás construir + testimonios pendientes */}
      <Section>
        <Eyebrow>Resultados que buscarás construir</Eyebrow>
        <h2 className="mt-4 text-3xl font-bold md:text-4xl">
          A qué apunta el método (con esfuerzo real de tu parte)
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            "Mantener una racha de práctica real, no de consumo pasivo.",
            "Entender más de los videos que ya te gustan sin subtítulos en español.",
            "Empezar a expresarte con frases naturales de uso cotidiano.",
          ].map((r) => (
            <div key={r} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <p className="text-sm text-foreground">{r}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-dashed border-border bg-muted/40 p-6 text-sm text-muted-foreground">
          <strong className="text-foreground">Testimonios: pendiente de agregar.</strong>{" "}
          No mostramos historias inventadas. Cuando tengamos casos verificados de estudiantes que completaron el método, aparecerán aquí.
        </div>
      </Section>

      {/* FAQ */}
      <div className="bg-muted/40">
        <Section className="max-w-3xl">
          <Eyebrow>Preguntas frecuentes</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">Objeciones honestas</h2>
          <Accordion type="single" collapsible className="mt-6">
            {[
              { q: "No tengo tiempo. ¿En serio funciona en 20 minutos?", a: "El método está diseñado para bloques cortos. La clave no es el volumen, es la consistencia diaria durante 21 días con un guion claro." },
              { q: "Ya intenté cursos y abandoné. ¿Por qué esto sería diferente?", a: "Los cursos te dan contenido nuevo. Este método te da un sistema para entrenar con lo que ya consumes, con métricas que hacen visible tu avance." },
              { q: "Mi nivel es muy bajo. ¿Es para mí?", a: "Sí, si ya entiendes algo de inglés. Si estás desde cero absoluto conviene primero un curso base y luego aplicar el método." },
              { q: "Me distraigo mucho con el teléfono.", a: "El método incluye una rutina que aprovecha esa distracción: convierte los mismos minutos de scroll en minutos de práctica." },
              { q: "No sé qué videos elegir.", a: "Recibes una guía para elegir contenido según tu nivel y objetivo del día." },
              { q: "¿Cómo recibo el ebook?", a: "El pago se procesa en Hotmart y recibes acceso inmediato por email." },
            ].map((f, i) => (
              <AccordionItem key={i} value={`i-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>
      </div>

      {/* CTA final */}
      <Section className="text-center">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold md:text-4xl">
          Empieza tu primer ciclo de 21 días hoy
        </h2>
        <div className="mt-6 flex justify-center">
          <Button
            asChild size="lg"
            onClick={() => track("InitiateCheckout", { product: "ebook", price: prices.ebookUSD })}
            className="bg-electric text-electric-foreground hover:opacity-90"
          >
            <a href={checkoutURL} rel="noopener">
              Quiero empezar mi práctica de 21 días
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </Section>
    </SiteLayout>
  );
}
