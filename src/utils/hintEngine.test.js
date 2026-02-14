import { generateHintsForPuzzle } from "./hintEngine";

describe("hintEngine full coverage", () => {

  test("NUMBER_GRID", () => {
    const hints = generateHintsForPuzzle({
      type: "NUMBER_GRID",
      question: { grid: [1, 2, 3] }
    });
    expect(hints.length).toBeGreaterThan(0);
  });

  test("MISSING_NUMBER", () => {
    const hints = generateHintsForPuzzle({
      type: "MISSING_NUMBER",
      question: { sequence: [2, 4, null, 8] }
    });
    expect(hints.length).toBeGreaterThan(0);
  });

  test("ODD_ONE_OUT", () => {
    const hints = generateHintsForPuzzle({
      type: "ODD_ONE_OUT",
      question: { numbers: [2, 4, 6, 7] }
    });
    expect(hints.length).toBeGreaterThan(0);
  });

  test("WORD_SCRAMBLE", () => {
  const hints = generateHintsForPuzzle({
    type: "WORD_SCRAMBLE",
    question: { scrambled: "TAC" },
    answer: "CAT"   // 🔥 REQUIRED FIX
  });

  expect(hints.length).toBeGreaterThan(0);
});


  test("LOGIC_TRUTH", () => {
    const hints = generateHintsForPuzzle({
      type: "LOGIC_TRUTH",
      question: { expression: "true && false" }
    });
    expect(hints.length).toBeGreaterThan(0);
  });

  test("UNKNOWN fallback", () => {
    const hints = generateHintsForPuzzle({
      type: "UNKNOWN"
    });
    expect(hints.length).toBeGreaterThan(0);
  });

});
