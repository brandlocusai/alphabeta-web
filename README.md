# Alpha Beta Preschool — Website

Plain HTML/CSS/JS. No build step, no npm, no framework. Upload the files as-is to any web host (cPanel, Netlify drag-and-drop, GitHub Pages, etc.).

## Files
- `index.html` — all page content and sections
- `styles.css` — design system (colors, type, layout, animation)
- `script.js` — scroll reveals, nav, FAQ accordion, testimonial slider, gallery lightbox, WhatsApp links, stat counters, confetti
- `assets/favicon.svg` — AB monogram favicon
- `robots.txt`, `sitemap.xml` — basic SEO files (update the domain inside both once you have one)

## Already filled in
- **WhatsApp click-to-chat**: 0312-8756462, wired up in `script.js` (`WHATSAPP_NUMBER`) and used by the nav button, floating WhatsApp bubble, final-CTA button, and the WhatsApp row in the Contact section — all open a pre-filled chat.
- **Google Maps**: the Contact section's map card links straight to your share link (`https://maps.app.goo.gl/LQnCWYWFPX9DgRLBA`). Note: Google's share links can't be embedded as an inline map (they block iframing), so it opens Google Maps in a new tab instead — same as tapping a map link anywhere else.
- **Hours**: 9:00 AM – 1:00 PM, shown in the Contact section and FAQ.
- **Real logo, cleanly placed**: the background was removed from your logo file and it was tightly cropped, so it sits in the nav and footer without any visible box or extra whitespace around it. `assets/logo-full.png` (icon + "ALPHA BETA" wordmark, transparent) is used in both places; `assets/logo-mark.png` (icon only, no wordmark) is also included in case you want a more compact version somewhere.
- **Original color palette** — indigo, green, orange, pink, yellow — kept as-is.
- Music activity card, the "Music Time" gallery tile, and the Testimonials section have been removed per your request.

## Still placeholders — replace before going live
1. **Address** — search `index.html` for `[Address Placeholder]` (contact section + structured data).
2. **Fees** — in the FAQ section, `[Fees Placeholder]`.
3. **Facebook / Instagram links** — the `href="#"` on the social icons in the contact block and footer.
4. **Photos** — every card with an icon + label (mobile-vs-play images, gallery grid, activity cards) is a styled placeholder standing in for a real photo. Add real images to `assets/`, then replace the `.img-placeholder` / `.masonry-item` divs with `<img>` tags.
5. **Domain** — update `https://www.alphabetapreschool.com/` in `index.html` (canonical + structured data), `robots.txt`, and `sitemap.xml`.

## Notes on what's implemented vs. simplified from the original spec
- Built in plain HTML/CSS/JS as requested — no Next.js/TypeScript/React, no Framer Motion/GSAP/Lenis dependency. Animations (scroll reveals, sticky brain diagram, floating blobs, counters, parallax blobs) are done with CSS + vanilla JS (`IntersectionObserver`) instead.
- Images are styled placeholder cards (gradient + icon + label) rather than stock photography, since no real photos were supplied — swap them per the notes above.
- Copy is fully written in Roman Urdu across every section, not just the examples given in the spec.
- Respects `prefers-reduced-motion` and is keyboard-navigable (visible focus comes from default browser outlines — style `:focus-visible` further if you want a custom look).

## Local preview
Just open `index.html` in a browser — everything is self-contained (fonts and icon library load from CDN, so an internet connection is needed for those).
