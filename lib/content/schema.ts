// ============================================================
//  Contenido editable de la landing forjo.studio.
//  Fuente de verdad para el renderer (app/page.tsx) y el panel (/admin).
//  DEFAULT_CONTENT = el contenido actual exacto: si la DB está vacía, la
//  landing se ve igual que el HTML original.
// ============================================================

/** Segmento de título con formato editable. El texto va siempre; el resto es
 *  opcional y por defecto reproduce el diseño original. */
export interface StyledSeg {
  text: string
  color?: string // hex de la paleta (PALETTE); vacío = color heredado del título
  bold?: boolean
  italic?: boolean
  underline?: boolean
  size?: number // factor em relativo al título (1 = default). Ej: 1.2 = 20% más grande
}

/** Paleta de la marca (colores preseteados para los títulos). */
export const PALETTE: { name: string; value: string }[] = [
  { name: 'Crema', value: '#f3ead8' },
  { name: 'Naranja', value: '#d94a2b' },
  { name: 'Azul', value: '#7aa6d6' },
  { name: 'Amarillo', value: '#f4c543' },
  { name: 'Apagado', value: '#a39989' },
]

export interface Plan {
  name: string
  priceOld: string // precio tachado (vacío = no se muestra)
  price: string
  unit: string
  setup: string // línea chica bajo el precio (público, cuotas, alta)
  badge: string
  featured: boolean
  features: string[]
  ctaLabel: string
  ctaHref: string
}

export interface Addon {
  name: string
  desc: string
}

/** Un producto o servicio de la sección Servicios. Todos comparten la misma
 *  forma: con planes se muestra como bloque con grilla de planes; sin planes,
 *  como tarjeta simple con precio. Los campos vacíos no se renderizan. */
export interface ServiceItem {
  kicker: string // va junto al índice automático (ej. "Forjo Gestión")
  title: string // admite salto de línea
  desc: string
  tags: string[]
  wide: boolean // ocupa el ancho completo de la grilla
  plans: Plan[]
  note: string
  includedLabel: string
  included: string[]
  addonsLabel: string
  addons: Addon[]
  priceOld: string
  price: string
  priceNote: string
  footnote: string // letra chica al pie; admite salto de línea
  ctaLabel: string
  ctaHref: string
}

export interface Project {
  name: string
  cat: string
  year: string
  url: string
  thumb: string
  demoLabel: string
}

export interface Stat {
  key: string
  val: string
}

export interface FooterCol {
  title: string
  links: { label: string; href: string }[]
}

/** Versión de la forma del contenido. Si lo guardado en DB es de una versión
 *  anterior, lib/content/get.ts lo migra (ver migrate). */
export const CONTENT_VERSION = 2

export interface LandingContent {
  schemaVersion: number
  seo: {
    title: string
    description: string
    ogTitle: string
    ogDescription: string
    ogImage: string
  }
  nav: { links: { label: string; href: string }[]; ctaLabel: string; ctaHref: string }
  hero: {
    kicker: string
    headlinePre: StyledSeg
    headlineAccent: StyledSeg
    headlineMid: StyledSeg
    headlineEm: StyledSeg
    headlinePost: StyledSeg
    sub: string
    ctaPrimaryLabel: string
    ctaPrimaryHref: string
    ctaSecondaryLabel: string
    ctaSecondaryHref: string
  }
  marquee: string[]
  services: {
    kicker: string
    title: string
    intro: string
    items: ServiceItem[]
  }
  process: {
    kicker: string
    title: string
    intro: string
    steps: { meta: string; title: string; desc: string }[]
  }
  work: {
    kicker: string
    title: string
    allLabel: string
    allHref: string
    projects: Project[]
    placeholders: number
  }
  about: {
    kicker: string
    headlinePre: StyledSeg
    headlineMid: StyledSeg
    headlineEm: StyledSeg
    headlinePost: StyledSeg
    body: string[]
    stats: Stat[]
  }
  contact: {
    kicker: string
    headline1: StyledSeg
    headline2: StyledSeg
    sub: string
    boxLabel: string
    email: string
    whatsappLabel: string
    whatsappHref: string
    callLabel: string
    callHref: string
    formTitle: string
  }
  footer: {
    brandText: string
    cols: FooterCol[]
    copyright: string
    version: string
  }
}

