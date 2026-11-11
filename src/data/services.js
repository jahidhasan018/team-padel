/**
 * SERVICE content type — centrally managed, rendered by one ServicePage template.
 * `locations` assigns where a service is offered.
 */
export const services = [
  {
    slug: 'academy',
    title: 'Academy',
    eyebrow: 'Training for every level',
    summary: 'Kids Academy, private lessons and small-group training with certified coaches.',
    image: '/images/coach.jpg',
    icon: 'graduation',
    locations: ['bornheim', 'bad-bergzabern'],
    meta: 'Padel training & academy in Bornheim and Bad Bergzabern | Team Padel',
    intro:
      'Academy is the home of everything we coach. Whether you have never held a padel racket or you are chasing your first tournament win, our coaches build a plan around how you actually play — not a generic drill sheet.',
    formats: [
      { name: 'Kids Academy', who: '6 – 16 years', size: 'up to 6', price: 'from €15 / session', text: 'Weekly courses by age and level. Play-based, structured, lots of laughing.' },
      { name: 'Individual', who: '1 player', size: '1:1', price: 'from €65 / 60 min', text: 'Full attention on your technique, from grip to smash.' },
      { name: 'Training for 2', who: '2 players', size: '2:1', price: 'from €40 p.p.', text: 'Perfect for regular partners who want to work on positioning together.' },
      { name: 'Training for 3', who: '3 players', size: '3:1', price: 'from €32 p.p.', text: 'Rotation drills with lots of ball contact at a fair price.' },
      { name: 'Training for 4', who: '4 players', size: '4:1', price: 'from €25 p.p.', text: 'Match-like situations, tactics and doubles patterns.' },
    ],
    concept: [
      { t: 'Assess', d: 'A short first session to understand your level, goals and playing history.' },
      { t: 'Build', d: 'Focused blocks — technique, positioning, tactics — at a pace that sticks.' },
      { t: 'Play', d: 'Apply it in match play, Americanos and our internal leagues.' },
    ],
    showTrainers: true,
    showSessions: true,
  },
  {
    slug: 'corporate-events',
    title: 'Corporate & Group Events',
    eyebrow: 'Teams, birthdays & groups',
    summary: 'Team building, company parties, birthdays and school groups — fully organised.',
    image: '/images/community.jpg',
    icon: 'users',
    locations: ['bornheim', 'bad-bergzabern'],
    meta: 'Padel team building & corporate events | Team Padel',
    intro:
      'Padel is the rare sport where the intern and the CEO can share a court and both have a great time after ten minutes. We take care of courts, rackets, coaching, catering and the scoreboard — you bring the people.',
    features: [
      { t: 'Corporate events', d: 'Kick-offs, summer parties, client events.' },
      { t: 'Team building', d: 'Coach-led intro + mini tournament format.' },
      { t: 'Company celebrations', d: 'Exclusive use of the hall incl. lounge.' },
      { t: 'Birthday events', d: 'For kids and grown-ups, cake included.' },
      { t: 'School groups', d: 'PE days and project weeks, curriculum-friendly.' },
      { t: 'Youth groups', d: 'Clubs, associations and youth centres.' },
      { t: 'Custom concepts', d: 'Your idea, our venue and know-how.' },
      { t: 'Tournaments for groups', d: 'Americano or Team format with prizes.' },
    ],
    packages: [
      { name: 'Taster', price: 'from €29 p.p.', items: ['90 min court time', 'Coach introduction', 'Rackets & balls', 'Water & fruit'] },
      { name: 'Team Cup', price: 'from €49 p.p.', items: ['3 h with mini tournament', 'Coach & host', 'Trophies & photos', 'Finger food & drinks'], featured: true },
      { name: 'Exclusive', price: 'on request', items: ['Whole venue', 'Custom programme', 'Catering partner', 'Branding options'] },
    ],
    inquiry: true,
  },
  {
    slug: 'tournaments',
    title: 'Tournaments & Event Formats',
    eyebrow: 'How our formats work',
    summary: 'Americano, Mexicano, Team Americano and more — explained in plain words.',
    image: '/images/racket-ball.jpg',
    icon: 'trophy',
    locations: ['bornheim', 'bad-bergzabern'],
    meta: 'Padel tournament formats explained: Americano, Mexicano & more | Team Padel',
    intro:
      'Never played an Americano and not sure what to expect? Here is how each of our formats works. Looking for actual dates? Head to Events & Tournaments in Book & Play.',
    formatsExplained: [
      { name: 'Americano', players: '8 – 24', time: '2 – 3 h', d: 'You change partner every round and collect points individually. The most social format there is — you play with everyone.' },
      { name: 'Mexicano', players: '8 – 24', time: '2 – 3 h', d: 'Like Americano, but pairings are based on the current standings, so matches get more even as the evening goes on.' },
      { name: 'Team Americano', players: '8 – 32', time: '3 h', d: 'Fixed pairs rotate opponents. Great for regular partners who want lots of games against different teams.' },
      { name: 'Individual tournaments', players: '16 – 64', time: '1 – 2 days', d: 'Classic brackets with group stage and knockout rounds, sorted by level.' },
      { name: 'Group tournaments', players: 'Any', time: 'Flexible', d: 'Closed tournaments for clubs, companies or friends — we handle the draw and scoring.' },
      { name: 'Custom organisation', players: 'Any', time: 'Flexible', d: 'Charity events, league nights, themed tournaments. Tell us the idea.' },
    ],
  },
  {
    slug: 'padel-for-beginners',
    title: 'Padel for Beginners',
    eyebrow: 'Your first steps',
    summary: 'Never played? Start here — what to bring, how to book and how to learn.',
    image: '/images/court-indoor.jpg',
    icon: 'sprout',
    locations: ['bornheim', 'bad-bergzabern'],
    meta: 'Learn padel as a beginner | Team Padel',
    intro:
      'Good news: padel is the easiest racket sport to pick up. Most people are rallying in their first hour. Here is everything you need to get started with us.',
    steps: [
      { t: 'Grab three friends', d: 'Padel is played 2 vs 2. No partners? Join a Beginners Social Mix.' },
      { t: 'Book a court on Playtomic', d: 'Choose a location, pick a time and split the cost in the app.' },
      { t: 'Rent a racket', d: 'Rental rackets and balls are ready at reception. Just bring clean sport shoes.' },
      { t: 'Take a beginner lesson', d: 'One session with a coach saves you months of bad habits.' },
    ],
    equipment: ['Comfortable sportswear', 'Clean indoor sport shoes (no black soles)', 'Water bottle', 'Racket & balls — rentable on site'],
    showSessions: true,
  },
  {
    slug: 'padel-for-kids',
    title: 'Padel for Kids & Teenagers',
    eyebrow: 'For parents',
    summary: 'Safe, structured and fun training for children aged 6 to 16.',
    image: '/images/kids.jpg',
    icon: 'smile',
    locations: ['bornheim', 'bad-bergzabern'],
    meta: 'Padel for kids – Kids Academy | Team Padel',
    intro:
      'Thinking about signing up your child? Padel is a fantastic first racket sport: smaller court, softer balls, walls that keep the rally going. Kids feel successful quickly — and that keeps them coming back.',
    benefits: [
      { t: 'Coordination & reflexes', d: 'Hand-eye coordination and quick decisions on every shot.' },
      { t: 'Team spirit', d: 'Always played in pairs — kids learn to communicate and support each other.' },
      { t: 'Quick wins', d: 'Rallies from the first lesson, which builds confidence fast.' },
      { t: 'Screen-free time', d: 'Active, social and outdoors (in Bad Bergzabern, at least).' },
    ],
    parentInfo: [
      { q: 'Who supervises my child?', a: 'All Kids Academy sessions are led by licensed coaches with first-aid training and an extended police clearance certificate (erweitertes Führungszeugnis).' },
      { q: 'What does my child need?', a: 'Sportswear, clean indoor shoes and a water bottle. Junior rackets are provided for free during the first month.' },
      { q: 'How are groups formed?', a: 'By age (6–8, 9–12, 13–16) and level. Max. 6 kids per coach.' },
      { q: 'Can I watch?', a: 'Of course — our lounge has a view over the courts. Coffee is on us during the trial lesson.' },
      { q: 'Is there a free trial?', a: 'Yes, the first session is free. Just book a trial slot or contact the location.' },
    ],
    showSessions: true,
  },
]

export const getService = (slug) => services.find((s) => s.slug === slug)

