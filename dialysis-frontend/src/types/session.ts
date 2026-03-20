export interface Session {
  _id?: string;
  patientId: string;
  preWeight: number;
  postWeight: number;
  systolicBP: number;
  duration: number;
  anomalies?: string[];
  date?: string;
}