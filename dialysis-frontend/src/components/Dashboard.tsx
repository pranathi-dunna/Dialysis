import { useEffect, useState } from "react";
import { API } from "../services/api";
import AddSessionForm from "./AddSessionForm";
import AddPatientForm from "./AddPatientForm";

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showOnlyAnomalies, setShowOnlyAnomalies] = useState(false);
  const [notesMap, setNotesMap] = useState<any>({});

  // FETCH DATA
  const fetchData = async () => {
    try {
      setLoading(true);

      const schedule = await API.getTodaySchedule();
      const patientsRes = await API.getPatients();

      setData(schedule || []);
      setPatients(patientsRes || []);
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // FILTER LOGIC
  const filteredData = showOnlyAnomalies
    ? data.filter((item) => item.session?.anomalies?.length > 0)
    : data;

  // SAVE NOTES
  const handleNotesChange = async (id: string) => {
    try {
      await API.updateNotes(id, notesMap[id]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* ✅ ALWAYS SHOW FORMS */}
      <AddPatientForm refresh={fetchData} />
      <AddSessionForm refresh={fetchData} patients={patients} />

      {/* FILTER */}
      <div style={{ margin: "10px 0" }}>
        <label style={{ marginRight: "10px" }}>Filter:</label>
        <select
          value={showOnlyAnomalies ? "anomalies" : "all"}
          onChange={(e) =>
            setShowOnlyAnomalies(e.target.value === "anomalies")
          }
          style={{ padding: "6px", borderRadius: "6px" }}
        >
          <option value="all">Show All Patients</option>
          <option value="anomalies">Show Only Anomalies</option>
        </select>
      </div>

      {/* LOADING */}
      {loading && <p>Loading...</p>}

      {/* ERROR */}
      {error && <p>{error}</p>}

      {/* SCHEDULE */}
      <div className="card">
        <h3>Today's Schedule</h3>

        {/* ✅ EMPTY STATE */}
        {filteredData.length === 0 ? (
          <p>No patients found</p>
        ) : (
          filteredData.map((item, index) => (
            <div key={index} className="session-card">

              <h4>Patient: {item.patient.name}</h4>
              <p>Dry Weight: {item.patient.dryWeight} kg</p>

              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: "8px",
                  color: "white",
                  background:
                    item.status === "completed"
                      ? "green"
                      : item.status === "in_progress"
                      ? "orange"
                      : "gray",
                }}
              >
                {item.status}
              </span>

              {item.session ? (
                <>
                  <p>Pre: {item.session.preWeight} kg</p>
                  <p>Post: {item.session.postWeight} kg</p>
                  <p>BP: {item.session.systolicBP}</p>
                  <p>Duration: {item.session.duration} mins</p>
                  <p>Machine ID: {item.session.machineId}</p>

                  {item.session.anomalies?.length > 0 && (
                    <div style={{ background: "#fdd", padding: "10px" }}>
                      <b>Anomalies:</b>
                      <ul>
                        {item.session.anomalies.map((a: string, i: number) => (
                          <li key={i}>{a}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* NOTES */}
                  <textarea
                    placeholder="Add notes..."
                    value={
                      notesMap[item.session._id] ??
                      item.session.notes ??
                      ""
                    }
                    onChange={(e) =>
                      setNotesMap({
                        ...notesMap,
                        [item.session._id]: e.target.value,
                      })
                    }
                  />

                  <button onClick={() => handleNotesChange(item.session._id)}>
                    Save Notes
                  </button>
                </>
              ) : (
                <p>No session yet</p>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}