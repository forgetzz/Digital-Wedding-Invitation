# Alya & Fajar — Digital Islamic Wedding Invitation

A premium, interactive digital wedding invitation built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and GSAP. Instead of a normal scrolling website, the invitation behaves like a luxury interactive book: guests click through an opening cover and a floating menu to move between pages, with GSAP-driven page-turn style transitions.

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

To build for production:

```bash
npm run build
npm run start
```

### Dependencies installed automatically by `npm install`

- `next`, `react`, `react-dom` — framework
- `gsap` — all animations and page transitions
- `typescript`, `tailwindcss`, `postcss`, `autoprefixer`, `eslint` — tooling

No extra manual install commands are required beyond `npm install`.

## Customizing for another couple

All wedding-specific content — names, parents, dates, story timeline, event details, gallery images, and the closing message — lives in a single file:

```
src/data/wedding.ts
```

Edit that file only and every page (cover, home, couple, story, event, gallery, RSVP, closing) updates automatically. Gallery and profile photos are plain URLs; swap them for your own image paths or hosted URLs (remote image hosts must be added to `images.remotePatterns` in `next.config.js`).

## Project structure

```
src/
  app/
    page.tsx        # Orchestrates stages, active page, and transitions
    layout.tsx       # Fonts (Cormorant Garamond, Jost, Great Vibes) + metadata
    globals.css       # Tailwind base + Islamic texture / hairline utilities

  components/
    invitation/
      InvitationCover.tsx   # Opening screen + "Open Invitation" animation
      InvitationHome.tsx    # Greeting, names, date, Quranic verse
      CoupleSection.tsx     # Bride & groom profiles
      StorySection.tsx      # "Our Story" vertical timeline
      EventSection.tsx      # Akad & reception cards + countdown
      Countdown.tsx         # Real-time countdown with tick animation
      GallerySection.tsx    # Masonry gallery + GSAP lightbox
      RSVPSection.tsx       # RSVP form (mock submit, API-ready)
      ClosingSection.tsx    # Final love-story / closing message

    navigation/
      InvitationMenu.tsx    # Floating circular menu → vertical page list

    animations/
      gsapAnimations.ts     # Reusable timelines: openInvitation, pageEnter,
                             # pageExit, staggerReveal, floralReveal, etc.

    ui/
      Button.tsx             # Shared button (solid / outline / ghost)
      FloralDecoration.tsx   # Hand-authored SVG floral illustrations
      IslamicPattern.tsx     # Hand-authored SVG geometric/arch motifs

  data/
    wedding.ts    # Single source of truth for all wedding content
```

## Notes on the RSVP form

The form currently uses local component state and a mock `submitRsvp()` function in `RSVPSection.tsx` (a 700ms simulated request). To connect it to a real backend, replace the body of `submitRsvp` with an actual request, e.g.:

```ts
async function submitRsvp(payload: RSVPPayload) {
  const res = await fetch("/api/rsvp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}
```

No other component needs to change.

## Motion & accessibility

- All primary transitions (opening the cover, switching pages, the RSVP success state, the gallery lightbox) are driven by GSAP timelines defined once in `gsapAnimations.ts` and reused everywhere, using `gsap.context()` inside `useLayoutEffect` for automatic cleanup.
- `prefers-reduced-motion` is respected: reduced-motion users get near-instant transitions (see `globals.css` and `registerReducedMotion()`).
- Buttons are large and touch-friendly, and the whole layout is mobile-first and fully responsive.
