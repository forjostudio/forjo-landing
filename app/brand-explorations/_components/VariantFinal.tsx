import Image from 'next/image'
import type { CSSProperties } from 'react'
import type { LandingContent } from '@/lib/content/schema'
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
  shapeAt,
  splitDots,
  splitMeta,
  visibility,
} from './shared'
import { Btn, Plans, ServiceExtras, ServiceHead, TextLink } from './VariantA'
import { Slab, UnderLink } from './VariantB'
import '../variant-final.css'

/* ================================================================
   BOCETO FINAL — mezcla de A (Technical Bold) y B (Creative Brutalism),
   sin la versión editorial. Reutiliza las piezas y los estilos de A (ta-)
   y B (cb-); variant-final.css (fx-) solo ajusta lo que cambia.

   - Header, hero y banda: B. El hero + la banda ocupan justo la pantalla.
   - Servicios, proceso y nosotros: A.
   - Trabajo: B, con el título de sección de A.
   - Contacto: B, con el titular en el estilo de A.
   - Pie: A, con la línea de créditos de B.
================================================================ */

/**
 * Ajustes de contenido pedidos para el boceto. Se aplican solo acá: la web
 * real sigue leyendo el panel, donde hay que cargarlos al pasar a producción.
 * Si el texto del panel cambia y ya no coincide, no se toca nada.
 */
// El "sin comisión" vale solo para efectivo o transferencia: los pagos online
// van a tener comisión.
const NO_COMMISSION_TAG = 'Sin comisión en efectivo o transferencia'
const NO_COMMISSION_NOTE =
  'Lo que cobrás en efectivo o por transferencia es todo tuyo: Forjo no se lleva un porcentaje. Los pagos online tienen comisión.'

function fixCommission<T extends { tags: string[]; footnote: string }>(it: T): T {
  return {
    ...it,
    tags: it.tags.map((t) => (/sin comisi/i.test(t) ? NO_COMMISSION_TAG : t)),
    footnote: it.footnote.replace(
      /Lo que vend[eé]s es tuyo: Forjo no se lleva un porcentaje\.(\s*Si sum[aá]s Mercado Pago, la comisi[oó]n es de ellos\.)?/i,
      NO_COMMISSION_NOTE,
    ),
  }
}

function bocetoContent(c: LandingContent): LandingContent {
  const items = c.services.items.map(fixCommission).map((it) => {
    const t = it.title.trim().toLowerCase()
    if (t.startsWith('sitios web') && it.price && !/^desde/i.test(it.price)) {
      return { ...it, priceOld: '', price: `Desde ${it.price}`, priceNote: 'según alcance · efectivo o transferencia' }
    }
    if (t.startsWith('software a medida') && it.price && !it.plans.length) {
      return {
        ...it,
        desc: `${it.desc.trim()} ${it.price.trim().replace(/\.?$/, '.')}`,
        price: '',
        ctaLabel: it.ctaLabel || 'Cotizar →',
        ctaHref: it.ctaHref || '#contacto',
      }
    }
    return it
  })
  // El 0% de comisión vale solo para efectivo o transferencia: sale de Nosotros.
  const stats = c.about.stats.filter((s) => s.key.replace(/\s/g, '') !== '0%')
  return { ...c, services: { ...c.services, items }, about: { ...c.about, stats } }
}

