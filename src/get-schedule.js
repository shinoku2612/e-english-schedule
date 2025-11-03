import { jwtDecode } from "jwt-decode";
import AppStore from "./store.js";
import getAccessToken from "./get-access-token.js";
import { convertTimeRange, toCapitalize } from "./helper.js";

const LevelMapping = {
    A1: "T1",
    A2: "T2",
    A3: "T3",
};
const MAX_ATTEMPT = 5;

export default async function getTeachingSchedule(attempt = 0) {
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
        console.log(`[INVALID TOKEN]::[RETRY]::Attempt ${attempt}`)
        AppStore.delete("accessToken");
        if (attempt >= MAX_ATTEMPT) return null;
        return getTeachingSchedule(attempt);
    }
}
