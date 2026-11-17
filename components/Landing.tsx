import Image from 'next/image'
import type { CSSProperties } from 'react'
import { ContactForm } from '@/components/ContactForm'
import { SHAPE_COLORS, type LandingContent, type ServiceItem } from '@/lib/content/schema'
import { brandFontVars } from '@/components/landing/fonts'
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
} from '@/components/landing/shared'
import '@/components/landing/landing.css'

/** Colores de forma válidos (los del panel); cualquier otro valor = automático. */
const SHAPE_FILLS = new Set(SHAPE_COLORS.map((s) => s.value))

/** Parte un texto en oraciones (después de . ! ? seguidos de espacio). */
const sentences = (text: string) => text.split(/(?<=[.!?])\s+/).filter(Boolean)

/* ================================================================
   Landing de forjo.studio (Exploración visual 2.0, boceto final).
   Header, hero, banda, trabajo y contacto vienen de la variante B; servicios,
   proceso, nosotros y pie, de la A. Siempre en modo oscuro.

   La usan la página pública y la vista previa del editor del panel (que le
   pasa lo que se está editando, sin guardar). `fx` apaga el movimiento en la
   vista previa. Los `data-edit` marcan cada sección para el editor.
================================================================ */

function Btn({ href, label, size = 'md' }: { href: string; label: string; size?: 'sm' | 'md' }) {
  return (
    <a className={`l-btn l-btn--${size}`} href={href} {...extProps(href)}>
      <span className="l-btn__label">{cleanLabel(label)}</span>
      <span className="l-btn__go">
        <Arrow size={18} />
      </span>
    </a>
  )
}

function TextLink({ href, label }: { href: string; label: string }) {
  return (
    <a className="l-link" href={href} {...extProps(href)}>
      {cleanLabel(label)}
      <Arrow size={16} />
    </a>
  )
}

function UnderLink({ href, label }: { href: string; label: string }) {
  return (
    <a className="l-under" href={href} {...extProps(href)}>
      {cleanLabel(label)}
      <Arrow size={16} />
    </a>
  )
}

