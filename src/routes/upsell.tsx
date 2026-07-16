import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, ShieldCheck, Sparkles, MessageCircle, Bot, Mic, Zap } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { checkout, prices } from "@/config/funnel";
import { withUTMs } from "@/lib/utm";
import { track } from "@/lib/analytics";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect } from "react";

export const Route = createFileRoute("/upsell")({
  head: () => ({
    meta: [
      { title: "Reto VIP YouTalk AI — Habla con ChatGPT hoy mismo" },
      { name: "description", content: "Activa tu compañero de práctica con IA para hablar inglés desde hoy. Complemento del Método YouTalk 21." },
      { name: "robots", content: "noindex" },
      { property: "og:url", content: "/upsell" },
    ],
    links: [{ rel: "canonical", href: "/upsell" }],
  }),
  component: UpsellPage,
});

function UpsellPage() {
  useEffect(() => { track("UpsellView", { product: "youtalk-ai" }); }, []);
  const href = withUTMs(checkout.HOTMART_UPSELL_URL);

  return (
    <SiteLayout pageName="upsell" hideNav>
      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-4 py-14 md:px-6 md:py-20">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-coral/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-coral">
              <Sparkles className="h-3.5 w-3.5" /> Oferta única postcompra
            </span>
            <p className="text-sm font-semibold uppercase tracking-widest text-teal">
              ¡Felicidades! Ya tienes el mapa.
            </p>
            <h1 className="text-navy">
              Ahora activa tu <span className="text-teal">compañero de práctica</span>
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Convierte ChatGPT en tu compañero de conversación y practica hoy mismo, sin depender de un intercambio ni de una clase agendada.
            </p>
            <div className="mt-6 grid w-full items-center gap-6 md:grid-cols-[1fr_0.55fr]">
              <img
                src="/images/mockup-youtalk-ai.png"
                alt="Mockup premium del Reto VIP YouTalk AI"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="mx-auto h-auto w-full max-w-lg object-contain drop-shadow-2xl"
              />
              <div className="rounded-2xl border border-navy/10 bg-white/70 p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-coral">Ya adquirido</p>
                <img
                  src="/images/mockup-metodo-youtalk21.png"
                  alt="Método YouTalk 21 adquirido antes de esta oferta"
                  loading="lazy"
                  decoding="async"
                  className="mx-auto mt-3 h-auto w-full max-w-48 object-contain"
                />
                <p className="mt-2 text-xs text-muted-foreground">YouTalk AI complementa el método que ya compraste.</p>
              </div>
            </div>
          </div>

          {/* GAP */}
          <div className="mt-12 rounded-2xl border border-navy/10 bg-white p-6 shadow-card md:p-8">
            <h2 className="text-navy">Leer ayuda. Hablar requiere producir.</h2>
            <p className="mt-3 text-muted-foreground">
              El Método YouTalk 21 te da la ruta y el mapa. Pero para pasar de entender a responder necesitas un espacio seguro donde producir frases, recibir respuestas y practicar en voz alta cuantas veces quieras. Un tutor real es ideal, y también costoso y difícil de agendar. La IA te da un espacio disponible 24/7, sin juicio, para que la práctica se vuelva parte de tu día.
            </p>
          </div>

          {/* INCLUYE */}
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              { Icon: Bot, t: "Prompts maestros", d: "Copiar, pegar y practicar: escenarios diseñados para forzar tu producción oral y escrita." },
              { Icon: Zap, t: "Configuración paso a paso", d: "Cómo dejar ChatGPT listo en tu móvil para practicar en 60 segundos, sin conocimientos técnicos." },
              { Icon: Mic, t: "Ejercicios de audio y voz", d: "Guías de shadowing y práctica hablada usando la función de voz para entrenar pronunciación y ritmo." },
              { Icon: MessageCircle, t: "Escenarios reales", d: "Entrevistas, viajes, atención al cliente, familia y trabajo: 20+ situaciones adaptables." },
            ].map((f) => (
              <div key={f.t} className="rounded-2xl bg-white p-6 shadow-card">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal/20 text-navy">
                  <f.Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-navy">{f.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
              </div>
            ))}
            <div className="rounded-2xl bg-navy p-6 text-white md:col-span-2">
              <h3 className="text-white">Plan de 21 días con IA</h3>
              <p className="mt-2 text-sm text-white/80">
                Un calendario para combinar YouTalk 21 con tu compañero de práctica: qué escuchar, qué imitar y qué conversar cada día para no quedarte en la teoría.
              </p>
            </div>
          </div>

          <p className="mt-6 rounded-xl border border-navy/10 bg-white/70 p-4 text-center text-sm text-muted-foreground">
            La IA no sustituye a un profesor. Es tu compañero de práctica para producir más y perder el miedo a hablar.
          </p>

          {/* OFERTA */}
          <div className="mt-12 rounded-3xl bg-navy p-8 text-center text-white shadow-elegant">
            <img
              src="/images/mockup-stack-completo-youtalk21.png"
              alt="Ecosistema YouTalk 21 con el complemento YouTalk AI"
              loading="lazy"
              decoding="async"
              className="mx-auto mb-6 h-auto w-full max-w-2xl object-contain drop-shadow-2xl"
            />
            <p className="text-xs uppercase tracking-widest text-teal">Reto VIP YouTalk AI</p>
            <h2 className="mt-2 text-white">Habla con ChatGPT hoy mismo</h2>
            <p className="mt-3 text-white/70">Complemento único al Método YouTalk 21.</p>
            <p className="mt-6 text-5xl font-black">${prices.upsellUSD} <span className="text-lg font-semibold text-white/70">USD</span></p>
            <p className="mt-1 text-xs text-white/60">Pago único · sin suscripción</p>
            <p className="mx-auto mt-3 max-w-xl text-xs text-white/60">
              Este botón agrega únicamente el Reto VIP YouTalk AI por ${prices.upsellUSD} USD. El método principal ya fue adquirido; los demás productos del ecosistema no se agregan con esta compra.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3">
              <a
                href={href}
                onClick={() => track("UpsellAccept", { product: "youtalk-ai", price: prices.upsellUSD })}
                className="inline-flex w-full max-w-md items-center justify-center gap-2 rounded-2xl bg-teal px-6 py-4 text-base font-bold uppercase tracking-wide text-teal-foreground shadow-elegant transition-transform hover:-translate-y-0.5"
              >
                Sí, quiero activar YouTalk AI por ${prices.upsellUSD} USD
                <ArrowRight className="h-5 w-5" />
              </a>
              <p className="flex items-center gap-1.5 text-xs text-white/60">
                <ShieldCheck className="h-4 w-4 text-teal" />
                Pago seguro procesado por Hotmart · Garantía según condiciones de Hotmart.
              </p>
              <Link
                to="/gracias"
                className="mt-2 text-sm text-white/70 underline underline-offset-4 hover:text-white"
              >
                No, prefiero practicar por mi cuenta
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Esta condición se presenta como complemento una sola vez después de tu compra. No hay cuenta regresiva; si cierras esta página, el complemento deja de estar disponible en este flujo.
          </p>

          {/* FAQ */}
          <div className="mt-14">
            <h2 className="text-center text-navy">Preguntas rápidas</h2>
            <Accordion type="single" collapsible className="mt-6 rounded-2xl bg-white p-2 shadow-card">
              {[
                { q: "¿Necesito una cuenta de ChatGPT de pago?", a: "Muchos ejercicios funcionan en la versión gratuita. La función de voz y respuestas más avanzadas suele estar en el plan de pago de ChatGPT, que se contrata por separado con OpenAI." },
                { q: "¿La IA reemplaza a un profesor?", a: "No. Es un compañero de práctica disponible 24/7 para producir más. Un profesor sigue siendo valioso para corrección y feedback humano cuando lo necesites." },
                { q: "¿Cómo recibo el material?", a: "Después de tu compra, el acceso se envía por correo desde Hotmart. Recibes los prompts, la guía de configuración y el plan de 21 días en formato digital." },
                { q: "¿Cómo funciona la garantía?", a: "La solicitud de reembolso se gestiona conforme a las condiciones de Hotmart, dentro de los primeros 7 días desde tu compra." },
              ].map((f, i) => (
                <AccordionItem key={i} value={`u-${i}`} className="border-b last:border-0">
                  <AccordionTrigger className="px-3 text-left text-navy">{f.q}</AccordionTrigger>
                  <AccordionContent className="px-3 text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
