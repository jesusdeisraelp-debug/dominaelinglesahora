import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Section } from "@/components/site/Section";
import { legal, brand } from "@/config/funnel";

export const Route = createFileRoute("/terminos")({
  head: () => ({
    meta: [
      { title: "Términos y condiciones — Domina el Inglés Ahora" },
      { name: "description", content: "Términos y condiciones provisionales." },
      { property: "og:url", content: "/terminos" },
    ],
    links: [{ rel: "canonical", href: "/terminos" }],
  }),
  component: Terminos,
});

function Terminos() {
  return (
    <SiteLayout pageName="terminos" mobileCta={false}>
      <Section className="max-w-3xl">
        <h1 className="text-4xl font-extrabold">Términos y condiciones</h1>
        <p className="mt-2 text-sm text-muted-foreground">Última actualización: {legal.lastUpdated}</p>
        <div className="prose prose-neutral mt-8 max-w-none text-foreground/90 [&>h2]:mt-8 [&>h2]:text-xl [&>h2]:font-bold [&>p]:mt-3 [&>p]:text-muted-foreground">
          <p>Texto provisional. Debe revisarlo un asesor legal antes de publicarse en producción.</p>
          <h2>Producto</h2>
          <p>{brand.name} ofrece contenido educativo digital. La entrega y garantías del ebook se rigen por Hotmart.</p>
          <h2>Resultados</h2>
          <p>Los resultados dependen del esfuerzo y constancia de cada persona. No garantizamos fluidez instantánea.</p>
          <h2>Uso</h2>
          <p>El material es para uso personal. Está prohibido redistribuirlo sin autorización expresa.</p>
        </div>
      </Section>
    </SiteLayout>
  );
}
