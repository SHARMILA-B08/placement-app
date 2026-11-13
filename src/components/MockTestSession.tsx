import React, { useState, useEffect } from 'react';
import {
  Clock,
  CheckCircle2,
  Bookmark,
  AlertCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Code2,
  Send
} from 'lucide-react';
import { Question, PracticeSessionResult, UserAnswerRecord } from '../types';
import { recordSessionCompletion } from '../utils/storage';

interface MockTestSessionProps {
  questions: Question[];
  onComplete: (result: PracticeSessionResult) => void;
  onExit: () => void;
}

type QuestionStatus = 'not_visited' | 'not_answered' | 'answered' | 'marked_review';

export const MockTestSession: React.FC<MockTestSessionProps> = ({
  questions,
  onComplete,
  onExit,
}) => {
  const TOTAL_TIME_SEC = 30 * 60; // 30 minutes
  const [secondsRemaining, setSecondsRemaining] = useState<number>(TOTAL_TIME_SEC);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // User selections: questionId -> selectedOption (-1 if unanswered)
  const [answers, setAnswers] = useState<Record<string, number>>({});
  // Question statuses: questionId -> QuestionStatus
  const [statuses, setStatuses] = useState<Record<string, QuestionStatus>>(() => {
    const init: Record<string, QuestionStatus> = {};
    questions.forEach((q, idx) => {
      init[q.id] = idx === 0 ? 'not_answered' : 'not_visited';
    });
    return init;
  });

  // Time spent per question
  const [timePerQuestion, setTimePerQuestion] = useState<Record<string, number>>({});

  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [sessionStartTime] = useState<string>(new Date().toISOString());

  // 30-minute Exam Countdown Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });

      // Track time on active question
      const currentQId = questions[currentIndex]?.id;
      if (currentQId) {
        setTimePerQuestion((prev) => ({
          ...prev,
          [currentQId]: (prev[currentQId] || 0) + 1,
        }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex, questions]);

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentQuestion.id] ?? -1;

  const handleSelectOption = (optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));

    // Update status to answered unless marked for review
    if (statuses[currentQuestion.id] !== 'marked_review') {
      setStatuses((prev) => ({
        ...prev,
        [currentQuestion.id]: 'answered',
      }));
    }
  };

  const handleClearResponse = () => {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[currentQuestion.id];
      return next;
    });
    setStatuses((prev) => ({
      ...prev,
      [currentQuestion.id]: 'not_answered',
    }));
  };

  const handleToggleMarkReview = () => {
    setStatuses((prev) => ({
      ...prev,
      [currentQuestion.id]:
        prev[currentQuestion.id] === 'marked_review'
          ? currentAnswer !== -1
            ? 'answered'
            : 'not_answered'
          : 'marked_review',
    }));
  };

  const handleNavigateTo = (index: number) => {
    if (index < 0 || index >= questions.length) return;

    // Mark current question as not_answered if visited without answering
    if (statuses[currentQuestion.id] === 'not_visited' && currentAnswer === -1) {
      setStatuses((prev) => ({ ...prev, [currentQuestion.id]: 'not_answered' }));
    }

    // Set target question as visited if not visited
    const targetQ = questions[index];
    if (statuses[targetQ.id] === 'not_visited') {
      setStatuses((prev) => ({ ...prev, [targetQ.id]: 'not_answered' }));
    }

    setCurrentIndex(index);
  };

  const handleSaveAndNext = () => {
    if (currentIndex < questions.length - 1) {
      handleNavigateTo(currentIndex + 1);
    }
  };

  const handleFinalSubmit = () => {
    const completedAt = new Date().toISOString();
    const totalTimeSpent = TOTAL_TIME_SEC - secondsRemaining;

    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;

    const records: UserAnswerRecord[] = questions.map((q) => {
      const userSel = answers[q.id] ?? -1;
      const isCorrect = userSel === q.correctAnswer;
      const spent = timePerQuestion[q.id] || 0;

      if (userSel === -1) {
        unansweredCount += 1;
      } else if (isCorrect) {
        correctCount += 1;
      } else {
        wrongCount += 1;
      }

      return {
        questionId: q.id,
        question: q,
        selectedOption: userSel,
        isCorrect,
        timeSpentSec: spent,
      };
    });

    const accuracy = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
    const pointsEarned = correctCount * 10;
    const averageTimeSec = questions.length > 0 ? Math.round(totalTimeSpent / questions.length) : 0;

    const result: PracticeSessionResult = {
      sessionId: `mock-${Date.now()}`,
      mode: 'mock',
      startedAt: sessionStartTime,
      completedAt,
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      wrongAnswers: wrongCount,
      unanswered: unansweredCount,
      accuracy,
      totalTimeSec: totalTimeSpent,
      averageTimeSec,
      pointsEarned,
      records,
    };

    recordSessionCompletion(result);
    onComplete(result);
  };

  // Format MM:SS
  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Counts for summary
  const answeredCount = Object.keys(answers).length;
  const markedReviewCount = Object.values(statuses).filter((s) => s === 'marked_review').length;
  const notAnsweredCount = questions.length - answeredCount;

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Mock Exam Top Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            Smart Placement Mock Test (30 Minutes / 30 Questions)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Exam simulation mode. Full solutions will be unlocked upon final submission.
          </p>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          {/* 30:00 Countdown Timer */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono font-bold text-xs sm:text-sm tabular-nums ${
              secondsRemaining < 300
                ? 'bg-rose-50 border-rose-200 text-rose-700 animate-pulse'
                : 'bg-indigo-50 border-indigo-200 text-indigo-900'
            }`}
          >
            <Clock className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Time Left: {formatTimer(secondsRemaining)}</span>
          </div>

          {/* Submit Test Button */}
          <button
            type="button"
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 whitespace-nowrap"
          >
            <Send className="w-3.5 h-3.5" />
            Submit Test
          </button>
        </div>
      </div>

      {/* Main Grid: Question View (Left 8 cols) & Question Palette (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
        {/* Left Column: Active Question */}
        <div className="lg:col-span-8 min-w-0 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Question Header */}
          <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 bg-slate-50/70 flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0">
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-800 whitespace-nowrap">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-slate-500 min-w-0">
                <span className="font-semibold text-slate-800 capitalize whitespace-nowrap">{currentQuestion.category}</span>
                <span aria-hidden="true">·</span>
                <span className="truncate">{currentQuestion.topic}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleToggleMarkReview}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border cursor-pointer transition-colors shrink-0 ${
                statuses[currentQuestion.id] === 'marked_review'
                  ? 'bg-purple-100 border-purple-300 text-purple-800'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${statuses[currentQuestion.id] === 'marked_review' ? 'fill-purple-600' : ''}`} />
              <span>{statuses[currentQuestion.id] === 'marked_review' ? 'Marked for Review' : 'Mark for Review'}</span>
            </button>
          </div>

          {/* Question Body */}
          <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug break-words">
              {currentQuestion.questionText}
            </h2>

            {/* Code Snippet */}
            {currentQuestion.codeSnippet && (
              <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 overflow-x-auto text-slate-100 text-xs sm:text-sm font-mono leading-relaxed">
                <div className="flex items-center justify-between text-slate-400 pb-2 mb-2 border-b border-slate-800 text-xs">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                    Code Snippet
                  </span>
                  <span className="uppercase text-[10px]">{currentQuestion.category}</span>
                </div>
                <pre className="whitespace-pre overflow-x-auto">{currentQuestion.codeSnippet}</pre>
              </div>
            )}

            {/* Options */}
            <div className="space-y-3 pt-1">
              {currentQuestion.options.map((opt, idx) => {
                const isSelected = currentAnswer === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-3.5 sm:p-4 rounded-xl border text-left flex items-start gap-3 transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-2 ring-indigo-600/20'
                        : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {optionLetters[idx]}
                    </span>
                    <span className="flex-1 min-w-0 pt-0.5 text-sm sm:text-base font-medium break-words">
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Question Actions */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={() => handleNavigateTo(currentIndex - 1)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <button
                  type="button"
                  disabled={currentAnswer === -1}
                  onClick={handleClearResponse}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Clear Response
                </button>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                {currentIndex < questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleSaveAndNext}
                    className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer flex items-center gap-1"
                  >
                    Save & Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(true)}
                    className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 cursor-pointer flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Finish & Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Question Palette Navigation */}
        <div className="lg:col-span-4 min-w-0 bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-4 lg:sticky lg:top-20">
          <div>
            <h3 className="font-bold text-sm text-slate-900">Question Palette</h3>
            <p className="text-xs text-slate-500">Click any number to jump to question</p>
          </div>

          {/* Status Legends */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-sm bg-emerald-500" />
              <span className="text-slate-600">Answered ({answeredCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-sm bg-rose-500" />
              <span className="text-slate-600">Not Answered ({notAnsweredCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-sm bg-purple-500" />
              <span className="text-slate-600">Marked Review ({markedReviewCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-sm bg-slate-200" />
              <span className="text-slate-600">Not Visited</span>
            </div>
          </div>

          {/* Palette Grid (1..30) */}
          <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 pt-2">
            {questions.map((q, idx) => {
              const status = statuses[q.id];
              const isCurrent = currentIndex === idx;
              const hasAns = answers[q.id] !== undefined;

              let btnStyle = 'bg-slate-100 text-slate-700 border-slate-200';
              if (status === 'marked_review') {
                btnStyle = 'bg-purple-600 text-white border-purple-600';
              } else if (hasAns) {
                btnStyle = 'bg-emerald-600 text-white border-emerald-600';
              } else if (status === 'not_answered') {
                btnStyle = 'bg-rose-500 text-white border-rose-500';
              }

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => handleNavigateTo(idx)}
                  className={`h-9 rounded-lg border text-xs font-bold tabular-nums flex items-center justify-center cursor-pointer transition-all ${btnStyle} ${
                    isCurrent ? 'ring-2 ring-indigo-600 ring-offset-2' : ''
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Submit Test Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">Confirm Exam Submission</h3>
            <p className="text-xs text-slate-600">
              Please review your question status before submitting. Once submitted, your score will be calculated and answers will be available for review.
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-600">Total Questions:</span>
                <span className="font-bold text-slate-900">{questions.length}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-emerald-700 font-medium">Answered:</span>
                <span className="font-bold text-emerald-700">{answeredCount}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-rose-700 font-medium">Not Answered:</span>
                <span className="font-bold text-rose-700">{notAnsweredCount}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-purple-700 font-medium">Marked for Review:</span>
                <span className="font-bold text-purple-700">{markedReviewCount}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-600">Time Remaining:</span>
                <span className="font-bold font-mono text-indigo-700">
                  {formatTimer(secondsRemaining)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Return to Exam
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm cursor-pointer"
              >
                Submit Exam Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
