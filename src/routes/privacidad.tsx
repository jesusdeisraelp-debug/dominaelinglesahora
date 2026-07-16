import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { legal, social } from "@/config/funnel";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: "Aviso de privacidad — Método YouTalk 21" },
      { name: "description", content: "Cómo tratamos tus datos en Domina el Inglés Ahora." },
      { property: "og:url", content: "/privacidad" },
    ],
    links: [{ rel: "canonical", href: "/privacidad" }],
  }),
  component: Privacidad,
});

function Privacidad() {
  return (
    <SiteLayout pageName="privacidad" minimalHeader>
      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-4 py-14 md:px-6 md:py-20">
          <h1 className="text-navy">Aviso de privacidad</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Última actualización: {legal.lastUpdated}. Texto provisional editable.
          </p>

          <div className="mt-8 space-y-6 text-muted-foreground">
            <p>
              {legal.companyName} respeta tu privacidad. Este aviso describe qué datos recopilamos, para qué los usamos y cómo puedes ejercer tus derechos.
            </p>
            <div>
              <h2 className="text-navy">Datos que recopilamos</h2>
              <p className="mt-2">
                Al comprar o comunicarte con nosotros, podemos recibir tu nombre, correo electrónico y datos de compra a través de Hotmart. También podemos recolectar datos de navegación anónimos con fines analíticos.
              </p>
            </div>
            <div>
              <h2 className="text-navy">Cómo usamos tus datos</h2>
              <p className="mt-2">
                Usamos tus datos para entregar el producto que compraste, brindarte soporte y enviarte información relacionada con tu compra. No vendemos tus datos a terceros.
              </p>
            </div>
            <div>
              <h2 className="text-navy">Tus derechos</h2>
              <p className="mt-2">
                Puedes solicitar acceso, rectificación o eliminación de tus datos escribiendo a{" "}
                <a href={`mailto:${social.email}`} className="font-semibold text-navy underline underline-offset-4">{social.email}</a>.
              </p>
            </div>
            <div>
              <h2 className="text-navy">Cambios en este aviso</h2>
              <p className="mt-2">
                Podemos actualizar este aviso para reflejar cambios legales o de nuestros servicios. La fecha de la última actualización aparece al inicio de esta página.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
