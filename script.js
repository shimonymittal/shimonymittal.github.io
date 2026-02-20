// ============================
// Mobile Nav Toggle
// ============================
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav__links");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navLinks.classList.toggle("open");
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navLinks.classList.remove("open");
  });
});

// ============================
// Nav scroll effect + active link
// ============================
const nav = document.getElementById("nav");
const sections = document.querySelectorAll("section[id]");

function onScroll() {
  const scrollY = window.scrollY;

  // Nav background
  nav.classList.toggle("nav--scrolled", scrollY > 50);

  // Active section highlighting
  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    const link = navLinks.querySelector(`a[href="#${id}"]`);

    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    }
  });
}

window.addEventListener("scroll", onScroll, { passive: true });

// ============================
// Scroll reveal (IntersectionObserver)
// ============================
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger siblings slightly
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);

revealElements.forEach((el, i) => {
  // Auto-stagger elements in the same parent
  const siblings = el.parentElement.querySelectorAll(".reveal");
  const siblingIndex = Array.from(siblings).indexOf(el);
  el.dataset.delay = siblingIndex * 100;
  revealObserver.observe(el);
});

// ============================
// Animated counters (hero stats)
// ============================
function animateCounters() {
  const counters = document.querySelectorAll("[data-target]");

  counters.forEach((counter) => {
    const target = parseInt(counter.dataset.target, 10);
    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.round(eased * target);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  });
}

// Trigger counters when hero stats are visible
const statsSection = document.querySelector(".hero__stats");
if (statsSection) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        statsObserver.disconnect();
      }
    },
    { threshold: 0.5 }
  );
  statsObserver.observe(statsSection);
}
