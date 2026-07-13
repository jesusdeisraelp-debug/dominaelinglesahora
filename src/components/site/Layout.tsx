import { useEffect, type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileCTA } from "./MobileCTA";
import { CookieNotice } from "./CookieNotice";
import { captureUTMs } from "@/lib/utm";
import { track } from "@/lib/analytics";

type Props = {
  children: ReactNode;
  mobileCta?: { to?: string; label?: string } | false;
  hideNav?: boolean;
  pageName?: string;
};

export function SiteLayout({ children, mobileCta, hideNav, pageName }: Props) {
  useEffect(() => {
    captureUTMs();
    if (pageName) track("ViewContent", { page: pageName });
  }, [pageName]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {!hideNav && <Header />}
      <main className="flex-1">{children}</main>
      <Footer />
      {mobileCta !== false && <MobileCTA {...(mobileCta ?? {})} />}
      <CookieNotice />
      {mobileCta !== false && <div className="h-20 md:hidden" aria-hidden />}
    </div>
  );
}
