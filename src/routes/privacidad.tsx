import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Section } from "@/components/site/Section";
import { legal, brand, social } from "@/config/funnel";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: "Privacidad — Domina el Inglés Ahora" },
      { name: "description", content: "Política de privacidad provisional de Domina el Inglés Ahora." },
      { property: "og:url", content: "/privacidad" },
    ],
    links: [{ rel: "canonical", href: "/privacidad" }],
  }),
  component: Privacidad,
});

function Privacidad() {
  return (
    <SiteLayout pageName="privacidad" mobileCta={false}>
      <Section className="max-w-3xl">
        <h1 className="text-4xl font-extrabold">Política de privacidad</h1>
        <p className="mt-2 text-sm text-muted-foreground">Última actualización: {legal.lastUpdated}</p>
        <div className="prose prose-neutral mt-8 max-w-none text-foreground/90 [&>h2]:mt-8 [&>h2]:text-xl [&>h2]:font-bold [&>p]:mt-3 [&>p]:text-muted-foreground">
          <p>
            Este es un texto provisional. Reemplázalo con la política definitiva antes de ejecutar campañas pagadas.
          </p>
          <h2>Qué datos recopilamos</h2>
          <p>Nombre y correo electrónico cuando te registras en formularios (lead magnet, clase evergreen o lista de espera).</p>
          <h2>Para qué los usamos</h2>
          <p>Enviarte el recurso solicitado, comunicaciones relacionadas con {brand.name} y eventualmente ofertas de nuestros productos.</p>
          <h2>Con quién los compartimos</h2>
          <p>Proveedores necesarios para operar el servicio (email marketing y procesador de pagos como Hotmart).</p>
          <h2>Tus derechos</h2>
          <p>Puedes solicitar la baja o eliminación de tus datos escribiendo a {social.email}.</p>
        </div>
      </Section>
    </SiteLayout>
  );
}
