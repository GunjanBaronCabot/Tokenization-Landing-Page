import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const GROW_DISTANCE = 420

// Browsers only allow autoplay when a video starts muted, so we autoplay
// muted and unmute on the first real user interaction (a genuine gesture,
// unlike the scroll-triggered onViewportEnter mount above). The interaction
// can happen before the video ever mounts (e.g. clicking something higher
// up the page before scrolling down), so we track it as state and apply it
// whenever the video becomes available, rather than a one-shot listener.
function useHasInteracted() {
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    if (hasInteracted) return
    const markInteracted = () => setHasInteracted(true)
    const events = ['pointerdown', 'keydown']
    events.forEach((event) => window.addEventListener(event, markInteracted, { once: true }))
    return () => events.forEach((event) => window.removeEventListener(event, markInteracted))
  }, [hasInteracted])

  return hasInteracted
}

export default function ScrollGrowVideo() {
  const [hasEntered, setHasEntered] = useState(false)
  const videoRef = useRef(null)
  const hasInteracted = useHasInteracted()

  useEffect(() => {
    if (!hasInteracted) return
    if (videoRef.current) videoRef.current.muted = false
  }, [hasInteracted, hasEntered])

  // Driven by absolute page scroll (not the video's own position) so it
  // always starts small at the very top of the page, regardless of how
  // tall the hero content above it happens to be on a given screen size.
  //
  // Uses `scale` (a transform) rather than `width` so the box always keeps
  // its final full-size footprint in the document flow - only its paint
  // shrinks. Animating `width` on a box with a fixed aspect-ratio also
  // changes its layout height as it grows, which shifts every section
  // below it mid-scroll and threw off in-page anchor navigation (e.g. the
  // header's "Register" link landing short of #register).
  const { scrollY } = useScroll()

  const scale = useTransform(scrollY, [0, GROW_DISTANCE], [0.58, 1], {
    clamp: true,
  })
  const radius = useTransform(scrollY, [0, GROW_DISTANCE], [24, 0], {
    clamp: true,
  })

  return (
    <section className="relative z-10 mt-5 flex justify-center px-4 pb-20 sm:mt-6 sm:pb-28 lg:mt-8 lg:pb-40">
      <motion.div
        style={{ scale, borderRadius: radius }}
        onViewportEnter={() => setHasEntered(true)}
        viewport={{ once: true, amount: 0.1 }}
        className="aspect-[9/16] w-full max-w-6xl overflow-hidden bg-black shadow-2xl sm:aspect-video"
      >
        {hasEntered && (
          <motion.video
            ref={videoRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="h-full w-full object-cover"
            src={`${import.meta.env.BASE_URL}videos/property-tour.mp4`}
            autoPlay
            muted={!hasInteracted}
            loop
            playsInline
            controls
          />
        )}
      </motion.div>
    </section>
  )
}
