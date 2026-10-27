# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Principal:** dueños de negocios chicos de Argentina: profesionales (estética, salud, consultorios), emprendedores, comercios y gastronómicos. Llegan casi siempre desde Instagram o WhatsApp, con el celular. Quieren entender rápido qué vende Forjo, cuánto cuesta y cómo escribir.
- **Secundario:** empresas medianas que buscan software a medida (dashboards, CRMs, herramientas internas, integraciones). Necesitan ver que detrás hay alguien serio que entrega.

## Product Purpose

forjo.studio es la landing de **Forjo Studio**, un estudio web independiente de Buenos Aires (est. 2025). Presenta los productos propios y los servicios con precios publicados, y lleva al visitante a contactar. Éxito = un mensaje por WhatsApp o un formulario enviado (cae en /admin/mensajes).

Lo que se ofrece:

- **Forjo Gestión** (gestion.forjo.studio): turnos y gestión para profesionales, con seña por MercadoPago y Google Calendar. Planes mensuales por cantidad de profesionales.
- **Forjo Tiendas** (tiendas.forjo.studio): catálogos online con pedidos por WhatsApp y sistema para gastronómicos, sin comisión por venta. Dos planes.
- **Tienda Nube:** configuración o diseño de la tienda para dejarla lista para vender.
- **Sitios web** a medida, precio cerrado + mantenimiento mensual.
- **Software a medida**, cotizado por proyecto.

## Positioning

Estudio chico y de autor: hablás con quien construye, código a medida sin plantillas, precios publicados y presupuesto cerrado, entregas rápidas. Tiene productos propios (Gestión, Tiendas) además de servicios, y las tiendas no cobran comisión sobre las ventas.

## Operating Context

- El contenido de la landing se edita desde el panel (/admin/editar) con vista previa en vivo; se guarda en Supabase (`landing_content`). Cualquier texto, lista o precio puede cambiar de largo o cantidad sin tocar código, y las secciones Marquesina, Servicios, Proceso, Trabajo y Nosotros se pueden ocultar.
- Los precios se ajustan seguido (inflación). Los botones de los planes llevan a WhatsApp.
- Deploy automático en Vercel desde `main`.

## Capabilities and Constraints

- Next.js 15 (App Router) + React 19, CSS propio en `app/globals.css` (sin Tailwind), next/image para capturas.
- Fuentes: Archivo (títulos), Space Grotesk (cuerpo), JetBrains Mono (datos y detalles).
- Formulario de contacto propio (server action) + botón flotante de WhatsApp.
- Sin blog, guías, cotizador ni FAQ por ahora.

## Brand Commitments

- Identidad Bauhaus: formas primarias (cuadrado, círculo, triángulo) y acentos primarios. Acento canónico `#D94A2B`; azul y amarillo como secundarios. La landing usa la versión dark (tinta) con crema.
- Nunca redibujar ni aproximar el logo: usar los lockups oficiales de la carpeta MARCA.
- Voz: directa, concreta, argentina con voseo, cercana sin ser informal de más, honesta y sin humo. Sin clichés de IA ("solución integral", "llevá tu negocio al siguiente nivel"). En la web, sin "¿" ni "¡" de apertura y sin frases defensivas. Metáfora "forjar" con moderación.
- Forjo Studio es la empresa; Forjo Gestión y Forjo Tiendas son productos debajo.

## Evidence on Hand

- Casos reales en Trabajo: **AGUALABOCA** (Forjo Tiendas, `public/agualaboca.png`) y **JOTALAB** (Forjo Gestión, `public/jjotalab.png`).
- Datos de Nosotros: arrancó en 2025, 2 productos propios, ~72 hs de entrega promedio de una web, 0% de comisión en tiendas.
- No hay testimonios, logos de clientes, prensa ni métricas de terceros: no inventarlos.

## Product Principles

1. Que en el primer scroll quede claro qué se vende, a quién y cómo escribir.
2. Precios a la vista y sin letra chica: si hay condición (efectivo, alta, setup), se dice al lado del precio.
3. Mobile primero: el visitante llega desde Instagram o WhatsApp en el celular.
4. Todo lo que se ve tiene que aguantar contenido editado desde el panel: textos más largos, más o menos ítems, secciones ocultas.
5. Mostrar trabajo real antes que afirmar cosas.
