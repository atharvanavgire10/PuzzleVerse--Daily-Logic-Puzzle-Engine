import { useEffect, useState, useCallback } from "react";
import { PuzzleEngine } from "../puzzles/core/PuzzleEngine";
import { loadProgress, saveProgress } from "../storage/progressDB";
import { loadHints, saveHints } from "../storage/hintDB";
import { saveCompletedDay } from "../storage/streakDB";
import { calculateScore } from "../utils/scoreEngine";
import { generateHintsForPuzzle } from "../utils/hintEngine";

export function useDailyPuzzle(userId) {
  const [puzzle, setPuzzle] = useState(null);
  const [validator, setValidator] = useState(null);
  const [progress, setProgress] = useState(null);
  const [hints, setHints] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentDate =
    localStorage.getItem("DEV_DATE_OVERRIDE") ||
    new Date().toISOString().slice(0, 10);

  const storageKey =
    userId && currentDate
      ? `${userId}_${currentDate}`
      : null;

  /* =========================
     INIT (LOAD DAILY DATA)
  ========================= */
  useEffect(() => {
    if (!storageKey) return;

    let cancelled = false;

    async function init() {
      setLoading(true);

      try {
        const generated =
          await PuzzleEngine.generateDailyPuzzle(currentDate);

        if (!generated || cancelled) {
          setLoading(false);
          return;
        }

        const savedProgress =
          await loadProgress(storageKey);

        const savedHints =
          await loadHints(storageKey);

        if (cancelled) return;

        setPuzzle(generated.puzzle);
        setValidator(generated.validator);

        setHints(savedHints?.usedHints || []);

        if (savedProgress) {
          setProgress(savedProgress);
        } else {
          const initial = {
            id: storageKey,   // 🔥 MUST EXIST
            date: currentDate,
            attempts: 0,
            completed: false,
            score: 0
          };

          await saveProgress(storageKey, initial);
          setProgress(initial);
        }
      } catch (err) {
        console.error("DailyPuzzle init error:", err);
      }

      if (!cancelled) setLoading(false);
    }

    init();

    return () => {
      cancelled = true;
    };
  }, [storageKey, currentDate]);

  /* =========================
     VALIDATE ANSWER
  ========================= */
  const validateAndSave = useCallback(
    async (answer) => {
      if (
        !storageKey ||
        !validator ||
        !puzzle ||
        !progress
      ) {
        return false;
      }

      // 🔒 HARD LOCK AFTER SOLVE
      if (progress.completed) {
        return false;
      }

      const isCorrect =
        validator.validate(puzzle, answer);

      const updated = {
        id: storageKey,   // 🔥 CRITICAL FIX
        ...progress,
        attempts: progress.attempts + 1
      };

      if (isCorrect) {
        updated.completed = true;

        updated.score = calculateScore({
          timeTaken: 1,
          attempts: updated.attempts,
          hintsUsed: hints.length
        });

        await saveCompletedDay({
          user: userId,
          date: currentDate
        });
      }

      await saveProgress(storageKey, updated);
      setProgress(updated);

      return isCorrect;
    },
    [storageKey, validator, puzzle, progress, hints.length, userId, currentDate]
  );

  /* =========================
     USE HINT
  ========================= */
  const useHint = useCallback(
    async () => {
      if (
        !storageKey ||
        !puzzle ||
        !progress ||
        progress.completed ||   // 🔒 LOCK AFTER SOLVE
        hints.length >= 3
      ) {
        return null;
      }

      const allHints =
        generateHintsForPuzzle(puzzle);

      const nextHint =
        allHints[hints.length];

      if (!nextHint) return null;

      const updatedHints = [
        ...hints,
        nextHint
      ];

      setHints(updatedHints);

      await saveHints(storageKey, {
        id: storageKey,   // 🔥 REQUIRED
        usedHints: updatedHints
      });

      return nextHint;
    },
    [storageKey, puzzle, progress, hints]
  );

  return {
    puzzle,
    progress,
    hints,
    loading,
    validateAndSave,
    useHint
  };
}
