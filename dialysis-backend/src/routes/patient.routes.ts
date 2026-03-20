import express from "express";
import { createPatientHandler } from "../controllers/patient.controller";
import Patient from "../models/patient.model"; // 👈 ADD THIS

const router = express.Router();

// ✅ CREATE PATIENT
router.post("/", createPatientHandler);

// ✅ GET ALL PATIENTS (ADD THIS)
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch patients" });
  }
});

export default router;