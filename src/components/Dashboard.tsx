import React from 'react';
import {
  Play,
  RotateCcw,
  Flame,
  Target,
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  Zap,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Brain,
  Calculator,
  FileCode2,
  Terminal,
  Cpu,
  Coffee,
  CheckSquare,
  HelpCircle,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { UserStats, CategoryId, PracticeMode } from '../types';
import { CATEGORIES, ALL_QUESTIONS } from '../data/questions';

interface DashboardProps {
  stats: UserStats;
  onStartMode: (mode: PracticeMode, category?: CategoryId, topic?: string) => void;
  onNavigateCategory: (category: CategoryId) => void;
  onNavigateToRevision: () => void;
  onOpenAIGenerator: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  stats,
  onStartMode,
  onNavigateCategory,
  onNavigateToRevision,
  onOpenAIGenerator,
}) => {
  // Compute weak topics from stats
  const weakTopics = Object.values(stats.topicStats)
    .filter((t) => t.attempted >= 2 && (t.correct / t.attempted) < 0.65)
    .sort((a, b) => (a.correct / a.attempted) - (b.correct / b.attempted));

  const progressPercent = Math.min(
    100,
    Math.round((stats.todayAttempted / stats.dailyGoal) * 100)
  );

  const getCategoryIcon = (id: CategoryId) => {
    switch (id) {
      case 'aptitude':
        return Calculator;
      case 'logical':
        return Brain;
      case 'number-series':
        return TrendingUp;
      case 'missing-numbers':
        return HelpCircle;
      case 'error-finding':
        return AlertTriangle;
      case 'python':
        return FileCode2;
      case 'c':
        return Terminal;
      case 'cpp':
        return Cpu;
      case 'java':
        return Coffee;
      default:
        return BookOpen;
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. Welcome Hero Banner */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-indigo-900/50 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-200 border border-indigo-400/30">
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              <span>Campus Recruitment Training & Placement Portal</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
              Master Aptitude & Beginner Coding for Campus Placements
            </h1>

            <p className="text-sm sm:text-base text-indigo-100/80 max-w-2xl leading-relaxed">
              Solve verified 60-second placement questions in Mathematics, Logical Reasoning, Error Finding, and programming in Python, C, C++, and Java. Built with instant explanations, shortcuts, and AI mentoring.
            </p>

            {/* CTA Buttons: Start Practice & Continue Practice */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onStartMode('quick')}
                className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" />
                Start Practice (10 Questions)
              </button>

              <button
                type="button"
                onClick={() => onStartMode('daily')}
                className="px-5 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 flex items-center gap-2 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Continue Daily Challenge (20 Qs)
              </button>

              <button
                type="button"
                onClick={() => onStartMode('mock')}
                className="px-4 py-3 rounded-xl text-sm font-semibold text-purple-200 hover:text-white bg-purple-900/40 hover:bg-purple-900/60 border border-purple-500/30 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <CheckSquare className="w-4 h-4 text-purple-300" />
                Take Mock Test (30 Min)
              </button>
            </div>
          </div>

          {/* Quick Streak & Daily Goal Card in Hero */}
          <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span className="text-xs uppercase tracking-wider font-bold text-amber-200">
                  Daily Streak
                </span>
              </div>
              <span className="text-xl font-bold font-mono text-white tabular-nums">
                {stats.currentStreak} Days
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-indigo-100 font-medium">
                <span>Daily Practice Goal</span>
                <span className="tabular-nums font-bold text-white">
                  {stats.todayAttempted} / {stats.dailyGoal} Qs
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-400 to-emerald-400 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-[11px] text-indigo-200 block text-right">
                {progressPercent}% accomplished today
              </span>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-indigo-200">
              <span>Points Earned:</span>
              <span className="font-bold text-amber-300 text-sm tabular-nums">
                {stats.totalPoints} pts
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key Performance Metrics (Required Display Items) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Your Practice Performance Overview</h2>
          <span className="text-xs text-slate-500 font-medium">Updated in real-time</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Total Questions Attempted */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col">
            <span className="text-xs text-slate-500 font-medium">Total Attempted</span>
            <span className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
              {stats.totalAttempted}
            </span>
            <span className="text-[11px] text-slate-400 mt-auto pt-1">Questions</span>
          </div>

          {/* Correct Answers */}
          <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-xs flex flex-col">
            <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Correct
            </span>
            <span className="text-2xl font-bold font-mono text-emerald-600 mt-1 tabular-nums">
              {stats.totalCorrect}
            </span>
            <span className="text-[11px] text-emerald-600/70 mt-auto pt-1">
              +{stats.totalCorrect * 10} pts
            </span>
          </div>

          {/* Wrong Answers */}
          <div className="bg-white p-4 rounded-2xl border border-rose-200 shadow-xs flex flex-col">
            <span className="text-xs text-rose-700 font-medium flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5 text-rose-600" />
              Wrong
            </span>
            <span className="text-2xl font-bold font-mono text-rose-600 mt-1 tabular-nums">
              {stats.totalWrong}
            </span>
            <span className="text-[11px] text-rose-600/70 mt-auto pt-1">0 deductions</span>
          </div>

          {/* Accuracy Percentage */}
          <div className="bg-white p-4 rounded-2xl border border-indigo-200 shadow-xs flex flex-col">
            <span className="text-xs text-indigo-700 font-medium flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-indigo-600" />
              Accuracy
            </span>
            <span className="text-2xl font-bold font-mono text-indigo-700 mt-1 tabular-nums">
              {stats.accuracy}%
            </span>
            <span className="text-[11px] text-indigo-600/70 mt-auto pt-1">Success rate</span>
          </div>

          {/* Current Practice Streak */}
          <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs flex flex-col">
            <span className="text-xs text-amber-700 font-medium flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              Streak
            </span>
            <span className="text-2xl font-bold font-mono text-amber-600 mt-1 tabular-nums">
              {stats.currentStreak}d
            </span>
            <span className="text-[11px] text-amber-600/70 mt-auto pt-1">
              Best: {stats.longestStreak}d
            </span>
          </div>

          {/* Average Solving Time */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-indigo-500" />
              Avg Time
            </span>
            <span className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
              {stats.averageSolvingTimeSec}s
            </span>
            <span className="text-[11px] text-slate-400 mt-auto pt-1">Per question</span>
          </div>
        </div>
      </div>

      {/* 3. Weak Topic Alert Banner (if any) */}
      {weakTopics.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200/90 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-amber-900">
                Weak Topic Identified: {weakTopics[0].topic}
              </h3>
              <p className="text-xs text-amber-800 leading-relaxed">
                You scored below 65% on this topic ({weakTopics[0].correct}/{weakTopics[0].attempted} correct). Revise the concept or drill 3 targeted practice questions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onStartMode('weak-drill', weakTopics[0].category, weakTopics[0].topic)}
              className="px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-xs cursor-pointer transition-colors"
            >
              Drill 3 Questions
            </button>
            <button
              type="button"
              onClick={onNavigateToRevision}
              className="px-3 py-2 text-xs font-semibold text-amber-800 hover:bg-amber-100 rounded-xl border border-amber-300 cursor-pointer transition-colors"
            >
              Revision Guide
            </button>
          </div>
        </div>
      )}

      {/* 4. Interactive Practice Modes */}
      <div className="space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Choose Practice Mode</h2>
          <p className="text-xs text-slate-500">Tailored practice sessions for every prep style</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Quick Practice */}
          <div
            onClick={() => onStartMode('quick')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                Quick Practice
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                10 rapid mixed questions with a 60-second timer to test your reflexes and speed.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
              <span>Start Quick 10</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Daily Challenge */}
          <div
            onClick={() => onStartMode('daily')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-purple-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-purple-600 transition-colors">
                Daily Challenge
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                20 balanced questions (10 aptitude & logic + 10 programming) to build your placement streak.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-purple-600 group-hover:translate-x-1 transition-transform">
              <span>Start Daily 20</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Mock Test */}
          <div
            onClick={() => onStartMode('mock')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <CheckSquare className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-600 transition-colors">
                30-Min Mock Exam
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Simulated 30-question placement test with question palette and post-exam comprehensive analysis.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
              <span>Launch Mock Test</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Error Correction Practice */}
          <div
            onClick={() => onStartMode('error-correction')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-amber-600 transition-colors">
                Error Finding Drill
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Dedicated practice on incorrect series, wrong math operations, and coding syntax errors.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-amber-600 group-hover:translate-x-1 transition-transform">
              <span>Find Errors</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>
        </div>
      </div>

      {/* 5. Category Browser Grid (All 9 Major Placement Categories) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Explore Placement Categories</h2>
            <p className="text-xs text-slate-500">Pick any category to practice topic-by-topic</p>
          </div>
          <button
            type="button"
            onClick={onOpenAIGenerator}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Generate Custom AI Questions
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => {
            const Icon = getCategoryIcon(cat.id);
            const questionCount = ALL_QUESTIONS.filter((q) => q.category === cat.id).length;

            return (
              <div
                key={cat.id}
                onClick={() => onNavigateCategory(cat.id)}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 tabular-nums">
                      {questionCount} Questions
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    {cat.topics.length} verified topics
                  </span>
                  <span className="font-bold text-indigo-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Explore
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
