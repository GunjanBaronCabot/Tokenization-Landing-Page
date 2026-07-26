/**
 * Slim, continuously-scrolling strip of keywords — a decorative ribbon for
 * filling horizontal empty space with subtle constant motion instead of a
 * static element.
 */
export default function TagRibbon({ tags, tone = 'dark', className = '' }) {
  const loop = [...tags, ...tags]
  const textClass = tone === 'light' ? 'text-white/70' : 'text-navy/50'
  const dotClass = tone === 'light' ? 'text-white/30' : 'text-navy/20'

  return (
    <div
      className={`pointer-events-none absolute z-10 overflow-hidden opacity-70 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${className}`}
    >
      <div className="flex w-max animate-marquee-fast items-center gap-0 whitespace-nowrap">
        {loop.map((tag, i) => (
          <span
            key={i}
            className={`font-sans text-[11px] font-semibold uppercase tracking-wide sm:text-xs ${textClass}`}
          >
            {tag}
            <span className={`mx-3 ${dotClass}`}>•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
