import NumberGridPuzzle from "../types/NumberGridPuzzle.js";
import MissingNumberPuzzle from "../types/MissingNumberPuzzle.js";
import OddOneOutPuzzle from "../types/OddOneOutPuzzle.js";
import WordScramblePuzzle from "../types/WordScramblePuzzle.js";
import LogicTruthPuzzle from "../types/LogicTruthPuzzle.js";
import dayjs from "dayjs"
import { heatmapDB } from "../../storage/heatmapDB.js"

const PUZZLES = [
  NumberGridPuzzle,
  MissingNumberPuzzle,
  OddOneOutPuzzle,
  WordScramblePuzzle,
  LogicTruthPuzzle
];

function getDateSeed(dateString) {
  const d = new Date(dateString);
  return Number(
    `${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}`
  );
}

export class PuzzleEngine {
  static async generateDailyPuzzle(dateString) {
    try {
      const seed = getDateSeed(dateString);
      const index = seed % PUZZLES.length;

      const PuzzleClass = PUZZLES[index];

      if (!PuzzleClass) {
        throw new Error("Puzzle class not found");
      }

      const instance = new PuzzleClass();
      const puzzleData = instance.generate(seed);

      return {
        puzzle: puzzleData,
        validator: instance
      };
    } catch (err) {
      console.error("PuzzleEngine error:", err);
      return null;
    }
  }
}



async function saveDailyCompletion({ score, timeTaken, difficulty }) {
  const db = await heatmapDB

  await db.put("dailyActivity", {
    date: dayjs().format("YYYY-MM-DD"),
    solved: true,
    score,
    timeTaken,
    difficulty,
    synced: false
  })
}

