import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import { Chip, Tag, Button } from './ui'
import { openLocations, getLocation } from '../data/locations'
import { fetchAvailability, fetchEvents, fetchSessions, getDays, fmtTime, fmtDay, fmtDate, isToday, eur } from '../data/playtomic'

/* ------------ data hook with loading / error / retry ------------ */
export function usePlaytomic(fetcher, deps) {
  const [state, setState] = useState({ loading: true, error: null, data: [] })
  const [n, setN] = useState(0)
  useEffect(() => {
    let alive = true
    setState((s) => ({ ...s, loading: true, error: null }))
    fetcher().then((data) => alive && setState({ loading: false, error: null, data }))
      .catch((e) => alive && setState({ loading: false, error: e.message, data: [] }))
    return () => { alive = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, n])
  return { ...state, retry: useCallback(() => setN((x) => x + 1), []) }
}

/* ------------ shared bits ------------ */
export function LocationChips({ value, onChange, dark }) {
  return (
    <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
      <Chip active={value === 'all'} onClick={() => onChange('all')} className={dark && value !== 'all' ? '!bg-cream/5 !text-cream !border-cream/15' : dark ? '!bg-lime !text-forest !border-lime' : ''}>All locations</Chip>
      {openLocations.map((l) => (
        <Chip key={l.slug} active={value === l.slug} onClick={() => onChange(l.slug)} className={dark && value !== l.slug ? '!bg-cream/5 !text-cream !border-cream/15' : dark ? '!bg-lime !text-forest !border-lime' : ''}>{l.short}</Chip>
      ))}
    </div>
  )
}

export function ApiError({ message, onRetry, dark }) {
  return (
    <div className={`flex flex-col items-center rounded-3xl border-2 border-dashed px-6 py-12 text-center ${dark ? 'border-cream/15 text-cream' : 'border-forest/15'}`}>
      <span className="grid size-12 place-items-center rounded-full bg-lime/20 text-forest"><Icon name="alert" className={`size-6 ${dark ? 'text-lime' : ''}`} /></span>
      <p className={`mt-4 font-bold ${dark ? 'text-cream' : 'text-forest'}`}>Live data is taking a break</p>
      <p className={`mt-1 max-w-sm text-sm ${dark ? 'text-cream/60' : 'text-ink/60'}`}>{message} You can still book directly on Playtomic.</p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        <Button onClick={onRetry} size="sm" variant={dark ? 'ghostLight' : 'outline'} icon="refresh">Try again</Button>
        {openLocations.map((l) => <Button key={l.slug} href={l.playtomicUrl} size="sm" icon="arrowUpRight">{l.short}</Button>)}
      </div>
    </div>
  )
}

function Skeleton({ className }) { return <div className={`animate-pulse rounded-2xl bg-forest/[.07] ${className}`} /> }

export function EmptyState({ title, text }) {
  return (
    <div className="rounded-3xl bg-sand/60 px-6 py-12 text-center">
      <img src="/logo-mark.png" alt="" className="mx-auto size-10 opacity-50 grayscale" />
      <p className="mt-3 font-bold text-forest">{title}</p>
      <p className="mt-1 text-sm text-ink/60">{text}</p>
    </div>
  )
}

const LiveBadge = ({ dark }) => (
  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wider ${dark ? 'bg-cream/10 text-lime' : 'bg-forest text-lime'}`}>
    <span className="size-1.5 rounded-full bg-lime animate-pulse-dot" /> Live from Playtomic
  </span>
)

/* ------------ Court availability board ------------ */
const periods = [
  { id: 'all', label: 'Any time' },
  { id: 'morning', label: 'Morning', test: (h) => h < 12 },
  { id: 'afternoon', label: 'Afternoon', test: (h) => h >= 12 && h < 17 },
  { id: 'evening', label: 'Evening', test: (h) => h >= 17 },
]

export function AvailabilityBoard({ fixedLocation, compact = false, limit }) {
  const [loc, setLoc] = useState(fixedLocation || 'all')
  const days = useMemo(() => getDays(compact ? 5 : 10), [compact])
  const [day, setDay] = useState(0)
  const [period, setPeriod] = useState('all')
  const [selected, setSelected] = useState(null)
  const { data, loading, error, retry } = usePlaytomic(() => fetchAvailability({ location: loc, date: days[day] }), [loc, day])

  const slots = useMemo(() => {
    const p = periods.find((x) => x.id === period)
    return data.filter((s) => !p.test || p.test(new Date(s.start).getHours()))
  }, [data, period])

  const grouped = useMemo(() => {
    const g = {}
    slots.forEach((s) => { (g[s.locationSlug] ||= []).push(s) })
    return Object.entries(g)
  }, [slots])

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {!fixedLocation ? <LocationChips value={loc} onChange={(v) => { setLoc(v); setSelected(null) }} /> : <LiveBadge />}
        <div className="no-scrollbar -mx-5 flex gap-1.5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          {periods.map((p) => (
            <button key={p.id} onClick={() => setPeriod(p.id)} className={`shrink-0 rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition ${period === p.id ? 'bg-lime text-forest' : 'text-ink/60 hover:text-forest'}`}>{p.label}</button>
          ))}
        </div>
      </div>

      {/* Day strip */}
      <div className="no-scrollbar -mx-5 mb-6 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        {days.map((d, i) => (
          <button key={i} onClick={() => { setDay(i); setSelected(null) }}
            className={`flex w-[68px] shrink-0 flex-col items-center rounded-2xl border py-2.5 transition ${day === i ? 'border-forest bg-forest text-cream' : 'border-forest/10 bg-white hover:border-forest/30'}`}>
            <span className={`text-[10.5px] font-bold uppercase tracking-wider ${day === i ? 'text-lime' : 'text-ink/45'}`}>{isToday(d) ? 'Today' : fmtDay(d)}</span>
            <span className="display mt-0.5 text-[2rem]">{d.getDate()}</span>
            <span className={`text-[10.5px] ${day === i ? 'text-cream/60' : 'text-ink/45'}`}>{fmtDate(d, { month: 'short' })}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-8">{Array.from({ length: 16 }).map((_, i) => <Skeleton key={i} className="h-[74px]" />)}</div>
      ) : error ? (
        <ApiError message={error} onRetry={retry} />
      ) : !slots.length ? (
        <EmptyState title="Fully booked" text="No free courts for this selection. Try another day or time — or join the waiting list on Playtomic." />
      ) : (
        <div className="space-y-8">
          {grouped.map(([slug, list]) => {
            const l = getLocation(slug)
            const shown = limit ? list.slice(0, limit) : list
            return (
              <div key={slug}>
                {!fixedLocation && (
                  <div className="mb-3 flex items-center justify-between">
                    <p className="flex items-center gap-2 text-sm font-bold text-forest"><Icon name="pin" className="size-4" /> {l.short} <span className="font-medium text-ink/45">· {list.length} start times</span></p>
                    <a href={l.playtomicUrl} target="_blank" rel="noreferrer" className="text-xs font-semibold text-forest underline decoration-lime decoration-2 underline-offset-4">All on Playtomic</a>
                  </div>
                )}
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-8">
                  {shown.map((s) => {
                    const active = selected?.id === s.id
                    return (
                      <button key={s.id} onClick={() => setSelected(active ? null : s)}
                        className={`group relative rounded-2xl border px-3 py-3 text-left transition ${active ? 'border-forest bg-forest text-cream shadow-lg' : 'border-forest/10 bg-white hover:-translate-y-0.5 hover:border-lime hover:shadow-md'}`}>
                        <span className="block text-[15px] font-bold tabular-nums">{fmtTime(s.start)}</span>
                        <span className={`mt-0.5 flex items-center justify-between text-[11.5px] ${active ? 'text-cream/70' : 'text-ink/55'}`}>
                          <span>{s.courts.length} court{s.courts.length > 1 ? 's' : ''}</span>
                          <span className={`font-semibold ${active ? 'text-lime' : 'text-forest'}`}>{eur(s.price)}</span>
                        </span>
                        {s.peak && <span className="absolute right-2 top-2 size-1.5 rounded-full bg-lime" title="Peak time" />}
                      </button>
                    )
                  })}
                  {limit && list.length > limit && (
                    <Link to="/book-play/court-booking" className="grid place-items-center rounded-2xl border border-dashed border-forest/20 text-[12.5px] font-semibold text-forest hover:border-forest">+{list.length - limit} more</Link>
                  )}
                </div>
                {selected && selected.locationSlug === slug && <SlotDetail slot={selected} loc={l} />}
              </div>
            )
          })}
        </div>
      )}
      {!loading && !error && (
        <p className="mt-6 flex items-center gap-2 text-xs text-ink/45"><span className="size-1.5 rounded-full bg-lime" /> Peak time · Prices per court for 60 min · Updated every minute · Booking & payment on Playtomic</p>
      )}
    </div>
  )
}

function SlotDetail({ slot, loc }) {
  return (
    <div className="mt-3 grid gap-4 rounded-3xl bg-forest p-5 text-cream sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[.2em] text-lime">{loc.short} · {fmtDate(slot.start, { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        <p className="display mt-1 text-4xl">{fmtTime(slot.start)} — {slot.durations.map((d) => `${d} min`).join(' / ')}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {slot.courts.map((c) => <span key={c} className="rounded-full bg-cream/10 px-3 py-1 text-xs">{c}</span>)}
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 sm:items-end">
        <p className="text-sm text-cream/70">from <span className="display text-4xl text-lime">{eur(slot.price)}</span> / court</p>
        <Button href={slot.url} icon="arrowUpRight">Book on Playtomic</Button>
      </div>
    </div>
  )
}

/* ------------ Events ------------ */
export function EventCard({ ev, dark }) {
  const l = getLocation(ev.locationSlug)
  const d = new Date(ev.start)
  const low = ev.spotsLeft <= 3
  return (
    <article className={`group relative flex overflow-hidden rounded-3xl transition hover:-translate-y-1 ${dark ? 'bg-cream/[.06] text-cream ring-1 ring-cream/10 hover:ring-lime/50' : 'bg-white ring-1 ring-forest/10 hover:shadow-xl hover:shadow-forest/10'}`}>
      {/* ticket stub */}
      <div className={`relative flex w-[84px] shrink-0 flex-col items-center justify-center border-r-2 border-dashed ${dark ? 'border-cream/15 bg-lime text-forest' : 'border-forest/10 bg-forest text-cream'}`}>
        <span className={`text-[10px] font-bold uppercase tracking-widest ${dark ? 'text-forest/70' : 'text-lime'}`}>{fmtDay(d)}</span>
        <span className="display text-[3.2rem] leading-none">{d.getDate()}</span>
        <span className="text-[11px] font-semibold uppercase">{fmtDate(d, { month: 'short' })}</span>
        <span className={`absolute -right-[9px] -top-[9px] size-4 rounded-full ${dark ? 'bg-forest' : 'bg-cream'}`} />
        <span className={`absolute -bottom-[9px] -right-[9px] size-4 rounded-full ${dark ? 'bg-forest' : 'bg-cream'}`} />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-1.5">
          <Tag tone={dark ? 'light' : 'lime'}>{ev.type}</Tag>
          <span className={`text-[11.5px] font-medium ${dark ? 'text-cream/55' : 'text-ink/50'}`}>Level {ev.level}</span>
        </div>
        <h3 className="mt-2 text-[16px] font-bold leading-snug">{ev.title}</h3>
        <p className={`mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] ${dark ? 'text-cream/65' : 'text-ink/60'}`}>
          <span className="flex items-center gap-1"><Icon name="clock" className="size-3.5" /> {fmtTime(ev.start)}</span>
          <span className="flex items-center gap-1"><Icon name="pin" className="size-3.5" /> {l.short}</span>
        </p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            <span className="display text-3xl">{eur(ev.price)}</span>
            <span className={`ml-1 text-xs ${dark ? 'text-cream/55' : 'text-ink/50'}`}>p.p.</span>
            <p className={`text-[11.5px] font-semibold ${low ? 'text-[#d9534f]' : dark ? 'text-lime' : 'text-forest/70'}`}>{low ? `Only ${ev.spotsLeft} spots left` : `${ev.spotsLeft} of ${ev.spots} spots free`}</p>
          </div>
          <a href={ev.url} target="_blank" rel="noreferrer" aria-label={`Register for ${ev.title} on Playtomic`} className={`grid size-11 place-items-center rounded-full transition group-hover:rotate-[-45deg] ${dark ? 'bg-lime text-forest' : 'bg-forest text-lime'}`}>
            <Icon name="arrow" className="size-5" />
          </a>
        </div>
      </div>
    </article>
  )
}

export function EventsFeed({ fixedLocation, limit, dark, showFilters = true }) {
  const [loc, setLoc] = useState(fixedLocation || 'all')
  const [type, setType] = useState('All')
  const [range, setRange] = useState('all')
  const { data, loading, error, retry } = usePlaytomic(() => fetchEvents({ location: loc }), [loc])
  const types = ['All', ...new Set(data.map((e) => e.type))]
  const list = data.filter((e) => {
    if (type !== 'All' && e.type !== type) return false
    const days = (new Date(e.start) - new Date()) / 86400000
    if (range === 'week' && days > 7) return false
    if (range === 'month' && days > 31) return false
    return true
  })
  const shown = limit ? list.slice(0, limit) : list
  return (
    <div>
      {showFilters && (
        <div className="mb-6 space-y-3">
          {!fixedLocation && <LocationChips value={loc} onChange={setLoc} dark={dark} />}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="no-scrollbar -mx-5 flex gap-1.5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
              {types.map((t) => (
                <button key={t} onClick={() => setType(t)} className={`shrink-0 rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition ${type === t ? 'bg-lime text-forest' : dark ? 'text-cream/60 hover:text-cream' : 'text-ink/60 hover:text-forest'}`}>{t}</button>
              ))}
            </div>
            <select value={range} onChange={(e) => setRange(e.target.value)} aria-label="Date range" className={`rounded-full border px-4 py-2 text-[13px] font-semibold outline-none ${dark ? 'border-cream/15 bg-transparent text-cream' : 'border-forest/15 bg-white text-forest'}`}>
              <option value="all">All upcoming</option>
              <option value="week">Next 7 days</option>
              <option value="month">Next 30 days</option>
            </select>
          </div>
        </div>
      )}
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{Array.from({ length: limit || 6 }).map((_, i) => <Skeleton key={i} className={`h-[178px] ${dark ? '!bg-cream/10' : ''}`} />)}</div>
      ) : error ? <ApiError message={error} onRetry={retry} dark={dark} />
        : !shown.length ? <EmptyState title="No events match" text="Try another filter or check back soon — new events are added weekly." />
          : <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{shown.map((e) => <EventCard key={e.id} ev={e} dark={dark} />)}</div>}
    </div>
  )
}

/* ------------ Trainer sessions ------------ */
export function SessionsList({ fixedLocation, kind, limit }) {
  const [loc, setLoc] = useState(fixedLocation || 'all')
  const [k, setK] = useState(kind || 'All')
  const { data, loading, error, retry } = usePlaytomic(() => fetchSessions({ location: loc }), [loc])
  const kinds = ['All', 'Private', 'Duo', 'Trio', 'Group', 'Kids']
  const list = data.filter((s) => k === 'All' || s.kind === k)
  const shown = limit ? list.slice(0, limit) : list
  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {!fixedLocation ? <LocationChips value={loc} onChange={setLoc} /> : <LiveBadge />}
        {!kind && (
          <div className="no-scrollbar -mx-5 flex gap-1.5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            {kinds.map((t) => <button key={t} onClick={() => setK(t)} className={`shrink-0 rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold ${k === t ? 'bg-lime text-forest' : 'text-ink/60 hover:text-forest'}`}>{t}</button>)}
          </div>
        )}
      </div>
      {loading ? <div className="space-y-2">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[84px]" />)}</div>
        : error ? <ApiError message={error} onRetry={retry} />
          : !shown.length ? <EmptyState title="No sessions found" text="Try another location or contact us for private lessons." />
            : (
              <ul className="divide-y divide-forest/10 overflow-hidden rounded-3xl bg-white ring-1 ring-forest/10">
                {shown.map((s) => (
                  <li key={s.id} className="grid grid-cols-[64px_1fr_auto] items-center gap-4 p-4 transition hover:bg-cream sm:grid-cols-[90px_1fr_160px_auto] sm:px-6">
                    <div className="text-center">
                      <p className="text-[10.5px] font-bold uppercase tracking-wider text-ink/45">{isToday(s.start) ? 'Today' : fmtDay(s.start)} {new Date(s.start).getDate()}.</p>
                      <p className="text-lg font-bold tabular-nums text-forest">{fmtTime(s.start)}</p>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-bold text-forest">{s.title}</p>
                      <p className="truncate text-[12.5px] text-ink/55">{s.trainer?.name} · {getLocation(s.locationSlug).short} · {s.duration} min</p>
                    </div>
                    <p className="hidden text-[12.5px] sm:block"><span className="font-semibold text-forest">{s.spotsLeft} spot{s.spotsLeft > 1 ? 's' : ''} left</span><br /><span className="text-ink/50">max. {s.players} player{s.players > 1 ? 's' : ''}</span></p>
                    <div className="flex items-center gap-3">
                      <span className="display text-3xl text-forest">{eur(s.price)}</span>
                      <a href={s.url} target="_blank" rel="noreferrer" className="hidden rounded-full bg-lime px-4 py-2 text-[13px] font-bold text-forest hover:bg-forest hover:text-lime sm:inline-flex">Book</a>
                      <a href={s.url} target="_blank" rel="noreferrer" className="grid size-9 place-items-center rounded-full bg-lime text-forest sm:hidden" aria-label="Book"><Icon name="arrowUpRight" className="size-4" /></a>
                    </div>
                  </li>
                ))}
              </ul>
            )}
    </div>
  )
}

