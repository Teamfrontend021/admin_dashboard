import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Calender.css"; // Import the separate CSS file

const Calendar = ({ initialMonth, initialYear, initialSelectedDay, onDateSelect }) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState({
    month: initialMonth !== undefined ? initialMonth : today.getMonth(),
    year: initialYear !== undefined ? initialYear : today.getFullYear(),
    selectedDay: initialSelectedDay !== undefined ? initialSelectedDay : today.getDate(),
  });

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const handlePrevMonth = () => {
    setCurrentDate((prev) => {
      const newMonth = prev.month === 0 ? 11 : prev.month - 1;
      const newYear = prev.month === 0 ? prev.year - 1 : prev.year;
      return { month: newMonth, year: newYear, selectedDay: undefined };
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => {
      const newMonth = prev.month === 11 ? 0 : prev.month + 1;
      const newYear = prev.month === 11 ? prev.year + 1 : prev.year;
      return { month: newMonth, year: newYear, selectedDay: undefined };
    });
  };

  const handleDaySelect = (day) => {
    setCurrentDate((prev) => ({ ...prev, selectedDay: day }));
    if (onDateSelect) {
      const selectedDate = new Date(currentDate.year, currentDate.month, day);
      onDateSelect(selectedDate);
    }
  };

  const createCalendarGrid = () => {
    const { month, year } = currentDate;
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const firstDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarGrid = [];
    let week = Array(7).fill(null);

    for (let i = firstDayIndex; i < 7; i++) {
      week[i] = i - firstDayIndex + 1;
    }
    calendarGrid.push(week);

    let dayCounter = 7 - firstDayIndex + 1;
    while (dayCounter <= daysInMonth) {
      week = Array(7).fill(null);
      for (let i = 0; i < 7 && dayCounter <= daysInMonth; i++) {
        week[i] = dayCounter++;
      }
      calendarGrid.push(week);
    }

    return calendarGrid;
  };

  const calendarGrid = createCalendarGrid();

  const isToday = (day) => {
    const now = new Date();
    return day === now.getDate() && currentDate.month === now.getMonth() && currentDate.year === now.getFullYear();
  };

  return (
    <Card className="calendar-card">
      <div className="calendar-header">
        <h3 className="calendar-title">
          {monthNames[currentDate.month]} {currentDate.year}
        </h3>
        <div className="calendar-nav">
          <button
            className="nav-button"
            onClick={handlePrevMonth}
            aria-label="Previous month"
          >
            <ChevronLeft className="nav-icon" />
          </button>
          <button
            className="nav-button"
            onClick={handleNextMonth}
            aria-label="Next month"
          >
            <ChevronRight className="nav-icon" />
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        {daysOfWeek.map((day, i) => (
          <div key={i} className="calendar-day-header">
            {day}
          </div>
        ))}

        {calendarGrid.map((week, weekIndex) =>
          week.map((day, dayIndex) => (
            <div
              key={`${weekIndex}-${dayIndex}`}
              className={`calendar-day ${
                day === null ? "calendar-day-empty" : "calendar-day-active"
              } ${
                day === currentDate.selectedDay ? "calendar-day-selected" : ""
              } ${
                isToday(day) && day !== currentDate.selectedDay
                  ? "calendar-day-today"
                  : ""
              }`}
              onClick={() => day !== null && handleDaySelect(day)}
            >
              {day !== null ? day : ""}
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default Calendar;