

export function generateHintsForPuzzle(puzzle) {
  if (!puzzle || !puzzle.type) {
    return ["Think carefully.", "Try again.", "Look closely at the puzzle."];
  }

  switch (puzzle.type) {
    case "NUMBER_GRID":
      return [
        "Add the numbers carefully.",
        "Try adding step by step.",
        "Double check your total."
      ];

    case "MISSING_NUMBER":
      return [
        "Look at the difference between numbers.",
        "Is there a pattern?",
        "What rule connects them?"
      ];

    case "ODD_ONE_OUT":
      return [
        "One number is different.",
        "Compare properties of each.",
        "Which breaks the pattern?"
      ];

    case "WORD_SCRAMBLE":
      const word =
        puzzle.answer ||
        puzzle.question?.scrambled ||
        "";

      return [
        `It has ${word.length} letters.`,
        `The first letter might be '${word[0] || ""}'.`,
        `Try rearranging the letters slowly.`
      ];

    case "LOGIC_TRUTH":
      return [
        "Evaluate logical operators first.",
        "Remember: true && false is false.",
        "Break it into smaller parts."
      ];

    default:
      return [
        "Try thinking differently.",
        "Look at it from another angle.",
        "Recheck the puzzle carefully."
      ];
  }
}
