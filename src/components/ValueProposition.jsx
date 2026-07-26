import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Button from './Button.jsx'
import StackSection from './StackSection.jsx'
import AnimatedStat from './AnimatedStat.jsx'
import OrbitRing from './OrbitRing.jsx'
import TagRibbon from './TagRibbon.jsx'
import exclusiveBg from '../assets/exclusive-opportunity-bg.png'

const HEADING_WORDS = [
  { word: 'Tokenisation', accent: true },
  { word: 'Has' },
  { word: 'Made' },
  { word: 'It' },
  { word: 'Easier', accent: true },
  { word: 'Than' },
  { word: 'Ever' },
  { word: 'to' },
  { word: 'Invest' },
  { word: 'in' },
  { word: 'UK', accent: true },
  { word: 'Property', accent: true },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
}

const wordVariant = {
  hidden: { opacity: 0.001, filter: 'blur(10px)', y: 10 },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function ValueProposition() {
  return (
    <StackSection
      index={1}
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-white px-4 py-4 sm:px-6 sm:py-20"
    >
      <img
        src={exclusiveBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white to-transparent sm:h-28" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent sm:h-28" />

      <AnimatedStat
        value={20000}
        prefix="£"
        label="Minimum Investment"
        side="left"
        transparent
        className="left-2 top-2 lg:left-8 lg:top-8"
      />
      <OrbitRing
        icon={Sparkles}
        className="right-3 top-3 lg:right-10 lg:top-10"
      />

      <div className="relative z-10 mx-auto -mt-8 flex max-w-4xl flex-col items-center text-center sm:-mt-14 lg:-mt-20">
        <motion.h2
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="font-serif text-[30px] font-semibold leading-[1.2] tracking-[-0.015em] sm:text-[36px] sm:leading-[1.15] lg:text-[52px] lg:leading-[1.15]"
        >
          {HEADING_WORDS.map(({ word, accent }, i) => (
            <Fragment key={`${word}-${i}`}>
              <motion.span
                variants={wordVariant}
                style={{ color: accent ? '#101E33' : '#595959' }}
                className="inline-block will-change-transform"
              >
                {word}
              </motion.span>
              {i < HEADING_WORDS.length - 1 ? ' ' : ''}
            </Fragment>
          ))}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-3 max-w-2xl font-sans text-base font-medium leading-relaxed text-muted sm:mt-4 sm:text-base sm:leading-relaxed lg:text-lg"
        >
          No more heavy deposits or complex ownership structures just a simple,
          transparent way in. Join us in the webinar and we'll walk you
          through exactly how it works.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-3 flex items-center gap-2.5 rounded-2xl border border-navy/10 bg-transparent px-5 py-3 font-sans text-sm font-semibold text-navy shadow-lg sm:mt-4 sm:gap-3 sm:px-6 sm:py-3 sm:text-base"
        >
          <span>23 July 2026</span>
          <span className="text-navy/30">|</span>
          <span>1 PM GST (UAE)</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-4 sm:mt-6"
        >
          <Button className="text-sm sm:text-base">Register for the event now</Button>
        </motion.div>
      </div>

      <TagRibbon
        tags={['Global Investors', 'Vetted Deals', 'Passive Income', 'Tokenised Assets']}
        tone="dark"
        className="inset-x-0 bottom-20 sm:bottom-30 lg:hidden"
      />
    </StackSection>
  )
}
