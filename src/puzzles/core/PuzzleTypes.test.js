import * as types from "./PuzzleTypes";

test("PuzzleTypes executed", () => {
  expect(types).toBeDefined();
  expect(Object.values(types).length).toBeGreaterThan(0);
});
