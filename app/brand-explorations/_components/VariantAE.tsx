import Image from 'next/image'
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
  groupServices,
  pad,
  shapeAt,
  splitDots,
  splitMeta,
  visibility,
} from './shared'
import { Arm, Folio, Lines, Trap } from './editorial'
import { Construction } from './VariantA'
import '../variant-ae.css'

/* ================================================================
   A EDITORIAL — TECHNICAL BOLD × EDITORIAL BRUTALISM (prefijo ae-)
   Grilla suiza de 12 columnas a la vista, titulares enormes con sangría
   asimétrica, epígrafes técnicos y una sola intervención naranja de alto
   impacto: el contacto.
================================================================ */

function Btn({ href, label, size = 'md' }: { href: string; label: string; size?: 'sm' | 'md' }) {
  return (
    <a className={`ae-btn ae-btn--${size}`} href={href} {...extProps(href)}>
      <span>{cleanLabel(label)}</span>
      <Arrow size={size === 'sm' ? 16 : 20} />
    </a>
  )
}

function SecOpen({
  label,
  count,
  title,
  intro,
  id,
}: {
  label: string
  count?: string
  title: React.ReactNode
  intro?: string
  id: string
}) {
  return (
    <header className="ae-open">
      <Folio className="ae-open__folio" items={[label, count ?? '']} />
      <h2 className="ae-open__title" id={id}>
        {title}
      </h2>
      {intro && <p className="ae-open__intro">{intro}</p>}
    </header>
  )
}

