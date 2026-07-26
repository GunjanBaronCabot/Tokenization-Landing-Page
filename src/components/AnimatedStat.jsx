import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import useCountUp from './useCountUp.js'

/**
 * Floating stat card that counts up from 0 to `value` once it scrolls into
 * view — a more substantial alternative to a plain icon+label pill for
 * filling empty section margins with something that feels alive.
 */
export default function AnimatedStat({
  value,
  prefix = '',
  suffix = '',
  label,
  side = 'left',
  distance = 120,
  transparent = false,
  className = '',
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const prefersReducedMotion = useReducedMotion()
  const display = useCountUp(value, isInView, { duration: 1.6 })
  const startX = side === 'left' ? -distance : distance

  return (
    <div ref={ref} className={`pointer-events-none absolute z-20 ${className}`}>
      <motion.div
        initial={prefersReducedMotion ? false : { x: startX, opacity: 0, scale: 0.85 }}
        animate={isInView ? { x: 0, opacity: 1, scale: 1 } : {}}
        whileHover={{ scale: 1.05, y: -4 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto flex min-w-[104px] cursor-default flex-col items-start rounded-2xl px-4 py-2.5 shadow-xl sm:min-w-[128px] sm:px-5 sm:py-3 ${
          transparent ? 'border border-navy/10 bg-transparent' : 'bg-white'
        }`}
      >
        <span className="whitespace-nowrap font-serif text-lg font-bold text-navy sm:text-2xl">
          {prefix}
          {display.toLocaleString()}
          {suffix}
        </span>
        {label && (
          <span className="whitespace-nowrap font-sans text-[10px] font-medium uppercase tracking-wide text-muted sm:text-xs">
            {label}
          </span>
        )}
      </motion.div>
    </div>
  )
}
