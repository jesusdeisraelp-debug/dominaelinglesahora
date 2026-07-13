import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type OrderBump = {
  id: string;
  name: string;
  description: string;
  priceUSD: number | null;
  enabled: boolean;
};

type Props = {
  bump: OrderBump;
  selected?: boolean;
  onToggle?: (id: string) => void;
};

/**
 * OrderBumpCard: presentación reutilizable de un order bump.
 * Los precios se ocultan mientras `priceUSD` sea null.
 */
export function OrderBumpCard({ bump, selected = false, onToggle }: Props) {
  if (!bump.enabled) return null;
  return (
    <label
      className={cn(
        "block cursor-pointer rounded-2xl border-2 bg-card p-5 transition-all",
        selected
          ? "border-electric shadow-elegant"
          : "border-border hover:border-electric/50",
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "mt-1 grid h-5 w-5 shrink-0 place-items-center rounded border-2 transition-colors",
            selected ? "border-electric bg-electric text-white" : "border-border bg-background",
          )}
          aria-hidden
        >
          {selected && <Check className="h-3.5 w-3.5" />}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <h4 className="font-semibold text-foreground">{bump.name}</h4>
            {bump.priceUSD !== null && (
              <span className="shrink-0 text-sm font-bold text-electric">
                +${bump.priceUSD} USD
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{bump.description}</p>
        </div>
      </div>
      <input
        type="checkbox"
        className="sr-only"
        checked={selected}
        onChange={() => onToggle?.(bump.id)}
      />
    </label>
  );
}
