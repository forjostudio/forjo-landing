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
import '../variant-b.css'

/* ================================================================
   B — CREATIVE BRUTALISM
   El afiche Bauhaus como página: tipografía enorme contra figuras
   primarias, composición asimétrica y texto mono chico como contrapunto.
================================================================ */

export function Slab({ href, label }: { href: string; label: string }) {
  return (
    <a className="cb-slab" href={href} {...extProps(href)}>
      <span>{cleanLabel(label)}</span>
      <Arrow size={28} />
    </a>
  )
}

function Btn({ href, label }: { href: string; label: string }) {
  return (
    <a className="cb-btn" href={href} {...extProps(href)}>
      <span>{cleanLabel(label)}</span>
      <Arrow size={18} />
    </a>
  )
}

export function UnderLink({ href, label }: { href: string; label: string }) {
  return (
    <a className="cb-under" href={href} {...extProps(href)}>
      {cleanLabel(label)}
      <Arrow size={16} />
    </a>
  )
}

function Plans({ item }: { item: ServiceItem }) {
  return (
    <div className="cb-plans" style={{ ['--n' as string]: item.plans.length } as CSSProperties}>
      {item.plans.map((p, i) => (
        <div key={i} className={`cb-plan${p.featured ? ' cb-plan--featured bx-inv' : ''}`}>
          <div className="cb-plan__top">
            <span className="cb-plan__name">{p.name}</span>
            {p.badge && (
              <span className="cb-plan__badge">
                <Shape kind="block" size={10} />
                {p.badge}
              </span>
            )}
          </div>
          {p.priceOld && <s className="cb-plan__old">{p.priceOld}</s>}
          <p className="cb-plan__price">
            {p.price}
            {p.unit && <span>{p.unit}</span>}
          </p>
          {p.setup && <p className="cb-plan__setup">{p.setup}</p>}
          <ul className="cb-plan__features">
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

function Extras({ item }: { item: ServiceItem }) {
  const has = item.note || item.included.length || item.addons.length || item.footnote || item.ctaLabel
  if (!has) return null
  return (
    <div className="cb-extras">
      {item.included.length > 0 && (
        <div className="cb-extras__block">
          <p className="cb-label">{item.includedLabel}</p>
          <ul className="cb-extras__list">
            {item.included.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="cb-extras__block">
        {item.note && <p className="cb-extras__note">{item.note}</p>}
        {item.addons.length > 0 && (
          <>
            <p className="cb-label">{item.addonsLabel}</p>
            <ul className="cb-extras__addons">
              {item.addons.map((a, i) => (
                <li key={i}>
                  <strong>{a.name}</strong>
                  {a.desc}
                </li>
              ))}
            </ul>
          </>
        )}
        {item.footnote && <p className="cb-foot">{item.footnote}</p>}
        {item.ctaLabel && <UnderLink href={item.ctaHref} label={item.ctaLabel} />}
      </div>
    </div>
  )
}

function SvcTop({ item, n, total }: { item: ServiceItem; n: number; total: number }) {
  return (
    <div className="cb-svc__top">
      <Shape kind={shapeAt(n - 1)} size={96} className="cb-svc__shape" />
      <p className="cb-svc__meta">
        {pad(n)}/{pad(total)}
        {item.kicker && <span>{item.kicker}</span>}
      </p>
      {item.tags.length > 0 && (
        <ul className="cb-svc__tags">
          {item.tags.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function VariantB({ c }: { c: LandingContent }) {
  const { show, live } = visibility(c)
  const s = c.services
  const total = s.items.length

  return (
    <div className="cb">
      <a className="cb-skip" href="#contenido">
        Saltar al contenido
      </a>
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
        {/* HERO */}
        <section className="cb-hero" id="top">
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
          <div className="cb-hero__row">
            <div className="cb-hero__copy">
              <p className="cb-hero__sub">{c.hero.sub}</p>
              <div className="cb-hero__actions">
                <Slab href={c.hero.ctaPrimaryHref} label={c.hero.ctaPrimaryLabel} />
                <UnderLink href={c.hero.ctaSecondaryHref} label={c.hero.ctaSecondaryLabel} />
              </div>
            </div>
            <div className="cb-hero__art" aria-hidden="true">
              <span className="cb-hero__sq" />
              <span className="cb-hero__tr" />
              <span className="cb-hero__ci" />
              <span className="cb-hero__bl" />
            </div>
          </div>
        </section>

        {/* MARQUESINA */}
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

        {/* SERVICIOS */}
        {show('services') && (
          <section className="cb-sec" id="servicios" aria-labelledby="cb-servicios">
            <div className="cb-open">
              <h2 className="cb-open__title" id="cb-servicios">
                {s.title}
              </h2>
              <div className="cb-open__side">
                <p className="cb-label">{cleanKicker(s.kicker)}</p>
                <p className="cb-open__intro">{s.intro}</p>
              </div>
            </div>

            {groupServices(s.items).map((g, gi) =>
              g.wide ? (
                g.items.map(({ item, n }) => (
                  <article key={n} className="cb-svc">
                    <SvcTop item={item} n={n} total={total} />
                    <h3 className="cb-svc__title">{item.title}</h3>
                    <p className="cb-svc__desc">{item.desc}</p>
                    {item.plans.length > 0 && <Plans item={item} />}
                    {item.price && (
                      <p className="cb-price">
                        {item.priceOld && <s>{item.priceOld}</s>} {item.price}
                        {item.priceNote && <span> {item.priceNote}</span>}
                      </p>
                    )}
                    <Extras item={item} />
                  </article>
                ))
              ) : (
                <div key={`g${gi}`} className="cb-pair">
                  {g.items.map(({ item, n }) => (
                    <article key={n} className="cb-svc cb-svc--simple">
                      <SvcTop item={item} n={n} total={total} />
                      <h3 className="cb-svc__title">{item.title}</h3>
                      <p className="cb-svc__desc">{item.desc}</p>
                      {item.plans.length > 0 && <Plans item={item} />}
                      {item.price && (
                        <p className="cb-price">
                          {item.priceOld && <s>{item.priceOld}</s>} {item.price}
                          {item.priceNote && <span> {item.priceNote}</span>}
                        </p>
                      )}
                      {item.footnote && <p className="cb-foot">{item.footnote}</p>}
                      {item.note && <p className="cb-extras__note">{item.note}</p>}
                      {item.ctaLabel && <Btn href={item.ctaHref} label={item.ctaLabel} />}
                    </article>
                  ))}
                </div>
              ),
            )}
          </section>
        )}

        {/* PROCESO */}
        {show('process') && (
          <section className="cb-sec cb-process bx-inv" id="proceso" aria-labelledby="cb-proceso">
            <div className="cb-open">
              <h2 className="cb-open__title" id="cb-proceso">
                {c.process.title}
              </h2>
              <div className="cb-open__side">
                <p className="cb-label">{cleanKicker(c.process.kicker)}</p>
                <p className="cb-open__intro">{c.process.intro}</p>
              </div>
            </div>
            <ol className="cb-steps">
              {c.process.steps.map((st, i) => {
                const m = splitMeta(st.meta)
                return (
                  <li key={i} className="cb-step" style={{ ['--i' as string]: i } as CSSProperties}>
                    <span className="cb-step__num" aria-hidden={m.num ? undefined : true}>
                      {m.num || pad(i + 1)}
                    </span>
                    <div className="cb-step__body">
                      <p className="cb-label">{m.word}</p>
                      <h3 className="cb-step__title">{st.title}</h3>
                      <p className="cb-step__desc">{st.desc}</p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </section>
        )}

        {/* TRABAJO */}
        {show('work') && (
          <section className="cb-sec" id="trabajo" aria-labelledby="cb-trabajo">
            <div className="cb-open cb-open--tight">
              <h2 className="cb-open__title" id="cb-trabajo">
                {c.work.title}
              </h2>
              <div className="cb-open__side">
                <p className="cb-label">{cleanKicker(c.work.kicker)}</p>
                {c.work.allHref && c.work.allHref !== '#' && <UnderLink href={c.work.allHref} label={c.work.allLabel} />}
              </div>
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
          </section>
        )}

        {/* NOSOTROS */}
        {show('about') && (
          <section className="cb-sec cb-about" id="nosotros" aria-labelledby="cb-nosotros">
            <p className="cb-label">{cleanKicker(c.about.kicker)}</p>
            <h2 className="cb-about__title" id="cb-nosotros">
              <Seg seg={c.about.headlinePre} />
              <br />
              <Seg seg={c.about.headlineMid} />
              <Seg seg={c.about.headlineEm} />
              <Seg seg={c.about.headlinePost} />
            </h2>
            <div className="cb-about__body">
              {c.about.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <dl className="cb-stats">
              {c.about.stats.map((st, i) => (
                <div key={i} className="cb-stat">
                  <dt>{st.key}</dt>
                  <dd>{st.val}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* CONTACTO */}
        <section className="cb-contact" id="contacto" aria-labelledby="cb-contacto">
          <div className="cb-contact__slab">
            <h2 className="cb-contact__title" id="cb-contacto">
              <Seg seg={c.contact.headline1} />
              <br />
              <Seg seg={c.contact.headline2} />
            </h2>
            <Shape kind="circle" size={120} className="cb-contact__ci" />
          </div>
          <div className="cb-contact__side">
            <p className="cb-label">{cleanKicker(c.contact.kicker)}</p>
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

      <footer className="cb-footer">
        <div className="cb-footer__grid">
          <div className="cb-footer__brand">
            <Logo height={34} />
            <p>{c.footer.brandText}</p>
          </div>
          {c.footer.cols.map((col, i) => (
            <nav key={i} className="cb-footer__col" aria-label={col.title}>
              <p className="cb-label">{col.title}</p>
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
      </footer>

      <WhatsAppFloat />
    </div>
  )
}
