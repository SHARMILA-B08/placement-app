import React, { useState } from 'react';
import {
  BookOpen,
  AlertTriangle,
  Play,
  Sparkles,
  Zap,
  HelpCircle,
  CheckCircle2,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { UserStats, CategoryId } from '../types';
import { fetchTopicRevisionGuide } from '../services/geminiService';
import { CATEGORIES } from '../data/questions';

interface RevisionViewProps {
  stats: UserStats;
  onStartDrill: (category: CategoryId, topic: string) => void;
  aiAvailable?: boolean;
}

// Built-in educational concept notes for all major placement topics
const CONCEPT_SUMMARIES: Record<string, { summary: string; rules: string[]; example: string; tip: string }> = {
  'Percentages': {
    summary: 'A percentage represents parts per hundred. 20% means 20 out of every 100 (fraction 1/5).',
    rules: [
      'To find x% of N: multiply N by (x / 100).',
      'When something increases by x% and then decreases by x%, net change is always a decrease of (x²/100)%.',
      'Fraction shortcuts: 50% = 1/2, 25% = 1/4, 20% = 1/5, 12.5% = 1/8.'
    ],
    example: 'Question: What is 15% of 60? Solution: 10% of 60 is 6. 5% is 3. Total = 6 + 3 = 9.',
    tip: 'Break percentages into 10% and 5% chunks to calculate instantly in your head.'
  },
  'Profit and Loss': {
    summary: 'Profit is earned when Selling Price (SP) > Cost Price (CP). Loss happens when SP < CP.',
    rules: [
      'Profit = SP - CP; Loss = CP - SP.',
      'Profit% or Loss% is ALWAYS calculated on Cost Price (CP) by default.',
      'Profit% = (Profit / CP) * 100.'
    ],
    example: 'Bought for $40, sold for $50. Profit = 10. Profit% = (10 / 40) * 100 = 25%.',
    tip: 'Never divide by Selling Price when computing profit percentage!'
  },
  'Time and Work': {
    summary: 'Work rate is the reciprocal of the time taken. If A takes 10 days, A does 1/10th of the work per day.',
    rules: [
      'Combined 1-day work = (1/A) + (1/B).',
      'Combined days formula for two people: (A * B) / (A + B).',
      'If A is twice as efficient as B, A takes half the days of B.'
    ],
    example: 'A takes 6 days, B takes 12 days. Combined = (6 * 12) / (6 + 12) = 72 / 18 = 4 days.',
    tip: 'Combined time must ALWAYS be less than the fastest individual worker alone.'
  },
  'Time, Speed and Distance': {
    summary: 'Speed is distance divided by time. Distance = Speed * Time.',
    rules: [
      'To convert km/h to m/s: multiply by 5/18.',
      'To convert m/s to km/h: multiply by 18/5.',
      'When two trains or objects move in opposite directions, ADD their speeds.'
    ],
    example: 'Convert 72 km/h to m/s: 72 * (5/18) = 4 * 5 = 20 m/s.',
    tip: 'Opposite directions -> Add speeds. Same direction -> Subtract speeds.'
  },
  'Problems on Ages': {
    summary: 'The age difference between two people remains constant forever.',
    rules: [
      'If ages are in ratio a:b, write them as ax and bx.',
      'In n years, their ages become (ax + n) and (bx + n).',
      'Testing options directly is often twice as fast as writing equations.'
    ],
    example: 'Father is 4x as old as son. If son is 10, father is 40. In 20 years, son is 30, father is 60 (twice).',
    tip: 'Plug in the middle option to eliminate two choices immediately.'
  },
  'Number Series': {
    summary: 'Number series follow difference patterns: constant addition, doubling steps, alternating signs, or squares/cubes.',
    rules: [
      'Step 1: Write the difference between adjacent terms.',
      'Step 2: If differences aren\'t obvious, check differences of differences.',
      'Look out for n² ± 1 and n³ ± 1 patterns.'
    ],
    example: 'Series: 2, 5, 10, 17, 26 -> Differences are +3, +5, +7, +9. Next is +11 (37).',
    tip: 'If numbers oscillate up and down, check odd and even index sub-series.'
  },
  'Pointers': {
    summary: 'A pointer is simply a variable that holds the memory address of another variable.',
    rules: [
      '& operator gives the memory address of a variable.',
      '* operator dereferences the pointer to read or write the value at that address.',
      'Uninitialized pointers (wild pointers) cause segmentation faults.'
    ],
    example: 'int x = 10; int *p = &x; *p = 20; now x is 20.',
    tip: 'Always initialize pointers to NULL or a valid address.'
  },
  'Inheritance Basics': {
    summary: 'Inheritance allows a child class to inherit fields and methods from a parent class for code reuse.',
    rules: [
      'Java uses "extends" for classes and "implements" for interfaces.',
      'C++ uses class Derived : public Base.',
      'Constructors of parent class are called first before child constructors.'
    ],
    example: 'class Dog extends Animal { void bark() {} } Dog gets all non-private Animal methods.',
    tip: 'Java does not allow extending multiple classes; use interfaces instead.'
  }
};

export const RevisionView: React.FC<RevisionViewProps> = ({
  stats,
  onStartDrill,
  aiAvailable = false,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('Percentages');
  const [aiGuide, setAiGuide] = useState<{
    summary?: string;
    coreRules?: string[];
    example?: string;
    proTip?: string;
  } | null>(null);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  // Identify weak topics from stats: attempted >= 2 and accuracy < 70%
  const identifiedWeakTopics = Object.values(stats.topicStats)
    .filter((t) => t.attempted >= 2 && (t.correct / t.attempted) < 0.7)
    .sort((a, b) => (a.correct / a.attempted) - (b.correct / b.attempted));

  // Determine category for selected topic
  const getTopicCategory = (topic: string): CategoryId => {
    for (const cat of CATEGORIES) {
      if (cat.topics.some((t) => t.toLowerCase() === topic.toLowerCase())) {
        return cat.id;
      }
    }
    return 'aptitude';
  };

  const handleFetchAiGuide = async (topic: string) => {
    setIsAiLoading(true);
    const cat = getTopicCategory(topic);
    const result = await fetchTopicRevisionGuide(topic, cat);
    setAiGuide(result);
    setIsAiLoading(false);
  };

  const activeSummary = CONCEPT_SUMMARIES[selectedTopic] || {
    summary: `Fundamental placement concepts and problem-solving techniques for ${selectedTopic}.`,
    rules: [
      'Understand the problem requirements before writing formulas.',
      'Eliminate impossible choices from options first.',
      'Verify units (seconds vs minutes, meters vs kilometers).'
    ],
    example: 'Practice active problem solving to build instinct on this topic.',
    tip: 'Aim to solve within 60 seconds.'
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Concept Revision & Weak Topic Drill
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Interactive Learning System
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Plain English concept summaries, simplified examples, and targeted 3-question drills to conquer missed questions.
          </p>
        </div>
      </div>

      {/* Identified Weak Topics Banner */}
      {identifiedWeakTopics.length > 0 ? (
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h2 className="text-sm font-bold text-amber-900">
              Topics Identified for Revision ({identifiedWeakTopics.length})
            </h2>
          </div>
          <p className="text-xs text-amber-800 leading-relaxed">
            Based on your recent practice sessions, these topics had an accuracy below 70%. Click any topic to review its core concepts and launch a targeted 3-question drill.
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {identifiedWeakTopics.map((item) => {
              const acc = Math.round((item.correct / item.attempted) * 100);
              return (
                <button
                  key={item.topic}
                  type="button"
                  onClick={() => {
                    setSelectedTopic(item.topic);
                    setAiGuide(null);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    selectedTopic === item.topic
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : 'bg-white text-amber-900 border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  {item.topic} ({acc}%)
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3 text-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            You currently have no severely weak topics! Select any concept below to refresh your memory and practice.
          </span>
        </div>
      )}

      {/* Concept Selector Pills */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
          Select Topic to Revise
        </span>
        <div className="flex flex-wrap gap-2">
          {Object.keys(CONCEPT_SUMMARIES).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setSelectedTopic(t);
                setAiGuide(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                selectedTopic === t
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Active Topic Concept Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Quick Refresher
            </span>
            <h2 className="text-xl font-bold text-slate-900">{selectedTopic}</h2>
          </div>

          <div className="flex items-center gap-3">
            {/* AI Guide Button */}
            <button
              type="button"
              onClick={() => handleFetchAiGuide(selectedTopic)}
              disabled={isAiLoading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              {isAiLoading ? 'Generating AI Guide...' : 'AI Revision Summary'}
            </button>

            {/* Drill 3 Questions Button */}
            <button
              type="button"
              onClick={() => onStartDrill(getTopicCategory(selectedTopic), selectedTopic)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs cursor-pointer transition-all active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              Drill 3 Practice Questions
            </button>
          </div>
        </div>

        {/* AI-Generated Guide (if loaded) */}
        {aiGuide && (
          <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200 text-purple-950 space-y-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 font-bold text-purple-900">
              <Sparkles className="w-4 h-4 text-purple-600" />
              AI Mentor 2-Minute Concept Overview
            </div>
            {aiGuide.summary && <p className="leading-relaxed">{aiGuide.summary}</p>}
            {aiGuide.coreRules && (
              <ul className="list-disc pl-5 space-y-1 text-purple-900">
                {aiGuide.coreRules.map((rule, idx) => (
                  <li key={idx}>{rule}</li>
                ))}
              </ul>
            )}
            {aiGuide.example && (
              <div className="p-3 rounded-xl bg-white border border-purple-100 text-slate-800 text-xs">
                <strong>Example: </strong> {aiGuide.example}
              </div>
            )}
            {aiGuide.proTip && (
              <div className="text-xs text-purple-800 font-semibold">
                💡 Placement Pro Tip: {aiGuide.proTip}
              </div>
            )}
          </div>
        )}

        {/* Built-in Plain English Breakdown */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Concept in Simple Terms
            </h3>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
              {activeSummary.summary}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Key Rules & Shortcuts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {activeSummary.rules.map((rule, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2"
                >
                  <div className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Easy Illustrative Example
            </h3>
            <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs sm:text-sm text-indigo-950 font-medium">
              {activeSummary.example}
            </div>
          </div>

          {activeSummary.tip && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Quick Tip:</strong> {activeSummary.tip}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
