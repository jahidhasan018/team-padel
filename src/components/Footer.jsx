import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Icon from './Icon'
import { Logo, Button } from './ui'
import { openLocations } from '../data/locations'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <svg viewBox="0 0 300 300" className="pointer-events-none absolute -bottom-24 -right-16 size-[340px] text-lime" fill="none" aria-hidden="true">
        <circle cx="150" cy="150" r="110" stroke="currentColor" strokeWidth="18" />
        <path d="M95 50c40 50 40 150 0 200M205 50c-40 50-40 150 0 200" stroke="currentColor" strokeWidth="12" />
      </svg>

      <div className="container-x relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-20">
        <div>
          <Logo light />
          <p className="display mt-6 text-4xl text-lime">Play. Connect. Grow.</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/60">We develop and operate padel clubs in the Palatinate — and we are looking for the next one.</p>
          <div className="mt-6 flex gap-2">
            {[['instagram', 'https://instagram.com', 'Instagram'], ['whatsapp', 'https://wa.me/4915100000100', 'WhatsApp'], ['google', 'https://maps.google.com', 'Google Reviews']].map(([i, h, l]) => (
              <a key={i} href={h} target="_blank" rel="noreferrer" aria-label={l} className="grid size-10 place-items-center rounded-full border border-cream/15 transition hover:border-lime hover:bg-lime hover:text-forest">
                <Icon name={i} className="size-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <FooterCol title="Explore" links={[['Locations', '/locations'], ['Book & Play', '/book-play'], ['Services', '/services'], ['Shop', '/shop'], ['Padel Knowledge', '/padel-knowledge'], ['Community', '/community']]} />
        <FooterCol title="Team Padel" links={[['About Us', '/team-padel/about-us'], ['Develop a Location With Us', '/team-padel/expand-with-us'], ['Partnerships', '/team-padel/partnerships'], ['Suggest a Location', '/team-padel/suggest-a-location'], ['Careers', '/team-padel/careers'], ['Contact', '/team-padel/contact']]} />

        <div>
          <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[.22em] text-cream/45">Our Locations</h3>
          <ul className="space-y-5">
            {openLocations.map((l) => (
              <li key={l.slug}>
                <Link to={`/locations/${l.slug}`} className="group block">
                  <span className="flex items-center gap-2 font-semibold group-hover:text-lime"><Icon name="pin" className="size-4 text-lime" /> {l.short}</span>
                  <span className="mt-1 block pl-6 text-[13px] text-cream/55">{l.address.street}, {l.address.zip} {l.address.city}</span>
                  <span className="block pl-6 text-[13px] text-cream/55">{l.phone}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Button to="/locations" variant="ghostLight" size="sm" className="mt-6">Find a location</Button>
        </div>
      </div>

      <div className="relative border-t border-cream/10">
        <div className="container-x flex flex-col gap-3 py-6 pb-24 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between sm:pb-6">
          <p>© {new Date().getFullYear()} Team Padel GmbH. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <Link to="/privacy" className="hover:text-lime">Privacy Policy</Link>
            <Link to="/imprint" className="hover:text-lime">Legal Notice / Imprint</Link>
            <button onClick={() => window.dispatchEvent(new Event('open-cookies'))} className="hover:text-lime">Cookie Settings</button>
          </div>
        </div>
      </div>
      <CookieBanner />
    </footer>
  )
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[.22em] text-cream/45">{title}</h3>
      <ul className="space-y-2.5">
        {links.map(([l, to]) => <li key={to}><Link to={to} className="text-[14px] text-cream/80 hover:text-lime">{l}</Link></li>)}
      </ul>
    </div>
  )
}

function CookieBanner() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (!localStorage.getItem('tp-cookies')) setTimeout(() => setShow(true), 1200)
    const o = () => setShow(true)
    window.addEventListener('open-cookies', o); return () => window.removeEventListener('open-cookies', o)
  }, [])
  const choose = (v) => { localStorage.setItem('tp-cookies', v); setShow(false) }
  if (!show) return null
  return (
    <div className="fixed bottom-20 left-3 right-3 z-[55] max-w-md rounded-3xl bg-cream p-5 text-ink shadow-2xl shadow-black/30 ring-1 ring-black/5 sm:bottom-5 sm:left-5 sm:right-auto">
      <div className="flex items-start gap-3">
        <img src="/logo-mark.png" alt="" className="size-9" />
        <div>
          <p className="font-bold text-forest">Quick one before you play</p>
          <p className="mt-1 text-[13px] leading-relaxed text-ink/65">We use cookies for essential functions and — with your OK — to understand how the site is used and to show Google reviews & maps.</p>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <Button onClick={() => choose('all')} size="sm" icon={null} className="flex-1">Accept all</Button>
        <Button onClick={() => choose('essential')} size="sm" variant="outline" icon={null} className="flex-1">Essential only</Button>
      </div>
    </div>
  )
}

