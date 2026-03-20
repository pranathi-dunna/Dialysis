export const detectAnomalies = (data: {
  preWeight: number;
  postWeight: number;
  systolicBP: number;
  duration: number;
  dryWeight: number;
}) => {
  return {
    highBP: data.systolicBP > 180,
    weightChange: Math.abs(data.preWeight - data.postWeight) > 2.5,
    duration: data.duration < 120 || data.duration > 300,
    dryWeightMismatch: Math.abs(data.postWeight - data.dryWeight) > 1
  };
};