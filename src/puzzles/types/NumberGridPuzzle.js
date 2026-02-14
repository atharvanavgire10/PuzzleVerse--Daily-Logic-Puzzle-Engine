import { SeededRandom } from "../core/SeededRandom";
import { Puzzle } from "../core/PuzzleTypes";

export default class NumberGridPuzzle extends Puzzle {
  generate(seed) {
    const rng = new SeededRandom(seed);
    const grid = Array.from({ length: 4 }, () => rng.nextInt(1, 9));
    const answer = grid.reduce((a, b) => a + b, 0);

    return {
      type: "NUMBER_GRID",
      question: { grid },
      answer
    };
  }

  validate(puzzle, solution) {
    return puzzle.answer === solution;
  }
}
