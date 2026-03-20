import { useState } from "react";
import { API } from "../services/api";

export default function AddPatientForm({ refresh }: any) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    dryWeight: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      await API.createPatient({
        name: form.name,
        age: Number(form.age),
        dryWeight: Number(form.dryWeight),
      });

      setForm({
        name: "",
        age: "",
        dryWeight: "",
      });

      refresh(); // optional if you later fetch patients
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card">
      <h3>➕ Add Patient</h3>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="age"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
      />

      <input
        name="dryWeight"
        placeholder="Dry Weight"
        value={form.dryWeight}
        onChange={handleChange}
      />

      <button onClick={submit}>Add Patient</button>
    </div>
  );
}