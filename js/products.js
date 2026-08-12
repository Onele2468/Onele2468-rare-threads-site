/**
 * RARE THREADS — PRODUCT DATA
 * ----------------------------------------------------------------------
 * This is the ONLY file that needs editing to add, remove or update a
 * product. Nothing on the Collection page is hardcoded in HTML — the
 * page reads this array and renders it.
 *
 * [MBALI INPUT REQUIRED] — this array is intentionally empty. It ships
 * empty rather than filled with invented products, so the Collection
 * page currently shows an honest "first pieces coming soon" state
 * instead of fake stock. Add real pieces using the shape documented
 * in the PRODUCT_SHAPE example below — copy it, fill it in, delete
 * the comment markers.
 *
 * Field guide:
 *   id            unique slug, used in the URL, e.g. "kasi-tracksuit"
 *   name          product name as it should display
 *   status        one of: "available" | "limited" | "custom" | "sold-out"
 *   price         number (ZAR) or null if not yet decided
 *   sizes         array of strings, e.g. ["S","M","L"]
 *   story         1-3 sentences: the idea behind this piece
 *   description   practical description: fabric, fit, construction
 *   message       the visible garment message/quote, if the piece has
 *                 one — reproduced exactly as it appears on the garment
 *   images        array of image paths (see /assets/img/products/README)
 *   featured      true to show on the homepage featured strip
 *
 * Do not delete this file's structure to "make the site look fuller."
 * An honest small collection is the brand. See brand foundation doc,
 * Deliverable 9 — Content Rule.
 */

// Example only — NOT rendered, NOT a real product. Copy this shape.
// const PRODUCT_SHAPE = {
//   id: "example-piece",
//   name: "[Product Name]",
//   status: "available",
//   price: null,               // [MBALI INPUT REQUIRED]
//   sizes: ["S", "M", "L"],
//   story: "[One to three sentences on what this piece is about.]",
//   description: "[Fabric, fit, construction notes.]",
//   message: "[Visible garment message, if any — exact wording.]",
//   images: ["assets/img/products/example-piece-1.jpg"],
//   featured: false,
// };

  // Add real products here, in the shape shown above.
window.RARE_THREADS_PRODUCTS = [
  {
    id: "rare-piece-01",
    name: "Rare Piece 01",
    status: "limited",
    price: 1300,
    sizes: ["32"],
    story: "A one-off piece built around unusual fabric combinations and an intentionally different construction.",
    description: "Distinctive fabric texture with overlapping pockets, including an unusual pocket at the back. The fabric colours and construction are designed to make the piece feel artistic and unexpected.",
    message: "",
    images: ["assets/img/products/thabo-piece-01.jpg"],
    featured: true,
  },

  {
    id: "drip-piece-01",
    name: "Drip Piece 01",
    status: "available",
    price: 1100,
    sizes: ["M"],
    story: "A statement piece created for people who want their clothing to feel different.",
    description: "A distinctive Rare Threads piece with its own visual character and attitude.",
    message: "",
    images: ["assets/img/products/drip1.jpg"],
    featured: true,
  },

  {
    id: "drip-piece-02",
    name: "Drip Piece 02",
    status: "limited",
    price: 1200,
    sizes: ["L"],
    story: "A creative piece built around an expressive streetwear direction.",
    description: "A bold clothing piece designed to stand apart from ordinary everyday wear.",
    message: "",
    images: ["assets/img/products/drip2.jpg"],
    featured: false,
  },

  {
    id: "drip-piece-04",
    name: "Drip Piece 04",
    status: "available",
    price: 1000,
    sizes: ["M", "L"],
    story: "A simple statement piece with a strong visual identity.",
    description: "A Rare Threads design focused on attitude, individuality and everyday expression.",
    message: "",
    images: ["assets/img/products/drip4.jpg"],
    featured: false,
  },

  {
    id: "drip-piece-05",
    name: "Drip Piece 05",
    status: "limited",
    price: 900,
    sizes: ["M"],
    story: "A distinctive piece for someone who does not want to dress like everyone else.",
    description: "A bold Rare Threads piece with an individual look and creative character.",
    message: "",
    images: ["assets/img/products/drip5.jpg"],
    featured: false,
  },
];
