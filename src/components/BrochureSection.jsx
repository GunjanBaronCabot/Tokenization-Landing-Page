import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from './Button.jsx'
import RevealText from './RevealText.jsx'
import Parallax from './Parallax.jsx'
import Modal from './Modal.jsx'
import LeadForm from './LeadForm.jsx'
import whoSkyscrapers from '../assets/who-skyscrapers.jpg'

const HUBSPOT_FORM_ID = '9b86353b-b717-468e-b785-a88d75b833b7'

const cardRise = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const contentStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function BrochureSection() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section
      className="relative flex flex-col items-center justify-center bg-white px-4 py-8 sm:px-6 sm:py-20 lg:px-10"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={cardRise}
        className="relative mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-7xl flex-col justify-center overflow-hidden rounded-2xl shadow-2xl sm:min-h-[calc(100svh-10rem)] sm:rounded-3xl"
      >
        <Parallax speed={0.1} className="absolute inset-0">
          <img
            src={whoSkyscrapers}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full scale-110 object-cover"
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/50" />

        <motion.div
          variants={contentStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative z-10 flex flex-col gap-8 p-8 sm:gap-14 sm:p-16 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:p-20"
        >
          <div className="flex max-w-2xl flex-col items-start gap-5 sm:gap-6">
            {/* <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-4 font-sans text-xs font-semibold text-navy shadow-lg sm:py-2 sm:pl-2 sm:pr-5 sm:text-sm"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-white sm:h-7 sm:w-7">
                <Download size={13} strokeWidth={2.5} />
              </span>
              Free Download
            </motion.span> */}

            <h2 className="font-serif text-[28px] font-semibold leading-[1.15] text-white sm:text-[38px] lg:text-[46px]">
              <RevealText text="Download Your Free UK Property Investment Brochure" />
            </h2>

            <motion.p
              variants={fadeUp}
              className="font-sans text-sm leading-relaxed text-white/85 sm:text-base"
            >
              Get instant access to our latest investment guide, featuring current
              UK property opportunities, market insights, projected rental yields,
              and everything you need to know before you invest. The perfect
              starting point for making an informed, confident decision.
            </motion.p>
          </div>

          <motion.div variants={fadeUp} className="shrink-0">
            <Button className="text-sm sm:text-base" onClick={() => setModalOpen(true)}>
              Download The Free Brochure
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <LeadForm
          formId={HUBSPOT_FORM_ID}
          title="Get Your Free Brochure"
          description="Fill in your details below and we'll send you instant access to the guide."
          submitLabel="Send Me The Brochure"
          submittingLabel="Sending…"
          thankYouKey="brochure"
        />
      </Modal>
    </section>
  )
}
