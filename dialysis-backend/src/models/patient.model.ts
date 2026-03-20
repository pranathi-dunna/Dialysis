import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  dryWeight: Number
});

export default mongoose.model("Patient", patientSchema);