export function VariantFinal({ c: raw }: { c: LandingContent }) {
  const c = bocetoContent(raw)
  const { show, live } = visibility(c)
  const s = c.services
  const total = s.items.length

  return (
    <div className="cb fx">
      <a className="cb-skip" href="#contenido">
        Saltar al contenido
      </a>

      {/* HEADER (B) */}
      <header className="cb-head">
        <div className="cb-head__inner">
          <a href="#top" className="cb-head__logo" aria-label="Forjo Studio, inicio">
            <Logo height={30} />
          </a>
          <nav aria-label="Principal" className="cb-head__nav">
            <ul>
              {live(c.nav.links).map((l, i) => (
                <li key={i}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <a className="cb-head__cta" href={c.nav.ctaHref}>
            {cleanLabel(c.nav.ctaLabel)}
          </a>
        </div>
      </header>

      <main id="contenido">
        {/* HERO (B): alto calculado para que la banda cierre la pantalla */}
        <section className="cb-hero fx-hero" id="top">
          <p className="cb-hero__meta">
            {splitDots(c.hero.kicker).map((p, i) => (
              <span key={i}>{p}</span>
            ))}
          </p>
          <h1 className="cb-hero__title">
            <Seg seg={c.hero.headlinePre} />
            <Seg seg={c.hero.headlineAccent} />
            <br />
            <Seg seg={c.hero.headlineMid} />
            <Seg seg={c.hero.headlineEm} />
            <Seg seg={c.hero.headlinePost} />
          </h1>
          <div className="fx-row">
            <div className="fx-copy">
              <p className="cb-hero__sub">{c.hero.sub}</p>
              <div className="cb-hero__actions">
                <Slab href={c.hero.ctaPrimaryHref} label={c.hero.ctaPrimaryLabel} />
                <UnderLink href={c.hero.ctaSecondaryHref} label={c.hero.ctaSecondaryLabel} />
              </div>
            </div>
            <div className="fx-art" aria-hidden="true">
              <span className="fx-sq" />
              <span className="fx-tr" />
              <span className="fx-ci" />
              <span className="fx-bl" />
            </div>
          </div>
        </section>

        {/* BANDA (B) */}
        {show('marquee') && (
          <div className="cb-band">
            <MarqueeTrack
              items={c.marquee}
              className="cb-band__track"
              itemClass="cb-band__item"
              sep={() => <Shape kind="circle" size={20} />}
            />
          </div>
        )}

        {/* SERVICIOS (A) */}
        {show('services') && (
          <section className="ta-sec" id="servicios" aria-labelledby="fx-servicios">
            <div className="ta-wrap">
              <div className="ta-sec__head">
                <p className="ta-sec__rail">{cleanKicker(s.kicker)}</p>
                <h2 className="ta-sec__title" id="fx-servicios">
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

        {/* PROCESO (A) */}
        {show('process') && (
          <section className="ta-sec ta-process bx-inv" id="proceso" aria-labelledby="fx-proceso">
            <div className="ta-wrap">
              <div className="ta-sec__head">
                <p className="ta-sec__rail">{cleanKicker(c.process.kicker)}</p>
                <h2 className="ta-sec__title" id="fx-proceso">
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

        {/* TRABAJO (B, con el título de sección de A) */}
        {show('work') && (
          <section className="ta-sec" id="trabajo" aria-labelledby="fx-trabajo">
            <div className="ta-wrap">
              <div className="ta-sec__head ta-sec__head--row">
                <p className="ta-sec__rail">{cleanKicker(c.work.kicker)}</p>
                <h2 className="ta-sec__title" id="fx-trabajo">
                  {c.work.title}
                </h2>
                {c.work.allHref && c.work.allHref !== '#' && <TextLink href={c.work.allHref} label={c.work.allLabel} />}
              </div>
              <ul className="cb-work">
                {c.work.projects.map((p, i) => (
                  <li key={i} className={`cb-proj${i % 2 ? ' cb-proj--flip' : ''}`}>
                    <div className="cb-proj__media">
                      <Shape kind={i % 2 ? 'triangle' : 'block'} size={200} className="cb-proj__shape" />
                      <a href={p.url} target="_blank" rel="noopener" className="cb-proj__thumb" tabIndex={-1} aria-hidden="true">
                        {p.thumb && (
                          <Image
                            src={p.thumb}
                            alt=""
                            fill
                            sizes="(max-width: 1024px) 100vw, 60vw"
                            style={{ objectFit: 'cover', objectPosition: 'top center' }}
                          />
                        )}
                      </a>
                    </div>
                    <div className="cb-proj__meta">
                      <p className="cb-label">
                        {p.year} · {p.cat}
                      </p>
                      <h3 className="cb-proj__name">
                        <a href={p.url} target="_blank" rel="noopener">
                          {p.name}
                        </a>
                      </h3>
                      {p.demoLabel && <UnderLink href={p.url} label={p.demoLabel} />}
                    </div>
                  </li>
                ))}
                {Array.from({ length: c.work.placeholders }).map((_, i) => (
                  <li key={`ph${i}`} className="cb-next">
                    <span className="cb-next__q">El próximo?</span>
                    <span className="cb-label">Tu negocio · Próximamente</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* NOSOTROS (A, sin el 0%) */}
        {show('about') && (
          <section className="ta-sec ta-about" id="nosotros" aria-labelledby="fx-nosotros">
            <div className="ta-wrap">
              <div className="ta-about__grid">
                <p className="ta-sec__rail">{cleanKicker(c.about.kicker)}</p>
                <h2 className="ta-about__title" id="fx-nosotros">
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
              {c.about.stats.length > 0 && (
                <dl className="ta-stats fx-stats" style={{ ['--n' as string]: c.about.stats.length } as CSSProperties}>
                  {c.about.stats.map((st, i) => (
                    <div key={i} className="ta-stat">
                      <dt>{st.key}</dt>
                      <dd>{st.val}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </section>
        )}

        {/* CONTACTO (B, titular en estilo A) */}
        <section className="cb-contact fx-contact" id="contacto" aria-labelledby="fx-contacto">
          <div className="cb-contact__slab">
            <h2 className="cb-contact__title" id="fx-contacto">
              <Seg seg={c.contact.headline1} />
              <br />
              <Seg seg={c.contact.headline2} />
            </h2>
            <Shape kind="circle" size={120} className="cb-contact__ci" />
          </div>
          <div className="cb-contact__side">
            <p className="ta-sec__rail">{cleanKicker(c.contact.kicker)}</p>
            <p className="cb-contact__sub">{c.contact.sub}</p>
            <ContactForm title={c.contact.formTitle} />
            <div className="cb-contact__direct">
              <p className="cb-label">{cleanKicker(c.contact.boxLabel)}</p>
              <a href={`mailto:${c.contact.email}`} className="cb-contact__email">
                {c.contact.email}
              </a>
              <a href={c.contact.whatsappHref} target="_blank" rel="noopener" className="cb-contact__row">
                {cleanLabel(c.contact.whatsappLabel)}
                <ArrowUpRight size={20} />
              </a>
              <a href={c.contact.callHref} className="cb-contact__row">
                {cleanLabel(c.contact.callLabel)}
                <Arrow size={20} />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* PIE (A, créditos de B) */}
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
          <div className="cb-footer__bottom">
            <span>{c.footer.copyright}</span>
            <span className="cb-footer__legal">
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
