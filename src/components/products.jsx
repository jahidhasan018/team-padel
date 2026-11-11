import { Link } from 'react-router-dom'
import { getLocation } from '../data/locations'
import { eur } from '../data/playtomic'
import Icon from './Icon'

/**
 * Stylised catalogue illustration — placeholder until real product photography
 * is uploaded via the CMS. Keeps the catalogue visually consistent.
 */
export function ProductArt({ art, color = '#2A2A2A', logo, className = '' }) {
  const stroke = '#2A2A2A'
  const accent = '#CEDB23'
  const shapes = {
    racket: (
      <g transform="rotate(-28 100 100)">
        <rect x="93" y="118" width="14" height="58" rx="6" fill={stroke} />
        <rect x="91" y="150" width="18" height="30" rx="5" fill="#fff" opacity=".18" />
        <path d="M100 18c30 0 46 24 46 54 0 26-16 50-46 50s-46-24-46-50c0-30 16-54 46-54Z" fill={color} stroke={stroke} strokeWidth="5" />
        {[0, 1, 2, 3].map((r) => [0, 1, 2, 3, 4].map((c) => <circle key={r + '-' + c} cx={76 + c * 12} cy={50 + r * 14} r="2.6" fill={stroke} opacity=".55" />))}
        <path d="M70 34c10-8 20-10 30-10" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".5" />
      </g>
    ),
    shirt: <path d="M70 40 40 58l12 28 14-7v76h68V79l14 7 12-28-30-18c-4 12-16 18-30 18s-26-6-30-18Z" fill={color} stroke={stroke} strokeWidth="4" strokeLinejoin="round" />,
    hoodie: <><path d="M72 42 38 62l10 66 20-6v40h64v-40l20 6 10-66-34-20c-6 10-16 16-28 16s-22-6-28-16Z" fill={color} stroke={stroke} strokeWidth="4" strokeLinejoin="round" /><path d="M76 44c4 18 14 26 24 26s20-8 24-26" fill="none" stroke={stroke} strokeWidth="4" /><rect x="80" y="120" width="40" height="18" rx="6" fill="none" stroke={stroke} strokeWidth="3" opacity=".5" /></>,
    shorts: <path d="M56 56h88l8 88h-40l-12-48-12 48H48l8-88Z" fill={color} stroke={stroke} strokeWidth="4" strokeLinejoin="round" />,
    sock: <path d="M84 30h34v80l20 22c10 12 4 30-12 30-8 0-14-4-20-10l-26-28c-4-4-6-10-6-16V30Z" fill={color} stroke={stroke} strokeWidth="4" strokeLinejoin="round" />,
    shoe: <><path d="M30 120c0-14 6-30 18-36l26-14 14 14c10 6 24 6 32 2l14 8c18 10 36 14 44 22 6 6 6 16 0 22H36c-4 0-6-4-6-8v-10Z" fill={color} stroke={stroke} strokeWidth="4" strokeLinejoin="round" /><path d="M30 134h148" stroke={stroke} strokeWidth="8" /><path d="M76 86l10 10M88 80l10 10M100 78l8 10" stroke={accent} strokeWidth="4" strokeLinecap="round" /></>,
    bag: <><rect x="34" y="70" width="132" height="76" rx="34" fill={color} stroke={stroke} strokeWidth="4" /><path d="M76 70c0-16 10-24 24-24s24 8 24 24" fill="none" stroke={stroke} strokeWidth="5" /><path d="M48 104h104" stroke={accent} strokeWidth="5" strokeLinecap="round" /></>,
    backpack: <><rect x="58" y="44" width="84" height="118" rx="26" fill={color} stroke={stroke} strokeWidth="4" /><rect x="72" y="104" width="56" height="40" rx="10" fill="none" stroke={stroke} strokeWidth="3" /><path d="M86 44c0-10 6-16 14-16s14 6 14 16" fill="none" stroke={stroke} strokeWidth="4" /></>,
    ball: <><circle cx="80" cy="110" r="36" fill={color} stroke={stroke} strokeWidth="4" /><path d="M56 84c14 12 14 40 0 52M104 84c-14 12-14 40 0 52" stroke="#fff" strokeWidth="4" fill="none" /><circle cx="130" cy="80" r="26" fill={color} stroke={stroke} strokeWidth="4" /><path d="M114 62c10 8 10 28 0 36M146 62c-10 8-10 28 0 36" stroke="#fff" strokeWidth="3" fill="none" /></>,
    grip: <><circle cx="100" cy="100" r="44" fill={color} stroke={stroke} strokeWidth="4" /><circle cx="100" cy="100" r="18" fill="#ECE4DB" stroke={stroke} strokeWidth="4" /><path d="M60 84c20-6 60-6 80 0M58 112c22 6 62 6 84 0" stroke={stroke} strokeWidth="3" opacity=".4" fill="none" /></>,
    tape: <><rect x="50" y="70" width="100" height="60" rx="10" fill={color} stroke={stroke} strokeWidth="4" /><path d="M60 100h80" stroke={stroke} strokeWidth="3" strokeDasharray="6 6" /></>,
    band: <><rect x="56" y="74" width="88" height="52" rx="22" fill={color} stroke={stroke} strokeWidth="4" /><rect x="72" y="88" width="56" height="24" rx="12" fill="#ECE4DB" /></>,
    cap: <><path d="M48 116c0-34 22-56 52-56s52 22 52 56H48Z" fill={color} stroke={stroke} strokeWidth="4" /><path d="M40 116h120c6 0 6 10 0 12H72" fill={color} stroke={stroke} strokeWidth="4" strokeLinejoin="round" /></>,
    bottle: <><rect x="78" y="58" width="44" height="108" rx="16" fill={color} stroke={stroke} strokeWidth="4" /><rect x="86" y="34" width="28" height="24" rx="6" fill={stroke} /></>,
  }
  shapes.jacket = shapes.hoodie
  const logoPos = { shirt: [100, 92], hoodie: [100, 92], cap: [100, 94], bottle: [100, 108] }[art]
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <circle cx="100" cy="104" r="78" fill="#fff" opacity=".35" />
      {shapes[art] || shapes.ball}
      {logo && logoPos && <image href="/logo-mark.png" x={logoPos[0] - 11} y={logoPos[1] - 11} width="22" height="22" />}
    </svg>
  )
}

