/**
 * RARE THREADS — PRODUCT RENDERING
 * Reads window.RARE_THREADS_PRODUCTS (js/products.js) and renders the
 * Collection grid, the homepage featured strip, and a single product
 * detail view. No product content is hardcoded in HTML.
 */
(function () {
  "use strict";

  var PRODUCTS = window.RARE_THREADS_PRODUCTS || [];

  var STATUS_LABEL = {
    "available": "Available now",
    "limited": "Limited piece",
    "custom": "Made to request",
    "sold-out": "Sold out",
  };

  function formatPrice(price) {
    if (price === null || price === undefined) return "Price on request";
    return "R" + Number(price).toLocaleString("en-ZA");
  }

  function waMessageForProduct(product) {
    return "Hi Rare Threads, I'd like to order " + product.name + ". I found it on the Rare Threads website.";
  }

  function placeholderBlock(label) {
    var div = document.createElement("div");
    div.className = "fabric-placeholder";
    var span = document.createElement("span");
    span.className = "ph-label";
    span.textContent = label;
    div.appendChild(span);
    return div;
  }

  function productImage(product) {
    // No real photography pipeline yet — every product renders an
    // honest placeholder until real images are supplied in
    // /assets/img/products/ and referenced in js/products.js.
    if (product.images && product.images.length) {
      var img = document.createElement("img");
      img.src = product.images[0];
      img.alt = product.name + " — Rare Threads";
      img.loading = "eager";
      return img;
    }
    return placeholderBlock("Product photo\n[MBALI INPUT REQUIRED]\n" + product.name);
  }

  function renderCard(product) {
    var a = document.createElement("a");
    a.className = "product-card";
    a.href = "product.html?id=" + encodeURIComponent(product.id);
    a.setAttribute("data-reveal", "");
    a.classList.add("is-visible");

    var frame = document.createElement("div");
    frame.className = "frame";
    frame.appendChild(productImage(product));
    a.appendChild(frame);

    var body = document.createElement("div");
    body.className = "product-card-body";

    var status = document.createElement("span");
    status.className = "product-status status-" + product.status;
    status.textContent = STATUS_LABEL[product.status] || product.status;
    body.appendChild(status);

    var name = document.createElement("h3");
    name.className = "product-name";
    name.textContent = product.name;
    body.appendChild(name);

    if (product.story) {
      var story = document.createElement("p");
      story.className = "product-story";
      story.textContent = product.story;
      body.appendChild(story);
    }

    var meta = document.createElement("div");
    meta.className = "product-meta";
    var price = document.createElement("span");
    price.textContent = formatPrice(product.price);
    var sizes = document.createElement("span");
    sizes.className = "muted";
    sizes.textContent = (product.sizes && product.sizes.length) ? product.sizes.join(" / ") : "";
    meta.appendChild(price);
    meta.appendChild(sizes);
    body.appendChild(meta);

    a.appendChild(body);
    return a;
  }

  function renderGrid(targetSelector, emptyStateSelector, filterFn) {
    var target = document.querySelector(targetSelector);
    if (!target) return;
    var list = filterFn ? PRODUCTS.filter(filterFn) : PRODUCTS.slice();

    if (!list.length) {
      target.setAttribute("hidden", "");
      var empty = document.querySelector(emptyStateSelector);
      if (empty) empty.removeAttribute("hidden");
      return;
    }

    target.removeAttribute("hidden");
    var empty2 = document.querySelector(emptyStateSelector);
    if (empty2) empty2.setAttribute("hidden", "");

    list.forEach(function (product) {
      target.appendChild(renderCard(product));
    });
  }

  function renderProductDetail(mountSelector) {
    var mount = document.querySelector(mountSelector);
    if (!mount) return;
    var params = new URLSearchParams(location.search);
    var id = params.get("id");
    var product = PRODUCTS.find(function (p) { return p.id === id; });

    if (!product) {
      mount.innerHTML =
        '<div class="empty-state">' +
        '<h3>This piece isn\u2019t available</h3>' +
        '<p>It may have been sold, or the link is out of date. Head back to the collection to see what\u2019s currently available, or start a custom request.</p>' +
        '<div class="hero-actions" style="justify-content:center;margin-top:1.5rem;">' +
        '<a class="btn btn-outline" href="collection.html">Back to collection</a>' +
        '<a class="btn btn-primary" href="custom.html">Start a custom request</a>' +
        '</div></div>';
      var pageTitle = document.querySelector("title");
      if (pageTitle) pageTitle.textContent = "Piece not found — Rare Threads";
      return;
    }

    document.title = product.name + " — Rare Threads";

    var gallery = document.createElement("div");
    gallery.className = "product-detail-gallery";
    var mainFrame = document.createElement("div");
    mainFrame.className = "frame";
    mainFrame.appendChild(productImage(product));
    gallery.appendChild(mainFrame);

    if (product.images && product.images.length > 1) {
      var thumbs = document.createElement("div");
      thumbs.className = "product-detail-thumbs";
      product.images.slice(1, 4).forEach(function (src) {
        var f = document.createElement("div");
        f.className = "frame";
        var img = document.createElement("img");
        img.src = src;
        img.alt = product.name + " detail";
        img.loading = "eager";
        f.appendChild(img);
        thumbs.appendChild(f);
      });
      gallery.appendChild(thumbs);
    }

    var info = document.createElement("div");
    info.className = "product-detail-info";

    var status = document.createElement("span");
    status.className = "product-status status-" + product.status;
    status.textContent = STATUS_LABEL[product.status] || product.status;
    info.appendChild(status);

    var name = document.createElement("h1");
    name.className = "product-name";
    name.textContent = product.name;
    info.appendChild(name);

    var price = document.createElement("div");
    price.className = "price";
    price.textContent = formatPrice(product.price);
    info.appendChild(price);

    if (product.story) {
      var story = document.createElement("p");
      story.className = "story";
      story.textContent = product.story;
      info.appendChild(story);
    }

    if (product.message) {
      var msg = document.createElement("blockquote");
      msg.className = "product-message";
      msg.textContent = "\u201C" + product.message + "\u201D";
      info.appendChild(msg);
    }

    var specs = document.createElement("dl");
    specs.className = "spec-list";
    function addSpec(term, value) {
      if (!value) return;
      var row = document.createElement("div");
      row.className = "spec-row";
      var dt = document.createElement("dt");
      dt.textContent = term;
      var dd = document.createElement("dd");
      dd.style.margin = "0";
      dd.textContent = value;
      row.appendChild(dt);
      row.appendChild(dd);
      specs.appendChild(row);
    }
    addSpec("Sizes", product.sizes && product.sizes.length ? product.sizes.join(", ") : "Ask on WhatsApp");
    addSpec("Details", product.description || "");
    info.appendChild(specs);

    if (product.status === "sold-out") {
      var soldBtn = document.createElement("a");
      soldBtn.className = "btn btn-outline";
      soldBtn.href = "custom.html";
      soldBtn.textContent = "Ask about a similar custom piece";
      info.appendChild(soldBtn);
    } else {
      var orderBtn = document.createElement("a");
      orderBtn.className = "btn btn-primary wa-btn";
      orderBtn.setAttribute("data-wa-message", waMessageForProduct(product));
      orderBtn.href = "#";
      orderBtn.innerHTML = whatsappIconSvg() + '<span>Order on WhatsApp</span>';
      info.appendChild(orderBtn);
    }

    var wrapper = document.createElement("div");
    wrapper.className = "product-detail";
    wrapper.appendChild(gallery);
    wrapper.appendChild(info);

    mount.innerHTML = "";
    mount.appendChild(wrapper);

    // Re-run WhatsApp wiring for the newly injected button.
    if (window.wireWhatsAppButtonsPublic) window.wireWhatsAppButtonsPublic();
    else {
      var btn = mount.querySelector("[data-wa-message]");
      if (btn && window.buildWhatsAppLink) {
        var link = window.buildWhatsAppLink(btn.getAttribute("data-wa-message"));
        if (link) { btn.href = link; }
        else {
          btn.href = "#";
          btn.classList.add("is-disabled");
          btn.addEventListener("click", function (e) {
            e.preventDefault();
            alert("WhatsApp ordering isn't connected yet. Add the real number in js/config.js.");
          });
        }
      }
    }
  }

  function whatsappIconSvg() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.47 14.38c-.29-.14-1.7-.84-1.96-.93-.26-.1-.46-.14-.65.14-.19.29-.75.93-.92 1.12-.17.19-.34.21-.63.07-.29-.14-1.22-.45-2.32-1.43-.86-.77-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.65-1.56-.89-2.14-.23-.56-.47-.48-.65-.49-.17-.01-.36-.01-.55-.01-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43 0 1.43 1.03 2.82 1.17 3.01.14.19 2.03 3.1 4.92 4.35.69.3 1.22.48 1.64.61.69.22 1.31.19 1.81.11.55-.08 1.7-.7 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.33z"/><path d="M12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.85.5 3.58 1.36 5.07L2 22l5.06-1.33A9.94 9.94 0 0 0 12.02 22C17.54 22 22 17.52 22 12S17.54 2 12.02 2zm0 18.15c-1.66 0-3.2-.46-4.52-1.26l-.32-.19-3.01.79.8-2.93-.21-.3A8.15 8.15 0 0 1 3.85 12c0-4.5 3.67-8.15 8.17-8.15S20.19 7.5 20.19 12s-3.67 8.15-8.17 8.15z"/></svg>';
  }

  window.RareThreadsProducts = {
    all: PRODUCTS,
    renderGrid: renderGrid,
    renderProductDetail: renderProductDetail,
    formatPrice: formatPrice,
    waMessageForProduct: waMessageForProduct,
  };
})();
