import { useEffect, useState, type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileCTA } from "./MobileCTA";
import { CookieNotice } from "./CookieNotice";
import { captureUTMs } from "@/lib/utm";
import { track } from "@/lib/analytics";

type Props = {
  children: ReactNode;
  mobileCtaHref?: string;
  mobileCtaLabel?: string;
  showMobileCta?: boolean;
  hideNav?: boolean;
  minimalHeader?: boolean;
  pageName?: string;
};

export function SiteLayout({
  children,
  mobileCtaHref,
  mobileCtaLabel,
  showMobileCta = false,
  hideNav,
  minimalHeader,
  pageName,
}: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    captureUTMs();
    if (pageName) track("ViewContent", { page: pageName });
  }, [pageName]);

  useEffect(() => {
    if (!showMobileCta) return;
    const onScroll = () => setScrolled(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [showMobileCta]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {!hideNav && <Header minimal={minimalHeader} />}
      <main className="flex-1">{children}</main>
      <Footer />
      {showMobileCta && scrolled && mobileCtaHref && (
        <MobileCTA href={mobileCtaHref} label={mobileCtaLabel} />
      )}
      <CookieNotice />
      {showMobileCta && <div className="h-20 md:hidden" aria-hidden />}
    </div>
  );
}
