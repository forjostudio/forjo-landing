'use client'

import { useEffect, useState } from 'react'

export type RunningSection = { id: string; code: string; title: string }

/** Cabezal de manual: muestra en qué sección está el lector y cuánto leyó.
 *  Sin JS queda el primer valor; la barra de avance es CSS (scroll timeline). */
export function RunningHead({ sections }: { sections: RunningSection[] }) {
  const [current, setCurrent] = useState(sections[0])

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (!visible.length) return
        const top = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        const found = sections.find((s) => s.id === top.target.id)
        if (found) setCurrent(found)
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [sections])

  return (
    <div className="ce-run" aria-hidden="true">
      <span className="ce-run__code">{current.code}</span>
      <span className="ce-run__title" key={current.id}>
        {current.title}
      </span>
      <span className="ce-run__bar" />
    </div>
  )
}
