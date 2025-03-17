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
    "@type": "MedicalWebPage",
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

  // Hero button tracking
  const heroButton = document.querySelector(".hero-buttons a");
  if (heroButton) {
    heroButton.addEventListener("click", function () {
      // Send tracking event
      if (typeof gtag === "function") {
        gtag("event", "click", {
          event_category: "engagement",
          event_label: "learn_more_button",
        });
      }
    });
  }

  // EmailJS initialization
  if (typeof emailjs !== "undefined") {
    emailjs.init("GLHXZvwwzzZRsCbzW");
  }

  // Contact form handling
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Spam check (honeypot)
      const honeypot = document.getElementById("website");
      if (honeypot && honeypot.value) {
        console.log("Wykryto potencjalny spam");
        return false;
      }

      // Privacy consent check
      const privacyConsent = document.getElementById("privacy-consent");
      if (privacyConsent && !privacyConsent.checked) {
        alert(
          "Aby wysłać formularz, wymagana jest zgoda na przetwarzanie danych osobowych."
        );
        return false;
      }

      // Disable submit button to prevent multiple submissions
      const submitButton = this.querySelector('button[type="submit"]');
      if (submitButton) submitButton.disabled = true;

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject =
        document.getElementById("subject").value ||
        "Wiadomość z formularza kontaktowego";
      const message = document.getElementById("message").value;

      // Send email
      if (typeof emailjs !== "undefined") {
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
            contactForm.reset(); // Reset form fields
          })
          .catch(function (error) {
            console.error("FAILED:", error);
            alert("Wystąpił błąd podczas wysyłania wiadomości: " + error.text);
          })
          .finally(function () {
            if (submitButton) submitButton.disabled = false;
          });
      } else {
        console.error("EmailJS nie jest załadowany!");
        alert(
          "Wystąpił błąd podczas wysyłania wiadomości: EmailJS nie jest załadowany"
        );
        if (submitButton) submitButton.disabled = false;
      }
    });
  }

  // Cookie consent functionality
  const cookieConsent = document.getElementById("cookie-consent");
  const acceptBtn = document.getElementById("accept-cookies");
  const rejectBtn = document.getElementById("reject-cookies");

  if (cookieConsent && acceptBtn && rejectBtn) {
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem("cookieConsent");

    if (!cookieChoice) {
      // Show the banner if no choice has been made
      cookieConsent.style.display = "block";
    }

    acceptBtn.addEventListener("click", function () {
      localStorage.setItem("cookieConsent", "accepted");
      cookieConsent.style.display = "none";
      // Enable analytics and other cookies
      enableCookies();
    });

    rejectBtn.addEventListener("click", function () {
      localStorage.setItem("cookieConsent", "rejected");
      cookieConsent.style.display = "none";
      // Disable non-essential cookies
      disableCookies();
    });

    // Check if user has accepted cookies and enable them
    if (cookieChoice === "accepted") {
      enableCookies();
    }
  }

  function enableCookies() {
    // Enable Google Analytics and other tracking services
    if (typeof gtag === "function") {
      // Initialize Google Analytics or other tracking services
    }
  }

  function disableCookies() {
    // Disable tracking cookies
    // This is a placeholder for the actual implementation
  }
});
