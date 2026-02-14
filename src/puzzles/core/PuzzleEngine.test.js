import { PuzzleEngine } from "./PuzzleEngine";

describe("PuzzleEngine", () => {
  test("generates deterministic puzzle", async () => {
    const puzzle1 = await PuzzleEngine.generateDailyPuzzle();
    const puzzle2 = await PuzzleEngine.generateDailyPuzzle();

    expect(puzzle1.puzzle.type).toBe(puzzle2.puzzle.type);
  });
});
