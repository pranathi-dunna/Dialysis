import axios from "axios";

const BASE_URL = "http://localhost:5001";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

// ✅ CLEAN API METHODS
export const API = {
  getTodaySchedule: async () => {
    const res = await apiClient.get("/sessions/today");
    return res.data;
  },

  updateNotes: async (id: string, notes: string) => {
    const res = await apiClient.patch(`/sessions/${id}/notes`, { notes });
    return res.data;
  },

  createSession: async (data: any) => {
    const res = await apiClient.post("/sessions", data);
    return res.data;
  },
  createPatient: async (data: any) => {
  const res = await apiClient.post("/patients", data);
  return res.data;

  },
  getPatients: async () => {
  const res = await apiClient.get("/patients");
  return res.data;
},
};