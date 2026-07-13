# Domina el Inglés Ahora — Guía del embudo

Sitio multipágina construido con TanStack Start, Tailwind v4 y shadcn/ui.

## Mapa del embudo

```text
        Instagram / TikTok / YouTube / Facebook
                       │
                       ▼
                    /  (Home)
                       │
        ┌──────────────┼──────────────────────┐
        ▼              ▼                       ▼
  /leadmagnet     /ebook-sale               /evergreen
   (opt-in)      (sales page)          (webinar evergreen)
        │              │                       │
        ▼              ▼                       ▼
 /gracias-recurso   Hotmart checkout      Confirmación clase
        │              │
        ▼              ▼
  /ebook-sale     /upsell  ──── no ────►  /downsell
                     │
                    sí
                     ▼
                Hotmart upsell

  Ruta interna: /checkout-preview  (visualización de order bumps)
  Complemento futuro: /reto-21-dias (lista de espera)
```

## Configuración central

Toda la configuración comercial vive en `src/config/funnel.ts`:

- `prices.ebookUSD` — precio provisional del ebook (USD $11 por defecto).
- `hotmart.*` — URLs de checkout (reemplazar los placeholders).
- `bonuses.*` — activar/desactivar bonos incluidos.
- `orderBumps` — bumps para `/checkout-preview` (precios opcionales).
- `evergreenSchedule` — horarios base de la clase evergreen.
- `analyticsIds` — Meta Pixel y GA4 (vacíos hasta obtener IDs reales).

Variables de entorno soportadas (opcional):

- `VITE_META_PIXEL_ID`
- `VITE_GA4_ID`

## Integración con Hotmart

1. Crea el producto en Hotmart y copia la URL de checkout en `hotmart.ebookCheckoutURL`.
2. Repite para el upsell (`upsellCheckoutURL`) y downsell (`downsellCheckoutURL`).
3. Los **order bumps** en Hotmart deben configurarse dentro del panel del producto.
   La ruta `/checkout-preview` es solo visualización interna; no reemplaza la configuración real.
4. UTMs se preservan automáticamente vía `src/lib/utm.ts` (helper `withUTMs`).

## Adaptador de leads

`src/lib/lead-adapter.ts` guarda los envíos en `localStorage`. Para conectar
Brevo / MailerLite / ConvertKit / Make, sustituye el cuerpo de `submitLead`
por un `fetch` al proveedor. Preferentemente mueve la API key a una server
function para no exponerla al cliente.

## Analítica

`src/lib/analytics.ts` expone `track(event, params)`. Eventos usados:

- `ViewContent` — cada carga de página.
- `ViewVSL` — vista del video.
- `Lead` — envío del lead magnet / lista de espera.
- `CompleteRegistration` — clase evergreen o thank-you.
- `InitiateCheckout` — clic hacia Hotmart.
- `UpsellView`, `UpsellAccept` — página postcompra.
- `Purchase` — **solo disparar desde confirmación real futura** (webhook Hotmart o thank-you tras retorno verificado).

## A/B test de hero

Añade `?variant=b` a `/` para servir la variante alternativa del hero.
No requiere sistema externo.

## Dominios y subdominios recomendados

- **Sitio principal**: `dominaelinglesahora.lat` (raíz).
  Mantén todo el embudo aquí para continuidad y mejor atribución analítica.
- **Reservados para el futuro**:
  - `app.dominaelinglesahora.lat` — cuando exista aplicación con login.
  - `comunidad.dominaelinglesahora.lat` — foro / Discord embed.
  - `academia.dominaelinglesahora.lat` — LMS o plataforma de cursos.

## Checklist antes de publicar

- [ ] Reemplazar URLs `PLACEHOLDER_*` en `src/config/funnel.ts`.
- [ ] Definir precio final en `prices.ebookUSD` (si cambia el provisional).
- [ ] Definir precios de los `orderBumps` (o dejarlos en `null` mientras no aplique).
- [ ] Agregar `VITE_META_PIXEL_ID` y `VITE_GA4_ID`.
- [ ] Cargar Meta Pixel y GA4 en `src/routes/__root.tsx` (script) una vez que los IDs existan.
- [ ] Revisar textos legales en `/privacidad` y `/terminos` con asesor.
- [ ] Verificar que los handles sociales apunten a las cuentas reales.
- [ ] Configurar order bumps reales dentro de Hotmart.
- [ ] Reemplazar player placeholder en `/vsl` por el embed real.
- [ ] Publicar sitemap en `dominaelinglesahora.lat/sitemap.xml`.
- [ ] Verificar `robots.txt` en producción.
