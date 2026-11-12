import React, { useState, useEffect } from 'react';
import {
  Clock,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
  Bookmark,
  Sparkles,
  HelpCircle,
  Code2,
  Zap,
  Info
} from 'lucide-react';
import { Question } from '../types';
import { requestAIDetailedExplanation } from '../services/geminiService';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswerSubmitted: (selectedOption: number, timeSpentSec: number) => void;
  onNextQuestion: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  isLastQuestion: boolean;
  aiAvailable?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  onAnswerSubmitted,
  onNextQuestion,
  isBookmarked,
  onToggleBookmark,
  isLastQuestion,
  aiAvailable = false,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(60);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);

  // Reset state on question change
  useEffect(() => {
    setSelectedOption(null);
    setIsSubmitted(false);
    setSecondsRemaining(60);
    setTimeSpent(0);
    setAiExplanation(null);
    setIsAiLoading(false);
  }, [question.id]);

  // Question Timer (60s countdown)
  useEffect(() => {
    if (isSubmitted) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          // Timer reached 0: If an option is selected, auto-submit; else keep at 0
          return 0;
        }
        return prev - 1;
      });
      setTimeSpent((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isSubmitted, question.id]);

  const handleSubmit = () => {
    if (selectedOption === null || isSubmitted) return;
    setIsSubmitted(true);
    onAnswerSubmitted(selectedOption, timeSpent);
  };

  const handleAskAI = async () => {
    if (isAiLoading || aiExplanation) return;
    setIsAiLoading(true);
    const result = await requestAIDetailedExplanation({
      questionText: question.questionText,
      codeSnippet: question.codeSnippet,
      selectedOptionText: selectedOption !== null ? question.options[selectedOption] : 'None',
      correctOptionText: question.options[question.correctAnswer],
      category: question.category,
      topic: question.topic,
    });
    setAiExplanation(result || 'AI explanation is currently unavailable.');
    setIsAiLoading(false);
  };

  const optionLetters = ['A', 'B', 'C', 'D'];
  const isCorrect = isSubmitted && selectedOption === question.correctAnswer;
  const isWrong = isSubmitted && selectedOption !== null && selectedOption !== question.correctAnswer;

  // Timer color indicator
  const getTimerColorClass = () => {
    if (secondsRemaining > 30) return 'text-slate-600 bg-slate-100 border-slate-200';
    if (secondsRemaining > 10) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-rose-700 bg-rose-50 border-rose-200 animate-pulse';
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff.toLowerCase()) {
      case 'easy':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'medium':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'hard':
        return 'text-purple-700 bg-purple-50 border-purple-200';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all">
      {/* Top Header: Progress, Category/Topic, Difficulty & 60s Timer */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-800">
            Q {currentIndex + 1} of {totalQuestions}
          </span>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-800 capitalize">{question.category}</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-600">{question.topic}</span>
          </div>
          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getDifficultyBadge(
              question.difficulty
            )}`}
          >
            {question.difficulty}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* 60s Countdown Timer */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border font-mono text-xs font-semibold tabular-nums transition-colors ${getTimerColorClass()}`}
            title="Question Timer (Target: Under 60s)"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>00:{secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining}</span>
          </div>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={onToggleBookmark}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark this question'}
            className={`p-1.5 rounded-lg border cursor-pointer transition-colors ${
              isBookmarked
                ? 'bg-amber-50 border-amber-300 text-amber-600'
                : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 space-y-6">
        {/* Question Text */}
        <div className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            {question.questionText}
          </h2>

          {/* Code Snippet Box (if present) */}
          {question.codeSnippet && (
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 overflow-x-auto shadow-inner text-slate-100 text-xs sm:text-sm font-mono leading-relaxed">
              <div className="flex items-center justify-between text-slate-400 pb-2 mb-2 border-b border-slate-800 text-xs">
                <span className="flex items-center gap-1.5 font-medium">
                  <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                  Code Reference
                </span>
                <span className="uppercase text-[10px] tracking-wider text-slate-400">
                  {question.category}
                </span>
              </div>
              <pre className="whitespace-pre overflow-x-auto">{question.codeSnippet}</pre>
            </div>
          )}
        </div>

        {/* 4 Clickable Answer Options A, B, C, D */}
        <div className="grid grid-cols-1 gap-3 pt-2">
          {question.options.map((optionText, idx) => {
            const letter = optionLetters[idx];
            const isSelected = selectedOption === idx;
            const isThisCorrect = isSubmitted && idx === question.correctAnswer;
            const isThisWrongSelected = isSubmitted && isSelected && !isThisCorrect;

            let buttonStyle =
              'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50/80 text-slate-800';

            if (isSubmitted) {
              if (isThisCorrect) {
                // Correct answer in GREEN
                buttonStyle =
                  'border-emerald-500 bg-emerald-50/90 text-emerald-950 ring-2 ring-emerald-500/30';
              } else if (isThisWrongSelected) {
                // User's wrong selection in RED
                buttonStyle =
                  'border-rose-500 bg-rose-50/90 text-rose-950 ring-2 ring-rose-500/30';
              } else {
                // Other unselected options
                buttonStyle = 'border-slate-200 bg-slate-50/60 text-slate-400 opacity-60';
              }
            } else if (isSelected) {
              // Active selection before submission
              buttonStyle =
                'border-indigo-600 bg-indigo-50/60 text-indigo-950 ring-2 ring-indigo-600/20';
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={isSubmitted}
                onClick={() => setSelectedOption(idx)}
                className={`w-full p-4 rounded-xl border text-left flex items-start gap-3 transition-all duration-150 cursor-pointer disabled:cursor-default ${buttonStyle}`}
              >
                {/* Option Letter Indicator */}
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                    isSubmitted && isThisCorrect
                      ? 'bg-emerald-600 text-white'
                      : isSubmitted && isThisWrongSelected
                      ? 'bg-rose-600 text-white'
                      : isSelected
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {letter}
                </span>

                <div className="flex-1 pt-0.5 text-sm sm:text-base font-medium break-words">
                  {optionText}
                </div>

                {/* State Icons */}
                {isSubmitted && isThisCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                )}
                {isSubmitted && isThisWrongSelected && (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Action Button: Submit Answer (before submission) */}
        {!isSubmitted && (
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <span className="text-xs text-slate-500">
              {selectedOption === null
                ? 'Select an option above to submit'
                : `Option ${optionLetters[selectedOption]} selected`}
            </span>
            <button
              type="button"
              disabled={selectedOption === null}
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed shadow-sm transition-all cursor-pointer active:scale-95"
            >
              Submit Answer
            </button>
          </div>
        )}

        {/* POST-SUBMISSION DETAILED EXPLANATION PANEL */}
        {isSubmitted && (
          <div className="space-y-5 pt-4 border-t border-slate-100">
            {/* Outcome Status Banner */}
            {isCorrect ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base">Correct Answer!</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-800">
                      +10 Points Awarded
                    </span>
                  </div>
                  <p className="text-xs text-emerald-700">
                    Great job! You solved this question in {timeSpent} seconds.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-3">
                <XCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-base">Incorrect Answer!</span>
                  <p className="text-xs text-rose-700">
                    The correct answer is{' '}
                    <strong className="font-semibold text-rose-900">
                      Option {optionLetters[question.correctAnswer]}: {question.options[question.correctAnswer]}
                    </strong>
                    . No points were deducted.
                  </p>
                </div>
              </div>
            )}

            {/* Step-by-Step Educational Solution */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                  <Info className="w-4 h-4 text-indigo-600" />
                  Step-by-Step Explanation
                </span>
                <span className="text-xs text-slate-500">
                  Estimated Solving Time: ~{question.estimatedTimeSec}s
                </span>
              </div>

              {/* Specific Rationale for Wrong Choice */}
              {isWrong && question.whyWrong && (
                <div className="p-3 rounded-lg bg-rose-50/70 border border-rose-100 text-xs text-rose-900 space-y-1">
                  <span className="font-bold text-rose-800">Common Pitfall / Why Option {selectedOption !== null ? optionLetters[selectedOption] : ''} Was Selected:</span>
                  <p className="leading-relaxed">{question.whyWrong}</p>
                </div>
              )}

              {/* Main Step-by-Step Solution */}
              <div className="text-sm text-slate-800 whitespace-pre-line leading-relaxed font-normal">
                {question.explanation}
              </div>

              {/* Shortcut Tip / Concept Rule */}
              {question.shortcutTip && (
                <div className="p-3 rounded-lg bg-amber-50/80 border border-amber-200/80 text-amber-900 flex items-start gap-2.5">
                  <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <span className="font-bold text-amber-950">Placement Shortcut / Rule:</span>
                    <p className="leading-relaxed">{question.shortcutTip}</p>
                  </div>
                </div>
              )}

              {/* Optional On-Demand Gemini Deep Dive */}
              <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
                {!aiExplanation ? (
                  <button
                    type="button"
                    onClick={handleAskAI}
                    disabled={isAiLoading}
                    className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    {isAiLoading ? 'Analyzing question with AI...' : 'Ask AI for Deeper Walkthrough'}
                  </button>
                ) : (
                  <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-950 space-y-2">
                    <div className="flex items-center gap-1.5 font-bold text-indigo-900">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      AI Mentor Detailed Explanation
                    </div>
                    <div className="whitespace-pre-line leading-relaxed text-slate-700">
                      {aiExplanation}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Next Question Navigation */}
            <div className="flex items-center justify-end pt-2">
              <button
                type="button"
                onClick={onNextQuestion}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md flex items-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <span>{isLastQuestion ? 'Complete Practice & View Results' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
