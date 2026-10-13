'use client'

import { useEffect } from 'react'

/**
 * Efectos de scroll de la landing (reveal + stagger, contadores en stats y
 * parallax del hero). Es el mismo script inline del HTML original, corriendo en
 * un efecto tras el montaje para no romper la hidratación. No renderiza nada.
 */
export function ScrollFX() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // 1. Marcar elementos para revelar (sin tocar el markup).
    function tag(selector: string, variant: string | null, stagger: boolean) {
      document.querySelectorAll(selector).forEach((el, i) => {
        el.classList.add('reveal')
        if (variant) el.classList.add(variant)
        if (stagger) (el as HTMLElement).style.setProperty('--i', String(i % 6))
      })
    }

    tag('.section-header', null, false)
    tag('.serv-card', 'reveal--scale', false)
    tag('.plan-card', null, true)
    tag('.addon-card', null, true)
    tag('.process-step', null, true)
    tag('.work-card', 'reveal--scale', true)
    tag('.about-inner > div:first-child', 'reveal--left', false)
    tag('.stats-list', 'reveal--right', false)
    tag('.contact-inner > div', null, true)
    tag('.footer-col, .footer-brand', null, true)

    if (prefersReduced) return

    // 2. IntersectionObserver para revelar.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))

    // 3. Contadores en las stats.
    function animateCounter(el: Element) {
      const raw = (el.textContent || '').trim()
      const match = raw.match(/^(\d+)(.*)$/)
      if (!match) return
      const target = parseInt(match[1], 10)
      if (match[1].length === 4 && !match[2]) return // un año (2025) no se cuenta desde 0
      const suffix = match[2]
      const dur = 1100
      let start: number | null = null
      function step(ts: number) {
        if (start === null) start = ts
        const p = Math.min((ts - start) / dur, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        el.textContent = Math.round(eased * target) + suffix
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }
    const statObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target)
            statObs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.6 },
    )
    document.querySelectorAll('.stat-key').forEach((el) => statObs.observe(el))

    // 4. Parallax en la composición Bauhaus del hero.
    const heroVisual = document.querySelector('.hero-visual') as HTMLElement | null
    let onScroll: (() => void) | null = null
    if (heroVisual && !window.matchMedia('(max-width: 768px)').matches) {
      let ticking = false
      onScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const y = window.scrollY
            heroVisual.style.transform = `translateY(${y * 0.22}px) rotate(${y * 0.025}deg)`
            ticking = false
          })
          ticking = true
        }
      }
      window.addEventListener('scroll', onScroll, { passive: true })
    }

    return () => {
      io.disconnect()
      statObs.disconnect()
      if (onScroll) window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return null
}
