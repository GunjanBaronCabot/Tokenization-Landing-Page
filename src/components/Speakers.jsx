import { motion } from 'framer-motion'
import { Award, Compass, Star } from 'lucide-react'
import RevealText from './RevealText.jsx'
import FloatingBadge from './FloatingBadge.jsx'
import AvatarCluster from './AvatarCluster.jsx'
import speakerMark from '../assets/speaker-mark-pearson.jpg'
import speakerTom from '../assets/speaker-tom-hepworth.jpg'
import speakersSky from '../assets/speakers-tower-bridge-2.jpg'

const SPEAKERS = [
  { name: 'Mark Pearson', role: 'Managing Partner', image: speakerMark },
  { name: 'Tom Hepworth', role: 'Associate Director', image: speakerTom },
]

const starPop = {
  hidden: { opacity: 0, scale: 0, rotate: -30 },
  show: (i) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.4, delay: 0.5 + i * 0.08, ease: 'backOut' },
  }),
}

const cardRise = {
  hidden: { opacity: 0, y: 32 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Speakers() {
  return (
    <section
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-white px-4 py-8 sm:px-6 sm:py-20"
    >
      <img
        src={speakersSky}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-white/10" />

      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent sm:h-28" />

      <FloatingBadge
         icon={Compass}
        label="Industry Experts"
        side="left"
        accent="blue"
        className="left-2 top-10 flex lg:hidden"
      />
      {/* <AvatarCluster
        rating="4.9"
        caption="200+ attendees"
        className="right-2 bottom-2 lg:hidden"
      /> */}

      <div className="absolute bottom-20 right-4 z-10 flex items-center gap-1.5 sm:bottom-6 sm:right-6 lg:bottom-10 lg:right-10">
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

      <div className="relative z-10 mx-auto -mt-8 flex max-w-4xl flex-col items-center text-center sm:-mt-14 lg:-mt-20">
        <h2 className="font-serif text-[30px] font-semibold text-white sm:text-[40px] lg:text-[48px]">
          <RevealText text="Experts Behind Baron & Cabot" />
        </h2>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
          className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 font-sans text-xs font-semibold text-white shadow-lg backdrop-blur-md sm:mt-6 sm:gap-x-3 sm:px-6 sm:py-3 sm:text-sm"
        >
          <span>Private Consultation</span>
          <span className="text-white/30">|</span>
          <span>Advice & Guidance</span>
          <span className="text-white/30">|</span>
          <span>Tailored Recommendations</span>
          <span className="text-white/30">|</span>
          <span>Comprehensive ROI Forecasts</span>
        </motion.div>

        <div className="mt-4 flex flex-row justify-center gap-6 sm:mt-12 sm:gap-14">
          {SPEAKERS.map(({ name, role, image }, i) => (
            <motion.div
              key={name}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={cardRise}
              className="flex flex-col items-center gap-2 sm:gap-4"
            >
              <div className="group relative h-44 w-36 shrink-0 overflow-hidden rounded-2xl shadow-xl sm:h-60 sm:w-48 lg:h-80 lg:w-64">
                <img
                  src={image}
                  alt={name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full scale-105 object-cover transition-transform duration-500 ease-out group-hover:scale-[1.18]"
                />
              </div>
              <p className="font-serif text-lg font-semibold text-white sm:text-xl">{name}</p>
              <p className="-mt-1 font-sans text-sm text-white sm:-mt-2 sm:text-sm">{role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
