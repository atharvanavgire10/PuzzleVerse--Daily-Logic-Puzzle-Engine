import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  lazy,
  Suspense
} from "react";
import {
  motion,
  AnimatePresence
} from "framer-motion";
import { useDailyPuzzle } from "./hooks/useDailyPuzzle";
import { auth } from "./firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import "./responsive.css";
import "./animations.css";
import "./index.css";
import HeatmapPage from "./pages/HeatmapPage"




const HeatmapContainer = lazy(() =>
  import("./components/heatmap/HeatmapContainer")
);


function App() {
  const [user, setUser] = useState(null);
  const [guestId, setGuestId] = useState(null);
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [celebrate, setCelebrate] = useState(false);
  const [heatmapRefresh, setHeatmapRefresh] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
          setGuestId(null);
        } else {
          setUser(null);
        }
      }
    );
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  if (isMobile) {
    await signInWithRedirect(auth, provider)
  } else {
    await signInWithPopup(auth, provider)
  }
  };

  const continueAsGuest = () => {
    setGuestId("guest_" + Date.now());
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setGuestId(null);
  };

  const activeUserId =
    user?.uid || guestId || null;

  useEffect(() => {
    setInput("");
    setResult(null);
  }, [activeUserId]);

  const {
    puzzle,
    progress,
    hints,
    loading,
    validateAndSave,
    useHint
  } = useDailyPuzzle(activeUserId);

  const puzzleDisplay = useMemo(() => {
    if (!puzzle) return null;

    switch (puzzle.type) {
      case "NUMBER_GRID":
        return puzzle.question.grid.join(" + ");
      case "MISSING_NUMBER":
        return puzzle.question.sequence
          .map((n) =>
            n === null ? "?" : n
          )
          .join(", ");
      case "ODD_ONE_OUT":
        return puzzle.question.numbers.join(", ");
      case "WORD_SCRAMBLE":
        return puzzle.question.scrambled;
      case "LOGIC_TRUTH":
        return puzzle.question.expression;
      default:
        return null;
    }
  }, [puzzle]);

  const triggerCelebration = () => {
    setCelebrate(true);
    setTimeout(() => {
      setCelebrate(false);
    }, 1200);
  };

  const submit = useCallback(async () => {
    if (!puzzle || progress?.completed) return;

    let answer = input.trim();

    if (!answer) {
      setResult("Answer cannot be empty!");
      return;
    }


    if (
      puzzle.type !== "WORD_SCRAMBLE" &&
      puzzle.type !== "LOGIC_TRUTH"
    ) {
      if (!isNaN(answer)) {
        answer = Number(answer);
      }
    }

    if (puzzle.type === "LOGIC_TRUTH") {
      answer = answer.toLowerCase() === "true";
    }

    try {
      const isCorrect =
        await validateAndSave(answer);

      if (isCorrect) {
        setResult("Correct!");
        triggerCelebration();

      


        setHeatmapRefresh(prev => prev + 1);
      }
      else {
        setResult("Wrong!");
      }
    } catch (err) {
      console.error("Submit error:", err);
    }

    setInput("");
  }, [input, puzzle, progress, validateAndSave]);




  if (!activeUserId) {
    return (
      <div className="auth-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="auth-card"
        >
          <h1 className="logo">🧩 PuzzleVerse</h1>
          <p className="tagline">
            Challenge your brain daily.
          </p>

          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            onClick={loginWithGoogle}
            className="google-auth-btn"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="google-logo"
            />
            <span>Continue with Google</span>
          </motion.button>


          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={continueAsGuest}
            className="guest-btn"
          >
            Continue as Guest
          </motion.button>
        </motion.div>
      </div>
    );
  }



  return (
    <div className="app-container space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold">
          Daily Puzzle
        </h2>
        <div className="text-right text-sm">
          <div className="opacity-70">
            {user ? user.email : "Guest User"}
          </div>
          <button
            className="button secondary mt-1 px-3 py-1 text-xs"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>

      {loading && <div>Loading puzzle...</div>}

      {puzzle && (
        <motion.div
          layout
          className="card relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {celebrate && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="confetti"
                  style={{
                    left:
                      Math.random() * 100 + "%",
                    background:
                      i % 2 === 0
                        ? "#2563eb"
                        : "#0ea5e9",
                    animationDelay:
                      Math.random() *
                      0.5 +
                      "s"
                  }}
                />
              ))}
            </div>
          )}

          <strong>{puzzleDisplay}</strong>

          <input
            className="input"
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            placeholder="Your answer"
          />

          <button
            className="button"
            onClick={submit}
            disabled={
              progress?.completed ||
              !input.trim()
            }
          >
            Submit
          </button>


          <button
            className="button secondary"
            disabled={
              progress?.completed ||
              hints.length >= 3
            }
            onClick={async () => {
              const hint =
                await useHint();
              if (!hint)
                setResult(
                  "No hints left today!"
                );
            }}
          >
            Get Hint ({3 - hints.length} left)
          </button>

          {hints.length > 0 && (
            <ul className="mt-4 space-y-2">
              {hints.map((h, i) => (
                <motion.li
                  key={i}
                  initial={{
                    opacity: 0,
                    y: 5
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  className="text-sm bg-white/10 p-2 rounded-lg"
                >
                  💡 {h}
                </motion.li>
              ))}
            </ul>
          )}

          {result && (
            <motion.div
              className="feedback"
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              style={{
                color:
                  result === "Correct!"
                    ? "#2563eb"
                    : "red"
              }}
            >
              {result}
            </motion.div>
          )}

          {progress && (
            <div className="stats">
              Score: {progress.score}
              <br />
              Attempts: {progress.attempts}
            </div>
          )}
        </motion.div>
      )}

      <Suspense fallback={null}>
        <div className="card">
          <h3 className="mb-4 font-semibold">
            🔥 Streak Progress
          </h3>
          <HeatmapContainer
            refreshKey={heatmapRefresh}
            userId={activeUserId}
          />
        </div>
      </Suspense>
    </div>
  );
}

export default App;
