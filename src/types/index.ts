export type CategoryId =
  | 'aptitude'
  | 'logical'
  | 'number-series'
  | 'missing-numbers'
  | 'error-finding'
  | 'python'
  | 'c'
  | 'cpp'
  | 'java';

export type PracticeMode =
  | 'topic'
  | 'quick'
  | 'daily'
  | 'programming'
  | 'mock'
  | 'error-correction'
  | 'weak-drill';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type QuestionType =
  | 'mcq'
  | 'missing-number'
  | 'number-series'
  | 'incorrect-number'
  | 'coding-error'
  | 'output-prediction'
  | 'missing-code'
  | 'syntax-error'
  | 'logical-puzzle';

export interface Question {
  id: string;
  category: CategoryId;
  topic: string;
  difficulty: Difficulty;
  questionType: QuestionType;
  questionText: string;
  codeSnippet?: string;
  options: [string, string, string, string];
  correctAnswer: number; // 0 = A, 1 = B, 2 = C, 3 = D
  explanation: string;
  shortcutTip?: string;
  whyWrong?: string; // Explanation of why wrong choices occur or general pitfall
  estimatedTimeSec: number;
}

export interface UserAnswerRecord {
  questionId: string;
  question: Question;
  selectedOption: number; // -1 if unanswered
  isCorrect: boolean;
  timeSpentSec: number;
}

export interface PracticeSessionResult {
  sessionId: string;
  mode: PracticeMode;
  category?: CategoryId;
  topic?: string;
  startedAt: string;
  completedAt: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  unanswered: number;
  accuracy: number;
  totalTimeSec: number;
  averageTimeSec: number;
  pointsEarned: number;
  records: UserAnswerRecord[];
}

export interface TopicStat {
  topic: string;
  category: CategoryId;
  attempted: number;
  correct: number;
  wrong: number;
}

export interface UserStats {
  totalAttempted: number;
  totalCorrect: number;
  totalWrong: number;
  accuracy: number;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  dailyGoal: number; // Target questions per day (e.g. 15)
  todayAttempted: number;
  averageSolvingTimeSec: number;
  totalTimeSec: number;
  topicStats: Record<string, TopicStat>; // keyed by topic name
  sessionsCompleted: number;
  bookmarkedIds: string[];
}
