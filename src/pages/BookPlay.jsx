import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { Button, Eyebrow, PageHero, SectionHead, Tag, Accordion, useTitle } from '../components/ui'
import { AvailabilityBoard, EventsFeed, SessionsList } from '../components/playtomic'
import { TrainerCard } from './Locations'
import { openLocations } from '../data/locations'
import { trainers, eur } from '../data/playtomic'

const bookItems = [
  { to: '/book-play/court-booking', icon: 'calendar', title: 'Court Booking', sub: 'Live free courts across all clubs, updated every minute.' },
  { to: '/book-play/events', icon: 'trophy', title: 'Events & Tournaments', sub: 'Americanos, Mexicanos, socials and tournaments.' },
  { to: '/book-play/trainer-sessions', icon: 'whistle', title: 'Trainer Sessions', sub: 'Book 1:1, duo, group or kids coaching sessions.' },
  { to: '/book-play/racket-rental', icon: 'racket', title: 'Racket Rental', sub: 'Rental rackets, balls and our free test centre.' },
  { to: '/book-play/gift-vouchers', icon: 'gift', title: 'Gift Vouchers', sub: 'Give court time, lessons or shop credit.' },
]

export function BookPlay() {
  useTitle('Book & Play', 'Book padel courts, Americano events, trainer sessions, racket rental and gift vouchers at Team Padel.')
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Book & Play' }]}
        eyebrow="Live via Playtomic"
        title={<>Book &<br /><span className="text-lime">Play</span></>}
        intro="Check live availability here on the site — booking and split payment happen in seconds on Playtomic."
        image="/images/court-indoor.jpg"
      />

      <section className="container-x py-16 md:py-24">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {bookItems.map((it) => (
            <Link key={it.to} to={it.to} className="group flex flex-col justify-between rounded-3xl bg-white p-6 ring-1 ring-forest/10 transition hover:-translate-y-1 hover:bg-forest hover:text-cream">
              <span className="grid size-12 place-items-center rounded-2xl bg-lime text-forest"><Icon name={it.icon} className="size-6" /></span>
              <div className="mt-8">
                <h2 className="display text-4xl">{it.title}</h2>
                <p className="mt-2 text-[13.5px] opacity-70">{it.sub}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest group-hover:text-lime">Open <Icon name="arrow" className="size-3.5" /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-forest/10 bg-white py-16 md:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Courts" title="Free courts today" action={<Button to="/book-play/court-booking" variant="outline">Full court view</Button>} />
          <AvailabilityBoard compact limit={7} />
        </div>
      </section>

      <section className="bg-forest py-16 text-cream md:py-24">
        <div className="container-x">
          <SectionHead light eyebrow="Events" title="Next up on court" action={<Button to="/book-play/events" variant="ghostLight">All events</Button>} />
          <EventsFeed dark limit={3} showFilters={false} />
        </div>
      </section>
    </>
  )
}

export function CourtBooking() {
  useTitle('Court Booking', 'Live padel court availability in Bornheim and Bad Bergzabern. Book directly on Playtomic.')
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Book & Play', to: '/book-play' }, { label: 'Court Booking' }]}
        eyebrow="Live court availability"
        title={<>Book a<br /><span className="text-lime">court</span></>}
        intro="Pick a club, day and time slot below, or jump straight to your club on Playtomic."
      >
        <div className="flex flex-wrap gap-3">
          {openLocations.map((l) => (
            <Button key={l.slug} href={l.playtomicUrl} icon="arrowUpRight">Book {l.short}</Button>
          ))}
        </div>
      </PageHero>

      <section className="container-x py-16 md:py-24">
        <AvailabilityBoard />
      </section>
    </>
  )
}

export function EventsPage() {
  useTitle('Events & Tournaments', 'Upcoming Americano, Mexicano, social mix and padel tournaments at Team Padel.')
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Book & Play', to: '/book-play' }, { label: 'Events & Tournaments' }]}
        eyebrow="Play with the community"
        title={<>Events &<br /><span className="text-lime">Tournaments</span></>}
        intro="Americanos, Mexicanos, beginner socials and open tournaments. Filter by location or format and register on Playtomic."
      >
        <Button to="/services/tournaments" variant="ghostLight">How our formats work</Button>
      </PageHero>

      <section className="container-x py-16 md:py-24">
        <EventsFeed />
      </section>
    </>
  )
}

