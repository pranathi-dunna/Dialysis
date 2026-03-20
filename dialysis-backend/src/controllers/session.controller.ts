import { Request, Response } from "express";
import Session from "../models/session.model";
import { detectAnomalies } from "../utils/anomaly";
import { updateSessionNotes } from "../services/session.service";
import { getSessionsWithAnomalies } from "../services/session.service";

export const createSessionHandler = async (req: Request, res: Response) => {
  try {
    console.log("REQ BODY:", req.body); // 🔍 DEBUG

    const anomalies = detectAnomalies(req.body);

    const session = await Session.create({
      ...req.body,
      status: req.body.status || "completed",
      anomalies,
    });

    res.status(201).json(session);
  } catch (err: any) {
    console.error("🔥 ERROR:", err); // 🔥 IMPORTANT
    res.status(500).json({ error: err.message });
  }
};


import { getTodaySchedule } from "../services/session.service";

export const getTodayScheduleHandler = async (req: Request, res: Response) => {
  try {
    const data = await getTodaySchedule();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
export const getTodayHandler = async (req: Request, res: Response) => {
  try {
    const sessions = await Session.find().sort({ date: -1 });
    res.json(sessions);
  } catch (err: any) {
    console.error("🔥 ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
export const updateNotesHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    const updated = await updateSessionNotes(id, notes);

    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
export const getAnomalySessionsHandler = async (req: Request, res: Response) => {
  try {
    const sessions = await getSessionsWithAnomalies();
    res.json(sessions);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};