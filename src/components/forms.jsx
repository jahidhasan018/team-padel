import { useState } from 'react'
import Icon from './Icon'
import { Button } from './ui'
import { openLocations } from '../data/locations'

const inputCls = 'w-full rounded-2xl border border-forest/15 bg-white px-4 py-3.5 text-[15px] text-ink outline-none transition placeholder:text-ink/35 focus:border-forest focus:ring-4 focus:ring-lime/30 user-invalid:border-[#d9534f]'

export function Field({ label, name, type = 'text', required, placeholder, as, options, className = '', hint }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[13px] font-semibold text-forest">{label}{required && <span className="text-[#c0392b]"> *</span>}</span>
      {as === 'textarea' ? <textarea name={name} required={required} placeholder={placeholder} rows={5} className={inputCls} />
        : as === 'select' ? (
          <select name={name} required={required} className={inputCls} defaultValue="">
            <option value="" disabled>Please choose…</option>
            {options.map((o) => <option key={o}>{o}</option>)}
          </select>
        ) : <input type={type} name={name} required={required} placeholder={placeholder} className={inputCls} />}
      {hint && <span className="mt-1 block text-xs text-ink/50">{hint}</span>}
    </label>
  )
}

export function RadioCards({ label, name, options }) {
  return (
    <fieldset>
      <legend className="mb-2 text-[13px] font-semibold text-forest">{label}</legend>
      <div className="grid gap-2 sm:grid-cols-3">
        {options.map((o) => (
          <label key={o.value} className="relative cursor-pointer">
            <input type="radio" name={name} value={o.value} className="peer sr-only" />
            <span className="flex items-center gap-3 rounded-2xl border border-forest/15 bg-white p-4 transition peer-checked:border-forest peer-checked:bg-forest peer-checked:text-cream peer-focus-visible:ring-4 peer-focus-visible:ring-lime/40">
              <Icon name={o.icon} className="size-5" />
              <span className="text-sm font-semibold">{o.label}</span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export function FileDrop({ label }) {
  const [files, setFiles] = useState([])
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-semibold text-forest">{label}</span>
      <span className="flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed border-forest/20 bg-white/60 px-6 py-8 text-center transition hover:border-forest hover:bg-white">
        <span className="grid size-11 place-items-center rounded-full bg-lime text-forest"><Icon name="upload" /></span>
        <span className="mt-3 text-sm font-semibold text-forest">Drop plans, photos or documents</span>
        <span className="text-xs text-ink/50">PDF, JPG, PNG, DWG · max. 25 MB each</span>
        <input type="file" multiple className="sr-only" onChange={(e) => setFiles([...e.target.files].map((f) => f.name))} />
      </span>
      {!!files.length && <ul className="mt-2 space-y-1">{files.map((f) => <li key={f} className="flex items-center gap-2 text-xs text-forest"><Icon name="file" className="size-4" /> {f}</li>)}</ul>}
    </label>
  )
}

/** Wraps a form with a fake success state (no backend yet) */
export function FormShell({ children, submitLabel = 'Send inquiry', success = 'Thanks! We\'ll get back to you within 2 working days.', dark }) {
  const [sent, setSent] = useState(false)
  if (sent) {
    return (
      <div className={`rounded-3xl p-10 text-center ${dark ? 'bg-cream/5 text-cream' : 'bg-white ring-1 ring-forest/10'}`}>
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-lime text-forest"><Icon name="check" className="size-7" strokeWidth={2.5} /></span>
        <p className="display mt-4 text-5xl text-forest">Message received</p>
        <p className="mt-2 text-ink/65">{success}</p>
        <button onClick={() => setSent(false)} className="mt-5 text-sm font-semibold text-forest underline decoration-lime decoration-2 underline-offset-4">Send another</button>
      </div>
    )
  }
  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); window.scrollBy({ top: -100, behavior: 'smooth' }) }} className="space-y-5">
      {children}
      <label className="flex items-start gap-3 text-[13px] text-ink/65">
        <input type="checkbox" required className="mt-0.5 size-4 accent-[#27382C]" />
        I agree that Team Padel may process my data to answer this inquiry. See our privacy policy.
      </label>
      <Button size="lg" type="submit">{submitLabel}</Button>
    </form>
  )
}

export function ContactForm({ topic }) {
  return (
    <FormShell>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" required placeholder="Jane Doe" />
        <Field label="Email" name="email" type="email" required placeholder="jane@example.com" />
        <Field label="Phone" name="phone" type="tel" placeholder="+49 …" />
        <Field label="Location" name="location" as="select" options={[...openLocations.map((l) => l.short), 'General / not location-specific']} />
      </div>
      {topic !== false && <Field label="Topic" name="topic" as="select" options={topic || ['General question', 'Academy & training', 'Corporate / group event', 'Shop & equipment', 'Partnership', 'Press']} />}
      <Field label="Message" name="message" as="textarea" required placeholder="How can we help?" />
    </FormShell>
  )
}

