/**
 * RARE THREADS — SITE CONFIGURATION
 * ----------------------------------------------------------------------
 * This is the ONLY file that should need editing to launch the site.
 * Every WhatsApp button on every page reads its number from here —
 * nothing is hardcoded in individual pages or components.
 *
 * [MBALI INPUT REQUIRED]
 *   - WHATSAPP_NUMBER: real WhatsApp Business number, international
 *     format, digits only (no +, spaces or dashes).
 *     e.g. South African number 082 123 4567 -> "27821234567"
 */
window.RARE_THREADS_CONFIG = {
  // REQUIRED before launch. Leave empty to keep WhatsApp buttons in a
  // clearly-marked "not yet connected" state instead of breaking silently.
  WHATSAPP_NUMBER: "0650668294", // e.g. "27821234567"

  // Optional — shown in the footer / contact page if provided.
  INSTAGRAM_HANDLE: "", // e.g. "rarethreads.sa"
  EMAIL: "",            // e.g. "hello@rarethreads.co.za"

  // General location only — never publish an exact home address.
  LOCATION_LABEL: "Diepsloot, South Africa",

  BRAND_NAME: "Rare Threads",
};
