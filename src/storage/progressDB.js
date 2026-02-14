const DB_NAME = "PuzzleProgressDB";
const STORE = "progress";
const VERSION = 1;

/* =========================
   OPEN DATABASE
========================= */
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, {
          keyPath: "id"
        });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

/* =========================
   SAVE PROGRESS
========================= */
export async function saveProgress(id, data) {
  if (!id) return false;

  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    const store = tx.objectStore(STORE);

    const record = {
      id,               // 🔥 Always enforce correct key
      date: data.date,
      attempts: data.attempts,
      completed: data.completed,
      score: data.score
    };

    store.put(record);

    tx.oncomplete = () => {
      db.close();       // 🔥 Properly close DB
      resolve(true);
    };

    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
  });
}

/* =========================
   LOAD PROGRESS
========================= */
export async function loadProgress(id) {
  if (!id) return null;

  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const store = tx.objectStore(STORE);
    const request = store.get(id);

    request.onsuccess = () => {
      db.close();       // 🔥 Close DB after read
      resolve(request.result || null);
    };

    request.onerror = () => {
      db.close();
      reject(request.error);
    };
  });
}
