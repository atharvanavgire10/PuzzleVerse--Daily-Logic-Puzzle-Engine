
import { openDB } from "idb"

export const heatmapDB = openDB("logic-looper", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("dailyActivity")) {
      const store = db.createObjectStore("dailyActivity", {
        keyPath: "date"
      })

      store.createIndex("synced", "synced")
    }

    if (!db.objectStoreNames.contains("achievements")) {
      db.createObjectStore("achievements", {
        keyPath: "id",
        autoIncrement: true
      })
    }
  }
})
