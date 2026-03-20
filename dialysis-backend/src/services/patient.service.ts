import Patient from "../models/patient.model";

export const createPatient = async (data: any) => {
  return await Patient.create(data);
};