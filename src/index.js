import express from "express";
import dotenv from "dotenv";
import getTeachingSchedule from "./get-schedule.js";
import { pingToRender } from "./life-span-ping.js";

const app = express();
dotenv.config();

app.get("/", async (req, res) => {
    const schedule = await getTeachingSchedule();
    res.status(200).json(schedule);
});
app.get("/ping", async (req, res) => {
    res.status(200).json({ status: "healthy" });
});

const runningPort = process.env.PORT || 3000;
app.listen(runningPort, () => {
    pingToRender();
    console.log("Server is running on port", runningPort);
});
