import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import bg from '../assets/thank-you-consultation-bg.jpg'

export default function ThankYouPage({ heading, message, buttonLabel, buttonHref }) {
  useEffect(() => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'hubspot_form_success',
      pageUri: window.location.href,
    })
  }, [])

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy px-4 py-16 sm:px-6">
      <img src={bg} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/70 to-navy/90" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 max-w-3xl text-center"
      >
        <h1 className="font-serif text-[34px] font-semibold leading-tight text-white sm:text-[46px] lg:text-[56px]">
          {heading}
        </h1>

        <div className="mt-6 font-sans text-base leading-relaxed text-white/85 sm:text-lg">{message}</div>

        <a
          href={buttonHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-3 font-sans text-sm font-bold text-white transition-transform duration-200 hover:scale-[1.03] hover:bg-orange-600 active:scale-[0.98] sm:text-base"
        >
          {buttonLabel}
          <ArrowUpRight size={18} strokeWidth={2.5} />
        </a>
      </motion.div>
    </main>
  )
}
