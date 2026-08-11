/**
 * RARE THREADS — MAIN SITE BEHAVIOUR
 * Vanilla JS, no build step, no framework — kept deliberately light
 * so the site stays fast on mobile data. Runs after config.js and
 * products.js (and product-render.js on pages that need it).
 */
(function () {
  "use strict";

  var CONFIG = window.RARE_THREADS_CONFIG || {};

  /* ---------------------------------------------------------------
   * WhatsApp link builder — the single function every "Order on
   * WhatsApp" / "Start a request" button calls. One config value
   * (WHATSAPP_NUMBER) controls every button on the whole site.
   * ------------------------------------------------------------- */
  function buildWhatsAppLink(message) {
    var number = (CONFIG.WHATSAPP_NUMBER || "").replace(/\D/g, "");
    var encoded = encodeURIComponent(message || "Hi Rare Threads, I found your website and would like to ask about...");
    if (!number) {
      // No number configured yet — return null so callers can show a
      // clear "not connected yet" state instead of a broken link.
      return null;
    }
    return "https://wa.me/" + number + "?text=" + encoded;
  }
  window.buildWhatsAppLink = buildWhatsAppLink;

  function wireWhatsAppButtons() {
    var buttons = document.querySelectorAll("[data-wa-message]");
    buttons.forEach(function (btn) {
      var message = btn.getAttribute("data-wa-message");
      var link = buildWhatsAppLink(message);
      if (link) {
        btn.setAttribute("href", link);
        btn.removeAttribute("aria-disabled");
        btn.classList.remove("is-disabled");
      } else {
        btn.setAttribute("href", "#");
        btn.setAttribute("aria-disabled", "true");
        btn.classList.add("is-disabled");
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          alert("WhatsApp ordering isn't connected yet. Add the real number in js/config.js (WHATSAPP_NUMBER) to switch this on.");
        });
      }
    });
  }

  /* ---------------------------------------------------------------
   * Mobile navigation
   * ------------------------------------------------------------- */
  function wireMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var drawer = document.querySelector(".mobile-nav");
    if (!toggle || !drawer) return;

    toggle.addEventListener("click", function () {
      var isOpen = drawer.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    drawer.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        drawer.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer.classList.contains("is-open")) {
        drawer.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        toggle.focus();
      }
    });
  }

  /* ---------------------------------------------------------------
   * Active nav state — marks the current page's link.
   * ------------------------------------------------------------- */
  function markActiveNav() {
    var current = (location.pathname.split("/").pop() || "index.html");
    document.querySelectorAll("[data-nav-link]").forEach(function (link) {
      var href = link.getAttribute("href");
      if (href === current || (current === "" && href === "index.html")) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  /* ---------------------------------------------------------------
   * Scroll reveal — small, one-directional, respects reduced motion
   * via the CSS custom-property durations already set to 0ms.
   * ------------------------------------------------------------- */
  function wireScrollReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------------------------------------------------------
   * Footer year + contact details from config
   * ------------------------------------------------------------- */
  function fillFooterConfig() {
    var yearEl = document.querySelector("[data-year]");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    document.querySelectorAll("[data-config-location]").forEach(function (el) {
      el.textContent = CONFIG.LOCATION_LABEL || "Diepsloot, South Africa";
    });

    var igItems = document.querySelectorAll("[data-config-instagram]");
igItems.forEach(function (el) {
  if (CONFIG.INSTAGRAM_URL) {
    el.textContent = "Instagram";
    el.href = CONFIG.INSTAGRAM_URL;
    el.target = "_blank";
    el.rel = "noopener noreferrer";

    var wrap = el.closest("[data-config-instagram-wrap]");
    if (wrap) wrap.removeAttribute("hidden");
  }
});

var facebookItems = document.querySelectorAll("[data-config-facebook]");
facebookItems.forEach(function (el) {
  if (CONFIG.FACEBOOK_URL) {
    el.textContent = "Facebook";
    el.href = CONFIG.FACEBOOK_URL;
    el.target = "_blank";
    el.rel = "noopener noreferrer";

    var wrap = el.closest("[data-config-facebook-wrap]");
    if (wrap) wrap.removeAttribute("hidden");
  }
});

var tiktokItems = document.querySelectorAll("[data-config-tiktok]");
tiktokItems.forEach(function (el) {
  if (CONFIG.TIKTOK_URL) {
    el.textContent = "TikTok";
    el.href = CONFIG.TIKTOK_URL;
    el.target = "_blank";
    el.rel = "noopener noreferrer";

    var wrap = el.closest("[data-config-tiktok-wrap]");
    if (wrap) wrap.removeAttribute("hidden");
  }
});

var emailItems = document.querySelectorAll("[data-config-email]");
emailItems.forEach(function (el) {
  if (CONFIG.EMAIL) {
    el.textContent = CONFIG.EMAIL;
    el.href = "mailto:" + CONFIG.EMAIL;

    var wrap = el.closest("[data-config-email-wrap]");
    if (wrap) wrap.removeAttribute("hidden");
  }
});

  document.addEventListener("DOMContentLoaded", function () {
    wireWhatsAppButtons();
    wireMobileNav();
    markActiveNav();
    wireScrollReveal();
    fillFooterConfig();
  });
})();
