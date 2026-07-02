import type { Metadata } from 'next'
import { ScrollFX } from '@/components/ScrollFX'
import { getContent } from '@/lib/content/get'

// La landing lee el contenido editable de la DB en cada request.
export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent()
  return {
    title: c.seo.title,
    description: c.seo.description,
    openGraph: {
      type: 'website',
      title: c.seo.ogTitle,
      description: c.seo.ogDescription,
      url: 'https://forjo.studio/',
      siteName: 'Forjo Studio',
      locale: 'es_AR',
      images: [
        {
          url: c.seo.ogImage,
          width: 1200,
          height: 630,
          alt: 'Forjo Studio — estudio web independiente',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: c.seo.ogTitle,
      description: c.seo.ogDescription,
      images: [c.seo.ogImage],
    },
  }
}

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

export default async function Home() {
  const c = await getContent()
  const s = c.services

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
          {c.nav.links.map((l, i) => (
            <a key={i} href={l.href}>
              {l.label}
            </a>
          ))}
          <a className="btn btn--primary btn--sm" href={c.nav.ctaHref}>
            {c.nav.ctaLabel}
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="kicker hero-kicker">{c.hero.kicker}</div>
            <h1 className="title hero-headline">
              {c.hero.headlinePre}
              <span className="accent">{c.hero.headlineAccent}</span>
              <br />
              {c.hero.headlineMid}
              <em>{c.hero.headlineEm}</em>
              {c.hero.headlinePost}
            </h1>
            <p className="hero-sub">{c.hero.sub}</p>
            <div className="hero-actions">
              <a className="btn btn--primary" href={c.hero.ctaPrimaryHref}>
                {c.hero.ctaPrimaryLabel}
              </a>
              <a className="btn" href={c.hero.ctaSecondaryHref}>
                {c.hero.ctaSecondaryLabel}
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
            c.marquee.map((text, i) => (
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
            <div className="kicker">{s.kicker}</div>
            <h2 className="title" style={{ fontSize: 'clamp(40px, 4vw, 56px)', marginTop: 16 }}>
              {s.title}
            </h2>
          </div>
          <p className="section-header-right">{s.intro}</p>
        </div>

        <div className="services-grid">
          <div
            className="serv-card"
            style={{ gridColumn: '1 / -1', borderRight: 'none', borderBottom: '1px solid var(--border)' }}
          >
            <div className="serv-index">{s.turnos.index}</div>
            <h3 className="title serv-title">
              {s.turnos.titleLine1}
              <br />
              {s.turnos.titleLine2}
            </h3>
            <p className="serv-desc">{s.turnos.desc}</p>
            <div className="serv-tags" style={{ marginBottom: 32 }}>
              {s.turnos.tags.map((t, i) => (
                <span key={i} className="serv-tag">
                  {t}
                </span>
              ))}
            </div>
            <div className="plans-grid">
              {s.turnos.plans.map((p, i) => (
                <div key={i} className={`plan-card${p.featured ? ' plan-card--featured' : ''}`}>
                  <div className="plan-name">{p.name}</div>
                  <div className="plan-price">
                    {p.price}
                    <span>{p.unit}</span>
                  </div>
                  {p.badge && <div className="plan-badge">{p.badge}</div>}
                  <ul className="plan-features">
                    {p.features.map((f, j) => (
                      <li key={j}>{f}</li>
                    ))}
                  </ul>
                  <a className="btn btn--primary btn--sm plan-cta" href={p.ctaHref}>
                    {p.ctaLabel}
                  </a>
                </div>
              ))}
            </div>
            <p className="plans-note">{s.turnos.note}</p>
            <div className="plans-included">
              <span className="plans-included-label">{s.turnos.includedLabel}</span>
              <ul className="plans-included-items">
                {s.turnos.included.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
            </div>
            <div className="plans-addons">
              <span className="plans-addons-label">{s.turnos.addonsLabel}</span>
              <div className="addons-grid">
                {s.turnos.addons.map((a, i) => (
                  <div key={i} className="addon-card">
                    <div className="addon-name">{a.name}</div>
                    <div className="addon-desc">{a.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="plans-payment">
              {s.turnos.paymentPre}
              <strong>{s.turnos.paymentStrong}</strong>
              {s.turnos.paymentPost}
              <br />
              {s.turnos.paymentLine2}
            </div>
          </div>

          <div className="serv-card" style={{ borderRight: '1px solid var(--border)', borderBottom: 'none' }}>
            <div className="serv-index">{s.web.index}</div>
            <h3 className="title serv-title">{s.web.title}</h3>
            <p className="serv-desc">{s.web.desc}</p>
            <div className="serv-tags" style={{ marginBottom: 24 }}>
              {s.web.tags.map((t, i) => (
                <span key={i} className="serv-tag">
                  {t}
                </span>
              ))}
            </div>
            <div className="serv-price" style={{ marginBottom: 20 }}>
              <s style={{ opacity: 0.5, fontWeight: 400 }}>{s.web.priceOld}</s> {s.web.price}{' '}
              <span>{s.web.priceNote}</span>
            </div>
            <a className="btn btn--sm" href={s.web.ctaHref}>
              {s.web.ctaLabel}
            </a>
          </div>

          <div className="serv-card" style={{ borderRight: 'none', borderBottom: 'none' }}>
            <div className="serv-index">{s.software.index}</div>
            <h3 className="title serv-title">{s.software.title}</h3>
            <p className="serv-desc">{s.software.desc}</p>
            <div className="serv-tags" style={{ marginBottom: 24 }}>
              {s.software.tags.map((t, i) => (
                <span key={i} className="serv-tag">
                  {t}
                </span>
              ))}
            </div>
            <div className="serv-price">{s.software.price}</div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="process" id="proceso">
        <div className="section-header">
          <div className="section-header-left">
            <div className="kicker" style={{ color: 'rgba(243,234,216,0.55)' }}>
              {c.process.kicker}
            </div>
            <h2
              className="title"
              style={{ fontSize: 'clamp(40px, 4vw, 56px)', marginTop: 16, color: 'var(--cream)' }}
            >
              {c.process.title}
            </h2>
          </div>
          <p className="section-header-right">{c.process.intro}</p>
        </div>

        <div className="process-grid">
          {c.process.steps.map((st, i) => (
            <div key={i} className="process-step">
              <div className="process-meta">{st.meta}</div>
              <div className="process-title">{st.title}</div>
              <p className="process-desc">{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section className="section" id="trabajo">
        <div className="work-header">
          <div className="work-header-left">
            <div className="kicker">{c.work.kicker}</div>
            <h2 className="title" style={{ fontSize: 'clamp(40px, 4vw, 56px)', marginTop: 16 }}>
              {c.work.title}
            </h2>
          </div>
          <a href={c.work.allHref} className="work-all-link">
            {c.work.allLabel}
          </a>
        </div>

        <div className="work-grid">
          {c.work.projects.map((p, i) => (
            <div key={i} className="work-card">
              <a
                href={p.url}
                target="_blank"
                rel="noopener"
                className="work-thumb-link"
                aria-label={`Ver ${p.name}`}
              >
                <div
                  className="work-thumb"
                  style={{
                    backgroundImage: `url('${p.thumb}')`,
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
                    <a href={p.url} target="_blank" rel="noopener">
                      {p.name}
                    </a>
                  </div>
                  <div className="work-cat">{p.cat}</div>
                </div>
                <div className="work-year">{p.year}</div>
              </div>
              {p.demoLabel && (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener"
                  className="work-all-link"
                  style={{ display: 'inline-block', marginTop: 12 }}
                >
                  {p.demoLabel}
                </a>
              )}
            </div>
          ))}

          {Array.from({ length: c.work.placeholders }).map((_, i) => (
            <div key={`ph-${i}`} className="work-card work-card--placeholder">
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
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="section" id="nosotros">
        <div className="about-inner">
          <div>
            <div className="kicker about-kicker">{c.about.kicker}</div>
            <h2 className="title about-headline">
              {c.about.headlinePre}
              <br />
              {c.about.headlineMid}
              <em>{c.about.headlineEm}</em>
              {c.about.headlinePost}
            </h2>
            {c.about.body.map((p, i) => (
              <p key={i} className="about-body">
                {p}
              </p>
            ))}
          </div>

          <div className="stats-list">
            {c.about.stats.map((st, i) => (
              <div key={i} className="stat-row">
                <div className="stat-key">{st.key}</div>
                <div className="stat-val">{st.val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contacto">
        <div className="contact-inner">
          <div>
            <div className="contact-kicker">{c.contact.kicker}</div>
            <h2 className="contact-headline">
              {c.contact.headline1}
              <br />
              {c.contact.headline2}
            </h2>
            <p className="contact-sub">{c.contact.sub}</p>
          </div>

          <div className="contact-box">
            <div className="contact-box-label">{c.contact.boxLabel}</div>
            <div className="contact-links">
              <a href={`mailto:${c.contact.email}`} className="contact-email">
                {c.contact.email}
              </a>
              <a href={c.contact.whatsappHref} target="_blank" className="contact-link-row">
                {c.contact.whatsappLabel}
              </a>
              <a href={c.contact.callHref} className="contact-link-row">
                {c.contact.callLabel}
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
            <p>{c.footer.brandText}</p>
          </div>

          {c.footer.cols.map((col, i) => (
            <div key={i} className="footer-col">
              <div className="footer-col-title">{col.title}</div>
              {col.links.map((l, j) => {
                const external = /^https?:\/\//.test(l.href)
                return (
                  <a
                    key={j}
                    href={l.href}
                    {...(external ? { target: '_blank', rel: 'noopener' } : {})}
                  >
                    {l.label}
                  </a>
                )
              })}
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span>{c.footer.copyright}</span>
          <div className="footer-legal">
            <a href="/privacidad.html">Privacidad</a>
            <a href="/terminos.html">Términos</a>
          </div>
          <span>{c.footer.version}</span>
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
