import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  patientId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Patient", 
    required: true 
  },

  preWeight: Number,
  postWeight: Number,
  systolicBP: Number,
  duration: Number,
   
  machineId: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["not_started", "in_progress", "completed"],
    default: "in_progress"
  },

  notes: {
    type: String,
    default: ""
  },

  date: { type: Date, default: Date.now },

  anomalies: [String],
});

export default mongoose.model("Session", sessionSchema);