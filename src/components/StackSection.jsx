import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

/**
 * A section that pins to the top of the viewport and stays there while the
 * next StackSection (higher in DOM order → higher z-index) slides up and
 * covers it. As its own pin window elapses, it eases back slightly in scale
 * so it visually recedes under whatever comes next — no color/dim change,
 * just a subtle shrink.
 *
 * Works the same on every screen size — sections must keep their natural
 * content height within one viewport so nothing gets clipped while pinned.
 */
export default function StackSection({
  as = 'section',
  index = 0,
  recede = true,
  className = '',
  style = {},
  children,
  ...props
}) {
  const ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 0.92])

  const active = !prefersReducedMotion && recede
  const scale = active ? rawScale : 1

  const MotionTag = motion[as] ?? motion.div

  return (
    <MotionTag
      ref={ref}
      style={{
        ...style,
        position: 'sticky',
        top: 0,
        zIndex: index,
        scale,
        transformOrigin: 'center top',
      }}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  )
}
