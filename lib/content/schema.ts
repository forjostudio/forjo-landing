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
  price: string
  unit: string
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

export interface LandingContent {
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
    turnos: {
      index: string
      titleLine1: string
      titleLine2: string
      desc: string
      tags: string[]
      plans: Plan[]
      note: string
      includedLabel: string
      included: string[]
      addonsLabel: string
      addons: Addon[]
      paymentPre: string
      paymentStrong: string
      paymentPost: string
      paymentLine2: string
    }
    web: {
      index: string
      title: string
      desc: string
      tags: string[]
      priceOld: string
      price: string
      priceNote: string
      ctaLabel: string
      ctaHref: string
    }
    software: { index: string; title: string; desc: string; tags: string[]; price: string }
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
  seo: {
    title: 'Forjamos tu presencia en la web. — Forjo Studio',
    description:
      'Estudio web independiente. Diseño y desarrollo a medida para emprendedores, profesionales y marcas que necesitan más que un template.',
    ogTitle: 'Sitios web y sistemas a medida',
    ogDescription:
      'Estudio web independiente en Buenos Aires. Sistema de turnos, webs profesionales y software a medida.',
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
      'Tres servicios, todos a medida. Cada proyecto arranca con una conversación sobre qué necesitás, qué no, y cuál es la forma más simple de llegar.',
    turnos: {
      index: '01 / 03 · Producto principal',
      titleLine1: 'Sistema de turnos',
      titleLine2: 'y gestión integral',
      desc: 'Tus clientes reservan online y pagan la seña automáticamente; vos gestionás turnos, clientes y finanzas desde un solo panel de administración. Bajo tu dominio o el nuestro.',
      tags: [
        'Reservas online',
        'Panel de admin',
        'Gestión de clientes',
        'Control de finanzas',
        'MercadoPago',
        'Multi-agenda',
      ],
      plans: [
        {
          name: 'Básico',
          price: '$15.000',
          unit: '/mes',
          badge: '1er mes gratis',
          featured: false,
          features: [
            '1 agenda',
            'Dominio forjo.studio incluido',
            'Soporte WhatsApp · respuesta en 24hs',
            '2 modificaciones por mes',
            'Onboarding incluido',
          ],
          ctaLabel: 'Empezar →',
          ctaHref: 'https://gestion.forjo.studio/register?plan=basic',
        },
        {
          name: 'Estudio',
          price: '$30.000',
          unit: '/mes',
          badge: '1er mes gratis',
          featured: true,
          features: [
            'Hasta 5 agendas',
            'Dominio forjo.studio incluido',
            'Soporte WhatsApp · respuesta en 12hs',
            '4 modificaciones por mes',
            'Onboarding incluido',
          ],
          ctaLabel: 'Empezar →',
          ctaHref: 'https://gestion.forjo.studio/register?plan=studio',
        },
        {
          name: 'Pro',
          price: '$50.000',
          unit: '/mes',
          badge: '1er mes gratis',
          featured: false,
          features: [
            'Hasta 15 agendas',
            'Dominio forjo.studio incluido',
            'Soporte WhatsApp · respuesta en 12hs',
            '8 modificaciones por mes',
            'Onboarding incluido',
          ],
          ctaLabel: 'Empezar →',
          ctaHref: 'https://gestion.forjo.studio/register?plan=pro',
        },
      ],
      note: 'Una agenda = cada recurso que toma turnos: un profesional, una cancha, una sala.',
      includedLabel: 'Todos los planes incluyen',
      included: [
        'Reservas online 24/7',
        'Cobro automático de seña',
        'Recordatorios por email',
        'Integración con MercadoPago',
        'Integración con Google Calendar',
      ],
      addonsLabel: 'Add-ons · suman a cualquier plan',
      addons: [
        {
          name: 'Dominio propio',
          desc: 'Tu propio dominio (.com / .com.ar) en lugar del subdominio forjo.studio.',
        },
        {
          name: 'Agente de WhatsApp',
          desc: 'Un asistente que responde consultas y agenda turnos por WhatsApp automáticamente.',
        },
        {
          name: 'Personalización de tu web',
          desc: 'Diseño a medida de tu página pública, más allá de la plantilla base.',
        },
      ],
      paymentPre: 'Pagás seguro con ',
      paymentStrong: 'MercadoPago',
      paymentPost: ' — tarjeta de crédito, débito o dinero en cuenta.',
      paymentLine2: 'Primer mes gratis · sin tarjeta para empezar · cancelás cuando quieras.',
    },
    web: {
      index: '02 / 03',
      title: 'Sitios web profesionales',
      desc: 'Webs a medida para emprendedores, profesionales e influencers. Sin sistema de turnos, solo tu web.',
      tags: [
        'Diseño a medida',
        'Dominio propio',
        'Hosting incluido',
        'Formulario de contacto',
        'Mobile-first',
      ],
      priceOld: 'U$D 200',
      price: 'U$D 150',
      priceNote: '· oferta lanzamiento',
      ctaLabel: 'Cotizar →',
      ctaHref: '#contacto',
    },
    software: {
      index: '03 / 03',
      title: 'Software a medida',
      desc: 'Si lo que necesitás no entra en un molde, lo construimos desde cero. Dashboards, CRMs, herramientas internas, integraciones.',
      tags: ['React + Node', 'Base de datos', 'Autenticación', 'API integraciones'],
      price: 'Cotización según proyecto',
    },
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
        name: 'JOTALAB',
        cat: 'Sistema de turnos y gestión integral',
        year: '2025',
        url: 'https://jjotalab.com',
        thumb: '/jjotalab.png?v=2',
        demoLabel: 'Ver demo →',
      },
    ],
    placeholders: 2,
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
