import { Fragment } from 'react'
import { motion } from 'framer-motion'

const container = (stagger, delay) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

const wordVariant = {
  hidden: { opacity: 0.001, filter: 'blur(10px)', y: 16 },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function RevealText({
  text,
  className = '',
  stagger = 0.045,
  delay = 0,
  once = true,
  amount = 0.4,
}) {
  const words = text.split(' ')
  return (
    <motion.span
      variants={container(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      className={className}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <motion.span variants={wordVariant} className="inline-block will-change-transform">
            {w}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </motion.span>
  )
}
