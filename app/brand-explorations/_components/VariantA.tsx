import Image from 'next/image'
import type { LandingContent, ServiceItem } from '@/lib/content/schema'
import { ContactForm } from '@/components/ContactForm'
import {
  Arrow,
  ArrowUpRight,
  Logo,
  MarqueeTrack,
  Seg,
  Shape,
  WhatsAppFloat,
  cleanKicker,
  cleanLabel,
  extProps,
  groupServices,
  pad,
  shapeAt,
  splitDots,
  splitMeta,
  visibility,
} from './shared'
import '../variant-a.css'

/* ================================================================
   A — TECHNICAL BOLD
   Plano técnico: grilla de módulos a la vista, titulares grandes, bandas
   tinta/crema alternadas y el naranja reservado para la acción.
================================================================ */

export function Btn({ href, label, size = 'md' }: { href: string; label: string; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <a className={`ta-btn ta-btn--${size}`} href={href} {...extProps(href)}>
      <span className="ta-btn__label">{cleanLabel(label)}</span>
      <span className="ta-btn__go">
        <Arrow size={size === 'lg' ? 22 : 18} />
      </span>
    </a>
  )
}

export function TextLink({ href, label }: { href: string; label: string }) {
  return (
    <a className="ta-link" href={href} {...extProps(href)}>
      {cleanLabel(label)}
      <Arrow size={16} />
    </a>
  )
}

/** Dibujo de construcción: las figuras de la marca sobre una grilla de 4×4
 *  módulos, con cotas. Decorativo. */
export function Construction() {
  return (
    <svg className="ta-cons" viewBox="-8 -28 540 540" aria-hidden="true">
      <g className="ta-cons__grid">
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <line x1={20 + i * 120} y1="20" x2={20 + i * 120} y2="500" />
            <line x1="20" y1={20 + i * 120} x2="500" y2={20 + i * 120} />
          </g>
        ))}
      </g>
      <g className="ta-cons__shapes">
        <rect className="ta-cons__sq" x="20" y="20" width="240" height="240" />
        <circle className="ta-cons__ci" cx="380" cy="260" r="120" />
        <path className="ta-cons__tr" d="M20 260L260 500H20Z" />
        <rect className="ta-cons__bl" x="260" y="380" width="120" height="120" />
      </g>
      <g className="ta-cons__marks">
        <path d="M20 8h240M20 2v12M260 2v12" />
        <path d="M380 260h120M380 254v12" />
        <path d="M512 380v120M506 380h12M506 500h12" />
      </g>
      <g className="ta-cons__labels">
        <text x="140" y="0" textAnchor="middle">240</text>
        <text x="440" y="250" textAnchor="middle">r 120</text>
        <text x="64" y="486">45°</text>
      </g>
    </svg>
  )
}

export function Plans({ item }: { item: ServiceItem }) {
  return (
    <div className="ta-plans" style={{ ['--n' as string]: item.plans.length }}>
      {item.plans.map((p, i) => (
        <div key={i} className={`ta-plan${p.featured ? ' ta-plan--featured bx-inv' : ''}`}>
          <div className="ta-plan__name">{p.name}</div>
          <div className="ta-plan__price">
            {p.priceOld && <s className="ta-plan__old">{p.priceOld}</s>}
            <span className="ta-plan__amount">{p.price}</span>
            {p.unit && <span className="ta-plan__unit">{p.unit}</span>}
          </div>
          {p.setup && <p className="ta-plan__setup">{p.setup}</p>}
          {p.badge && (
            <p className="ta-plan__badge">
              <Shape kind="block" size={10} />
              {p.badge}
            </p>
          )}
          <ul className="ta-plan__features">
            {p.features.map((f, j) => (
              <li key={j}>{f}</li>
            ))}
          </ul>
          {p.ctaLabel && <Btn href={p.ctaHref} label={p.ctaLabel} size="sm" />}
        </div>
      ))}
    </div>
  )
}

