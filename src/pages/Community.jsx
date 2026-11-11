import { Link, useParams } from 'react-router-dom'
import { Button, PageHero, Tag, useTitle } from '../components/ui'
import { communityPosts } from '../data/community'
import { getLocation } from '../data/locations'
import { NotFound } from './Misc'

export function CommunityPage() {
  useTitle('Community', 'Tournament recaps, club stories and players from Team Padel Bornheim and Bad Bergzabern.')
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Community' }]}
        eyebrow="Life at the clubs"
        title={<>Our<br /><span className="text-lime">Community</span></>}
        intro="Tournament recaps, Thursday night regulars and the people who make our clubs feel like a second living room."
      />

      <section className="container-x py-16 md:py-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {communityPosts.map((p) => (
            <Link key={p.slug} to={`/community/${p.slug}`} className="group flex flex-col overflow-hidden rounded-[28px] bg-white ring-1 ring-forest/10 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={p.image} alt={p.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <Tag className="absolute left-3 top-3">{p.type}</Tag>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-semibold text-ink/45">{p.date} · {getLocation(p.location)?.short}</p>
                <h2 className="mt-2 text-lg font-bold text-forest">{p.title}</h2>
                <p className="mt-2 text-sm text-ink/65">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

export function CommunityPost() {
  const { slug } = useParams()
  const p = communityPosts.find((x) => x.slug === slug)
  useTitle(p?.title, p?.excerpt)
  if (!p) return <NotFound />

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Community', to: '/community' }, { label: p.title }]}
        eyebrow={`${p.type} · ${p.date}`}
        title={p.title}
        intro={p.excerpt}
        image={p.image}
      />
      <section className="container-x py-16 md:py-24">
        <div className="prose-tp max-w-3xl rounded-[28px] bg-white p-8 ring-1 ring-forest/10 sm:p-12">
          {p.body.map((para, i) => <p key={i}>{para}</p>)}
          <div className="mt-8 pt-4">
            <Button to="/community" variant="outline">← Back to Community</Button>
          </div>
        </div>
      </section>
    </>
  )
}

