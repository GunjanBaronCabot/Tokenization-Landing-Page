import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const COLORS = ['#F5A65B', '#7DA6E8', '#8FD19E', '#E88F8F']

const avatarPop = {
  hidden: { opacity: 0, scale: 0.4, y: 10 },
  show: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'backOut' },
  }),
}

/**
 * Floating social-proof card: a stack of overlapping avatar dots popping in
 * one by one, next to a rating + caption. Same visual language already used
 * in InquirySection, reused here as a decorative filler with real meaning
 * instead of another icon+label pill.
 */
export default function AvatarCluster({ rating = '4.9', caption = '200+ attendees', className = '' }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      whileHover={{ scale: 1.05, y: -4, transition: { duration: 0.25 } }}
      className={`pointer-events-auto absolute z-20 flex cursor-default items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-xl transition-shadow duration-300 hover:shadow-2xl sm:gap-3 sm:px-4 sm:py-3 ${className}`}
    >
      <div className="flex -space-x-2.5">
        {COLORS.map((c, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={avatarPop}
            className="h-7 w-7 shrink-0 rounded-full border-2 border-white shadow-sm sm:h-8 sm:w-8"
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
      <div>
        <div className="flex items-center gap-1 whitespace-nowrap font-sans text-sm font-bold text-navy">
          {rating}
          <Star size={12} fill="currentColor" strokeWidth={0} className="text-amber-400" />
        </div>
        <p className="whitespace-nowrap font-sans text-[10px] text-muted sm:text-xs">{caption}</p>
      </div>
    </motion.div>
  )
}
