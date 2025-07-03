let currentDate = new Date();
let viewMode = 'month';

const events = JSON.parse(localStorage.getItem('calendarEvents') || '{}');

function saveEvents() {
  localStorage.setItem('calendarEvents', JSON.stringify(events));
}

function createDayCell(date, isOtherMonth = false) {
  const day = date.getDate();
  const isoDate = date.toISOString().split('T')[0];
  const today = new Date();
  const cell = document.createElement('td');

  if (date.toDateString() === today.toDateString()) {
    cell.classList.add('today');
  }

  if (isOtherMonth) {
    cell.classList.add('other-month');
  }

  const dayDiv = document.createElement('div');
  dayDiv.classList.add('day-number');
  dayDiv.textContent = day;
  cell.appendChild(dayDiv);

  if (events[isoDate]) {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('event-note');
    noteDiv.textContent = events[isoDate];
    cell.appendChild(noteDiv);
  }

  cell.addEventListener('click', () => {
    const note = prompt("הוסף הערה לתאריך זה:", events[isoDate] || "");
    if (note !== null) {
      if (note.trim() === "") {
        delete events[isoDate];
      } else {
        events[isoDate] = note;
      }
      saveEvents();
      viewMode === 'month' ? renderCalendar() : renderWeekView();
    }
  });

  return cell;
}

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay();
  const table = document.getElementById("calendar-body");
  table.innerHTML = "";

  document.getElementById("month-year").textContent =
    `${firstDay.toLocaleString('he-IL', { month: 'long' })} ${year}`;

  let date = new Date(year, month, 1 - startDay);

  while (date <= lastDay || date.getDay() !== 0) {
    const tr = document.createElement('tr');
    for (let col = 0; col < 7; col++) {
      const isOtherMonth = date.getMonth() !== month;
      const td = createDayCell(new Date(date), isOtherMonth);
      tr.appendChild(td);
      date.setDate(date.getDate() + 1);
    }
    table.appendChild(tr);
  }
}

function renderWeekView() {
  const table = document.getElementById("calendar-body");
  table.innerHTML = "";

  const weekStart = new Date(currentDate);
  const startDay = weekStart.getDay();
  weekStart.setDate(weekStart.getDate() - startDay);

  const tr = document.createElement('tr');
  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(weekStart);
    dayDate.setDate(weekStart.getDate() + i);
    const isOtherMonth = dayDate.getMonth() !== currentDate.getMonth();
    const td = createDayCell(dayDate, isOtherMonth);
    tr.appendChild(td);
  }
  table.appendChild(tr);

  document.getElementById("month-year").textContent =
    `שבוע שמתחיל ב־${weekStart.toLocaleDateString('he-IL')}`;
}

document.getElementById('next-btn').addEventListener('click', () => {
  if (viewMode === 'month') {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  } else {
    currentDate.setDate(currentDate.getDate() + 7);
    renderWeekView();
  }
});

document.getElementById('prev-btn').addEventListener('click', () => {
  if (viewMode === 'month') {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  } else {
    currentDate.setDate(currentDate.getDate() - 7);
    renderWeekView();
  }
});

document.getElementById('toggle-view').addEventListener('click', () => {
  viewMode = viewMode === 'month' ? 'week' : 'month';
  document.getElementById('toggle-view').textContent =
    viewMode === 'month' ? 'Switch to Week View' : 'Switch to Month View';
  viewMode === 'month' ? renderCalendar() : renderWeekView();
});

viewMode === 'month' ? renderCalendar() : renderWeekView();
