# Rare Threads — Website (V1)

The official Rare Threads website. Plain HTML/CSS/JS, no build step, no framework — kept deliberately light so it stays fast on mobile data. Five pages plus a product detail template, WhatsApp-first ordering, and a product catalog that lives in one file.

---

## 1. How to run it

No install, no build. It's a static site.

**Quickest way:**
```
cd rare-threads
python3 -m http.server 8000
```
Then open `http://localhost:8000` in a browser.

(Opening `index.html` directly by double-clicking also works for browsing, but running a local server is safer — some browsers restrict things like `fetch`/module behaviour on `file://`. This project doesn't use `fetch`, so double-clicking is fine too, just server is the more standard workflow.)

**To deploy:** this folder can be pushed as-is to Netlify, Vercel (static), GitHub Pages, or any basic web host. No environment variables or backend are required for V1.

---

## 2. The one file to edit before launch: `js/config.js`

```js
window.RARE_THREADS_CONFIG = {
  WHATSAPP_NUMBER: "",        // [MBALI INPUT REQUIRED]
  INSTAGRAM_HANDLE: "",       // optional
  EMAIL: "",                  // optional
  LOCATION_LABEL: "Diepsloot, South Africa",
};
```

Every "Order on WhatsApp" / "Start a request" button on every page reads from this one value — nothing is hardcoded elsewhere. Until `WHATSAPP_NUMBER` is filled in, those buttons stay visibly disabled and explain why if clicked, instead of silently breaking.

**To go live:** put the real WhatsApp Business number here in international format, digits only — e.g. a South African number `082 123 4567` becomes `"27821234567"`.

---

## 3. How to add a product

Everything the Collection page and product detail page show comes from one file: `js/products.js`. Nothing product-related is hardcoded in HTML.

Open `js/products.js` and add an object to the `RARE_THREADS_PRODUCTS` array, following the shape documented at the top of the file:

```js
window.RARE_THREADS_PRODUCTS = [
  {
    id: "kasi-tracksuit",              // used in the URL: product.html?id=kasi-tracksuit
    name: "Kasi Tracksuit",
    status: "available",               // "available" | "limited" | "custom" | "sold-out"
    price: 850,                        // number, or null for "Price on request"
    sizes: ["S", "M", "L", "XL"],
    story: "One sentence on the idea behind this piece.",
    description: "Fabric, fit, construction notes.",
    message: "The exact visible message on the garment, if any.",
    images: ["assets/img/products/kasi-tracksuit-1.jpg"],
    featured: true,                    // true = also shows on the homepage
  },
];
```

Leave `images` as an empty array (`[]`) until real photos exist — the site will show an honest "photo coming" placeholder instead of a broken image or a fake one. As soon as real product photography exists, drop the files into `assets/img/products/` and reference the paths here.

The Collection page and homepage automatically re-render from this array — no other file needs to change to add, edit, remove, or reorder a product.

---

## 4. How to replace the logo

The current logo is a clearly-marked **placeholder** — a simple stitched-circle "RT" monogram, not final artwork. It appears inline as SVG in the `<header>` and `<footer>` of every page, and in `assets/img/favicon.svg`.

To replace it with the final Signature Stitch RT artwork:
1. Export the final logo as an SVG (preferred, for crispness at any size) or PNG.
2. Replace the inline `<svg>...</svg>` block inside `.logo-mark` in each HTML file (search for `logo-mark` in each page), or point it to an `<img>` tag referencing your new file in `assets/img/`.
3. Replace `assets/img/favicon.svg` with the final favicon export.

Because the same markup pattern is repeated across all six pages, a careful find-and-replace across the project (or, next iteration, converting the header/footer into shared includes) is the fastest way to swap it everywhere at once.

---

## 5. How to replace photography

Every photo slot on the site is currently an honest **fabric-textured placeholder** with a label describing exactly what's needed (e.g. "Hero photograph — [MBALI INPUT REQUIRED] — documentary or lifestyle shot of a real piece"). None of them are fake or stock photography.

To replace a placeholder:
1. Drop the real image into `assets/img/` (suggested subfolders: `assets/img/products/`, `assets/img/founder/`, `assets/img/lifestyle/`).
2. Find the corresponding `<div class="fabric-placeholder">...</div>` block in the relevant HTML file and replace it with an `<img src="assets/img/..." alt="...">` inside the same `.frame` wrapper, so sizing stays consistent.
3. Product images are handled differently — see section 3 above; they come from `js/products.js`, not hardcoded HTML.

---

## 6. Project structure

```
rare-threads/
├── index.html          Home
├── story.html           Story (brand + founder + behind the threads)
├── collection.html       Collection (renders from products.js)
├── product.html          Single product detail (reads ?id= from the URL)
├── custom.html           Custom / Request
├── contact.html          Contact
├── css/
│   ├── tokens.css         Colour, type, spacing, motion — the brand system
│   ├── base.css            Resets, typography, layout utilities, placeholder style
│   └── components.css      Header, nav, hero, product cards, footer, etc.
├── js/
│   ├── config.js           WhatsApp number + other editable business values
│   ├── products.js          Product catalog — the only file to edit for stock
│   ├── product-render.js    Renders product grids/detail from products.js
│   └── main.js               Nav, WhatsApp link building, scroll reveal, footer
├── assets/img/
│   ├── favicon.svg
│   └── products/            Real product photos go here
└── README.md
```

---

## 7. Design system summary

- **Colour:** deep warm black (`--color-black`) as the dominant background, warm off-white (`--color-off-white` / `--color-paper`) for relief sections, and one brass "thread" accent (`--color-thread`) used sparingly — buttons, eyebrows, hover states, the product-message pull-quote. All defined in `css/tokens.css`.
- **Type:** *Big Shoulders* (condensed, industrial — reads like a stitched patch or workwear label) for headings; *Work Sans* for body copy; *IBM Plex Mono* for eyebrows, prices, sizes and meta info (set like a garment care label); *Caveat* used only for reproduced garment messages and pull-quotes, never for full paragraphs.
- **Signature motif:** the stitched dashed line and dashed-circle "RT" monogram — a literal thread reference, used as a divider and in the logo placeholder, never as generic decoration.
- **Motion:** minimal by design. A single fade/rise-on-scroll (`[data-reveal]`) and standard hover states — no intro animations, no scroll-jacking, no video backgrounds. This was a deliberate call: the initial audience is likely on mobile data, and load speed matters more than a clever reveal.

---

## 8. Accessibility & performance notes

- Semantic landmarks (`header`, `nav`, `main`, `footer`), skip-to-content link, visible focus states on every interactive element.
- Reduced-motion respected — animation durations collapse to `0ms` under `prefers-reduced-motion: reduce`.
- Mobile nav is keyboard-operable (Escape closes it, focus returns to the toggle button).
- No build step, no heavy JS framework, no render-blocking beyond the two Google Fonts requests — chosen deliberately to keep first load fast on mobile data.
- Images are placeholders for now; once real photography is added, keep using `loading="lazy"` on anything below the fold (already wired into `product-render.js`; apply the same attribute when hand-adding photos to other pages).

---

## 9. Testing completed

- All 5 core pages + product detail template return HTTP 200 from a local static server.
- All JS files pass a Node syntax check.
- HTML tag balance checked across all pages (div/section/header/footer/nav/main/a/ul/li/form).
- WhatsApp button behaviour verified in both states: disabled/explained when `WHATSAPP_NUMBER` is empty, and correctly building a `wa.me` link with URL-encoded message text when a number is present.
- Empty-state behaviour verified for the Collection page and homepage featured strip when `products.js` has no entries.
- Not yet tested: real device testing, real WhatsApp number end-to-end, real photography in place, cross-browser testing beyond standard evergreen browsers.

---

## 10. Remaining [MBALI INPUT REQUIRED] items

Before this is genuinely launch-ready, the following real information needs to be supplied — everything else is built and working around these gaps:

1. **WhatsApp Business number** (`js/config.js`) — currently blank, buttons are disabled until set.
2. **Real products** (`js/products.js`) — currently empty; add real pieces with real prices, sizes and photos.
3. **Product photography** — front/back/side/detail shots for each real piece.
4. **Founder & process photography** — Mbali, sewing machine, hands, fabric, workspace.
5. **Lifestyle/lookbook photography** — friends/launch models wearing real pieces.
6. **Final logo artwork** (Signature Stitch RT) — current mark is a placeholder monogram.
7. **Payment method(s) and, if applicable, a deposit policy for custom orders** — not a technical gap, a business decision Mbali needs to make; the site's copy is written generically enough ("payment terms are agreed and confirmed") to not assume an answer.
8. **Instagram handle / email**, if Rare Threads wants either linked (optional — the footer and contact page simply hide these until filled in).

Nothing above blocks the site from being previewed, reviewed, or developed further — it blocks the site from being **truthful when published live**, which is why none of it was invented.
