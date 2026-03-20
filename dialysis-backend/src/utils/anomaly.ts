import { CLINICAL_CONFIG } from "../config/clinical.config";

export const detectAnomalies = (data: any) => {
  const anomalies: string[] = [];

  const weightChange = data.preWeight - data.postWeight;

  if (weightChange > CLINICAL_CONFIG.MAX_WEIGHT_CHANGE) {
    anomalies.push(
      `Excess Weight Change (>${CLINICAL_CONFIG.MAX_WEIGHT_CHANGE}kg)`
    );
  }

  if (data.systolicBP > CLINICAL_CONFIG.MAX_BP) {
    anomalies.push(
      `High BP (>${CLINICAL_CONFIG.MAX_BP} mmHg)`
    );
  }

  if (
    data.duration < CLINICAL_CONFIG.MIN_DURATION ||
    data.duration > CLINICAL_CONFIG.MAX_DURATION
  ) {
    anomalies.push(
      `Abnormal Duration (<${CLINICAL_CONFIG.MIN_DURATION} or >${CLINICAL_CONFIG.MAX_DURATION})`
    );
  }
  // NEW: compare post weight with dry weight
if (data.dryWeight && data.postWeight > data.dryWeight + 1) {
  anomalies.push("Post weight above dry weight (fluid overload)");
}
  return anomalies;
};