import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  X,
  Target,
  Trophy,
  Flame,
  AlertCircle
} from 'lucide-react';
import { Question, PracticeMode, CategoryId, UserAnswerRecord, PracticeSessionResult } from '../types';
import { QuestionCard } from './QuestionCard';
import { recordSessionCompletion, toggleBookmark } from '../utils/storage';

interface PracticeSessionProps {
  questions: Question[];
  mode: PracticeMode;
  category?: CategoryId;
  topic?: string;
  bookmarkedIds: string[];
  onComplete: (result: PracticeSessionResult) => void;
  onExit: () => void;
  onUpdateBookmarks: (newBookmarks: string[]) => void;
  aiAvailable?: boolean;
}

export const PracticeSession: React.FC<PracticeSessionProps> = ({
  questions,
  mode,
  category,
  topic,
  bookmarkedIds,
  onComplete,
  onExit,
  onUpdateBookmarks,
  aiAvailable = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [records, setRecords] = useState<UserAnswerRecord[]>([]);
  const [sessionStartTime] = useState<string>(new Date().toISOString());
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);

  if (!questions || questions.length === 0) {
    return (
      <div className="max-w-xl mx-auto p-8 text-center bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
        <h3 className="text-lg font-bold text-slate-900">No Questions Found</h3>
        <p className="text-sm text-slate-600">
          We could not find questions matching this filter. Please choose another topic or mode.
        </p>
        <button
          onClick={onExit}
          className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 cursor-pointer"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleAnswerSubmitted = (selectedOption: number, timeSpentSec: number) => {
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    const newRecord: UserAnswerRecord = {
      questionId: currentQuestion.id,
      question: currentQuestion,
      selectedOption,
      isCorrect,
      timeSpentSec,
    };
    setRecords((prev) => [...prev, newRecord]);

    if (isCorrect) {
      // Small celebratory burst
      try {
        confetti({
          particleCount: 25,
          spread: 45,
          origin: { y: 0.8 },
          colors: ['#10b981', '#6366f1', '#a855f7'],
        });
      } catch {
        // Fallback silently if canvas-confetti is not loaded
      }
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Finalize session
      const completedAt = new Date().toISOString();
      const correctCount = records.filter((r) => r.isCorrect).length;
      const wrongCount = records.filter((r) => !r.isCorrect && r.selectedOption !== -1).length;
      const unansweredCount = questions.length - records.length;
      const totalTimeSec = records.reduce((acc, r) => acc + r.timeSpentSec, 0);
      const accuracy = records.length > 0 ? Math.round((correctCount / records.length) * 100) : 0;
      const pointsEarned = correctCount * 10;
      const averageTimeSec = records.length > 0 ? Math.round(totalTimeSec / records.length) : 0;

      const result: PracticeSessionResult = {
        sessionId: `session-${Date.now()}`,
        mode,
        category,
        topic,
        startedAt: sessionStartTime,
        completedAt,
        totalQuestions: questions.length,
        correctAnswers: correctCount,
        wrongAnswers: wrongCount,
        unanswered: unansweredCount,
        accuracy,
        totalTimeSec,
        averageTimeSec,
        pointsEarned,
        records,
      };

      // Save to storage
      recordSessionCompletion(result);
      onComplete(result);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleBookmarkToggle = () => {
    const updated = toggleBookmark(currentQuestion.id);
    onUpdateBookmarks(updated);
  };

  const getModeTitle = () => {
    switch (mode) {
      case 'quick':
        return 'Quick Practice (10 Questions)';
      case 'daily':
        return 'Daily Placement Challenge (20 Questions)';
      case 'programming':
        return `${category ? category.toUpperCase() : 'Programming'} Challenge`;
      case 'error-correction':
        return 'Error Correction & Output Practice';
      case 'weak-drill':
        return `Targeted Drill: ${topic || 'Weak Topic'}`;
      case 'topic':
      default:
        return topic ? `${topic} Practice` : 'Topic Practice';
    }
  };

  const progressPercentage = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Session Header Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowExitConfirm(true)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer transition-colors"
            title="Exit Session"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base font-bold text-slate-900 leading-tight">
              {getModeTitle()}
            </h1>
            <span className="text-xs text-slate-500">
              One-Question-at-a-Time Interactive Mode
            </span>
          </div>
        </div>

        {/* Live Score Counter */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            {records.filter((r) => r.isCorrect).length * 10} pts
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
          <span>Progress</span>
          <span className="tabular-nums">
            {currentIndex + 1} of {questions.length} completed
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Active Question Card */}
      <QuestionCard
        key={currentQuestion.id}
        question={currentQuestion}
        currentIndex={currentIndex}
        totalQuestions={questions.length}
        onAnswerSubmitted={handleAnswerSubmitted}
        onNextQuestion={handleNextQuestion}
        isBookmarked={bookmarkedIds.includes(currentQuestion.id)}
        onToggleBookmark={handleBookmarkToggle}
        isLastQuestion={isLastQuestion}
        aiAvailable={aiAvailable}
      />

      {/* Exit Confirmation Dialog */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">Exit Practice Session?</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Your current progress in this session will not be completed. Are you sure you want to exit to the dashboard?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowExitConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Continue Practice
              </button>
              <button
                type="button"
                onClick={onExit}
                className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl cursor-pointer"
              >
                Yes, Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
