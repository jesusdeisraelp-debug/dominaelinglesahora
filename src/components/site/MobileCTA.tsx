import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

/**
 * Barra CTA persistente para móvil. Aparece en páginas de conversión.
 */
export function MobileCTA({
  to = "/ebook-sale",
  label = "Quiero empezar mi práctica de 21 días",
}: {
  to?: string;
  label?: string;
}) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 p-3 md:hidden">
      <Link
        to={to}
        className="pointer-events-auto flex items-center justify-between gap-3 rounded-xl bg-electric px-4 py-3 text-sm font-semibold text-electric-foreground shadow-elegant"
      >
        <span className="truncate">{label}</span>
        <ArrowRight className="h-4 w-4 shrink-0" />
      </Link>
    </div>
  );
}
