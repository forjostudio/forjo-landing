import type { CSSProperties } from 'react'
import Image from 'next/image'
import { ScrollFX } from '@/components/ScrollFX'
import { ContactForm } from '@/components/ContactForm'
import { HIDEABLE, type LandingContent, type ServiceItem, type StyledSeg } from '@/lib/content/schema'

/** Segmento de título con formato. Sin estilo e sin itálica, se renderiza como
 *  texto crudo (idéntico al original). */
function Seg({ seg }: { seg: StyledSeg }) {
  const style: CSSProperties = {}
  if (seg.color) style.color = seg.color
  if (seg.bold) style.fontWeight = 700
  if (seg.underline) style.textDecoration = 'underline'
  if (seg.size) style.fontSize = `${seg.size}em`
  const hasStyle = Boolean(seg.color || seg.bold || seg.underline || seg.size)
  if (seg.italic) return <em style={hasStyle ? style : undefined}>{seg.text}</em>
  return hasStyle ? <span style={style}>{seg.text}</span> : <>{seg.text}</>
}

const pad = (n: number) => String(n).padStart(2, '0')

/** Grilla de 2 columnas: una tarjeta angosta que quedaría sola en su fila
 *  (seguida de una ancha, o última) se estira para no dejar un hueco. */
function layoutServices(items: ServiceItem[]) {
  const out: { item: ServiceItem; wide: boolean }[] = []
  let col = 0
  items.forEach((item, i) => {
    if (item.wide) {
      out.push({ item, wide: true })
      col = 0
      return
    }
    const next = items[i + 1]
    const alone = col === 0 && (!next || next.wide)
    out.push({ item, wide: alone })
    col = alone ? 0 : (col + 1) % 2
  })
  return out
}

