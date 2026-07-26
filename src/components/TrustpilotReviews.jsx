import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, BadgeCheck } from 'lucide-react'
import StackSection from './StackSection.jsx'
import testimonialBg from '../assets/testimonial-bg.jpg'

const REVIEWS = [
  {
    name: 'Angela T',
    location: 'ZW',
    reviewCount: '2 reviews',
    date: 'Jun 3, 2026',
    title: 'Top notch service',
    body: "I was especially impressed by the communication between myself and Lewis. He was very patient and helpful. He was flexible with time and would adjust accordingly.",
    reviewDate: 'February 10, 2026',
    initials: 'AT',
    avatarBg: '#F3E2B8',
    verified: true,
  },
  {
    name: 'Sean',
    location: 'GB',
    reviewCount: '4 reviews',
    date: 'Feb 27, 2026',
    title: 'Dedicated and knowledgeable team',
    body: 'Easy to work with and what is usually a complex process was made easy through the great work of Judy Maina and Tom Hepworth. Both are really on the ball and know how to deal with people. Would highly recommend these two and the company to anyone wanting to buy property whether in or outside of the uk.',
    reviewDate: 'February 27, 2026',
    initials: 'SE',
    avatarBg: '#D7F0E4',
  },
  {
    name: 'Taiwo Okwor',
    location: 'NG',
    reviewCount: '1 review',
    date: 'Jun 30, 2025',
    title: 'Tom and Amy were excellent throughout...',
    body: 'Tom and Amy were excellent throughout the process of purchase. I appreciated the regular follow ups, especially being on top of things to close out the purchase. Delighted to work with them and will highly recommend them.',
    reviewDate: 'June 30, 2025',
    initials: 'T',
    avatarBg: '#4B3621',
    avatarText: '#FFFFFF',
  },
  {
    name: 'Chukwuanugo Mojekwu',
    location: 'US',
    reviewCount: '1 review',
    date: 'Sep 11, 2025',
    title: 'Top Realtor',
    body: 'Top Realtor. Very hard working and smart. Always has new investment opportunities for his clients all around the world. Also looks out for the best deals so clients get the best bang for their buck.',
    reviewDate: 'September 10, 2024',
    initials: 'CM',
    avatarBg: '#DCE8FA',
  },
]

function Stars() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="flex h-5 w-5 items-center justify-center bg-[#00b67a]"
        >
          <Star size={12} className="text-white" fill="currentColor" strokeWidth={0} />
        </span>
      ))}
    </div>
  )
}

function ReviewCard({ review }) {
  return (
    <div className="flex w-[250px] shrink-0 flex-col rounded-xl bg-white p-4 shadow-lg ring-1 ring-black/5 sm:w-[380px] sm:p-6">
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-sans text-xs font-bold sm:h-10 sm:w-10 sm:text-sm"
            style={{ backgroundColor: review.avatarBg, color: review.avatarText ?? '#101E33' }}
          >
            {review.initials}
            {review.verified && (
              <BadgeCheck
                size={14}
                className="absolute -bottom-0.5 -right-0.5 rounded-full bg-white text-[#3A77E5]"
              />
            )}
          </div>
          <div>
            <p className="font-sans text-sm font-bold text-navy">{review.name}</p>
            <p className="font-sans text-xs text-muted">
              {review.location} &middot; {review.reviewCount}
            </p>
          </div>
        </div>
        <p className="whitespace-nowrap font-sans text-xs text-muted">{review.date}</p>
      </div>

      <div className="mt-3 sm:mt-4">
        <Stars />
      </div>

      <p className="mt-2 font-sans text-sm font-bold text-navy sm:mt-4">{review.title}</p>
      <p className="mt-1.5 line-clamp-3 font-sans text-xs leading-relaxed text-muted sm:mt-2 sm:line-clamp-5 sm:text-sm">
        {review.body}
      </p>

      <div className="mt-3 hidden flex-wrap gap-2 sm:mt-4 sm:flex">
        <span className="rounded-full bg-gray-100 px-3 py-1 font-sans text-xs text-muted">
          {review.reviewDate}
        </span>
        <span className="rounded-full bg-gray-100 px-3 py-1 font-sans text-xs text-muted">
          Unprompted review
        </span>
      </div>
    </div>
  )
}

export default function TrustpilotReviews() {
  const [hasEntered, setHasEntered] = useState(false)
  const loop = [...REVIEWS, ...REVIEWS]

  return (
    <StackSection
      index={6}
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden py-8 sm:py-20"
    >
      <img
        src={testimonialBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white to-transparent sm:h-28" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent sm:h-28" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 text-center sm:px-6">
        <h2 className="font-serif text-[28px] font-semibold text-white sm:text-[36px]">
          What Our Clients Say
        </h2>
        <div className="mt-3 flex items-center gap-2 sm:mt-3">
          <Stars />
          <span className="font-sans text-sm font-semibold text-white sm:text-sm">Excellent</span>
        </div>
        <p className="mt-1 font-sans text-sm text-white/70 sm:text-sm">
          Rated by 200+ clients on Trustpilot
        </p>
      </div>

      <motion.div
        onViewportEnter={() => setHasEntered(true)}
        viewport={{ once: true, amount: 0.3 }}
        className="group relative z-10 mt-8 w-full [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] sm:mt-10"
      >
        <div
          className={`flex w-max gap-6 group-hover:[animation-play-state:paused] ${
            hasEntered ? 'animate-marquee' : ''
          }`}
        >
          {loop.map((review, i) => (
            <ReviewCard key={`${review.name}-${i}`} review={review} />
          ))}
        </div>
      </motion.div>
    </StackSection>
  )
}
