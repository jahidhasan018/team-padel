import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import Icon from '../components/Icon'
import { Button, Eyebrow, SectionHead, Swoosh, ExpansionBand, Tag, useTitle } from '../components/ui'
import { AvailabilityBoard, EventsFeed, usePlaytomic } from '../components/playtomic'
import { ProductArt } from '../components/products'
import { locations, openLocations } from '../data/locations'
import { services } from '../data/services'
import { communityPosts } from '../data/community'
import { articles } from '../data/knowledge'
import { fetchAvailability, fmtTime } from '../data/playtomic'

export default function Home() {
  useTitle(null)
  return (
    <>
      <Hero />
      <LocationsStrip />
      <BookPlayBand />
      <LiveCourts />
      <UpcomingEvents />
      <ServicesRow />
      <AcademyIntro />
      <ShopBand />
      <KnowledgeCommunity />
      <AboutStrip />
      <ExpansionBand />
      <ContactStrip />
    </>
  )
}

function Hero() {
  const { data, loading } = usePlaytomic(() => fetchAvailability({ location: 'all' }), [])
  const next = useMemo(() => openLocations.map((l) => ({ l, s: data.find((s) => s.locationSlug === l.slug) })), [data])
  return (
    <section className="grain relative isolate flex min-h-[100svh] items-end overflow-hidden bg-forest-deep text-cream">
      <img src="/images/hero.jpg" alt="Padel player on an indoor court at Team Padel" className="absolute inset-0 -z-10 h-full w-full object-cover object-[65%_center]" fetchpriority="high" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-deep/95 via-forest-deep/60 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep via-transparent to-transparent" />
      <Swoosh className="absolute -left-20 top-24 -z-10 hidden size-[360px] -scale-x-100 text-lime/70 md:block" />

      <div className="container-x pb-16 pt-36 md:pb-24">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-cream/10 px-3.5 py-1.5 text-[12px] font-semibold backdrop-blur">
            <img src="/logo-mark.png" alt="" className="size-4" /> Padel in the Palatinate — since 2023
          </p>
          <h1 className="display text-[5.2rem] sm:text-[7.5rem] lg:text-[9.5rem]">
            Play padel.<br /><span className="text-lime">Connect.</span> Grow.
          </h1>
          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-cream/80">
            Discover Team Padel — your padel community with clubs in Bornheim and Bad Bergzabern. Courts, coaching, Americanos and a terrace for the third set.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/locations" size="lg" icon="pin">Find your location</Button>
            <Button to="/book-play/court-booking" size="lg" variant="ghostLight">Check free courts</Button>
          </div>
        </div>

        {/* live next-slot ticker */}
        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:absolute lg:bottom-24 lg:right-8 lg:mt-0 lg:w-[360px] lg:grid-cols-1 xl:right-[max(2rem,calc((100vw-1240px)/2+2rem))]">
          {next.map(({ l, s }) => (
            <Link key={l.slug} to={`/locations/${l.slug}`} className="group flex items-center gap-4 rounded-2xl bg-cream/10 p-3 pr-4 ring-1 ring-cream/15 backdrop-blur-md transition hover:bg-cream/15">
              <img src={l.image} alt="" className="size-14 rounded-xl object-cover" />
              <div className="flex-1">
                <p className="text-[11px] font-bold uppercase tracking-[.18em] text-cream/55">{l.short}</p>
                <p className="text-[15px] font-semibold">
                  {loading ? <span className="inline-block h-4 w-32 animate-pulse rounded bg-cream/20" /> : s ? <>Next free court <span className="text-lime">{fmtTime(s.start)}</span></> : 'Fully booked today'}
                </p>
              </div>
              <span className="size-2 rounded-full bg-lime animate-pulse-dot" />
            </Link>
          ))}
        </div>
      </div>
      <a href="#locations" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 place-items-center rounded-full border border-cream/30 p-2.5 text-cream/70 hover:text-lime md:grid" aria-label="Scroll down">
        <Icon name="chevronDown" className="size-4" />
      </a>
    </section>
  )
}

