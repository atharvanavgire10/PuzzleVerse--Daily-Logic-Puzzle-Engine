import { Puzzle } from "../core/PuzzleTypes";
import { SeededRandom } from "../core/SeededRandom";

const WORDS = ["react", "logic", "puzzle", "daily", "streak"];

export default class WordScramblePuzzle extends Puzzle {
  generate(seed) {
    const rng = new SeededRandom(seed);
    const word = WORDS[rng.nextInt(0, WORDS.length - 1)];

    const scrambled = word
      .split("")
      .sort(() => rng.next() - 0.5)
      .join("");

    return {
      type: "WORD_SCRAMBLE",
      question: { scrambled },
      answer: word
    };
  }

  validate(puzzle, solution) {
    return puzzle.answer === solution.toLowerCase();
  }
}
