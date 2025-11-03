import express from "express";
import dotenv from "dotenv";
import getTeachingSchedule from "./get-schedule.js";

const app = express();
dotenv.config();

app.get("/", async (req, res) => {
    const schedule = await getTeachingSchedule();
    res.status(200).json(schedule);
});

const runningPort = process.env.PORT || 3000;
app.listen(runningPort, () => {
    console.log("Server is running on port", runningPort);
});
