# Design Reference — Baron & Cabot Webinar Landing Page

Source: https://dynamic-moment-515893.framer.app/ (site is branded **"Baron & Cabot"**; page `<title>` says "FintechX..." which is just leftover Framer template metadata — ignore it).

Status: **Verified against the live DOM** (via a real headless Chromium session — computed styles, actual asset URLs, and DOM structure were extracted directly, not estimated). Confidence is high for the two sections in scope below.

Scope of current build: **Hero section + Value Proposition ("Tokenisation...") section only.** The rest of the page (7677px total height — audience-qualification list, speaker cards, case study, footer, etc.) is out of scope for now.

---

## Global Design Tokens

| Token | Value |
|---|---|
| Navy (primary text / button bg) | `rgb(16, 30, 51)` → `#101E33` |
| Gray (de-emphasized text) | `rgb(89, 89, 89)` → `#595959` |
| White | `#FFFFFF` |
| Accent glow (button shadow) | `rgba(58, 119, 229, 0.5)` (blue glow) |
| Display/heading font | `Newsreader`, serif, weight 600 |
| UI/body font | `Inter` (and "Inter Display" optical variant — just use Inter), weights 500/600 |
| Heading size (H1/H2, desktop) | `80px`, letter-spacing `-1px` to `-1.4px` |
| Content column width | ~`896px` centered |
| Button border-radius | `100px` (full pill) |
| Button padding | `12px 54px 12px 30px` (extra right padding for icon circle) |
| Button box-shadow | `inset 4px 4px 8px rgba(255,255,255,.3), inset -4px -4px 8px rgba(255,255,255,.3), 0 8px 16px rgba(58,119,229,.5)` |

Viewport reference used for measurements: 1600×1000 desktop.

---

## Assets (downloaded/verified, in `scratchpad/assets/` — copy into project)

| Asset | Source | Notes |
|---|---|---|
| Hero background | **User-provided `Tokenisation-banner (1).png`** | Confirmed identical to the live site's hero image (`25S0GKam2xJQ8W6sCavQG6pnrkE.png`, 3582×4478 — exact dimension match). Floating silver coin graphics are **baked into this image**, not separate animated elements. Displayed via `object-fit: cover`. |
| Logo | `logo.png` (115×54) | "Baron & Cabot" wordmark, white serif text, transparent bg. Small/low-res — recommend rebuilding as live text in the `Newsreader` font instead of using the raster image, for crispness at all sizes. |
| Section 2 background | `section2_bg.png` | Vertical light-blue "ray" stripes fading to white center, white top/bottom. Displayed full-bleed behind section 2, stretched to cover. |
| Arc/wave divider | `mask_arc.svg` | `<svg width="1920" height="530"><path fill="#F7F7F7" d="M0 0v530h1920V0C1267.73 332.947 347.537 138.728 0 0Z"/></svg>` — a wide near-white panel with a wavy top edge, positioned overlapping the bottom of the hero (`top: 1455px` when hero height is `1785px`) so it dips into section 2, creating the curved transition seen in the recording. Overflows viewport left/right (centered, wider than viewport). |
| Eyebrow icons | Briefcase / Brain / Star (outline style, white) | Generic outline icon set — reproduce with `lucide-react` (`Briefcase`, `Brain`, `Star`) rather than the low-res PNGs. |
| Property tour video | `https://youtu.be/ZrtpNN176Gk` | "Inside a £2.1 Million Castle in Scotland | Property Tour" by Fine & Country. Embed as YouTube iframe with a custom pre-play card matching the captured styling (dark bar, channel avatar circle, bold white title, gray channel name, mute/CC/settings icons top right). |

---

## Section 1: Navbar (transparent, overlays hero image)

- No background — floats directly over the hero photo.
- Left: "Baron & Cabot" wordmark, white, serif (`Newsreader`), two-line stacked lockup ("Baron&" / "Cabot").
- Right: **Register** button — navy pill, white bold text, trailing white circle with navy right-arrow icon. Same button component/style used for all 3 CTAs on the page (only label + width differ: Register 152px, Register Your Spot Now 277px, Register for the event now 297px — all height 47px).

