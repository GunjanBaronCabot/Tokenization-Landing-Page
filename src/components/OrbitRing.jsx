import { motion, useReducedMotion } from 'framer-motion'

/**
 * A slowly-rotating dashed ring around a still icon — purely ambient,
 * geometric motion for filling empty space without adding more copy.
 */
export default function OrbitRing({ icon: Icon, size = 76, className = '' }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`pointer-events-none absolute z-20 flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full text-navy/30"
        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
      >
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          strokeLinecap="round"
        />
      </motion.svg>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-navy shadow-lg sm:h-11 sm:w-11">
        <Icon size={17} strokeWidth={2} />
      </span>
    </motion.div>
  )
}
