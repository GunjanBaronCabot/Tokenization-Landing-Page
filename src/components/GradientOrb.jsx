import { motion, useReducedMotion } from 'framer-motion'

/**
 * Ambient decorative blur orb — drifts and breathes continuously,
 * independent of scroll position. Purely atmospheric; never interactive.
 */
export default function GradientOrb({
  className = '',
  color = 'rgba(58,119,229,0.35)',
  size = 420,
  duration = 18,
  delay = 0,
  drift = 40,
}) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 40% 35%, ${color}, transparent 70%)`,
      }}
      animate={
        prefersReducedMotion
          ? {}
          : {
              x: [0, drift, -drift * 0.6, 0],
              y: [0, -drift * 0.7, drift * 0.5, 0],
              scale: [1, 1.08, 0.96, 1],
            }
      }
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}