function LocationsStrip() {
  return (
    <section id="locations" className="container-x py-20 md:py-28">
      <div className="grid gap-10 lg:grid-cols-[.8fr_1.6fr] lg:items-center">
        <div>
          <Eyebrow>Our locations</Eyebrow>
          <h2 className="display text-6xl text-forest sm:text-7xl">Two locations.<br />One team.</h2>
          <p className="mt-5 max-w-sm text-ink/65">One indoor powerhouse, one vineyard club. Same coaches, same community, one Playtomic account for both.</p>
          <Button to="/locations" variant="outlineLime" className="mt-7">View all locations</Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {locations.filter((l) => l.status === 'open').map((l) => (
            <Link key={l.slug} to={`/locations/${l.slug}`} className="group overflow-hidden rounded-3xl bg-white ring-1 ring-forest/10 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-forest/15">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={l.image} alt={l.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
                <Tag className="absolute left-3 top-3">{l.type}</Tag>
                <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-forest"><Icon name="star" className="size-3 fill-lime text-forest" /> {l.rating}</span>
              </div>
              <div className="flex items-center justify-between gap-3 p-5">
                <div>
                  <h3 className="font-bold text-forest">{l.name}</h3>
                  <p className="mt-1 flex items-center gap-1 text-[13px] text-ink/55"><Icon name="pin" className="size-3.5" /> {l.address.city} · {l.courts.total} courts</p>
                </div>
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-lime text-forest transition group-hover:rotate-[-45deg]"><Icon name="arrow" className="size-4" /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function BookPlayBand() {
  const tiles = [
    { icon: 'calendar', label: 'Court Booking', to: '/book-play/court-booking' },
    { icon: 'trophy', label: 'Events & Tournaments', to: '/book-play/events' },
    { icon: 'whistle', label: 'Trainer Sessions', to: '/book-play/trainer-sessions' },
    { icon: 'racket', label: 'Racket Rental', to: '/book-play/racket-rental' },
  ]
  return (
    <section className="court-lines relative overflow-hidden bg-forest text-cream">
      <img src="/images/racket-ball.jpg" alt="" className="absolute inset-y-0 right-0 hidden h-full w-[45%] object-cover lg:block" loading="lazy" />
      <div className="absolute inset-y-0 right-0 hidden w-[45%] bg-gradient-to-r from-forest via-forest/40 to-transparent lg:block" />
      <div className="container-x relative grid gap-10 py-20 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:py-24">
        <div>
          <Eyebrow light>Book & Play</Eyebrow>
          <h2 className="display text-6xl sm:text-7xl">Courts, events<br />& more</h2>
          <p className="mt-5 max-w-md text-cream/70">Check availability, find events and book your next session — everything lands on Playtomic, where you pay and split with friends.</p>
          <Button to="/book-play" className="mt-7">Go to Book & Play</Button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:max-w-[520px]">
          {tiles.map((t) => (
            <Link key={t.to} to={t.to} className="group flex aspect-square flex-col justify-between rounded-3xl bg-cream/[.07] p-4 ring-1 ring-cream/10 backdrop-blur transition hover:bg-lime hover:text-forest">
              <Icon name={t.icon} className="size-7 text-lime transition group-hover:text-forest" strokeWidth={1.5} />
              <span className="text-[13px] font-semibold leading-tight">{t.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function LiveCourts() {
  return (
    <section className="container-x py-20 md:py-24">
      <SectionHead eyebrow="Live availability" title="Free courts, right now" intro="Pulled from Playtomic every minute. Tap a time to see courts and jump straight to booking."
        action={<Button to="/book-play/court-booking" variant="outline">Full booking overview</Button>} />
      <AvailabilityBoard compact limit={7} />
    </section>
  )
}

function UpcomingEvents() {
  return (
    <section className="relative overflow-hidden bg-forest py-20 text-cream md:py-24">
      <Swoosh className="pointer-events-none absolute -bottom-32 -left-20 size-[420px] text-lime/40" />
      <div className="container-x relative">
        <SectionHead light eyebrow="What's on" title="Upcoming events" intro="Americanos, Mexicanos, clinics and the occasional very serious tournament — across all clubs."
          action={<Button to="/book-play/events" variant="ghostLight">All events</Button>} />
        <EventsFeed dark limit={6} />
      </div>
    </section>
  )
}

function ServicesRow() {
  return (
    <section className="container-x py-20 md:py-28">
      <SectionHead eyebrow="Our services" title="More than just a game" intro="From academy to corporate events — discover what we do beyond court rental."
        action={<Button to="/services" variant="outlineLime">Explore all services</Button>} />
      <div className="no-scrollbar -mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0">
        {services.map((s, i) => (
          <Link key={s.slug} to={`/services/${s.slug}`} className={`group relative w-[72%] shrink-0 snap-start overflow-hidden rounded-3xl md:w-auto ${i % 2 ? 'md:mt-10' : ''}`}>
            <img src={s.image} alt="" className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
              <span className="mb-3 grid size-10 place-items-center rounded-full bg-lime text-forest"><Icon name={s.icon} className="size-5" /></span>
              <h3 className="display text-[2.1rem]">{s.title}</h3>
              <p className="mt-1 max-h-0 overflow-hidden text-[13px] text-cream/75 opacity-0 transition-all duration-300 group-hover:max-h-24 group-hover:opacity-100">{s.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function AcademyIntro() {
  const formats = ['Kids Academy', '1:1 Private', 'Duo', 'Trio', 'Group of 4']
  return (
    <section className="bg-sand/60 py-20 md:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          <img src="/images/coach.jpg" alt="Coach at Team Padel Academy" className="aspect-[5/4] w-full rounded-[32px] object-cover" loading="lazy" />
          <div className="absolute -bottom-6 right-6 max-w-[240px] rotate-2 rounded-2xl bg-lime p-4 text-forest shadow-xl sm:right-10">
            <p className="display text-3xl leading-none">"Footwork first. Smash later."</p>
            <p className="mt-2 text-xs font-semibold">— Lucía, Head Coach</p>
          </div>
        </div>
        <div>
          <Eyebrow>Academy & training</Eyebrow>
          <h2 className="display text-6xl text-forest sm:text-7xl">Get better.<br />Faster.</h2>
          <p className="mt-5 max-w-md text-ink/70">Certified coaches, small groups and a training concept that turns enthusiasm into actual results. From your first lesson to your first tournament.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {formats.map((f) => <span key={f} className="rounded-full border border-forest/20 bg-white px-3.5 py-1.5 text-[13px] font-semibold text-forest">{f}</span>)}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/services/academy" variant="dark">Discover the Academy</Button>
            <Button to="/book-play/trainer-sessions" variant="link" icon="arrow">Open sessions</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function ShopBand() {
  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      <Swoosh className="absolute -right-10 -top-20 size-[520px] text-lime/80" />
      <div className="container-x relative grid gap-10 py-20 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:py-24">
        <div>
          <Eyebrow light>Shop & equipment</Eyebrow>
          <h2 className="display text-6xl sm:text-7xl">Gear up for<br />your game</h2>
          <p className="mt-5 max-w-sm text-cream/70">Rackets you can test before you buy, shoes, clothing and our own Team Padel kit — available at our clubs.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button to="/shop">Visit our shop</Button>
            <Button to="/shop/racket-of-the-month" variant="ghostLight" icon="star">Racket of the Month</Button>
          </div>
        </div>
        <div className="relative grid grid-cols-3 items-end gap-3">
          <Link to="/shop/rackets" className="group rounded-3xl bg-cream/[.06] p-3 ring-1 ring-cream/10 transition hover:bg-cream/10"><ProductArt art="racket" color="#CEDB23" className="aspect-[3/4] w-full transition duration-500 group-hover:-rotate-6" /><p className="mt-1 text-center text-xs font-semibold text-cream/70">Rackets</p></Link>
          <Link to="/shop/shoes" className="group rounded-3xl bg-cream/[.06] p-3 ring-1 ring-cream/10 transition hover:bg-cream/10"><ProductArt art="shoe" color="#F6F1ED" className="aspect-square w-full transition duration-500 group-hover:scale-105" /><p className="mt-1 text-center text-xs font-semibold text-cream/70">Shoes</p></Link>
          <Link to="/shop/team-padel" className="group -mb-0 rounded-3xl bg-cream/[.06] p-3 ring-1 ring-cream/10 transition hover:bg-cream/10"><ProductArt art="shirt" color="#2A2A2A" logo className="aspect-[3/4] w-full transition duration-500 group-hover:scale-105" /><p className="mt-1 text-center text-xs font-semibold text-cream/70">Team Kit</p></Link>
        </div>
      </div>
    </section>
  )
}

function KnowledgeCommunity() {
  const featured = articles.slice(0, 3)
  return (
    <section className="container-x grid gap-5 py-20 md:py-28 lg:grid-cols-2">
      <div className="relative overflow-hidden rounded-[32px] bg-[#E3EBF0] p-8 sm:p-10">
        <Eyebrow>Padel knowledge</Eyebrow>
        <h2 className="display text-5xl text-forest sm:text-6xl">Learn. Improve.<br />Play better.</h2>
        <p className="mt-4 max-w-sm text-ink/65">Rules, racket guides and coaching tips, written by our coaches.</p>
        <ul className="mt-6 space-y-2">
          {featured.map((a) => (
            <li key={a.slug}>
              <Link to={`/padel-knowledge/${a.category}/${a.slug}`} className="group flex items-center justify-between gap-4 rounded-2xl bg-white/70 px-4 py-3 text-[14px] font-semibold text-forest transition hover:bg-white">
                {a.title} <Icon name="arrow" className="size-4 shrink-0 opacity-40 group-hover:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>
        <Button to="/padel-knowledge" className="mt-7">Explore knowledge</Button>
      </div>
      <div className="flex flex-col rounded-[32px] bg-white p-8 ring-1 ring-forest/10 sm:p-10">
        <Eyebrow>Our community</Eyebrow>
        <h2 className="display text-5xl text-forest sm:text-6xl">Be part of<br />Team Padel</h2>
        <p className="mt-4 max-w-sm text-ink/65">Tournament recaps, Thursday night regulars and the people who make our clubs feel like home.</p>
        <div className="mt-6 grid flex-1 grid-cols-3 grid-rows-2 gap-2">
          {communityPosts.slice(0, 4).map((p, i) => (
            <Link key={p.slug} to={`/community/${p.slug}`} className={`group relative overflow-hidden rounded-2xl ${i === 0 ? 'col-span-2 row-span-2' : ''}`}>
              <img src={p.image} alt={p.title} className="h-full min-h-[100px] w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
            </Link>
          ))}
        </div>
        <Button to="/community" variant="outlineLime" className="mt-7 self-start">View gallery</Button>
      </div>
    </section>
  )
}

function AboutStrip() {
  const stats = [['2', 'clubs open'], ['11', 'courts'], ['2,400+', 'active players'], ['#3', 'in planning']]
  return (
    <section className="border-y border-forest/10 bg-cream">
      <div className="container-x grid gap-10 py-16 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <div>
          <Eyebrow>Team Padel</Eyebrow>
          <p className="display text-5xl text-forest sm:text-[3.6rem]">We don't just run courts. We build clubs people don't want to leave.</p>
          <Button to="/team-padel/about-us" variant="link" className="mt-5">Our story</Button>
        </div>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-forest/10 sm:grid-cols-4">
          {stats.map(([n, l]) => (
            <div key={l} className="bg-cream p-6">
              <dt className="display text-6xl text-forest">{n}</dt>
              <dd className="mt-1 text-[13px] font-semibold text-ink/55">{l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function ContactStrip() {
  return (
    <section className="bg-lime">
      <div className="container-x flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
        <p className="display text-5xl text-forest">Questions? Just text us.</p>
        <div className="flex flex-wrap gap-3">
          <Button href="https://wa.me/4915100000100" variant="dark" icon="whatsapp">WhatsApp</Button>
          <Button href="https://instagram.com" variant="outline" icon="instagram" className="!border-forest/30">@teampadel</Button>
          <Button to="/team-padel/contact" variant="outline" icon="mail" className="!border-forest/30">Contact</Button>
        </div>
      </div>
    </section>
  )
}

