// ===== Config =====
const LEAD_ENDPOINT = "https://script.google.com/macros/s/AKfycbzNC3OJcfzy2rOKHTqT0m3OGmWZ_R_OlMIv0X-ImnHhgk_4OnMsJ3Fzv6cnblgMjrM2-g/exec";
const PROJECT_NAME = "The Ananta Aspire";

// ===== FAQ data =====
const faqs = [
  { q: "Is The Ananta Aspire RERA registered?", a: "Yes. The project is registered under Punjab RERA with the number PBRERA-SAS79-PR0777." },
  { q: "Where exactly is Ananta Aspire located?", a: "It sits directly on NH-7, the Chandigarh-Patiala Highway, in Zirakpur, Punjab 140603 — one of the busiest growth corridors in the Tricity." },
  { q: "What configurations are available?", a: "3 BHK, 3 BHK + Study/Attendant Room, and 4 BHK + Study/Attendant Room, spread across multiple towers with two apartments on each floor." },
  { q: "How many apartments does the project have in total?", a: "The project spans 34,050 sq. yards and comprises 440 apartments in total." },
  { q: "How many apartments are there on each floor?", a: "Just two apartments per floor in every block, which is the main reason buyers cite for the project's privacy." },
  { q: "What construction technology is used?", a: "The towers are built using Mivan (monolithic shuttering) construction, known for structural strength, faster build quality and lower long-term maintenance." },
  { q: "How far is Chandigarh Airport from Ananta Aspire?", a: "Shaheed Bhagat Singh International Airport, Chandigarh, is approximately 15 minutes away by road." },
  { q: "How far is Elante Mall?", a: "Elante Mall is approximately 15 minutes from the project by road." },
  { q: "Is the project close to hospitals?", a: "Yes — Amcare Hospital is around 3 minutes away, Mehar Hospital 2 minutes, and Fortis Mohali and GMCH Sector 32 are both roughly 15 minutes away." },
  { q: "Are there good schools nearby?", a: "St Xavier's School is about 10 minutes away, and Chitkara University is roughly 20 minutes from the project." },
  { q: "What amenities does Ananta Aspire offer?", a: "The amenity list includes a rooftop swimming pool, gym and yoga deck, movie theatre, library, banquet hall, café, kids' play areas, sports courts, landscaped gardens and three-tier security, among others." },
  { q: "Does the project have EV charging?", a: "Yes, EV charging stations are part of the project's amenities." },
  { q: "What kind of security does the project have?", a: "A three-tier security system covering the main gate, tower entrances and individual floors." },
  { q: "Are the apartments smart-home enabled?", a: "Yes, the apartments are described as fully automated homes with smart home technology built in." },
  { q: "What is done about hard water in the area?", a: "The project includes a dedicated water softener plant supplying soft water project-wide, plus insulated SMC water tanks." },
  { q: "Do the apartments get good natural light and ventilation?", a: "Yes — the layouts are designed for cross-ventilation and daylight through the day, with double-glazed glass to reduce highway noise." },
  { q: "Who is the developer of Ananta Aspire?", a: "The project is developed by M/S Svastiga Infra Private Limited." },
  { q: "Can I get a call back with current pricing?", a: "Yes — pricing changes with inventory and floor, so share your number using the enquiry form and our team will call you back with current rates for your preferred configuration." },
  { q: "What does 'dual core' mean for this project?", a: "It refers to the two-apartment-per-floor layout — every home is open on both sides, facing the landscaped park on one end and the skyline on the other, giving cross-ventilation and daylight through the day." },
  { q: "What features does the master plan include?", a: "The master plan includes a central plaza, clubhouse, cloud forest, bamboo and zen gardens, a skating rink, cricket pitch, badminton and lawn tennis courts, a party lawn, kids' play areas and a 60-foot wide entrance road." },
  { q: "What is the possession status of Ananta Aspire?", a: "Several towers at Ananta Aspire are ready to move, with residents already in occupation, while other towers are in final stages of construction — the exact status depends on the tower and floor. Share your number and our team will confirm the current possession status for your preferred configuration." },
  { q: "Are resale units available at Ananta Aspire?", a: "Yes — resale units become available from time to time as early buyers list their apartments. Resale pricing depends on floor, tower, facing and current demand. Contact us for verified resale options currently available." },
  { q: "Can I rent an apartment at Ananta Aspire?", a: "Yes, rental units are available from time to time, generally in the range of ₹40,000–₹50,000 per month depending on configuration, floor and furnishing. Contact us for current availability." },
  { q: "What is the pin code for Ananta Aspire, Zirakpur?", a: "The Ananta Aspire is located on NH-7, Chandigarh-Patiala Highway, Zirakpur, Punjab — PIN code 140603." }
];

// ===== Build FAQ accordion =====
function buildFaq() {
  const container = document.getElementById("faqAccordion");
  if (!container) return;
  faqs.forEach((item, i) => {
    const el = document.createElement("div");
    el.className = "faq-item";
    el.innerHTML = `
      <button class="faq-question" aria-expanded="false">
        <span>${item.q}</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-answer"><p>${item.a}</p></div>
    `;
    const btn = el.querySelector(".faq-question");
    btn.addEventListener("click", () => {
      const isOpen = el.classList.contains("open");
      container.querySelectorAll(".faq-item").forEach(f => f.classList.remove("open"));
      if (!isOpen) el.classList.add("open");
    });
    container.appendChild(el);
  });
}

// ===== Modal handling =====
let modalOpenedViaHistory = false;

