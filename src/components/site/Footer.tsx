import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Music2, Mail } from "lucide-react";
import { brand, social } from "@/config/funnel";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border/60 bg-night text-night-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-accent text-sm font-bold text-white">
              D
            </span>
            <span className="text-lg font-semibold">{brand.name}</span>
          </div>
          <p className="mt-4 max-w-md text-sm text-white/70">{brand.tagline}</p>
          <div className="mt-6 flex items-center gap-3">
            <a href={social.instagram.url} aria-label="Instagram" className="rounded-md p-2 text-white/80 hover:bg-white/10 hover:text-white">
              <Instagram className="h-5 w-5" />
            </a>
            <a href={social.facebook.url} aria-label="Facebook" className="rounded-md p-2 text-white/80 hover:bg-white/10 hover:text-white">
              <Facebook className="h-5 w-5" />
            </a>
            <a href={social.tiktok.url} aria-label="TikTok" className="rounded-md p-2 text-white/80 hover:bg-white/10 hover:text-white">
              <Music2 className="h-5 w-5" />
            </a>
            <a href={social.youtube.url} aria-label="YouTube" className="rounded-md p-2 text-white/80 hover:bg-white/10 hover:text-white">
              <Youtube className="h-5 w-5" />
            </a>
            <a href={`mailto:${social.email}`} aria-label="Correo" className="rounded-md p-2 text-white/80 hover:bg-white/10 hover:text-white">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">Explorar</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/ebook-sale" className="text-white/80 hover:text-white">Método INMERSIÓN 21</Link></li>
            <li><Link to="/vsl" className="text-white/80 hover:text-white">Video explicativo</Link></li>
            <li><Link to="/evergreen" className="text-white/80 hover:text-white">Clase gratis</Link></li>
            <li><Link to="/reto-21-dias" className="text-white/80 hover:text-white">Reto 21 días</Link></li>
            <li><Link to="/recursos" className="text-white/80 hover:text-white">Recursos</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">Legal</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/privacidad" className="text-white/80 hover:text-white">Privacidad</Link></li>
            <li><Link to="/terminos" className="text-white/80 hover:text-white">Términos</Link></li>
            <li><Link to="/contacto" className="text-white/80 hover:text-white">Contacto</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-4 py-6 text-xs text-white/60 md:flex-row md:items-center md:px-6">
          <p>© {year} {brand.name}. Todos los derechos reservados.</p>
          <p>Hecho con dedicación en México · {brand.domain}</p>
        </div>
      </div>
    </footer>
  );
}