function Plans({ item }: { item: ServiceItem }) {
  return (
    <div className="l-plans" style={{ ['--n' as string]: item.plans.length } as CSSProperties}>
      {item.plans.map((p, i) => (
        <div key={i} className={`l-plan${p.featured ? ' l-plan--featured l-inv' : ''}`}>
          <div className="l-plan__name">{p.name}</div>
          <div className="l-plan__price">
            {p.priceOld && <s className="l-plan__old">{p.priceOld}</s>}
            <span className="l-plan__amount">{p.price}</span>
            {p.unit && <span className="l-plan__unit">{p.unit}</span>}
          </div>
          {p.setup && <p className="l-plan__setup">{p.setup}</p>}
          {p.badge && (
            <p className="l-plan__badge">
              <Shape kind="block" size={10} />
              {p.badge}
            </p>
          )}
          <ul className="l-plan__features">
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

function ServiceExtras({ item }: { item: ServiceItem }) {
  return (
    <>
      {item.note && <p className="l-svc__note">{item.note}</p>}
      {item.included.length > 0 && (
        <div className="l-svc__included">
          <p className="l-svc__label">{item.includedLabel}</p>
          <ul>
            {item.included.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        </div>
      )}
      {item.addons.length > 0 && (
        <div className="l-svc__addons">
          <p className="l-svc__label">{item.addonsLabel}</p>
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

function ServiceHead({ item, n, total }: { item: ServiceItem; n: number; total: number }) {
  return (
    <>
      {/* En celular, índice + título quedan fijos mientras dura el servicio. */}
      <div className="l-svc__pin">
        <p className="l-svc__index">
          <Shape kind={shapeAt(n - 1)} size={12} />
          <span>
            {pad(n)}/{pad(total)}
            {item.kicker && ` · ${item.kicker}`}
          </span>
        </p>
        <h3 className="l-svc__title">{item.title}</h3>
      </div>
      <p className="l-svc__desc">{item.desc}</p>
      {item.tags.length > 0 && (
        <ul className="l-tags">
          {item.tags.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      )}
    </>
  )
}

function Price({ item }: { item: ServiceItem }) {
  if (!item.price) return null
  return (
    <p className="l-svc__price">
      {item.priceOld && <s>{item.priceOld}</s>} {item.price}{' '}
      {item.priceNote && <span>{item.priceNote}</span>}
    </p>
  )
}

export function Landing({ c, fx = true }: { c: LandingContent; fx?: boolean }) {
  const { show, live } = visibility(c)
  const s = c.services
  const total = s.items.length

  return (
    <div className={`site ${brandFontVars}${fx ? '' : ' is-static'}`}>
      <a className="l-skip" href="#contenido">
        Saltar al contenido
      </a>

      {/* HEADER */}
      <header className="l-head" data-edit="nav">
        <div className="l-head__inner">
          <a href="#top" className="l-head__logo" aria-label="Forjo Studio, inicio">
            <Logo />
          </a>
          <nav aria-label="Principal" className="l-head__nav">
            <ul>
              {live(c.nav.links).map((l, i) => (
                <li key={i}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <a className="l-head__cta" href={c.nav.ctaHref}>
            {cleanLabel(c.nav.ctaLabel)}
          </a>
        </div>
      </header>

      <main id="contenido">
        {/* HERO: hero + banda ocupan la primera pantalla */}
        <section className="l-hero" id="top" data-edit="hero">
          <p className="l-hero__meta">
            {splitDots(c.hero.kicker).map((p, i) => (
              <span key={i}>{p}</span>
            ))}
          </p>
          <h1 className="l-hero__title">
            <Seg seg={c.hero.headlinePre} />
            <Seg seg={c.hero.headlineAccent} />
            <br />
            <Seg seg={c.hero.headlineMid} />
            <Seg seg={c.hero.headlineEm} />
            <Seg seg={c.hero.headlinePost} />
          </h1>
          <div className="l-hero__row">
            <div className="l-hero__copy">
              <p className="l-hero__sub">{c.hero.sub}</p>
              <div className="l-hero__actions">
                <a className="l-slab" href={c.hero.ctaPrimaryHref} {...extProps(c.hero.ctaPrimaryHref)}>
                  <span>{cleanLabel(c.hero.ctaPrimaryLabel)}</span>
                  <Arrow size={28} />
                </a>
                <UnderLink href={c.hero.ctaSecondaryHref} label={c.hero.ctaSecondaryLabel} />
              </div>
            </div>
            <div className="l-hero__art" aria-hidden="true">
              <span className="l-hero__sq" />
              <span className="l-hero__tr" />
              <span className="l-hero__ci" />
              <span className="l-hero__bl" />
            </div>
          </div>
        </section>

        {/* BANDA */}
        {show('marquee') && (
          <div className="l-band" data-edit="marquee">
            <MarqueeTrack
              items={c.marquee}
              className="l-band__track"
              itemClass="l-band__item"
              minChars={80}
              sep={() => <Shape kind="circle" size={20} />}
            />
          </div>
        )}

        {/* SERVICIOS */}
        {show('services') && (
          <section className="l-sec" id="servicios" data-edit="services" aria-labelledby="l-servicios">
            <div className="l-wrap">
              <div className="l-sec__head">
                <p className="l-sec__rail">{cleanKicker(s.kicker)}</p>
                <h2 className="l-sec__title" id="l-servicios">
                  {s.title}
                </h2>
                <p className="l-sec__intro">{s.intro}</p>
              </div>

              {groupServices(s.items).map((g, gi) =>
                g.wide ? (
                  g.items.map(({ item, n }) => (
                    <article key={n} className="l-svc">
                      <div className="l-svc__head">
                        <ServiceHead item={item} n={n} total={total} />
                      </div>
                      <div className="l-svc__body">
                        {item.plans.length > 0 && <Plans item={item} />}
                        <ServiceExtras item={item} />
                        <Price item={item} />
                        {item.footnote && <p className="l-svc__foot">{item.footnote}</p>}
                        {item.ctaLabel && <TextLink href={item.ctaHref} label={item.ctaLabel} />}
                      </div>
                    </article>
                  ))
                ) : (
                  <div key={`g${gi}`} className="l-pair">
                    {g.items.map(({ item, n }) => (
                      <article key={n} className="l-svc l-svc--simple">
                        <ServiceHead item={item} n={n} total={total} />
                        {item.plans.length > 0 && <Plans item={item} />}
                        <ServiceExtras item={item} />
                        <div className="l-svc__bottom">
                          <Price item={item} />
                          {item.footnote && <p className="l-svc__foot">{item.footnote}</p>}
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
          <section className="l-sec l-inv" id="proceso" data-edit="process" aria-labelledby="l-proceso">
            <div className="l-wrap">
              <div className="l-sec__head">
                <p className="l-sec__rail">{cleanKicker(c.process.kicker)}</p>
                <h2 className="l-sec__title" id="l-proceso">
                  {c.process.title}
                </h2>
                <p className="l-sec__intro">{c.process.intro}</p>
              </div>
              <ol className="l-steps">
                {c.process.steps.map((st, i) => {
                  const m = splitMeta(st.meta)
                  return (
                    <li key={i} className="l-step" style={{ ['--i' as string]: i } as CSSProperties}>
                      <div className="l-step__node">
                        <Shape kind={shapeAt(i)} size={20} />
                      </div>
                      <p className="l-step__meta">
                        {m.num && <span>{m.num}</span>}
                        {m.word}
                      </p>
                      <h3 className="l-step__title">{st.title}</h3>
                      <p className="l-step__desc">{st.desc}</p>
                    </li>
                  )
                })}
              </ol>
            </div>
          </section>
        )}

        {/* TRABAJO */}
        {show('work') && (
          <section className="l-sec" id="trabajo" data-edit="work" aria-labelledby="l-trabajo">
            <div className="l-wrap">
              <div className="l-sec__head l-sec__head--row">
                <p className="l-sec__rail">{cleanKicker(c.work.kicker)}</p>
                <h2 className="l-sec__title" id="l-trabajo">
                  {c.work.title}
                </h2>
                {c.work.allHref && c.work.allHref !== '#' && <TextLink href={c.work.allHref} label={c.work.allLabel} />}
              </div>
              <ul className="l-work">
                {c.work.projects.map((p, i) => (
                  <li key={i} className={`l-proj${i % 2 ? ' l-proj--flip' : ''}`}>
                    <div className="l-proj__media">
                      <Shape
                        kind={i % 2 ? 'triangle' : 'block'}
                        size={200}
                        className={`l-proj__shape${SHAPE_FILLS.has(p.shapeColor) ? ` l-proj__shape--${p.shapeColor}` : ''}`}
                      />
                      <a href={p.url} target="_blank" rel="noopener" className="l-proj__thumb" tabIndex={-1} aria-hidden="true">
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
                    <div className="l-proj__meta">
                      <p className="l-label">
                        {p.year} · {p.cat}
                      </p>
                      <h3 className="l-proj__name">
                        <a href={p.url} target="_blank" rel="noopener">
                          {p.name}
                        </a>
                      </h3>
                      {p.demoLabel && <UnderLink href={p.url} label={p.demoLabel} />}
                    </div>
                  </li>
                ))}
                {Array.from({ length: c.work.placeholders }).map((_, i) => (
                  <li key={`ph${i}`} className="l-next">
                    <span className="l-next__q">El próximo?</span>
                    <span className="l-label">Tu negocio · Próximamente</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* NOSOTROS */}
        {show('about') && (
          <section className="l-sec" id="nosotros" data-edit="about" aria-labelledby="l-nosotros">
            <div className="l-wrap">
              <div className="l-about">
                <p className="l-sec__rail">{cleanKicker(c.about.kicker)}</p>
                <h2 className="l-about__title" id="l-nosotros">
                  <Seg seg={c.about.headlinePre} />
                  <br />
                  <Seg seg={c.about.headlineMid} />
                  <Seg seg={c.about.headlineEm} />
                  <Seg seg={c.about.headlinePost} />
                </h2>
                <div className="l-about__body">
                  {c.about.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
              {c.about.stats.length > 0 && (
                <dl className="l-stats" style={{ ['--n' as string]: c.about.stats.length } as CSSProperties}>
                  {c.about.stats.map((st, i) => (
                    <div key={i} className="l-stat">
                      <dt>{st.key}</dt>
                      <dd>{st.val}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </section>
        )}

        {/* CONTACTO */}
        <section className="l-contact" id="contacto" data-edit="contact" aria-labelledby="l-contacto">
          <div className="l-contact__slab">
            <h2 className="l-contact__title" id="l-contacto">
              <Seg seg={c.contact.headline1} />
              <br />
              <Seg seg={c.contact.headline2} />
            </h2>
            <Shape kind="circle" size={120} className="l-contact__ci" />
          </div>
          <div className="l-contact__side">
            <p className="l-sec__rail">{cleanKicker(c.contact.kicker)}</p>
            <p className="l-contact__sub">{c.contact.sub}</p>
            <ContactForm title={c.contact.formTitle} />
            <div className="l-contact__direct">
              <p className="l-label">{cleanKicker(c.contact.boxLabel)}</p>
              <a href={`mailto:${c.contact.email}`} className="l-contact__email">
                {c.contact.email}
              </a>
              <a href={c.contact.whatsappHref} target="_blank" rel="noopener" className="l-contact__row">
                {cleanLabel(c.contact.whatsappLabel)}
                <ArrowUpRight size={20} />
              </a>
              <a href={c.contact.callHref} className="l-contact__row">
                {cleanLabel(c.contact.callLabel)}
                <Arrow size={20} />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* PIE */}
      <footer className="l-foot" data-edit="footer">
        <div className="l-wrap">
          <div className="l-foot__grid">
            <div className="l-foot__brand">
              <Logo />
              <p>
                {/* Una oración por línea en el celular; seguidas en pantallas grandes. */}
                {sentences(c.footer.brandText).map((s, i, all) => (
                  <span key={i}>
                    {s}
                    {i < all.length - 1 ? ' ' : ''}
                  </span>
                ))}
              </p>
            </div>
            {c.footer.cols.map((col, i) => (
              <nav key={i} className="l-foot__col" aria-label={col.title}>
                <p className="l-svc__label">{col.title}</p>
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
          <div className="l-foot__bottom">
            {/* Cada parte del copyright (separadas por " · ") va en su línea en el celular. */}
            <span className="l-foot__copy">
              {c.footer.copyright.split(/\s+·\s+/).map((part, i) => (
                <span key={i}>
                  {i > 0 && <span className="l-foot__dot"> · </span>}
                  {part}
                </span>
              ))}
            </span>
            <span className="l-foot__legal">
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
