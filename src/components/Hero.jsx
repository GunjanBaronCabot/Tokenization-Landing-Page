import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Header from './Header.jsx'
import Button from './Button.jsx'
import ScrollGrowVideo from './ScrollGrowVideo.jsx'
import GradientOrb from './GradientOrb.jsx'
import heroBanner from '../assets/hero-banner.jpg'

const contentStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.35 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function Hero() {
  const frameRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['start start', 'end start'],
  })

  const rawBgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const rawBgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  const bgY = prefersReducedMotion ? '0%' : rawBgY
  const bgScale = prefersReducedMotion ? 1 : rawBgScale

  return (
    <section className="relative overflow-x-hidden bg-navy pt-0">
      <Header />

      <div ref={frameRef} className="relative min-h-[100dvh] overflow-hidden">
        <motion.img
          src={heroBanner}
          alt=""
          fetchPriority="high"
          decoding="async"
          style={{ y: bgY, scale: bgScale }}
          className="absolute inset-0 h-full w-full object-cover object-[center_20%] will-change-transform"
        />

        <GradientOrb
          className="left-[6%] top-[8%] hidden sm:block"
          color="rgba(255,255,255,0.28)"
          size={320}
          duration={16}
        />
        <GradientOrb
          className="right-[4%] top-[38%] hidden sm:block"
          color="rgba(58,119,229,0.32)"
          size={380}
          duration={20}
          delay={1.2}
        />
        <GradientOrb
          className="left-[18%] bottom-[8%] hidden sm:block"
          color="rgba(255,255,255,0.22)"
          size={280}
          duration={14}
          delay={0.6}
        />

        <motion.div
          variants={contentStagger}
          initial="hidden"
          animate="show"
          className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 pt-24 text-center sm:pt-32 lg:pt-36"
        >
          <motion.h1
            variants={fadeUp}
            className="font-serif text-[26px] font-semibold leading-[1.15] tracking-[-0.01em] text-white sm:text-[36px] lg:text-[46px] lg:leading-[1.15]"
          >
            Apply For A Private Investment Consultation
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-xl font-sans text-xs font-medium leading-relaxed text-white sm:text-base"
          >
            Speak directly with an experienced UK property investment
            consultant and discover how the right strategy could help you
            achieve your financial goals.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-3 flex items-center gap-2 rounded-2xl border border-white/40 bg-white/20 px-4 py-3 font-sans text-xs font-semibold text-white shadow-lg backdrop-blur-md sm:mt-6 sm:gap-4 sm:px-8 sm:py-5 sm:text-sm"
          >
            <span>Choose Your Preferred Date</span>
            <span className="text-white/30">|</span>
            <span>Online One-to-One Consultation</span>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.9 }}
            className="mt-5"
          >
            <Button className="text-sm">Book Your Free Strategy Session</Button>
          </motion.div>
        </motion.div>

        <ScrollGrowVideo />

        <svg
          aria-hidden="true"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 w-full sm:h-24 lg:h-32"
        >
          <path
            d="M0,0 C480,160 960,160 1440,0 L1440,200 L0,200 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  )
}
