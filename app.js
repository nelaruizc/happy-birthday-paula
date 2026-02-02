const DAYS = Array.from({ length: 24 }, (_, index) => {
  const day = index + 1;
  return {
    day,
    title: `Día ${day}`,
    message:
      day === 24
        ? "¡Llegó tu cumpleaños! Hoy celebra con tu playlist favorita, un pastel delicioso y toda la gente que te quiere."
        : "Un pequeño detalle para hoy: regálate un momento bonito y piensa en algo que agradeces."
  };
});

const calendar = document.getElementById("calendar");
const overlay = document.getElementById("overlay");
const cardDay = document.getElementById("cardDay");
const cardTitle = document.getElementById("cardTitle");
const cardMessage = document.getElementById("cardMessage");
const markOpened = document.getElementById("markOpened");
const closeButton = document.getElementById("close");

const openedDays = new Set(
  JSON.parse(localStorage.getItem("birthday-calendar-opened") || "[]")
);

let activeDay = null;

function saveOpenedDays() {
  localStorage.setItem(
    "birthday-calendar-opened",
    JSON.stringify(Array.from(openedDays))
  );
}

function renderCalendar() {
  const existingButtons = Array.from(calendar.querySelectorAll(".day"));
  const shouldCreate = existingButtons.length !== DAYS.length;

  if (shouldCreate) {
    calendar.innerHTML = "";
  }

  DAYS.forEach((entry) => {
    const button =
      existingButtons.find((element) => Number(element.dataset.day) === entry.day) ||
      document.createElement("button");

    button.className = "day";
    button.type = "button";
    button.dataset.day = entry.day;

    button.innerHTML = `
      <span class="day-number">${entry.day}</span>
      <span class="day-label">Sorpresa</span>
    `;

    button.classList.toggle("opened", openedDays.has(entry.day));
    button.setAttribute("aria-pressed", openedDays.has(entry.day));
    button.onclick = () => openDay(entry);

    if (shouldCreate) {
      calendar.appendChild(button);
    }
  });
}

function openDay(entry) {
  activeDay = entry.day;
  cardDay.textContent = `Día ${entry.day}`;
  cardTitle.textContent = entry.title;
  cardMessage.textContent = entry.message;
  overlay.classList.add("active");
  overlay.setAttribute("aria-hidden", "false");
}

function closeOverlay() {
  overlay.classList.remove("active");
  overlay.setAttribute("aria-hidden", "true");
}

markOpened.addEventListener("click", () => {
  if (activeDay !== null) {
    openedDays.add(activeDay);
    saveOpenedDays();
    renderCalendar();
    closeOverlay();
  }
});

closeButton.addEventListener("click", closeOverlay);

overlay.addEventListener("click", (event) => {
  if (event.target === overlay) {
    closeOverlay();
  }
});

renderCalendar();
