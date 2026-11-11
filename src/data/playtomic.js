/**
 * Mock Playtomic client.
 *
 * In production these functions would call our own server endpoint
 * (e.g. /api/playtomic/availability?tenant=…) which talks to the Playtomic API
 * server-side, keeps credentials private and caches responses (~60s for slots,
 * ~10 min for events). The frontend only ever READS — bookings happen on Playtomic.
 *
 * Append ?apiError=1 to any URL to preview the error state.
 */
import { openLocations } from './locations'

const DAY = 86400000
const startOfDay = (d = new Date()) => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x }

// deterministic pseudo-random so the UI is stable between renders
function rng(seed) {
  let s = 0
  for (const c of seed) s = (s * 31 + c.charCodeAt(0)) >>> 0
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296)
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms))
const shouldFail = () => typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('apiError')

async function request(fn) {
  await wait(450 + Math.random() * 500)
  if (shouldFail()) throw new Error('Playtomic is temporarily unreachable.')
  return fn()
}

export function getDays(n = 7) {
  const today = startOfDay()
  return Array.from({ length: n }, (_, i) => new Date(today.getTime() + i * DAY))
}

/* ---------------- Court availability ---------------- */
function buildSlots(loc, date) {
  const r = rng(loc.slug + date.toDateString())
  const now = Date.now()
  const out = []
  const courtNames = Array.from({ length: loc.courts.total }, (_, i) =>
    loc.courts.indoor > i ? `Court ${i + 1} · Indoor` : `Court ${i + 1} · Outdoor`)
  for (let h = 8; h <= 21; h++) {
    for (const m of [0, 30]) {
      const start = new Date(date); start.setHours(h, m, 0, 0)
      if (start.getTime() < now + 15 * 60000) continue // past slots are never bookable
      const free = courtNames.filter(() => r() > 0.62)
      if (!free.length) continue
      const peak = h >= 16 || [0, 6].includes(date.getDay())
      const base = loc.slug === 'bornheim' ? (peak ? 40 : 28) : (peak ? 36 : 26)
      out.push({
        id: `${loc.slug}-${start.getTime()}`,
        locationSlug: loc.slug,
        start: start.toISOString(),
        durations: r() > 0.4 ? [60, 90] : [60],
        courts: free,
        price: base,
        peak,
        url: `${loc.playtomicUrl}?date=${start.toISOString().slice(0, 10)}`,
      })
    }
  }
  return out
}

export function fetchAvailability({ location = 'all', date = new Date() } = {}) {
  return request(() => {
    const locs = location === 'all' ? openLocations : openLocations.filter((l) => l.slug === location)
    return locs.flatMap((l) => buildSlots(l, startOfDay(date))).sort((a, b) => a.start.localeCompare(b.start))
  })
}

/* ---------------- Events ---------------- */
const eventTemplates = [
  { type: 'Americano', title: 'Friday Night Americano', level: '2.0 – 3.5', price: 18, spots: 16, hour: 19 },
  { type: 'Mexicano', title: 'Sunday Mexicano', level: 'All levels', price: 15, spots: 16, hour: 10 },
  { type: 'Tournament', title: 'Team Padel Open', level: '3.0+', price: 35, spots: 32, hour: 9 },
  { type: 'Social', title: 'Beginners Social Mix', level: 'Beginner', price: 12, spots: 12, hour: 18 },
  { type: 'Americano', title: 'Ladies Americano', level: 'All levels', price: 16, spots: 12, hour: 18 },
  { type: 'Team Americano', title: 'Team Americano: Weinlese Cup', level: '2.5+', price: 22, spots: 24, hour: 14 },
  { type: 'Clinic', title: 'Bandeja & Víbora Clinic', level: '2.5 – 4.0', price: 29, spots: 8, hour: 17 },
]

