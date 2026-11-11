import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Icon from './Icon'

export function Logo({ light = false, className = '' }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="Team Padel home">
      <img src="/logo-mark.png" alt="" className="size-10 shrink-0 transition-transform duration-500 group-hover:rotate-[25deg]" />
      <span className={`display text-[1.9rem] leading-[.78] ${light ? 'text-cream' : 'text-ink'}`}>
        Team<br />Padel
      </span>
    </Link>
  )
}

/** Small uppercase label with lime dash — matches the reference design */
export function Eyebrow({ children, light = false, className = '' }) {
  return (
    <p className={`mb-3 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.22em] ${light ? 'text-lime' : 'text-forest'} ${className}`}>
      <span className="h-[3px] w-7 rounded-full bg-lime" />
      {children}
    </p>
  )
}

const btnBase = 'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-[.97] disabled:opacity-50 whitespace-nowrap'
const btnVariants = {
  lime: 'bg-lime text-forest hover:bg-[#dbe63d] shadow-[0_1px_0_rgba(0,0,0,.08)]',
  dark: 'bg-forest text-cream hover:bg-forest-deep',
  ink: 'bg-ink text-cream hover:bg-black',
  outline: 'border-2 border-forest/15 text-forest hover:border-forest hover:bg-forest hover:text-cream',
  outlineLime: 'border-2 border-lime text-forest hover:bg-lime',
  ghostLight: 'border border-cream/30 text-cream hover:border-lime hover:text-lime',
  link: 'text-forest underline decoration-lime decoration-2 underline-offset-4 hover:decoration-forest !rounded-none !px-0',
}
const btnSizes = { sm: 'text-[13px] px-4 py-2', md: 'text-sm px-5 py-2.5', lg: 'text-[15px] px-7 py-3.5' }

export function Button({ to, href, variant = 'lime', size = 'md', icon = 'arrow', children, className = '', ...rest }) {
  const cls = `${btnBase} ${btnVariants[variant]} ${btnSizes[size]} ${className}`
  const content = (
    <>
      {children}
      {icon && <Icon name={icon} className="size-4 transition-transform group-hover/btn:translate-x-0.5" strokeWidth={2.2} />}
    </>
  )
  if (to) return <Link to={to} className={`group/btn ${cls}`} {...rest}>{content}</Link>
  if (href) return <a href={href} target="_blank" rel="noreferrer" className={`group/btn ${cls}`} {...rest}>{content}</a>
  return <button className={`group/btn ${cls}`} {...rest}>{content}</button>
}

export function Breadcrumbs({ items, light }) {
  return (
    <nav aria-label="Breadcrumb" className={`mb-6 flex flex-wrap items-center gap-1.5 text-xs font-medium ${light ? 'text-cream/60' : 'text-ink/50'}`}>
      <Link to="/" className="hover:text-lime">Home</Link>
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <Icon name="chevronRight" className="size-3" />
          {it.to ? <Link to={it.to} className="hover:text-lime">{it.label}</Link> : <span className={light ? 'text-cream' : 'text-ink'}>{it.label}</span>}
        </span>
      ))}
    </nav>
  )
}

