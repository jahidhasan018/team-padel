/**
 * KNOWLEDGE ARTICLE content type. Each article: own URL, meta title/description,
 * body blocks, related links to services/locations.
 */
export const knowledgeCategories = [
  { slug: 'understanding-padel', title: 'Understanding Padel', blurb: 'What padel is, where it comes from and why everyone suddenly plays it.', icon: 'compass' },
  { slug: 'rules', title: 'Padel Rules', blurb: 'Serving, scoring, the glass walls — the rules without the legalese.', icon: 'book' },
  { slug: 'beginners', title: 'Padel for Beginners', blurb: 'Your first racket, your first booking, your first match.', icon: 'sprout' },
  { slug: 'equipment', title: 'Equipment Guides', blurb: 'Rackets, shapes, materials, shoes and balls explained.', icon: 'racket' },
  { slug: 'tips-techniques', title: 'Tips & Techniques', blurb: 'Shots, tactics and positioning to win more points.', icon: 'target' },
  { slug: 'training', title: 'Training & Exercises', blurb: 'Drills and practice routines for real improvement.', icon: 'dumbbell' },
]

const A = (category, slug, title, excerpt, read, body, extra = {}) => ({ category, slug, title, excerpt, read, body, image: extra.image, related: extra.related || [], meta: extra.meta || `${title} | Team Padel Knowledge`, updated: extra.updated || '2026-10-14' })

