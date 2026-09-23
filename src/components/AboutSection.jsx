import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import RevealText from './RevealText.jsx'
import Parallax from './Parallax.jsx'
import useCountUp from './useCountUp.js'
import aboutGlassTower from '../assets/about-glass-tower.jpg'
import aboutSkyline from '../assets/about-skyline.jpg'

const STATS = [
  { prefix: '£', target: 800, suffix: 'M+', label: 'UK Property Sold' },
  { prefix: '', target: 122, suffix: '-Pt.', label: 'Due Diligence' },
  { prefix: '', target: 12000, suffix: '+', label: 'UK Investment Opportunities' },
]

const cardRise = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

function StatNumber({ prefix, target, suffix }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const display = useCountUp(target, isInView, { from: 1, duration: 0.5 })

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-[100svh] flex-col items-center justify-center bg-white px-4 py-8 sm:px-6 sm:py-20 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-serif text-[32px] font-semibold leading-[1.15] text-navy sm:text-[48px] lg:text-[64px]">
          <RevealText text="About Baron & Cabot" />
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-14 sm:gap-6 lg:grid-cols-5">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardRise}
            className="relative min-h-[190px] overflow-hidden rounded-2xl shadow-xl sm:min-h-[220px] sm:rounded-3xl lg:col-span-2 lg:min-h-[320px]"
          >
            <Parallax speed={0.1} className="absolute inset-0">
              <img
                src={aboutGlassTower}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full scale-110 object-cover"
              />
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/30 to-transparent" />

            <div className="relative z-10 flex h-full flex-col justify-end gap-2.5 p-5 sm:gap-5 sm:p-8">
              {STATS.map(({ prefix, target, suffix, label }) => (
                <div key={label}>
                  <p className="font-serif text-xl font-bold text-white sm:text-2xl lg:text-3xl">
                    <StatNumber prefix={prefix} target={target} suffix={suffix} />
                  </p>
                  <p className="font-sans text-sm text-white/75 sm:mt-1 sm:text-sm">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardRise}
            transition={{ delay: 0.15 }}
            className="relative min-h-[220px] overflow-hidden rounded-2xl shadow-xl sm:min-h-[220px] sm:rounded-3xl lg:col-span-3 lg:min-h-[320px]"
          >
            <Parallax speed={0.08} className="absolute inset-0">
              <img
                src={aboutSkyline}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full scale-110 object-cover"
              />
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/25 to-navy/40" />

            <div className="relative z-10 flex h-full flex-col justify-between gap-2 p-4 sm:gap-8 sm:p-8">
              <p className="max-w-xl font-sans text-sm leading-relaxed text-white/90 sm:text-base">
                Baron & Cabot is a global UK property investment company
                helping investors build wealth through carefully selected
                real estate opportunities.
                <br />
                <br />
                Backed by expert research, rigorous due diligence, and
                end-to-end support, we make investing in UK property simple,
                transparent, and secure. Book your complimentary consultation
                and discover the investment opportunities that best match
                your goals.
              </p>

              <a
                href="#register"
                className="inline-flex w-fit items-center gap-3 self-end rounded-full bg-white py-1.5 pl-5 pr-1.5 font-sans text-sm font-semibold text-navy shadow-lg transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] sm:gap-4 sm:py-1.5 sm:pl-6 sm:pr-1.5 sm:text-sm"
              >
                Learn more
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-white sm:h-8 sm:w-8">
                  <ArrowRight size={15} strokeWidth={2.5} className="sm:hidden" />
                  <ArrowRight size={16} strokeWidth={2.5} className="hidden sm:block" />
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