/** Page header for inner pages. Dark by default with optional image on the right. */
export function PageHero({ eyebrow, title, intro, crumbs = [], image, children, tone = 'dark' }) {
  const dark = tone === 'dark'
  return (
    <section className={`relative overflow-hidden ${dark ? 'bg-forest text-cream court-lines' : 'bg-cream'}`}>
      {dark && <Swoosh className="pointer-events-none absolute -right-24 -top-10 h-[420px] w-[420px] text-lime/80" />}
      <div className={`container-x relative grid gap-10 pt-32 pb-14 md:pt-40 md:pb-20 ${image ? 'lg:grid-cols-[1.1fr_.9fr] lg:items-end' : ''}`}>
        <div>
          <Breadcrumbs items={crumbs} light={dark} />
          {eyebrow && <Eyebrow light={dark}>{eyebrow}</Eyebrow>}
          <h1 className={`display text-6xl sm:text-7xl lg:text-[6.2rem] ${dark ? 'text-cream' : 'text-forest'}`}>{title}</h1>
          {intro && <p className={`mt-6 max-w-xl text-base leading-relaxed sm:text-lg ${dark ? 'text-cream/75' : 'text-ink/70'}`}>{intro}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
        {image && (
          <div className="relative hidden lg:block">
            <img src={image} alt="" className="aspect-[4/3] w-full rounded-[28px] object-cover shadow-2xl shadow-black/30" />
            <div className="absolute -bottom-4 -left-4 size-20 rounded-full bg-lime" />
          </div>
        )}
      </div>
    </section>
  )
}

/** The curved lime brushstroke from the reference design */
export function Swoosh({ className = '' }) {
  return (
    <svg viewBox="0 0 400 400" fill="none" className={className} aria-hidden="true">
      <path d="M30 360C60 200 180 60 380 30" stroke="currentColor" strokeWidth="22" strokeLinecap="round" />
      <path d="M90 390C130 260 230 150 390 120" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity=".5" />
    </svg>
  )
}

export function SectionHead({ eyebrow, title, intro, action, light, className = '' }) {
  return (
    <div className={`mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between ${className}`}>
      <div className="max-w-2xl">
        {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
        <h2 className={`display text-5xl sm:text-6xl ${light ? 'text-cream' : 'text-forest'}`}>{title}</h2>
        {intro && <p className={`mt-4 text-[15px] leading-relaxed ${light ? 'text-cream/70' : 'text-ink/65'}`}>{intro}</p>}
      </div>
      {action}
    </div>
  )
}

export function Chip({ active, children, onClick, className = '' }) {
  return (
    <button onClick={onClick} aria-pressed={active}
      className={`shrink-0 rounded-full border px-4 py-2 text-[13px] font-semibold transition ${active ? 'border-forest bg-forest text-cream' : 'border-forest/15 bg-white/60 text-forest hover:border-forest/40'} ${className}`}>
      {children}
    </button>
  )
}

export function Tag({ children, tone = 'lime', className = '' }) {
  const tones = { lime: 'bg-lime text-forest', dark: 'bg-forest text-cream', light: 'bg-white/90 text-forest', sand: 'bg-sand text-forest', outline: 'border border-current' }
  return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wider ${tones[tone]} ${className}`}>{children}</span>
}

export function useTitle(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | Team Padel` : 'Team Padel – Play Padel. Connect. Grow.'
    if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}

export function Accordion({ items, dark }) {
  return (
    <div className={`divide-y ${dark ? 'divide-cream/15' : 'divide-forest/10'}`}>
      {items.map((it, i) => (
        <details key={i} className="group py-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className={`flex cursor-pointer list-none items-start justify-between gap-6 text-[15px] font-semibold ${dark ? 'text-cream' : 'text-forest'}`}>
            {it.q}
            <span className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full transition group-open:rotate-45 ${dark ? 'bg-cream/10' : 'bg-forest/5'}`}>
              <Icon name="plus" className="size-4" />
            </span>
          </summary>
          <p className={`mt-3 max-w-2xl text-[14.5px] leading-relaxed ${dark ? 'text-cream/70' : 'text-ink/70'}`}>{it.a}</p>
        </details>
      ))}
    </div>
  )
}

/** Big CTA band used at the end of many pages */
export function ExpansionBand() {
  return (
    <section className="relative overflow-hidden bg-forest-deep text-cream">
      <img src="/images/facility.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep via-forest-deep/85 to-transparent" />
      <div className="container-x relative py-20 md:py-28">
        <Eyebrow light>For landowners, municipalities & investors</Eyebrow>
        <h2 className="display max-w-2xl text-6xl sm:text-7xl">Develop a padel location <span className="text-lime">with us.</span></h2>
        <p className="mt-5 max-w-lg text-cream/75">You have land, a hall or an idea — we have the concept, the operations and the community. Let's talk about bringing padel to your town.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button to="/team-padel/expand-with-us" size="lg">Partner with us</Button>
          <Button to="/team-padel/suggest-a-location" variant="ghostLight" size="lg" icon="pin">Suggest a location</Button>
        </div>
      </div>
    </section>
  )
}

