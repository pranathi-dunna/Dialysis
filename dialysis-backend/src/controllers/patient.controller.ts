import { Request, Response } from "express";
import { createPatient } from "../services/patient.service";

export const createPatientHandler = async (req: Request, res: Response) => {
  try {
    const patient = await createPatient(req.body);
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: "Failed to create patient" });
  }
};