## Section 2: Eyebrow Tags Bar

- Full-width bar, `background: #101E33`, height `36px`, sits directly below the navbar, above the headline.
- 3 centered items, each `icon + label`, gap `11px` between items:
  1. 💼 Briefcase — "Live Workshop" (Inter, 16px, weight 600, white)
  2. 🧠 Brain — "No prior AI knowledge needed" (Inter Display, 18px, weight 500, white)
  3. ⭐ Star — "Limited Period Offer" (Inter, 16px, weight 600, white)
- Thin vertical dividers between items (subtle, low-opacity white/gray lines).

## Section 3: Hero Content

- H1 (Newsreader 600, 80px, line-height 80px, letter-spacing -1.4px, color `#101E33`, centered):
  **"It Just Takes £20,000 to Access UK Property"**
- Subtext (Inter Display 500, 20px, line-height 26px, color `#101E33` — NOT white, confirmed via computed style despite looking lighter against the bright photo):
  "Always wanted to invest in property but don't have the full deposit? Tokenisation may be the solution. Join our exclusive webinar to learn how it works"
- Date/time row (Inter 600, 18px, white text, emoji icons — 📅 / 🕐), separated by `|`:
  "📅 23 July 2026 | 🕐 1 PM GST (UAE)"
- CTA: **"Register Your Spot Now"** (navy pill button, described above)
- Entrance animation (confirmed from recording): staggered fade/slide-up on load — tags bar → headline+subtext+date group → CTA button (CTA visibly delayed ~1.5–2.5s after the rest). H1 itself is a **single block fade+slide** (not word-split — confirmed no per-word spans in the live DOM for H1, unlike H2).
- Below the fold-ish: embedded property tour video card (see assets above).
- Hero section total height ≈ `1785px` at 1600 viewport width; the arc/wave SVG divider overlaps its bottom ~330px, transitioning into Section 2.

## Section 4: Value Proposition ("Tokenisation...") Section

- Background: `section2_bg.png` (light blue rays → white), full-bleed.
- H2 (Newsheader 600, 80px, line-height 96px, letter-spacing -1px, centered, ~896px content column):
  **"Tokenisation Has Made It Easier Than Ever to Invest in UK Property"**
  - **Word-level color is fixed per word** (confirmed via DOM — this is NOT a continuous scroll-scrubbed gradient, it's a per-word emphasis map):
    - Navy/bold accent words: **Tokenisation, Easier, UK, Property**
    - Gray (`#595959`) regular words: Has, Made, It, Than, Ever, to, Invest, in
  - **Entrance animation per word** (confirmed via inline styles): each word is an `inline-block` span animating `opacity: 0.001 → 1`, `filter: blur(10px) → blur(0)`, `transform: translateY(10px) → translateY(0)`, individually staggered by index, triggered on scroll-into-view (Framer's `whileInView` pattern). Reproduce in Framer Motion with a `staggerChildren` container + per-word `motion.span` (opacity/blur/y variants).
- Paragraph (Inter Display 500, 20px, gray, centered): "No more heavy deposits or complex ownership structures just a simple, transparent way in. Join us in the webinar and we'll walk you through exactly how it works."
- Date/time row: same style as hero, dark text this time (not white, since background is light).
- CTA: **"Register for the event now"** (same button component).

---

## Implementation Plan

- **React + Vite**
- **Framer Motion** for entrance stagger + word-level scroll reveal (matches the site's own animation model almost exactly — no need for GSAP for these two sections)
- **Tailwind CSS** for layout/spacing utility styling
- **lucide-react** for eyebrow-bar icons
- Fonts via Google Fonts: `Newsreader` (600) + `Inter` (500/600)

## Open Items For Later Sections (not built yet)

- Audience qualification checklist section
- Speaker cards section
- Case study / process-steps section (likely template leftovers — confirm with user before building)
- Footer