export const articles = [
  A('understanding-padel', 'what-is-padel', 'What is padel? The sport explained in 3 minutes',
    'A mix of tennis and squash, played in doubles on a glass-walled court. Here is everything you need to know.', 4, [
      { h: 'Padel in one sentence', p: ['Padel is a racket sport played in pairs on an enclosed court about a third the size of a tennis court, where the ball may bounce off the glass walls — like squash, but with a net in the middle.'] },
      { h: 'How a point works', p: ['You serve underhand, diagonally into the opponent\'s service box. After that, the ball must bounce once on the ground before it may hit a wall. You can return balls straight away or after they come off the glass.', 'That is what makes padel so addictive: rallies keep going much longer than in tennis, even for beginners.'] },
      { h: 'Why it is so easy to start', list: ['Solid, stringless rackets that forgive mistakes', 'Small court — less running, more playing', 'Underhand serve that anyone can learn in minutes', 'Always doubles: social by design'] },
    ], { image: '/images/court-indoor.jpg', related: [{ label: 'Padel for Beginners', to: '/services/padel-for-beginners' }, { label: 'Book your first court', to: '/book-play/court-booking' }], meta: 'What is padel? Rules, court & equipment explained | Team Padel' }),
  A('understanding-padel', 'history-of-padel', 'The history of padel: from Acapulco to the Palatinate',
    'Invented in Mexico in 1969, perfected in Spain, now booming in Germany.', 5, [
      { h: '1969: A wall in Acapulco', p: ['Enrique Corcuera wanted a tennis court at his holiday home but did not have the space. He built a smaller court surrounded by walls — padel was born.'] },
      { h: 'Spain and Argentina', p: ['Spanish prince Alfonso de Hohenlohe brought it to Marbella, from where it spread across Spain and Argentina. Today Spain has more than 20,000 courts.'] },
      { h: 'Padel in Germany', p: ['Germany has gone from a handful of courts in 2018 to well over 1,000 today. The Palatinate is one of the fastest-growing regions — which is exactly why we are here.'] },
    ], { image: '/images/court-outdoor.jpg' }),
  A('understanding-padel', 'padel-vs-tennis', 'Padel vs. tennis: what is the difference?',
    'Court, rackets, serve, walls — a side-by-side comparison.', 4, [
      { h: 'The court', p: ['A padel court is 20 × 10 m, enclosed by glass and mesh. A tennis doubles court is 23.77 × 10.97 m and open.'] },
      { h: 'The racket', p: ['Padel rackets have no strings — they are solid with holes, shorter and lighter. Control comes easier, raw power less so.'] },
      { h: 'The feel', p: ['Tennis rewards technique from day one. Padel rewards tactics, patience and teamwork. Many tennis players switch and never look back.'] },
    ]),
  A('rules', 'basic-rules', 'Padel rules for beginners',
    'The essential rules to play your first match without arguing.', 6, [
      { h: 'The serve', p: ['Serve underhand, from behind the service line, diagonally into the opposite box. The ball must bounce before you hit it, at or below waist height. You get two attempts.'] },
      { h: 'Scoring', p: ['Exactly like tennis: 15, 30, 40, game. Six games win a set, best of three sets. Many clubs play "golden point" at deuce — next point wins.'] },
      { h: 'The walls', list: ['After your opponent\'s shot, the ball must bounce on your side before touching a wall', 'You may play the ball after it rebounds off the glass', 'You may use your own walls to send the ball back', 'If the ball hits the mesh or glass on the other side before bouncing, it is your point lost'] },
    ], { image: '/images/racket-ball.jpg', related: [{ label: 'Tournament formats', to: '/services/tournaments' }] }),
  A('rules', 'scoring-system', 'Padel scoring explained (incl. golden point)',
    'Why 15–30–40, what golden point means, and how tie-breaks work.', 3, [
      { h: 'Points, games, sets', p: ['Points go 15, 30, 40, game. Six games with a two-game margin win the set. At 6–6, a tie-break to 7 points decides.'] },
      { h: 'Golden point', p: ['At 40–40 the receiving team chooses which side receives — and whoever wins the next point wins the game. Quick and dramatic.'] },
    ]),
  A('rules', 'glass-wall-rules', 'Glass wall rules: what is allowed?',
    'The most common situations with walls and fences, clearly explained.', 4, [
      { h: 'Playing off your own wall', p: ['Allowed and encouraged. You can even hit the ball against your own back wall to get it over the net (a "contrapared").'] },
      { h: 'Playing outside the court', p: ['On panoramic courts with openings, you may run out and return the ball from outside. At our venues this is allowed on marked courts only.'] },
    ]),
  A('beginners', 'how-to-start', 'How to start playing padel',
    'From zero to your first match in one week.', 5, [
      { h: 'Book a lesson or a social', p: ['The fastest way to learn is a beginner session with a coach, or one of our Beginners Social Mix evenings, where you are paired with other newcomers.'] },
      { h: 'Find partners', p: ['Use Playtomic\'s open matches to join games at your level, or join our WhatsApp community groups per location.'] },
    ], { related: [{ label: 'Beginner trainer sessions', to: '/book-play/trainer-sessions' }, { label: 'Events for beginners', to: '/book-play/events' }] }),
  A('beginners', 'first-booking', 'How does my first booking work?',
    'Step by step through Playtomic — and what to expect on arrival.', 3, [
      { h: 'On Playtomic', list: ['Choose your Team Padel location', 'Pick date, time and duration', 'Pay or split the payment with your partners', 'Get the confirmation by email'] },
      { h: 'On site', p: ['Arrive 10 minutes early, check in at reception, collect rental rackets and balls if needed — and play.'] },
    ]),
  A('beginners', 'beginner-mistakes', '7 common beginner mistakes (and how to fix them)',
    'Swinging like a tennis player, fearing the walls and other classics.', 6, [
      { h: 'Hitting too hard', p: ['Power wins fewer points than placement. Slow down, aim for the feet of the net player.'] },
      { h: 'Being afraid of the glass', p: ['Let the ball come off the back wall. It gives you time — use it.'] },
      { h: 'Staying at the back', p: ['Most points are won at the net. Move forward together with your partner after a good lob or return.'] },
    ]),
  A('equipment', 'choose-a-racket', 'How to choose the right padel racket',
    'Shape, weight, balance and core — which racket fits your game?', 7, [
      { h: 'Start with your level', p: ['Beginners benefit from round rackets with a large sweet spot and soft EVA foam. Advanced players can go for teardrop or diamond shapes.'] },
      { h: 'Weight and balance', p: ['Most rackets weigh 345–375 g. Lighter means more manoeuvrable; head-heavy balance adds power but strains the arm.'] },
      { h: 'Test before you buy', p: ['Every racket in our shop can be tested on court. Ask at reception or check the Racket of the Month.'] },
    ], { image: '/images/racket-ball.jpg', related: [{ label: 'Browse rackets', to: '/shop/rackets' }, { label: 'Racket of the Month', to: '/shop/racket-of-the-month' }] }),
  A('equipment', 'racket-shapes', 'Round, teardrop, diamond: racket shapes explained',
    'Control, balance or power — what each shape does.', 4, [
      { h: 'Round', p: ['Sweet spot in the centre, low balance, maximum control. Ideal for beginners and defensive players.'] },
      { h: 'Teardrop', p: ['The all-rounder. Slightly higher balance, a good mix of control and power.'] },
      { h: 'Diamond', p: ['High balance and a sweet spot near the top. Built for smashes — less forgiving.'] },
    ]),
  A('equipment', 'padel-shoes', 'Do I need special padel shoes?',
    'Why the sole matters more than you think.', 3, [
      { h: 'The herringbone sole', p: ['Padel shoes have a herringbone or omni sole that grips on sandy artificial turf while letting you slide slightly. Running shoes do not.'] },
    ], { related: [{ label: 'Shoes in our shop', to: '/shop/shoes' }] }),
  A('tips-techniques', 'bandeja', 'The bandeja: the most important padel shot',
    'Keep the net under pressure without giving away the attack.', 5, [
      { h: 'What it is', p: ['A controlled overhead with slice, played from around the service line to keep your position at the net.'] },
      { h: 'Key points', list: ['Turn your shoulders sideways early', 'Contact the ball in front of your body, at head height', 'Aim deep and to the side wall', 'Recover to the net immediately'] },
    ], { image: '/images/coach.jpg', related: [{ label: 'Book a clinic', to: '/book-play/events' }] }),
  A('tips-techniques', 'doubles-positioning', 'Doubles positioning: move like a team',
    'Why you and your partner should be connected by an invisible rope.', 4, [
      { h: 'The rope rule', p: ['Imagine a 3-metre rope between you and your partner. When one moves forward, sideways or back, the other follows.'] },
      { h: 'Cover the middle', p: ['Most winners go through the middle. Agree who takes it — usually the player with the forehand.'] },
    ]),
  A('training', 'solo-drills', '5 drills you can do with just a partner',
    'Simple routines to groove your volleys, walls and lobs.', 6, [
      { h: 'Volley to volley', p: ['Both at the net, keep the ball in the air for 20 shots. Focus on short backswings.'] },
      { h: 'Back-wall feeding', p: ['One player feeds into the back glass, the other practices reading the bounce and returning with a lob.'] },
    ], { related: [{ label: 'Academy training', to: '/services/academy' }] }),
  A('training', 'tactical-development', 'From hitting to thinking: tactical development',
    'How intermediate players make the jump to winning matches.', 5, [
      { h: 'Play percentages', p: ['Know which shot wins points and which one only feels good. Lobs and slow balls to the feet win more than you think.'] },
    ]),
]

