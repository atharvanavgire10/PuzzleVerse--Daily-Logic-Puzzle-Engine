import { useEffect, useState } from "react"
import { heatmapDB } from "../../storage/heatmapDB"
import { HeatmapGrid } from "./HeatmapGrid"
import { calculateStreak } from "../../storage/heatmapUtils"

export default function HeatmapContainer({ refreshKey }) {
  const [activity, setActivity] = useState({})
  const [streak, setStreak] = useState(0)

  useEffect(() => {
  async function loadData() {
    const db = await heatmapDB
    const all = await db.getAll("dailyActivity")

    const map = {}
    all.forEach(entry => {
      map[entry.date] = entry
    })

    setActivity(map)
    setStreak(calculateStreak(map))
  }

  loadData()

  // 🔥 Listen for updates
  const handleUpdate = () => loadData()
  window.addEventListener("heatmapUpdate", handleUpdate)

  return () => {
    window.removeEventListener("heatmapUpdate", handleUpdate)
  }
}, [])


  return (
  <div className="heatmap-wrapper">
    <div className="heatmap-card">
      <div className="heatmap-header">
        <h2>🔥 Current Streak</h2>
        <span className="streak-count">
          {streak} days
        </span>
      </div>

      <HeatmapGrid activity={activity} />

      <div className="heatmap-legend">
        <span>Less</span>
        <div className="legend-box level-0" />
        <div className="legend-box level-1" />
        <div className="legend-box level-2" />
        <div className="legend-box level-3" />
        <div className="legend-box level-4" />
        <span>More</span>
      </div>
    </div>
  </div>
);

}
