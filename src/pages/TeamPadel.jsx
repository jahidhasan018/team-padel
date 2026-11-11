import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { Button, Eyebrow, PageHero, SectionHead, Tag, ExpansionBand, useTitle } from '../components/ui'
import { Field, RadioCards, FileDrop, FormShell, ContactForm } from '../components/forms'
import { team, jobs } from '../data/community'
import { openLocations, formatAddress } from '../data/locations'

const subpages = [
  { to: '/team-padel/about-us', title: 'About Us', sub: 'Who we are, how we started and what drives us.' },
  { to: '/team-padel/expand-with-us', title: 'Develop a Location With Us', sub: 'For landowners, municipalities, halls and investors.' },
  { to: '/team-padel/partnerships', title: 'Partnerships & Sponsors', sub: 'Court branding, events and regional partners.' },
  { to: '/team-padel/suggest-a-location', title: 'Suggest a Location', sub: 'Know an empty hall or plot? Tell us about it.' },
  { to: '/team-padel/careers', title: 'Careers', sub: 'Join our coaching, front desk or expansion team.' },
  { to: '/team-padel/contact', title: 'Contact', sub: 'Direct lines to our clubs and team.' },
]

export function TeamPadelPage() {
  useTitle('Team Padel', 'About Team Padel, expansion, partnerships, careers and contact.')
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Team Padel' }]}
        eyebrow="The company behind the courts"
        title={<>Team<br /><span className="text-lime">Padel</span></>}
        intro="We develop and operate padel clubs in the Palatinate — built around quality courts, real coaching and a community that stays for the third set."
      />
      <section className="container-x grid gap-4 py-16 sm:grid-cols-2 lg:grid-cols-3 md:py-24">
        {subpages.map((p) => (
          <Link key={p.to} to={p.to} className="group flex flex-col justify-between rounded-3xl bg-white p-7 ring-1 ring-forest/10 transition hover:-translate-y-1 hover:bg-forest hover:text-cream">
            <div>
              <h2 className="display text-4xl">{p.title}</h2>
              <p className="mt-2 text-sm opacity-70">{p.sub}</p>
            </div>
            <span className="mt-8 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest group-hover:text-lime">Explore <Icon name="arrow" className="size-3.5" /></span>
          </Link>
        ))}
      </section>
      <ExpansionBand />
    </>
  )
}

export function AboutPage() {
  useTitle('About Us', 'Meet the people behind Team Padel in Bornheim and Bad Bergzabern.')
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Team Padel', to: '/team-padel' }, { label: 'About Us' }]}
        eyebrow="Our story"
        title={<>Built by players,<br /><span className="text-lime">for players</span></>}
        intro="We started in 2023 with one simple conviction: Germany deserves padel clubs that feel like Spanish clubs — welcoming, well-coached and alive every evening of the week."
        image="/images/community.jpg"
      />
      <section className="container-x py-16 md:py-24">
        <SectionHead eyebrow="Team" title="People behind the courts" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <div key={m.name} className="rounded-3xl bg-white p-6 ring-1 ring-forest/10">
              <span className="display grid size-14 place-items-center rounded-full bg-forest text-3xl text-lime">{m.name.split(' ').map((x) => x[0]).join('')}</span>
              <h3 className="mt-4 font-bold text-forest">{m.name}</h3>
              <p className="text-xs font-semibold text-ink/50">{m.role}</p>
              <p className="mt-3 text-sm text-ink/70">{m.note}</p>
            </div>
          ))}
        </div>
      </section>
      <ExpansionBand />
    </>
  )
}

export function ExpandPage() {
  useTitle('Develop a Padel Location With Us', 'Partner with Team Padel to develop indoor or outdoor padel courts on your land or hall.')
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Team Padel', to: '/team-padel' }, { label: 'Develop a Location' }]}
        eyebrow="Expansion & real estate"
        title={<>Develop a location<br /><span className="text-lime">with us</span></>}
        intro="We lease, buy or co-develop commercial halls, tennis facilities and outdoor plots from 1,200 m² upwards."
        image="/images/facility.jpg"
      />
      <section className="container-x max-w-3xl py-16 md:py-24">
        <SectionHead eyebrow="Property inquiry" title="Tell us about your site" />
        <FormShell submitLabel="Send site details">
          <RadioCards label="Site type" name="siteType" options={[
            { value: 'hall', label: 'Existing hall', icon: 'roof' },
            { value: 'land', label: 'Outdoor plot / land', icon: 'sun' },
            { value: 'club', label: 'Sports / tennis club', icon: 'trophy' },
          ]} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Your name" name="name" required />
            <Field label="Email" name="email" type="email" required />
            <Field label="City / municipality" name="city" required />
            <Field label="Approx. area (m²)" name="area" placeholder="e.g. 1,800 m²" />
          </div>
          <FileDrop label="Site plans or photos (optional)" />
          <Field label="Details" name="message" as="textarea" placeholder="Ceiling height, zoning, availability…" />
        </FormShell>
      </section>
    </>
  )
}

