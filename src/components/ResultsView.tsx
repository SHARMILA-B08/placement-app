import React from 'react';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Zap,
  RotateCcw,
  BookOpen,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Award
} from 'lucide-react';
import { PracticeSessionResult } from '../types';

interface ResultsViewProps {
  result: PracticeSessionResult;
  onReviewAnswers: () => void;
  onRetakeOrNew: () => void;
  onGoHome: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  result,
  onReviewAnswers,
  onRetakeOrNew,
  onGoHome,
}) => {
  // Analyze topic breakdown in this session to determine strongest & weakest topics
  const topicBreakdown: Record<string, { correct: number; total: number }> = {};
  result.records.forEach((r) => {
    const t = r.question.topic;
    if (!topicBreakdown[t]) {
      topicBreakdown[t] = { correct: 0, total: 0 };
    }
    topicBreakdown[t].total += 1;
    if (r.isCorrect) {
      topicBreakdown[t].correct += 1;
    }
  });

  const sortedTopics = Object.entries(topicBreakdown).map(([topic, stats]) => ({
    topic,
    accuracy: Math.round((stats.correct / stats.total) * 100),
    correct: stats.correct,
    total: stats.total,
  }));

  sortedTopics.sort((a, b) => b.accuracy - a.accuracy);

  const strongestTopic = sortedTopics[0]?.accuracy >= 60 ? sortedTopics[0] : null;
  const weakestTopic =
    sortedTopics.length > 0
      ? [...sortedTopics].reverse().find((t) => t.accuracy < 70) || null
      : null;

  const formatMinutesSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    if (m === 0) return `${s}s`;
    return `${m}m ${s}s`;
  };

  const getScoreFeedback = (acc: number) => {
    if (acc >= 90) return { title: 'Outstanding Performance!', message: 'You have mastery over these topics. You are ready for top tech campus interviews!' };
    if (acc >= 75) return { title: 'Great Job!', message: 'Solid grasp of core fundamentals. Review the few missed concepts to reach 95%+.' };
    if (acc >= 50) return { title: 'Good Effort!', message: 'Promising start. Focus on the explanation walkthroughs and shortcut tips below.' };
    return { title: 'Needs More Practice', message: 'Do not be discouraged. Consistent daily practice and concept revision will improve your score rapidly.' };
  };

  const feedback = getScoreFeedback(result.accuracy);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Hero Score Card */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-900/40 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
              <Trophy className="w-3.5 h-3.5 text-amber-300" />
              Practice Session Completed
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {feedback.title}
            </h1>
            <p className="text-sm text-indigo-200/80 max-w-lg leading-relaxed">
              {feedback.message}
            </p>
          </div>

          {/* Accuracy Circle / Score */}
          <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 min-w-[140px]">
            <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white tabular-nums">
              {result.accuracy}%
            </div>
            <span className="text-xs font-medium text-indigo-200 mt-1">Accuracy</span>
            <span className="text-[11px] font-semibold text-amber-300 mt-0.5">
              +{result.pointsEarned} Points
            </span>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid (6 Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Total Questions */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col">
          <span className="text-xs text-slate-500 font-medium">Questions</span>
          <span className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
            {result.totalQuestions}
          </span>
          <span className="text-[11px] text-slate-400 mt-auto pt-1">Attempted</span>
        </div>

        {/* Correct Answers */}
        <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-xs flex flex-col">
          <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Correct
          </span>
          <span className="text-2xl font-bold font-mono text-emerald-600 mt-1 tabular-nums">
            {result.correctAnswers}
          </span>
          <span className="text-[11px] text-emerald-600/70 mt-auto pt-1">
            +{result.correctAnswers * 10} pts
          </span>
        </div>

        {/* Wrong Answers */}
        <div className="bg-white p-4 rounded-2xl border border-rose-200 shadow-xs flex flex-col">
          <span className="text-xs text-rose-700 font-medium flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Wrong
          </span>
          <span className="text-2xl font-bold font-mono text-rose-600 mt-1 tabular-nums">
            {result.wrongAnswers}
          </span>
          <span className="text-[11px] text-rose-600/70 mt-auto pt-1">No deductions</span>
        </div>

        {/* Unanswered */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col">
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            Skipped
          </span>
          <span className="text-2xl font-bold font-mono text-slate-700 mt-1 tabular-nums">
            {result.unanswered}
          </span>
          <span className="text-[11px] text-slate-400 mt-auto pt-1">Unattempted</span>
        </div>

        {/* Total Time */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col">
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            Total Time
          </span>
          <span className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
            {formatMinutesSeconds(result.totalTimeSec)}
          </span>
          <span className="text-[11px] text-slate-400 mt-auto pt-1">Time spent</span>
        </div>

        {/* Average Time per Question */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col">
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            Avg / Q
          </span>
          <span className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
            {result.averageTimeSec}s
          </span>
          <span className="text-[11px] text-slate-400 mt-auto pt-1">Target &lt; 60s</span>
        </div>
      </div>

      {/* Strongest & Weakest Topic Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strongest Topic */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            Strongest Topic
          </div>
          {strongestTopic ? (
            <div>
              <div className="text-base font-bold text-slate-900">{strongestTopic.topic}</div>
              <p className="text-xs text-slate-500 mt-1">
                {strongestTopic.correct} of {strongestTopic.total} correct ({strongestTopic.accuracy}% accuracy).
                Keep reinforcing this strength!
              </p>
            </div>
          ) : (
            <p className="text-xs text-slate-500">
              Practice more questions across topics to identify your key strengths.
            </p>
          )}
        </div>

        {/* Requiring Improvement */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-700">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            Topic Requiring Improvement
          </div>
          {weakestTopic ? (
            <div>
              <div className="text-base font-bold text-slate-900">{weakestTopic.topic}</div>
              <p className="text-xs text-slate-500 mt-1">
                {weakestTopic.correct} of {weakestTopic.total} correct ({weakestTopic.accuracy}% accuracy).
                Check the step-by-step solutions or visit Revision.
              </p>
            </div>
          ) : (
            <p className="text-xs text-emerald-600 font-medium">
              Excellent! No weak topics detected in this session.
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onReviewAnswers}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all cursor-pointer flex items-center gap-2 active:scale-95"
          >
            <BookOpen className="w-4 h-4" />
            Review Answers & Explanations
          </button>

          <button
            type="button"
            onClick={onRetakeOrNew}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            Practice Again
          </button>
        </div>

        <button
          type="button"
          onClick={onGoHome}
          className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <span>Back to Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
