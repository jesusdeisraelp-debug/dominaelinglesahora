import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Play, Sparkles, Target, Activity, Compass } from "lucide-react";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { Section, Eyebrow } from "@/components/site/Section";
import { PracticeCalculator } from "@/components/site/PracticeCalculator";
import { Button } from "@/components/ui/button";
import { brand } from "@/config/funnel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Domina el Inglés Ahora — Entrena inglés con YouTube y TikTok" },
      {
        name: "description",
        content:
          "No necesitas otra clase de inglés. Convierte 30 minutos diarios de YouTube o TikTok en entrenamiento real con el Método INMERSIÓN 21.",
      },
      { property: "og:title", content: "Domina el Inglés Ahora — Entrena inglés con YouTube y TikTok" },
      { property: "og:description", content: "No necesitas otra clase de inglés. Convierte 30 minutos diarios de YouTube o TikTok en entrenamiento real con el Método INMERSIÓN 21." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});


function useHeroVariant() {
  const [variant, setVariant] = useState<"a" | "b">("a");
  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get("variant");
    if (v === "b") setVariant("b");
  }, []);
  return variant;
}

function HomePage() {
  const variant = useHeroVariant();
  return (
    <SiteLayout pageName="home">
      {/* HERO */}
      <header className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="pointer-events-none absolute inset-0 grid-dots opacity-40" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
          <div>
            <Eyebrow>
              <Sparkles className="h-3.5 w-3.5" /> {brand.method}
            </Eyebrow>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              {variant === "b" ? (
                <>Deja de <span className="text-highlight">consumir inglés</span> y empieza a entrenarlo.</>
              ) : (
                <>No necesitas otra clase de inglés. Necesitas un <span className="text-highlight">sistema práctico</span>.</>
              )}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/85">
              Convierte 30 minutos de YouTube o TikTok en una sesión real de inglés.
              21 días con un método claro: observar, capturar, repetir, aplicar y medir.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-highlight text-highlight-foreground hover:opacity-90">
                <Link to="/ebook-sale">
                  Quiero empezar mi práctica de 21 días
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                <Link to="/leadmagnet">Plan gratis de 7 días</Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-white/60">
              Para adultos hispanohablantes que entienden algo de inglés pero no logran ser constantes.
            </p>
          </div>

          {/* Mock player card */}
          <div className="relative">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-accent opacity-30 blur-2xl" aria-hidden />
            <div className="relative rounded-3xl border border-white/15 bg-night/70 p-4 shadow-elegant backdrop-blur">
              <div className="flex aspect-video items-center justify-center rounded-2xl bg-black/50">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-highlight text-highlight-foreground">
                  <Play className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-3/5 rounded-full bg-teal" />
                </div>
                <div className="flex justify-between text-xs text-white/60">
                  <span>Día 12 de 21</span>
                  <span>+247 minutos entrenados</span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                {[
                  { l: "Frases", v: "84" },
                  { l: "Videos", v: "19" },
                  { l: "Rachas", v: "12" },
                ].map((s) => (
                  <div key={s.l} className="rounded-lg bg-white/5 p-3">
                    <div className="text-xl font-bold text-highlight">{s.v}</div>
                    <div className="text-white/60">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Selector de intención */}
      <Section>
        <div className="text-center">
          <Eyebrow>Empieza por donde te sirva</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
            ¿Qué quieres lograr hoy?
          </h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: Compass,
              title: "Recibir un plan gratis",
              desc: "7 días para dejar de ver inglés pasivamente.",
              cta: "Enviarme el plan",
              to: "/leadmagnet",
            },
            {
              icon: Target,
              title: "Conocer el método",
              desc: "Ebook + Método INMERSIÓN 21 completo.",
              cta: "Ver método",
              to: "/ebook-sale",
            },
            {
              icon: Activity,
              title: "Sumarme al reto guiado",
              desc: "21 días acompañados. Próximamente.",
              cta: "Unirme a la lista",
              to: "/reto-21-dias",
            },
          ].map((card) => (
            <Link
              key={card.title}
              to={card.to}
              className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-accent text-white">
                <card.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{card.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{card.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-electric">
                {card.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Cómo funciona el ecosistema */}
      <div className="bg-muted/40">
        <Section>
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <Eyebrow>Cómo funciona</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                Un ecosistema, cinco pasos, un hábito real.
              </h2>
              <p className="mt-4 text-muted-foreground">
                {brand.method} convierte tu consumo pasivo de contenido en entrenamiento accionable.
                Cada paso es corto, medible y compatible con tu vida.
              </p>
              <ol className="mt-8 space-y-4">
                {[
                  ["Observar", "Elegir el video correcto según tu nivel y objetivo."],
                  ["Capturar", "Extraer las frases útiles, no traducir palabra por palabra."],
                  ["Repetir", "Escuchar y reproducir hasta sonar natural."],
                  ["Aplicar", "Usarlo en un mensaje, nota de voz o conversación real."],
                  ["Medir", "Registrar minutos, frases y racha para ver el avance."],
                ].map(([n, d], i) => (
                  <li key={n} className="flex gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-electric text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <div className="font-semibold text-foreground">{n}</div>
                      <div className="text-sm text-muted-foreground">{d}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <PracticeCalculator />
          </div>
        </Section>
      </div>

      {/* Biblioteca simulada */}
      <Section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <Eyebrow>Biblioteca</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">Contenido curado para entrenar</h2>
            <p className="mt-2 text-muted-foreground">
              Tarjetas de referencia visual. La biblioteca real se construye contigo dentro del método.
            </p>
          </div>
          <Link to="/recursos" className="hidden text-sm font-semibold text-electric hover:underline md:inline">
            Ver recursos →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { tag: "TikTok", title: "Frases naturales para saludar sin sonar robot", min: "3 min" },
            { tag: "YouTube", title: "Cómo entender acentos rápidos sin frustrarte", min: "8 min" },
            { tag: "TikTok", title: "10 conectores que usan los nativos hoy", min: "2 min" },
            { tag: "YouTube", title: "Rutina de 20 minutos para reactivar tu inglés", min: "12 min" },
          ].map((c, i) => (
            <article key={i} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className="relative aspect-video bg-gradient-hero">
                <div className="absolute inset-0 grid place-items-center">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-white/90 text-night">
                    <Play className="h-4 w-4" />
                  </span>
                </div>
                <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2 py-0.5 text-xs font-medium text-white">
                  {c.tag}
                </span>
                <span className="absolute right-3 bottom-3 rounded-md bg-black/60 px-1.5 py-0.5 text-xs text-white">
                  {c.min}
                </span>
              </div>
              <div className="p-4">
                <h3 className="line-clamp-2 text-sm font-semibold text-foreground">{c.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Lead magnet CTA */}
      <div className="bg-gradient-hero text-white">
        <Section className="text-center">
          <Eyebrow>
            <Sparkles className="h-3.5 w-3.5" /> Empieza gratis
          </Eyebrow>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold md:text-4xl">
            Recibe el plan de 7 días para dejar de ver inglés pasivamente
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Una guía corta, por email, con pasos concretos para volver a entrenar inglés sin abandonar en la segunda semana.
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg" className="bg-highlight text-highlight-foreground hover:opacity-90">
              <Link to="/leadmagnet">
                Envíame el plan de 7 días
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Section>
      </div>
    </SiteLayout>
  );
}
