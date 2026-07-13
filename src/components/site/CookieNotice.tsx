import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const KEY = "dea_cookie_ok";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      /* noop */
    }
  }, []);
  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed inset-x-2 bottom-24 z-40 mx-auto max-w-3xl rounded-xl border border-border bg-card p-4 shadow-elegant md:bottom-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Usamos cookies para mejorar tu experiencia y medir el rendimiento del sitio.
          Puedes leer más en nuestra política de privacidad.
        </p>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              try { localStorage.setItem(KEY, "dismissed"); } catch { /* noop */ }
              setVisible(false);
            }}
          >
            Rechazar
          </Button>
          <Button
            size="sm"
            className="bg-electric text-electric-foreground hover:opacity-90"
            onClick={() => {
              try { localStorage.setItem(KEY, "accepted"); } catch { /* noop */ }
              setVisible(false);
            }}
          >
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  );
}
