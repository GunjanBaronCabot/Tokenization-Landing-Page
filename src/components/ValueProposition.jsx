import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Button from './Button.jsx'
import StackSection from './StackSection.jsx'
import AnimatedStat from './AnimatedStat.jsx'
import OrbitRing from './OrbitRing.jsx'
import TagRibbon from './TagRibbon.jsx'
import exclusiveBg from '../assets/exclusive-opportunity-bg.jpg'

const HEADING_WORDS = [
  { word: 'The', accent: true },
  { word: 'First' },
  { word: 'Step' },
  { word: 'to' },
  { word: 'Smarter', accent: true },
  { word: 'Property', accent: true },
  { word: 'Investing', accent: true },
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
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white to-transparent sm:h-28" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent sm:h-28" />

      <AnimatedStat
        value={122}
        suffix="-Point"
        label="Due Diligence"
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
          Before you invest, get expert guidance on the UK property market,
          understand your opportunities, and build a strategy tailored to
          your goals.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-3 flex items-center gap-2.5 rounded-2xl border border-navy/10 bg-transparent px-5 py-3 font-sans text-sm font-semibold text-navy shadow-lg sm:mt-4 sm:gap-3 sm:px-6 sm:py-3 sm:text-base"
        >
          <span>Online One to One Consultation</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-4 sm:mt-6"
        >
          <Button className="text-sm sm:text-base">Schedule Your Clarity Call</Button>
        </motion.div>
      </div>

      <TagRibbon
        tags={['Global Investors', 'Vetted Deals', 'Passive Income']}
        tone="dark"
        className="inset-x-0 bottom-20 sm:bottom-30 lg:hidden"
      />
    </StackSection>
  )
}
