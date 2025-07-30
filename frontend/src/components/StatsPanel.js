export default function StatsPanel({ stats }) {
  return (
    <div style={{ paddingTop: 10 }}>
      <h5>📊 Stats</h5>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {Object.entries(stats).map(([k, v]) => (
          <li key={k}><strong>{k}:</strong> {v.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
}