export function PartnershipsPage() {
  useTitle('Partnerships & Sponsors', 'Brand courts, sponsor tournaments and partner with Team Padel.')
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Team Padel', to: '/team-padel' }, { label: 'Partnerships' }]}
        eyebrow="Sponsors & partners"
        title={<>Grow with<br /><span className="text-lime">Team Padel</span></>}
        intro="From court naming rights to tournament sponsorships and corporate health memberships — connect your brand with an active regional community."
      />
      <section className="container-x max-w-3xl py-16 md:py-24">
        <SectionHead eyebrow="Get in touch" title="Partnership inquiry" />
        <ContactForm topic={['Court branding', 'Tournament sponsorship', 'Corporate fitness partner', 'Equipment / gastronomy partner']} />
      </section>
    </>
  )
}

export function SuggestLocationPage() {
  useTitle('Suggest a Location', 'Know an empty warehouse or sports site suitable for padel? Let us know.')
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Team Padel', to: '/team-padel' }, { label: 'Suggest a Location' }]}
        eyebrow="Scout with us"
        title={<>Suggest a<br /><span className="text-lime">location</span></>}
        intro="Tip leads that turn into a signed lease earn a lifetime golden court pass at the new club."
      />
      <section className="container-x max-w-3xl py-16 md:py-24">
        <FormShell submitLabel="Submit location tip">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Your name" name="name" required />
            <Field label="Your email" name="email" type="email" required />
            <Field label="Town / address of the site" name="siteAddress" required className="sm:col-span-2" />
          </div>
          <FileDrop label="Photos (optional)" />
          <Field label="Why would this spot work?" name="notes" as="textarea" />
        </FormShell>
      </section>
    </>
  )
}

export function CareersPage() {
  useTitle('Careers', 'Open positions for padel coaches, club hosts and facility managers at Team Padel.')
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Team Padel', to: '/team-padel' }, { label: 'Careers' }]}
        eyebrow="Work on court"
        title={<>Join the<br /><span className="text-lime">team</span></>}
        intro="We are always looking for coaches, front-desk hosts and people who care about hospitality."
      />
      <section className="container-x space-y-4 py-16 md:py-24">
        {jobs.map((j) => (
          <div key={j.title} className="flex flex-col justify-between gap-4 rounded-3xl bg-white p-6 ring-1 ring-forest/10 sm:flex-row sm:items-center">
            <div>
              <Tag>{j.tag}</Tag>
              <h2 className="mt-2 text-lg font-bold text-forest">{j.title}</h2>
              <p className="text-sm text-ink/60">{j.place}</p>
            </div>
            <Button to="/team-padel/contact" size="sm">Apply now</Button>
          </div>
        ))}
      </section>
    </>
  )
}

export function ContactPage() {
  useTitle('Contact', 'Contact Team Padel in Bornheim and Bad Bergzabern.')
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Team Padel', to: '/team-padel' }, { label: 'Contact' }]}
        eyebrow="Say hello"
        title={<>Get in<br /><span className="text-lime">touch</span></>}
        intro="Questions about bookings, events, lessons or partnerships? Write us or reach out directly to your club."
      />
      <section className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-[1.2fr_.8fr]">
        <div>
          <SectionHead eyebrow="Write to us" title="Send a message" />
          <ContactForm />
        </div>
        <aside className="space-y-4">
          {openLocations.map((l) => (
            <div key={l.slug} className="rounded-3xl bg-forest p-6 text-cream">
              <p className="text-xs font-bold uppercase tracking-widest text-lime">{l.short}</p>
              <p className="mt-2 text-sm text-cream/80">{formatAddress(l.address)}</p>
              <p className="mt-2 text-sm"><a href={`tel:${l.phone}`} className="hover:text-lime">{l.phone}</a></p>
              <p className="text-sm"><a href={`mailto:${l.email}`} className="hover:text-lime">{l.email}</a></p>
            </div>
          ))}
        </aside>
      </section>
    </>
  )
}

