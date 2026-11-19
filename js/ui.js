/**
 * Shared UI polish: sticky nav state, mobile menu, scroll reveal, back-to-top.
 */
(function () {
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const backToTop = document.getElementById("back-to-top");

  function onScroll() {
    const y = window.pageYOffset || document.documentElement.scrollTop;
    if (navbar) navbar.classList.toggle("is-scrolled", y > 12);
    if (backToTop) backToTop.classList.toggle("show", y > 420);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const revealTargets = document.querySelectorAll(
    ".feature-card, .post-card, .product-card, .value-card, .about-grid, .contact-grid, .blog-controls"
  );

  revealTargets.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach((el) => observer.observe(el));

    // Cards injected later (home/blog) still get observed
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          const cards = node.matches?.(".post-card, .product-card")
            ? [node]
            : Array.from(node.querySelectorAll?.(".post-card, .product-card") || []);
          cards.forEach((card) => {
            card.classList.add("reveal");
            observer.observe(card);
          });
        });
      });
    });

    const watchRoots = ["#home-posts", "#blog-posts", "#related-posts", "#products-grid"]
      .map((sel) => document.querySelector(sel))
      .filter(Boolean);

    watchRoots.forEach((root) => mo.observe(root, { childList: true }));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }
})();
