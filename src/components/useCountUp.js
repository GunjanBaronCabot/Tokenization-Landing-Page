import { useEffect, useState } from 'react'
import { animate } from 'framer-motion'

/**
 * Animates a number from `from` up to `target` once `isInView` becomes
 * true. Uses a timed tween (not a spring) — a spring front-loads its motion
 * (fast start, slow settle), which made the count barely visible; a tween
 * paces itself evenly across the full duration so the count is actually
 * watchable.
 */
export default function useCountUp(target, isInView, { from = 0, duration = 1.6, ease = 'easeOut' } = {}) {
  const [display, setDisplay] = useState(from)

  useEffect(() => {
    if (!isInView) return

    const controls = animate(from, target, {
      duration,
      ease,
      onUpdate: (v) => setDisplay(Math.round(v)),
    })

    return () => controls.stop()
  }, [isInView, target, from, duration, ease])

  return display
}
