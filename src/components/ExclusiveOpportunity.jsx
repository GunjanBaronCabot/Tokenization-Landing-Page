import { motion } from 'framer-motion'
import { Compass, TrendingUp } from 'lucide-react'
import Button from './Button.jsx'
import RevealText from './RevealText.jsx'
import StackSection from './StackSection.jsx'
import GradientOrb from './GradientOrb.jsx'
import PropertyGallery from './PropertyGallery.jsx'
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

export default function ExclusiveOpportunity() {
  return (
    <StackSection
      index={3}
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 py-8 sm:px-6 sm:py-24"
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
        className="left-6 bottom-10 flex lg:left-10 lg:bottom-14"
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
        className="left-2 top-12 flex lg:left-10 lg:top-16"
      />

      <motion.div
        variants={contentStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <h2 className="font-serif text-[32px] font-semibold leading-[1.15] text-navy sm:text-[44px] lg:text-[52px]">
          <RevealText text="Exclusive UK Property Opportunity" />
        </h2>

        <motion.p
          variants={fadeUp}
          className="mt-4 font-sans text-lg font-bold text-[#3A77E5] sm:mt-4 sm:text-2xl"
        >
          Start Investing From&nbsp;£20,000
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mt-3 hidden max-w-2xl font-sans text-sm leading-relaxed text-muted sm:block sm:text-base"
        >
          Join us for an <strong className="font-semibold text-navy">exclusive webinar</strong> for
          serious investors exploring UK property through tokenisation, using
          Great Hampton Street Button Works, Birmingham as a live case study.{' '}
          <strong className="font-semibold text-navy">Tokenisation</strong> can help make your
          property investment dreams a reality. You don't need to pay the
          full amount with a small budget, you can start investing in UK
          property today.
        </motion.p>
        <motion.p
          variants={fadeUp}
          className="mt-3 max-w-md font-sans text-sm leading-relaxed text-muted sm:hidden"
        >
          Join our exclusive webinar on UK property tokenisation — start
          investing from just £20,000.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-4 flex items-center gap-2 rounded-2xl border border-navy/10 bg-transparent px-4 py-2.5 font-serif text-sm font-semibold text-navy shadow-lg sm:mt-8 sm:gap-3 sm:px-6 sm:py-3 sm:text-xl"
        >
          <span>28 July</span>
          <span className="text-navy/30">|</span>
          <span>1 PM UAE</span>
          <span className="text-navy/30">|</span>
          <span>Online</span>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-4 sm:mt-8">
          <Button className="text-base">Register Now</Button>
        </motion.div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 mx-auto flex justify-center"
      >
        {/* <PropertyGallery /> */}

      </motion.div>
        <TagRibbon
              tags={['Global Investors', 'Vetted Deals', 'Passive Income', 'Tokenised Assets']}
              tone="dark"
              className="inset-x-0 bottom-20 sm:bottom-30 lg:hidden"
            />
    </StackSection>
  )
}
