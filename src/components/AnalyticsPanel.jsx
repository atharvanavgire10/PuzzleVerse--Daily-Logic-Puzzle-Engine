import { useEffect, useState } from "react";
import { getAnalytics } from "../utils/analytics";

export default function AnalyticsPanel() {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(getAnalytics());
  }, []);

  if (!data) return null;

  const avgSession =
    data.totalSessions > 0
      ? Math.floor(data.totalSessionTime / data.totalSessions / 1000)
      : 0;

  return (
    <div style={{ marginTop: 30 }}>
      <h4>Analytics</h4>
      <p>Total Sessions: {data.totalSessions}</p>
      <p>Avg Session Time: {avgSession}s</p>
      <p>Days Active: {data.activeDays.length}</p>
      <p>Puzzles Completed: {data.completions.length}</p>
    </div>
  );
}
