import { loadProgress, saveProgress } from "./progressDB";

describe("progressDB", () => {
  test("saves and loads progress", async () => {
    const mock = {
      date: "2026-01-01",
      attempts: 1
    };

    await saveProgress(mock);
    const loaded = await loadProgress("2026-01-01");

    expect(loaded.date).toBe("2026-01-01");
  });
});
