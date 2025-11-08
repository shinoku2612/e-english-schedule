import { schedule } from "node-cron";

export function setupCronjob() {
    const URL = process.env.KEEP_ALIVE_URL;
    console.log({ URL });
    schedule("*/10 * * * *", async () => {
        try {
            const res = await fetch(URL);
            console.log(`[KeepAlive] Pinged: ${URL}, Status: ${res.status}`);
        } catch (err) {
            console.error("[KeepAlive] Ping failed:", err);
        }
    });
}
