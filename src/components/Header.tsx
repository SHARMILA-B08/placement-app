import React from 'react';
import { Flame, Award, Menu, X, Sparkles } from 'lucide-react';
import { UserStats } from '../types';

interface HeaderProps {
  stats: UserStats;
  currentView: string;
  onNavigate: (view: string) => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onOpenAIGenerator: () => void;
  aiAvailable: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  currentView,
  onNavigate,
  mobileMenuOpen,
  onToggleMobileMenu,
  onOpenAIGenerator,
  aiAvailable,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Brand */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            className="text-left flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-900 via-indigo-700 to-purple-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
              SP
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                Smart Placement Prep
              </span>
              <span className="text-xs text-slate-500 hidden sm:inline">
                Aptitude & Coding Practice
              </span>
            </div>
          </button>
        </div>

        {/* Center / Navigation Quick Links on Desktop */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`cursor-pointer transition-colors hover:text-slate-900 ${
              currentView === 'dashboard' ? 'text-indigo-600 font-semibold' : ''
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onNavigate('mock')}
            className={`cursor-pointer transition-colors hover:text-slate-900 ${
              currentView === 'mock' ? 'text-indigo-600 font-semibold' : ''
            }`}
          >
            Mock Tests
          </button>
          <button
            onClick={() => onNavigate('performance')}
            className={`cursor-pointer transition-colors hover:text-slate-900 ${
              currentView === 'performance' ? 'text-indigo-600 font-semibold' : ''
            }`}
          >
            Performance
          </button>
          <button
            onClick={() => onNavigate('revision')}
            className={`cursor-pointer transition-colors hover:text-slate-900 ${
              currentView === 'revision' ? 'text-indigo-600 font-semibold' : ''
            }`}
          >
            Revision
          </button>
        </nav>

        {/* Right: Gamified Stats + Primary AI Action */}
        <div className="flex items-center gap-3">
          {/* Daily Streak */}
          <div
            title={`${stats.currentStreak} day streak`}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-700 text-xs font-semibold"
          >
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="tabular-nums">{stats.currentStreak}</span>
            <span className="hidden sm:inline text-amber-600/90 font-normal">day streak</span>
          </div>

          {/* Points */}
          <div
            title={`${stats.totalPoints} points earned`}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold"
          >
            <Award className="w-4 h-4 text-indigo-500" />
            <span className="tabular-nums">{stats.totalPoints}</span>
            <span className="hidden sm:inline text-indigo-600/90 font-normal">pts</span>
          </div>

          {/* AI Generator Button */}
          <button
            onClick={onOpenAIGenerator}
            className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg shadow-xs transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Generate with</span> AI
          </button>
        </div>
      </div>
    </header>
  );
};
