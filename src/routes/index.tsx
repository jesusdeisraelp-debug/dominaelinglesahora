import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { SalesPage } from "@/components/site/SalesPage";
import { checkout } from "@/config/funnel";
import { withUTMs } from "@/lib/utm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Método YouTalk 21 — Convierte YouTube y TikTok en tu práctica diaria de inglés" },
      {
        name: "description",
        content:
          "Rutina práctica de inglés en 21 días con 15–30 min al día usando el contenido que ya consumes. Método YouTalk 21 por $17 USD.",
      },
      { property: "og:title", content: "Método YouTalk 21 — Habla inglés practicando 15 minutos al día" },
      { property: "og:description", content: "Convierte YouTube, TikTok y series en tu práctica diaria de inglés durante 21 días." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout
      pageName="sales-home"
      minimalHeader
      showMobileCta
      mobileCtaHref={withUTMs(checkout.HOTMART_MAIN_URL)}
    >
      <SalesPage />
    </SiteLayout>
  );
}
