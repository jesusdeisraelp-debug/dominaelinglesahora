import { Link } from "@tanstack/react-router";
import { brand, checkout } from "@/config/funnel";

export function Header({ minimal = false }: { minimal?: boolean }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight text-foreground">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-navy text-sm font-bold text-white">
            Y
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">{brand.name}</span>
            <span className="text-sm font-bold text-navy">{brand.product}</span>
          </span>
        </Link>

        {!minimal && (
          <a
            href={checkout.HOTMART_MAIN_URL}
            className="hidden rounded-full bg-teal px-4 py-2 text-sm font-semibold text-teal-foreground shadow-soft transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Comprar por $17 USD
          </a>
        )}
      </div>
    </header>
  );
}
