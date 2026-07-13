import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { Section, Eyebrow } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { hotmart } from "@/config/funnel";
import { withUTMs } from "@/lib/utm";
import { track } from "@/lib/analytics";

export const Route = createFileRoute("/upsell")({
  head: () => ({
    meta: [
      { title: "Reto guiado INMERSIÓN 21 — Oferta única postcompra" },
      { name: "description", content: "Oferta postcompra: agrega el reto guiado a tu compra actual." },
      { name: "robots", content: "noindex" },
      { property: "og:url", content: "/upsell" },
    ],
    links: [{ rel: "canonical", href: "/upsell" }],
  }),
  component: Upsell,
});

function Upsell() {
  const [url, setUrl] = useState<string>(hotmart.upsellCheckoutURL);
  useEffect(() => {
    setUrl(withUTMs(hotmart.upsellCheckoutURL));
    track("UpsellView", { product: "reto-21-guiado" });
  }, []);

  return (
    <SiteLayout pageName="upsell" mobileCta={false} hideNav>
      <Section className="max-w-3xl">
        <Eyebrow>Oferta exclusiva postcompra</Eyebrow>
        <h1 className="mt-4 text-3xl font-extrabold md:text-5xl">
          Agrega el <span className="text-electric">Reto guiado INMERSIÓN 21</span> a tu compra
        </h1>
        <p className="mt-4 text-muted-foreground">
          Ya tienes el método. Este reto añade la estructura diaria para que completes tu primer ciclo sin abandonar en la semana 2.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="text-lg font-semibold">Qué agrega frente al ebook</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              "Un reto claro cada día durante 21 días.",
              "Recordatorios diarios para sostener la racha.",
              "Checkpoints semanales con material adicional.",
              "Espacio guiado para resolver bloqueos comunes.",
            ].map((t) => (
              <li key={t} className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild size="lg"
            onClick={() => track("UpsellAccept", { product: "reto-21-guiado" })}
            className="w-full bg-electric text-electric-foreground hover:opacity-90 sm:w-auto"
          >
            <a href={url} rel="noopener">
              Sí, agregar a mi compra
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
            <Link to="/downsell">No, continuar con mi compra</Link>
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Esta oferta solo aparece una vez tras tu compra del ebook.
        </p>
      </Section>
    </SiteLayout>
  );
}
