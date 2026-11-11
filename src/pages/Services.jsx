import { Link, useParams } from 'react-router-dom'
import Icon from '../components/Icon'
import { Button, Eyebrow, PageHero, SectionHead, Tag, Accordion, useTitle } from '../components/ui'
import { SessionsList } from '../components/playtomic'
import { ContactForm } from '../components/forms'
import { TrainerCard } from './Locations'
import { services, getService } from '../data/services'
import { getLocation } from '../data/locations'
import { trainers } from '../data/playtomic'
import { NotFound } from './Misc'

export function ServicesPage() {
  useTitle('Our Services', 'Academy, corporate events, tournament formats, beginner programmes and kids padel at Team Padel.')
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Services' }]}
        eyebrow="Beyond court rental"
        title={<>More than<br /><span className="text-lime">just a game</span></>}
        intro="Whether you are stepping onto a court for the first time, signing up your child or planning a 60-person company tournament — here is how we help."
      />

      <section className="container-x space-y-6 py-16 md:py-24">
        {services.map((s, i) => (
          <article key={s.slug} className="grid overflow-hidden rounded-[28px] bg-white ring-1 ring-forest/10 lg:grid-cols-2">
            <Link to={`/services/${s.slug}`} className={`relative block min-h-[260px] overflow-hidden ${i % 2 ? 'lg:order-2' : ''}`}>
              <img src={s.image} alt={s.title} className="h-full w-full object-cover transition duration-700 hover:scale-105" />
            </Link>
            <div className="flex flex-col justify-center p-7 sm:p-10">
              <Eyebrow>{s.eyebrow}</Eyebrow>
              <h2 className="display text-5xl text-forest sm:text-6xl">{s.title}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{s.intro}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {s.locations.map((slug) => <Tag key={slug} tone="sand">{getLocation(slug)?.short}</Tag>)}
              </div>
              <div className="mt-7">
                <Button to={`/services/${s.slug}`} variant="dark">Explore {s.title}</Button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}

export function ServiceDetail() {
  const { slug } = useParams()
  const s = getService(slug)
  useTitle(s?.title, s?.meta)
  if (!s) return <NotFound />

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Services', to: '/services' }, { label: s.title }]}
        eyebrow={s.eyebrow}
        title={s.title}
        intro={s.intro}
        image={s.image}
      >
        <div className="flex flex-wrap gap-2">
          {s.locations.map((loc) => (
            <Link key={loc} to={`/locations/${loc}`} className="rounded-full bg-cream/10 px-3.5 py-1.5 text-xs font-semibold text-cream hover:bg-lime hover:text-forest">
              Available in {getLocation(loc)?.short}
            </Link>
          ))}
        </div>
      </PageHero>

      {s.formats && (
        <section className="container-x py-16 md:py-24">
          <SectionHead eyebrow="Training formats" title="Choose how you train" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {s.formats.map((f) => (
              <div key={f.name} className="flex flex-col rounded-3xl bg-white p-6 ring-1 ring-forest/10">
                <Tag className="self-start">{f.size}</Tag>
                <h3 className="display mt-4 text-4xl text-forest">{f.name}</h3>
                <p className="text-xs font-semibold text-ink/45">{f.who}</p>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink/70">{f.text}</p>
                <p className="mt-auto pt-5 font-bold text-forest">{f.price}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {s.concept && (
        <section className="bg-sand/60 py-16">
          <div className="container-x grid gap-6 md:grid-cols-3">
            {s.concept.map((c, i) => (
              <div key={c.t} className="rounded-3xl bg-white p-7 ring-1 ring-forest/10">
                <span className="display text-5xl text-lime drop-shadow-[0_2px_0_#27382C]">0{i + 1}</span>
                <h3 className="display mt-2 text-4xl text-forest">{c.t}</h3>
                <p className="mt-2 text-sm text-ink/70">{c.d}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {s.features && (
        <section className="container-x py-16 md:py-24">
          <SectionHead eyebrow="Occasions" title="What we host" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {s.features.map((f) => (
              <div key={f.t} className="rounded-3xl bg-white p-6 ring-1 ring-forest/10">
                <h3 className="font-bold text-forest">{f.t}</h3>
                <p className="mt-1.5 text-[13.5px] text-ink/65">{f.d}</p>
              </div>
            ))}
          </div>
          {s.packages && (
            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {s.packages.map((p) => (
                <div key={p.name} className={`rounded-[28px] p-7 ${p.featured ? 'bg-forest text-cream' : 'bg-white ring-1 ring-forest/10'}`}>
                  <h3 className="display text-5xl">{p.name}</h3>
                  <p className={`mt-1 text-lg font-bold ${p.featured ? 'text-lime' : 'text-forest'}`}>{p.price}</p>
                  <ul className="mt-5 space-y-2 text-sm">
                    {p.items.map((it) => <li key={it} className="flex items-center gap-2"><Icon name="check" className="size-4 text-lime" /> {it}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {s.formatsExplained && (
        <section className="container-x py-16 md:py-24">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {s.formatsExplained.map((f) => (
              <div key={f.name} className="rounded-3xl bg-white p-7 ring-1 ring-forest/10">
                <div className="flex gap-2">
                  <Tag>{f.players} players</Tag>
                  <Tag tone="sand">{f.time}</Tag>
                </div>
                <h3 className="display mt-4 text-5xl text-forest">{f.name}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink/70">{f.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Button to="/book-play/events" size="lg">See upcoming event dates</Button>
          </div>
        </section>
      )}

      {s.steps && (
        <section className="container-x py-16 md:py-24">
          <SectionHead eyebrow="Step by step" title="Your first game" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {s.steps.map((st, i) => (
              <div key={st.t} className="rounded-3xl bg-white p-6 ring-1 ring-forest/10">
                <span className="display text-4xl text-forest">0{i + 1}</span>
                <h3 className="mt-2 font-bold text-forest">{st.t}</h3>
                <p className="mt-2 text-sm text-ink/65">{st.d}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {s.benefits && (
        <section className="container-x py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow>Why kids love it</Eyebrow>
              <h2 className="display text-5xl text-forest">Built for young players</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {s.benefits.map((b) => (
                  <div key={b.t} className="rounded-3xl bg-white p-5 ring-1 ring-forest/10">
                    <h3 className="font-bold text-forest">{b.t}</h3>
                    <p className="mt-1.5 text-sm text-ink/65">{b.d}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Eyebrow>Parent FAQ</Eyebrow>
              <h2 className="display mb-6 text-5xl text-forest">Good to know</h2>
              <Accordion items={s.parentInfo} />
            </div>
          </div>
        </section>
      )}

      {s.showTrainers && (
        <section className="container-x pb-16">
          <SectionHead eyebrow="Coaches" title="Meet the team" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trainers.map((t) => <TrainerCard key={t.id} t={t} />)}
          </div>
        </section>
      )}

      {s.showSessions && (
        <section className="border-t border-forest/10 bg-white py-16">
          <div className="container-x">
            <SectionHead eyebrow="Book now" title="Open training sessions" />
            <SessionsList limit={6} />
          </div>
        </section>
      )}

      {s.inquiry && (
        <section className="bg-sand/60 py-16 md:py-24">
          <div className="container-x max-w-3xl">
            <SectionHead eyebrow="Plan your event" title="Request a proposal" intro="Tell us your group size, preferred date and location — we’ll put together a tailored package." />
            <ContactForm topic={['Corporate event', 'Team building', 'Birthday / private group', 'School / youth group']} />
          </div>
        </section>
      )}
    </>
  )
}

