import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

function getLast30Days() {
  const days = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

function getIntensity(score) {
  if (!score) return 0;
  if (score < 300) return 1;
  if (score < 600) return 2;
  if (score < 900) return 3;
  return 4;
}

export default function StreakHeatmap() {
  const [completedDays, setCompletedDays] = useState({});

  useEffect(() => {
    const data = {};

    Object.keys(localStorage).forEach((key) => {
      try {
        const value = JSON.parse(localStorage.getItem(key));
        if (value?.completed && value?.score !== undefined) {
          data[key.slice(-10)] = value.score;
        }
      } catch {}
    });

    setCompletedDays(data);
  }, []);

  const last30Days = useMemo(() => getLast30Days(), []);

  const currentStreak = useMemo(() => {
    let streak = 0;

    for (let i = last30Days.length - 1; i >= 0; i--) {
      const day = last30Days[i];
      if (completedDays[day]) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }, [completedDays, last30Days]);

  return (
    <div
      style={{
        marginTop: 40,
        padding: 20,
        borderRadius: 16,
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(10px)"
      }}
    >
      <h3 style={{ marginBottom: 15 }}>🔥 Streak</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(10, 1fr)",
          gap: 6
        }}
      >
        {last30Days.map((day) => {
          const intensity = getIntensity(completedDays[day]);

          const colors = [
            "#2c2c2c",
            "#1e3a8a",
            "#2563eb",
            "#3b82f6",
            "#60a5fa"
          ];

          return (
            <motion.div
              key={day}
              whileHover={{ scale: 1.2 }}
              style={{
                width: "100%",
                paddingTop: "100%",
                borderRadius: 6,
                background: colors[intensity],
                position: "relative",
                cursor: "pointer"
              }}
              title={`${day} ${
                completedDays[day]
                  ? `Score: ${completedDays[day]}`
                  : "Not completed"
              }`}
            />
          );
        })}
      </div>

      <div
        style={{
          marginTop: 15,
          fontWeight: "bold",
          fontSize: 16
        }}
      >
        Current Streak: {currentStreak} 🔥
      </div>
    </div>
  );
}
