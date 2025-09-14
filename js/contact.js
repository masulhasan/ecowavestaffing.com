let phoneInput = document.querySelector("#phone");
let iti = window.intlTelInput(phoneInput, {
  initialCountry: "us",
  preferredCountries: ["us", "ca", "gb", "au"],
  separateDialCode: true,
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.2.1/js/utils.js",
  formatOnDisplay: true,
  nationalMode: false,
});

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

const form = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");
const errorMessage = document.getElementById("errorMessage");
const submitBtn = document.querySelector(".submit-btn");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  successMessage.style.display = "none";
  errorMessage.style.display = "none";

  if (!validateForm()) {
    return;
  }

  const phoneField = document.querySelector('input[name="phone"]');
  phoneField.value = iti.getNumber();

  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  try {
    const formData = new FormData(form);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      successMessage.style.display = "block";

      form.reset();
      iti.setNumber("");

      successMessage.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else {
      throw new Error(data.message || "Form submission failed");
    }
  } catch (error) {
    console.error("Error:", error);
    errorMessage.style.display = "block";
    errorMessage.scrollIntoView({ behavior: "smooth", block: "center" });
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
  }
});

function validateForm() {
  const requiredFields = [
    { name: "firstName", label: "first name" },
    { name: "lastName", label: "last name" },
    { name: "phone", label: "phone number" },
    { name: "email", label: "email address" },
    { name: "company", label: "company name" },
    { name: "companySize", label: "company size" },
    { name: "hearAbout", label: "how you heard about us" },
  ];

  for (let field of requiredFields) {
    const input = document.querySelector(`[name="${field.name}"]`);
    if (!input.value.trim()) {
      alert(`Please fill in the ${field.label} field.`);
      input.focus();
      return false;
    }
  }

  const email = document.querySelector('[name="email"]').value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    document.querySelector('[name="email"]').focus();
    return false;
  }

  if (!iti.isValidNumber()) {
    alert("Please enter a valid phone number.");
    phoneInput.focus();
    return false;
  }

  return true;
}

const inputs = document.querySelectorAll("input, select, textarea");
inputs.forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.style.transform = "translateY(-1px)";
  });

  input.addEventListener("blur", function () {
    this.parentElement.style.transform = "translateY(0)";
  });
});

document
  .querySelector(".signup-button")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const emailInput = document.querySelector(".signup-input");
    const email = emailInput.value.trim();

    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Thank you for subscribing!");
      emailInput.value = "";
    } else {
      alert("Please enter a valid email address.");
    }
  });

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

function autoHideMessage(element) {
  setTimeout(() => {
    if (element.style.display === "block") {
      element.style.display = "none";
    }
  }, 10000);
}

const messageObserver = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.type === "attributes" && mutation.attributeName === "style") {
      const element = mutation.target;
      if (element.style.display === "block") {
        autoHideMessage(element);
      }
    }
  });
});

messageObserver.observe(successMessage, { attributes: true });
messageObserver.observe(errorMessage, { attributes: true });

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