function buildEvents() {
  const today = startOfDay()
  const out = []
  openLocations.forEach((loc, li) => {
    const r = rng(loc.slug + 'events')
    for (let i = 0; i < 9; i++) {
      const t = eventTemplates[(i + li * 3) % eventTemplates.length]
      const start = new Date(today.getTime() + (1 + i * 3 + li) * DAY); start.setHours(t.hour, 0, 0, 0)
      const taken = Math.floor(r() * t.spots)
      out.push({
        id: `${loc.slug}-ev-${i}`,
        locationSlug: loc.slug,
        ...t,
        start: start.toISOString(),
        durationMin: t.type === 'Tournament' ? 360 : 150,
        spotsLeft: t.spots - taken,
        url: `${loc.playtomicUrl}/tournaments`,
      })
    }
  })
  return out.filter((e) => new Date(e.start) > new Date()).sort((a, b) => a.start.localeCompare(b.start))
}

export function fetchEvents({ location = 'all' } = {}) {
  return request(() => buildEvents().filter((e) => location === 'all' || e.locationSlug === location))
}

/* ---------------- Trainer sessions ---------------- */
export const trainers = [
  { id: 'lucia', name: 'Lucía Ramos', role: 'Head Coach', from: 'Valencia, ES', bio: 'Former Spanish national league player, 12 years of coaching. Obsessed with footwork.', locations: ['bornheim'] },
  { id: 'jonas', name: 'Jonas Becker', role: 'Academy Coach', from: 'Landau, DE', bio: 'Switched from tennis in 2019 and never looked back. Runs our Kids Academy.', locations: ['bornheim', 'bad-bergzabern'] },
  { id: 'marta', name: 'Marta Silva', role: 'Coach', from: 'Porto, PT', bio: 'Specialist for beginners and ladies groups. Patient, precise, very funny.', locations: ['bad-bergzabern'] },
  { id: 'tim', name: 'Tim Kessler', role: 'Coach & Tournament Lead', from: 'Karlsruhe, DE', bio: 'Organises our Americanos and Team Padel Open. Loves a good lob.', locations: ['bornheim'] },
]

const sessionTypes = [
  { kind: 'Private', players: 1, title: 'Private lesson', price: 65, duration: 60 },
  { kind: 'Duo', players: 2, title: 'Duo training', price: 40, duration: 60 },
  { kind: 'Group', players: 4, title: 'Group training · Intermediate', price: 25, duration: 90 },
  { kind: 'Kids', players: 6, title: 'Kids Academy (8–12 yrs)', price: 15, duration: 60 },
  { kind: 'Group', players: 4, title: 'Beginner bootcamp', price: 22, duration: 90 },
  { kind: 'Trio', players: 3, title: 'Trio training', price: 32, duration: 60 },
]

export function fetchSessions({ location = 'all' } = {}) {
  return request(() => {
    const today = startOfDay()
    const out = []
    openLocations.forEach((loc) => {
      const r = rng(loc.slug + 'sessions')
      const locTrainers = trainers.filter((t) => t.locations.includes(loc.slug))
      for (let i = 0; i < 10; i++) {
        const s = sessionTypes[Math.floor(r() * sessionTypes.length)]
        const start = new Date(today.getTime() + Math.floor(i / 2) * DAY); start.setHours(9 + Math.floor(r() * 11), r() > 0.5 ? 30 : 0, 0, 0)
        if (start < new Date()) continue
        out.push({
          id: `${loc.slug}-s-${i}`,
          locationSlug: loc.slug,
          ...s,
          trainer: locTrainers[i % locTrainers.length],
          start: start.toISOString(),
          spotsLeft: Math.max(1, Math.ceil(r() * s.players)),
          url: `${loc.playtomicUrl}/lessons`,
        })
      }
    })
    return out.filter((s) => location === 'all' || s.locationSlug === location).sort((a, b) => a.start.localeCompare(b.start))
  })
}

/* ---------------- formatting helpers ---------------- */
export const fmtTime = (iso) => new Date(iso).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
export const fmtDay = (d) => new Date(d).toLocaleDateString('en-GB', { weekday: 'short' })
export const fmtDate = (d, opts = { day: 'numeric', month: 'short' }) => new Date(d).toLocaleDateString('en-GB', opts)
export const isToday = (d) => startOfDay(d).getTime() === startOfDay().getTime()
export const eur = (n) => `€${Number(n).toFixed(n % 1 ? 2 : 0)}`

