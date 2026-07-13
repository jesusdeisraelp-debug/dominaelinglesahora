import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { Section, Eyebrow } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Mail } from "lucide-react";
import { hotmart, prices } from "@/config/funnel";
import { withUTMs } from "@/lib/utm";
import { track } from "@/lib/analytics";

export const Route = createFileRoute("/gracias-recurso")({
  head: () => ({
    meta: [
      { title: "¡Listo! Revisa tu correo — Domina el Inglés Ahora" },
      { name: "description", content: "Tu plan de 7 días está en camino. Mientras llega, da el siguiente paso." },
      { name: "robots", content: "noindex" },
      { property: "og:url", content: "/gracias-recurso" },
    ],
    links: [{ rel: "canonical", href: "/gracias-recurso" }],
  }),
  component: ThankYou,
});

function ThankYou() {
  const [checkout, setCheckout] = useState(hotmart.ebookCheckoutURL);
  useEffect(() => {
    setCheckout(withUTMs(hotmart.ebookCheckoutURL));
    track("CompleteRegistration", { source: "leadmagnet" });
  }, []);

  return (
    <SiteLayout pageName="thank-you" mobileCta={false}>
      <Section className="max-w-3xl text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal/20 text-teal">
          <Check className="h-7 w-7" />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold md:text-4xl">¡Perfecto! Tu plan va en camino.</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          En los próximos minutos recibirás en tu correo el plan de 7 días. Si no lo ves, revisa spam o promociones.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6 text-left shadow-soft">
          <Eyebrow>Un micro compromiso</Eyebrow>
          <h2 className="mt-3 text-xl font-bold">Elige tu horario diario de práctica</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Antes de abrir cualquier video, decide cuándo entrenarás cada día. Puede ser
            justo después del café, en el transporte o antes de dormir. Cualquier horario
            fijo es mejor que uno perfecto.
          </p>
        </div>

        <div className="mt-8 rounded-2xl bg-gradient-hero p-8 text-left text-white shadow-elegant">
          <Eyebrow>
            <Mail className="h-3.5 w-3.5" /> Siguiente paso natural
          </Eyebrow>
          <h2 className="mt-3 text-2xl font-bold md:text-3xl">
            Si te sirve el plan, el método completo te llevará más lejos.
          </h2>
          <p className="mt-3 text-white/80">
            El ebook de {" "}
            <strong className="text-highlight">Método INMERSIÓN 21</strong> incluye las 21 técnicas
            prácticas y las plantillas para capturar y medir tu progreso. Precio provisional ${prices.ebookUSD} USD.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              asChild size="lg"
              onClick={() => track("InitiateCheckout", { product: "ebook", source: "thank-you" })}
              className="bg-highlight text-highlight-foreground hover:opacity-90"
            >
              <a href={checkout} rel="noopener">
                Ver el método completo
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
              <Link to="/ebook-sale">Conocer detalles primero</Link>
            </Button>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
