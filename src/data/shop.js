/**
 * PRODUCT / PRODUCT CATEGORY / BRAND content types.
 * Catalogue only — no cart, no checkout. Each product carries a location availability field.
 */
export const productCategories = [
  { slug: 'rackets', title: 'Padel Rackets', short: 'Rackets', art: 'racket', blurb: 'Round, teardrop or diamond — test before you buy.', tone: 'bg-forest' },
  { slug: 'racket-of-the-month', title: 'Racket of the Month', short: 'Racket of the Month', art: 'racket', blurb: 'One racket, free to test at our locations.', tone: 'bg-lime', special: true },
  { slug: 'clothing', title: 'Clothing', short: 'Clothing', art: 'shirt', blurb: 'Shirts, hoodies, shorts — made for the court.', tone: 'bg-sand' },
  { slug: 'shoes', title: 'Shoes', short: 'Shoes', art: 'shoe', blurb: 'Grip and stability for turf and sand.', tone: 'bg-ink' },
  { slug: 'bags', title: 'Bags', short: 'Bags', art: 'bag', blurb: 'Racket bags and backpacks.', tone: 'bg-forest-soft' },
  { slug: 'accessories', title: 'Balls & Accessories', short: 'Accessories', art: 'ball', blurb: 'Balls, overgrips, protectors & more.', tone: 'bg-sand' },
  { slug: 'team-padel', title: 'Team Padel Merchandise', short: 'Merch', art: 'shirt', blurb: 'Our own kit. Wear the team.', tone: 'bg-forest' },
]

export const brands = ['Bullpadel', 'Head', 'Adidas', 'Nox', 'Babolat', 'Siux', 'Asics', 'Team Padel']

const both = ['bornheim', 'bad-bergzabern']

