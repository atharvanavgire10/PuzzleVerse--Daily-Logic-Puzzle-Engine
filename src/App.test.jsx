import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import * as hook from "./hooks/useDailyPuzzle";

vi.mock("./hooks/useDailyPuzzle");

describe("App UI", () => {
  beforeEach(() => {
    hook.useDailyPuzzle.mockReturnValue({
      puzzle: {
        type: "NUMBER_GRID",
        question: { grid: [1, 2, 3] }
      },
      validateAndSave: vi.fn().mockResolvedValue(true),
      progress: { attempts: 0, score: 100 },
      hints: [],
      useHint: vi.fn(),
      loading: false
    });
  });

  test("renders puzzle title", () => {
    render(<App />);
    expect(screen.getByText(/Daily Puzzle/i)).toBeInTheDocument();
  });

  test("submit triggers validation", async () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/Your answer/i), {
      target: { value: "6" }
    });

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() =>
      expect(screen.getByText(/Correct!/i)).toBeInTheDocument()
    );
  });

  test("shows score and attempts", () => {
    render(<App />);
    expect(screen.getByText(/Score:/i)).toBeInTheDocument();
    expect(screen.getByText(/Attempts:/i)).toBeInTheDocument();
  });

  test("shows incorrect message", async () => {
  const { useDailyPuzzle } = await import("./hooks/useDailyPuzzle");

  useDailyPuzzle.mockReturnValue({
    puzzle: {
      type: "NUMBER_GRID",
      question: { grid: [1, 2, 3] }
    },
    validateAndSave: vi.fn().mockResolvedValue(false),
    progress: { attempts: 1, score: 0 },
    hints: [],
    useHint: vi.fn(),
    loading: false
  });

  render(<App />);

  fireEvent.change(screen.getByPlaceholderText(/Your answer/i), {
    target: { value: "0" }
  });

  fireEvent.click(screen.getByText(/Submit/i));

  await screen.findByText(/Wrong!/i);
});
test("shows loading state", async () => {
  const { useDailyPuzzle } = await import("./hooks/useDailyPuzzle");

  useDailyPuzzle.mockReturnValue({
    puzzle: null,
    loading: true
  });

  render(<App />);
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});

test("clicking hint triggers useHint", async () => {
  const mockHint = vi.fn();

  const { useDailyPuzzle } = await import("./hooks/useDailyPuzzle");

  useDailyPuzzle.mockReturnValue({
    puzzle: {
      type: "NUMBER_GRID",
      question: { grid: [1, 2] }
    },
    validateAndSave: vi.fn().mockResolvedValue(true),
    progress: { attempts: 0, score: 0 },
    hints: [],
    useHint: mockHint,
    loading: false
  });

  render(<App />);
  fireEvent.click(screen.getByText(/Hint/i));
  expect(mockHint).toHaveBeenCalled();
});

test("submit without input does nothing", async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/Submit/i));
});


});
