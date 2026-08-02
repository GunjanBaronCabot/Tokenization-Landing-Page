import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Globe2, ShieldCheck, Home } from 'lucide-react'
import Button from './Button.jsx'
import RevealText from './RevealText.jsx'
import StackSection from './StackSection.jsx'
import whoSkyscrapers from '../assets/who-skyscrapers.jpg'
import whoHandshake from '../assets/who-handshake.webp'
import whoReviewDetails from '../assets/who-review-details.jpg'
import whoConsultation from '../assets/who-consultation.png'
import pressBbc from '../assets/press-bbc.png'
import pressBloomberg from '../assets/press-bloomberg.png'
import pressCnbc from '../assets/press-cnbc.png'
import pressCnn from '../assets/press-cnn.png'
import pressForbes from '../assets/press-forbes.png'
import pressTheTimes from '../assets/press-the-times.png'
import pressThomson from '../assets/press-thomson.png'
import pressVentures from '../assets/press-ventures.png'

const AUTO_ROTATE_INTERVAL = 3200
const RESUME_AFTER_INTERACTION = 5000

const CARDS = [
  { text: 'Step One: Complete them short application form.', image: whoHandshake, icon: Globe2 },
  {
    text: 'Step Two:  Our team will review your information.',
    image: whoReviewDetails,
    icon: ShieldCheck,
  },
  { text: "Step Three: We'll invite you to a complimentary consultation.", image: whoConsultation, icon: Home },
]

const PRESS_LOGOS = [
  { name: 'BBC', src: pressBbc },
  { name: 'Bloomberg', src: pressBloomberg },
  { name: 'CNBC', src: pressCnbc },
  { name: 'CNN', src: pressCnn },
  { name: 'Forbes', src: pressForbes },
  { name: 'The Times', src: pressTheTimes },
  { name: 'Thomson', src: pressThomson },
  { name: 'Ventures', src: pressVentures },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const cardRise = {
  hidden: { opacity: 0, y: 56, scale: 0.9, rotate: -2 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.15,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.15,
      delayChildren: i * 0.15 + 0.35,
    }, 
  }),
}

const cardTextReveal = {
  hidden: { opacity: 0, y: 14, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: 'easeOut' } },
}

const cardIconPop = {
  hidden: { opacity: 0, scale: 0.4, rotate: -20 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.5, ease: 'backOut' } },
}

