import { Link, useParams } from 'react-router-dom'
import Icon from '../components/Icon'
import { Button, Eyebrow, PageHero, SectionHead, Tag, Accordion, useTitle } from '../components/ui'
import { knowledgeCategories, articles, getArticle, getKnowledgeCategory, faqs } from '../data/knowledge'
import { NotFound } from './Misc'

export function KnowledgePage() {
  useTitle('Padel Knowledge', 'Rules, equipment guides, beginner tips and training drills written by Team Padel coaches.')
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Padel Knowledge' }]}
        eyebrow="Rules, guides & tactics"
        title={<>Padel<br /><span className="text-lime">Knowledge</span></>}
        intro="Everything from your first underhand serve to choosing a racket and mastering the bandeja — written by our coaches."
      >
        <Button to="/padel-knowledge/faq" variant="ghostLight">General FAQ</Button>
      </PageHero>

      <section className="container-x py-16 md:py-24">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {knowledgeCategories.map((c) => {
            const count = articles.filter((a) => a.category === c.slug).length
            return (
              <Link key={c.slug} to={`/padel-knowledge/${c.slug}`} className="group flex flex-col justify-between rounded-3xl bg-white p-6 ring-1 ring-forest/10 transition hover:-translate-y-1 hover:bg-forest hover:text-cream">
                <span className="grid size-12 place-items-center rounded-2xl bg-lime text-forest"><Icon name={c.icon} className="size-6" /></span>
                <div className="mt-6">
                  <h2 className="display text-4xl">{c.title}</h2>
                  <p className="mt-2 text-sm opacity-70">{c.blurb}</p>
                </div>
                <p className="mt-6 text-xs font-bold uppercase tracking-wider text-forest group-hover:text-lime">{count} articles →</p>
              </Link>
            )
          })}
        </div>

        <div className="mt-20">
          <SectionHead eyebrow="All articles" title="Read & improve" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => <ArticleCard key={a.slug} a={a} />)}
          </div>
        </div>
      </section>
    </>
  )
}

function ArticleCard({ a }) {
  const cat = getKnowledgeCategory(a.category)
  return (
    <Link to={`/padel-knowledge/${a.category}/${a.slug}`} className="group flex flex-col justify-between rounded-3xl bg-white p-6 ring-1 ring-forest/10 transition hover:-translate-y-1 hover:shadow-xl">
      <div>
        <div className="flex items-center justify-between gap-2">
          <Tag tone="sand">{cat?.title}</Tag>
          <span className="text-xs text-ink/45">{a.read} min read</span>
        </div>
        <h3 className="mt-4 text-lg font-bold text-forest group-hover:underline">{a.title}</h3>
        <p className="mt-2 text-sm text-ink/65">{a.excerpt}</p>
      </div>
      <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-forest">Read article <Icon name="arrow" className="size-3.5" /></span>
    </Link>
  )
}

export function KnowledgeCategory() {
  const { category } = useParams()
  const cat = getKnowledgeCategory(category)
  useTitle(cat?.title, cat?.blurb)
  if (!cat) return <NotFound />
  const list = articles.filter((a) => a.category === category)

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Padel Knowledge', to: '/padel-knowledge' }, { label: cat.title }]}
        eyebrow="Knowledge hub"
        title={cat.title}
        intro={cat.blurb}
      />
      <section className="container-x py-16 md:py-24">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((a) => <ArticleCard key={a.slug} a={a} />)}
        </div>
      </section>
    </>
  )
}

export function ArticlePage() {
  const { category, slug } = useParams()
  const a = getArticle(category, slug)
  const cat = getKnowledgeCategory(category)
  useTitle(a?.title, a?.excerpt)
  if (!a) return <NotFound />

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Padel Knowledge', to: '/padel-knowledge' }, { label: cat?.title || category, to: `/padel-knowledge/${category}` }, { label: a.title }]}
        eyebrow={`${cat?.title} · ${a.read} min read`}
        title={a.title}
        intro={a.excerpt}
        image={a.image}
      />
      <section className="container-x py-16 md:py-24">
        <div className="prose-tp max-w-3xl rounded-[28px] bg-white p-8 ring-1 ring-forest/10 sm:p-12">
          {a.body.map((b, i) => (
            <div key={i}>
              {b.h && <h2>{b.h}</h2>}
              {b.p && b.p.map((p, j) => <p key={j}>{p}</p>)}
              {b.list && <ul>{b.list.map((li, j) => <li key={j}>{li}</li>)}</ul>}
            </div>
          ))}
          {!!a.related?.length && (
            <div className="mt-10 flex flex-wrap gap-2 border-t border-forest/10 pt-6">
              {a.related.map((r) => <Button key={r.to} to={r.to} size="sm" variant="outlineLime">{r.label}</Button>)}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export function FaqPage() {
  useTitle('FAQ', 'Frequently asked questions about padel, court bookings on Playtomic and Team Padel.')
  const groups = [...new Set(faqs.map((f) => f.group))]
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Padel Knowledge', to: '/padel-knowledge' }, { label: 'FAQ' }]}
        eyebrow="Good to know"
        title={<>Frequently asked<br /><span className="text-lime">questions</span></>}
        intro="Answers on padel basics, Playtomic bookings, equipment and our clubs."
      />
      <section className="container-x max-w-4xl space-y-12 py-16 md:py-24">
        {groups.map((g) => (
          <div key={g} className="rounded-[28px] bg-white p-7 ring-1 ring-forest/10 sm:p-10">
            <Eyebrow>{g}</Eyebrow>
            <Accordion items={faqs.filter((f) => f.group === g)} />
          </div>
        ))}
      </section>
    </>
  )
}

