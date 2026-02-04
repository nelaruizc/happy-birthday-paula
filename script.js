const calendarGrid = document.getElementById("calendarGrid");

const days = Array.from({ length: 11 }, (_, index) => {
  const dayNumber = index + 1;
  return {
    day: dayNumber,
    title: dayNumber === 11 ? "Cumpleaños de Paula" : `Día ${dayNumber}`,
    label: dayNumber === 11 ? "Especial" : "Detalle",
    note:
      dayNumber === 11
        ? "Un regalo único y un mensaje especial."
        : "Espacio reservado para la sorpresa del día.",
  };
});

days.forEach((day) => {
  const card = document.createElement("article");
  card.className = `day-card${day.day === 11 ? " day-card--special" : ""}`;
  card.innerHTML = `
    <div class="day-card__top">
      <span class="day-number">${day.day}</span>
      <span class="day-label">${day.label}</span>
    </div>
    <div class="day-card__content">
      <strong>${day.title}</strong>
      <p>${day.note}</p>
    </div>
    <span class="day-card__pill">Pendiente</span>
  `;
  calendarGrid.appendChild(card);
});
