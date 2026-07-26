import { motion, useReducedMotion } from 'framer-motion'

/**
 * Decorative pill badge that slides in from the given side and fades in
 * once it's actually visible.
 *
 * The outer element stays at its final, untranslated position (so the
 * browser can correctly detect when that spot scrolls into view); only
 * the inner pill carries the slide-in transform. Detecting visibility on
 * the already-offset element itself is a dead end — it starts outside the
 * viewport, so it can never satisfy an in-view threshold to reveal itself.
 *
 * whileInView (rather than a continuous scroll-linked transform) is used
 * because badges near the bottom of a sticky/pinned section never cross a
 * scroll-position threshold once the section freezes in place, which left
 * them stuck mid-animation.
 */
export default function FloatingBadge({
  icon: Icon,
  label,
  side = 'left',
  distance = 140,
  accent = 'navy',
  className = '',
}) {
  const prefersReducedMotion = useReducedMotion()
  const startX = side === 'left' ? -distance : distance

  const accentClasses =
    accent === 'white'
      ? 'bg-white/15 text-white ring-1 ring-inset ring-white/25'
      : 'bg-navy text-white'

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      variants={{ hidden: {}, show: {} }}
      className={`pointer-events-none absolute z-20 ${className}`}
    >
      <motion.div
        variants={{
          hidden: { x: prefersReducedMotion ? 0 : startX, opacity: 0, rotate: side === 'left' ? -6 : 6 },
          show: { x: 0, opacity: 1, rotate: 0 },
        }}
        whileHover={{ scale: 1.06, y: -4, transition: { duration: 0.25, ease: 'easeOut' } }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto flex cursor-default items-center gap-1.5 whitespace-nowrap rounded-full bg-white py-1.5 pl-1.5 pr-3.5 shadow-xl transition-shadow duration-300 hover:shadow-2xl sm:gap-2 sm:py-2 sm:pl-2 sm:pr-5"
      >
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full sm:h-8 sm:w-8 ${accentClasses}`}
        >
          <Icon size={12} strokeWidth={2.5} className="sm:hidden" />
          <Icon size={15} strokeWidth={2.5} className="hidden sm:block" />
        </span>
        <span className="font-serif text-[11px] font-semibold text-navy sm:text-base">{label}</span>
      </motion.div>
    </motion.div>
  )
}
