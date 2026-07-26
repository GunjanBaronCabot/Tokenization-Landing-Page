import { ArrowRight } from 'lucide-react'

export default function Button({ children, className = '', ...props }) {
  return (
    <a
      href="#register"
      className={`inline-flex items-center gap-4 rounded-full bg-navy pl-8 pr-2 py-2 font-sans font-semibold text-white shadow-pill transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] ${className}`}
      {...props}
    >
      <span className="whitespace-nowrap">{children}</span>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-navy">
        <ArrowRight size={18} strokeWidth={2.5} />
      </span>
    </a>
  )
}
