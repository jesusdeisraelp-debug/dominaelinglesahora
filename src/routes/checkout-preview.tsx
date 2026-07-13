import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { Section, Eyebrow } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock } from "lucide-react";
import { OrderBumpCard } from "@/components/site/OrderBumpCard";
import { hotmart, orderBumps, prices } from "@/config/funnel";
import { track } from "@/lib/analytics";

/**
 * /checkout-preview — SOLO visualización interna previa a Hotmart.
 * Los order bumps reales se configuran dentro de Hotmart.
 * Esta página no se enlaza desde la navegación principal.
 */
export const Route = createFileRoute("/checkout-preview")({
  head: () => ({
    meta: [
      { title: "Checkout preview — solo interno" },
      { name: "robots", content: "noindex" },
      { property: "og:url", content: "/checkout-preview" },
    ],
    links: [{ rel: "canonical", href: "/checkout-preview" }],
  }),
  component: CheckoutPreview,
});

function CheckoutPreview() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const total = useMemo(() => {
    const bumps = orderBumps
      .filter((b) => selected.has(b.id) && b.priceUSD !== null)
      .reduce((s, b) => s + (b.priceUSD ?? 0), 0);
    return prices.ebookUSD + bumps;
  }, [selected]);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  return (
    <SiteLayout pageName="checkout-preview" mobileCta={false}>
      <Section className="max-w-4xl">
        <Eyebrow><Lock className="h-3.5 w-3.5" /> Vista interna</Eyebrow>
        <h1 className="mt-4 text-3xl font-extrabold md:text-4xl">Simulación de checkout</h1>
        <p className="mt-3 text-muted-foreground">
          Esta vista es solo para visualización interna. El checkout real ocurre en Hotmart,
          donde los order bumps deben configurarse manualmente.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_320px]">
          <div>
            <h2 className="text-lg font-semibold">Complementa tu método</h2>
            <div className="mt-4 space-y-3">
              {orderBumps.map((b) => (
                <OrderBumpCard
                  key={b.id}
                  bump={{ ...b }}
                  selected={selected.has(b.id)}
                  onToggle={toggle}
                />
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h3 className="font-semibold">Resumen</h3>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Ebook</dt>
                <dd>${prices.ebookUSD} USD</dd>
              </div>
              {orderBumps.filter((b) => selected.has(b.id)).map((b) => (
                <div key={b.id} className="flex justify-between">
                  <dt className="text-muted-foreground">{b.name}</dt>
                  <dd>{b.priceUSD !== null ? `$${b.priceUSD} USD` : "Por definir"}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold text-electric">${total} USD</span>
            </div>
            <Button
              asChild size="lg"
              className="mt-4 w-full bg-electric text-electric-foreground hover:opacity-90"
              onClick={() => track("InitiateCheckout", { product: "ebook", bumps: Array.from(selected) })}
            >
              <a href={hotmart.ebookCheckoutURL} rel="noopener">
                Ir a Hotmart <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">
              Nota interna: los bumps deben replicarse en Hotmart.
            </p>
          </aside>
        </div>
      </Section>
    </SiteLayout>
  );
}
