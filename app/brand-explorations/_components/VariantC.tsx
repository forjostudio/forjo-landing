import Image from 'next/image'
import type { CSSProperties } from 'react'
import type { LandingContent, ServiceItem } from '@/lib/content/schema'
import { ContactForm } from '@/components/ContactForm'
import {
  Arrow,
  ArrowUpRight,
  Logo,
  Seg,
  Shape,
  WhatsAppFloat,
  cleanKicker,
  cleanLabel,
  extProps,
  firstLine,
  groupServices,
  lowestPrice,
  pad,
  shapeAt,
  splitDots,
  splitMeta,
  visibility,
} from './shared'
import '../variant-c.css'

/* ================================================================
   C — DIGITAL ENGINEERING
   Hoja de especificación: módulos sobre una grilla visible, cada pieza
   con su código, precios en tabla y el índice de servicios como navegación.
================================================================ */

function Btn({ href, label }: { href: string; label: string }) {
  return (
    <a className="de-btn" href={href} {...extProps(href)}>
      <span>{cleanLabel(label)}</span>
      <Arrow size={18} />
    </a>
  )
}

function SecHead({ code, title, intro, id }: { code: string; title: React.ReactNode; intro?: string; id: string }) {
  return (
    <div className="de-sechead">
      <p className="de-sechead__code">{code}</p>
      <h2 className="de-sechead__title" id={id}>
        {title}
      </h2>
      {intro && <p className="de-sechead__intro">{intro}</p>}
    </div>
  )
}

function Plans({ item }: { item: ServiceItem }) {
  return (
    <div className="de-plans" style={{ ['--n' as string]: item.plans.length } as CSSProperties}>
      {item.plans.map((p, i) => (
        <div key={i} className={`de-plan${p.featured ? ' de-plan--featured bx-inv' : ''}`}>
          <p className="de-plan__name">
            <span>P{pad(i + 1)}</span>
            {p.name}
          </p>
          <div className="de-plan__price">
            {p.priceOld && <s>{p.priceOld}</s>}
            <span className="de-plan__amount">{p.price}</span>
            {p.unit && <span className="de-plan__unit">{p.unit}</span>}
          </div>
          {/* Las cinco filas van siempre (aunque estén vacías) para que los
              planes queden alineados fila a fila con subgrid. */}
          <div className="de-plan__meta">
            {p.setup && <p>{p.setup}</p>}
            {p.badge && (
              <p className="de-plan__badge">
                <Shape kind="block" size={10} />
                {p.badge}
              </p>
            )}
          </div>
          <ul className="de-plan__features">
            {p.features.map((f, j) => (
              <li key={j}>{f}</li>
            ))}
          </ul>
          <div className="de-plan__cta">{p.ctaLabel && <Btn href={p.ctaHref} label={p.ctaLabel} />}</div>
        </div>
      ))}
    </div>
  )
}

