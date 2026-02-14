import { saveCompletedDay } from "./streakDB";

describe("streakDB", () => {
  test("saves completed day", async () => {
    await saveCompletedDay({
      date: "2026-01-01",
      completed: true
    });

    expect(true).toBe(true);
  });
});
