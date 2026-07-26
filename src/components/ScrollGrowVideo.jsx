import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const GROW_DISTANCE = 420

export default function ScrollGrowVideo() {
  const [hasEntered, setHasEntered] = useState(false)

  // Driven by absolute page scroll (not the video's own position) so it
  // always starts small at the very top of the page, regardless of how
  // tall the hero content above it happens to be on a given screen size.
  const { scrollY } = useScroll()

  const width = useTransform(scrollY, [0, GROW_DISTANCE], ['58%', '100%'], {
    clamp: true,
  })
  const radius = useTransform(scrollY, [0, GROW_DISTANCE], [24, 0], {
    clamp: true,
  })

  return (
    <section className="relative z-10 mt-5 flex justify-center px-4 pb-20 sm:mt-6 sm:pb-28 lg:mt-8 lg:pb-40">
      <motion.div
        style={{ width, borderRadius: radius }}
        onViewportEnter={() => setHasEntered(true)}
        viewport={{ once: true, amount: 0.1 }}
        className="aspect-[9/16] max-w-6xl overflow-hidden bg-black shadow-2xl sm:aspect-video"
      >
        {hasEntered && (
          <>
            <motion.video
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="h-full w-full object-cover sm:hidden"
              src="/videos/property-tour-mobile.mp4"
              autoPlay
              muted
              loop
              playsInline
              controls
            />
            <motion.video
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="hidden h-full w-full object-cover sm:block"
              src="/videos/property-tour.mp4"
              autoPlay
              muted
              loop
              playsInline
              controls
            />
          </>
        )}
      </motion.div>
    </section>
  )
}
