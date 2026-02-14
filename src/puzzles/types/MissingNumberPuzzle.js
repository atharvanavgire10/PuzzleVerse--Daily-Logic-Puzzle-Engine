import { Puzzle } from "../core/PuzzleTypes";
import { SeededRandom } from "../core/SeededRandom";

export default class MissingNumberPuzzle extends Puzzle {
  generate(seed) {
    const rng = new SeededRandom(seed);
    const start = rng.nextInt(1, 5);
    const step = rng.nextInt(2, 4);

    const sequence = Array.from({ length: 5 }, (_, i) => start + i * step);
    const index = rng.nextInt(1, 3);
    const answer = sequence[index];
    sequence[index] = null;

    return {
      type: "MISSING_NUMBER",
      question: { sequence },
      answer
    };
  }

  validate(puzzle, solution) {
    return puzzle.answer === solution;
  }
}