export function ServiceExtras({ item }: { item: ServiceItem }) {
  return (
    <>
      {item.note && <p className="ta-svc__note">{item.note}</p>}
      {item.included.length > 0 && (
        <div className="ta-svc__included">
          <p className="ta-svc__label">{item.includedLabel}</p>
          <ul>
            {item.included.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        </div>
      )}
      {item.addons.length > 0 && (
        <div className="ta-svc__addons">
          <p className="ta-svc__label">{item.addonsLabel}</p>
          <ul>
            {item.addons.map((a, i) => (
              <li key={i}>
                <strong>{a.name}</strong>
                <span>{a.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export function ServiceHead({ item, n, total }: { item: ServiceItem; n: number; total: number }) {
  return (
    <>
      <p className="ta-svc__index">
        <Shape kind={shapeAt(n - 1)} size={12} />
        <span>
          {pad(n)}/{pad(total)}
          {item.kicker && ` · ${item.kicker}`}
        </span>
      </p>
      <h3 className="ta-svc__title">{item.title}</h3>
      <p className="ta-svc__desc">{item.desc}</p>
      {item.tags.length > 0 && (
        <ul className="ta-tags">
          {item.tags.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      )}
    </>
  )
}

export function VariantA({ c }: { c: LandingContent }) {
  const { show, live } = visibility(c)
  const s = c.services
  const total = s.items.length

  return (
    <div className="ta">
      <a className="ta-skip" href="#contenido">
        Saltar al contenido
      </a>
      <header className="ta-head">
        <div className="ta-wrap ta-head__inner">
          <a href="#top" className="ta-head__logo" aria-label="Forjo Studio, inicio">
            <Logo height={30} />
          </a>
          <nav aria-label="Principal" className="ta-head__nav">
            <ul className="ta-head__links">
              {live(c.nav.links).map((l, i) => (
                <li key={i}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <Btn href={c.nav.ctaHref} label={c.nav.ctaLabel} size="sm" />
        </div>
      </header>

      <main id="contenido">
        {/* HERO */}
        <section className="ta-hero" id="top">
          <div className="ta-wrap ta-hero__grid">
            <div className="ta-hero__copy">
              <h1 className="ta-hero__title">
                <Seg seg={c.hero.headlinePre} />
                <Seg seg={c.hero.headlineAccent} />
                <br />
                <Seg seg={c.hero.headlineMid} />
                <Seg seg={c.hero.headlineEm} />
                <Seg seg={c.hero.headlinePost} />
              </h1>
              <p className="ta-hero__sub">{c.hero.sub}</p>
              <div className="ta-hero__actions">
                <Btn href={c.hero.ctaPrimaryHref} label={c.hero.ctaPrimaryLabel} size="lg" />
                <TextLink href={c.hero.ctaSecondaryHref} label={c.hero.ctaSecondaryLabel} />
              </div>
            </div>
            <div className="ta-hero__fig">
              <Construction />
            </div>
          </div>
          <div className="ta-wrap">
            <ul className="ta-spec">
              {splitDots(c.hero.kicker).map((part, i) => (
                <li key={i}>{part}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* MARQUESINA */}
        {show('marquee') && (
          <div className="ta-ticker bx-inv">
            <MarqueeTrack
              items={c.marquee}
              className="ta-ticker__track"
              itemClass="ta-ticker__item"
              sep={(i) => <Shape kind={shapeAt(i)} size={14} />}
            />
          </div>
        )}

        {/* SERVICIOS */}
        {show('services') && (
          <section className="ta-sec" id="servicios" aria-labelledby="ta-servicios">
            <div className="ta-wrap">
              <div className="ta-sec__head">
                <p className="ta-sec__rail">{cleanKicker(s.kicker)}</p>
                <h2 className="ta-sec__title" id="ta-servicios">
                  {s.title}
                </h2>
                <p className="ta-sec__intro">{s.intro}</p>
              </div>

              {groupServices(s.items).map((g, gi) =>
                g.wide ? (
                  g.items.map(({ item, n }) => (
                    <article key={n} className="ta-svc">
                      <div className="ta-svc__head">
                        <ServiceHead item={item} n={n} total={total} />
                      </div>
                      <div className="ta-svc__body">
                        {item.plans.length > 0 && <Plans item={item} />}
                        <ServiceExtras item={item} />
                        {item.price && (
                          <p className="ta-svc__price">
                            {item.priceOld && <s>{item.priceOld}</s>} {item.price}{' '}
                            {item.priceNote && <span>{item.priceNote}</span>}
                          </p>
                        )}
                        {item.footnote && <p className="ta-svc__foot">{item.footnote}</p>}
                        {item.ctaLabel && <TextLink href={item.ctaHref} label={item.ctaLabel} />}
                      </div>
                    </article>
                  ))
                ) : (
                  <div key={`g${gi}`} className="ta-pair">
                    {g.items.map(({ item, n }) => (
                      <article key={n} className="ta-svc ta-svc--simple">
                        <ServiceHead item={item} n={n} total={total} />
                        {item.plans.length > 0 && <Plans item={item} />}
                        <ServiceExtras item={item} />
                        <div className="ta-svc__bottom">
                          {item.price && (
                            <p className="ta-svc__price">
                              {item.priceOld && <s>{item.priceOld}</s>} {item.price}{' '}
                              {item.priceNote && <span>{item.priceNote}</span>}
                            </p>
                          )}
                          {item.footnote && <p className="ta-svc__foot">{item.footnote}</p>}
                          {item.ctaLabel && <Btn href={item.ctaHref} label={item.ctaLabel} size="sm" />}
                        </div>
                      </article>
                    ))}
                  </div>
                ),
              )}
            </div>
          </section>
        )}

        {/* PROCESO */}
        {show('process') && (
          <section className="ta-sec ta-process bx-inv" id="proceso" aria-labelledby="ta-proceso">
            <div className="ta-wrap">
              <div className="ta-sec__head">
                <p className="ta-sec__rail">{cleanKicker(c.process.kicker)}</p>
                <h2 className="ta-sec__title" id="ta-proceso">
                  {c.process.title}
                </h2>
                <p className="ta-sec__intro">{c.process.intro}</p>
              </div>
              <ol className="ta-steps">
                {c.process.steps.map((st, i) => {
                  const m = splitMeta(st.meta)
                  return (
                    <li key={i} className="ta-step">
                      <div className="ta-step__node">
                        <Shape kind={shapeAt(i)} size={20} />
                      </div>
                      <p className="ta-step__meta">
                        {m.num && <span>{m.num}</span>}
                        {m.word}
                      </p>
                      <h3 className="ta-step__title">{st.title}</h3>
                      <p className="ta-step__desc">{st.desc}</p>
                    </li>
                  )
                })}
              </ol>
            </div>
          </section>
        )}

        {/* TRABAJO */}
        {show('work') && (
          <section className="ta-sec" id="trabajo" aria-labelledby="ta-trabajo">
            <div className="ta-wrap">
              <div className="ta-sec__head ta-sec__head--row">
                <p className="ta-sec__rail">{cleanKicker(c.work.kicker)}</p>
                <h2 className="ta-sec__title" id="ta-trabajo">
                  {c.work.title}
                </h2>
                {c.work.allHref && c.work.allHref !== '#' && (
                  <TextLink href={c.work.allHref} label={c.work.allLabel} />
                )}
              </div>
              <ul className="ta-work">
                {c.work.projects.map((p, i) => (
                  <li key={i} className="ta-proj">
                    <a href={p.url} target="_blank" rel="noopener" className="ta-proj__thumb" tabIndex={-1} aria-hidden="true">
                      {p.thumb && (
                        <Image
                          src={p.thumb}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
                          style={{ objectFit: 'cover', objectPosition: 'top center' }}
                        />
                      )}
                    </a>
                    <div className="ta-proj__meta">
                      <h3 className="ta-proj__name">
                        <a href={p.url} target="_blank" rel="noopener">
                          {p.name}
                          <ArrowUpRight size={20} />
                        </a>
                      </h3>
                      <p className="ta-proj__cat">{p.cat}</p>
                      <p className="ta-proj__year">{p.year}</p>
                    </div>
                  </li>
                ))}
                {Array.from({ length: c.work.placeholders }).map((_, i) => (
                  <li key={`ph${i}`} className="ta-proj ta-proj--next">
                    <div className="ta-proj__thumb ta-proj__thumb--empty">
                      <Shape kind="circle" size={56} />
                      <span>El próximo?</span>
                    </div>
                    <div className="ta-proj__meta">
                      <h3 className="ta-proj__name">Tu negocio</h3>
                      <p className="ta-proj__cat">Próximamente</p>
                      <p className="ta-proj__year">—</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* NOSOTROS */}
        {show('about') && (
          <section className="ta-sec ta-about" id="nosotros" aria-labelledby="ta-nosotros">
            <div className="ta-wrap">
              <div className="ta-about__grid">
                <p className="ta-sec__rail">{cleanKicker(c.about.kicker)}</p>
                <h2 className="ta-about__title" id="ta-nosotros">
                  <Seg seg={c.about.headlinePre} />
                  <br />
                  <Seg seg={c.about.headlineMid} />
                  <Seg seg={c.about.headlineEm} />
                  <Seg seg={c.about.headlinePost} />
                </h2>
                <div className="ta-about__body">
                  {c.about.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
              <dl className="ta-stats">
                {c.about.stats.map((st, i) => (
                  <div key={i} className="ta-stat">
                    <dt>{st.key}</dt>
                    <dd>{st.val}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        )}

        {/* CONTACTO */}
        <section className="ta-contact bx-inv" id="contacto" aria-labelledby="ta-contacto">
          <div className="ta-wrap ta-contact__grid">
            <div className="ta-contact__main">
              <p className="ta-sec__rail">{cleanKicker(c.contact.kicker)}</p>
              <h2 className="ta-contact__title" id="ta-contacto">
                <Seg seg={c.contact.headline1} />
                <br />
                <Seg seg={c.contact.headline2} />
              </h2>
              <p className="ta-contact__sub">{c.contact.sub}</p>
              <ContactForm title={c.contact.formTitle} />
            </div>
            <aside className="ta-contact__direct" aria-label={cleanKicker(c.contact.boxLabel)}>
              <p className="ta-svc__label">{cleanKicker(c.contact.boxLabel)}</p>
              <a href={`mailto:${c.contact.email}`} className="ta-contact__email">
                {c.contact.email}
              </a>
              <a href={c.contact.whatsappHref} target="_blank" rel="noopener" className="ta-contact__row">
                {cleanLabel(c.contact.whatsappLabel)}
                <Arrow size={18} />
              </a>
              <a href={c.contact.callHref} className="ta-contact__row">
                {cleanLabel(c.contact.callLabel)}
                <Arrow size={18} />
              </a>
            </aside>
          </div>
        </section>
      </main>

      <footer className="ta-foot">
        <div className="ta-wrap">
          <div className="ta-foot__grid">
            <div className="ta-foot__brand">
              <Logo height={28} />
              <p>{c.footer.brandText}</p>
            </div>
            {c.footer.cols.map((col, i) => (
              <nav key={i} className="ta-foot__col" aria-label={col.title}>
                <p className="ta-svc__label">{col.title}</p>
                <ul>
                  {live(col.links).map((l, j) => (
                    <li key={j}>
                      <a href={l.href} {...extProps(l.href)}>
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
          <div className="ta-foot__bottom">
            <span>{c.footer.copyright}</span>
            <span className="ta-foot__legal">
              <a href="/privacidad.html">Privacidad</a>
              <a href="/terminos.html">Términos</a>
            </span>
            <span>{c.footer.version}</span>
          </div>
        </div>
      </footer>

      <WhatsAppFloat />
    </div>
  )
}
