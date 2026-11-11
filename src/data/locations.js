/**
 * LOCATION content type.
 * Adding a new Team Padel location = adding one object here (later: one CMS entry).
 * Every overview, filter, booking list and the Book Now menu reads from this array —
 * nothing else needs to be touched.
 */
export const locations = [
  {
    slug: 'bornheim',
    name: 'Team Padel Bornheim',
    short: 'Bornheim',
    status: 'open',
    type: 'Indoor',
    tagline: 'Six indoor courts, all-year play, zero weather excuses.',
    intro:
      'Our flagship hall sits right off the B272, a few minutes from Landau. Six panoramic indoor courts, a bright lounge with coffee and cold drinks, and a pro shop where you can test rackets before you buy. Most evenings you will find our academy on courts 1–2 and open play everywhere else.',
    image: '/images/court-indoor.jpg',
    gallery: ['/images/court-indoor.jpg', '/images/coach.jpg', '/images/racket-ball.jpg', '/images/community.jpg'],
    address: { street: 'Am Sportpark 4', zip: '76879', city: 'Bornheim (Pfalz)', country: 'Germany' },
    phone: '+49 6348 000 100',
    whatsapp: '+49 151 000 00100',
    email: 'bornheim@teampadel.de',
    playtomicTenantId: 'tp-bornheim',
    playtomicUrl: 'https://playtomic.io/team-padel-bornheim',
    hours: [
      ['Mon – Fri', '07:00 – 23:00'],
      ['Saturday', '08:00 – 23:00'],
      ['Sunday & holidays', '08:00 – 22:00'],
    ],
    directions:
      'Take exit Landau-Nord from the A65, follow the B272 towards Bornheim. The hall is signposted from the roundabout. Bus 531 stops 3 minutes away (Bornheim Sportpark).',
    parking: '40 free parking spaces directly at the hall, 4 EV charging points, covered bike racks.',
    courts: { total: 6, indoor: 6, outdoor: 0, kind: 'Panoramic glass courts, WPT-spec turf' },
    amenities: ['Changing rooms & showers', 'Lounge & bar', 'Pro shop', 'Racket test centre', 'Free Wi-Fi', 'Kids corner', 'Accessible entrance', 'Livestream camera court 1'],
    prices: [
      { label: 'Court 60 min · off-peak', note: 'Mon–Fri before 16:00', price: 28 },
      { label: 'Court 60 min · peak', note: 'Mon–Fri after 16:00 & weekends', price: 40 },
      { label: 'Court 90 min · peak', price: 56 },
      { label: 'Racket rental', note: 'per racket, per booking', price: 4 },
      { label: 'Ball tube (3)', price: 7 },
    ],
    faqs: [
      { q: 'Do I need to bring my own racket?', a: 'No. Rental rackets are available at reception for €4 per booking. Premium test rackets can be borrowed for free from the test centre.' },
      { q: 'Is there a dress code?', a: 'Clean indoor sport shoes are required. Running shoes with heavy profiles damage the turf, so please bring padel or tennis clean-court shoes.' },
      { q: 'Can I book a court without a Playtomic account?', a: 'Bookings run through Playtomic. Creating an account takes about a minute and lets you split payment with your partners.' },
    ],
    rating: 4.8,
    reviews: 312,
    coords: { lat: 49.22, lng: 8.16 },
  },
  {
    slug: 'bad-bergzabern',
    name: 'Team Padel Bad Bergzabern',
    short: 'Bad Bergzabern',
    status: 'open',
    type: 'Indoor & Outdoor',
    tagline: 'Play between the vineyards — under a roof or under the sky.',
    intro:
      'Right at the edge of the Palatinate Forest, our Bad Bergzabern club combines two covered courts with three outdoor courts surrounded by vineyards. Summer evenings here are something else: sunset matches, a glass of Riesling afterwards and a community that sticks around long after the last point.',
    image: '/images/court-outdoor.jpg',
    gallery: ['/images/court-outdoor.jpg', '/images/kids.jpg', '/images/community.jpg', '/images/racket-ball.jpg'],
    address: { street: 'Weinstraße 112', zip: '76887', city: 'Bad Bergzabern', country: 'Germany' },
    phone: '+49 6343 000 200',
    whatsapp: '+49 151 000 00200',
    email: 'badbergzabern@teampadel.de',
    playtomicTenantId: 'tp-bad-bergzabern',
    playtomicUrl: 'https://playtomic.io/team-padel-bad-bergzabern',
    hours: [
      ['Mon – Fri', '08:00 – 22:00'],
      ['Saturday', '08:00 – 22:00'],
      ['Sunday & holidays', '09:00 – 21:00'],
    ],
    directions:
      'Located on the Deutsche Weinstraße at the north entrance of Bad Bergzabern. From Landau follow the B38 south for about 15 minutes.',
    parking: '25 free parking spaces, additional parking at the Kurpark lot (5 min walk).',
    courts: { total: 5, indoor: 2, outdoor: 3, kind: '2 covered + 3 outdoor panoramic courts, floodlit' },
    amenities: ['Changing rooms & showers', 'Terrace with vineyard view', 'Bar & small kitchen', 'Shop corner', 'Floodlights', 'Kids Academy courts', 'Bike service point'],
    prices: [
      { label: 'Outdoor court 60 min', price: 24 },
      { label: 'Indoor court 60 min · off-peak', note: 'Mon–Fri before 16:00', price: 26 },
      { label: 'Indoor court 60 min · peak', price: 36 },
      { label: 'Racket rental', note: 'per racket, per booking', price: 4 },
    ],
    faqs: [
      { q: 'What happens with my outdoor booking when it rains?', a: 'If outdoor play is not possible, we move you to a covered court when available or refund via Playtomic.' },
      { q: 'Are the outdoor courts open in winter?', a: 'Outdoor courts are open from March to November. The covered courts are available all year.' },
    ],
    rating: 4.9,
    reviews: 187,
    coords: { lat: 49.1, lng: 8.0 },
  },
  {
    slug: 'next-location',
    name: 'Your town?',
    short: 'Coming soon',
    status: 'planned',
    type: 'In development',
    tagline: 'We are actively looking for our next location.',
    image: '/images/facility.jpg',
  },
]

export const openLocations = locations.filter((l) => l.status === 'open')
export const getLocation = (slug) => locations.find((l) => l.slug === slug)
export const formatAddress = (a) => `${a.street}, ${a.zip} ${a.city}`

