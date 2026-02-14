import dayjs from "dayjs"

export function generateYearGrid(year = dayjs().year()) {
  const start = dayjs(`${year}-01-01`).startOf("day")
  const end = dayjs(`${year}-12-31`).endOf("day")

  const days = []
  let current = start

  while (current.isBefore(end) || current.isSame(end)) {
    days.push(current)
    current = current.add(1, "day")
  }

  return days
}

export function mapToWeekColumns(days) {
  const columns = []
  let week = []

  days.forEach(day => {
    week.push(day)
    if (week.length === 7) {
      columns.push(week)
      week = []
    }
  })

  if (week.length) columns.push(week)

  return columns
}

export function getIntensity(entry) {
  if (!entry || !entry.solved) return 0

  let scoreFactor = entry.score / 100
  let difficultyFactor = entry.difficulty
  let speedFactor = entry.timeTaken < 60 ? 1 : 0.5

  const raw = scoreFactor * difficultyFactor * speedFactor

  if (raw < 1) return 1
  if (raw < 2) return 2
  if (raw < 3) return 3
  return 4
}

export function calculateStreak(activityMap) {
  let streak = 0
  let current = dayjs().startOf("day")

  while (true) {
    const key = current.format("YYYY-MM-DD")
    if (!activityMap[key]?.solved) break

    streak++
    current = current.subtract(1, "day")
  }

  return streak
}
