import express from "express";
import { 
  createSessionHandler, 
  getTodayHandler,
  getTodayScheduleHandler,
  updateNotesHandler,
  getAnomalySessionsHandler
} from "../controllers/session.controller";

const router = express.Router();

router.post("/", createSessionHandler);
router.get("/", getTodayHandler);
router.get("/today", getTodayScheduleHandler);
router.patch("/:id/notes", updateNotesHandler);
router.get("/anomalies", getAnomalySessionsHandler);

export default router;