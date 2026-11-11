import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import { articles, knowledgeCategories } from '../data/knowledge'
import { services } from '../data/services'
import { products } from '../data/shop'
import { openLocations } from '../data/locations'

const index = [
  ...articles.map((a) => ({ type: 'Knowledge', title: a.title, sub: a.excerpt, to: `/padel-knowledge/${a.category}/${a.slug}` })),
  ...knowledgeCategories.map((c) => ({ type: 'Knowledge', title: c.title, sub: c.blurb, to: `/padel-knowledge/${c.slug}` })),
  ...services.map((s) => ({ type: 'Service', title: s.title, sub: s.summary, to: `/services/${s.slug}` })),
  ...openLocations.map((l) => ({ type: 'Location', title: l.name, sub: l.tagline, to: `/locations/${l.slug}` })),
  ...products.map((p) => ({ type: 'Shop', title: `${p.brand} ${p.name}`, sub: p.desc, to: `/shop/${p.category}/${p.id}` })),
]

const suggestions = ['rules', 'racket', 'americano', 'kids', 'bandeja', 'beginners']

export default function SearchDialog({ open, onClose }) {
  const [q, setQ] = useState('')
  const input = useRef()
  useEffect(() => { if (open) { setQ(''); setTimeout(() => input.current?.focus(), 30) } }, [open])
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [onClose])

  const results = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return []
    return index.filter((i) => (i.title + ' ' + i.sub).toLowerCase().includes(s)).slice(0, 8)
  }, [q])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center bg-forest-deep/70 px-4 pt-[12vh] backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-cream shadow-2xl" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Search">
        <div className="flex items-center gap-3 border-b border-forest/10 px-5">
          <Icon name="search" className="size-5 text-forest/50" />
          <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search rules, rackets, locations…" className="h-16 flex-1 bg-transparent text-[16px] font-medium text-forest outline-none placeholder:text-ink/35" />
          <kbd className="rounded-md border border-forest/15 px-2 py-1 text-[11px] font-semibold text-ink/50">ESC</kbd>
        </div>
        <div className="max-h-[55vh] overflow-y-auto p-3">
          {!q && (
            <div className="p-3">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[.2em] text-ink/45">Popular</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => <button key={s} onClick={() => setQ(s)} className="rounded-full bg-sand px-3.5 py-1.5 text-[13px] font-semibold text-forest hover:bg-lime">{s}</button>)}
              </div>
            </div>
          )}
          {q && !results.length && <p className="p-6 text-center text-sm text-ink/55">Nothing found for “{q}”. Try “rules” or “racket”.</p>}
          {results.map((r) => (
            <Link key={r.to} to={r.to} onClick={onClose} className="group flex items-start gap-4 rounded-2xl p-3 hover:bg-sand">
              <span className="mt-0.5 rounded-md bg-forest px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-lime">{r.type}</span>
              <span className="flex-1">
                <span className="block text-[14.5px] font-semibold text-forest">{r.title}</span>
                <span className="line-clamp-1 text-[13px] text-ink/55">{r.sub}</span>
              </span>
              <Icon name="arrow" className="mt-1 size-4 text-forest/30 group-hover:text-forest" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