export function TrainerSessions() {
  useTitle('Trainer Sessions', 'Book private, duo, group or kids padel coaching sessions at Team Padel.')
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Book & Play', to: '/book-play' }, { label: 'Trainer Sessions' }]}
        eyebrow="Coaching"
        title={<>Trainer<br /><span className="text-lime">Sessions</span></>}
        intro="Book open coaching slots directly or get to know our Academy concept and coaches."
      >
        <Button to="/services/academy" variant="ghostLight">About the Academy</Button>
      </PageHero>

      <section className="container-x py-16 md:py-24">
        <SessionsList />
        <div className="mt-20">
          <SectionHead eyebrow="Our coaches" title="Who you train with" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trainers.map((t) => <TrainerCard key={t.id} t={t} />)}
          </div>
        </div>
      </section>
    </>
  )
}

export function RacketRental() {
  useTitle('Racket Rental', 'Rent padel rackets and balls or test premium rackets at Team Padel.')
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Book & Play', to: '/book-play' }, { label: 'Racket Rental' }]}
        eyebrow="Travel light"
        title={<>Racket<br /><span className="text-lime">Rental</span></>}
        intro="No own racket yet? Grab a rental racket at reception or test a current top model from our shop."
        image="/images/racket-ball.jpg"
      />

      <section className="container-x grid gap-6 py-16 md:py-24 lg:grid-cols-3">
        {[
          { tag: 'Standard rental', title: 'Club Rental Racket', price: eur(4), note: 'per booking', text: 'Forgiving round-shape rackets ideal for beginners and casual games. Pick up at reception.' },
          { tag: 'Try before you buy', title: 'Test Centre Racket', price: 'Free', note: 'with ID deposit', text: 'Test current rackets from Bullpadel, Nox, Head and Adidas during your court booking.' },
          { tag: 'Fresh bounce', title: 'Ball Tube (3 balls)', price: eur(7), note: 'yours to keep', text: 'New pressurised tournament balls available at reception and from the court-side vending machine.' },
        ].map((c) => (
          <div key={c.title} className="flex flex-col rounded-[28px] bg-white p-7 ring-1 ring-forest/10">
            <Tag className="self-start">{c.tag}</Tag>
            <h2 className="display mt-4 text-5xl text-forest">{c.title}</h2>
            <p className="mt-2"><span className="display text-4xl text-forest">{c.price}</span> <span className="text-xs text-ink/50">{c.note}</span></p>
            <p className="mt-4 text-[14.5px] leading-relaxed text-ink/70">{c.text}</p>
          </div>
        ))}
      </section>
    </>
  )
}

export function GiftVouchers() {
  useTitle('Gift Vouchers', 'Give court time, coaching or padel gear with a Team Padel gift voucher.')
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Book & Play', to: '/book-play' }, { label: 'Gift Vouchers' }]}
        eyebrow="Give padel"
        title={<>Gift<br /><span className="text-lime">Vouchers</span></>}
        intro="Valid for court bookings, trainer lessons and everything in our pro shops across all locations."
      />

      <section className="container-x grid gap-10 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
        <div className="court-lines relative overflow-hidden rounded-[32px] bg-forest p-8 text-cream sm:p-12">
          <Eyebrow light>Team Padel Voucher</Eyebrow>
          <p className="display text-7xl text-lime">€25 / €50 / €100</p>
          <p className="mt-4 max-w-sm text-cream/75">Printed on heavy cotton card in a lime envelope — ready to hand over at reception in Bornheim or Bad Bergzabern.</p>
        </div>
        <div>
          <h2 className="display text-5xl text-forest">How to get a voucher</h2>
          <p className="mt-4 text-ink/70">Pick one up directly at reception during opening hours, or drop us a message and we’ll prepare it for pickup or postal delivery.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button to="/team-padel/contact">Order via contact form</Button>
            <Button to="/locations" variant="outline">Club opening hours</Button>
          </div>
        </div>
      </section>
    </>
  )
}

