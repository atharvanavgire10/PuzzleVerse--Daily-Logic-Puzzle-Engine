import { openDB } from "idb"

export const heatmapDB = openDB("logic-looper", 2, {
  upgrade(db) {

    // Delete old store if exists (clean upgrade)
    if (db.objectStoreNames.contains("dailyActivity")) {
      db.deleteObjectStore("dailyActivity")
    }

    const store = db.createObjectStore("dailyActivity", {
      keyPath: "id"
    })

    // Index for filtering by user
    store.createIndex("userId", "userId")

    // Composite index to prevent duplicate same-day entries per user
    store.createIndex("userDate", ["userId", "date"], {
      unique: true
    })

    // Achievements store (keep as is)
    if (!db.objectStoreNames.contains("achievements")) {
      db.createObjectStore("achievements", {
        keyPath: "id",
        autoIncrement: true
      })
    }
  }
})
