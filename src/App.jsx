import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import { LocationsPage, LocationDetail } from './pages/Locations'
import { BookPlay, CourtBooking, EventsPage, TrainerSessions, RacketRental, GiftVouchers } from './pages/BookPlay'
import { ServicesPage, ServiceDetail } from './pages/Services'
import { ShopPage, ShopCategory, RacketOfTheMonth, ProductDetail } from './pages/Shop'
import { KnowledgePage, KnowledgeCategory, ArticlePage, FaqPage } from './pages/Knowledge'
import { CommunityPage, CommunityPost } from './pages/Community'
import { TeamPadelPage, AboutPage, ExpandPage, PartnershipsPage, SuggestLocationPage, CareersPage, ContactPage } from './pages/TeamPadel'
import { LegalPage, NotFound } from './pages/Misc'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="locations" element={<LocationsPage />} />
        <Route path="locations/:slug" element={<LocationDetail />} />

        <Route path="book-play" element={<BookPlay />} />
        <Route path="book-play/court-booking" element={<CourtBooking />} />
        <Route path="book-play/events" element={<EventsPage />} />
        <Route path="book-play/trainer-sessions" element={<TrainerSessions />} />
        <Route path="book-play/racket-rental" element={<RacketRental />} />
        <Route path="book-play/gift-vouchers" element={<GiftVouchers />} />

        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:slug" element={<ServiceDetail />} />

        <Route path="shop" element={<ShopPage />} />
        <Route path="shop/racket-of-the-month" element={<RacketOfTheMonth />} />
        <Route path="shop/:category" element={<ShopCategory />} />
        <Route path="shop/:category/:id" element={<ProductDetail />} />

        <Route path="padel-knowledge" element={<KnowledgePage />} />
        <Route path="padel-knowledge/faq" element={<FaqPage />} />
        <Route path="padel-knowledge/:category" element={<KnowledgeCategory />} />
        <Route path="padel-knowledge/:category/:slug" element={<ArticlePage />} />

        <Route path="community" element={<CommunityPage />} />
        <Route path="community/:slug" element={<CommunityPost />} />

        <Route path="team-padel" element={<TeamPadelPage />} />
        <Route path="team-padel/about-us" element={<AboutPage />} />
        <Route path="team-padel/expand-with-us" element={<ExpandPage />} />
        <Route path="team-padel/partnerships" element={<PartnershipsPage />} />
        <Route path="team-padel/suggest-a-location" element={<SuggestLocationPage />} />
        <Route path="team-padel/careers" element={<CareersPage />} />
        <Route path="team-padel/contact" element={<ContactPage />} />

        <Route path="privacy" element={<LegalPage kind="privacy" />} />
        <Route path="imprint" element={<LegalPage kind="imprint" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

