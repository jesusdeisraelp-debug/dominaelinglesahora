import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { social, brand, legal, checkout } from "@/config/funnel";
import { Instagram, Facebook, Mail } from "lucide-react";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Método YouTalk 21" },
      { name: "description", content: "¿Preguntas sobre tu compra o el Método YouTalk 21? Escríbenos." },
      { property: "og:url", content: "/contacto" },
    ],
    links: [{ rel: "canonical", href: "/contacto" }],
  }),
  component: Contacto,
});

function Contacto() {
  return (
    <SiteLayout pageName="contacto" minimalHeader>
      <section className="bg-cream">
        <div className="mx-auto max-w-2xl px-4 py-14 md:px-6 md:py-20">
          <h1 className="text-navy">Contacto</h1>
          <p className="mt-3 text-muted-foreground">
            Estamos aquí para ayudarte con tu compra, tu acceso al Método YouTalk 21 y cualquier duda sobre la práctica diaria.
          </p>

          <div className="mt-8 space-y-4 rounded-2xl bg-white p-6 shadow-card">
            <a href={checkout.SUPPORT_URL} className="flex items-center gap-3 rounded-xl border border-navy/10 p-4 hover:bg-cream">
              <Mail className="h-5 w-5 text-teal" />
              <div>
                <p className="font-semibold text-navy">Correo de soporte</p>
                <p className="text-sm text-muted-foreground">{social.email}</p>
              </div>
            </a>
            <a href={social.instagram.url} className="flex items-center gap-3 rounded-xl border border-navy/10 p-4 hover:bg-cream">
              <Instagram className="h-5 w-5 text-coral" />
              <div>
                <p className="font-semibold text-navy">Instagram</p>
                <p className="text-sm text-muted-foreground">{social.instagram.handle}</p>
              </div>
            </a>
            <a href={social.facebook.url} className="flex items-center gap-3 rounded-xl border border-navy/10 p-4 hover:bg-cream">
              <Facebook className="h-5 w-5 text-navy" />
              <div>
                <p className="font-semibold text-navy">Facebook</p>
                <p className="text-sm text-muted-foreground">{social.facebook.handle}</p>
              </div>
            </a>
          </div>

          <p className="mt-8 text-xs text-muted-foreground">
            {brand.name} · Actualizado {legal.lastUpdated}
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
