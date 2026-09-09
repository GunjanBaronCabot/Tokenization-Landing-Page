import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import inquiryBg from '../assets/inquiry-bg.jpg'
import RevealText from './RevealText.jsx'
import Parallax from './Parallax.jsx'
import InquiryQualifyForm from './InquiryQualifyForm.jsx'

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
  return (
    <section
      id="register"
      className="relative z-40 flex items-center bg-white px-4 py-4 sm:min-h-screen sm:px-6 sm:py-10 lg:px-10 lg:py-16"
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

        <div className="relative z-10 flex flex-col gap-6 p-6 sm:gap-10 sm:p-10 md:flex-row md:items-center md:gap-12 lg:p-16">
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
          <InquiryQualifyForm />
        </div>
      </motion.div>
    </section>
  )
}
