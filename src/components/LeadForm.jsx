import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ReCAPTCHA from 'react-google-recaptcha'
import { ChevronDown, Download, Loader2 } from 'lucide-react'

const RECAPTCHA_SITE_KEY = '6Ldt0IstAAAAAFVBg6iX2f8GyPtNe8mAhCZs9Oys'
const HUBSPOT_PORTAL_ID = '143628000'
const HUBSPOT_REGION = 'eu1' // matches this account's EU data residency
const MIN_FILL_TIME_MS = 1500 // submitted faster than this to be human -> likely a bot

const PHONE_MAX_DIGITS = 15
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const THANK_YOU_ACCESS_KEY = 'bc_thank_you_access'

const CAPITAL_OPTIONS = [
  'More than £20,000',
  'More than £40,000',
  'More than £60,000',
  'More than £80,000',
  'More than £100,000',
  'More than £150,000',
]

const TIMELINE_OPTIONS = [
  'Now',
  '1-2 months',
  '2-6 months',
  '6-12 months',
  '12-24 months',
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

/**
 * Shared HubSpot lead-capture form. Submits straight to HubSpot's public
 * forms submission API from the browser - no backend involved. The
 * reCAPTCHA widget still gates the submit button as a basic bot deterrent,
 * but (since verifying it requires a secret key that can't live in
 * browser JS) it isn't verified server-side; combined with a honeypot
 * field and a minimum fill-time check for lightweight spam filtering.
 * Reused by both the main inquiry section and the brochure-download
 * modal - only the target formId and surrounding copy differ between them.
 */
export default function LeadForm({
  formId,
  title,
  description,
  submitLabel = 'Submit Inquiry',
  submittingLabel = 'Submitting…',
  successTitle = 'Thank you!',
  successMessage = "We've received your inquiry and will be in touch shortly.",
  downloadUrl,
  downloadLabel = 'Download Now',
  thankYouKey,
  showInvestmentFields = true,
  extraFields = {},
  className = 'w-full max-w-md rounded-2xl border border-white/10 bg-navy/40 p-4 backdrop-blur-xl sm:p-5',
}) {
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [validationError, setValidationError] = useState('')
  const [captchaToken, setCaptchaToken] = useState(null)
  const [honeypot, setHoneypot] = useState('')
  const recaptchaRef = useRef(null)
  const formLoadedAtRef = useRef(Date.now())

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setValidationError('')
  }

  const handlePhoneChange = (e) => {
    const raw = e.target.value
    const hasLeadingPlus = raw.trimStart().startsWith('+')
    const digits = raw.replace(/\D/g, '').slice(0, PHONE_MAX_DIGITS)
    setForm((f) => ({ ...f, phone: `${hasLeadingPlus ? '+' : ''}${digits}` }))
    setValidationError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!import.meta.env.DEV && !captchaToken) return
    if (honeypot) return // hidden field only a bot would fill in
    if (Date.now() - formLoadedAtRef.current < MIN_FILL_TIME_MS) return // too fast to be a human

    if (!EMAIL_PATTERN.test(form.email)) {
      setValidationError('Please enter a valid email address.')
      return
    }
    setValidationError('')

    setStatus('submitting')

    const hutk = getHubspotTrackingCookie()

    try {
      const res = await fetch(
        `https://api-${HUBSPOT_REGION}.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${formId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: [
              ...Object.entries(form)
                .filter(
                  ([name]) =>
                    showInvestmentFields ||
                    !['what_capital_are_you_looking_to_invest', 'when_do_you_want_to_invest'].includes(name)
                )
                .map(([name, value]) => ({ name, value })),
              ...Object.entries(extraFields).map(([name, value]) => ({ name, value })),
            ],
            context: {
              pageUri: window.location.href,
              pageName: document.title,
              ...(hutk ? { hutk } : {}),
            },
          }),
        }
      )

      if (!res.ok) throw new Error(`Lead submission failed: ${res.status}`)

      if (thankYouKey) {
        sessionStorage.setItem(THANK_YOU_ACCESS_KEY, thankYouKey)
        window.location.href = `${import.meta.env.BASE_URL}?thank_you=${thankYouKey}`
        return
      }

      setStatus('success')
      setForm(emptyForm)
    } catch (err) {
      console.error(err)
      setStatus('error')
    } finally {
      recaptchaRef.current?.reset()
      setCaptchaToken(null)
    }
  }

  return (
    <motion.form
      variants={formStagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      onSubmit={handleSubmit}
      className={className}
    >
      {/* Honeypot: hidden from real users, bots that auto-fill every field trip this. */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
      />

      {status === 'success' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-10 text-center"
        >
          <p className="font-serif text-lg font-semibold text-white">{successTitle}</p>
          <div className="mt-2 font-sans text-sm leading-relaxed text-white/70">{successMessage}</div>

          {downloadUrl && (
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-3 rounded-full bg-white py-2.5 pl-6 pr-2.5 font-sans text-sm font-bold text-navy transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              {downloadLabel}
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-white">
                <Download size={15} strokeWidth={2.5} />
              </span>
            </a>
          )}
        </motion.div>
      ) : (
        <>
          {(title || description) && (
            <motion.div variants={fieldRise} className="mb-3 pr-10">
              {title && <p className="font-serif text-lg font-semibold text-white sm:text-xl">{title}</p>}
              {description && <p className="mt-1 font-sans text-sm text-white/70">{description}</p>}
            </motion.div>
          )}

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
                inputMode="tel"
                name="phone"
                value={form.phone}
                onChange={handlePhoneChange}
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

          {showInvestmentFields && (
            <>
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
            </>
          )}

          {!import.meta.env.DEV && (
            <motion.div variants={fieldRise} className="mt-3 flex justify-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={RECAPTCHA_SITE_KEY}
                theme="dark"
                onChange={setCaptchaToken}
                onExpired={() => setCaptchaToken(null)}
              />
            </motion.div>
          )}

          {validationError && (
            <p className="mt-2.5 font-sans text-xs font-medium text-red-300">{validationError}</p>
          )}

          {status === 'error' && (
            <p className="mt-2.5 font-sans text-xs font-medium text-red-300">
              Something went wrong submitting your details. Please try again.
            </p>
          )}

          <motion.button
            variants={fieldRise}
            whileHover={{ scale: status === 'submitting' || (!import.meta.env.DEV && !captchaToken) ? 1 : 1.02 }}
            whileTap={{ scale: status === 'submitting' || (!import.meta.env.DEV && !captchaToken) ? 1 : 0.98 }}
            type="submit"
            disabled={status === 'submitting' || (!import.meta.env.DEV && !captchaToken)}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-white py-2.5 font-sans text-sm font-bold text-navy disabled:opacity-70"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                {submittingLabel}
              </>
            ) : (
              submitLabel
            )}
          </motion.button>
        </>
      )}
    </motion.form>
  )
}