function ServiceCard({
  item,
  n,
  total,
  wide,
}: {
  item: ServiceItem
  n: number
  total: number
  wide: boolean
}) {
  const hasPlans = item.plans.length > 0
  return (
    <div className={`serv-card${wide ? ' serv-card--wide' : ''}`}>
      <div className="serv-index">
        {pad(n)} / {pad(total)}
        {item.kicker && ` · ${item.kicker}`}
      </div>
      <h3 className="title serv-title" style={{ whiteSpace: 'pre-line' }}>
        {item.title}
      </h3>
      <p className="serv-desc">{item.desc}</p>
      {item.tags.length > 0 && (
        <div className="serv-tags" style={{ marginBottom: hasPlans ? 32 : 24 }}>
          {item.tags.map((t, i) => (
            <span key={i} className="serv-tag">
              {t}
            </span>
          ))}
        </div>
      )}

      {hasPlans && (
        <div className={`plans-grid${item.plans.length === 2 ? ' plans-grid--2' : ''}`}>
          {item.plans.map((p, i) => (
            <div key={i} className={`plan-card${p.featured ? ' plan-card--featured' : ''}`}>
              <div className="plan-name">{p.name}</div>
              {p.priceOld && <s className="plan-price-old">{p.priceOld}</s>}
              <div className="plan-price">
                {p.price}
                <span>{p.unit}</span>
              </div>
              {p.setup && <div className="plan-setup">{p.setup}</div>}
              {p.badge && <div className="plan-badge">{p.badge}</div>}
              <ul className="plan-features">
                {p.features.map((f, j) => (
                  <li key={j}>{f}</li>
                ))}
              </ul>
              {p.ctaLabel && (
                <a className="btn btn--primary btn--sm plan-cta" href={p.ctaHref}>
                  {p.ctaLabel}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
      {item.note && <p className="plans-note">{item.note}</p>}
      {item.included.length > 0 && (
        <div className="plans-included">
          <span className="plans-included-label">{item.includedLabel}</span>
          <ul className="plans-included-items">
            {item.included.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        </div>
      )}
      {item.addons.length > 0 && (
        <div className="plans-addons">
          <span className="plans-addons-label">{item.addonsLabel}</span>
          <div className={`addons-grid${item.addons.length === 2 ? ' addons-grid--2' : ''}`}>
            {item.addons.map((a, i) => (
              <div key={i} className="addon-card">
                <div className="addon-name">{a.name}</div>
                <div className="addon-desc">{a.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {item.price && (
        <div className="serv-price" style={{ marginBottom: 20 }}>
          {item.priceOld && <s style={{ opacity: 0.5, fontWeight: 400 }}>{item.priceOld}</s>}{' '}
          {item.price} {item.priceNote && <span>{item.priceNote}</span>}
        </div>
      )}
      {item.footnote && (
        <p className={hasPlans ? 'plans-payment' : 'serv-footnote'} style={{ whiteSpace: 'pre-line' }}>
          {item.footnote}
        </p>
      )}
      {item.ctaLabel &&
        (hasPlans ? (
          <div className="serv-more">
            <a className="work-all-link" href={item.ctaHref}>
              {item.ctaLabel}
            </a>
          </div>
        ) : (
          <a className="btn btn--sm" href={item.ctaHref}>
            {item.ctaLabel}
          </a>
        ))}
    </div>
  )
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

/**
 * La landing completa a partir de su contenido. La usan la página pública y la
 * vista previa del editor del panel (que le pasa lo que se está editando, sin
 * guardar). `fx` apaga los efectos de scroll en la vista previa: ahí el
 * contenido cambia con cada tecla y tiene que verse siempre.
 */
export function Landing({ c, fx = true }: { c: LandingContent; fx?: boolean }) {
  const s = c.services
  const show = (key: string) => !c.hidden.includes(key)
  // Links del menú y del footer que apuntan a una sección oculta.
  const deadHrefs = new Set(c.hidden.map((k) => HIDEABLE[k]).filter(Boolean))
  const live = <T extends { href: string }>(links: T[]) => links.filter((l) => !deadHrefs.has(l.href))

  return (
    <>
      {/* NAV */}
      <nav data-edit="nav">
        <a href="#" className="logo">
          <ForjoMark width={28} height={35} />
          <span className="logo-text">
            forjo <span>/ studio</span>
          </span>
        </a>
        <div className="nav-links">
          {live(c.nav.links).map((l, i) => (
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
      <section className="hero" data-edit="hero">
        <div className="hero-inner">
          <div>
            <div className="kicker hero-kicker">{c.hero.kicker}</div>
            <h1 className="title hero-headline">
              <Seg seg={c.hero.headlinePre} />
              <Seg seg={c.hero.headlineAccent} />
              <br />
              <Seg seg={c.hero.headlineMid} />
              <Seg seg={c.hero.headlineEm} />
              <Seg seg={c.hero.headlinePost} />
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
      {show('marquee') && (
        <div className="marquee-wrap" aria-hidden="true" data-edit="marquee">
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
      )}

      {/* SERVICES */}
      {show('services') && (
        <section className="section" id="servicios" data-edit="services">
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
            {layoutServices(s.items).map(({ item, wide }, i) => (
              <ServiceCard key={i} item={item} n={i + 1} total={s.items.length} wide={wide} />
            ))}
          </div>
        </section>
      )}

      {/* PROCESS */}
      {show('process') && (
        <section className="process" id="proceso" data-edit="process">
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
      )}

      {/* WORK */}
      {show('work') && (
        <section className="section" id="trabajo" data-edit="work">
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
                  <div className="work-thumb">
                    {p.thumb && (
                      <Image
                        src={p.thumb}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                        style={{ objectFit: 'cover', objectPosition: 'top center' }}
                      />
                    )}
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
      )}

      {/* ABOUT */}
      {show('about') && (
        <section className="section" id="nosotros" data-edit="about">
          <div className="about-inner">
            <div>
              <div className="kicker about-kicker">{c.about.kicker}</div>
              <h2 className="title about-headline">
                <Seg seg={c.about.headlinePre} />
                <br />
                <Seg seg={c.about.headlineMid} />
                <Seg seg={c.about.headlineEm} />
                <Seg seg={c.about.headlinePost} />
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
      )}

      {/* CONTACT */}
      <section className="contact" id="contacto" data-edit="contact">
        <div className="contact-inner">
          <div>
            <div className="contact-kicker">{c.contact.kicker}</div>
            <h2 className="contact-headline">
              <Seg seg={c.contact.headline1} />
              <br />
              <Seg seg={c.contact.headline2} />
            </h2>
            <p className="contact-sub">{c.contact.sub}</p>
            <ContactForm title={c.contact.formTitle} />
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
      <footer data-edit="footer">
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
              {live(col.links).map((l, j) => {
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

      {fx && <ScrollFX />}
    </>
  )
}
