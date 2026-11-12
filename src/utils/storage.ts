import { UserStats, PracticeSessionResult, TopicStat } from '../types';

const STORAGE_KEY_STATS = 'smart_prep_user_stats';
const STORAGE_KEY_SESSIONS = 'smart_prep_session_history';

function getTodayDateString(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

function getYesterdayDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

export const INITIAL_USER_STATS: UserStats = {
  totalAttempted: 0,
  totalCorrect: 0,
  totalWrong: 0,
  accuracy: 0,
  totalPoints: 0,
  currentStreak: 1,
  longestStreak: 1,
  lastActiveDate: getTodayDateString(),
  dailyGoal: 15,
  todayAttempted: 0,
  averageSolvingTimeSec: 0,
  totalTimeSec: 0,
  topicStats: {},
  sessionsCompleted: 0,
  bookmarkedIds: []
};

export function loadUserStats(): UserStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STATS);
    if (!raw) {
      saveUserStats(INITIAL_USER_STATS);
      return INITIAL_USER_STATS;
    }
    const parsed: UserStats = JSON.parse(raw);
    const today = getTodayDateString();
    const yesterday = getYesterdayDateString();

    // Check streak advancement & today's counter reset
    if (parsed.lastActiveDate !== today) {
      if (parsed.lastActiveDate === yesterday) {
        // Active yesterday, maintain streak
      } else if (parsed.lastActiveDate && parsed.lastActiveDate < yesterday) {
        // Missed a day, reset streak to 1
        parsed.currentStreak = 1;
      }
      parsed.todayAttempted = 0;
      parsed.lastActiveDate = today;
      saveUserStats(parsed);
    }

    return parsed;
  } catch (e) {
    console.error('Failed to load user stats from localStorage:', e);
    return INITIAL_USER_STATS;
  }
}

export function saveUserStats(stats: UserStats): void {
  try {
    localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save user stats to localStorage:', e);
  }
}

export function recordSessionCompletion(session: PracticeSessionResult): UserStats {
  const current = loadUserStats();
  const today = getTodayDateString();

  const newTotalAttempted = current.totalAttempted + session.records.length;
  const newTotalCorrect = current.totalCorrect + session.correctAnswers;
  const newTotalWrong = current.totalWrong + session.wrongAnswers;
  const newTotalTimeSec = current.totalTimeSec + session.totalTimeSec;
  const newPoints = current.totalPoints + session.pointsEarned;

  const newAccuracy = newTotalAttempted > 0
    ? Math.round((newTotalCorrect / newTotalAttempted) * 100)
    : 0;

  const newAvgTime = newTotalAttempted > 0
    ? Math.round(newTotalTimeSec / newTotalAttempted)
    : 0;

  // Streak logic
  let newCurrentStreak = current.currentStreak;
  if (current.lastActiveDate !== today) {
    newCurrentStreak += 1;
  }
  const newLongestStreak = Math.max(newCurrentStreak, current.longestStreak);

  // Update topic stats
  const updatedTopics: Record<string, TopicStat> = { ...current.topicStats };
  for (const record of session.records) {
    const topicName = record.question.topic;
    const existing = updatedTopics[topicName] || {
      topic: topicName,
      category: record.question.category,
      attempted: 0,
      correct: 0,
      wrong: 0
    };

    existing.attempted += 1;
    if (record.isCorrect) {
      existing.correct += 1;
    } else if (record.selectedOption !== -1) {
      existing.wrong += 1;
    }
    updatedTopics[topicName] = existing;
  }

  const updatedStats: UserStats = {
    ...current,
    totalAttempted: newTotalAttempted,
    totalCorrect: newTotalCorrect,
    totalWrong: newTotalWrong,
    accuracy: newAccuracy,
    totalPoints: newPoints,
    currentStreak: newCurrentStreak,
    longestStreak: newLongestStreak,
    lastActiveDate: today,
    todayAttempted: current.todayAttempted + session.records.length,
    averageSolvingTimeSec: newAvgTime,
    totalTimeSec: newTotalTimeSec,
    topicStats: updatedTopics,
    sessionsCompleted: current.sessionsCompleted + 1
  };

  saveUserStats(updatedStats);
  saveSessionHistory(session);

  return updatedStats;
}

export function saveSessionHistory(session: PracticeSessionResult): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SESSIONS);
    const history: PracticeSessionResult[] = raw ? JSON.parse(raw) : [];
    // Keep last 30 sessions
    history.unshift(session);
    if (history.length > 30) {
      history.pop();
    }
    localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(history));
  } catch (e) {
    console.error('Failed to save session history:', e);
  }
}

export function loadSessionHistory(): PracticeSessionResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SESSIONS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load session history:', e);
    return [];
  }
}

export function toggleBookmark(questionId: string): string[] {
  const current = loadUserStats();
  const exists = current.bookmarkedIds.includes(questionId);
  const updated = exists
    ? current.bookmarkedIds.filter((id) => id !== questionId)
    : [...current.bookmarkedIds, questionId];

  current.bookmarkedIds = updated;
  saveUserStats(current);
  return updated;
}

export function updateDailyGoal(goal: number): UserStats {
  const current = loadUserStats();
  current.dailyGoal = Math.max(5, Math.min(100, goal));
  saveUserStats(current);
  return current;
}

export function resetAllProgress(): UserStats {
  try {
    localStorage.removeItem(STORAGE_KEY_STATS);
    localStorage.removeItem(STORAGE_KEY_SESSIONS);
  } catch (e) {
    console.error('Failed to clear storage:', e);
  }
  const fresh = { ...INITIAL_USER_STATS, lastActiveDate: getTodayDateString() };
  saveUserStats(fresh);
  return fresh;
}
