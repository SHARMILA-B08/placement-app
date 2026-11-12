import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Lightbulb,
  Clock,
  Sparkles,
  Code2,
  Zap,
  Filter
} from 'lucide-react';
import { PracticeSessionResult, UserAnswerRecord } from '../types';
import { requestAIDetailedExplanation } from '../services/geminiService';

interface ReviewAnswersViewProps {
  result: PracticeSessionResult;
  onBackToResults: () => void;
  onGoHome: () => void;
  aiAvailable?: boolean;
}

export const ReviewAnswersView: React.FC<ReviewAnswersViewProps> = ({
  result,
  onBackToResults,
  onGoHome,
  aiAvailable = false,
}) => {
  const [filter, setFilter] = useState<'all' | 'correct' | 'wrong' | 'unanswered'>('all');
  const [expandedAiExplanations, setExpandedAiExplanations] = useState<Record<string, string>>({});
  const [loadingAiIds, setLoadingAiIds] = useState<Record<string, boolean>>({});

  const filteredRecords = result.records.filter((rec) => {
    if (filter === 'correct') return rec.isCorrect;
    if (filter === 'wrong') return !rec.isCorrect && rec.selectedOption !== -1;
    if (filter === 'unanswered') return rec.selectedOption === -1;
    return true;
  });

  const optionLetters = ['A', 'B', 'C', 'D'];

  const handleRequestAI = async (record: UserAnswerRecord) => {
    const qId = record.question.id;
    if (expandedAiExplanations[qId] || loadingAiIds[qId]) return;

    setLoadingAiIds((prev) => ({ ...prev, [qId]: true }));
    const explanation = await requestAIDetailedExplanation({
      questionText: record.question.questionText,
      codeSnippet: record.question.codeSnippet,
      selectedOptionText:
        record.selectedOption !== -1 ? record.question.options[record.selectedOption] : 'Unanswered',
      correctOptionText: record.question.options[record.question.correctAnswer],
      category: record.question.category,
      topic: record.question.topic,
    });

    setExpandedAiExplanations((prev) => ({
      ...prev,
      [qId]: explanation || 'AI explanation currently unavailable.',
    }));
    setLoadingAiIds((prev) => ({ ...prev, [qId]: false }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToResults}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer transition-colors"
            title="Back to Results Summary"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900">
              Review Answers & Solutions
            </h1>
            <p className="text-xs text-slate-500">
              Detailed step-by-step walkthroughs, verified answers, and shortcuts
            </p>
          </div>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-medium">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-white text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({result.records.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('correct')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filter === 'correct'
                ? 'bg-white text-emerald-700 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Correct ({result.correctAnswers})
          </button>
          <button
            type="button"
            onClick={() => setFilter('wrong')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filter === 'wrong'
                ? 'bg-white text-rose-700 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Wrong ({result.wrongAnswers})
          </button>
          {result.unanswered > 0 && (
            <button
              type="button"
              onClick={() => setFilter('unanswered')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                filter === 'unanswered'
                  ? 'bg-white text-slate-800 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Skipped ({result.unanswered})
            </button>
          )}
        </div>
      </div>

      {/* Questions Review List */}
      <div className="space-y-4">
        {filteredRecords.map((record, index) => {
          const q = record.question;
          const isUserCorrect = record.isCorrect;
          const isUserUnanswered = record.selectedOption === -1;
          const aiText = expandedAiExplanations[q.id];
          const isAiLoading = loadingAiIds[q.id];

          return (
            <div
              key={q.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all"
            >
              {/* Question Card Header */}
              <div className="px-6 py-3.5 bg-slate-50/70 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-200 text-slate-800">
                    #{index + 1}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="font-semibold capitalize">{q.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{q.topic}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-xs text-slate-500 font-mono">
                    <Clock className="w-3 h-3" />
                    {record.timeSpentSec}s
                  </span>
                  {isUserCorrect ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Correct (+10 pts)
                    </span>
                  ) : isUserUnanswered ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                      <HelpCircle className="w-3.5 h-3.5" />
                      Unanswered
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                      <XCircle className="w-3.5 h-3.5" />
                      Wrong
                    </span>
                  )}
                </div>
              </div>

              {/* Question Details */}
              <div className="p-6 space-y-4">
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {q.questionText}
                </h3>

                {/* Code Snippet */}
                {q.codeSnippet && (
                  <div className="rounded-xl bg-slate-900 p-4 text-xs font-mono text-slate-100 overflow-x-auto shadow-inner">
                    <div className="flex items-center justify-between text-slate-400 pb-2 mb-2 border-b border-slate-800 text-[11px]">
                      <span className="flex items-center gap-1">
                        <Code2 className="w-3 h-3 text-indigo-400" />
                        Code Reference
                      </span>
                      <span className="uppercase">{q.category}</span>
                    </div>
                    <pre className="whitespace-pre overflow-x-auto">{q.codeSnippet}</pre>
                  </div>
                )}

                {/* 4 Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((optText, optIdx) => {
                    const isSelected = record.selectedOption === optIdx;
                    const isCorrectOpt = q.correctAnswer === optIdx;

                    let optStyle = 'border-slate-200 bg-slate-50/50 text-slate-700';
                    if (isCorrectOpt) {
                      optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-500/30';
                    } else if (isSelected && !isCorrectOpt) {
                      optStyle = 'border-rose-500 bg-rose-50 text-rose-950 font-medium ring-1 ring-rose-500/30';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs sm:text-sm ${optStyle}`}
                      >
                        <span
                          className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[11px] shrink-0 ${
                            isCorrectOpt
                              ? 'bg-emerald-600 text-white'
                              : isSelected
                              ? 'bg-rose-600 text-white'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {optionLetters[optIdx]}
                        </span>
                        <div className="flex-1 break-words">
                          {optText}
                          {isCorrectOpt && (
                            <span className="block text-[11px] text-emerald-700 font-bold mt-0.5">
                              ✓ Correct Answer
                            </span>
                          )}
                          {isSelected && !isCorrectOpt && (
                            <span className="block text-[11px] text-rose-700 font-bold mt-0.5">
                              ✗ Your Selection
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                    <Lightbulb className="w-3.5 h-3.5 text-indigo-600" />
                    Explanation & Solution
                  </div>

                  <p className="whitespace-pre-line text-slate-700 leading-relaxed text-xs sm:text-sm font-normal">
                    {q.explanation}
                  </p>

                  {/* Why selected was wrong (if user picked wrong) */}
                  {!isUserCorrect && !isUserUnanswered && q.whyWrong && (
                    <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 space-y-1">
                      <span className="font-bold text-rose-800">Why common trap occurred:</span>
                      <p>{q.whyWrong}</p>
                    </div>
                  )}

                  {/* Shortcut Tip */}
                  {q.shortcutTip && (
                    <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2">
                      <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-950">Placement Tip: </span>
                        <span>{q.shortcutTip}</span>
                      </div>
                    </div>
                  )}

                  {/* AI On-Demand Walkthrough */}
                  <div className="pt-2 border-t border-slate-200">
                    {!aiText ? (
                      <button
                        type="button"
                        onClick={() => handleRequestAI(record)}
                        disabled={isAiLoading}
                        className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer disabled:opacity-50"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        {isAiLoading ? 'Analyzing with AI...' : 'Ask AI for Deeper Explanation'}
                      </button>
                    ) : (
                      <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-950 space-y-1">
                        <span className="font-bold text-indigo-900 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-indigo-600" />
                          AI Detailed Breakdown:
                        </span>
                        <div className="whitespace-pre-line leading-relaxed text-slate-700">
                          {aiText}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Floating Bar */}
      <div className="sticky bottom-4 z-20 p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-lg flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToResults}
          className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl cursor-pointer"
        >
          Back to Results
        </button>
        <button
          type="button"
          onClick={onGoHome}
          className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl cursor-pointer shadow-sm"
        >
          Finish Review & Go to Dashboard
        </button>
      </div>
    </div>
  );
};
