export default function SessionCard({ session }: any) {
  return (
    <div className="session">
      {/* ✅ ADD THIS */}
      <p><b>Patient ID:</b> <span className="value">{session.patientId}</span></p>

      <p><b>Pre:</b> <span className="value">{session.preWeight} kg</span></p>
      <p><b>Post:</b> <span className="value">{session.postWeight} kg</span></p>
      <p><b>BP:</b> <span className="value">{session.systolicBP}</span></p>
      <p><b>Duration:</b> <span className="value">{session.duration}</span></p>

      {session.anomalies?.length > 0 && (
        <div className="anomaly-box">
          <div className="anomaly-title">⚠ Anomalies</div>
          <ul>
            {session.anomalies.map((a: string, i: number) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}