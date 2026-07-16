import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Mail, LifeBuoy, PlayCircle, Download } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { checkout } from "@/config/funnel";
import { z } from "zod";

const graciasSearch = z.object({
  origen: z.enum(["upsell", "compra"]).optional(),
});

export const Route = createFileRoute("/gracias")({
  validateSearch: graciasSearch,
  head: () => ({
    meta: [
      { title: "¡Compra confirmada! — Método YouTalk 21" },
      { name: "description", content: "Tu compra está confirmada. Aquí tienes los siguientes pasos para comenzar YouTalk 21 hoy mismo." },
      { name: "robots", content: "noindex" },
      { property: "og:url", content: "/gracias" },
    ],
    links: [{ rel: "canonical", href: "/gracias" }],
  }),
  component: Gracias,
});

function Gracias() {
  const { origen } = Route.useSearch();

  return (
    <SiteLayout pageName="gracias" hideNav>
      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-4 py-14 md:px-6 md:py-20">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal/20 text-navy">
            <Check className="h-7 w-7" />
          </div>
          <h1 className="mt-6 text-center text-navy">
            ¡Compra confirmada! <br />
            Tu siguiente conversación comienza hoy.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
            Gracias por confiar en Método YouTalk 21. Ya está todo listo para que arranques tu primer ciclo de 21 días.
          </p>

          {/* PASOS */}
          <div className="mt-10 rounded-3xl bg-white p-6 shadow-card md:p-8">
            <h2 className="text-navy">Cómo acceder en 3 pasos</h2>
            <ol className="mt-6 space-y-5">
              {[
                {
                  Icon: Mail,
                  t: "Revisa tu correo",
                  d: "Hotmart te envía un correo de confirmación con tu acceso. Si usas Gmail, revisa también las pestañas Promociones y Notificaciones.",
                },
                {
                  Icon: Download,
                  t: "Abre tu área de miembros / descargas",
                  d: "Desde el correo de Hotmart podrás entrar a tu área personal y descargar el ebook y los bonos en formato digital.",
                },
                {
                  Icon: PlayCircle,
                  t: "Comienza el Día 1 — PREPARA",
                  d: "Abre el ebook, ubica la etapa PREPARA (Días 1–3) y define tu objetivo, tu contenido base y tu horario diario. Con esto ya arrancaste.",
                },
              ].map((p, i) => (
                <li key={p.t} className="flex gap-4 rounded-2xl border border-navy/10 p-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-teal/20 text-navy">
                    <p.Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-coral">Paso {i + 1}</p>
                    <p className="font-semibold text-navy">{p.t}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{p.d}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://app-vlc.hotmart.com/tools/purchases"
                target="_blank"
                rel="noopener"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-navy px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
              >
                Ir a mis compras en Hotmart
              </a>
              <a
                href={checkout.SUPPORT_URL}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-navy/15 px-5 py-3 text-sm font-semibold text-navy hover:bg-white"
              >
                <LifeBuoy className="h-4 w-4" /> Contactar soporte
              </a>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Nota: si aún no tienes la URL definitiva de tu área de miembros, el botón anterior te lleva al panel general de compras de Hotmart.
            </p>
          </div>

          {/* SI NO LLEGA EL CORREO */}
          <div className="mt-8 rounded-3xl border border-navy/10 bg-white p-6 md:p-8">
            <h2 className="text-navy">¿No te llegó el correo?</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>· Revisa las carpetas de spam, promociones y notificaciones.</li>
              <li>· Verifica que el correo que usaste en el checkout esté escrito correctamente.</li>
              <li>· Espera unos minutos: puede tardar hasta 15 minutos en llegar.</li>
              <li>
                · Si sigue sin aparecer, escríbenos a{" "}
                <a href={checkout.SUPPORT_URL} className="font-semibold text-teal underline underline-offset-4">
                  soporte
                </a>{" "}
                con el correo que usaste al pagar y te ayudamos a recuperar el acceso.
              </li>
            </ul>
          </div>

          {/* PRIMERA ACCIÓN 5 MIN */}
          <div className="mt-8 rounded-3xl bg-navy p-6 text-white shadow-elegant md:p-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal">
              Tu primera acción en 5 minutos
            </span>
            <h2 className="mt-3 text-white">Elige tu “contenido base” hoy</h2>
            <p className="mt-3 text-white/80">
              Abre YouTube o TikTok y elige <strong>un solo</strong> canal, creador o serie en inglés que ya te guste ver. Ese va a ser tu contenido base durante los primeros 7 días.
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-6 text-sm text-white/80">
              <li>Ve un clip de 1 a 2 minutos con subtítulos en inglés.</li>
              <li>Escoge <strong>una frase</strong> que puedas imaginarte usando en tu vida real.</li>
              <li>Repítela en voz alta 5 veces intentando imitar el ritmo del hablante.</li>
            </ol>
            <p className="mt-4 text-sm text-white/70">
              Eso es todo por hoy. Mañana, en el ebook, retomas desde ahí.
            </p>
          </div>

          {/* Sin nueva venta si viene del upsell */}
          {origen !== "upsell" && (
            <p className="mt-10 text-center text-xs text-muted-foreground">
              ¿Preguntas antes de arrancar? Escríbenos a{" "}
              <a href={checkout.SUPPORT_URL} className="font-semibold text-navy underline underline-offset-4">
                soporte
              </a>
              . Estamos para ayudarte a comenzar.
            </p>
          )}

          <div className="mt-10 flex justify-center gap-4 text-xs text-muted-foreground">
            <Link to="/privacidad" className="hover:text-navy">Privacidad</Link>
            <span>·</span>
            <Link to="/terminos" className="hover:text-navy">Términos</Link>
            <span>·</span>
            <Link to="/contacto" className="hover:text-navy">Contacto</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
