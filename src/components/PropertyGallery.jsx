import { useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { Compass } from 'lucide-react'
import aboutSkyline from '../assets/about-skyline.jpg'
import inquiryBg from '../assets/inquiry-bg.jpg'
import whoLivingRoom from '../assets/who-living-room.webp'
import aboutGlassTower from '../assets/about-glass-tower.jpg'

const TILES = [
  { image: aboutSkyline, label: 'Birmingham Skyline' },
  { image: inquiryBg, label: 'Liverpool Waterfront' },
  { image: whoLivingRoom, label: 'Show Home Interior' },
  { image: aboutGlassTower, label: 'Grade-A Commercial' },
]

export default function PropertyGallery() {
  const [isHovering, setIsHovering] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 })

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left)
    y.set(e.clientY - rect.top)
  }

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      className="relative mt-12 w-full max-w-5xl rounded-[28px] bg-[#0b1526] p-3 shadow-2xl sm:p-4"
    >
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {TILES.map(({ image, label }) => (
          <div
            key={label}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
          >
            <img
              src={image}
              alt={label}
              className="h-full w-full scale-105 object-cover grayscale brightness-[0.45] transition-all duration-500 ease-out group-hover:scale-110 group-hover:grayscale-0 group-hover:brightness-100"
            />
            <span className="absolute bottom-3 left-3 font-sans text-xs font-semibold text-white/0 transition-colors duration-500 group-hover:text-white/90 sm:text-sm">
              {label}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{ left: springX, top: springY }}
            className="pointer-events-none absolute z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-white py-1.5 pl-2 pr-4 shadow-xl"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy text-white">
              <Compass size={14} strokeWidth={2.5} />
            </span>
            <span className="whitespace-nowrap font-sans text-sm font-semibold text-navy">
              See the Opportunity
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
