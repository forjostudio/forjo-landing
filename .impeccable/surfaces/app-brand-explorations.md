---
version: 1
slug: "app-brand-explorations"
primary_target: "app/brand-explorations"
related_targets: []
---

## Scope

Ruta aislada `/brand-explorations/[a|b|c]` para comparar tres evoluciones visuales de la landing (mode: Persuade). No reemplaza la web productiva. 404 en producción (VERCEL_ENV=production), visible en local y previews, siempre noindex.

## Audience and job

Mismo público de la landing (dueños de negocios chicos, llegan por el celular). La ruta la evalúa el dueño del estudio para decidir una futura actualización.

## Constraints (brief-pinned)

Paleta exacta (#1A1815, #F0E9D8, #D94A2B, #2F5CB0, #F2C744), lockups oficiales sin redibujar, Bricolage Grotesque (titulares) + Sora (cuerpo/UI) + Geist Mono (etiquetas, precios, metadatos). Contenido real de `getContent()`. Modo claro y oscuro. El naranja solo lleva texto a 24px o más (3.48:1 sobre crema, 4.17:1 sobre tinta).

## Direction contract

THESIS: Tres lecturas de la misma marca Bauhaus, pinned por el brief. A Technical Bold: plano técnico, ingeniería y confianza. B Creative Brutalism: afiche Bauhaus, tipografía enorme contra formas primarias. C Digital Engineering: hoja de especificación modular con códigos e índices.
OWN-WORLD: tinta y crema como suelos alternados, naranja como único acento fuerte, azul y amarillo solo en figuras; Bricolage 800 con opsz, Sora para leer, Geist Mono para datos.
STORY: qué vende Forjo, a qué precio, quién lo hace, cómo escribir.
FIRST VIEWPORT: A titular a 7 columnas + dibujo de construcción geométrica acotado; B titular gigante cuyo final se monta sobre el cuadrado naranja (desde 1024px; en celular las figuras van debajo del CTA); C titular + índice de servicios con precios como navegación.
FORM: brief-pinned (tres direcciones fijadas por el brief del usuario; no se corrió concept-seed). seed: none (brief-pinned, no roll)
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Editorial brutalism (copias -eb)

Pedido del usuario: dirección transversal "Editorial Brutalism" aplicada a copias de A, B y C sin descartar las originales. Rutas `/brand-explorations/a-eb`, `b-eb`, `c-eb`; la barra tiene un interruptor Editorial.
- Transversal (editorial.tsx/.css): titulares por líneas con entrada desde máscara, entrada de bloques con scroll timeline (progresiva), subrayado que crece, guías de columna visibles, geometría del logo por partes (brazo naranja + punto amarillo, trapecio azul a 45°) sin armar la F. Naranja solo en intervenciones de alto impacto.
- A-eb: grilla suiza de 12 columnas sin gap con sangría de 12px, titular con segunda línea sangrada, figura que sale por el borde, contacto como banda naranja a todo el ancho.
- B-eb: mayúsculas, bloque naranja (columnas 9-12 + sangrado) que el titular atraviesa; todos los tonos del titular pasan a color de texto con subrayado; barras de 10px y reglas de 4px; figuras que rompen la barra de apertura; cuadrado naranja que rompe el borde del contacto.
- C-eb: manual técnico; regla de 12 columnas, índice de secciones y servicios como portada, cabezal que sigue la sección (IntersectionObserver) con barra de avance (scroll timeline), números de sección gigantes que salen del marco, trapecio azul que une las etapas.

## Boceto final (/brand-explorations/final)

Decisión del usuario: mezcla de A y B, sin editorial. Header, hero y banda de B (hero + banda = alto de pantalla; figuras dimensionadas con unidades de contenedor); servicios, proceso y nosotros de A; trabajo de B con título de sección de A; contacto de B con titular en estilo A; pie de A con créditos de B. Títulos de sección: estilo A en todas. Ajustes de contenido solo en el boceto (bocetoContent): Sitios web "Desde $180.000 · según alcance · efectivo o transferencia" sin precio tachado; Software a medida con "Cotización según proyecto" en la descripción y botón Cotizar; Nosotros sin el dato 0% (el 0% vale solo para efectivo/transferencia).
