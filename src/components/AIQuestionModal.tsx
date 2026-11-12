import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Play,
  AlertCircle,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { CategoryId, Difficulty, Question, PracticeMode } from '../types';
import { CATEGORIES, getQuestionsByCategory, shuffleArray } from '../data/questions';
import { generateAIQuestions } from '../services/geminiService';

interface AIQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGeneratedSession: (questions: Question[], topic: string, category: CategoryId) => void;
  initialCategory?: CategoryId;
  initialTopic?: string;
  aiAvailable?: boolean;
}

export const AIQuestionModal: React.FC<AIQuestionModalProps> = ({
  isOpen,
  onClose,
  onStartGeneratedSession,
  initialCategory = 'aptitude',
  initialTopic,
  aiAvailable = true,
}) => {
  const [category, setCategory] = useState<CategoryId>(initialCategory);
  const [topic, setTopic] = useState<string>(
    initialTopic || CATEGORIES.find((c) => c.id === initialCategory)?.topics[0] || 'Percentages'
  );
  const [difficulty, setDifficulty] = useState<Difficulty>('Easy');
  const [count, setCount] = useState<number>(3);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentCategoryMeta = CATEGORIES.find((c) => c.id === category) || CATEGORIES[0];

  const handleCategoryChange = (newCat: CategoryId) => {
    setCategory(newCat);
    const meta = CATEGORIES.find((c) => c.id === newCat);
    if (meta && meta.topics.length > 0) {
      setTopic(meta.topics[0]);
    }
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setStatusMessage('Generating placement questions with Gemini AI...');

    const result = await generateAIQuestions(category, topic, count, difficulty);

    if (result.questions && result.questions.length > 0) {
      setIsLoading(false);
      onClose();
      onStartGeneratedSession(result.questions, topic, category);
    } else {
      // Graceful offline fallback
      setStatusMessage('AI server not reachable; seamlessly loading verified questions from local bank...');
      setTimeout(() => {
        const pool = getQuestionsByCategory(category);
        const topicFiltered = pool.filter((q) => q.topic.toLowerCase() === topic.toLowerCase());
        const finalPool = topicFiltered.length >= count ? topicFiltered : pool;
        const selected = shuffleArray(finalPool).slice(0, count);

        setIsLoading(false);
        onClose();
        onStartGeneratedSession(selected, topic, category);
      }, 700);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-6 shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Dynamic Question Generator
              </h2>
              <p className="text-xs text-slate-500">
                Powered by Google Gemini 3.8 Flash with verified fallback
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Controls */}
        <div className="space-y-4 text-xs sm:text-sm">
          {/* Category Select */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block">Category</label>
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value as CategoryId)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Topic Select */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block">Topic</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm"
            >
              {currentCategoryMeta.topics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty & Count Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-900 text-xs sm:text-sm"
              >
                <option value="Easy">Easy (Under 40s)</option>
                <option value="Medium">Medium (Under 60s)</option>
                <option value="Hard">Hard (Placement Tier)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">Number of Questions</label>
              <select
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-900 text-xs sm:text-sm"
              >
                <option value={3}>3 Questions (Quick Drill)</option>
                <option value={5}>5 Questions (Standard)</option>
                <option value={10}>10 Questions (Sprint)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading Indicator or Info */}
        {isLoading ? (
          <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-950 flex items-center gap-3 text-xs">
            <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin shrink-0" />
            <span>{statusMessage || 'Connecting to Gemini AI...'}</span>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs flex items-start gap-2">
            <Cpu className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <p>
              Generates fresh, beginner-friendly questions solvable in 60s with 4 options and detailed explanations.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isLoading}
            className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2 active:scale-95 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            Generate & Start Practice
          </button>
        </div>
      </div>
    </div>
  );
};
