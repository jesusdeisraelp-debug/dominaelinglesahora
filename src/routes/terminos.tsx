import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { legal, social } from "@/config/funnel";

export const Route = createFileRoute("/terminos")({
  head: () => ({
    meta: [
      { title: "Términos y condiciones — Método YouTalk 21" },
      { name: "description", content: "Términos de uso y condiciones de compra de Método YouTalk 21." },
      { property: "og:url", content: "/terminos" },
    ],
    links: [{ rel: "canonical", href: "/terminos" }],
  }),
  component: Terminos,
});

function Terminos() {
  return (
    <SiteLayout pageName="terminos" minimalHeader>
      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-4 py-14 md:px-6 md:py-20">
          <h1 className="text-navy">Términos y condiciones</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Última actualización: {legal.lastUpdated}. Texto provisional editable.
          </p>

          <div className="mt-8 space-y-6 text-muted-foreground">
            <div>
              <h2 className="text-navy">Sobre el producto</h2>
              <p className="mt-2">
                Método YouTalk 21 es un producto digital educativo. Su objetivo es guiar tu práctica diaria de inglés durante 21 días. No garantiza fluidez inmediata; los resultados dependen de tu constancia y práctica.
              </p>
            </div>
            <div>
              <h2 className="text-navy">Pago y garantía</h2>
              <p className="mt-2">
                El pago se procesa a través de Hotmart. Al comprar aceptas las condiciones de Hotmart. Cuentas con hasta 7 días para solicitar reembolso conforme a su política.
              </p>
            </div>
            <div>
              <h2 className="text-navy">Uso del material</h2>
              <p className="mt-2">
                El material es para uso personal. Está prohibida su redistribución, reventa o publicación total o parcial sin autorización expresa por escrito.
              </p>
            </div>
            <div>
              <h2 className="text-navy">Contacto</h2>
              <p className="mt-2">
                Para cualquier duda sobre estos términos, escríbenos a{" "}
                <a href={`mailto:${social.email}`} className="font-semibold text-navy underline underline-offset-4">{social.email}</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
