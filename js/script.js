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
    "@type": "MedicalWebPage", // Bardziej konkretny typ
    headline: "KulkiPodLupą - Twój portal o Raku Jąder",
    description:
      "Wszystko co chcesz wiedzieć o Raku Jąder - informacje, porady, profilaktyka",
    mainEntityOfPage: window.location.origin,
    publisher: {
      "@type": "Organization",
      name: "KulkiPodLupą",
      logo: {
        "@type": "ImageObject",
        url: window.location.origin + "/images/rakbeztla.png",
      },
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#about", "#care", "#help"],
    },
  };
  schemaScript.textContent = JSON.stringify(schemaData);
  document.head.appendChild(schemaScript);
});

document
  .querySelector(".hero-buttons a")
  .addEventListener("click", function () {
    // Send tracking event
    if (typeof gtag === "function") {
      gtag("event", "click", {
        event_category: "engagement",
        event_label: "learn_more_button",
      });
    }
  });

//email.js

document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("GLHXZvwwzzZRsCbzW");

  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Disable submit button to prevent multiple submissions
      const submitButton = this.querySelector('button[type="submit"]');
      if (submitButton) submitButton.disabled = true;

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Send email
      emailjs
        .send("service_1lyheom", "template_z90w3rg", {
          user_name: name,
          user_email: email,
          user_subject: subject,
          message: message,
        })
        .then(function (response) {
          console.log("SUCCESS:", response);
          alert("Wiadomość została wysłana pomyślnie!");
          form.reset(); // Reset form fields
        })
        .catch(function (error) {
          console.error("FAILED:", error);
          alert("Wystąpił błąd podczas wysyłania wiadomości: " + error.text);
        })
        .finally(function () {
          if (submitButton) submitButton.disabled = false;
        });
    });
  } else {
    console.error("Contact form not found!");
  }
});
