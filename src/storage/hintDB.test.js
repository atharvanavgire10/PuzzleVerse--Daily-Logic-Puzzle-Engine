import { saveHints, loadHints } from "./hintDB";

describe("hintDB", () => {
  test("saves and loads hints", async () => {
    const data = {
      date: "2026-01-01",
      usedHints: ["hint1"]
    };

    await saveHints(data);
    const loaded = await loadHints("2026-01-01");

    expect(loaded.usedHints.length).toBe(1);
  });
});
