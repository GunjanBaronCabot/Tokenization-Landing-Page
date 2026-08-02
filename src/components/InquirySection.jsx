import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ChevronDown } from 'lucide-react'
import inquiryBg from '../assets/inquiry-bg.jpg'
import RevealText from './RevealText.jsx'
import Parallax from './Parallax.jsx'

const INTERESTS = [
  'Residential Property',
  'Commercial Property',
  'Buy-to-Let',
  'Portfolio Diversification',
  'Passive Income',
]

const BUDGETS = ['£20k – £50k', '£50k – £100k', '£100k – £250k', '£250k+']
const TIMELINES = ['Immediately', '1 – 3 months', '3 – 6 months', '6 – 12 months', 'Just exploring']

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

export default function InquirySection() {
  const [selected, setSelected] = useState([])

  const toggle = (item) =>
    setSelected((s) => (s.includes(item) ? s.filter((x) => x !== item) : [...s, item]))

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
          <img src={inquiryBg} alt="" className="h-full w-full scale-110 object-cover" />
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
            onSubmit={(e) => e.preventDefault()}
            className="w-full max-w-md rounded-2xl border border-white/10 bg-navy/40 p-4 backdrop-blur-xl sm:p-5"
          >
            <motion.div variants={fieldRise}>
              <label className={labelClass}>Full Name*</label>
              <input required type="text" placeholder="Jane Smith" className={fieldClass} />
            </motion.div>

            <motion.div variants={fieldRise} className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Email Address*</label>
                <input required type="email" placeholder="jane@email.com" className={fieldClass} />
              </div>
              <div>
                <label className={labelClass}>Phone Number</label>
                <input type="tel" placeholder="+44 7000 000000" className={fieldClass} />
              </div>
            </motion.div>

            <motion.div variants={fieldRise} className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Investment Budget*</label>
                <div className="relative">
                  <select required defaultValue="" className={`${fieldClass} appearance-none pr-9`}>
                    <option value="" disabled className="text-navy">
                      Select budget…
                    </option>
                    {BUDGETS.map((b) => (
                      <option key={b} value={b} className="text-navy">
                        {b}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50" />
                </div>
              </div>
              <div>
                <label className={labelClass}>Timeline</label>
                <div className="relative">
                  <select defaultValue="" className={`${fieldClass} appearance-none pr-9`}>
                    <option value="" disabled className="text-navy">
                      Select timeline…
                    </option>
                    {TIMELINES.map((t) => (
                      <option key={t} value={t} className="text-navy">
                        {t}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50" />
                </div>
              </div>
            </motion.div>

            <motion.div variants={fieldRise} className="mt-2.5">
              <label className={labelClass}>What are you interested in?</label>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 sm:grid-cols-3">
                {INTERESTS.map((item, i) => (
                  <motion.label
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.05 }}
                    className="flex cursor-pointer items-center gap-1.5 font-sans text-xs text-white/85"
                  >
                    <input
                      type="checkbox"
                      checked={selected.includes(item)}
                      onChange={() => toggle(item)}
                      className="h-3.5 w-3.5 shrink-0 rounded border-white/30 bg-white/5 accent-white"
                    />
                    {item}
                  </motion.label>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fieldRise} className="mt-2.5 hidden sm:block">
              <label className={labelClass}>Message</label>
              <textarea
                rows={2}
                placeholder="Tell us about your investment goals…"
                className={`${fieldClass} resize-none`}
              />
            </motion.div>

            <motion.button
              variants={fieldRise}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="mt-3 w-full rounded-full bg-white py-2.5 font-sans text-sm font-bold text-navy"
            >
              Submit Inquiry
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  )
}
