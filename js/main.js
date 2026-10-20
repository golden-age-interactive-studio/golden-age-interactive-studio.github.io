(() => {
  "use strict";

  // External link configuration. Replace empty strings with complete https:// URLs.
  const SITE_LINKS = Object.freeze({
    VENTURE_GRIND_GOOGLE_PLAY_URL: "",
    FOREST_ESSENTIALS_UNITY_URL: "",
    FOREST_COMPLETE_UNITY_URL: "",
    MEDIEVAL_STRATEGY_URL: ""
  });

  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navLinks = [...document.querySelectorAll(".primary-nav a")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const year = document.querySelector("[data-current-year]");
  if (year) year.textContent = new Date().getFullYear();

  const closeNavigation = (returnFocus = false) => {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
    if (returnFocus) navToggle.focus();
  };

  navToggle?.addEventListener("click", () => {
    const open = navToggle.getAttribute("aria-expanded") !== "true";
    nav?.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  navLinks.forEach((link) => link.addEventListener("click", () => closeNavigation()));

  const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 18);
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  document.querySelectorAll("[data-fallback-image]").forEach((image) => {
    const showFallback = () => image.classList.add("is-missing");
    image.addEventListener("error", showFallback, { once: true });
    if (image.complete && image.naturalWidth === 0) showFallback();
  });

  document.querySelectorAll("[data-config-link]").forEach((placeholder) => {
    const key = placeholder.dataset.configLink;
    const url = SITE_LINKS[key];
    if (!url) {
      placeholder.setAttribute("aria-disabled", "true");
      placeholder.title = `${placeholder.dataset.label} will be available when ${key} is configured.`;
      return;
    }
    try {
      const parsedUrl = new URL(url);
      if (!["https:", "http:"].includes(parsedUrl.protocol)) return;
      const link = document.createElement("a");
      link.className = "button button-muted";
      link.href = parsedUrl.href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = placeholder.dataset.label;
      link.insertAdjacentHTML("beforeend", ' <span aria-hidden="true">↗</span>');
      placeholder.replaceWith(link);
    } catch {
      console.warn(`Invalid URL configured for ${key}.`);
    }
  });

  const reveals = document.querySelectorAll(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((element) => element.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries, revealObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.1 });
    reveals.forEach((element) => observer.observe(element));
  }

  if ("IntersectionObserver" in window) {
    const sections = [...document.querySelectorAll("main section[id]")];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => {
        const active = link.hash === `#${visible.target.id}`;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-30% 0px -55%", threshold: [0, 0.2] });
    sections.forEach((section) => observer.observe(section));
  }

  const lightbox = document.querySelector("[data-lightbox]");
  const lightboxImage = document.querySelector("[data-lightbox-image]");
  const lightboxCaption = document.querySelector("[data-lightbox-caption]");
  const prevButton = document.querySelector("[data-lightbox-prev]");
  const nextButton = document.querySelector("[data-lightbox-next]");
  const galleryButtons = [...document.querySelectorAll("[data-gallery]")];
  let currentGallery = [];
  let currentIndex = 0;
  let opener = null;

  const renderLightbox = () => {
    const item = currentGallery[currentIndex];
    if (!item || !lightboxImage) return;
    lightboxImage.src = item.dataset.src;
    lightboxImage.alt = item.dataset.alt;
    if (lightboxCaption) lightboxCaption.textContent = item.dataset.alt;
    const multiple = currentGallery.length > 1;
    if (prevButton) prevButton.hidden = !multiple;
    if (nextButton) nextButton.hidden = !multiple;
  };
  const moveLightbox = (direction) => {
    currentIndex = (currentIndex + direction + currentGallery.length) % currentGallery.length;
    renderLightbox();
  };

  galleryButtons.forEach((button) => button.addEventListener("click", () => {
    if (!lightbox?.showModal) return;
    opener = button;
    currentGallery = galleryButtons.filter((item) => item.dataset.gallery === button.dataset.gallery);
    currentIndex = currentGallery.indexOf(button);
    renderLightbox();
    lightbox.showModal();
  }));
  document.querySelector("[data-lightbox-close]")?.addEventListener("click", () => lightbox?.close());
  prevButton?.addEventListener("click", () => moveLightbox(-1));
  nextButton?.addEventListener("click", () => moveLightbox(1));
  lightbox?.addEventListener("click", (event) => { if (event.target === lightbox) lightbox.close(); });
  lightbox?.addEventListener("close", () => {
    lightboxImage?.removeAttribute("src");
    opener?.focus();
  });

  document.addEventListener("keydown", (event) => {
    if (lightbox?.open) {
      if (event.key === "ArrowLeft") moveLightbox(-1);
      if (event.key === "ArrowRight") moveLightbox(1);
      return;
    }
    if (event.key === "Escape" && nav?.classList.contains("is-open")) closeNavigation(true);
  });
})();
