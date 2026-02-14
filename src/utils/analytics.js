const ANALYTICS_KEY = "puzzle_analytics";

function loadAnalytics() {
  const data = localStorage.getItem(ANALYTICS_KEY);
  return data ? JSON.parse(data) : null;
}

function saveAnalytics(data) {
  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
}

export function initAnalyticsSession() {
  const now = Date.now();

  const analytics =
    loadAnalytics() || {
      totalSessions: 0,
      totalSessionTime: 0,
      activeDays: [],
      completions: []
    };

  analytics.totalSessions += 1;
  analytics.sessionStart = now;

  saveAnalytics(analytics);
}

export function endAnalyticsSession() {
  const analytics = loadAnalytics();
  if (!analytics || !analytics.sessionStart) return;

  const duration = Date.now() - analytics.sessionStart;

  analytics.totalSessionTime += duration;
  delete analytics.sessionStart;

  saveAnalytics(analytics);
}

export function trackPuzzleCompletion(date) {
  const analytics = loadAnalytics();
  if (!analytics) return;

  if (!analytics.completions.includes(date)) {
    analytics.completions.push(date);
  }

  if (!analytics.activeDays.includes(date)) {
    analytics.activeDays.push(date);
  }

  saveAnalytics(analytics);
}

export function getAnalytics() {
  return loadAnalytics();
}
