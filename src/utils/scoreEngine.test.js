import { calculateScore } from "./scoreEngine";

describe("Score Engine", () => {
  test("rewards fast solve", () => {
    const score = calculateScore({
      startedAt: 0,
      solvedAt: 20000,
      attempts: 1,
      hintsUsed: 0
    });

    expect(score).toBeGreaterThan(100);
  });

  test("penalizes many attempts", () => {
    const score = calculateScore({
      startedAt: 0,
      solvedAt: 20000,
      attempts: 10,
      hintsUsed: 0
    });

    expect(score).toBeLessThan(100);
  });

  test("never returns negative", () => {
    const score = calculateScore({
      startedAt: 0,
      solvedAt: 100000,
      attempts: 50,
      hintsUsed: 5
    });

    expect(score).toBeGreaterThanOrEqual(0);
  });
});
