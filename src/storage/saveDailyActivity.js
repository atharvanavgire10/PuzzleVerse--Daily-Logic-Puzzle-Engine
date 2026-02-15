import dayjs from "dayjs"
import { heatmapDB } from "./heatmapDB"

export async function saveDailyActivity({
  score,
  difficulty = 1,
  timeTaken = 30
}) {
  const db = await heatmapDB

  await db.put("dailyActivity", {
    date: dayjs().format("YYYY-MM-DD"),
    solved: true,
    score,
    timeTaken,
    difficulty,
    synced: false
  })

  // 🔥 Notify heatmap to refresh
  window.dispatchEvent(new Event("heatmapUpdate"))
}
