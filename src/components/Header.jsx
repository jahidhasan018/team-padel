import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Icon from './Icon'
import { Logo, Button } from './ui'
import { locations, openLocations } from '../data/locations'
import SearchDialog from './SearchDialog'

export const nav = [
  {
    label: 'Locations', to: '/locations',
    children: [
      ...locations.filter((l) => l.status === 'open').map((l) => ({ label: l.short, to: `/locations/${l.slug}`, desc: l.type })),
      { label: 'Future locations', to: '/team-padel/expand-with-us', desc: 'Where we go next' },
    ],
  },
  {
    label: 'Book & Play', to: '/book-play',
    children: [
      { label: 'Court Booking', to: '/book-play/court-booking', icon: 'calendar', desc: 'Live court availability' },
      { label: 'Events & Tournaments', to: '/book-play/events', icon: 'trophy', desc: 'Americanos, opens, socials' },
      { label: 'Trainer Sessions', to: '/book-play/trainer-sessions', icon: 'whistle', desc: 'Lessons & clinics' },
      { label: 'Racket Rental', to: '/book-play/racket-rental', icon: 'racket', desc: 'Prices & conditions' },
      { label: 'Gift Vouchers', to: '/book-play/gift-vouchers', icon: 'gift', desc: 'Give padel' },
    ],
  },
  {
    label: 'Services', to: '/services',
    children: [
      { label: 'Academy', to: '/services/academy', icon: 'graduation' },
      { label: 'Corporate & Group Events', to: '/services/corporate-events', icon: 'users' },
      { label: 'Tournament Formats', to: '/services/tournaments', icon: 'trophy' },
      { label: 'Padel for Beginners', to: '/services/padel-for-beginners', icon: 'sprout' },
      { label: 'Padel for Kids & Teens', to: '/services/padel-for-kids', icon: 'smile' },
    ],
  },
  {
    label: 'Shop', to: '/shop',
    children: [
      { label: 'Rackets', to: '/shop/rackets' },
      { label: 'Racket of the Month', to: '/shop/racket-of-the-month', badge: 'New' },
      { label: 'Clothing', to: '/shop/clothing' },
      { label: 'Shoes', to: '/shop/shoes' },
      { label: 'Bags', to: '/shop/bags' },
      { label: 'Balls & Accessories', to: '/shop/accessories' },
      { label: 'Team Padel Merch', to: '/shop/team-padel' },
    ],
  },
  {
    label: 'Padel Knowledge', to: '/padel-knowledge',
    children: [
      { label: 'Understanding Padel', to: '/padel-knowledge/understanding-padel' },
      { label: 'Rules', to: '/padel-knowledge/rules' },
      { label: 'Beginners', to: '/padel-knowledge/beginners' },
      { label: 'Equipment Guides', to: '/padel-knowledge/equipment' },
      { label: 'Tips & Techniques', to: '/padel-knowledge/tips-techniques' },
      { label: 'Training & Exercises', to: '/padel-knowledge/training' },
      { label: 'FAQ', to: '/padel-knowledge/faq' },
    ],
  },
  { label: 'Community', to: '/community' },
  {
    label: 'Team Padel', to: '/team-padel',
    children: [
      { label: 'About Us', to: '/team-padel/about-us' },
      { label: 'Develop a Location', to: '/team-padel/expand-with-us', badge: '★' },
      { label: 'Partnerships', to: '/team-padel/partnerships' },
      { label: 'Suggest a Location', to: '/team-padel/suggest-a-location' },
      { label: 'Careers', to: '/team-padel/careers' },
      { label: 'Contact', to: '/team-padel/contact' },
    ],
  },
]

