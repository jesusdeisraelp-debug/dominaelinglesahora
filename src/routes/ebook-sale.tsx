import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { SalesPage } from "@/components/site/SalesPage";
import { checkout } from "@/config/funnel";
import { withUTMs } from "@/lib/utm";

export const Route = createFileRoute("/ebook-sale")({
  head: () => ({
    meta: [
      { title: "Método YouTalk 21 — Práctica real de inglés en 21 días" },
      {
        name: "description",
        content:
          "Convierte el contenido que ya consumes en una rutina práctica de inglés en 21 días. Método YouTalk 21 por $17 USD.",
      },
      { property: "og:title", content: "Método YouTalk 21 — $17 USD" },
      { property: "og:description", content: "15–30 minutos al día usando YouTube, TikTok y series para pasar de entender a hablar." },
      { property: "og:url", content: "/ebook-sale" },
    ],
    links: [{ rel: "canonical", href: "/ebook-sale" }],
  }),
  component: EbookSale,
});

function EbookSale() {
  return (
    <SiteLayout
      pageName="ebook-sale"
      minimalHeader
      showMobileCta
      mobileCtaHref={withUTMs(checkout.HOTMART_MAIN_URL)}
    >
      <SalesPage />
    </SiteLayout>
  );
}
