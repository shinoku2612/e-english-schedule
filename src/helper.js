export function toCapitalize(text) {
  return text
    .split(" ")
    .map((str) => str[0].toUpperCase() + str.slice(1).toLowerCase())
    .join(" ");
}

export function convertTimeRange(startTime, endTime) {
  const timeString = `${startTime} - ${endTime}`;
  return timeString.replace(
    /\b(\d{1,2})h\b/g,
    (_, h) => `${h.padStart(2, "0")}:00`
  );
}

export function getNextWeekRange(currentDate = new Date()) {
  const base = new Date(currentDate);
  base.setHours(0, 0, 0, 0);

  const day = base.getDay(); // Sun = 0
  const daysToNextMonday = day === 0 ? 1 : 8 - day;

  const start = new Date(base);
  start.setDate(base.getDate() + daysToNextMonday);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

export function parseDDMMYYYY(dateStr) {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
}
