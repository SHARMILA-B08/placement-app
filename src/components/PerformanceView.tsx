import React, { useState } from 'react';
import {
  BarChart3,
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  Zap,
  Flame,
  Target,
  Trash2,
  AlertTriangle,
  RotateCcw,
  Calendar,
  Check
} from 'lucide-react';
import { UserStats, PracticeSessionResult } from '../types';
import { resetAllProgress, updateDailyGoal } from '../utils/storage';
import { CATEGORIES } from '../data/questions';

interface PerformanceViewProps {
  stats: UserStats;
  sessionHistory: PracticeSessionResult[];
  onStatsUpdated: (newStats: UserStats) => void;
  onGoHome: () => void;
}

export const PerformanceView: React.FC<PerformanceViewProps> = ({
  stats,
  sessionHistory,
  onStatsUpdated,
  onGoHome,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [selectedGoal, setSelectedGoal] = useState<number>(stats.dailyGoal);
  const [goalSaved, setGoalSaved] = useState<boolean>(false);

  const handleGoalChange = (newGoal: number) => {
    setSelectedGoal(newGoal);
    const updated = updateDailyGoal(newGoal);
    onStatsUpdated(updated);
    setGoalSaved(true);
    setTimeout(() => setGoalSaved(false), 2000);
  };

  const handleConfirmReset = () => {
    const fresh = resetAllProgress();
    onStatsUpdated(fresh);
    setShowResetConfirm(false);
  };

  // Group topic stats by category
  const topicEntries = Object.values(stats.topicStats);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Analytics & Progress
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Placement Prep Performance
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track your solving speed, category mastery, and practice consistency.
          </p>
        </div>

        {/* Reset Progress Button */}
        <button
          type="button"
          onClick={() => setShowResetConfirm(true)}
          className="self-start sm:self-center px-4 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Reset All Progress
        </button>
      </div>

      {/* Primary Metric Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Total Solved</span>
          <div className="text-3xl font-extrabold font-mono text-slate-900 tabular-nums">
            {stats.totalAttempted}
          </div>
          <span className="text-[11px] text-slate-400 block pt-1">
            {stats.totalCorrect} correct · {stats.totalWrong} wrong
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Lifetime Accuracy</span>
          <div className="text-3xl font-extrabold font-mono text-indigo-600 tabular-nums">
            {stats.accuracy}%
          </div>
          <span className="text-[11px] text-indigo-600/70 block pt-1">
            Overall success rate
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Practice Streak</span>
          <div className="text-3xl font-extrabold font-mono text-amber-500 tabular-nums flex items-center gap-1">
            <Flame className="w-6 h-6 fill-amber-500" />
            {stats.currentStreak}d
          </div>
          <span className="text-[11px] text-amber-600/70 block pt-1">
            Longest streak: {stats.longestStreak} days
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Avg Solving Speed</span>
          <div className="text-3xl font-extrabold font-mono text-slate-900 tabular-nums">
            {stats.averageSolvingTimeSec}s
          </div>
          <span className="text-[11px] text-slate-400 block pt-1">
            Target: &lt; 60s per question
          </span>
        </div>
      </div>

      {/* Daily Goal Configuration Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Daily Practice Target</h2>
            <p className="text-xs text-slate-500">
              Set how many questions you aim to solve each day to maintain momentum
            </p>
          </div>
          {goalSaved && (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Goal updated!
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[5, 10, 15, 20, 25, 30].map((goalNum) => (
            <button
              key={goalNum}
              type="button"
              onClick={() => handleGoalChange(goalNum)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                stats.dailyGoal === goalNum
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {goalNum} Qs / day
            </button>
          ))}
        </div>
      </div>

      {/* Topic Accuracy Breakdown */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Topic Performance Breakdown</h2>
            <p className="text-xs text-slate-500">Accuracy per specific topic attempted</p>
          </div>
          <span className="text-xs text-slate-400">
            {topicEntries.length} topics practiced
          </span>
        </div>

        {topicEntries.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            No topic data yet. Start your first practice session on the dashboard!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="pb-3 font-semibold">Topic</th>
                  <th className="pb-3 font-semibold">Category</th>
                  <th className="pb-3 font-semibold text-center">Attempted</th>
                  <th className="pb-3 font-semibold text-center">Correct</th>
                  <th className="pb-3 font-semibold text-center">Wrong</th>
                  <th className="pb-3 font-semibold text-right">Accuracy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topicEntries.map((item) => {
                  const acc = Math.round((item.correct / item.attempted) * 100);
                  return (
                    <tr key={item.topic} className="hover:bg-slate-50/60">
                      <td className="py-3 font-bold text-slate-800">{item.topic}</td>
                      <td className="py-3 text-slate-500 capitalize">{item.category}</td>
                      <td className="py-3 text-center font-mono tabular-nums">{item.attempted}</td>
                      <td className="py-3 text-center font-mono tabular-nums text-emerald-600 font-semibold">
                        {item.correct}
                      </td>
                      <td className="py-3 text-center font-mono tabular-nums text-rose-600">
                        {item.wrong}
                      </td>
                      <td className="py-3 text-right font-mono font-bold">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[11px] ${
                            acc >= 75
                              ? 'bg-emerald-50 text-emerald-700'
                              : acc >= 50
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          {acc}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Session History */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Recent Practice Sessions</h2>
            <p className="text-xs text-slate-500">Completed test logs and scores</p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {sessionHistory.length} recorded
          </span>
        </div>

        {sessionHistory.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            No completed sessions recorded yet.
          </div>
        ) : (
          <div className="space-y-2">
            {sessionHistory.slice(0, 10).map((sess) => (
              <div
                key={sess.sessionId}
                className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center uppercase text-[10px]">
                    {sess.mode.substring(0, 3)}
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 capitalize">
                      {sess.mode === 'quick'
                        ? 'Quick Practice'
                        : sess.mode === 'daily'
                        ? 'Daily Challenge'
                        : sess.mode === 'mock'
                        ? 'Mock Exam'
                        : sess.topic || sess.category || 'Practice'}
                    </span>
                    <div className="text-[11px] text-slate-400">
                      {new Date(sess.completedAt).toLocaleDateString()} at{' '}
                      {new Date(sess.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-mono text-slate-600 tabular-nums">
                    {sess.correctAnswers} / {sess.totalQuestions} ({sess.accuracy}%)
                  </span>
                  <span className="font-mono text-indigo-600 font-bold tabular-nums">
                    +{sess.pointsEarned} pts
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-slate-900">Reset All Practice Data?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                This will erase all question history, accuracy percentages, streak counters, and points. This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs cursor-pointer"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
