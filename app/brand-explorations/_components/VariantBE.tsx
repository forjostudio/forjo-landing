import Image from 'next/image'
import type { CSSProperties } from 'react'
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
import { Arm, Folio, Lines, Trap } from './editorial'
import '../variant-be.css'

/* ================================================================
   B EDITORIAL — CREATIVE BRUTALISM × EDITORIAL BRUTALISM (prefijo be-)
   Afiche en mayúsculas: un bloque naranja sólido que el titular atraviesa,
   barras gruesas con la proporción del palo del logo, figuras grandes que
   rompen el margen y secciones con ritmos distintos (pliego / tabla / pliego).
================================================================ */

function Btn({ href, label }: { href: string; label: string }) {
  return (
    <a className="be-btn" href={href} {...extProps(href)}>
      <span>{cleanLabel(label)}</span>
      <Arrow size={18} />
    </a>
  )
}

function Under({ href, label }: { href: string; label: string }) {
  return (
    <a className="be-under" href={href} {...extProps(href)}>
      {cleanLabel(label)}
      <Arrow size={16} />
    </a>
  )
}

function Plans({ item }: { item: ServiceItem }) {
  return (
    <div className="be-plans" style={{ ['--n' as string]: item.plans.length } as CSSProperties}>
      {item.plans.map((p, i) => (
        <div key={i} className={`be-plan${p.featured ? ' be-plan--featured bx-inv' : ''}`}>
          <p className="be-plan__name">{p.name}</p>
          {p.badge && (
            <p className="be-plan__badge">
              <Shape kind="block" size={10} />
              {p.badge}
            </p>
          )}
          {p.priceOld && <s className="be-plan__old">{p.priceOld}</s>}
          <p className="be-plan__price">
            {p.price}
            {p.unit && <span>{p.unit}</span>}
          </p>
          {p.setup && <p className="be-plan__setup">{p.setup}</p>}
          <ul className="be-plan__features">
            {p.features.map((f, j) => (
              <li key={j}>{f}</li>
            ))}
          </ul>
          {p.ctaLabel && <Btn href={p.ctaHref} label={p.ctaLabel} />}
        </div>
      ))}
    </div>
  )
}

