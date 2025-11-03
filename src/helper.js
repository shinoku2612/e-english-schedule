export function toCapitalize(text) {
    return text
        .split(" ")
        .map((str) => str[0].toUpperCase() + str.slice(1).toLowerCase()).join(" ");
}

export function convertTimeRange(startTime, endTime) {
    const timeString = `${startTime} - ${endTime}`
    return timeString.replace(/\b(\d{1,2})h\b/g, (_, h) => `${h.padStart(2, "0")}:00`);
  }