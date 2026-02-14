import { memo } from "react"

export const HeatmapCell = memo(({ intensity, onHover }) => {
  const intensityMap = {
    0: "bg-gray-200",
    1: "bg-green-200",
    2: "bg-green-400",
    3: "bg-green-600",
    4: "bg-green-800"
  }

  return (
    <div
      onMouseEnter={onHover}
      className={`w-4 h-4 rounded-sm ${intensityMap[intensity]} transition`}
    />
  )
})
