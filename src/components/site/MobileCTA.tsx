import { ArrowRight } from "lucide-react";

/**
 * Barra CTA persistente para móvil. Se activa después del primer scroll.
 */
export function MobileCTA({
  href,
  label = "Comenzar YouTalk 21 · $17 USD",
}: {
  href: string;
  label?: string;
}) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 p-3 md:hidden">
      <a
        href={href}
        className="pointer-events-auto flex items-center justify-between gap-3 rounded-2xl bg-teal px-4 py-3 text-sm font-semibold text-teal-foreground shadow-elegant"
      >
        <span className="truncate">{label}</span>
        <ArrowRight className="h-4 w-4 shrink-0" />
      </a>
    </div>
  );
}
