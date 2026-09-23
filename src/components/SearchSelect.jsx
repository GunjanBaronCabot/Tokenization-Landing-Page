import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown } from 'lucide-react'

const PANEL_MAX_HEIGHT = 220

/**
 * Searchable single-select dropdown (button trigger + filterable option list),
 * styled to match the site's dark glass form fields. The option panel is
 * portaled to <body> and positioned with getBoundingClientRect so it can
 * never be clipped by an ancestor's overflow-hidden - which is what was
 * cutting it off inside the InquirySection card on short mobile viewports.
 */
export default function SearchSelect({ label, options, value, onChange, placeholder = 'Please Select', required = false }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [position, setPosition] = useState(null)
  const rootRef = useRef(null)
  const buttonRef = useRef(null)
  const panelRef = useRef(null)

  useLayoutEffect(() => {
    if (!open) return

    const updatePosition = () => {
      const rect = buttonRef.current?.getBoundingClientRect()
      if (!rect) return

      const spaceBelow = window.innerHeight - rect.bottom
      const openUpward = spaceBelow < PANEL_MAX_HEIGHT && rect.top > spaceBelow

      setPosition({
        left: rect.left,
        width: rect.width,
        ...(openUpward
          ? { bottom: window.innerHeight - rect.top + 4 }
          : { top: rect.bottom + 4 }),
      })
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onClickOutside = (e) => {
      if (rootRef.current?.contains(e.target)) return
      if (panelRef.current?.contains(e.target)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [open])

  const filtered = options.filter((o) => o.toLowerCase().includes(query.toLowerCase()))

  return (
    <div ref={rootRef} className="relative">
      {label && (
        <label className="mb-1.5 block font-sans text-sm font-semibold text-white/70">
          {label}
          {required && '*'}
        </label>
      )}

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-lg border border-dashed border-white/25 bg-white/5 px-4 py-3 text-left font-sans text-sm text-white outline-none backdrop-blur-sm transition-colors focus:border-white/40 focus:bg-white/10"
      >
        <span className={value ? 'text-white' : 'text-white/40'}>{value || placeholder}</span>
        <ChevronDown size={16} className={`shrink-0 text-white/50 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open &&
        position &&
        createPortal(
          <div
            ref={panelRef}
            style={{ position: 'fixed', left: position.left, width: position.width, top: position.top, bottom: position.bottom }}
            className="z-[110] overflow-hidden rounded-lg border border-white/15 bg-navy shadow-xl"
          >
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full border-b border-white/10 bg-transparent px-3.5 py-2 font-sans text-sm text-white placeholder-white/40 outline-none"
            />
            <div className="max-h-44 overflow-y-auto">
              {filtered.length === 0 && <p className="px-3.5 py-2 font-sans text-xs text-white/40">No results</p>}
              {filtered.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option)
                    setOpen(false)
                    setQuery('')
                  }}
                  className={`block w-full px-3.5 py-2 text-left font-sans text-sm transition-colors hover:bg-white/10 ${
                    option === value ? 'bg-white/10 text-white' : 'text-white/80'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}
