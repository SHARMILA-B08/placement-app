import React, { useState, useEffect } from 'react';
import { UserStats, PracticeSessionResult, CategoryId, PracticeMode, Question } from './types';
import {
  loadUserStats,
  loadSessionHistory,
  saveUserStats,
} from './utils/storage';
import {
  ALL_QUESTIONS,
  getQuestionsByCategory,
  getQuestionsByTopic,
  getQuickPracticeQuestions,
  getDailyChallengeQuestions,
  getProgrammingChallengeQuestions,
  getMockTestQuestions,
  getErrorCorrectionQuestions,
  getWeakTopicDrillQuestions,
} from './data/questions';
import { checkGeminiStatus } from './services/geminiService';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { PracticeSession } from './components/PracticeSession';
import { MockTestSession } from './components/MockTestSession';
import { ResultsView } from './components/ResultsView';
import { ReviewAnswersView } from './components/ReviewAnswersView';
import { CategoryBrowser } from './components/CategoryBrowser';
import { PerformanceView } from './components/PerformanceView';
import { RevisionView } from './components/RevisionView';
import { AIQuestionModal } from './components/AIQuestionModal';

export default function App() {
  const [stats, setStats] = useState<UserStats>(() => loadUserStats());
  const [sessionHistory, setSessionHistory] = useState<PracticeSessionResult[]>(() =>
    loadSessionHistory()
  );

  // Navigation states
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [selectedCategoryId, setSelectedCategoryId] = useState<CategoryId>('aptitude');
  const [selectedTopic, setSelectedTopic] = useState<string>('Percentages');

  // Active Session states
  const [activeMode, setActiveMode] = useState<PracticeMode>('topic');
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [latestResult, setLatestResult] = useState<PracticeSessionResult | null>(null);

  // Modals & UI controls
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [aiModalOpen, setAiModalOpen] = useState<boolean>(false);
  const [aiAvailable, setAiAvailable] = useState<boolean>(false);

  // Check Gemini status on initial mount
  useEffect(() => {
    checkGeminiStatus().then((status) => {
      setAiAvailable(status.available);
    });
  }, []);

  // Sync stats when updated
  const handleStatsUpdated = (newStats: UserStats) => {
    setStats(newStats);
    setSessionHistory(loadSessionHistory());
  };

  // Start Practice with given mode
  const handleStartMode = (
    mode: PracticeMode,
    category?: CategoryId,
    topic?: string
  ) => {
    setActiveMode(mode);
    let qs: Question[] = [];

    switch (mode) {
      case 'quick':
        qs = getQuickPracticeQuestions(10);
        break;
      case 'daily':
        qs = getDailyChallengeQuestions(20);
        break;
      case 'mock':
        qs = getMockTestQuestions(30);
        setCurrentView('mock');
        setActiveQuestions(qs);
        return;
      case 'error-correction':
        qs = getErrorCorrectionQuestions(15);
        break;
      case 'programming':
        qs = getProgrammingChallengeQuestions(
          (category as 'python' | 'c' | 'cpp' | 'java') || 'python',
          10
        );
        break;
      case 'weak-drill':
        qs = getWeakTopicDrillQuestions(topic || 'Percentages', 3);
        break;
      case 'topic':
      default:
        if (topic) {
          qs = getQuestionsByTopic(topic);
        } else if (category) {
          qs = getQuestionsByCategory(category);
        } else {
          qs = getQuickPracticeQuestions(10);
        }
        break;
    }

    if (category) setSelectedCategoryId(category);
    if (topic) setSelectedTopic(topic);

    setActiveQuestions(qs);
    setCurrentView('practice');
  };

  // Start topic practice directly from Category browser
  const handleStartTopicPractice = (cat: CategoryId, top: string) => {
    setSelectedCategoryId(cat);
    setSelectedTopic(top);
    handleStartMode('topic', cat, top);
  };

  // Handler when session finishes
  const handleSessionComplete = (result: PracticeSessionResult) => {
    setLatestResult(result);
    setStats(loadUserStats());
    setSessionHistory(loadSessionHistory());
    setCurrentView('results');
  };

  // Handler for custom AI questions
  const handleStartGeneratedSession = (
    questions: Question[],
    genTopic: string,
    genCategory: CategoryId
  ) => {
    setActiveQuestions(questions);
    setSelectedCategoryId(genCategory);
    setSelectedTopic(genTopic);
    setActiveMode('topic');
    setCurrentView('practice');
  };

  // Navigation router
  const handleNavigate = (view: string, categoryId?: CategoryId) => {
    if (view.startsWith('category-') && categoryId) {
      setSelectedCategoryId(categoryId);
      setCurrentView('category');
    } else if (view === 'mock') {
      const qs = getMockTestQuestions(30);
      setActiveQuestions(qs);
      setCurrentView('mock');
    } else {
      setCurrentView(view);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* 1. Top Header */}
      <Header
        stats={stats}
        currentView={currentView}
        onNavigate={handleNavigate}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
        onOpenAIGenerator={() => setAiModalOpen(true)}
        aiAvailable={aiAvailable}
      />

      {/* 2. Main Layout (Sidebar + Content Stage) */}
      <div className="flex-1 flex">
        {/* Sidebar (Desktop fixed + Mobile drawer) */}
        <Sidebar
          currentView={
            currentView === 'category' ? `category-${selectedCategoryId}` : currentView
          }
          onNavigate={handleNavigate}
          stats={stats}
          mobileMenuOpen={mobileMenuOpen}
          onCloseMobileMenu={() => setMobileMenuOpen(false)}
        />

        {/* Content View Stage */}
        <main className="flex-1 md:pl-64 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {currentView === 'dashboard' && (
            <Dashboard
              stats={stats}
              onStartMode={handleStartMode}
              onNavigateCategory={(cat) => {
                setSelectedCategoryId(cat);
                setCurrentView('category');
              }}
              onNavigateToRevision={() => setCurrentView('revision')}
              onOpenAIGenerator={() => setAiModalOpen(true)}
            />
          )}

          {currentView === 'category' && (
            <CategoryBrowser
              categoryId={selectedCategoryId}
              stats={stats}
              onBackToDashboard={() => setCurrentView('dashboard')}
              onStartTopicPractice={handleStartTopicPractice}
              onOpenAIGeneratorWithTopic={(cat, top) => {
                setSelectedCategoryId(cat);
                setSelectedTopic(top);
                setAiModalOpen(true);
              }}
            />
          )}

          {currentView === 'practice' && (
            <PracticeSession
              questions={activeQuestions}
              mode={activeMode}
              category={selectedCategoryId}
              topic={selectedTopic}
              bookmarkedIds={stats.bookmarkedIds}
              onComplete={handleSessionComplete}
              onExit={() => setCurrentView('dashboard')}
              onUpdateBookmarks={(newBookmarks) => {
                setStats((prev) => ({ ...prev, bookmarkedIds: newBookmarks }));
              }}
              aiAvailable={aiAvailable}
            />
          )}

          {currentView === 'mock' && (
            <MockTestSession
              questions={activeQuestions.length > 0 ? activeQuestions : getMockTestQuestions(30)}
              onComplete={handleSessionComplete}
              onExit={() => setCurrentView('dashboard')}
            />
          )}

          {currentView === 'results' && latestResult && (
            <ResultsView
              result={latestResult}
              onReviewAnswers={() => setCurrentView('review')}
              onRetakeOrNew={() => handleStartMode(activeMode, selectedCategoryId, selectedTopic)}
              onGoHome={() => setCurrentView('dashboard')}
            />
          )}

          {currentView === 'review' && latestResult && (
            <ReviewAnswersView
              result={latestResult}
              onBackToResults={() => setCurrentView('results')}
              onGoHome={() => setCurrentView('dashboard')}
              aiAvailable={aiAvailable}
            />
          )}

          {currentView === 'performance' && (
            <PerformanceView
              stats={stats}
              sessionHistory={sessionHistory}
              onStatsUpdated={handleStatsUpdated}
              onGoHome={() => setCurrentView('dashboard')}
            />
          )}

          {currentView === 'revision' && (
            <RevisionView
              stats={stats}
              onStartDrill={(cat, top) => handleStartMode('weak-drill', cat, top)}
              aiAvailable={aiAvailable}
            />
          )}
        </main>
      </div>

      {/* AI Dynamic Question Generator Modal */}
      <AIQuestionModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        onStartGeneratedSession={handleStartGeneratedSession}
        initialCategory={selectedCategoryId}
        initialTopic={selectedTopic}
        aiAvailable={aiAvailable}
      />
    </div>
  );
}
