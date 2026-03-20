import { useState } from "react";
import { API } from "../services/api";

export default function AddSessionForm({ refresh, patients }: any) {
  const [form, setForm] = useState({
    patientId: "",
    preWeight: "",
    postWeight: "",
    systolicBP: "",
    duration: "",
    machineId: "",
  status: "in_progress"
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      await API.createSession({
        ...form,
        preWeight: Number(form.preWeight),
        postWeight: Number(form.postWeight),
        systolicBP: Number(form.systolicBP),
        duration: Number(form.duration),
      });

      setForm({
        patientId: "",
        preWeight: "",
        postWeight: "",
        systolicBP: "",
        duration: "",
        machineId: "",
        status: "in_progress"
      });

      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card">
      <h3>➕ Add New Session</h3>

      {/* ✅ DROPDOWN */}
      <select name="patientId" value={form.patientId} onChange={handleChange}>
        <option value="">Select Patient</option>
        {patients.map((p: any) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>
        <input name="machineId" placeholder="Machine ID" value={form.machineId} onChange={handleChange} />

<select name="status" value={form.status} onChange={handleChange}>
  <option value="in_progress">In Progress</option>
  <option value="completed">Completed</option>
</select>
      <input name="preWeight" placeholder="Pre Weight" value={form.preWeight} onChange={handleChange} />
      <input name="postWeight" placeholder="Post Weight" value={form.postWeight} onChange={handleChange} />
      <input name="systolicBP" placeholder="BP" value={form.systolicBP} onChange={handleChange} />
      <input name="duration" placeholder="Duration" value={form.duration} onChange={handleChange} />

      <button onClick={submit}>Submit</button>
    </div>
  );
}