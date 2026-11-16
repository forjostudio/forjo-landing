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
import { Arm, Lines, Trap } from './editorial'
import { RunningHead, type RunningSection } from './RunningHead'
import '../variant-ce.css'

/* ================================================================
   C EDITORIAL — DIGITAL ENGINEERING × EDITORIAL BRUTALISM (prefijo ce-)
   Manual técnico: regla de columnas numerada, índice como portada,
   cabezal que sigue la sección, números de sección gigantes que salen
   de la grilla y fichas modulares con barras sólidas.
================================================================ */

function Btn({ href, label }: { href: string; label: string }) {
  return (
    <a className="ce-btn" href={href} {...extProps(href)}>
      <span>{cleanLabel(label)}</span>
      <Arrow size={18} />
    </a>
  )
}

function Opener({ num, label, title, intro, id }: { num: string; label: string; title: React.ReactNode; intro?: string; id: string }) {
  return (
    <header className="ce-open">
      <span className="ce-open__num" aria-hidden="true">
        {num}
      </span>
      <div className="ce-open__text">
        <p className="ce-open__label">
          §{num} — {label}
        </p>
        <h2 className="ce-open__title" id={id}>
          {title}
        </h2>
        {intro && <p className="ce-open__intro">{intro}</p>}
      </div>
    </header>
  )
}

function Plans({ item }: { item: ServiceItem }) {
  return (
    <div className="ce-plans" style={{ ['--n' as string]: item.plans.length } as CSSProperties}>
      {item.plans.map((p, i) => (
        <div key={i} className={`ce-plan${p.featured ? ' ce-plan--featured bx-inv' : ''}`}>
          <p className="ce-plan__name">
            <span>P{pad(i + 1)}</span>
            {p.name}
          </p>
          <div className="ce-plan__price">
            {p.priceOld && <s>{p.priceOld}</s>}
            <span className="ce-plan__amount">{p.price}</span>
            {p.unit && <span className="ce-plan__unit">{p.unit}</span>}
          </div>
          {/* Cinco filas siempre, para alinear los planes con subgrid. */}
          <div className="ce-plan__meta">
            {p.setup && <p>{p.setup}</p>}
            {p.badge && (
              <p className="ce-plan__badge">
                <Shape kind="block" size={10} />
                {p.badge}
              </p>
            )}
          </div>
          <ul className="ce-plan__features">
            {p.features.map((f, j) => (
              <li key={j}>{f}</li>
            ))}
          </ul>
          <div className="ce-plan__cta">{p.ctaLabel && <Btn href={p.ctaHref} label={p.ctaLabel} />}</div>
        </div>
      ))}
    </div>
  )
}

