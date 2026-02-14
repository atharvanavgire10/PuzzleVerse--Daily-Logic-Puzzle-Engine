const DB_NAME = "PuzzleHintDB";
const STORE = "hints";
const VERSION = 2; // 👈 bump version

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, VERSION);

    req.onupgradeneeded = () => {
      const db = req.result;

      if (db.objectStoreNames.contains(STORE)) {
        db.deleteObjectStore(STORE);
      }

      db.createObjectStore(STORE, {
        keyPath: "id"
      });
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveHints(id, data) {
  if (!id) {
    console.error("saveHints called without id");
    return false;
  }

  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    const store = tx.objectStore(STORE);

    const record = {
      id: id,
      usedHints: data.usedHints || []
    };

    const req = store.put(record);

    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}

export async function loadHints(id) {
  if (!id) return null;

  const db = await openDB();

  return new Promise((resolve) => {
    const tx = db.transaction(STORE, "readonly");
    const store = tx.objectStore(STORE);
    const req = store.get(id);

    req.onsuccess = () =>
      resolve(req.result || null);
  });
}