function Spec({ item }: { item: ServiceItem }) {
  return (
    <div className="de-spec">
      {item.plans.length > 0 && <Plans item={item} />}
      {item.price && (
        <div className="de-spec__price">
          {item.priceOld && <s>{item.priceOld}</s>}
          <span>{item.price}</span>
          {item.priceNote && <small>{item.priceNote}</small>}
        </div>
      )}
      <dl className="de-kv">
        {item.note && (
          <div className="de-kv__row de-kv__row--full">
            <dd>{item.note}</dd>
          </div>
        )}
        {item.included.length > 0 && (
          <div className="de-kv__row">
            <dt>{item.includedLabel}</dt>
            <dd>
              <ul className="de-list">
                {item.included.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
            </dd>
          </div>
        )}
        {item.addons.length > 0 && (
          <div className="de-kv__row">
            <dt>{item.addonsLabel}</dt>
            <dd>
              <ul className="de-addons">
                {item.addons.map((a, i) => (
                  <li key={i}>
                    <strong>{a.name}</strong>
                    {a.desc}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        )}
        {item.footnote && (
          <div className="de-kv__row de-kv__row--full">
            <dd className="de-kv__foot">{item.footnote}</dd>
          </div>
        )}
      </dl>
      {item.ctaLabel && (
        <div className="de-spec__cta">
          <Btn href={item.ctaHref} label={item.ctaLabel} />
        </div>
      )}
    </div>
  )
}

function Service({ item, n, total }: { item: ServiceItem; n: number; total: number }) {
  return (
    <article className="de-svc" id={`svc-${n}`} aria-labelledby={`de-svc-${n}`}>
      <div className="de-svc__bar">
        <span className="de-svc__code">
          <Shape kind={shapeAt(n - 1)} size={12} />
          S-{pad(n)}
        </span>
        <span className="de-svc__kicker">{item.kicker || firstLine(item.title)}</span>
        <span className="de-svc__count">
          {pad(n)}/{pad(total)}
        </span>
      </div>
      <div className="de-svc__body">
        <div className="de-svc__info">
          <h3 className="de-svc__title" id={`de-svc-${n}`}>
            {item.title}
          </h3>
          <p className="de-svc__desc">{item.desc}</p>
          {item.tags.length > 0 && (
            <ul className="de-chips">
              {item.tags.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          )}
        </div>
        <Spec item={item} />
      </div>
    </article>
  )
}

export function VariantC({ c }: { c: LandingContent }) {
  const { show, live } = visibility(c)
  const s = c.services
  const total = s.items.length

  // Códigos de sección según las que estén visibles.
  let sec = 0
  const code = (label: string) => `§${pad(++sec)} · ${label}`

  return (
    <div className="de">
      <a className="de-skip" href="#contenido">
        Saltar al contenido
      </a>
      <header className="de-head">
        <div className="de-frame de-head__inner">
          <a href="#top" className="de-head__logo" aria-label="Forjo Studio, inicio">
            <Logo height={28} />
          </a>
          <nav aria-label="Principal" className="de-head__nav">
            <ul>
              {live(c.nav.links).map((l, i) => (
                <li key={i}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <a className="de-head__cta" href={c.nav.ctaHref}>
            {cleanLabel(c.nav.ctaLabel)}
            <Arrow size={16} />
          </a>
        </div>
      </header>

      <main id="contenido">
        {/* HERO */}
        <section className="de-hero" id="top">
          <div className="de-frame">
            <div className="de-hero__grid">
              <div className="de-hero__main">
                <h1 className="de-hero__title">
                  <Seg seg={c.hero.headlinePre} />
                  <Seg seg={c.hero.headlineAccent} />
                  <br />
                  <Seg seg={c.hero.headlineMid} />
                  <Seg seg={c.hero.headlineEm} />
                  <Seg seg={c.hero.headlinePost} />
                </h1>
                <p className="de-hero__sub">{c.hero.sub}</p>
                <div className="de-hero__actions">
                  <a className="de-cta" href={c.hero.ctaPrimaryHref} {...extProps(c.hero.ctaPrimaryHref)}>
                    <span>{cleanLabel(c.hero.ctaPrimaryLabel)}</span>
                    <Arrow size={26} />
                  </a>
                  <a className="de-link" href={c.hero.ctaSecondaryHref} {...extProps(c.hero.ctaSecondaryHref)}>
                    {cleanLabel(c.hero.ctaSecondaryLabel)}
                    <Arrow size={16} />
                  </a>
                </div>
              </div>

              {show('services') && s.items.length > 0 && (
                <nav className="de-index" aria-label={`Índice de ${cleanKicker(s.kicker)}`}>
                  <p className="de-index__head">
                    <span>{cleanKicker(s.kicker)}</span>
                    <span>{pad(total)}</span>
                  </p>
                  <ol>
                    {s.items.map((item, i) => {
                      const price = lowestPrice(item)
                      return (
                        <li key={i} style={{ ['--i' as string]: i } as CSSProperties}>
                          <a href={`#svc-${i + 1}`} className="de-index__row">
                            <Shape kind={shapeAt(i)} size={14} />
                            <span className="de-index__code">S-{pad(i + 1)}</span>
                            <span className="de-index__name">{item.kicker || firstLine(item.title)}</span>
                            {price && (
                              <span className="de-index__price">
                                {price.from && <span>desde </span>}
                                {price.label}
                              </span>
                            )}
                          </a>
                        </li>
                      )
                    })}
                  </ol>
                </nav>
              )}
            </div>
            <ul className="de-strip">
              {splitDots(c.hero.kicker).map((part, i) => (
                <li key={i}>
                  <span>{pad(i + 1)}</span>
                  {part}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CAPACIDADES (marquesina) */}
        {show('marquee') && (
          <div className="de-caps">
            <ul className="de-frame de-caps__grid" aria-label="Lo que hacemos">
              {c.marquee.map((t, i) => (
                <li key={i}>
                  <span>C-{pad(i + 1)}</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* SERVICIOS */}
        {show('services') && (
          <section className="de-sec" id="servicios" aria-labelledby="de-servicios">
            <div className="de-frame">
              <SecHead code={code(cleanKicker(s.kicker))} title={s.title} intro={s.intro} id="de-servicios" />
              {groupServices(s.items).map((g, gi) =>
                g.wide ? (
                  g.items.map(({ item, n }) => <Service key={n} item={item} n={n} total={total} />)
                ) : (
                  <div key={`g${gi}`} className="de-pair">
                    {g.items.map(({ item, n }) => (
                      <Service key={n} item={item} n={n} total={total} />
                    ))}
                  </div>
                ),
              )}
            </div>
          </section>
        )}

        {/* PROCESO */}
        {show('process') && (
          <section className="de-sec de-process bx-inv" id="proceso" aria-labelledby="de-proceso">
            <div className="de-frame">
              <SecHead
                code={code(cleanKicker(c.process.kicker))}
                title={c.process.title}
                intro={c.process.intro}
                id="de-proceso"
              />
              <ol className="de-pipe">
                {c.process.steps.map((st, i) => {
                  const m = splitMeta(st.meta)
                  return (
                    <li key={i} className="de-pipe__step">
                      <div className="de-pipe__node">
                        <span className="de-pipe__num">{m.num || pad(i + 1)}</span>
                        <span className="de-pipe__word">{m.word}</span>
                      </div>
                      <h3 className="de-pipe__title">{st.title}</h3>
                      <p className="de-pipe__desc">{st.desc}</p>
                    </li>
                  )
                })}
              </ol>
            </div>
          </section>
        )}

        {/* TRABAJO */}
        {show('work') && (
          <section className="de-sec" id="trabajo" aria-labelledby="de-trabajo">
            <div className="de-frame">
              <SecHead code={code(cleanKicker(c.work.kicker))} title={c.work.title} id="de-trabajo" />
              <ul className="de-work">
                {c.work.projects.map((p, i) => (
                  <li key={i} className="de-proj">
                    <a href={p.url} target="_blank" rel="noopener" className="de-proj__thumb" tabIndex={-1} aria-hidden="true">
                      {p.thumb && (
                        <Image
                          src={p.thumb}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 460px"
                          style={{ objectFit: 'cover', objectPosition: 'top center' }}
                        />
                      )}
                      <span className="de-proj__tag">W-{pad(i + 1)}</span>
                    </a>
                    <dl className="de-proj__data">
                      <div>
                        <dt>Proyecto</dt>
                        <dd>
                          <a href={p.url} target="_blank" rel="noopener" className="de-proj__name">
                            {p.name}
                            <ArrowUpRight size={18} />
                          </a>
                        </dd>
                      </div>
                      <div>
                        <dt>Tipo</dt>
                        <dd>{p.cat}</dd>
                      </div>
                      <div>
                        <dt>Año</dt>
                        <dd className="de-num">{p.year}</dd>
                      </div>
                    </dl>
                  </li>
                ))}
                {Array.from({ length: c.work.placeholders }).map((_, i) => (
                  <li key={`ph${i}`} className="de-proj de-proj--next">
                    <div className="de-proj__thumb de-proj__thumb--empty">
                      <span>El próximo?</span>
                    </div>
                    <dl className="de-proj__data">
                      <div>
                        <dt>Proyecto</dt>
                        <dd>Tu negocio</dd>
                      </div>
                      <div>
                        <dt>Estado</dt>
                        <dd>Próximamente</dd>
                      </div>
                    </dl>
                  </li>
                ))}
              </ul>
              {c.work.allHref && c.work.allHref !== '#' && (
                <div className="de-work__all">
                  <Btn href={c.work.allHref} label={c.work.allLabel} />
                </div>
              )}
            </div>
          </section>
        )}

        {/* NOSOTROS */}
        {show('about') && (
          <section className="de-sec" id="nosotros" aria-labelledby="de-nosotros">
            <div className="de-frame">
              <SecHead
                code={code(cleanKicker(c.about.kicker))}
                id="de-nosotros"
                title={
                  <>
                    <Seg seg={c.about.headlinePre} /> <Seg seg={c.about.headlineMid} />
                    <Seg seg={c.about.headlineEm} />
                    <Seg seg={c.about.headlinePost} />
                  </>
                }
              />
              <div className="de-about">
                <div className="de-about__body">
                  {c.about.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <dl className="de-stats">
                  {c.about.stats.map((st, i) => (
                    <div key={i} className="de-stats__row">
                      <dt className="de-num">{st.key}</dt>
                      <dd>{st.val}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>
        )}

        {/* CONTACTO */}
        <section className="de-sec de-contact bx-inv" id="contacto" aria-labelledby="de-contacto">
          <div className="de-frame">
            <SecHead
              code={code(cleanKicker(c.contact.kicker))}
              id="de-contacto"
              title={
                <>
                  <Seg seg={c.contact.headline1} />
                  <br />
                  <Seg seg={c.contact.headline2} />
                </>
              }
              intro={c.contact.sub}
            />
            <div className="de-contact__grid">
              <div className="de-contact__form">
                <ContactForm title={c.contact.formTitle} />
              </div>
              <div className="de-contact__direct">
                <p className="de-contact__label">{cleanKicker(c.contact.boxLabel)}</p>
                <a href={`mailto:${c.contact.email}`} className="de-contact__row de-contact__row--email">
                  <span>{c.contact.email}</span>
                  <Arrow size={18} />
                </a>
                <a href={c.contact.whatsappHref} target="_blank" rel="noopener" className="de-contact__row">
                  <span>{cleanLabel(c.contact.whatsappLabel)}</span>
                  <ArrowUpRight size={18} />
                </a>
                <a href={c.contact.callHref} className="de-contact__row">
                  <span>{cleanLabel(c.contact.callLabel)}</span>
                  <Arrow size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="de-foot">
        <div className="de-frame">
          <div className="de-foot__grid">
            <div className="de-foot__brand">
              <Logo height={26} />
              <p>{c.footer.brandText}</p>
            </div>
            {c.footer.cols.map((col, i) => (
              <nav key={i} className="de-foot__col" aria-label={col.title}>
                <p className="de-foot__title">{col.title}</p>
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
          <div className="de-foot__bottom">
            <span>{c.footer.copyright}</span>
            <span className="de-foot__legal">
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
