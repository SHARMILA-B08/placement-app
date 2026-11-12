import React from 'react';
import {
  ArrowLeft,
  Play,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { CategoryId, UserStats, PracticeMode } from '../types';
import { CATEGORIES, ALL_QUESTIONS } from '../data/questions';

interface CategoryBrowserProps {
  categoryId: CategoryId;
  stats: UserStats;
  onBackToDashboard: () => void;
  onStartTopicPractice: (category: CategoryId, topic: string) => void;
  onOpenAIGeneratorWithTopic: (category: CategoryId, topic: string) => void;
}

export const CategoryBrowser: React.FC<CategoryBrowserProps> = ({
  categoryId,
  stats,
  onBackToDashboard,
  onStartTopicPractice,
  onOpenAIGeneratorWithTopic,
}) => {
  const categoryMeta = CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0];
  const allCategoryQuestions = ALL_QUESTIONS.filter((q) => q.category === categoryId);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Category Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <button
            type="button"
            onClick={onBackToDashboard}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer transition-colors mt-0.5"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Placement Category
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              {categoryMeta.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              {categoryMeta.description}
            </p>
          </div>
        </div>

        {/* Category Stats Chip */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-800 text-xs font-bold tabular-nums">
            {allCategoryQuestions.length} Questions Available
          </div>
        </div>
      </div>

      {/* Topics List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-bold text-slate-900">
            Select a Topic to Start Practice
          </h2>
          <span className="text-xs text-slate-500">
            {categoryMeta.topics.length} topics in this category
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {categoryMeta.topics.map((topicName) => {
            const topicQuestions = allCategoryQuestions.filter(
              (q) => q.topic.toLowerCase() === topicName.toLowerCase()
            );
            const count = topicQuestions.length;
            const topicStat = stats.topicStats[topicName];
            const attempted = topicStat?.attempted || 0;
            const correct = topicStat?.correct || 0;
            const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : null;

            return (
              <div
                key={topicName}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-xs transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-sm">{topicName}</h3>
                    <span className="text-xs text-slate-500 font-mono">
                      {count} {count === 1 ? 'Question' : 'Questions'}
                    </span>
                  </div>

                  {/* Accuracy badge if attempted */}
                  <div className="text-xs text-slate-500 pt-1">
                    {attempted > 0 ? (
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        {accuracy !== null && accuracy >= 70 ? (
                          <span className="text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {accuracy}% Accuracy ({correct}/{attempted})
                          </span>
                        ) : (
                          <span className="text-amber-700 flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            {accuracy}% Accuracy ({correct}/{attempted})
                          </span>
                        )}
                      </span>
                    ) : (
                      <span className="text-slate-400">Not attempted yet</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onOpenAIGeneratorWithTopic(categoryId, topicName)}
                    className="text-xs font-semibold text-purple-600 hover:text-purple-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3" />
                    AI Questions
                  </button>

                  <button
                    type="button"
                    onClick={() => onStartTopicPractice(categoryId, topicName)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    Practice Topic
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
