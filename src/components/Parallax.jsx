import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

/**
 * Moves its children along the scroll axis at a fraction of scroll speed,
 * creating depth between layers. speed > 0 drifts down slower than scroll
 * (background feel); speed < 0 drifts up (foreground feel).
 */
export default function Parallax({
  children,
  className = '',
  speed = 0.15,
  rotate = 0,
  scaleRange,
  style = {},
  as = 'div',
}) {
  const ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const rawY = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`])
  const rawRotate = useTransform(scrollYProgress, [0, 1], [-rotate, rotate])
  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    scaleRange ?? [1, 1, 1]
  )

  const y = prefersReducedMotion ? 0 : rawY
  const rotateValue = prefersReducedMotion ? 0 : rawRotate
  const scale = prefersReducedMotion ? 1 : rawScale

  const MotionTag = motion[as] ?? motion.div

  return (
    <MotionTag
      ref={ref}
      style={{ y, rotate: rotateValue, scale, ...style }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}
