import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import logo from '../assets/logo-baron-cabot.png'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const fadeDown = {
  hidden: { opacity: 0, y: -14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Header() {
  return (
    <div className="absolute inset-x-0 top-0 z-30 px-4 pt-4 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8">
      <motion.header
        variants={stagger}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-white/40 bg-white/30 px-4 py-2.5 shadow-[0_8px_32px_rgba(16,30,51,0.18),inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-xl sm:px-6 sm:py-3"
      >
        <motion.div variants={fadeDown} className="flex shrink-0 items-center">
          <img src={logo} alt="Baron & Cabot logo" className="h-10 w-auto sm:h-12" />
        </motion.div>

        <motion.nav variants={fadeDown} className="hidden items-center gap-8 md:flex">
          <a
            href="#register"
            className="flex items-center gap-2 whitespace-nowrap font-sans text-sm font-bold text-[#0F5132] transition-colors hover:text-[#0a3a24]"
          >
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0F5132] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#0F5132]" />
            </span>
            Live Webinar
          </a>
        </motion.nav>

        <motion.a
          variants={fadeDown}
          href="#register"
          className="inline-flex shrink-0 items-center gap-3 rounded-full bg-navy py-1.5 pl-5 pr-1.5 font-sans text-sm font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] sm:pl-6"
        >
          Register
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-navy">
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </span>
        </motion.a>
      </motion.header>
    </div>
  )
}
