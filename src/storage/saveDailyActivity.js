import dayjs from "dayjs"
import { heatmapDB } from "./heatmapDB"

export async function saveDailyActivity({
  userId,
  score,
  difficulty = 1,
  timeTaken = 30
}) {
  if (!userId) return

  const db = await heatmapDB
  const today = dayjs().format("YYYY-MM-DD")

  const id = `${userId}_${today}`

  await db.put("dailyActivity", {
    id,
    userId,
    date: today,
    solved: true,
    score,
    timeTaken,
    difficulty,
    synced: false
  })

  window.dispatchEvent(new Event("heatmapUpdate"))
}
