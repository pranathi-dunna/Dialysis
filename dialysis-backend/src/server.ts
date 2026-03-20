import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db";
import patientRoutes from "./routes/patient.routes";
import sessionRoutes from "./routes/session.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/patients", patientRoutes);
app.use("/sessions", sessionRoutes);

const PORT = process.env.PORT || 5001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});