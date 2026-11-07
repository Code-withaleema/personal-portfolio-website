/* ==========================================================
   Aleema.dev — Portfolio Scripts (vanilla JavaScript)
   ========================================================== */

(function () {
  "use strict";

  // Flag that JS is running, so reveal animations only apply when they can work.
  document.documentElement.classList.add("js");

  const header = document.getElementById("header");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");

  /* ---------- Mobile menu ---------- */
  function setMenu(open) {
    navMenu.classList.toggle("open", open);
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open && window.innerWidth <= 800 ? "hidden" : "";
  }

  navToggle.addEventListener("click", function () {
    setMenu(!navMenu.classList.contains("open"));
  });

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () { setMenu(false); });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navMenu.classList.contains("open")) {
      setMenu(false);
      navToggle.focus();
    }
  });

  document.addEventListener("click", function (e) {
    if (navMenu.classList.contains("open") && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      setMenu(false);
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 800 && navMenu.classList.contains("open")) setMenu(false);
  });

  /* ---------- Sticky header shadow ---------- */
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Active nav link on scroll ---------- */
  function setActive(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + id);
    });
  }

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (section) { sectionObserver.observe(section); });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el, i) {
      // Small stagger for items that share a row.
      el.style.transitionDelay = (i % 3) * 80 + "ms";
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