function BookNowMenu({ compact }) {
  const [open, setOpen] = useState(false)
  const ref = useRef()
  useEffect(() => {
    const h = (e) => !ref.current?.contains(e.target) && setOpen(false)
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])
  return (
    <div ref={ref} className="relative">
      <Button onClick={() => setOpen((o) => !o)} size={compact ? 'sm' : 'md'} icon="chevronDown" aria-expanded={open}>Book Now</Button>
      {open && (
        <div className="absolute right-0 top-[calc(100%+12px)] w-[320px] overflow-hidden rounded-2xl bg-cream text-ink shadow-2xl shadow-black/30 ring-1 ring-black/5">
          <p className="px-5 pt-4 pb-2 text-[11px] font-bold uppercase tracking-[.2em] text-ink/50">Choose your club</p>
          {openLocations.map((l) => (
            <a key={l.slug} href={l.playtomicUrl} target="_blank" rel="noreferrer" className="group flex items-center gap-3 px-5 py-3 hover:bg-sand">
              <img src={l.image} alt="" className="size-11 rounded-xl object-cover" />
              <span className="flex-1">
                <span className="block text-sm font-bold text-forest">{l.short}</span>
                <span className="text-xs text-ink/55">{l.type} · {l.courts.total} courts</span>
              </span>
              <Icon name="arrowUpRight" className="size-4 text-forest/40 group-hover:text-forest" />
            </a>
          ))}
          <Link to="/book-play/court-booking" onClick={() => setOpen(false)} className="mt-1 flex items-center justify-between border-t border-forest/10 bg-forest px-5 py-3.5 text-[13px] font-semibold text-cream hover:bg-forest-deep">
            Compare live availability <Icon name="arrow" className="size-4 text-lime" />
          </Link>
          <p className="px-5 py-2.5 text-[10.5px] text-ink/45">Bookings & payment are completed on Playtomic.</p>
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [search, setSearch] = useState(false)
  const [openGroup, setOpenGroup] = useState(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => { setMobile(false); setOpenGroup(null) }, [pathname])
  useEffect(() => {
    const k = (e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setSearch(true) } }
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [])
  useEffect(() => { document.body.style.overflow = mobile ? 'hidden' : '' }, [mobile])

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 text-cream transition-all duration-300 ${scrolled ? 'bg-forest/95 shadow-lg shadow-black/10 backdrop-blur-md' : 'bg-gradient-to-b from-black/45 to-transparent'}`}>
        {/* utility bar: business CTA always visible on desktop */}
        <div className={`hidden overflow-hidden border-b border-cream/10 transition-all duration-300 lg:block ${scrolled ? 'max-h-0 border-transparent' : 'max-h-10'}`}>
          <div className="container-x flex h-9 items-center justify-between text-[11.5px] font-medium text-cream/70">
            <div className="flex items-center gap-5">
              {openLocations.map((l) => (
                <Link key={l.slug} to={`/locations/${l.slug}`} className="flex items-center gap-1.5 hover:text-lime">
                  <span className="size-1.5 rounded-full bg-lime animate-pulse-dot" /> {l.short} · open today {l.hours[0][1]}
                </Link>
              ))}
            </div>
            <Link to="/team-padel/expand-with-us" className="group flex items-center gap-2 font-semibold text-lime">
              <Icon name="building" className="size-3.5" /> Develop a Padel Location With Us
              <Icon name="arrow" className="size-3.5 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="container-x flex h-[72px] items-center justify-between gap-6">
          <Logo light />
          <nav className="hidden items-center xl:flex" aria-label="Main">
            {nav.map((item) => (
              <div key={item.label} className="group relative">
                <NavLink to={item.to} className={({ isActive }) => `flex items-center gap-1 px-3 py-6 text-[13px] font-semibold transition hover:text-lime ${isActive ? 'text-lime' : ''}`}>
                  {item.label}
                  {item.children && <Icon name="chevronDown" className="size-3.5 opacity-60 transition group-hover:rotate-180" />}
                </NavLink>
                {item.children && (
                  <div className="invisible absolute left-1/2 top-full -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className={`rounded-2xl bg-cream p-2 text-ink shadow-2xl shadow-black/25 ring-1 ring-black/5 ${item.children.some((c) => c.desc) ? 'w-[300px]' : 'w-[240px]'}`}>
                      {item.children.map((c) => (
                        <Link key={c.to + c.label} to={c.to} className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-sand">
                          {c.icon && <span className="grid size-9 place-items-center rounded-lg bg-forest text-lime"><Icon name={c.icon} className="size-[18px]" /></span>}
                          <span className="flex-1">
                            <span className="block text-[13.5px] font-semibold text-forest">{c.label}</span>
                            {c.desc && <span className="block text-xs text-ink/55">{c.desc}</span>}
                          </span>
                          {c.badge && <span className="rounded-full bg-lime px-2 py-0.5 text-[10px] font-bold text-forest">{c.badge}</span>}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setSearch(true)} className="grid size-10 place-items-center rounded-full hover:bg-cream/10" aria-label="Search (⌘K)">
              <Icon name="search" className="size-[19px]" />
            </button>
            <div className="hidden sm:block"><BookNowMenu /></div>
            <button onClick={() => setMobile(true)} className="grid size-10 place-items-center rounded-full bg-cream/10 xl:hidden" aria-label="Open menu">
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-[60] xl:hidden ${mobile ? '' : 'pointer-events-none'}`}>
        <div onClick={() => setMobile(false)} className={`absolute inset-0 bg-black/50 transition-opacity ${mobile ? 'opacity-100' : 'opacity-0'}`} />
        <aside className={`absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-forest text-cream transition-transform duration-300 ${mobile ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex h-[72px] items-center justify-between px-5">
            <Logo light />
            <button onClick={() => setMobile(false)} className="grid size-10 place-items-center rounded-full bg-cream/10" aria-label="Close menu"><Icon name="close" /></button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 pb-6">
            {nav.map((item) => (
              <div key={item.label} className="border-b border-cream/10">
                {item.children ? (
                  <button onClick={() => setOpenGroup(openGroup === item.label ? null : item.label)} className="flex w-full items-center justify-between py-4 text-left">
                    <span className="display text-[2.1rem]">{item.label}</span>
                    <Icon name="chevronDown" className={`size-5 transition ${openGroup === item.label ? 'rotate-180 text-lime' : ''}`} />
                  </button>
                ) : (
                  <Link to={item.to} className="block py-4"><span className="display text-[2.1rem]">{item.label}</span></Link>
                )}
                {item.children && openGroup === item.label && (
                  <div className="grid grid-cols-2 gap-1 pb-4">
                    <Link to={item.to} className="col-span-2 rounded-lg bg-cream/5 px-3 py-2.5 text-sm font-semibold text-lime">Overview →</Link>
                    {item.children.map((c) => (
                      <Link key={c.to + c.label} to={c.to} className="rounded-lg px-3 py-2.5 text-[13.5px] text-cream/80 hover:bg-cream/5">{c.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link to="/team-padel/expand-with-us" className="mt-6 flex items-center justify-between rounded-2xl border border-lime/40 p-4 text-sm font-semibold text-lime">
              Develop a Padel Location With Us <Icon name="arrow" className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-2 border-t border-cream/10 p-4">
            {openLocations.map((l) => (
              <a key={l.slug} href={l.playtomicUrl} target="_blank" rel="noreferrer" className="rounded-xl bg-lime px-3 py-3 text-center text-[13px] font-bold text-forest">
                Book {l.short}
              </a>
            ))}
          </div>
        </aside>
      </div>

      {/* Mobile sticky book bar — the #1 mobile task is checking courts */}
      <div className="fixed inset-x-3 bottom-3 z-40 sm:hidden">
        <Link to="/book-play/court-booking" className="flex items-center justify-between rounded-full bg-lime py-3 pl-5 pr-3 text-sm font-bold text-forest shadow-xl shadow-black/25">
          <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-forest animate-pulse-dot" /> Free courts today</span>
          <span className="grid size-8 place-items-center rounded-full bg-forest text-lime"><Icon name="arrow" className="size-4" /></span>
        </Link>
      </div>

      <SearchDialog open={search} onClose={() => setSearch(false)} />
    </>
  )
}

