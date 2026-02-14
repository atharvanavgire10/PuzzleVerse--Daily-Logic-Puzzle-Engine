import { Puzzle } from "../core/PuzzleTypes";
import { SeededRandom } from "../core/SeededRandom";

export default class OddOneOutPuzzle extends Puzzle {
  generate(seed) {
    const rng = new SeededRandom(seed);
    const base = rng.nextInt(2, 10);

    const numbers = [base * 2, base * 4, base * 6, base * 8];
    const odd = rng.nextInt(1, 99);
    numbers[rng.nextInt(0, numbers.length - 1)] = odd;

    return {
      type: "ODD_ONE_OUT",
      question: { numbers },
      answer: odd
    };
  }

  validate(puzzle, solution) {
    return puzzle.answer === solution;
  }
}