export const getArticle = (cat, slug) => articles.find((a) => a.category === cat && a.slug === slug)
export const getKnowledgeCategory = (slug) => knowledgeCategories.find((c) => c.slug === slug)

/** FAQ content type — general (location-specific FAQs live on the Location) */
export const faqs = [
  { group: 'About padel', q: 'Is padel hard to learn?', a: 'No — most people can rally after 20–30 minutes. It is one of the most accessible racket sports.' },
  { group: 'About padel', q: 'How many players do I need?', a: 'Padel is played 2 vs 2. Singles courts exist but are rare; our courts are all doubles courts.' },
  { group: 'About padel', q: 'Is padel good exercise?', a: 'Very. A 90-minute match burns 500–700 kcal and trains reaction, coordination and endurance — while feeling like a game.' },
  { group: 'Booking', q: 'Can I book directly on this website?', a: 'All bookings and payments are handled on Playtomic. Our site shows you live availability and sends you to the right Playtomic page.' },
  { group: 'Booking', q: 'What is your cancellation policy?', a: 'Court bookings can be cancelled free of charge up to 24 hours in advance via Playtomic.' },
  { group: 'Booking', q: 'Do you sell gift vouchers?', a: 'Yes, vouchers are available at reception at all locations. Online vouchers are in the works.' },
  { group: 'Team Padel', q: 'Can I buy equipment online?', a: 'Our shop is a catalogue. All products are available at our locations — contact your preferred location to check stock.' },
  { group: 'Team Padel', q: 'Do you offer memberships?', a: 'Not yet — you pay per booking. Members-style benefits are planned for 2027.' },
  { group: 'Team Padel', q: 'I own land or a hall. Can we work together?', a: 'Absolutely. Visit "Develop a Padel Location With Us" or suggest a location directly.' },
]

