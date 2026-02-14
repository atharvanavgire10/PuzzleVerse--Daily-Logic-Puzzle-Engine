import {
  initAnalyticsSession,
  endAnalyticsSession,
  trackPuzzleCompletion,
  getAnalytics
} from "./analytics";

describe("Analytics", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("initializes session", () => {
    initAnalyticsSession();
    const data = getAnalytics();
    expect(data.totalSessions).toBe(1);
  });

  test("tracks completion", () => {
    initAnalyticsSession();
    trackPuzzleCompletion("2026-01-01");
    const data = getAnalytics();
    expect(data.completions.length).toBe(1);
  });

  test("ends session", () => {
    initAnalyticsSession();
    endAnalyticsSession();
    const data = getAnalytics();
    expect(data.totalSessionTime).toBeGreaterThanOrEqual(0);
  });
});
