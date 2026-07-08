/* ui.js — Minimal UI interactions: nav, search, scroll */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initScrollProgress();
  initBackToTop();
  initConceptSearch();
  initCardToggles();
});

function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  const close = () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  };
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("nav-open", open);
  });
  links.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
}

function initScrollProgress() {
  const bar = document.getElementById("scroll-bar");
  let ticking = false;
  const update = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = `${h > 0 ? (window.scrollY / h) * 100 : 0}%`;
    ticking = false;
  };
  window.addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
  update();
}

function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

function initCardToggles() {
  document.addEventListener("click", (e) => {
    const toggle = e.target.closest(".card-toggle");
    if (!toggle) return;
    const card = toggle.closest(".concept-card");
    if (!card) return;
    const expanded = card.classList.toggle("expanded");
    toggle.setAttribute("aria-expanded", String(expanded));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const toggle = e.target.closest(".card-toggle");
    if (!toggle) return;
    e.preventDefault();
    const card = toggle.closest(".concept-card");
    if (!card) return;
    const expanded = card.classList.toggle("expanded");
    toggle.setAttribute("aria-expanded", String(expanded));
  });
}

function initConceptSearch() {
  const input = document.getElementById("concept-search");
  const clear = document.getElementById("search-clear");
  const status = document.getElementById("search-status");

  const filter = () => {
    const q = input.value.trim().toLowerCase();
    clear.hidden = !q;
    const cards = document.querySelectorAll(".concept-card");
    let v = 0;
    cards.forEach(c => {
      const match = !q || c.textContent.toLowerCase().includes(q);
      c.style.display = match ? "" : "none";
      if (match) v++;
    });
    status.textContent = q ? (v ? `Showing ${v} of ${cards.length} cards` : "No matching cards") : "";
  };

  input.addEventListener("input", filter);
  clear.addEventListener("click", () => { input.value = ""; filter(); input.focus(); });
}
