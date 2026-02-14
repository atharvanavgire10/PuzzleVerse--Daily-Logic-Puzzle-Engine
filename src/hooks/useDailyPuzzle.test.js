import { renderHook, act } from "@testing-library/react";
import { useDailyPuzzle } from "./useDailyPuzzle";

vi.mock("../puzzles/core/PuzzleEngine", () => ({
  PuzzleEngine: {
    generateDailyPuzzle: vi.fn().mockResolvedValue({
      puzzle: {
        type: "NUMBER_GRID",
        question: { grid: [1, 2] }
      },
      validator: {
        validate: () => true
      }
    })
  }
}));

vi.mock("../storage/progressDB", () => ({
  loadProgress: vi.fn().mockResolvedValue(null),
  saveProgress: vi.fn()
}));

vi.mock("../storage/streakDB", () => ({
  saveCompletedDay: vi.fn()
}));

vi.mock("../storage/hintDB", () => ({
  loadHints: vi.fn().mockResolvedValue(null),
  saveHints: vi.fn()
}));

describe("useDailyPuzzle", () => {
  test("initializes puzzle", async () => {
    const { result } = renderHook(() => useDailyPuzzle());

    await act(async () => {});

    expect(result.current.puzzle).toBeDefined();
  });
});

test("validates and completes puzzle", async () => {
  const { result } = renderHook(() => useDailyPuzzle());

  await act(async () => {});

  await act(async () => {
    await result.current.validateAndSave(1, "1");
  });

  expect(result.current.progress).toBeDefined();
});

test("invalid answer does not complete", async () => {

  const { PuzzleEngine } = await import("../puzzles/core/PuzzleEngine");


  PuzzleEngine.generateDailyPuzzle.mockResolvedValueOnce({
    puzzle: {
      type: "NUMBER_GRID",
      question: { grid: [1, 2] }
    },
    validator: {
      validate: () => false   // force invalid
    }
  });

  const { result } = renderHook(() => useDailyPuzzle());

  await act(async () => {});

  await act(async () => {
    await result.current.validateAndSave(999, "999");
  });

  expect(result.current.progress.completed).not.toBe(true);
});

test("handles missing puzzle gracefully", async () => {
  const { PuzzleEngine } = await import("../puzzles/core/PuzzleEngine");

  PuzzleEngine.generateDailyPuzzle.mockResolvedValueOnce(null);

  const { result } = renderHook(() => useDailyPuzzle());

  await act(async () => {});

  expect(result.current.puzzle).toBeNull();
});



