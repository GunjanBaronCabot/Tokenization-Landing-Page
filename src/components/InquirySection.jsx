import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ChevronDown, Loader2 } from 'lucide-react'
import inquiryBg from '../assets/inquiry-bg.jpg'
import RevealText from './RevealText.jsx'
import Parallax from './Parallax.jsx'

const HUBSPOT_PORTAL_ID = '143628000'
const HUBSPOT_FORM_ID = '8c5eca90-cd71-468f-96d4-4d3536a5d721'
const HUBSPOT_ENDPOINT = `https://api-eu1.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`

const CAPITAL_OPTIONS = [
  'More than £20,000',
  'More than £40,000',
  'More than £60,000',
  'More than £80,000',
  'More than £100,000',
  'More than £150,000',
  'Less than £40,000',
]

const TIMELINE_OPTIONS = [
  'Now',
  '1-2 months',
  '2-6 months',
  '6-12 months',
  '12-124 months',
  '24 months+',
  'Not looking to invest',
]

const fieldClass =
  'w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 font-sans text-sm text-white placeholder-white/40 outline-none backdrop-blur-sm transition-colors focus:border-white/40 focus:bg-white/10'

const labelClass = 'mb-1 block font-sans text-xs font-semibold text-white/70'

const formStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
}

const fieldRise = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const starPop = {
  hidden: { opacity: 0, scale: 0, rotate: -30 },
  show: (i) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.4, delay: 0.5 + i * 0.08, ease: 'backOut' },
  }),
}

const emptyForm = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  country: '',
  what_capital_are_you_looking_to_invest: '',
  when_do_you_want_to_invest: '',
}

function getHubspotTrackingCookie() {
  const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/)
  return match ? match[1] : null
}

export default function InquirySection() {
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')

    const hutk = getHubspotTrackingCookie()

    try {
      const res = await fetch(HUBSPOT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: Object.entries(form).map(([name, value]) => ({ name, value })),
          context: {
            pageUri: window.location.href,
            pageName: document.title,
            ...(hutk ? { hutk } : {}),
          },
        }),
      })

      if (!res.ok) throw new Error(`HubSpot submission failed: ${res.status}`)

      setStatus('success')
      setForm(emptyForm)
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <section
      id="register"
      className="relative z-40 flex items-center bg-white px-4 py-4 sm:min-h-screen sm:px-6 sm:py-6 lg:px-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-3xl shadow-2xl"
      >
        <Parallax speed={0.08} className="absolute inset-0">
          <img src={inquiryBg} alt="" loading="lazy" decoding="async" className="h-full w-full scale-110 object-cover" />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-navy/30" />

        <div className="relative z-10 flex flex-col gap-4 p-4 sm:gap-6 sm:p-6 md:flex-row md:items-center md:gap-8 lg:p-10">
          {/* Left: heading + copy + reviews */}
          <div className="flex-1">
            <motion.span
              initial={{ opacity: 0, scale: 0.85, y: -8 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, ease: 'backOut' }}
              className="inline-block rounded-full border border-white/25 bg-white/10 px-4 py-1.5 font-sans text-xs font-semibold tracking-wide text-white backdrop-blur-sm"
            >
              BARON &amp; CABOT
            </motion.span>

            <h2 className="mt-3 font-serif text-[22px] font-semibold leading-[1.1] text-white sm:text-[30px] lg:text-[38px]">
              <RevealText text="Start Your Property Journey Today" />
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              className="mt-2 hidden max-w-md font-sans text-sm leading-relaxed text-white/75 sm:block sm:text-base"
            >
              Tell us a little about what you're looking for, and our team will
              help you find the right UK property opportunity.
            </motion.p>

            <div className="mt-4">
              <div className="flex items-center gap-1.5">
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.4, delay: 0.45 }}
                  className="font-sans text-sm font-bold text-white"
                >
                  Excellent
                </motion.span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={starPop}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.6 }}
                      className="flex h-4 w-4 items-center justify-center bg-[#00b67a]"
                    >
                      <Star size={9} className="text-white" fill="currentColor" strokeWidth={0} />
                    </motion.span>
                  ))}
                </div>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="font-sans text-xs text-white/60"
              >
                200+ Reviews on Trustpilot
              </motion.p>
            </div>
          </div>

          {/* Right: form card */}
          <motion.form
            variants={formStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            onSubmit={handleSubmit}
            className="w-full max-w-md rounded-2xl border border-white/10 bg-navy/40 p-4 backdrop-blur-xl sm:p-5"
          >
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <p className="font-serif text-lg font-semibold text-white">Thank you!</p>
                <p className="mt-2 font-sans text-sm text-white/70">
                  We've received your inquiry and will be in touch shortly.
                </p>
              </motion.div>
            ) : (
              <>
                <motion.div variants={fieldRise} className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>First Name*</label>
                    <input
                      required
                      type="text"
                      name="firstname"
                      value={form.firstname}
                      onChange={handleChange}
                      placeholder="Jane"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name*</label>
                    <input
                      required
                      type="text"
                      name="lastname"
                      value={form.lastname}
                      onChange={handleChange}
                      placeholder="Smith"
                      className={fieldClass}
                    />
                  </div>
                </motion.div>

                <motion.div variants={fieldRise} className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Email*</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@email.com"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Phone Number*</label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+44 7000 000000"
                      className={fieldClass}
                    />
                  </div>
                </motion.div>

                <motion.div variants={fieldRise} className="mt-2.5">
                  <label className={labelClass}>Country/Region</label>
                  <input
                    type="text"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    placeholder="United Kingdom"
                    className={fieldClass}
                  />
                </motion.div>

                <motion.div variants={fieldRise} className="mt-2.5">
                  <label className={labelClass}>What capital are you looking to invest?*</label>
                  <div className="relative">
                    <select
                      required
                      name="what_capital_are_you_looking_to_invest"
                      value={form.what_capital_are_you_looking_to_invest}
                      onChange={handleChange}
                      className={`${fieldClass} appearance-none pr-9`}
                    >
                      <option value="" disabled className="text-navy">
                        Please Select
                      </option>
                      {CAPITAL_OPTIONS.map((c) => (
                        <option key={c} value={c} className="text-navy">
                          {c}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50" />
                  </div>
                </motion.div>

                <motion.div variants={fieldRise} className="mt-2.5">
                  <label className={labelClass}>When do you want to invest?*</label>
                  <div className="relative">
                    <select
                      required
                      name="when_do_you_want_to_invest"
                      value={form.when_do_you_want_to_invest}
                      onChange={handleChange}
                      className={`${fieldClass} appearance-none pr-9`}
                    >
                      <option value="" disabled className="text-navy">
                        Please Select
                      </option>
                      {TIMELINE_OPTIONS.map((t) => (
                        <option key={t} value={t} className="text-navy">
                          {t}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50" />
                  </div>
                </motion.div>

                {status === 'error' && (
                  <p className="mt-2.5 font-sans text-xs font-medium text-red-300">
                    Something went wrong submitting your inquiry. Please try again.
                  </p>
                )}

                <motion.button
                  variants={fieldRise}
                  whileHover={{ scale: status === 'submitting' ? 1 : 1.02 }}
                  whileTap={{ scale: status === 'submitting' ? 1 : 0.98 }}
                  type="submit"
                  disabled={status === 'submitting'}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-white py-2.5 font-sans text-sm font-bold text-navy disabled:opacity-70"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    'Submit Inquiry'
                  )}
                </motion.button>
              </>
            )}
          </motion.form>
        </div>
      </motion.div>
    </section>
  )
}
