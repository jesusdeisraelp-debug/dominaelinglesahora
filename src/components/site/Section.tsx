import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Section({
  children,
  className,
  as: Tag = "section",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: "section" | "div" | "header";
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Tag className={cn("mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20", className)} {...rest}>
      {children}
    </Tag>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-electric">
      {children}
    </span>
  );
}
