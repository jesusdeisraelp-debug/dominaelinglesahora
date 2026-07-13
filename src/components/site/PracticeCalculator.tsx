import { useState } from "react";
import { Slider } from "@/components/ui/slider";

export function PracticeCalculator() {
  const [minutes, setMinutes] = useState(30);
  const total = minutes * 21;
  const hours = Math.floor(total / 60);
  const rest = total % 60;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <h3 className="text-lg font-semibold text-foreground">
        ¿Cuánto entrenarías en 21 días?
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Ajusta los minutos que ya inviertes viendo YouTube o TikTok y conviértelos en práctica real.
      </p>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Minutos diarios</span>
        <span className="text-2xl font-bold text-electric">{minutes}</span>
      </div>
      <Slider
        aria-label="Minutos diarios"
        value={[minutes]}
        onValueChange={(v) => setMinutes(v[0] ?? 30)}
        min={5}
        max={120}
        step={5}
        className="mt-3"
      />

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-muted p-4">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">En 21 días</div>
          <div className="mt-1 text-2xl font-bold text-foreground">
            {hours}h {rest > 0 ? `${rest}m` : ""}
          </div>
        </div>
        <div className="rounded-xl bg-gradient-accent p-4 text-white">
          <div className="text-xs uppercase tracking-wide opacity-80">Sesiones</div>
          <div className="mt-1 text-2xl font-bold">21</div>
        </div>
      </div>
    </div>
  );
}
