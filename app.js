let toastTimer;

function showToast(message) {
  let toast = document.querySelector(".toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.append(toast);
  }

  toast.textContent = message;
  toast.classList.add("toast-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("toast-visible");
  }, 3000);
}

document.querySelectorAll("[data-book-button]").forEach((button) => {
  button.addEventListener("click", (event) => {
    const target = document.querySelector(button.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start"
    });
    showToast("Booking form is ready.");
  });
});

const siteHeader = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");

if (siteHeader && navToggle) {
  const menuIcon = navToggle.querySelector("span");

  navToggle.addEventListener("click", () => {
    const isOpen = siteHeader.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    menuIcon.textContent = isOpen ? "×" : "☰";
  });

  document.querySelectorAll(".site-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      siteHeader.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation");
      menuIcon.textContent = "☰";
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && siteHeader.classList.contains("nav-open")) {
      siteHeader.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation");
      menuIcon.textContent = "☰";
      navToggle.focus();
    }
  });
}

const matchFilterForm = document.getElementById("match-filter-form");
const teamFilter = document.getElementById("team-filter");
const matchGrid = document.getElementById("match-grid");
const emptyMatches = document.getElementById("empty-matches");
const matchCards = Array.from(document.querySelectorAll(".match-card"));

function filterMatchCards() {
  if (!teamFilter || !matchGrid) return;

  let visibleCount = 0;
  matchCards.forEach((card) => {
    const isVisible = teamFilter.value === "all" ||
      card.dataset.teams.split(/\s+/).includes(teamFilter.value);
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  if (emptyMatches) emptyMatches.hidden = visibleCount > 0;
}

if (matchFilterForm && teamFilter) {
  matchFilterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    filterMatchCards();
  });
  teamFilter.addEventListener("change", filterMatchCards);
}

const gridViewButton = document.getElementById("grid-view");
const listViewButton = document.getElementById("list-view");

if (matchGrid && gridViewButton && listViewButton) {
  [gridViewButton, listViewButton].forEach((button) => {
    button.addEventListener("click", () => {
      const isListView = button === listViewButton;
      matchGrid.classList.toggle("is-list", isListView);
      gridViewButton.setAttribute("aria-pressed", String(!isListView));
      listViewButton.setAttribute("aria-pressed", String(isListView));
    });
  });
}

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("reset", () => {
    showToast("Form has been reset.");
    window.setTimeout(() => updateBookingSummary(false), 0);
  });
});

const matchSelect = document.getElementById("match");
const standSelect = document.getElementById("stand");
const quantityInput = document.getElementById("quantity");
const summaryElements = {
  match: document.getElementById("summary-match"),
  date: document.getElementById("summary-date"),
  venue: document.getElementById("summary-venue"),
  stand: document.getElementById("summary-stand"),
  price: document.getElementById("summary-price"),
  quantity: document.getElementById("summary-quantity"),
  total: document.getElementById("summary-total")
};
const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

function updateBookingSummary(showNotification) {
  if (!matchSelect || !standSelect || !quantityInput || !summaryElements.match) return;

  const selectedMatch = matchSelect.selectedOptions[0];
  const selectedStand = standSelect.value;
  const quantity = Number(quantityInput.value);
  const validQuantity = Number.isInteger(quantity) && quantity >= 1 && quantity <= 6;
  const ticketPrice = Number(selectedMatch.dataset[selectedStand]);
  const validPrice = selectedMatch.value !== "" && Number.isFinite(ticketPrice);

  summaryElements.match.textContent = selectedMatch.value ? selectedMatch.textContent : "Select a match";
  summaryElements.date.textContent = selectedMatch.dataset.date || "—";
  summaryElements.venue.textContent = selectedMatch.dataset.venue || "—";
  summaryElements.stand.textContent = selectedStand
    ? standSelect.selectedOptions[0].textContent
    : "Not selected";
  summaryElements.price.textContent = validPrice ? currency.format(ticketPrice) : "—";
  summaryElements.quantity.textContent = validQuantity ? String(quantity) : "—";
  summaryElements.total.textContent = validPrice && validQuantity
    ? currency.format(ticketPrice * quantity)
    : "—";

  if (showNotification) showToast("Booking summary updated.");
}

if (matchSelect && standSelect && quantityInput) {
  matchSelect.addEventListener("change", () => updateBookingSummary(true));
  standSelect.addEventListener("change", () => updateBookingSummary(true));
  quantityInput.addEventListener("input", () => updateBookingSummary(false));
  quantityInput.addEventListener("change", () => updateBookingSummary(true));
  updateBookingSummary(false);
}

showToast("Welcome to IPL Ticket Booking!");