export default function WhoThisIsFor() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const cardRefs = useRef([])
  const pausedRef = useRef(false)
  const resumeTimeoutRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  
  const prefersReducedMotion = useReducedMotion()
  const isSectionInView = useInView(sectionRef, { amount: 0.5 })

  useEffect(() => {
    if (prefersReducedMotion || !isSectionInView) return

    const interval = setInterval(() => {
      if (pausedRef.current) return
      setActiveIndex((i) => (i + 1) % CARDS.length)
    }, AUTO_ROTATE_INTERVAL)

    return () => clearInterval(interval)
  }, [prefersReducedMotion, isSectionInView])

  useEffect(() => {
    const container = trackRef.current
    const card = cardRefs.current[activeIndex]
    if (!container || !card) return

    // Scroll only this horizontal strip's own scroll container — never
    // scrollIntoView() here, since it walks every scrollable ancestor
    // (including the page itself) and will yank the whole viewport down
    // to this section even when the user is looking at a different one.
    const targetLeft = card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2
    container.scrollTo({ left: targetLeft, behavior: 'smooth' })
  }, [activeIndex])

  useEffect(() => () => clearTimeout(resumeTimeoutRef.current), [])

  const syncActiveIndexFromScroll = () => {
    const container = trackRef.current
    if (!container) return
    const containerCenter = container.scrollLeft + container.clientWidth / 2
    let closest = 0
    let closestDist = Infinity
    cardRefs.current.forEach((el, i) => {
      if (!el) return
      const cardCenter = el.offsetLeft + el.offsetWidth / 2
      const dist = Math.abs(cardCenter - containerCenter)
      if (dist < closestDist) {
        closestDist = dist
        closest = i
      }
    })
    setActiveIndex(closest)
  }

  const pauseAutoRotate = () => {
    pausedRef.current = true
    clearTimeout(resumeTimeoutRef.current)
  }

  const resumeAutoRotateLater = () => {
    syncActiveIndexFromScroll()
    clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false
    }, RESUME_AFTER_INTERACTION)
  }

  return (
    <StackSection
      index={2}
      className="relative flex min-h-[100dvh] items-start overflow-hidden bg-white px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-14 lg:px-10"
    >
      <img
        src={whoSkyscrapers}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-navy/20" />

      <div
        ref={sectionRef}
        className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8 sm:gap-6 lg:flex-row lg:items-center lg:gap-12"
      >
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          className="flex shrink-0 flex-col lg:w-72"
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wide text-white"
          >
            <motion.span
              className="h-2 w-2 bg-white"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            How It Works
          </motion.div>

          <h2 className="mt-4 font-serif text-[30px] font-semibold leading-[1.15] text-white sm:mt-4 sm:text-[40px] lg:text-[42px]">
           
            <RevealText text="Simple 3 Step Process" />
          </h2>

          <motion.p
            variants={fadeUp}
            className="mt-1 max-w-xs font-sans text-sm leading-relaxed text-white/75 sm:mt-4 sm:text-sm"
          >
            Apply in minutes, we'll review your details, and qualified application will receive an invitation to a complimentary private consultantion.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-4 sm:mt-8">
            <Button className="text-sm">Learn more</Button>
          </motion.div>
        </motion.div>

        <div className="flex flex-col gap-2 sm:contents">
          <div
            ref={trackRef}
            onPointerDown={pauseAutoRotate}
            onPointerUp={resumeAutoRotateLater}
            onTouchStart={pauseAutoRotate}
            onTouchEnd={resumeAutoRotateLater}
            className="flex flex-1 snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:pb-0"
          >
            {CARDS.map(({ text, image, icon: Icon }, i) => (
              <motion.div
                key={text}
                ref={(el) => (cardRefs.current[i] = el)}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardRise}
                whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.3, ease: 'easeOut' } }}
                className="group flex w-[85%] shrink-0 snap-center flex-col overflow-hidden rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-2xl sm:w-auto sm:rounded-2xl"
              >
                <div className="flex min-h-[70px] items-start border-b border-white/10 bg-white/10 p-4 backdrop-blur-md sm:min-h-[90px] sm:p-5">
                  <motion.p
                    variants={cardTextReveal}
                    className="font-serif text-base font-medium leading-snug text-white sm:text-lg"
                  >
                    {text}
                  </motion.p>
                </div>
                <div className="relative min-h-[150px] flex-1 overflow-hidden sm:min-h-[170px]">
                  <img
                    src={image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                  <motion.span
                    variants={cardIconPop}
                    className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-navy shadow-md sm:h-10 sm:w-10"
                  >
                    <Icon size={17} strokeWidth={2.5} />
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-1.5 pt-1 sm:hidden">
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              className="font-sans text-[11px] font-medium text-white/75"
            >
              ← Swipe to see more →
            </motion.span>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-14 z-20 overflow-hidden py-3 sm:bottom-20 sm:py-5">
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/20 to-transparent" />
        <div className="relative flex w-max animate-marquee items-center gap-10 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] sm:gap-16">
          {[...PRESS_LOGOS, ...PRESS_LOGOS].map((logo, i) => (
            <img
              key={`${logo.name}-${i}`}
              src={logo.src}
              alt={logo.name}
              className="h-5 w-auto shrink-0 object-contain opacity-80 brightness-0 invert transition-opacity duration-300 hover:opacity-100 sm:h-7"
            />
          ))}
        </div>
      </div>
    </StackSection>
  )
}
