import {
  NumberGridPuzzle,
  MissingNumberPuzzle,
  OddOneOutPuzzle,
  WordScramblePuzzle,
  LogicTruthPuzzle
} from "../server/puzzles";

const PUZZLES = [
  NumberGridPuzzle,
  MissingNumberPuzzle,
  OddOneOutPuzzle,
  WordScramblePuzzle,
  LogicTruthPuzzle
];

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { date, solution } = req.body;

  const seed = Number(date.replaceAll("-", ""));
  const PuzzleClass = PUZZLES[seed % PUZZLES.length];

  const instance = new PuzzleClass();
  const puzzle = instance.generate(seed);

  const isValid = instance.validate(puzzle, solution);

  res.json({ valid: isValid });
}