export const products = [
  // Rackets
  { id: 'bp-vertex-04', category: 'rackets', brand: 'Bullpadel', name: 'Vertex 04 Hybrid', price: 279, shape: 'Diamond', art: 'racket', color: '#CEDB23', locations: both, desc: 'Power-focused diamond shape for attacking players who live at the net.' },
  { id: 'head-speed-pro', category: 'rackets', brand: 'Head', name: 'Speed Pro 2025', price: 249, shape: 'Teardrop', art: 'racket', color: '#e8e8e8', locations: ['bornheim'], desc: 'Fast, balanced and forgiving. A great all-rounder.' },
  { id: 'nox-at10', category: 'rackets', brand: 'Nox', name: 'AT10 Genius 18K', price: 299, shape: 'Teardrop', art: 'racket', color: '#d9a441', locations: both, desc: 'The racket of Agustín Tapia — control with a sharp edge.' },
  { id: 'adidas-metalbone', category: 'rackets', brand: 'Adidas', name: 'Metalbone 3.4', price: 289, shape: 'Diamond', art: 'racket', color: '#e04f3a', locations: ['bornheim'], desc: 'Adjustable weight system, explosive smashes.' },
  { id: 'babolat-air', category: 'rackets', brand: 'Babolat', name: 'Air Viper', price: 219, shape: 'Round', art: 'racket', color: '#4a90c2', locations: ['bad-bergzabern'], desc: 'Light and comfortable — ideal for improving players.' },
  { id: 'siux-trilogy', category: 'rackets', brand: 'Siux', name: 'Trilogy Control 4', price: 199, shape: 'Round', art: 'racket', color: '#f2f2f2', locations: both, desc: 'Big sweet spot and soft feel. Our beginner favourite.' },
  // Clothing
  { id: 'bp-tee-ardor', category: 'clothing', sub: 'Shirts', brand: 'Bullpadel', name: 'Ardor Tech Tee', price: 39, art: 'shirt', color: '#2A2A2A', colors: ['#2A2A2A', '#F6F1ED', '#27382C'], sizes: ['S', 'M', 'L', 'XL'], material: '92% recycled polyester, 8% elastane', fit: 'Regular', locations: both, desc: 'Lightweight, quick-drying performance tee with mesh panels on the back.' },
  { id: 'adidas-hoodie', category: 'clothing', sub: 'Hoodies', brand: 'Adidas', name: 'Club Padel Hoodie', price: 69, art: 'hoodie', color: '#34493A', colors: ['#34493A', '#2A2A2A'], sizes: ['XS', 'S', 'M', 'L', 'XL'], material: '70% cotton, 30% polyester', fit: 'Relaxed', locations: ['bornheim'], desc: 'Warm-up essential. Brushed inside, kangaroo pocket.' },
  { id: 'head-jacket', category: 'clothing', sub: 'Jackets', brand: 'Head', name: 'Breaker Jacket', price: 89, art: 'jacket', color: '#1b2a4a', colors: ['#1b2a4a', '#2A2A2A'], sizes: ['S', 'M', 'L', 'XL'], material: '100% polyester, DWR finish', fit: 'Regular', locations: both, desc: 'Wind- and water-repellent for outdoor evenings.' },
  { id: 'nox-shorts', category: 'clothing', sub: 'Trousers & Shorts', brand: 'Nox', name: 'Pro Shorts', price: 35, art: 'shorts', color: '#2A2A2A', colors: ['#2A2A2A', '#27382C'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], material: '88% polyester, 12% elastane', fit: 'Athletic', locations: both, desc: 'Ball pocket, 4-way stretch, 7" inseam.' },
  { id: 'bp-skirt', category: 'clothing', sub: 'Trousers & Shorts', brand: 'Bullpadel', name: 'Skort Ena', price: 42, art: 'shorts', color: '#F6F1ED', colors: ['#F6F1ED', '#CEDB23', '#2A2A2A'], sizes: ['XS', 'S', 'M', 'L'], material: '90% polyester, 10% elastane', fit: 'Slim', locations: ['bad-bergzabern'], desc: 'Integrated shorts with ball pocket.' },
  { id: 'socks-pack', category: 'clothing', sub: 'Socks', brand: 'Babolat', name: 'Padel Crew Socks (3-pack)', price: 18, art: 'sock', color: '#F6F1ED', colors: ['#F6F1ED', '#2A2A2A'], sizes: ['35–38', '39–42', '43–46'], material: 'Cotton blend, cushioned sole', fit: '—', locations: both, desc: 'Cushioned where it matters.' },
  // Shoes
  { id: 'asics-gel', category: 'shoes', brand: 'Asics', name: 'Gel-Padel Pro 5', price: 129, art: 'shoe', color: '#F6F1ED', colors: ['#F6F1ED', '#2A2A2A'], sizes: ['40', '41', '42', '43', '44', '45', '46'], material: 'Synthetic upper, herringbone outsole', fit: 'Standard', locations: both, desc: 'GEL cushioning and a sole built for artificial turf.' },
  { id: 'bp-hack', category: 'shoes', brand: 'Bullpadel', name: 'Hack Hybrid Fly', price: 119, art: 'shoe', color: '#2A2A2A', colors: ['#2A2A2A', '#CEDB23'], sizes: ['39', '40', '41', '42', '43', '44', '45'], material: 'Mesh, rubber omni sole', fit: 'Narrow', locations: ['bornheim'], desc: 'Light and responsive for quick players.' },
  { id: 'adidas-crazyquick', category: 'shoes', brand: 'Adidas', name: 'CrazyQuick Boost', price: 139, art: 'shoe', color: '#e8e8e8', colors: ['#e8e8e8', '#1b2a4a'], sizes: ['38', '39', '40', '41', '42', '43', '44'], material: 'Textile upper, Boost midsole', fit: 'Standard', locations: both, desc: 'Plush comfort for long Americano nights.' },
  // Bags
  { id: 'bp-bag', category: 'bags', brand: 'Bullpadel', name: 'Vertex Racket Bag', price: 79, art: 'bag', color: '#2A2A2A', locations: both, desc: 'Thermal compartments for 3 rackets, separate shoe pocket.' },
  { id: 'head-backpack', category: 'bags', brand: 'Head', name: 'Pro X Backpack', price: 65, art: 'backpack', color: '#27382C', locations: ['bornheim'], desc: 'Fits 2 rackets, laptop sleeve, ventilated shoe compartment.' },
  { id: 'nox-bag', category: 'bags', brand: 'Nox', name: 'AT10 Competition XL', price: 89, art: 'bag', color: '#d9a441', locations: ['bad-bergzabern'], desc: 'Large tournament bag for everything you need.' },
  // Accessories
  { id: 'balls-head', category: 'accessories', sub: 'Balls', brand: 'Head', name: 'Padel Pro S (3 balls)', price: 7, art: 'ball', color: '#CEDB23', locations: both, desc: 'Official ball of our tournaments.' },
  { id: 'overgrip', category: 'accessories', sub: 'Overgrips', brand: 'Bullpadel', name: 'GB-1200 Overgrip (3)', price: 9, art: 'grip', color: '#F6F1ED', locations: both, desc: 'Tacky, absorbent, long-lasting.' },
  { id: 'protector', category: 'accessories', sub: 'Racket protectors', brand: 'Nox', name: 'Frame Protector Clear', price: 8, art: 'tape', color: '#e8e8e8', locations: both, desc: 'Protects your frame from wall scrapes.' },
  { id: 'wristband', category: 'accessories', sub: 'Other', brand: 'Siux', name: 'Wristbands (2)', price: 10, art: 'band', color: '#2A2A2A', locations: ['bornheim'], desc: 'Keep your grip dry.' },
  // Merch
  { id: 'tp-tee', category: 'team-padel', sub: 'Shirts', brand: 'Team Padel', name: 'Team Tee', price: 29, art: 'shirt', color: '#2A2A2A', logo: true, colors: ['#2A2A2A', '#27382C', '#F6F1ED'], sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], material: 'Organic cotton/recycled poly blend', fit: 'Regular', locations: both, desc: 'The shirt our staff wear. Soft, breathable, with the ball mark on the chest.' },
  { id: 'tp-hoodie', category: 'team-padel', sub: 'Hoodies', brand: 'Team Padel', name: 'Clubhouse Hoodie', price: 59, art: 'hoodie', color: '#27382C', logo: true, colors: ['#27382C', '#2A2A2A'], sizes: ['S', 'M', 'L', 'XL'], material: '80% organic cotton, 20% recycled polyester', fit: 'Oversized', locations: both, desc: 'Heavyweight hoodie with embroidered logo.' },
  { id: 'tp-cap', category: 'team-padel', sub: 'Other', brand: 'Team Padel', name: 'Court Cap', price: 24, art: 'cap', color: '#CEDB23', logo: true, colors: ['#CEDB23', '#2A2A2A'], sizes: ['One size'], material: 'Recycled polyester', fit: 'Adjustable', locations: both, desc: 'Light running-style cap for sunny Bad Bergzabern days.' },
  { id: 'tp-bottle', category: 'team-padel', sub: 'Other', brand: 'Team Padel', name: 'Steel Bottle 750 ml', price: 19, art: 'bottle', color: '#27382C', logo: true, locations: both, desc: 'Keeps water cold for 24 hours.' },
]

/** Racket of the Month — one object, easy to swap monthly */
export const racketOfTheMonth = {
  month: 'November',
  productId: 'nox-at10',
  headline: 'The racket everyone asks about.',
  text: 'Tapia\'s weapon of choice is our pick for November. 18K carbon face, a teardrop shape that forgives off-centre hits and enough bite for flat smashes. Test it for free during any booking — just ask at reception.',
  testInfo: 'Free 60-minute test with your court booking. Deposit: ID card. Limited to 2 test rackets per location.',
  locations: ['bornheim', 'bad-bergzabern'],
}

export const getCategory = (slug) => productCategories.find((c) => c.slug === slug)
export const getProduct = (id) => products.find((p) => p.id === id)
export const AVAILABILITY_NOTICE = 'Available at our Team Padel locations. Please contact your preferred location to check current availability.'