function Plans({ item }: { item: ServiceItem }) {
  return (
    <div className="ae-plans" style={{ ['--n' as string]: item.plans.length }}>
      {item.plans.map((p, i) => (
        <div key={i} className={`ae-plan${p.featured ? ' ae-plan--featured bx-inv' : ''}`}>
          <p className="ae-plan__name">{p.name}</p>
          {p.priceOld && <s className="ae-plan__old">{p.priceOld}</s>}
          <p className="ae-plan__price">
            {p.price}
            {p.unit && <span>{p.unit}</span>}
          </p>
          {p.setup && <p className="ae-plan__setup">{p.setup}</p>}
          {p.badge && (
            <p className="ae-plan__badge">
              <Shape kind="block" size={9} />
              {p.badge}
            </p>
          )}
          <ul className="ae-plan__features">
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

function Extras({ item }: { item: ServiceItem }) {
  return (
    <>
      {item.note && <p className="ae-note">{item.note}</p>}
      {(item.included.length > 0 || item.addons.length > 0) && (
        <div className="ae-extras">
          {item.included.length > 0 && (
            <div>
              <p className="ae-cap">{item.includedLabel}</p>
              <ul className="ae-list">
                {item.included.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
            </div>
          )}
          {item.addons.length > 0 && (
            <div>
              <p className="ae-cap">{item.addonsLabel}</p>
              <ul className="ae-addons">
                {item.addons.map((a, i) => (
                  <li key={i}>
                    <strong>{a.name}</strong>
                    {a.desc}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {item.price && (
        <p className="ae-price">
          {item.priceOld && <s>{item.priceOld}</s>} {item.price}
          {item.priceNote && <span> {item.priceNote}</span>}
        </p>
      )}
      {item.footnote && <p className="ae-foot">{item.footnote}</p>}
    </>
  )
}

function Service({ item, n, total, simple }: { item: ServiceItem; n: number; total: number; simple?: boolean }) {
  return (
    <article className={`ae-svc eb-reveal${simple ? ' ae-svc--simple' : ''}`}>
      <p className="ae-svc__num" aria-hidden="true">
        {pad(n)}
      </p>
      <div className="ae-svc__head">
        <p className="ae-cap ae-svc__cap">
          <Shape kind={shapeAt(n - 1)} size={10} />
          {pad(n)}/{pad(total)}
          {item.kicker && ` — ${item.kicker}`}
        </p>
        <h3 className="ae-svc__title">{item.title}</h3>
      </div>
      <p className="ae-svc__desc">{item.desc}</p>
      {item.tags.length > 0 && (
        <ul className="ae-svc__tags">
          {item.tags.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      )}
      <div className="ae-svc__body">
        {item.plans.length > 0 && <Plans item={item} />}
        <Extras item={item} />
        {item.ctaLabel && <Btn href={item.ctaHref} label={item.ctaLabel} size="sm" />}
      </div>
    </article>
  )
}

export function VariantAE({ c }: { c: LandingContent }) {
  const { show, live } = visibility(c)
  const s = c.services
  const total = s.items.length
  const facts = splitDots(c.hero.kicker)

  return (
    <div className="ae">
      <a className="ae-skip" href="#contenido">
        Saltar al contenido
      </a>
      <header className="ae-head">
        <div className="ae-wrap ae-head__inner">
          <a href="#top" className="ae-head__logo" aria-label="Forjo Studio, inicio">
            <Logo height={28} />
          </a>
          <nav aria-label="Principal" className="ae-head__nav">
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
          <Btn href={c.nav.ctaHref} label={c.nav.ctaLabel} size="sm" />
        </div>
      </header>

      <main id="contenido">
        {/* HERO */}
        <section className="ae-hero" id="top">
          <div className="ae-wrap eb-guides">
            <Folio className="ae-hero__folio" items={[...facts, <Arm key="arm" height={10} />]} />
            <h1 className="ae-hero__title">
              <Lines
                lines={[
                  [c.hero.headlinePre, c.hero.headlineAccent],
                  [c.hero.headlineMid, c.hero.headlineEm, c.hero.headlinePost],
                ]}
              />
            </h1>
            <div className="ae-hero__grid">
              <div className="ae-hero__copy">
                <p className="ae-hero__sub">{c.hero.sub}</p>
                <div className="ae-hero__actions">
                  <a className="ae-cta" href={c.hero.ctaPrimaryHref} {...extProps(c.hero.ctaPrimaryHref)}>
                    <span>{cleanLabel(c.hero.ctaPrimaryLabel)}</span>
                    <Arrow size={26} />
                  </a>
                  <a className="ae-link eb-u" href={c.hero.ctaSecondaryHref} {...extProps(c.hero.ctaSecondaryHref)}>
                    {cleanLabel(c.hero.ctaSecondaryLabel)}
                    <Arrow size={16} />
                  </a>
                </div>
              </div>
              <figure className="ae-hero__fig">
                <Construction />
                <figcaption className="ae-cap">Fig. 01 — cuadrado, círculo, triángulo; módulo de 120</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* MARQUESINA: índice de lo que hacemos */}
        {show('marquee') && (
          <div className="ae-index bx-inv">
            <ul className="ae-wrap ae-index__list" aria-label="Lo que hacemos">
              {c.marquee.map((t, i) => (
                <li key={i}>
                  <span className="ae-index__n">{pad(i + 1)}</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* SERVICIOS */}
        {show('services') && (
          <section className="ae-sec" id="servicios" aria-labelledby="ae-servicios">
            <div className="ae-wrap eb-guides">
              <SecOpen
                label={cleanKicker(s.kicker)}
                count={`${pad(total)} servicios`}
                title={s.title}
                intro={s.intro}
                id="ae-servicios"
              />
              {groupServices(s.items).map((g, gi) =>
                g.wide ? (
                  g.items.map(({ item, n }) => <Service key={n} item={item} n={n} total={total} />)
                ) : (
                  <div key={`g${gi}`} className="ae-pair">
                    {g.items.map(({ item, n }) => (
                      <Service key={n} item={item} n={n} total={total} simple />
                    ))}
                  </div>
                ),
              )}
            </div>
          </section>
        )}

        {/* PROCESO */}
        {show('process') && (
          <section className="ae-sec ae-process bx-inv" id="proceso" aria-labelledby="ae-proceso">
            <div className="ae-wrap eb-guides">
              <SecOpen
                label={cleanKicker(c.process.kicker)}
                count={`${pad(c.process.steps.length)} etapas`}
                title={c.process.title}
                intro={c.process.intro}
                id="ae-proceso"
              />
              <ol className="ae-steps">
                {c.process.steps.map((st, i) => {
                  const m = splitMeta(st.meta)
                  return (
                    <li key={i} className="ae-step eb-reveal">
                      <span className="ae-step__num" aria-hidden="true">
                        {m.num || pad(i + 1)}
                      </span>
                      <p className="ae-cap ae-step__word">
                        <Trap height={9} />
                        {m.word}
                      </p>
                      <h3 className="ae-step__title">{st.title}</h3>
                      <p className="ae-step__desc">{st.desc}</p>
                    </li>
                  )
                })}
              </ol>
            </div>
          </section>
        )}

        {/* TRABAJO */}
        {show('work') && (
          <section className="ae-sec" id="trabajo" aria-labelledby="ae-trabajo">
            <div className="ae-wrap eb-guides">
              <SecOpen
                label={cleanKicker(c.work.kicker)}
                count={`${pad(c.work.projects.length)} casos`}
                title={c.work.title}
                id="ae-trabajo"
              />
              <ul className="ae-work">
                {c.work.projects.map((p, i) => (
                  <li key={i} className="ae-proj eb-reveal">
                    <a href={p.url} target="_blank" rel="noopener" className="ae-proj__thumb" tabIndex={-1} aria-hidden="true">
                      {p.thumb && (
                        <Image
                          src={p.thumb}
                          alt=""
                          fill
                          sizes="(max-width: 1024px) 100vw, 66vw"
                          style={{ objectFit: 'cover', objectPosition: 'top center' }}
                        />
                      )}
                    </a>
                    <div className="ae-proj__meta">
                      <p className="ae-cap">
                        Fig. {pad(i + 2)} — {p.year} — {p.cat}
                      </p>
                      <h3 className="ae-proj__name">
                        <a href={p.url} target="_blank" rel="noopener" className="eb-u">
                          {p.name}
                        </a>
                        <ArrowUpRight size={24} />
                      </h3>
                    </div>
                  </li>
                ))}
                {Array.from({ length: c.work.placeholders }).map((_, i) => (
                  <li key={`ph${i}`} className="ae-proj ae-proj--next eb-reveal">
                    <p className="ae-proj__q">El próximo?</p>
                    <p className="ae-cap">Tu negocio — Próximamente</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* NOSOTROS */}
        {show('about') && (
          <section className="ae-sec ae-about" id="nosotros" aria-labelledby="ae-nosotros">
            <div className="ae-wrap eb-guides">
              <Folio className="ae-open__folio" items={[cleanKicker(c.about.kicker), '']} />
              <h2 className="ae-about__title" id="ae-nosotros">
                <Seg seg={c.about.headlinePre} />
                <br />
                <Seg seg={c.about.headlineMid} />
                <Seg seg={c.about.headlineEm} />
                <Seg seg={c.about.headlinePost} />
              </h2>
              <div className="ae-about__grid">
                <dl className="ae-stats">
                  {c.about.stats.map((st, i) => (
                    <div key={i}>
                      <dt>{st.key}</dt>
                      <dd>{st.val}</dd>
                    </div>
                  ))}
                </dl>
                <div className="ae-about__body">
                  {c.about.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CONTACTO: la intervención naranja */}
        <section className="ae-contact" id="contacto" aria-labelledby="ae-contacto">
          <div className="ae-wrap">
            {/* Sobre naranja solo va texto de 24px o más: nada de folio chico acá. */}
            <h2 className="ae-contact__title" id="ae-contacto">
              <Seg seg={c.contact.headline1} />
              <br />
              <Seg seg={c.contact.headline2} />
            </h2>
            <div className="ae-contact__grid">
              <div className="ae-contact__panel bx-inv">
                <p className="ae-cap">{cleanKicker(c.contact.kicker)}</p>
                <p className="ae-contact__sub">{c.contact.sub}</p>
                <ContactForm title={c.contact.formTitle} />
              </div>
              <div className="ae-contact__direct">
                <a href={`mailto:${c.contact.email}`} className="ae-contact__email">
                  {c.contact.email}
                </a>
                <div className="ae-contact__rows bx-inv">
                  <p className="ae-cap">{cleanKicker(c.contact.boxLabel)}</p>
                  <a href={c.contact.whatsappHref} target="_blank" rel="noopener" className="ae-contact__row">
                    {cleanLabel(c.contact.whatsappLabel)}
                    <ArrowUpRight size={18} />
                  </a>
                  <a href={c.contact.callHref} className="ae-contact__row">
                    {cleanLabel(c.contact.callLabel)}
                    <Arrow size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="ae-foot">
        <div className="ae-wrap eb-guides">
          <div className="ae-foot__grid">
            <div className="ae-foot__brand">
              <Logo height={28} />
              <p>{c.footer.brandText}</p>
            </div>
            {c.footer.cols.map((col, i) => (
              <nav key={i} className="ae-foot__col" aria-label={col.title}>
                <p className="ae-cap">{col.title}</p>
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
            className="ae-foot__bottom"
            items={[
              c.footer.copyright,
              <span key="legal" className="ae-foot__legal">
                <a href="/privacidad.html">Privacidad</a>
                <a href="/terminos.html">Términos</a>
              </span>,
              c.footer.version,
            ]}
          />
        </div>
      </footer>

      <WhatsAppFloat />
    </div>
  )
}
