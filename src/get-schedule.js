import { jwtDecode } from "jwt-decode";
import AppStore from "./store.js";
import getAccessToken from "./get-access-token.js";
import {
  convertTimeRange,
  getNextWeekRange,
  parseDDMMYYYY,
  toCapitalize,
} from "./helper.js";

const LevelMapping = {
  A1: "T1",
  A2: "T2",
  B1: "T3",
};
const MAX_ATTEMPT = 5;
const TIME_SLOTS = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
  "18:00 - 19:00",
  "19:00 - 20:00",
  "20:00 - 21:00",
  "21:00 - 22:00",
];

export async function getTeachingSchedule(attempt = 0) {
  try {
    attempt++;
    let accessToken = AppStore.get("accessToken");
    if (!accessToken) {
      accessToken = await getAccessToken();
      AppStore.set("accessToken", accessToken);
    }
    const decodedToken = jwtDecode(accessToken);
    const userID = decodedToken.id;
    const response = await fetch(
      `https://service.eenglish.vn/api/teachers/getMyResultSchedule?id_teacher=${userID}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!response.ok) throw Error(response.status);
    const data = await response.json();

    const responseData = data.map((lesson) => ({
      date: lesson.date,
      time: convertTimeRange(lesson.time_start, lesson.time_end),
      student: toCapitalize(lesson.student_name),
      level: LevelMapping[lesson.level_student],
    }));
    return responseData;
  } catch (error) {
    console.log(`[INVALID TOKEN]::[RETRY]::Attempt ${attempt}`);
    AppStore.delete("accessToken");
    if (attempt >= MAX_ATTEMPT) return null;
    return getTeachingSchedule(attempt);
  }
}

export async function getAutoTeachingSchedule(triggerDate) {
  let attempt = 0;

  while (attempt < MAX_ATTEMPT) {
    try {
      attempt++;

      let accessToken = AppStore.get("accessToken");
      if (!accessToken) {
        accessToken = await getAccessToken();
        AppStore.set("accessToken", accessToken);
      }

      const { id: userID } = jwtDecode(accessToken);

      const response = await fetch(
        `https://service.eenglish.vn/api/teachers/getMyResultSchedule?id_teacher=${userID}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      // Get next week range (Mon → Sun, normalized)
      const { start, end } = getNextWeekRange(triggerDate);
      const startTs = start.getTime();
      const endTs = end.getTime();

      // Initialize EMPTY table: rows = time slots, cols = days
      const table = Array.from({ length: TIME_SLOTS.length }, () =>
        Array.from({ length: 7 }, () => ["", "", ""])
      );

      const timeIndex = Object.fromEntries(
        TIME_SLOTS.map((slot, i) => [slot, i])
      );

      for (const lesson of data) {
        const lessonDate = parseDDMMYYYY(lesson.date);
        const ts = lessonDate.getTime();

        if (ts < startTs || ts > endTs) continue;

        const dayIndex = (lessonDate - start) / (24 * 60 * 60 * 1000);

        const timeSlot = convertTimeRange(lesson.time_start, lesson.time_end);

        if (
          dayIndex >= 0 &&
          dayIndex <= 6 &&
          timeIndex[timeSlot] !== undefined
        ) {
          const row = timeIndex[timeSlot];
          table[row][dayIndex] = [
            toCapitalize(lesson.student_name),
            LevelMapping[lesson.level_student],
            "",
          ];
        }
      }

      // Flatten each row (tool-compatible)
      return table.map((row) => row.flat());
    } catch (error) {
      console.warn(`[AUTO SCHEDULE] Retry ${attempt}`, error);
      AppStore.delete("accessToken");
    }
  }

  return null;
}
