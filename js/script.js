document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      const isExpanded = navMenu.classList.contains("active");
      menuToggle.setAttribute("aria-expanded", isExpanded);
    });
  }

  // Add active class to current page
  const currentLocation = window.location.href;
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    if (currentLocation.includes(link.getAttribute("href"))) {
      link.classList.add("active");
    }
  });

  // Accessibility toggles
  const contrastToggle = document.querySelector(".contrast-toggle");
  const fontSizeToggle = document.querySelector(".font-size-toggle");

  if (contrastToggle) {
    contrastToggle.addEventListener("click", function () {
      document.body.classList.toggle("high-contrast");
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        document.body.classList.toggle("dark");
      }
    });
  }

  if (fontSizeToggle) {
    fontSizeToggle.addEventListener("click", function () {
      document.body.classList.toggle("large-text");
    });
  }

  // Add schema markup for better SEO
  const schemaScript = document.createElement("script");
  schemaScript.type = "application/ld+json";
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "KulkiPodLupą",
    url: window.location.origin,
    potentialAction: {
      "@type": "SearchAction",
      target: window.location.origin + "/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
  schemaScript.textContent = JSON.stringify(schemaData);
  document.head.appendChild(schemaScript);
});
