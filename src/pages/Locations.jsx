import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import Icon from '../components/Icon'
import { Button, Eyebrow, PageHero, Breadcrumbs, SectionHead, Tag, Accordion, ExpansionBand, useTitle } from '../components/ui'
import { AvailabilityBoard, EventsFeed, SessionsList } from '../components/playtomic'
import { ProductCard } from '../components/products'
import { locations, getLocation, formatAddress } from '../data/locations'
import { trainers, eur } from '../data/playtomic'
import { products } from '../data/shop'
import { services } from '../data/services'
import { NotFound } from './Misc'

export function LocationsPage() {
  useTitle('Our padel locations', 'Team Padel locations in Bornheim and Bad Bergzabern — indoor and outdoor padel courts in the Palatinate.')
  const open = locations.filter((l) => l.status === 'open')
  const planned = locations.filter((l) => l.status !== 'open')
  return (
    <>
      <PageHero crumbs={[{ label: 'Locations' }]} eyebrow={`${open.length} clubs · more coming`} title={<>Find your<br /><span className="text-lime">home court</span></>}
        intro="Every Team Padel club has its own character — but the same coaches, the same standards and one community." />

      <section className="container-x py-16 md:py-24">
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-6">
            {open.map((l) => (
              <article key={l.slug} className="group grid overflow-hidden rounded-[28px] bg-white ring-1 ring-forest/10 md:grid-cols-[1fr_1.1fr]">
                <Link to={`/locations/${l.slug}`} className="relative block overflow-hidden">
                  <img src={l.image} alt={l.name} className="h-full min-h-[240px] w-full object-cover transition duration-700 group-hover:scale-105" />
                  <Tag className="absolute left-4 top-4">{l.type}</Tag>
                </Link>
                <div className="flex flex-col p-6 sm:p-8">
                  <h2 className="display text-5xl text-forest">{l.short}</h2>
                  <p className="mt-2 text-[14.5px] text-ink/65">{l.tagline}</p>
                  <dl className="mt-5 grid grid-cols-3 gap-3 border-y border-forest/10 py-4 text-center">
                    <div><dt className="display text-4xl text-forest">{l.courts.total}</dt><dd className="text-[11px] font-semibold uppercase tracking-wider text-ink/50">Courts</dd></div>
                    <div><dt className="display text-4xl text-forest">{l.rating}</dt><dd className="text-[11px] font-semibold uppercase tracking-wider text-ink/50">Google</dd></div>
                    <div><dt className="display text-4xl text-forest">{eur(Math.min(...l.prices.map((p) => p.price).filter((p) => p > 10)))}</dt><dd className="text-[11px] font-semibold uppercase tracking-wider text-ink/50">From / h</dd></div>
                  </dl>
                  <p className="mt-4 flex items-start gap-2 text-[13.5px] text-ink/70"><Icon name="pin" className="mt-0.5 size-4 shrink-0 text-forest" /> {formatAddress(l.address)}</p>
                  <p className="mt-1.5 flex items-start gap-2 text-[13.5px] text-ink/70"><Icon name="clock" className="mt-0.5 size-4 shrink-0 text-forest" /> Today {l.hours[0][1]}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    <Button to={`/locations/${l.slug}`} variant="dark" size="sm">Visit club page</Button>
                    <Button href={l.playtomicUrl} size="sm" icon="arrowUpRight">Book</Button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Stylised region map */}
          <aside className="flex flex-col gap-6">
            <div className="court-lines relative overflow-hidden rounded-[28px] bg-forest p-6 text-cream">
              <p className="text-[11px] font-bold uppercase tracking-[.2em] text-lime">Südpfalz</p>
              <svg viewBox="0 0 300 300" className="mt-2 w-full">
                <path d="M40 60c40-30 120-40 180-20s60 80 40 140-70 100-140 90S20 220 20 160s-10-70 20-100Z" fill="#34493A" stroke="#CEDB23" strokeOpacity=".3" strokeWidth="2" strokeDasharray="4 6" />
                <path d="M60 230C110 180 160 140 250 110" stroke="#F6F1ED" strokeOpacity=".2" strokeWidth="3" />
                <text x="150" y="120" fill="#F6F1ED" opacity=".35" fontSize="11" fontFamily="Montserrat">Landau</text>
                {[{ x: 175, y: 95, l: open[0] }, { x: 110, y: 190, l: open[1] }].map(({ x, y, l }) => (
                  <Link key={l.slug} to={`/locations/${l.slug}`}>
                    <circle cx={x} cy={y} r="18" fill="#CEDB23" opacity=".2"><animate attributeName="r" values="10;22;10" dur="2.4s" repeatCount="indefinite" /></circle>
                    <circle cx={x} cy={y} r="8" fill="#CEDB23" />
                    <text x={x + 14} y={y + 4} fill="#F6F1ED" fontSize="13" fontWeight="700" fontFamily="Montserrat">{l.short}</text>
                  </Link>
                ))}
                <circle cx="220" cy="210" r="7" fill="none" stroke="#CEDB23" strokeWidth="2" strokeDasharray="3 3" />
                <text x="160" y="235" fill="#CEDB23" fontSize="12" fontFamily="Montserrat">next location?</text>
              </svg>
            </div>
            {planned.map((l) => (
              <Link key={l.slug} to="/team-padel/expand-with-us" className="group relative overflow-hidden rounded-[28px] bg-lime p-7 text-forest">
                <Icon name="plus" className="size-10 transition group-hover:rotate-90" strokeWidth={1.5} />
                <h3 className="display mt-4 text-5xl">{l.name}</h3>
                <p className="mt-2 max-w-xs text-[14px] text-forest/75">We are actively looking for land, halls and partners for location #{open.length + 1}.</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">Develop a location with us <Icon name="arrow" className="size-4" /></span>
              </Link>
            ))}
          </aside>
        </div>
      </section>
    </>
  )
}

const sections = [['info', 'Info'], ['facilities', 'Facilities'], ['prices', 'Prices'], ['booking', 'Booking'], ['events', 'Events'], ['academy', 'Academy'], ['shop', 'Shop'], ['faq', 'FAQ & Reviews']]

export function LocationDetail() {
  const { slug } = useParams()
  const l = getLocation(slug)
  useTitle(l?.name, l && `${l.name}: ${l.courts.total} padel courts in ${l.address.city}. Live availability, prices, events and academy.`)
  const [img, setImg] = useState(0)
  if (!l || l.status !== 'open') return <NotFound />
  const locProducts = products.filter((p) => p.locations.includes(l.slug)).slice(0, 4)
  const locTrainers = trainers.filter((t) => t.locations.includes(l.slug))

  return (
    <>
      {/* Hero */}
      <section className="relative isolate min-h-[78vh] overflow-hidden bg-forest-deep text-cream">
        <img src={l.gallery[img]} alt={l.name} className="absolute inset-0 -z-10 h-full w-full object-cover transition-opacity duration-500" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep via-forest-deep/50 to-forest-deep/30" />
        <div className="container-x flex min-h-[78vh] flex-col justify-end pb-12 pt-32">
          <Breadcrumbs light items={[{ label: 'Locations', to: '/locations' }, { label: l.short }]} />
          <div className="flex flex-wrap items-center gap-2">
            <Tag>{l.type}</Tag>
            <span className="flex items-center gap-1 rounded-full bg-cream/15 px-2.5 py-1 text-[11px] font-bold backdrop-blur"><Icon name="star" className="size-3 fill-lime text-lime" /> {l.rating} · {l.reviews} Google reviews</span>
          </div>
          <h1 className="display mt-4 text-7xl sm:text-8xl lg:text-[8.5rem]">Team Padel<br /><span className="text-lime">{l.short}</span></h1>
          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-wrap gap-3">
              <Button href={l.playtomicUrl} size="lg" icon="arrowUpRight">Book a court</Button>
              <Button href={`https://maps.google.com/?q=${encodeURIComponent(formatAddress(l.address))}`} variant="ghostLight" size="lg" icon="pin">Directions</Button>
            </div>
            <div className="flex gap-2">
              {l.gallery.map((g, i) => (
                <button key={g + i} onClick={() => setImg(i)} aria-label={`Show image ${i + 1}`} className={`size-16 overflow-hidden rounded-xl ring-2 transition sm:size-20 ${img === i ? 'ring-lime' : 'ring-transparent opacity-60 hover:opacity-100'}`}>
                  <img src={g} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky in-page nav */}
      <nav className="sticky top-[72px] z-30 border-b border-forest/10 bg-cream/90 backdrop-blur-md">
        <div className="container-x no-scrollbar flex gap-1 overflow-x-auto py-2.5">
          {sections.map(([id, label]) => <a key={id} href={`#${id}`} className="shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-forest/70 hover:bg-white hover:text-forest">{label}</a>)}
        </div>
      </nav>

      {/* Info */}
      <section id="info" className="container-x scroll-mt-32 grid gap-10 py-16 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <Eyebrow>Welcome to {l.short}</Eyebrow>
          <p className="display text-5xl text-forest sm:text-6xl">{l.tagline}</p>
          <p className="mt-5 text-[16px] leading-relaxed text-ink/75">{l.intro}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white p-5 ring-1 ring-forest/10">
              <p className="flex items-center gap-2 font-bold text-forest"><Icon name="car" className="size-5" /> Directions</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink/65">{l.directions}</p>
            </div>
            <div className="rounded-3xl bg-white p-5 ring-1 ring-forest/10">
              <p className="flex items-center gap-2 font-bold text-forest"><Icon name="pin" className="size-5" /> Parking</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink/65">{l.parking}</p>
            </div>
          </div>
        </div>
        <aside className="h-fit rounded-[28px] bg-forest p-7 text-cream lg:sticky lg:top-36">
          <p className="text-[11px] font-bold uppercase tracking-[.2em] text-lime">Opening hours</p>
          <ul className="mt-3 divide-y divide-cream/10">
            {l.hours.map(([d, h]) => <li key={d} className="flex justify-between py-2.5 text-[14px]"><span className="text-cream/70">{d}</span><span className="font-semibold tabular-nums">{h}</span></li>)}
          </ul>
          <p className="mt-6 text-[11px] font-bold uppercase tracking-[.2em] text-lime">Contact</p>
          <div className="mt-3 space-y-2.5 text-[14px]">
            <p className="flex gap-3"><Icon name="pin" className="size-5 shrink-0 text-lime" /> {formatAddress(l.address)}</p>
            <a href={`tel:${l.phone}`} className="flex gap-3 hover:text-lime"><Icon name="phone" className="size-5 shrink-0 text-lime" /> {l.phone}</a>
            <a href={`mailto:${l.email}`} className="flex gap-3 hover:text-lime"><Icon name="mail" className="size-5 shrink-0 text-lime" /> {l.email}</a>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-2">
            <Button href={`https://wa.me/${l.whatsapp.replace(/\D/g, '')}`} size="sm" icon="whatsapp">WhatsApp</Button>
            <Button href={`tel:${l.phone}`} variant="ghostLight" size="sm" icon="phone">Call</Button>
          </div>
        </aside>
      </section>

      {/* Facilities */}
      <section id="facilities" className="scroll-mt-32 bg-sand/60 py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Eyebrow>Facilities</Eyebrow>
            <h2 className="display text-6xl text-forest">{l.courts.total} courts.<br />Everything else, too.</h2>
            <p className="mt-4 text-ink/65">{l.courts.kind}</p>
            <div className="mt-6 flex gap-3">
              <div className="flex-1 rounded-3xl bg-forest p-5 text-cream"><Icon name="roof" className="size-6 text-lime" /><p className="display mt-3 text-5xl">{l.courts.indoor}</p><p className="text-xs font-semibold text-cream/60">Indoor courts</p></div>
              <div className="flex-1 rounded-3xl bg-white p-5 ring-1 ring-forest/10"><Icon name="sun" className="size-6 text-forest" /><p className="display mt-3 text-5xl text-forest">{l.courts.outdoor}</p><p className="text-xs font-semibold text-ink/50">Outdoor courts</p></div>
            </div>
          </div>
          <ul className="grid content-start gap-2 sm:grid-cols-2">
            {l.amenities.map((a) => (
              <li key={a} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 text-[14px] font-semibold text-forest ring-1 ring-forest/5">
                <span className="grid size-7 place-items-center rounded-full bg-lime"><Icon name="check" className="size-4" strokeWidth={2.5} /></span>{a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Prices */}
      <section id="prices" className="container-x scroll-mt-32 py-16">
        <SectionHead eyebrow="Prices" title="What it costs" intro="Court prices are per court (4 players), not per person. Final prices are shown on Playtomic." />
        <div className="overflow-hidden rounded-[28px] bg-white ring-1 ring-forest/10">
          {l.prices.map((p, i) => (
            <div key={p.label} className={`flex items-center justify-between gap-4 px-6 py-5 ${i ? 'border-t border-dashed border-forest/15' : ''}`}>
              <div><p className="font-semibold text-forest">{p.label}</p>{p.note && <p className="text-[12.5px] text-ink/50">{p.note}</p>}</div>
              <p className="display text-4xl text-forest">{eur(p.price)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Booking */}
      <section id="booking" className="scroll-mt-32 border-y border-forest/10 bg-white py-16">
        <div className="container-x">
          <SectionHead eyebrow="Booking" title={`Free courts in ${l.short}`} action={<Button href={l.playtomicUrl} variant="dark" icon="arrowUpRight">Open in Playtomic</Button>} />
          <AvailabilityBoard fixedLocation={l.slug} />
        </div>
      </section>

      {/* Events */}
      <section id="events" className="scroll-mt-32 bg-forest py-16 text-cream">
        <div className="container-x">
          <SectionHead light eyebrow="Events" title={`Coming up in ${l.short}`} action={<Button to="/book-play/events" variant="ghostLight">All events</Button>} />
          <EventsFeed fixedLocation={l.slug} dark limit={3} showFilters={false} />
        </div>
      </section>

      {/* Academy */}
      <section id="academy" className="container-x scroll-mt-32 py-16">
        <SectionHead eyebrow="Academy & training" title="Train with our coaches" action={<Button to="/services/academy" variant="outlineLime">About the Academy</Button>} />
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {locTrainers.map((t) => <TrainerCard key={t.id} t={t} />)}
          <Link to="/services/padel-for-kids" className="relative overflow-hidden rounded-3xl">
            <img src="/images/kids.jpg" alt="" className="h-full min-h-[220px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep to-transparent" />
            <div className="absolute bottom-0 p-5 text-cream"><Tag>Kids Academy</Tag><p className="mt-2 font-bold">Weekly courses, 6–16 yrs. First session free.</p></div>
          </Link>
        </div>
        <SessionsList fixedLocation={l.slug} limit={5} />
      </section>

      {/* Shop */}
      <section id="shop" className="scroll-mt-32 bg-sand/60 py-16">
        <div className="container-x">
          <SectionHead eyebrow="In-store" title={`Available in ${l.short}`} intro="A selection of products in stock at this club." action={<Button to="/shop" variant="outline">Full catalogue</Button>} />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{locProducts.map((p) => <ProductCard key={p.id} p={p} />)}</div>
        </div>
      </section>

      {/* FAQ + reviews */}
      <section id="faq" className="container-x scroll-mt-32 grid gap-12 py-16 lg:grid-cols-2">
        <div>
          <Eyebrow>Good to know</Eyebrow>
          <h2 className="display mb-6 text-6xl text-forest">{l.short} FAQ</h2>
          <Accordion items={l.faqs} />
        </div>
        <Reviews l={l} />
      </section>

      <ServicesMini />
    </>
  )
}

export function TrainerCard({ t }) {
  const initials = t.name.split(' ').map((n) => n[0]).join('')
  return (
    <div className="flex flex-col rounded-3xl bg-white p-5 ring-1 ring-forest/10">
      <div className="flex items-center gap-3">
        <span className="display grid size-14 place-items-center rounded-full bg-forest text-3xl text-lime">{initials}</span>
        <div><p className="font-bold text-forest">{t.name}</p><p className="text-xs font-semibold text-ink/50">{t.role}</p></div>
      </div>
      <p className="mt-4 text-[13.5px] leading-relaxed text-ink/65">{t.bio}</p>
      <p className="mt-auto pt-4 text-[11.5px] font-semibold text-ink/45">{t.from}</p>
    </div>
  )
}

function Reviews({ l }) {
  const reviews = [
    { n: 'Katrin M.', t: 'Super clean courts, friendly staff and the Friday Americano is the best part of my week.', s: 5 },
    { n: 'Florian B.', t: 'Booked for our company event — perfectly organised. Coaches made everyone feel like a pro.', s: 5 },
    { n: 'Aylin S.', t: 'Great atmosphere and good racket rental. Parking can be tight on Saturdays.', s: 4 },
  ]
  return (
    <div className="rounded-[28px] bg-forest p-7 text-cream sm:p-9">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm font-semibold"><Icon name="google" className="size-5" /> Google Reviews</p>
        <p className="flex items-center gap-1"><span className="display text-5xl text-lime">{l.rating}</span><span className="text-xs text-cream/60">/ 5 · {l.reviews}</span></p>
      </div>
      <ul className="mt-6 space-y-4">
        {reviews.map((r) => (
          <li key={r.n} className="rounded-2xl bg-cream/[.06] p-4">
            <div className="flex items-center justify-between"><p className="text-sm font-bold">{r.n}</p><p className="flex">{Array.from({ length: 5 }).map((_, i) => <Icon key={i} name="star" className={`size-3.5 ${i < r.s ? 'fill-lime text-lime' : 'text-cream/30'}`} />)}</p></div>
            <p className="mt-2 text-[13.5px] leading-relaxed text-cream/75">"{r.t}"</p>
          </li>
        ))}
      </ul>
      <Button href="https://maps.google.com" variant="ghostLight" size="sm" icon="arrowUpRight" className="mt-6">All reviews on Google</Button>
    </div>
  )
}

function ServicesMini() {
  return (
    <section className="container-x pb-20">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {services.map((s) => (
          <Link key={s.slug} to={`/services/${s.slug}`} className="group flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-forest/10 transition hover:bg-forest hover:text-cream">
            <span className="grid size-10 place-items-center rounded-full bg-lime text-forest"><Icon name={s.icon} className="size-5" /></span>
            <span className="text-[13.5px] font-semibold">{s.title}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

export { ExpansionBand }

