import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Icon from '../components/Icon'
import { Button, Chip, Eyebrow, PageHero, SectionHead, Tag, useTitle } from '../components/ui'
import { ProductArt, ProductCard } from '../components/products'
import { productCategories, products, brands, racketOfTheMonth, getCategory, getProduct, AVAILABILITY_NOTICE } from '../data/shop'
import { getLocation } from '../data/locations'
import { eur } from '../data/playtomic'
import { NotFound } from './Misc'

export function ShopPage() {
  useTitle('Shop & Equipment', 'Padel rackets, shoes, clothing, bags and Team Padel merchandise available at our clubs.')
  const [loc, setLoc] = useState('all')
  const [brand, setBrand] = useState('All')
  const filtered = products.filter((p) => (loc === 'all' || p.locations.includes(loc)) && (brand === 'All' || p.brand === brand))

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Shop' }]}
        eyebrow="Pro shop catalogue"
        title={<>Gear up<br /><span className="text-lime">on site</span></>}
        intro={AVAILABILITY_NOTICE}
      >
        <Button to="/shop/racket-of-the-month" icon="star">Racket of the Month</Button>
      </PageHero>

      <section className="container-x py-16">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
          {productCategories.map((c) => (
            <Link key={c.slug} to={c.slug === 'racket-of-the-month' ? '/shop/racket-of-the-month' : `/shop/${c.slug}`}
              className={`group flex flex-col justify-between rounded-3xl p-4 ring-1 ring-forest/10 transition hover:-translate-y-1 ${c.special ? 'bg-lime text-forest' : 'bg-white text-forest'}`}>
              <ProductArt art={c.art} color={c.special ? '#27382C' : '#CEDB23'} className="mx-auto size-24" />
              <div className="mt-2">
                <p className="font-bold leading-tight">{c.short}</p>
                <p className="mt-0.5 text-[11.5px] opacity-65">{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {[['all', 'All clubs'], ['bornheim', 'Bornheim'], ['bad-bergzabern', 'Bad Bergzabern']].map(([v, l]) => (
              <Chip key={v} active={loc === v} onClick={() => setLoc(v)}>{l}</Chip>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['All', ...brands].map((b) => (
              <button key={b} onClick={() => setBrand(b)} className={`rounded-full px-3 py-1 text-xs font-semibold ${brand === b ? 'bg-forest text-cream' : 'bg-white text-forest'}`}>{b}</button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>
    </>
  )
}

export function ShopCategory() {
  const { category } = useParams()
  const cat = getCategory(category)
  useTitle(cat?.title, cat?.blurb)
  if (!cat) return <NotFound />
  const list = products.filter((p) => p.category === category)

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Shop', to: '/shop' }, { label: cat.title }]}
        eyebrow="In-club catalogue"
        title={cat.title}
        intro={`${cat.blurb} ${AVAILABILITY_NOTICE}`}
      />
      <section className="container-x py-16 md:py-24">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {list.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>
    </>
  )
}

export function RacketOfTheMonth() {
  const p = getProduct(racketOfTheMonth.productId)
  useTitle(`Racket of the Month – ${p.brand} ${p.name}`)
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Shop', to: '/shop' }, { label: 'Racket of the Month' }]}
        eyebrow={`Racket of the Month · ${racketOfTheMonth.month}`}
        title={<>{p.brand}<br /><span className="text-lime">{p.name}</span></>}
        intro={racketOfTheMonth.text}
      >
        <div className="flex flex-wrap gap-3">
          <Button to={`/shop/${p.category}/${p.id}`}>View specs ({eur(p.price)})</Button>
          <Button to="/book-play/court-booking" variant="ghostLight">Book a court & test it</Button>
        </div>
      </PageHero>
      <section className="container-x grid gap-10 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
        <div className="grid aspect-square place-items-center rounded-[32px] bg-[#E7E9DA] p-10">
          <ProductArt art={p.art} color={p.color} className="h-full w-full" />
        </div>
        <div>
          <Tag>{p.shape} shape</Tag>
          <h2 className="display mt-4 text-6xl text-forest">{racketOfTheMonth.headline}</h2>
          <p className="mt-4 text-ink/70">{racketOfTheMonth.testInfo}</p>
          <p className="mt-4 text-xs text-ink/50">{AVAILABILITY_NOTICE}</p>
        </div>
      </section>
    </>
  )
}

export function ProductDetail() {
  const { id } = useParams()
  const p = getProduct(id)
  useTitle(p && `${p.brand} ${p.name}`, p?.desc)
  if (!p) return <NotFound />
  const cat = getCategory(p.category)

  return (
    <section className="container-x pt-32 pb-20 md:pt-40">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="grid aspect-square place-items-center rounded-[32px] bg-sand p-10">
          <ProductArt art={p.art} color={p.color} logo={p.logo} className="h-[80%] w-[80%]" />
        </div>
        <div className="flex flex-col justify-center">
          <Link to={`/shop/${p.category}`} className="text-xs font-bold uppercase tracking-widest text-forest/60 hover:text-forest">← {cat?.title}</Link>
          <p className="mt-4 text-xs font-bold uppercase tracking-[.2em] text-ink/45">{p.brand}</p>
          <h1 className="display mt-1 text-6xl text-forest">{p.name}</h1>
          <p className="display mt-3 text-5xl text-forest">{eur(p.price)}</p>
          <p className="mt-5 text-[15.5px] leading-relaxed text-ink/75">{p.desc}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {p.locations.map((slug) => (
              <Link key={slug} to={`/locations/${slug}`} className="inline-flex items-center gap-1.5 rounded-full bg-forest px-3.5 py-1.5 text-xs font-semibold text-cream">
                <Icon name="check" className="size-3.5 text-lime" /> In stock in {getLocation(slug)?.short}
              </Link>
            ))}
          </div>

          <p className="mt-6 rounded-2xl bg-sand/70 p-4 text-xs text-ink/70">{AVAILABILITY_NOTICE}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button to="/team-padel/contact">Ask about availability</Button>
            <Button to="/shop" variant="outline">Back to catalogue</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