function openModal(source) {
  const modal = document.getElementById("leadModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  modal.dataset.source = source || "Unknown";
  history.pushState({ ananteModal: true }, "");
  modalOpenedViaHistory = true;
}
function closeModal(fromPopState) {
  const modal = document.getElementById("leadModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  if (!fromPopState && modalOpenedViaHistory) {
    modalOpenedViaHistory = false;
    history.back();
  } else {
    modalOpenedViaHistory = false;
  }
}

// ===== Phone helpers =====
function sanitizePhone(raw) {
  let digits = (raw || "").replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
}
function isValidPhone(digits) {
  return /^[6-9]\d{9}$/.test(digits);
}

// ===== Lead submission =====
async function submitLead(data, statusEl) {
  try {
    // Fire-and-forget: no-cors mode gives an opaque response we can't read anyway,
    // so we don't wait on it — this makes the form feel instant instead of waiting
    // on the Apps Script backend (which can take a few seconds to spin up).
    fetch(LEAD_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
        project: PROJECT_NAME,
        name: data.name,
        phone: data.phone,
        configuration: data.configuration || "",
        source: data.source || "",
        page: window.location.href,
        timestamp: new Date().toISOString()
      })
    }).catch(() => {});
    statusEl.textContent = "";
    return true;
  } catch (err) {
    statusEl.textContent = "Something went wrong. Please try again.";
    return false;
  }
}

// ===== Hero carousel =====
function initHeroCarousel() {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dot");
  if (!slides.length) return;
  let current = 0;
  function goTo(i) {
    slides[current].classList.remove("active");
    dots[current]?.classList.remove("active");
    current = i;
    slides[current].classList.add("active");
    dots[current]?.classList.add("active");
  }
  dots.forEach((dot, i) => dot.addEventListener("click", () => goTo(i)));
  setInterval(() => goTo((current + 1) % slides.length), 5000);
}

// ===== Scroll reveal =====
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !items.length) {
    items.forEach(el => el.classList.add("in-view"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(el => observer.observe(el));
}

// ===== Image lightbox =====
function initLightbox() {
  const lightbox = document.getElementById("imgLightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  if (!lightbox) return;
  document.querySelectorAll(".js-lightbox").forEach(img => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.remove("hidden");
      lightbox.classList.add("flex");
    });
  });
  document.querySelector(".js-close-lightbox")?.addEventListener("click", () => {
    lightbox.classList.add("hidden");
    lightbox.classList.remove("flex");
  });
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.add("hidden");
      lightbox.classList.remove("flex");
    }
  });
}

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
  buildFaq();
  initHeroCarousel();
  initScrollReveal();
  initLightbox();

  // Header background on scroll (transparent over hero, solid after)
  const header = document.getElementById("siteHeader");
  const toggleHeader = () => {
    if (window.scrollY > 60) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  toggleHeader();
  window.addEventListener("scroll", toggleHeader);

  // Mobile menu toggle
  const menuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  menuBtn?.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("hidden");
    mobileMenu.classList.toggle("hidden");
    menuBtn.setAttribute("aria-expanded", String(!isOpen));
  });
  mobileMenu?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => mobileMenu.classList.add("hidden"));
  });

  // Open modal triggers
  document.querySelectorAll(".js-open-modal").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(btn.dataset.source);
    });
  });
  document.querySelectorAll(".js-close-modal").forEach(btn => {
    btn.addEventListener("click", () => closeModal(false));
  });
  document.getElementById("leadModal").addEventListener("click", (e) => {
    if (e.target.id === "leadModal") closeModal(false);
  });

  // Back button closes the modal instead of navigating away from the page
  window.addEventListener("popstate", () => {
    const modal = document.getElementById("leadModal");
    if (modal && modal.classList.contains("flex")) {
      closeModal(true);
    }
  });

  // Modal form submit
  const modalForm = document.getElementById("modalForm");
  const modalSuccess = document.getElementById("modalSuccess");
  const modalStatus = document.getElementById("modalStatus");
  modalForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(modalForm);
    const phone = sanitizePhone(formData.get("phone"));
    if (!isValidPhone(phone)) {
      modalStatus.textContent = "Please enter a valid 10-digit mobile number.";
      return;
    }
    const source = document.getElementById("leadModal").dataset.source;
    const ok = await submitLead(
      { name: formData.get("name"), phone, source },
      modalStatus
    );
    if (ok) {
      sessionStorage.setItem("leadCaptured", "true");
      modalForm.classList.add("hidden");
      modalSuccess.classList.remove("hidden");
      modalSuccess.classList.add("flex");
      setTimeout(() => {
        closeModal();
        modalForm.reset();
        modalStatus.textContent = "";
        modalForm.classList.remove("hidden");
        modalSuccess.classList.add("hidden");
        modalSuccess.classList.remove("flex");
      }, 2500);
    }
  });

  // Main enquiry form submit
  const enquiryForm = document.getElementById("enquiryForm");
  const enquirySuccess = document.getElementById("enquirySuccess");
  const formStatus = document.getElementById("formStatus");
  enquiryForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(enquiryForm);
    const phone = sanitizePhone(formData.get("phone"));
    if (!isValidPhone(phone)) {
      formStatus.textContent = "Please enter a valid 10-digit mobile number.";
      return;
    }
    const ok = await submitLead(
      {
        name: formData.get("name"),
        phone,
        configuration: formData.get("configuration"),
        source: "Main Enquiry Form"
      },
      formStatus
    );
    if (ok) {
      sessionStorage.setItem("leadCaptured", "true");
      enquiryForm.classList.add("hidden");
      enquirySuccess.classList.remove("hidden");
      enquirySuccess.classList.add("flex");
      setTimeout(() => {
        enquiryForm.reset();
        formStatus.textContent = "";
      }, 500);
    }
  });
});
