import { useMemo } from "react"
import { HeatmapCell } from "./HeatmapCell"
import { generateYearGrid, mapToWeekColumns, getIntensity } from "../../storage/heatmapUtils"

export function HeatmapGrid({ activity }) {
  const columns = useMemo(() => {
    const days = generateYearGrid()
    return mapToWeekColumns(days)
  }, [])

  return (
  <div className="heatmap-grid">
    {columns.flat().map(day => {
      const key = day.format("YYYY-MM-DD")
      const entry = activity[key]
      const intensity = getIntensity(entry)

      return (
        <div
          key={key}
          className={`heatmap-cell level-${intensity}`}
        />
      )
    })}
  </div>
)

}
