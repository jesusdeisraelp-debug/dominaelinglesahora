import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Section, Eyebrow } from "@/components/site/Section";
import { social, brand } from "@/config/funnel";
import { Instagram, Facebook, Mail } from "lucide-react";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Domina el Inglés Ahora" },
      { name: "description", content: "¿Tienes preguntas? Escríbenos por email o redes sociales." },
      { property: "og:url", content: "/contacto" },
    ],
    links: [{ rel: "canonical", href: "/contacto" }],
  }),
  component: Contacto,
});

function Contacto() {
  return (
    <SiteLayout pageName="contacto" mobileCta={false}>
      <Section className="max-w-3xl">
        <Eyebrow>Contacto</Eyebrow>
        <h1 className="mt-4 text-4xl font-extrabold">Estamos para ayudarte</h1>
        <p className="mt-3 text-muted-foreground">
          Si tienes dudas sobre {brand.name}, el método o el ebook, elige el canal que prefieras.
          Respondemos en horario hábil (Ciudad de México).
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <a href={`mailto:${social.email}`} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elegant">
            <Mail className="h-5 w-5 text-electric" />
            <div className="mt-3 font-semibold">Email</div>
            <div className="text-sm text-muted-foreground">{social.email}</div>
          </a>
          <a href={social.instagram.url} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elegant">
            <Instagram className="h-5 w-5 text-electric" />
            <div className="mt-3 font-semibold">Instagram</div>
            <div className="text-sm text-muted-foreground">{social.instagram.handle}</div>
          </a>
          <a href={social.facebook.url} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elegant">
            <Facebook className="h-5 w-5 text-electric" />
            <div className="mt-3 font-semibold">Facebook</div>
            <div className="text-sm text-muted-foreground">{social.facebook.handle}</div>
          </a>
        </div>
      </Section>
    </SiteLayout>
  );
}
