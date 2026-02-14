const DB_NAME = "PuzzleStreakDB";
const STORE = "streaks";
const VERSION = 1;


function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, VERSION);

    req.onupgradeneeded = () => {
      const db = req.result;

      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, {
          keyPath: "id"
        });


        store.createIndex("user", "user", { unique: false });
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}


export async function saveCompletedDay({
  user,
  date
}) {
  const db = await openDB();

  const id = `${user}_${date}`; 

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    const store = tx.objectStore(STORE);

    const req = store.put({
      id,
      user,
      date
    });

    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}


export async function getAllCompletedDays(user) {
  const db = await openDB();

  return new Promise((resolve) => {
    const tx = db.transaction(STORE, "readonly");
    const store = tx.objectStore(STORE);
    const index = store.index("user");

    const req = index.getAll(user);

    req.onsuccess = () => {
      resolve(req.result || []);
    };
  });
}


export async function getStreak(user) {
  const days = await getAllCompletedDays(user);
  if (!days.length) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const solvedDates = days
    .map((d) => {
      const dt = new Date(d.date);
      dt.setHours(0, 0, 0, 0);
      return dt;
    })
    .sort((a, b) => b - a);

  let streak = 0;
  let current = today;

  for (let date of solvedDates) {
    const diff =
      (current - date) /
      (1000 * 60 * 60 * 24);

    if (diff === 0 || diff === 1) {
      streak++;
      current = date;
    } else {
      break;
    }
  }

  return streak;
}
