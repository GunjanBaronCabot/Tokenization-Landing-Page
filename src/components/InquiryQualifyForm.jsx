import { useState } from 'react'
import { motion } from 'framer-motion'
import SearchSelect from './SearchSelect.jsx'
import Modal from './Modal.jsx'
import LeadForm from './LeadForm.jsx'

const LEAD_FORM_ID = 'd771f638-0d0e-4322-92ed-afc431a5256a'
const CAREERS_URL = 'https://baroncabot.com/careers-internal-sales-specialist/'
const LOW_BUDGET_OPTION = 'Below £30,000'
const PARTNERSHIP_JOB_OPTION = 'Looking for partnership/ Job'

// HubSpot internal field names for this form's two qualifying questions.
const BUDGET_FIELD_NAME = 'if_you_found_the_right_investment_what_budget_would_you_have_accessible__nbsp_'
const DESCRIBES_YOU_FIELD_NAME = 'what_best_describes_you_'

const BUDGET_OPTIONS = [LOW_BUDGET_OPTION, '£30,000 - £50,000', '£50,000 - £100,000', '£100,000+', 'HNW £1 million+']

const DESCRIBES_YOU_OPTIONS = ['Investor looking in next 3 months', 'Investor over 3 months', PARTNERSHIP_JOB_OPTION]

const formStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
}

const fieldRise = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function InquiryQualifyForm({
  className = 'w-full max-w-md rounded-2xl border border-white/10 bg-navy/40 p-6 backdrop-blur-xl sm:p-8',
}) {
  const [budget, setBudget] = useState('')
  const [describesYou, setDescribesYou] = useState('')
  const [error, setError] = useState('')
  const [infoModalOpen, setInfoModalOpen] = useState(false)
  const [leadModalOpen, setLeadModalOpen] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!budget || !describesYou) {
      setError('Please answer both questions to continue.')
      return
    }
    setError('')

    if (budget === LOW_BUDGET_OPTION) {
      setInfoModalOpen(true)
      return
    }
    if (describesYou === PARTNERSHIP_JOB_OPTION) {
      window.location.href = CAREERS_URL
      return
    }
    setLeadModalOpen(true)
  }

  return (
    <>
      <motion.form
        variants={formStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        onSubmit={handleSubmit}
        className={className}
      >
        <motion.div variants={fieldRise}>
          <SearchSelect
            label="If you found the right investment what budget would you have accessible?"
            options={BUDGET_OPTIONS}
            value={budget}
            onChange={setBudget}
          />
        </motion.div>

        <motion.div variants={fieldRise} className="mt-6">
          <SearchSelect label="What best describes you?" options={DESCRIBES_YOU_OPTIONS} value={describesYou} onChange={setDescribesYou} />
        </motion.div>

        {error && <p className="mt-3 font-sans text-xs font-medium text-red-300">{error}</p>}

        <motion.div variants={fieldRise} className="mt-7">
          <p className="font-sans text-xs font-semibold text-white/60">1/1</p>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-full rounded-full bg-white" />
          </div>
        </motion.div>

        <motion.button
          variants={fieldRise}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 font-sans text-sm font-bold text-navy"
        >
          Book a Free Call
        </motion.button>
      </motion.form>

      <Modal open={infoModalOpen} onClose={() => setInfoModalOpen(false)}>
        <div className="rounded-2xl border border-white/10 bg-navy p-6 pt-12 text-center sm:p-8 sm:pt-12">
          <p className="font-sans text-sm leading-relaxed text-white/85">
            This might not be the best investment for you. Learn more at{' '}
            <a
              href="https://www.baroncabot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline underline-offset-2"
            >
              www.baroncabot.com
            </a>
          </p>
        </div>
      </Modal>

      <Modal open={leadModalOpen} onClose={() => setLeadModalOpen(false)}>
        <LeadForm
          formId={LEAD_FORM_ID}
          title="Book a Free Call"
          description="Share your details and our team will be in touch to confirm a time."
          submitLabel="Book a Free Call"
          thankYouKey="consultation"
          showInvestmentFields={false}
          extraFields={{
            [BUDGET_FIELD_NAME]: budget,
            [DESCRIBES_YOU_FIELD_NAME]: describesYou,
          }}
        />
      </Modal>
    </>
  )
}
