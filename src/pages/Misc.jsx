import { Button, PageHero, useTitle } from '../components/ui'
import { openLocations, formatAddress } from '../data/locations'

export function NotFound() {
  useTitle('Page not found')
  return (
    <section className="container-x flex min-h-[75vh] flex-col items-center justify-center py-32 text-center">
      <p className="display text-[9rem] leading-none text-lime drop-shadow-[0_4px_0_#27382C]">404</p>
      <h1 className="display mt-2 text-6xl text-forest">Out of bounds</h1>
      <p className="mt-3 max-w-md text-ink/65">That ball went over the fence. Let’s get you back onto the court.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button to="/">Back to home</Button>
        <Button to="/book-play/court-booking" variant="outline">Book a court</Button>
      </div>
    </section>
  )
}

export function LegalPage({ kind }) {
  const isPrivacy = kind === 'privacy'
  useTitle(isPrivacy ? 'Privacy Policy' : 'Legal Notice / Imprint')
  return (
    <>
      <PageHero
        crumbs={[{ label: isPrivacy ? 'Privacy Policy' : 'Legal Notice / Imprint' }]}
        eyebrow="Legal"
        title={isPrivacy ? 'Privacy Policy' : 'Imprint'}
      />
      <section className="container-x py-16 md:py-24">
        <div className="prose-tp max-w-3xl rounded-[28px] bg-white p-8 ring-1 ring-forest/10 sm:p-12">
          {isPrivacy ? (
            <>
              <h2>1. Controller</h2>
              <p>Team Padel GmbH, {formatAddress(openLocations[0].address)}, Germany. Email: info@teampadel.de</p>
              <h2>2. Bookings via Playtomic</h2>
              <p>Court bookings, event registrations and trainer sessions are processed via Playtomic. When you follow a booking link, Playtomic’s privacy policy applies.</p>
              <h2>3. Contact & Inquiry Forms</h2>
              <p>Data submitted through our contact, event inquiry, partnership or location suggestion forms is used solely to process and respond to your request.</p>
              <h2>4. Cookies & Analytics</h2>
              <p>We use essential storage to remember your cookie preferences. Optional analytics and embedded maps/reviews are only loaded with your consent.</p>
            </>
          ) : (
            <>
              <h2>Information according to § 5 TMG</h2>
              <p><strong>Team Padel GmbH</strong><br />{formatAddress(openLocations[0].address)}<br />Germany</p>
              <h3>Represented by</h3>
              <p>Daniel Hoffmann, Sarah Klein (Managing Directors)</p>
              <h3>Contact</h3>
              <p>Phone: {openLocations[0].phone}<br />Email: info@teampadel.de</p>
              <h3>Register entry</h3>
              <p>Commercial register: Amtsgericht Landau in der Pfalz, HRB 00000<br />VAT ID: DE000000000</p>
            </>
          )}
        </div>
      </section>
    </>
  )
}

