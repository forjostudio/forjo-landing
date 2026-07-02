import { ScrollFX } from '@/components/ScrollFX'

const MARQUEE = [
  'Sitios institucionales',
  'Optimizaciones SEO',
  'Landing pages',
  'Software a medida',
  'Branding digital',
  'Hosting + dominio',
]

function ForjoMark({ width, height }: { width: number; height: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 64 80" aria-hidden="true">
      <rect x="6" y="6" width="14" height="68" fill="#f3ead8" />
      <rect x="20" y="6" width="38" height="14" fill="#d94a2b" />
      <path d="M 20 34 L 50 34 L 36 48 L 20 48 Z" fill="#7aa6d6" />
      <circle cx="58" cy="13" r="5" fill="#f4c543" />
    </svg>
  )
}

export default function Home() {
  return (
    <>
      {/* NAV */}
      <nav>
        <a href="#" className="logo">
          <ForjoMark width={28} height={35} />
          <span className="logo-text">
            forjo <span>/ studio</span>
          </span>
        </a>
        <div className="nav-links">
          <a href="#servicios">Servicios</a>
          <a href="#proceso">Proceso</a>
          <a href="#trabajo">Trabajo</a>
          <a href="#nosotros">Nosotros</a>
          <a href="https://gestion.forjo.studio/login">Ingresar</a>
          <a className="btn btn--primary btn--sm" href="#contacto">
            Contacto
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="kicker hero-kicker">▶ estudio web · buenos aires · est. 2025</div>
            <h1 className="title hero-headline">
              Forjamos <span className="accent">ideas</span>
              <br />
              que <em>convierten</em>.
            </h1>
            <p className="hero-sub">
              Construimos el sistema que tu negocio necesita, la web que te representa o el software
              que todavía no existe.
            </p>
            <div className="hero-actions">
              <a className="btn btn--primary" href="#contacto">
                Empecemos un proyecto →
              </a>
              <a className="btn" href="#trabajo">
                Ver trabajo
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <svg viewBox="0 0 400 400">
              <rect x="0" y="0" width="196" height="196" fill="#d94a2b" />
              <circle cx="302" cy="98" r="98" fill="#f3ead8" />
              <path d="M 0 204 L 196 400 L 0 400 Z" fill="#7aa6d6" />
              <rect x="204" y="204" width="196" height="196" fill="#f4c543" />
            </svg>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1, 2].map((rep) =>
            MARQUEE.map((text, i) => (
              <span key={`${rep}-${i}`} className="marquee-item">
                {text}
              </span>
            )),
          )}
        </div>
      </div>

      {/* SERVICES */}
      <section className="section" id="servicios">
        <div className="section-header">
          <div className="section-header-left">
            <div className="kicker">◆ servicios</div>
            <h2 className="title" style={{ fontSize: 'clamp(40px, 4vw, 56px)', marginTop: 16 }}>
              Lo que forjamos.
            </h2>
          </div>
          <p className="section-header-right">
            Tres servicios, todos a medida. Cada proyecto arranca con una conversación sobre qué
            necesitás, qué no, y cuál es la forma más simple de llegar.
          </p>
        </div>

        <div className="services-grid">
          <div
            className="serv-card"
            style={{ gridColumn: '1 / -1', borderRight: 'none', borderBottom: '1px solid var(--border)' }}
          >
            <div className="serv-index">01 / 03 · Producto principal</div>
            <h3 className="title serv-title">
              Sistema de turnos
              <br />y gestión integral
            </h3>
            <p className="serv-desc">
              Tus clientes reservan online y pagan la seña automáticamente; vos gestionás turnos,
              clientes y finanzas desde un solo panel de administración. Bajo tu dominio o el
              nuestro.
            </p>
            <div className="serv-tags" style={{ marginBottom: 32 }}>
              <span className="serv-tag">Reservas online</span>
              <span className="serv-tag">Panel de admin</span>
              <span className="serv-tag">Gestión de clientes</span>
              <span className="serv-tag">Control de finanzas</span>
              <span className="serv-tag">MercadoPago</span>
              <span className="serv-tag">Multi-agenda</span>
            </div>
            <div className="plans-grid">
              <div className="plan-card">
                <div className="plan-name">Básico</div>
                <div className="plan-price">
                  $15.000<span>/mes</span>
                </div>
                <div className="plan-badge">1er mes gratis</div>
                <ul className="plan-features">
                  <li>1 agenda</li>
                  <li>Dominio forjo.studio incluido</li>
                  <li>Soporte WhatsApp · respuesta en 24hs</li>
                  <li>2 modificaciones por mes</li>
                  <li>Onboarding incluido</li>
                </ul>
                <a
                  className="btn btn--primary btn--sm plan-cta"
                  href="https://gestion.forjo.studio/register?plan=basic"
                >
                  Empezar →
                </a>
              </div>
              <div className="plan-card plan-card--featured">
                <div className="plan-name">Estudio</div>
                <div className="plan-price">
                  $30.000<span>/mes</span>
                </div>
                <div className="plan-badge">1er mes gratis</div>
                <ul className="plan-features">
                  <li>Hasta 5 agendas</li>
                  <li>Dominio forjo.studio incluido</li>
                  <li>Soporte WhatsApp · respuesta en 12hs</li>
                  <li>4 modificaciones por mes</li>
                  <li>Onboarding incluido</li>
                </ul>
                <a
                  className="btn btn--primary btn--sm plan-cta"
                  href="https://gestion.forjo.studio/register?plan=studio"
                >
                  Empezar →
                </a>
              </div>
              <div className="plan-card">
                <div className="plan-name">Pro</div>
                <div className="plan-price">
                  $50.000<span>/mes</span>
                </div>
                <div className="plan-badge">1er mes gratis</div>
                <ul className="plan-features">
                  <li>Hasta 15 agendas</li>
                  <li>Dominio forjo.studio incluido</li>
                  <li>Soporte WhatsApp · respuesta en 12hs</li>
                  <li>8 modificaciones por mes</li>
                  <li>Onboarding incluido</li>
                </ul>
                <a
                  className="btn btn--primary btn--sm plan-cta"
                  href="https://gestion.forjo.studio/register?plan=pro"
                >
                  Empezar →
                </a>
              </div>
            </div>
            <p className="plans-note">
              Una agenda = cada recurso que toma turnos: un profesional, una cancha, una sala.
            </p>
            <div className="plans-included">
              <span className="plans-included-label">Todos los planes incluyen</span>
              <ul className="plans-included-items">
                <li>Reservas online 24/7</li>
                <li>Cobro automático de seña</li>
                <li>Recordatorios por email</li>
                <li>Integración con MercadoPago</li>
                <li>Integración con Google Calendar</li>
              </ul>
            </div>
            <div className="plans-addons">
              <span className="plans-addons-label">Add-ons · suman a cualquier plan</span>
              <div className="addons-grid">
                <div className="addon-card">
                  <div className="addon-name">Dominio propio</div>
                  <div className="addon-desc">
                    Tu propio dominio (.com / .com.ar) en lugar del subdominio forjo.studio.
                  </div>
                </div>
                <div className="addon-card">
                  <div className="addon-name">Agente de WhatsApp</div>
                  <div className="addon-desc">
                    Un asistente que responde consultas y agenda turnos por WhatsApp
                    automáticamente.
                  </div>
                </div>
                <div className="addon-card">
                  <div className="addon-name">Personalización de tu web</div>
                  <div className="addon-desc">
                    Diseño a medida de tu página pública, más allá de la plantilla base.
                  </div>
                </div>
              </div>
            </div>
            <div className="plans-payment">
              Pagás seguro con <strong>MercadoPago</strong> — tarjeta de crédito, débito o dinero en
              cuenta.
              <br />
              Primer mes gratis · sin tarjeta para empezar · cancelás cuando quieras.
            </div>
          </div>

          <div className="serv-card" style={{ borderRight: '1px solid var(--border)', borderBottom: 'none' }}>
            <div className="serv-index">02 / 03</div>
            <h3 className="title serv-title">Sitios web profesionales</h3>
            <p className="serv-desc">
              Webs a medida para emprendedores, profesionales e influencers. Sin sistema de turnos,
              solo tu web.
            </p>
            <div className="serv-tags" style={{ marginBottom: 24 }}>
              <span className="serv-tag">Diseño a medida</span>
              <span className="serv-tag">Dominio propio</span>
              <span className="serv-tag">Hosting incluido</span>
              <span className="serv-tag">Formulario de contacto</span>
              <span className="serv-tag">Mobile-first</span>
            </div>
            <div className="serv-price" style={{ marginBottom: 20 }}>
              <s style={{ opacity: 0.5, fontWeight: 400 }}>U$D 200</s> U$D 150{' '}
              <span>· oferta lanzamiento</span>
            </div>
            <a className="btn btn--sm" href="#contacto">
              Cotizar →
            </a>
          </div>

          <div className="serv-card" style={{ borderRight: 'none', borderBottom: 'none' }}>
            <div className="serv-index">03 / 03</div>
            <h3 className="title serv-title">Software a medida</h3>
            <p className="serv-desc">
              Si lo que necesitás no entra en un molde, lo construimos desde cero. Dashboards, CRMs,
              herramientas internas, integraciones.
            </p>
            <div className="serv-tags" style={{ marginBottom: 24 }}>
              <span className="serv-tag">React + Node</span>
              <span className="serv-tag">Base de datos</span>
              <span className="serv-tag">Autenticación</span>
              <span className="serv-tag">API integraciones</span>
            </div>
            <div className="serv-price">Cotización según proyecto</div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="process" id="proceso">
        <div className="section-header">
          <div className="section-header-left">
            <div className="kicker" style={{ color: 'rgba(243,234,216,0.55)' }}>
              ◆ proceso
            </div>
            <h2
              className="title"
              style={{ fontSize: 'clamp(40px, 4vw, 56px)', marginTop: 16, color: 'var(--cream)' }}
            >
              Cómo forjamos.
            </h2>
          </div>
          <p className="section-header-right">
            Cuatro etapas, cada una con entregables claros. Sin sorpresas, sin &quot;fees
            ocultos&quot;, sin proyectos que se eternizan.
          </p>
        </div>

        <div className="process-grid">
          <div className="process-step">
            <div className="process-meta">01 · ENCENDER</div>
            <div className="process-title">Descubrimiento</div>
            <p className="process-desc">
              Empezamos con una llamada. Te escuchamos: tu negocio, tu público, qué te traba hoy.
              Salimos con un plan claro y un presupuesto cerrado.
            </p>
          </div>
          <div className="process-step">
            <div className="process-meta">02 · MOLDEAR</div>
            <div className="process-title">Diseño</div>
            <p className="process-desc">
              Wireframes primero, después diseño visual. Iteramos con vos en vivo — sin idas y
              vueltas eternas por mail. Aprobás cada pantalla antes de seguir.
            </p>
          </div>
          <div className="process-step">
            <div className="process-meta">03 · TEMPLAR</div>
            <div className="process-title">Desarrollo</div>
            <p className="process-desc">
              Código limpio, responsive, rápido. Te damos acceso a una preview desde el día uno para
              que veas el avance y opines.
            </p>
          </div>
          <div className="process-step">
            <div className="process-meta">04 · ENTREGAR</div>
            <div className="process-title">Lanzamiento</div>
            <p className="process-desc">
              Hosting, dominio, certificados, capacitación. Salimos al aire juntos y te acompañamos
              los primeros 30 días para ajustar lo que haga falta.
            </p>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section className="section" id="trabajo">
        <div className="work-header">
          <div className="work-header-left">
            <div className="kicker">◆ trabajo · selección</div>
            <h2 className="title" style={{ fontSize: 'clamp(40px, 4vw, 56px)', marginTop: 16 }}>
              Proyectos recientes.
            </h2>
          </div>
          <a href="#" className="work-all-link">
            Ver todos →
          </a>
        </div>

        <div className="work-grid">
          <div className="work-card">
            <a
              href="https://jjotalab.com"
              target="_blank"
              rel="noopener"
              className="work-thumb-link"
              aria-label="Ver jjotalab.com"
            >
              <div
                className="work-thumb"
                style={{
                  backgroundImage: "url('/jjotalab.png?v=2')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'left center',
                }}
              >
                <div className="work-thumb-bg" style={{ display: 'none' }}></div>
              </div>
            </a>
            <div className="work-meta">
              <div>
                <div className="work-name">
                  <a href="https://jjotalab.com" target="_blank" rel="noopener">
                    JOTALAB
                  </a>
                </div>
                <div className="work-cat">Sistema de turnos y gestión integral</div>
              </div>
              <div className="work-year">2025</div>
            </div>
            <a
              href="https://jjotalab.com"
              target="_blank"
              rel="noopener"
              className="work-all-link"
              style={{ display: 'inline-block', marginTop: 12 }}
            >
              Ver demo →
            </a>
          </div>

          <div className="work-card work-card--placeholder">
            <div
              className="work-thumb"
              style={{ background: '#1a1714', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#a39989' }}>
                ¿El próximo?
              </span>
            </div>
            <div className="work-meta">
              <div>
                <div className="work-name" style={{ opacity: 0.35 }}>
                  TU NEGOCIO
                </div>
                <div className="work-cat">Próximamente</div>
              </div>
              <div className="work-year">—</div>
            </div>
          </div>

          <div className="work-card work-card--placeholder">
            <div
              className="work-thumb"
              style={{ background: '#1a1714', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#a39989' }}>
                ¿El próximo?
              </span>
            </div>
            <div className="work-meta">
              <div>
                <div className="work-name" style={{ opacity: 0.35 }}>
                  TU NEGOCIO
                </div>
                <div className="work-cat">Próximamente</div>
              </div>
              <div className="work-year">—</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section" id="nosotros">
        <div className="about-inner">
          <div>
            <div className="kicker about-kicker">◆ nosotros</div>
            <h2 className="title about-headline">
              Estudio chico,
              <br />
              ambición <em>grande</em>.
            </h2>
            <p className="about-body">
              Forjo es un estudio independiente: tomamos pocos proyectos por mes para meternos a
              fondo en cada uno. Código a medida, sin plantillas.
            </p>
            <p className="about-body">
              Sin cajas negras ni intermediarios: sabés exactamente qué se construye y por qué.
              Hablás siempre con la persona que está al frente de tu proyecto.
            </p>
          </div>

          <div className="stats-list">
            <div className="stat-row">
              <div className="stat-key">1</div>
              <div className="stat-val">primer producto lanzado</div>
            </div>
            <div className="stat-row">
              <div className="stat-key">100%</div>
              <div className="stat-val">código propio, sin templates</div>
            </div>
            <div className="stat-row">
              <div className="stat-key">72 hs</div>
              <div className="stat-val">tiempo promedio de entrega de landing</div>
            </div>
            <div className="stat-row">
              <div className="stat-key">1</div>
              <div className="stat-val">punto de contacto, siempre hablás con quien construye</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contacto">
        <div className="contact-inner">
          <div>
            <div className="contact-kicker">◆ hablemos</div>
            <h2 className="contact-headline">
              ¿Tenés una idea?
              <br />
              Vamos a forjarla.
            </h2>
            <p className="contact-sub">
              Contanos en un par de líneas qué tenés en mente. Te respondemos en menos de 24hs con
              una primera idea y un plan.
            </p>
          </div>

          <div className="contact-box">
            <div className="contact-box-label">◇ contacto directo</div>
            <div className="contact-links">
              <a href="mailto:hola@forjo.studio" className="contact-email">
                hola@forjo.studio
              </a>
              <a
                href="https://wa.me/5493487623630?text=Hola%20Forjo%2C%20quiero%20saber%20más%20sobre%20sus%20servicios"
                target="_blank"
                className="contact-link-row"
              >
                WhatsApp · +54 9 3487 62-3630 →
              </a>
              <a href="#" className="contact-link-row">
                Agendar una llamada →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#" className="logo">
              <ForjoMark width={24} height={30} />
              <span className="logo-text">
                forjo <span>/ studio</span>
              </span>
            </a>
            <p>Estudio web independiente. Diseño y desarrollo a medida.</p>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Estudio</div>
            <a href="#servicios">Servicios</a>
            <a href="#proceso">Proceso</a>
            <a href="#trabajo">Trabajo</a>
            <a href="#nosotros">Nosotros</a>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Recursos</div>
            <a href="#">Blog</a>
            <a href="#">Guías</a>
            <a href="#">Cotizador</a>
            <a href="#">Preguntas frecuentes</a>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Contacto</div>
            <a href="mailto:hola@forjo.studio">hola@forjo.studio</a>
            <a href="https://wa.me/5493487623630" target="_blank">
              WhatsApp
            </a>
            <a href="https://www.instagram.com/forjo.studio" target="_blank" rel="noopener">
              Instagram
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Forjo Studio · todos los derechos reservados</span>
          <div className="footer-legal">
            <a href="/privacidad.html">Privacidad</a>
            <a href="/terminos.html">Términos</a>
          </div>
          <span>v1.0 · forjo.studio</span>
        </div>
      </footer>

      <a
        href="https://wa.me/5493487623630"
        target="_blank"
        rel="noopener"
        className="wa-float"
        aria-label="Contactar por WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.122 1.524 5.855L.054 23.454a.5.5 0 0 0 .492.596l5.809-1.522A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.87 9.87 0 0 1-5.031-1.378l-.36-.214-3.733.979.995-3.636-.235-.374A9.865 9.865 0 0 1 2.118 12C2.118 6.533 6.533 2.118 12 2.118S21.882 6.533 21.882 12 17.467 21.882 12 21.882z" />
        </svg>
      </a>

      <ScrollFX />
    </>
  )
}
