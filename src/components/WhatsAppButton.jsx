import { motion } from 'framer-motion'

const WHATSAPP_NUMBER = '447411312452'

export default function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 1, ease: 'backOut' }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/20 sm:bottom-6 sm:right-6"
    >
      <svg
        viewBox="0 0 32 32"
        className="h-8 w-8"
        fill="#ffffff"
        aria-hidden="true"
      >
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.386.663 4.617 1.814 6.518L4 29l7.66-1.775A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3zm0 21.7a9.66 9.66 0 0 1-4.933-1.35l-.354-.21-4.545 1.054 1.08-4.428-.23-.362A9.65 9.65 0 0 1 6.3 15c0-5.352 4.352-9.7 9.704-9.7 5.352 0 9.696 4.348 9.696 9.7 0 5.352-4.344 9.7-9.696 9.7zm5.316-7.264c-.29-.145-1.716-.847-1.982-.944-.266-.097-.46-.145-.653.145-.194.29-.75.944-.92 1.138-.17.194-.34.218-.63.073-.29-.145-1.224-.451-2.332-1.44-.862-.769-1.444-1.719-1.613-2.009-.169-.29-.018-.447.127-.591.13-.13.29-.34.435-.51.145-.17.194-.29.29-.484.097-.194.048-.363-.024-.508-.073-.145-.653-1.575-.895-2.158-.236-.567-.475-.49-.653-.5-.169-.008-.363-.01-.557-.01-.194 0-.508.073-.774.363-.266.29-1.016.994-1.016 2.424 0 1.43 1.04 2.812 1.185 3.006.145.194 2.048 3.128 4.964 4.386.694.3 1.235.479 1.657.613.696.221 1.33.19 1.83.115.558-.083 1.716-.702 1.958-1.38.242-.678.242-1.259.17-1.38-.073-.121-.267-.194-.557-.34z" />
      </svg>
    </motion.a>
  )
}