export function ProductCard({ p }) {
  const bg = p.category === 'rackets' ? 'bg-[#E7E9DA]' : 'bg-sand'
  return (
    <Link to={`/shop/${p.category}/${p.id}`} className="group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-forest/10 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-forest/10">
      <div className={`relative grid aspect-square place-items-center ${bg}`}>
        <ProductArt art={p.art} color={p.color} logo={p.logo} className="h-[78%] w-[78%] transition duration-500 group-hover:scale-105 group-hover:rotate-[-2deg]" />
        {p.shape && <span className="absolute left-3 top-3 rounded-full bg-white/80 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wider text-forest">{p.shape}</span>}
        <span className="absolute bottom-3 left-3 flex gap-1">
          {p.locations.map((s) => <span key={s} className="rounded-full bg-forest px-2 py-0.5 text-[10px] font-semibold text-cream">{getLocation(s).short}</span>)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-bold uppercase tracking-[.16em] text-ink/45">{p.brand}</p>
        <p className="mt-0.5 font-bold leading-snug text-forest">{p.name}</p>
        {p.colors && (
          <div className="mt-2 flex gap-1">{p.colors.map((c) => <span key={c} className="size-3.5 rounded-full ring-1 ring-black/10" style={{ background: c }} />)}</div>
        )}
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="display text-3xl text-forest">{eur(p.price)}</span>
          <span className="grid size-8 place-items-center rounded-full bg-cream text-forest transition group-hover:bg-lime"><Icon name="arrow" className="size-4" /></span>
        </div>
      </div>
    </Link>
  )
}

