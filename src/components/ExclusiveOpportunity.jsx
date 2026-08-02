import { motion } from 'framer-motion'
import { Check, Compass, TrendingUp } from 'lucide-react'
import Button from './Button.jsx'
import RevealText from './RevealText.jsx'
import StackSection from './StackSection.jsx'
import GradientOrb from './GradientOrb.jsx'
import FloatingBadge from './FloatingBadge.jsx'
import AnimatedStat from './AnimatedStat.jsx'
import OrbitRing from './OrbitRing.jsx'
import exclusiveBg from '../assets/exclusive-opportunity-bg.png'
import TagRibbon from './TagRibbon.jsx'

const contentStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.25 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const LEARN_POINTS = [
  'UK property opportunities',
  'Investment strategies for your goals',
  'Building long-term wealth through property',
  'Income & capital growth potential',
  'Investment risks, timelines & expectations',
]

export default function ExclusiveOpportunity() {
  return (
    <StackSection
      index={3}
      className="relative flex min-h-[100dvh] flex-col items-center justify-start overflow-hidden px-4 pb-4 pt-10 sm:px-6 sm:pb-24 sm:pt-16"
    >
      <img
        src={exclusiveBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      <GradientOrb
        className="left-[-6%] top-[-10%] hidden sm:block"
        color="rgba(96,143,224,0.4)"
        size={360}
        duration={19}
      />
      <GradientOrb
        className="right-[-4%] bottom-[-8%] hidden sm:block"
        color="rgba(58,119,229,0.3)"
        size={320}
        duration={22}
        delay={0.8}
      />

      <FloatingBadge
        icon={Compass}
        label="Research-Driven"
        side="left"
        className="left-6 bottom-2 flex sm:bottom-10 lg:left-10 lg:bottom-14"
      />
      <AnimatedStat
        value={800}
        prefix="£"
        suffix="M+"
        label="UK Property Sold"
        side="right"
        className="right-2 top-2 lg:right-10 lg:top-10"
      />
      <OrbitRing
        icon={TrendingUp}
        className="left-2 top-4 flex lg:left-10 lg:top-16"
      />

      <motion.div
        variants={contentStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 mx-auto mt-28 flex max-w-3xl flex-col items-center text-center sm:mt-0"
      >
        <h2 className="font-serif text-[32px] font-semibold leading-[1.15] text-navy sm:text-[44px] lg:text-[52px]">
          <RevealText text="Complimentary One to One Strategy Session" />
        </h2>

        <div className="mt-2 flex max-w-md flex-col items-start sm:mt-4 sm:max-w-2xl">
          <motion.p
            variants={fadeUp}
            className="font-sans text-lg font-bold text-[#3A77E5] sm:text-2xl"
          >
            What You'll Learn
          </motion.p>

          <motion.ul
            variants={contentStagger}
            className="mt-3 hidden flex-col gap-2 text-left font-sans text-sm leading-relaxed text-muted sm:flex sm:text-base"
          >
            {LEARN_POINTS.map((point) => (
              <motion.li key={point} variants={fadeUp} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#3A77E5]" strokeWidth={2.5} />
                <span>{point}</span>
              </motion.li>
            ))}
          </motion.ul>
          <motion.ul
            variants={contentStagger}
            className="mt-2 flex flex-col gap-1 text-left font-sans text-sm leading-relaxed text-muted sm:hidden"
          >
            {LEARN_POINTS.map((point) => (
              <motion.li key={point} variants={fadeUp} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#3A77E5]" strokeWidth={2.5} />
                <span>{point}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          variants={fadeUp}
          className="mt-2 flex items-center gap-2 rounded-2xl border border-navy/10 bg-transparent px-4 py-2.5 font-serif text-sm font-semibold text-navy shadow-lg sm:mt-8 sm:gap-3 sm:px-6 sm:py-3 sm:text-xl"
        >
          <span>Online</span>
          <span className="text-navy/30">|</span>
          <span>30–45 Minutes</span>
          <span className="text-navy/30">|</span>
          <span>Advance Booking Required</span>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-3 sm:mt-8">
          <Button className="text-base">Register Now</Button>
        </motion.div>
      </motion.div>

        <TagRibbon
              tags={['Global Investors', 'Vetted Deals', 'Passive Income']}
              tone="dark"
              className="inset-x-0 bottom-20 sm:bottom-30 lg:hidden"
            />
    </StackSection>
  )
}
