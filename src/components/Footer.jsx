import { useState } from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Instagram, Twitter } from 'lucide-react'
import RevealText from './RevealText.jsx'

const LINK_COLUMNS = [
  { title: 'Company', links: ['Home', 'About', 'Webinar'] },
  { title: 'Resources', links: ['FAQs', 'Blog', 'Case Studies'] },
  { title: 'Legal', links: ['Privacy Policy', 'Terms', 'Contact'] },
]

const SOCIALS = [Linkedin, Instagram, Twitter]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const columnStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const columnRise = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

const linkItem = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const iconPop = {
  hidden: { opacity: 0, scale: 0.4, rotate: -20 },
  show: (i) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.5, delay: 0.6 + i * 0.1, ease: 'backOut' },
  }),
}

export default function Footer() {
  const [wordmarkInView, setWordmarkInView] = useState(false)

  return (
    <footer className="relative bg-white px-4 pb-10 pt-10 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left column */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="rounded-3xl bg-[#F5F6F8] p-8 sm:p-10"
        >
          <h3 className="font-serif text-2xl font-semibold text-navy sm:text-3xl">
            <RevealText text="Join our Monthly Newsletter!" />
          </h3>
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={(e) => e.preventDefault()}
            className="mt-5 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="Email Address"
              className="w-full flex-1 rounded-full border border-navy/10 bg-white px-5 py-3 font-sans text-sm text-navy placeholder-navy/40 outline-none focus:border-navy/30"
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="shrink-0 rounded-full bg-navy px-6 py-3 font-sans text-sm font-bold text-white"
            >
              Subscribe
            </motion.button>
          </motion.form>

          <h4 className="mt-10 font-serif text-xl font-semibold leading-snug text-navy sm:text-2xl">
            <RevealText text="Find everything you need to get started with UK property investment" />
          </h4>

          <motion.div
            variants={columnStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-8 grid grid-cols-3 gap-4"
          >
            {LINK_COLUMNS.map((col) => (
              <motion.div key={col.title} variants={columnRise}>
                <p className="font-sans text-sm font-bold text-navy">{col.title}</p>
                <ul className="mt-3 space-y-2">
                  {col.links.map((link) => (
                    <motion.li key={link} variants={linkItem}>
                      <a
                        href="#"
                        className="font-sans text-sm text-muted transition-colors hover:text-navy"
                      >
                        {link}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right column */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col justify-between rounded-3xl bg-[#F5F6F8] p-8 sm:p-10"
        >
          <div>
          <motion.div
            onViewportEnter={() => setWordmarkInView(true)}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="font-serif text-4xl font-semibold leading-[0.95] text-navy sm:text-5xl">
              {['Baron&', 'Cabot'].map((line, i) => (
                <div key={line} className="overflow-hidden">
                  <motion.div
                    animate={{ y: wordmarkInView ? '0%' : '110%' }}
                    initial={false}
                    transition={{ duration: 0.8, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {line}
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-5 max-w-sm font-sans text-sm leading-relaxed text-muted"
            >
              Baron &amp; Cabot helps investors access UK property through
              traditional ownership and tokenisation — transparent, vetted,
              and built for long-term growth.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 flex items-center justify-between font-sans text-xs text-muted"
          >
            <span>All rights reserved © 2026</span>
            <span>Baron &amp; Cabot</span>
          </motion.div>

          <div className="mt-6 flex gap-3">
            {SOCIALS.map((Icon, i) => (
              <motion.a
                key={i}
                custom={i}
                variants={iconPop}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.6 }}
                whileHover={{ scale: 1.1, rotate: -6 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                aria-label="Social link"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-navy transition-colors hover:bg-navy hover:text-white"
              >
                <Icon size={17} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
