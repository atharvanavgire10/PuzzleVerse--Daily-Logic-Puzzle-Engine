export function calculateScore({ timeTaken, attempts, hintsUsed }) {

  const safeTime = Number(timeTaken) || 1;
  const safeAttempts = Number(attempts) || 1;
  const safeHints = Number(hintsUsed) || 0;

  const BASE_SCORE = 1000;

  const timePenalty = safeTime * 2;
  const attemptPenalty = (safeAttempts - 1) * 50;
  const hintPenalty = safeHints * 100;

  const finalScore =
    BASE_SCORE - timePenalty - attemptPenalty - hintPenalty;

  return Math.max(0, Math.floor(finalScore));
}
