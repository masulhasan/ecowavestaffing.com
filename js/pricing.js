const toggle = document.querySelector(".mobile-menu-toggle");
const menu = document.querySelector(".nav-menu");

toggle.addEventListener("click", () => {
  menu.classList.toggle("active");
  toggle.classList.toggle("active");
});

const navLinks = document.querySelectorAll(".nav-menu a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
    toggle.classList.remove("active");
  });
});

(function () {
  function isDesktop() {
    return window.innerWidth > 1024 && !("ontouchstart" in window);
  }

  if (isDesktop()) {
    document.body.style.cursor = "url('img/hover/cursor.png'), auto";

    const clickableElements = document.querySelectorAll(
      'a, button, .cta-button, .learn-more, .signup-button, .mobile-menu-toggle, input[type="email"], .nav-link, .nav-link-others, .nav-contact-btn, .footer-link, .footer-link-main'
    );

    clickableElements.forEach((element) => {
      element.style.cursor = "pointer";
    });

    window.addEventListener("resize", function () {
      if (!isDesktop()) {
        document.body.style.cursor = "auto";
        clickableElements.forEach((element) => {
          element.style.cursor = "auto";
        });
      } else {
        document.body.style.cursor = "url('img/hover/cursor.png'), auto";
        clickableElements.forEach((element) => {
          element.style.cursor = "pointer";
        });
      }
    });

    const style = document.createElement("style");
    style.textContent = `
            * {
                cursor: url('img/hover/cursor.png'), auto !important;
            }
            a, button, .cta-button, .learn-more, .signup-button, .mobile-menu-toggle, 
            input[type="email"], .nav-link, .nav-link-others, .nav-contact-btn, 
            .footer-link, .footer-link-main, [role="button"], [onclick] {
                cursor: pointer !important;
            }
            input[type="text"], input[type="email"], textarea {
                cursor: text !important;
            }
        `;
    document.head.appendChild(style);
  }
})();

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

const fadeUpElements = document.querySelectorAll(".fade-up");
fadeUpElements.forEach((el) => observer.observe(el));
