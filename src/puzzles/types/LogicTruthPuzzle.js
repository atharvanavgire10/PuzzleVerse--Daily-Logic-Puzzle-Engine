import { Puzzle } from "../core/PuzzleTypes";
import { SeededRandom } from "../core/SeededRandom";

export default class LogicTruthPuzzle extends Puzzle {
  generate(seed) {
    const rng = new SeededRandom(seed);
    const a = rng.nextInt(0, 1) === 1;
    const b = rng.nextInt(0, 1) === 1;

    return {
      type: "LOGIC_TRUTH",
      question: { expression: `${a} AND ${b}` },
      answer: a && b
    };
  }

  validate(puzzle, solution) {
    return puzzle.answer === solution;
  }
}