export const DEFAULT_CONTENT: LandingContent = {
  schemaVersion: CONTENT_VERSION,
  seo: {
    title: 'Forjamos tu presencia en la web. — Forjo Studio',
    description:
      'Estudio web independiente. Diseño y desarrollo a medida para emprendedores, profesionales y marcas que necesitan más que un template.',
    ogTitle: 'Sitios web y sistemas a medida',
    ogDescription:
      'Estudio web independiente en Buenos Aires. Sistema de turnos, tiendas online, webs profesionales y software a medida.',
    ogImage: 'https://forjo.studio/og-image.jpg',
  },
  nav: {
    links: [
      { label: 'Servicios', href: '#servicios' },
      { label: 'Proceso', href: '#proceso' },
      { label: 'Trabajo', href: '#trabajo' },
      { label: 'Nosotros', href: '#nosotros' },
      { label: 'Ingresar', href: 'https://gestion.forjo.studio/login' },
    ],
    ctaLabel: 'Contacto',
    ctaHref: '#contacto',
  },
  hero: {
    kicker: '▶ estudio web · buenos aires · est. 2025',
    headlinePre: { text: 'Forjamos ' },
    headlineAccent: { text: 'ideas', color: '#d94a2b' },
    headlineMid: { text: 'que ' },
    headlineEm: { text: 'convierten', italic: true, color: '#7aa6d6' },
    headlinePost: { text: '.' },
    sub: 'Construimos el sistema que tu negocio necesita, la web que te representa o el software que todavía no existe.',
    ctaPrimaryLabel: 'Empecemos un proyecto →',
    ctaPrimaryHref: '#contacto',
    ctaSecondaryLabel: 'Ver trabajo',
    ctaSecondaryHref: '#trabajo',
  },
  marquee: [
    'Sistema de turnos',
    'Catálogos con pedidos por WhatsApp',
    'Tiendas en Tienda Nube',
    'Sitios institucionales',
    'Optimizaciones SEO',
    'Landing pages',
    'Software a medida',
    'Branding digital',
    'Hosting + dominio',
  ],
  services: {
    kicker: '◆ servicios',
    title: 'Lo que forjamos.',
    intro:
      'Productos listos para usar y desarrollos a medida. Cada proyecto arranca con una conversación sobre qué necesitás, qué no, y cuál es la forma más simple de llegar.',
    items: [
      {
        kicker: 'Forjo Gestión',
        title: 'Sistema de turnos\ny gestión integral',
        desc: 'Tus clientes reservan online y pagan la seña automáticamente; vos gestionás turnos, clientes y finanzas desde un solo panel de administración. Bajo tu dominio o el nuestro.',
        tags: [
          'Reservas online',
          'Panel de admin',
          'Gestión de clientes',
          'Control de finanzas',
          'MercadoPago',
          'Multi-profesional',
        ],
        wide: true,
        plans: [
          {
            name: 'Básico',
            priceOld: '',
            price: '$17.000',
            unit: '/mes',
            setup: '',
            badge: '1er mes gratis',
            featured: false,
            features: ['1 profesional', 'Soporte diario', '2 modificaciones por mes'],
            ctaLabel: 'Empezar →',
            ctaHref: 'https://gestion.forjo.studio/register?plan=basic',
          },
          {
            name: 'Estudio',
            priceOld: '',
            price: '$35.000',
            unit: '/mes',
            setup: '',
            badge: '1er mes gratis',
            featured: true,
            features: ['Hasta 5 profesionales', 'Soporte diario', '4 modificaciones por mes'],
            ctaLabel: 'Empezar →',
            ctaHref: 'https://gestion.forjo.studio/register?plan=studio',
          },
          {
            name: 'Pro',
            priceOld: '',
            price: '$60.000',
            unit: '/mes',
            setup: '',
            badge: '1er mes gratis',
            featured: false,
            features: [
              'Hasta 15 profesionales',
              'Soporte prioritario',
              '8 modificaciones por mes',
              'Web a medida incluida',
            ],
            ctaLabel: 'Empezar →',
            ctaHref: 'https://gestion.forjo.studio/register?plan=pro',
          },
        ],
        note: 'Un profesional = cada recurso que toma turnos: una persona, una cancha, una sala.',
        includedLabel: 'Todos los planes incluyen',
        included: [
          'Reservas online 24/7',
          'Cobro automático de seña',
          'Recordatorios',
          'Cupones y giftcards',
          'Integración con MercadoPago',
          'Integración con Google Calendar',
          'Dominio forjo.studio',
          'Onboarding',
        ],
        addonsLabel: 'Add-ons · suman a cualquier plan',
        addons: [
          {
            name: 'Web a medida',
            desc: 'Tu web profesional con diseño propio, conectada a tus turnos. En el plan Pro viene incluida.',
          },
          {
            name: 'Dominio propio',
            desc: 'Tu propio dominio (.com / .com.ar) en lugar del subdominio forjo.studio.',
          },
        ],
        priceOld: '',
        price: '',
        priceNote: '',
        footnote:
          'Pagás seguro con MercadoPago: tarjeta de crédito, débito o dinero en cuenta.\nPrimer mes gratis · sin tarjeta para empezar · cancelás cuando quieras.',
        ctaLabel: '',
        ctaHref: '',
      },
      {
        kicker: 'Forjo Tiendas',
        title: 'Catálogo online\ny pedidos por WhatsApp',
        desc: 'Tu carta o catálogo en línea, con tu marca. El cliente arma el pedido y te llega por WhatsApp ya escrito: el detalle, la dirección y cómo paga. Para gastronomía suma cocina, salón y delivery propio.',
        tags: [
          'Catálogo online',
          'Pedidos por WhatsApp',
          'Tablero de pedidos',
          'Cierre del día',
          'Delivery propio',
          'Sin comisiones por venta',
        ],
        wide: true,
        plans: [
          {
            name: 'Esencial',
            priceOld: '',
            price: '$35.000',
            unit: '/mes',
            setup: 'Para cualquier rubro',
            badge: '',
            featured: false,
            features: [
              'Tu catálogo en línea',
              'El pedido llega por WhatsApp ya escrito',
              'Tablero de pedidos',
              'Clientes y cupones',
              'Cierre del día e informes',
              'Una cuenta por persona, con sus permisos',
            ],
            ctaLabel: 'Quiero mi tienda →',
            ctaHref:
              'https://wa.me/5493487623630?text=Hola%20Forjo%2C%20quiero%20saber%20m%C3%A1s%20sobre%20Forjo%20Tiendas%20(plan%20Esencial)',
          },
          {
            name: 'Completo',
            priceOld: '',
            price: '$50.000',
            unit: '/mes',
            setup: 'Para gastronomía',
            badge: '',
            featured: true,
            features: [
              'Todo lo de Esencial, más:',
              'Pantalla de cocina',
              'Comandas y tickets impresos',
              'Salón: mesas y cuenta abierta',
              'Sistema para tu delivery propio',
              'Zonas de envío en el mapa',
              'Roles de mozo, cocina y repartidor',
            ],
            ctaLabel: 'Quiero mi tienda →',
            ctaHref:
              'https://wa.me/5493487623630?text=Hola%20Forjo%2C%20quiero%20saber%20m%C3%A1s%20sobre%20Forjo%20Tiendas%20(plan%20Completo)',
          },
        ],
        note: 'Alta desde $280.000, pago único: cargamos tu carta y hacemos un pedido de prueba antes de publicar. Pagando el año por adelantado, 15% menos.',
        includedLabel: 'Los dos incluyen',
        included: [
          'Alojamiento',
          'Tu dirección web',
          'Soporte por WhatsApp',
          'Las mejoras que vayan saliendo',
          '2 cambios por mes',
          'Mercado Pago, opcional',
        ],
        addonsLabel: '',
        addons: [],
        priceOld: '',
        price: '',
        priceNote: '',
        footnote:
          'Lo que vendés es tuyo: Forjo no se lleva un porcentaje. Si sumás Mercado Pago, la comisión es de ellos.\nNo emite facturas.',
        ctaLabel: 'Ver todas las características →',
        ctaHref: 'https://tiendas.forjo.studio/caracteristicas',
      },
      {
        kicker: 'Tienda Nube',
        title: 'Tu tienda en Tienda Nube,\nlista para vender',
        desc: 'Configuramos o diseñamos tu tienda en Tienda Nube para que vendas a todo el país, con pagos y envíos andando desde el primer día.',
        tags: ['Tienda Nube', 'Pagos y envíos', '30 productos cargados', 'Lista en 7 a 10 días'],
        wide: true,
        plans: [
          {
            name: 'Opción A · Tienda configurada',
            priceOld: '$240.000',
            price: '$190.000',
            unit: '',
            setup: 'Efectivo o transferencia · o 3 cuotas sin interés de $80.000',
            badge: '',
            featured: false,
            features: [
              'Sobre un tema de la plataforma',
              'Con tus colores, tipografías y fotos',
              'Desde el plan Esencial de Tienda Nube',
            ],
            ctaLabel: 'Quiero esta opción →',
            ctaHref:
              'https://wa.me/5493487623630?text=Hola%20Forjo%2C%20quiero%20mi%20tienda%20en%20Tienda%20Nube%20(tienda%20configurada)',
          },
          {
            name: 'Opción B · Diseño a medida',
            priceOld: '$440.000',
            price: '$350.000',
            unit: '',
            setup: 'Efectivo o transferencia · o 3 cuotas sin interés de $146.700',
            badge: '',
            featured: true,
            features: [
              'La diseñamos desde cero',
              'La programamos para tu marca',
              'Desde el plan Impulso de Tienda Nube',
            ],
            ctaLabel: 'Quiero esta opción →',
            ctaHref:
              'https://wa.me/5493487623630?text=Hola%20Forjo%2C%20quiero%20mi%20tienda%20en%20Tienda%20Nube%20(dise%C3%B1o%20a%20medida)',
          },
        ],
        note: '',
        includedLabel: 'Incluido en las dos',
        included: ['Pagos y envíos configurados', '30 productos cargados', 'Lista en 7 a 10 días'],
        addonsLabel: '',
        addons: [],
        priceOld: '',
        price: '',
        priceNote: '',
        footnote:
          'Pagás 50% al arrancar y 50% contra entrega.\nMantenimiento opcional $15.000/mes: cambios, carga de 10 productos, soporte por WhatsApp y correcciones ante actualizaciones.',
        ctaLabel: '',
        ctaHref: '',
      },
      {
        kicker: '',
        title: 'Sitios web profesionales',
        desc: 'Diseño propio, no plantilla. Rápida en el celular, con un panel para que cambies textos y fotos vos mismo. El dominio queda a tu nombre: si algún día te vas, te la llevás.',
        tags: [
          'Diseño a medida',
          'Panel de autogestión',
          'Dominio a tu nombre',
          'Hosting incluido',
          'Lista en 72 a 96 hs',
          '3 rondas de cambios',
        ],
        wide: false,
        plans: [],
        note: '',
        includedLabel: '',
        included: [],
        addonsLabel: '',
        addons: [],
        priceOld: '$225.000',
        price: '$180.000',
        priceNote: '· efectivo o transferencia',
        footnote:
          'O 3 cuotas sin interés de $75.000.\n+ $15.000/mes de mantenimiento: dominio, hosting, soporte y que siga andando.',
        ctaLabel: 'Cotizar →',
        ctaHref: '#contacto',
      },
      {
        kicker: '',
        title: 'Software a medida',
        desc: 'Si lo que necesitás no entra en un molde, lo construimos desde cero. Dashboards, CRMs, herramientas internas, integraciones.',
        tags: ['React + Node', 'Base de datos', 'Autenticación', 'API integraciones'],
        wide: false,
        plans: [],
        note: '',
        includedLabel: '',
        included: [],
        addonsLabel: '',
        addons: [],
        priceOld: '',
        price: 'Cotización según proyecto',
        priceNote: '',
        footnote: '',
        ctaLabel: '',
        ctaHref: '',
      },
    ],
  },
  process: {
    kicker: '◆ proceso',
    title: 'Cómo forjamos.',
    intro:
      'Cuatro etapas, cada una con entregables claros. Sin sorpresas, sin "fees ocultos", sin proyectos que se eternizan.',
    steps: [
      {
        meta: '01 · ENCENDER',
        title: 'Descubrimiento',
        desc: 'Empezamos con una llamada. Te escuchamos: tu negocio, tu público, qué te traba hoy. Salimos con un plan claro y un presupuesto cerrado.',
      },
      {
        meta: '02 · MOLDEAR',
        title: 'Diseño',
        desc: 'Wireframes primero, después diseño visual. Iteramos con vos en vivo — sin idas y vueltas eternas por mail. Aprobás cada pantalla antes de seguir.',
      },
      {
        meta: '03 · TEMPLAR',
        title: 'Desarrollo',
        desc: 'Código limpio, responsive, rápido. Te damos acceso a una preview desde el día uno para que veas el avance y opines.',
      },
      {
        meta: '04 · ENTREGAR',
        title: 'Lanzamiento',
        desc: 'Hosting, dominio, certificados, capacitación. Salimos al aire juntos y te acompañamos los primeros 30 días para ajustar lo que haga falta.',
      },
    ],
  },
  work: {
    kicker: '◆ trabajo · selección',
    title: 'Proyectos recientes.',
    allLabel: 'Ver todos →',
    allHref: '#',
    projects: [
      {
        name: 'AGUALABOCA',
        cat: 'Forjo Tiendas · pedidos por WhatsApp',
        year: '2026',
        url: 'https://agualaboca.forjo.studio/',
        thumb: '/agualaboca.png',
        demoLabel: 'Ver tienda →',
      },
      {
        name: 'JOTALAB',
        cat: 'Sistema de turnos y gestión integral',
        year: '2025',
        url: 'https://jjotalab.com',
        thumb: '/jjotalab.png?v=2',
        demoLabel: 'Ver demo →',
      },
    ],
    placeholders: 1,
  },
  about: {
    kicker: '◆ nosotros',
    headlinePre: { text: 'Estudio chico,' },
    headlineMid: { text: 'ambición ' },
    headlineEm: { text: 'grande', italic: true, color: '#d94a2b' },
    headlinePost: { text: '.' },
    body: [
      'Forjo es un estudio independiente: tomamos pocos proyectos por mes para meternos a fondo en cada uno. Código a medida, sin plantillas.',
      'Sin cajas negras ni intermediarios: sabés exactamente qué se construye y por qué. Hablás siempre con la persona que está al frente de tu proyecto.',
    ],
    stats: [
      { key: '1', val: 'primer producto lanzado' },
      { key: '100%', val: 'código propio, sin templates' },
      { key: '72 hs', val: 'tiempo promedio de entrega de landing' },
      { key: '1', val: 'punto de contacto, siempre hablás con quien construye' },
    ],
  },
  contact: {
    kicker: '◆ hablemos',
    headline1: { text: '¿Tenés una idea?' },
    headline2: { text: 'Vamos a forjarla.' },
    sub: 'Contanos en un par de líneas qué tenés en mente. Te respondemos en menos de 24hs con una primera idea y un plan.',
    boxLabel: '◇ contacto directo',
    email: 'hola@forjo.studio',
    whatsappLabel: 'WhatsApp · +54 9 3487 62-3630 →',
    whatsappHref:
      'https://wa.me/5493487623630?text=Hola%20Forjo%2C%20quiero%20saber%20más%20sobre%20sus%20servicios',
    callLabel: 'Agendar una llamada →',
    callHref: '#',
    formTitle: 'Contanos tu idea',
  },
  footer: {
    brandText: 'Estudio web independiente. Diseño y desarrollo a medida.',
    cols: [
      {
        title: 'Estudio',
        links: [
          { label: 'Servicios', href: '#servicios' },
          { label: 'Proceso', href: '#proceso' },
          { label: 'Trabajo', href: '#trabajo' },
          { label: 'Nosotros', href: '#nosotros' },
        ],
      },
      {
        title: 'Recursos',
        links: [
          { label: 'Blog', href: '#' },
          { label: 'Guías', href: '#' },
          { label: 'Cotizador', href: '#' },
          { label: 'Preguntas frecuentes', href: '#' },
        ],
      },
      {
        title: 'Contacto',
        links: [
          { label: 'hola@forjo.studio', href: 'mailto:hola@forjo.studio' },
          { label: 'WhatsApp', href: 'https://wa.me/5493487623630' },
          { label: 'Instagram', href: 'https://www.instagram.com/forjo.studio' },
        ],
      },
    ],
    copyright: '© 2026 Forjo Studio · todos los derechos reservados',
    version: 'v1.0 · forjo.studio',
  },
}