function Service({ item, n, total }: { item: ServiceItem; n: number; total: number }) {
  return (
    <article className="ce-svc eb-reveal" id={`ce-svc-${n}`} aria-labelledby={`ce-svc-t-${n}`}>
      <div className="ce-svc__bar bx-inv">
        <span className="ce-svc__code">
          <Shape kind={shapeAt(n - 1)} size={12} />
          S-{pad(n)}
        </span>
        <span className="ce-svc__kicker">{item.kicker || firstLine(item.title)}</span>
        <span className="ce-svc__count">
          {pad(n)}/{pad(total)}
        </span>
      </div>
      <div className="ce-svc__body">
        <div className="ce-svc__info">
          <h3 className="ce-svc__title" id={`ce-svc-t-${n}`}>
            {item.title}
          </h3>
          <p className="ce-svc__desc">{item.desc}</p>
          {item.tags.length > 0 && (
            <ul className="ce-chips">
              {item.tags.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="ce-spec">
          {item.plans.length > 0 && <Plans item={item} />}
          {item.price && (
            <div className="ce-spec__price">
              {item.priceOld && <s>{item.priceOld}</s>}
              <span>{item.price}</span>
              {item.priceNote && <small>{item.priceNote}</small>}
            </div>
          )}
          <dl className="ce-kv">
            {item.note && (
              <div className="ce-kv__row ce-kv__row--full">
                <dd>{item.note}</dd>
              </div>
            )}
            {item.included.length > 0 && (
              <div className="ce-kv__row">
                <dt>{item.includedLabel}</dt>
                <dd>
                  <ul className="ce-list">
                    {item.included.map((it, i) => (
                      <li key={i}>{it}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
            {item.addons.length > 0 && (
              <div className="ce-kv__row">
                <dt>{item.addonsLabel}</dt>
                <dd>
                  <ul className="ce-addons">
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
              <div className="ce-kv__row ce-kv__row--full">
                <dd className="ce-kv__foot">{item.footnote}</dd>
              </div>
            )}
          </dl>
          {item.ctaLabel && (
            <div className="ce-spec__cta">
              <Btn href={item.ctaHref} label={item.ctaLabel} />
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export function VariantCE({ c }: { c: LandingContent }) {
  const { show, live } = visibility(c)
  const s = c.services
  const total = s.items.length

  // Secciones visibles, numeradas en orden: alimentan el índice y el cabezal.
  const sections: (RunningSection & { label: string })[] = []
  const add = (id: string, label: string, title: string) =>
    sections.push({ id, label, title, code: `§${pad(sections.length + 1)}` })
  if (show('services')) add('servicios', cleanKicker(s.kicker), s.title)
  if (show('process')) add('proceso', cleanKicker(c.process.kicker), c.process.title)
  if (show('work')) add('trabajo', cleanKicker(c.work.kicker), c.work.title)
  if (show('about')) add('nosotros', cleanKicker(c.about.kicker), `${c.about.headlinePre.text} ${c.about.headlineMid.text}${c.about.headlineEm.text}${c.about.headlinePost.text}`)
  add('contacto', cleanKicker(c.contact.kicker), `${c.contact.headline1.text} ${c.contact.headline2.text}`)
  const num = (id: string) => sections.find((x) => x.id === id)?.code.slice(1) ?? ''
  const run: RunningSection[] = [{ id: 'top', code: '§00', title: 'Portada' }, ...sections.map(({ id, code, label }) => ({ id, code, title: label }))]

  return (
    <div className="ce">
      <a className="ce-skip" href="#contenido">
        Saltar al contenido
      </a>
      <header className="ce-head">
        <div className="ce-frame ce-head__inner">
          <a href="#top" className="ce-head__logo" aria-label="Forjo Studio, inicio">
            <Logo height={26} />
          </a>
          <nav aria-label="Principal" className="ce-head__nav">
            <ul>
              {live(c.nav.links).map((l, i) => (
                <li key={i}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <RunningHead sections={run} />
          <a className="ce-head__cta" href={c.nav.ctaHref}>
            {cleanLabel(c.nav.ctaLabel)}
            <Arrow size={16} />
          </a>
        </div>
      </header>

      <main id="contenido">
        {/* PORTADA: índice */}
        <section className="ce-hero" id="top">
          <div className="ce-frame">
            <ol className="ce-ruler" aria-hidden="true">
              {Array.from({ length: 12 }).map((_, i) => (
                <li key={i}>{pad(i + 1)}</li>
              ))}
            </ol>
            <div className="ce-hero__grid">
              <div className="ce-hero__main">
                <p className="ce-hero__folio">
                  <Arm height={10} />
                  {splitDots(c.hero.kicker).join(' / ')}
                </p>
                <h1 className="ce-hero__title">
                  <Lines
                    lines={[
                      [c.hero.headlinePre, c.hero.headlineAccent],
                      [c.hero.headlineMid, c.hero.headlineEm, c.hero.headlinePost],
                    ]}
                  />
                </h1>
                <p className="ce-hero__sub">{c.hero.sub}</p>
                <div className="ce-hero__actions">
                  <a className="ce-cta" href={c.hero.ctaPrimaryHref} {...extProps(c.hero.ctaPrimaryHref)}>
                    <span>{cleanLabel(c.hero.ctaPrimaryLabel)}</span>
                    <Arrow size={26} />
                  </a>
                  <a className="ce-link eb-u" href={c.hero.ctaSecondaryHref} {...extProps(c.hero.ctaSecondaryHref)}>
                    {cleanLabel(c.hero.ctaSecondaryLabel)}
                    <Arrow size={16} />
                  </a>
                </div>
              </div>

              <nav className="ce-toc" aria-label="Índice">
                <p className="ce-toc__head">Índice</p>
                <ol>
                  {sections.map((sec) => (
                    <li key={sec.id}>
                      <a href={`#${sec.id}`} className="ce-toc__row">
                        <span className="ce-toc__code">{sec.code}</span>
                        <span className="ce-toc__name">{sec.label}</span>
                        <span className="ce-toc__lead" aria-hidden="true" />
                      </a>
                      {sec.id === 'servicios' && (
                        <ol className="ce-toc__sub">
                          {s.items.map((item, i) => {
                            const price = lowestPrice(item)
                            return (
                              <li key={i} style={{ ['--i' as string]: i } as CSSProperties}>
                                <a href={`#ce-svc-${i + 1}`} className="ce-toc__svc">
                                  <Shape kind={shapeAt(i)} size={12} />
                                  <span className="ce-toc__svc-name">{item.kicker || firstLine(item.title)}</span>
                                  {price && (
                                    <span className="ce-toc__price">
                                      {price.from && <span>desde </span>}
                                      {price.label}
                                    </span>
                                  )}
                                </a>
                              </li>
                            )
                          })}
                        </ol>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </div>
        </section>

        {/* CAPACIDADES */}
        {show('marquee') && (
          <div className="ce-caps">
            <ul className="ce-frame ce-caps__grid" aria-label="Lo que hacemos">
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
          <section className="ce-sec" id="servicios" aria-labelledby="ce-servicios">
            <div className="ce-frame">
              <Opener num={num('servicios')} label={cleanKicker(s.kicker)} title={s.title} intro={s.intro} id="ce-servicios" />
              {groupServices(s.items).map((g, gi) =>
                g.wide ? (
                  g.items.map(({ item, n }) => <Service key={n} item={item} n={n} total={total} />)
                ) : (
                  <div key={`g${gi}`} className="ce-pair">
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
          <section className="ce-sec ce-process bx-inv" id="proceso" aria-labelledby="ce-proceso">
            <div className="ce-frame">
              <Opener
                num={num('proceso')}
                label={cleanKicker(c.process.kicker)}
                title={c.process.title}
                intro={c.process.intro}
                id="ce-proceso"
              />
              <ol className="ce-pipe">
                {c.process.steps.map((st, i) => {
                  const m = splitMeta(st.meta)
                  return (
                    <li key={i} className="ce-pipe__step">
                      <div className="ce-pipe__node">
                        <span className="ce-pipe__num">{m.num || pad(i + 1)}</span>
                        {i < c.process.steps.length - 1 && <Trap height={14} className="ce-pipe__trap" />}
                      </div>
                      <p className="ce-pipe__word">{m.word}</p>
                      <h3 className="ce-pipe__title">{st.title}</h3>
                      <p className="ce-pipe__desc">{st.desc}</p>
                    </li>
                  )
                })}
              </ol>
            </div>
          </section>
        )}

        {/* TRABAJO */}
        {show('work') && (
          <section className="ce-sec" id="trabajo" aria-labelledby="ce-trabajo">
            <div className="ce-frame">
              <Opener num={num('trabajo')} label={cleanKicker(c.work.kicker)} title={c.work.title} id="ce-trabajo" />
              <ul className="ce-work">
                {c.work.projects.map((p, i) => (
                  <li key={i} className="ce-proj eb-reveal">
                    <a href={p.url} target="_blank" rel="noopener" className="ce-proj__thumb" tabIndex={-1} aria-hidden="true">
                      {p.thumb && (
                        <Image
                          src={p.thumb}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 460px"
                          style={{ objectFit: 'cover', objectPosition: 'top center' }}
                        />
                      )}
                      <span className="ce-proj__tag">W-{pad(i + 1)}</span>
                    </a>
                    <dl className="ce-proj__data">
                      <div>
                        <dt>Proyecto</dt>
                        <dd>
                          <a href={p.url} target="_blank" rel="noopener" className="ce-proj__name">
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
                        <dd className="ce-num">{p.year}</dd>
                      </div>
                    </dl>
                  </li>
                ))}
                {Array.from({ length: c.work.placeholders }).map((_, i) => (
                  <li key={`ph${i}`} className="ce-proj ce-proj--next">
                    <div className="ce-proj__thumb ce-proj__thumb--empty">
                      <span>El próximo?</span>
                    </div>
                    <dl className="ce-proj__data">
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
            </div>
          </section>
        )}

        {/* NOSOTROS */}
        {show('about') && (
          <section className="ce-sec" id="nosotros" aria-labelledby="ce-nosotros">
            <div className="ce-frame">
              <Opener
                num={num('nosotros')}
                label={cleanKicker(c.about.kicker)}
                id="ce-nosotros"
                title={
                  <>
                    <Seg seg={c.about.headlinePre} /> <Seg seg={c.about.headlineMid} />
                    <Seg seg={c.about.headlineEm} />
                    <Seg seg={c.about.headlinePost} />
                  </>
                }
              />
              <div className="ce-about">
                <div className="ce-about__body">
                  {c.about.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <dl className="ce-stats">
                  {c.about.stats.map((st, i) => (
                    <div key={i} className="ce-stats__row">
                      <dt className="ce-num">{st.key}</dt>
                      <dd>{st.val}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>
        )}

        {/* CONTACTO */}
        <section className="ce-sec ce-contact bx-inv" id="contacto" aria-labelledby="ce-contacto">
          <div className="ce-frame">
            <Opener
              num={num('contacto')}
              label={cleanKicker(c.contact.kicker)}
              id="ce-contacto"
              title={
                <>
                  <Seg seg={c.contact.headline1} />
                  <br />
                  <Seg seg={c.contact.headline2} />
                </>
              }
              intro={c.contact.sub}
            />
            <div className="ce-contact__grid">
              <div className="ce-contact__form">
                <ContactForm title={c.contact.formTitle} />
              </div>
              <div className="ce-contact__direct">
                <p className="ce-contact__label">{cleanKicker(c.contact.boxLabel)}</p>
                <a href={`mailto:${c.contact.email}`} className="ce-contact__row ce-contact__row--email">
                  <span>{c.contact.email}</span>
                  <Arrow size={18} />
                </a>
                <a href={c.contact.whatsappHref} target="_blank" rel="noopener" className="ce-contact__row">
                  <span>{cleanLabel(c.contact.whatsappLabel)}</span>
                  <ArrowUpRight size={18} />
                </a>
                <a href={c.contact.callHref} className="ce-contact__row">
                  <span>{cleanLabel(c.contact.callLabel)}</span>
                  <Arrow size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="ce-foot">
        <div className="ce-frame">
          <div className="ce-foot__grid">
            <div className="ce-foot__brand">
              <Logo height={26} />
              <p>{c.footer.brandText}</p>
            </div>
            {c.footer.cols.map((col, i) => (
              <nav key={i} className="ce-foot__col" aria-label={col.title}>
                <p className="ce-foot__title">{col.title}</p>
                <ul>
                  {live(col.links).map((l, j) => (
                    <li key={j}>
                      <a className="eb-u" href={l.href} {...extProps(l.href)}>
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
          <div className="ce-foot__bottom">
            <span>{c.footer.copyright}</span>
            <span className="ce-foot__legal">
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