function Service({ item, n, total, simple }: { item: ServiceItem; n: number; total: number; simple?: boolean }) {
  const hasExtras = item.note || item.included.length || item.addons.length || item.footnote
  return (
    <article className={`be-svc${simple ? ' be-svc--simple' : ''}`}>
      <div className="be-svc__cover eb-reveal">
        <Shape kind={shapeAt(n - 1)} size={160} className="be-svc__shape" />
        <Folio
          className="be-svc__folio"
          items={[`${pad(n)} / ${pad(total)}`, item.kicker || '—']}
        />
        <h3 className="be-svc__title">{item.title}</h3>
      </div>
      <div className="be-svc__lede">
        <p className="be-svc__desc">{item.desc}</p>
        {item.tags.length > 0 && (
          <ul className="be-svc__tags">
            {item.tags.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        )}
      </div>
      {item.plans.length > 0 && <Plans item={item} />}
      {item.price && (
        <p className="be-price">
          {item.priceOld && <s>{item.priceOld}</s>} {item.price}
          {item.priceNote && <span> {item.priceNote}</span>}
        </p>
      )}
      {hasExtras && (
        <div className="be-extras">
          {item.included.length > 0 && (
            <div>
              <p className="be-label">{item.includedLabel}</p>
              <ul className="be-extras__list">
                {item.included.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
            </div>
          )}
          <div>
            {item.note && <p className="be-note">{item.note}</p>}
            {item.addons.length > 0 && (
              <>
                <p className="be-label">{item.addonsLabel}</p>
                <ul className="be-extras__addons">
                  {item.addons.map((a, i) => (
                    <li key={i}>
                      <strong>{a.name}</strong>
                      {a.desc}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {item.footnote && <p className="be-foot">{item.footnote}</p>}
          </div>
        </div>
      )}
      {item.ctaLabel && (
        <div className="be-svc__cta">
          {simple ? <Btn href={item.ctaHref} label={item.ctaLabel} /> : <Under href={item.ctaHref} label={item.ctaLabel} />}
        </div>
      )}
    </article>
  )
}

export function VariantBE({ c }: { c: LandingContent }) {
  const { show, live } = visibility(c)
  const s = c.services
  const total = s.items.length

  return (
    <div className="be">
      <a className="be-skip" href="#contenido">
        Saltar al contenido
      </a>
      <header className="be-head">
        <div className="be-head__inner">
          <a href="#top" className="be-head__logo" aria-label="Forjo Studio, inicio">
            <Logo height={30} />
          </a>
          <nav aria-label="Principal" className="be-head__nav">
            <ul>
              {live(c.nav.links).map((l, i) => (
                <li key={i}>
                  <a className="eb-u" href={l.href}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a className="be-head__cta" href={c.nav.ctaHref}>
            {cleanLabel(c.nav.ctaLabel)}
          </a>
        </div>
      </header>

      <main id="contenido">
        {/* HERO: el titular atraviesa el bloque naranja */}
        <section className="be-hero" id="top">
          <div className="be-hero__block" aria-hidden="true">
            <span className="be-hero__dot" />
          </div>
          <Folio className="be-hero__folio" items={splitDots(c.hero.kicker)} />
          <h1 className="be-hero__title">
            <Lines
              lines={[
                [c.hero.headlinePre, c.hero.headlineAccent],
                [c.hero.headlineMid, c.hero.headlineEm, c.hero.headlinePost],
              ]}
            />
          </h1>
          <div className="be-hero__foot">
            <p className="be-hero__sub">{c.hero.sub}</p>
            <div className="be-hero__actions">
              <a className="be-cta" href={c.hero.ctaPrimaryHref} {...extProps(c.hero.ctaPrimaryHref)}>
                <Arm height={14} />
                <span>{cleanLabel(c.hero.ctaPrimaryLabel)}</span>
                <Arrow size={26} />
              </a>
              <Under href={c.hero.ctaSecondaryHref} label={c.hero.ctaSecondaryLabel} />
            </div>
            {/* Figuras en su propia celda, debajo del titular: nunca pisan letras. */}
            <div className="be-hero__art" aria-hidden="true">
              <Trap height={64} className="be-hero__trap" />
              <span className="be-hero__ci" />
            </div>
          </div>
        </section>

        {/* MARQUESINA */}
        {show('marquee') && (
          <div className="be-band bx-inv">
            <MarqueeTrack
              items={c.marquee}
              className="be-band__track"
              itemClass="be-band__item"
              sep={() => <Trap height={22} />}
            />
          </div>
        )}

        {/* SERVICIOS */}
        {show('services') && (
          <section className="be-sec" id="servicios" aria-labelledby="be-servicios">
            <div className="be-open">
              <h2 className="be-open__title" id="be-servicios">
                {s.title}
              </h2>
              <div className="be-open__side">
                <p className="be-label">{cleanKicker(s.kicker)}</p>
                <p className="be-open__intro">{s.intro}</p>
              </div>
            </div>
            {groupServices(s.items).map((g, gi) =>
              g.wide ? (
                g.items.map(({ item, n }) => <Service key={n} item={item} n={n} total={total} />)
              ) : (
                <div key={`g${gi}`} className="be-pair">
                  {g.items.map(({ item, n }) => (
                    <Service key={n} item={item} n={n} total={total} simple />
                  ))}
                </div>
              ),
            )}
          </section>
        )}

        {/* PROCESO: escalera */}
        {show('process') && (
          <section className="be-sec be-process bx-inv" id="proceso" aria-labelledby="be-proceso">
            <div className="be-open">
              <h2 className="be-open__title" id="be-proceso">
                {c.process.title}
              </h2>
              <div className="be-open__side">
                <p className="be-label">{cleanKicker(c.process.kicker)}</p>
                <p className="be-open__intro">{c.process.intro}</p>
              </div>
            </div>
            <ol className="be-steps">
              {c.process.steps.map((st, i) => {
                const m = splitMeta(st.meta)
                return (
                  <li key={i} className="be-step eb-reveal" style={{ ['--i' as string]: i } as CSSProperties}>
                    <span className="be-step__num" aria-hidden="true">
                      {m.num || pad(i + 1)}
                    </span>
                    <div>
                      <p className="be-label be-step__word">
                        <Trap height={12} />
                        {m.word}
                      </p>
                      <h3 className="be-step__title">{st.title}</h3>
                      <p className="be-step__desc">{st.desc}</p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </section>
        )}

        {/* TRABAJO */}
        {show('work') && (
          <section className="be-sec" id="trabajo" aria-labelledby="be-trabajo">
            <div className="be-open be-open--tight">
              <h2 className="be-open__title" id="be-trabajo">
                {c.work.title}
              </h2>
              <div className="be-open__side">
                <p className="be-label">{cleanKicker(c.work.kicker)}</p>
              </div>
            </div>
            <ul className="be-work">
              {c.work.projects.map((p, i) => (
                <li key={i} className="be-proj eb-reveal">
                  <h3 className="be-proj__name">
                    <a href={p.url} target="_blank" rel="noopener">
                      {p.name}
                    </a>
                  </h3>
                  <p className="be-proj__cap be-label">
                    {p.year}
                    <br />
                    {p.cat}
                  </p>
                  <div className="be-proj__media">
                    <span className={`be-proj__block be-proj__block--${i % 2 ? 'blue' : 'yellow'}`} aria-hidden="true" />
                    <a href={p.url} target="_blank" rel="noopener" className="be-proj__thumb" tabIndex={-1} aria-hidden="true">
                      {p.thumb && (
                        <Image
                          src={p.thumb}
                          alt=""
                          fill
                          sizes="(max-width: 1024px) 100vw, 75vw"
                          style={{ objectFit: 'cover', objectPosition: 'top center' }}
                        />
                      )}
                    </a>
                  </div>
                  {p.demoLabel && (
                    <div className="be-proj__link">
                      <Under href={p.url} label={p.demoLabel} />
                    </div>
                  )}
                </li>
              ))}
              {Array.from({ length: c.work.placeholders }).map((_, i) => (
                <li key={`ph${i}`} className="be-next eb-reveal">
                  <span className="be-next__q">El próximo?</span>
                  <span className="be-label">Tu negocio · Próximamente</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* NOSOTROS */}
        {show('about') && (
          <section className="be-sec be-about" id="nosotros" aria-labelledby="be-nosotros">
            <p className="be-label">{cleanKicker(c.about.kicker)}</p>
            <h2 className="be-about__title" id="be-nosotros">
              <Seg seg={c.about.headlinePre} />
              <br />
              <Seg seg={c.about.headlineMid} />
              <Seg seg={c.about.headlineEm} />
              <Seg seg={c.about.headlinePost} />
            </h2>
            <div className="be-about__body">
              {c.about.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <dl className="be-stats">
              {c.about.stats.map((st, i) => (
                <div key={i} className="be-stat eb-reveal">
                  <dt>{st.key}</dt>
                  <dd>{st.val}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* CONTACTO */}
        <section className="be-contact bx-inv" id="contacto" aria-labelledby="be-contacto">
          <span className="be-contact__sq" aria-hidden="true" />
          <h2 className="be-contact__title" id="be-contacto">
            <Seg seg={c.contact.headline1} />
            <br />
            <Seg seg={c.contact.headline2} />
          </h2>
          <div className="be-contact__grid">
            <div className="be-contact__form">
              <p className="be-label">{cleanKicker(c.contact.kicker)}</p>
              <p className="be-contact__sub">{c.contact.sub}</p>
              <ContactForm title={c.contact.formTitle} />
            </div>
            <div className="be-contact__direct">
              <p className="be-label">{cleanKicker(c.contact.boxLabel)}</p>
              <a href={`mailto:${c.contact.email}`} className="be-contact__email">
                {c.contact.email}
              </a>
              <a href={c.contact.whatsappHref} target="_blank" rel="noopener" className="be-contact__row">
                {cleanLabel(c.contact.whatsappLabel)}
                <ArrowUpRight size={20} />
              </a>
              <a href={c.contact.callHref} className="be-contact__row">
                {cleanLabel(c.contact.callLabel)}
                <Arrow size={20} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="be-footer">
        <div className="be-footer__grid">
          <div className="be-footer__brand">
            <Logo height={34} />
            <p>{c.footer.brandText}</p>
          </div>
          {c.footer.cols.map((col, i) => (
            <nav key={i} className="be-footer__col" aria-label={col.title}>
              <p className="be-label">{col.title}</p>
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
        <Folio
          className="be-footer__bottom"
          items={[
            c.footer.copyright,
            <span key="legal" className="be-footer__legal">
              <a href="/privacidad.html">Privacidad</a>
              <a href="/terminos.html">Términos</a>
            </span>,
            c.footer.version,
          ]}
        />
      </footer>

      <WhatsAppFloat />
    </div>
  )
}
