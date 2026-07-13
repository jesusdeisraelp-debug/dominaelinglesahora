import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Section, Eyebrow } from "@/components/site/Section";
import { ArrowRight } from "lucide-react";

const articles = [
  {
    slug: "elegir-videos-de-youtube",
    title: "Cómo elegir videos de YouTube según tu nivel de inglés",
    excerpt: "Un criterio simple para dejar de perder 20 minutos decidiendo qué ver.",
    tag: "Método",
  },
  {
    slug: "tiktok-para-vocabulario",
    title: "TikTok para vocabulario: cuenta menos, entrena mejor",
    excerpt: "Cómo transformar 3 videos cortos en una sesión útil de vocabulario.",
    tag: "TikTok",
  },
  {
    slug: "shadowing-en-espanol",
    title: "Shadowing en español: la técnica que suele hacerse mal",
    excerpt: "Qué es realmente el shadowing y cómo aplicarlo sin frustrarte.",
    tag: "Técnica",
  },
  {
    slug: "escuchar-sin-subtitulos",
    title: "Escuchar sin subtítulos: una hoja de ruta honesta",
    excerpt: "Pasos progresivos para dejar los subtítulos sin sentirte perdido.",
    tag: "Comprensión",
  },
  {
    slug: "constancia-vs-motivacion",
    title: "Constancia vs. motivación: por qué abandonas en la semana 2",
    excerpt: "El diseño del entorno importa más que la fuerza de voluntad.",
    tag: "Hábito",
  },
  {
    slug: "capturar-frases-utiles",
    title: "Capturar frases útiles: la plantilla que multiplica tu retención",
    excerpt: "Cómo anotar frases para que sí regresen a tu vocabulario activo.",
    tag: "Método",
  },
];

export const Route = createFileRoute("/recursos")({
  head: () => ({
    meta: [
      { title: "Recursos — Domina el Inglés Ahora" },
      { name: "description", content: "Artículos prácticos para entrenar inglés con YouTube, TikTok y contenido real." },
      { property: "og:title", content: "Recursos — Domina el Inglés Ahora" },
      { property: "og:description", content: "Artículos prácticos y honestos para tu práctica diaria." },
      { property: "og:url", content: "/recursos" },
    ],
    links: [{ rel: "canonical", href: "/recursos" }],
  }),
  component: Recursos,
});

function Recursos() {
  return (
    <SiteLayout pageName="recursos" mobileCta={{ to: "/leadmagnet", label: "Descargar plan de 7 días" }}>
      <Section>
        <Eyebrow>Recursos</Eyebrow>
        <h1 className="mt-4 text-4xl font-extrabold md:text-5xl">Aprende con contenido honesto</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Artículos cortos para aplicar hoy mismo. Sin promesas de fluidez instantánea, sin humo.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <article key={a.slug} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className="relative aspect-[16/9] bg-gradient-accent">
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-xs font-semibold text-electric">
                  {a.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-lg font-semibold text-foreground">{a.title}</h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{a.excerpt}</p>
                <Link to="/leadmagnet" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-electric">
                  Leer más
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          Los artículos individuales se publicarán próximamente. Mientras tanto, apúntate al plan gratis de 7 días.
        </p>
      </Section>
    </SiteLayout>
  );
}
