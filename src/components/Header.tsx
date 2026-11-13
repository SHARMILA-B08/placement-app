import React from 'react';
import { Flame, Award, Menu, X, Sparkles, PanelLeftClose, PanelLeft } from 'lucide-react';
import { UserStats } from '../types';

interface HeaderProps {
  stats: UserStats;
  currentView: string;
  onNavigate: (view: string) => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  desktopSidebarCollapsed?: boolean;
  onToggleDesktopSidebar?: () => void;
  onOpenAIGenerator: () => void;
  aiAvailable: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  currentView,
  onNavigate,
  mobileMenuOpen,
  onToggleMobileMenu,
  desktopSidebarCollapsed = false,
  onToggleDesktopSidebar,
  onOpenAIGenerator,
  aiAvailable,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs">
      <div className="w-full px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Left: Mobile hamburger / Desktop sidebar toggle & Brand */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile hamburger menu */}
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer focus:outline-hidden"
            aria-label="Toggle navigation drawer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop sidebar toggle (for laptop full-screen mode) */}
          {onToggleDesktopSidebar && (
            <button
              type="button"
              onClick={onToggleDesktopSidebar}
              className="hidden md:flex p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer transition-colors"
              title={desktopSidebarCollapsed ? 'Show Sidebar' : 'Hide Sidebar (Full Width)'}
              aria-label="Toggle desktop sidebar"
            >
              {desktopSidebarCollapsed ? (
                <PanelLeft className="w-5 h-5 text-indigo-600" />
              ) : (
                <PanelLeftClose className="w-5 h-5" />
              )}
            </button>
          )}

          {/* Brand Wordmark */}
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="text-left flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-900 via-indigo-700 to-purple-600 flex items-center justify-center text-white font-extrabold text-sm shadow-xs shrink-0">
              SP
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors whitespace-nowrap">
                Smart Placement Prep
              </span>
              <span className="text-[11px] text-slate-500 hidden sm:inline whitespace-nowrap">
                Aptitude & Coding Practice
              </span>
            </div>
          </button>
        </div>

        {/* Center: Navigation Quick Links on Desktop */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className={`cursor-pointer transition-colors hover:text-slate-900 whitespace-nowrap ${
              currentView === 'dashboard' ? 'text-indigo-600 font-bold' : ''
            }`}
          >
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => onNavigate('mock')}
            className={`cursor-pointer transition-colors hover:text-slate-900 whitespace-nowrap ${
              currentView === 'mock' ? 'text-indigo-600 font-bold' : ''
            }`}
          >
            Mock Tests
          </button>
          <button
            type="button"
            onClick={() => onNavigate('performance')}
            className={`cursor-pointer transition-colors hover:text-slate-900 whitespace-nowrap ${
              currentView === 'performance' ? 'text-indigo-600 font-bold' : ''
            }`}
          >
            Performance
          </button>
          <button
            type="button"
            onClick={() => onNavigate('revision')}
            className={`cursor-pointer transition-colors hover:text-slate-900 whitespace-nowrap ${
              currentView === 'revision' ? 'text-indigo-600 font-bold' : ''
            }`}
          >
            Revision
          </button>
        </nav>

        {/* Right: Gamified Stats + Primary AI Action */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Daily Streak */}
          <div
            title={`${stats.currentStreak} day streak`}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold shrink-0"
          >
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
            <span className="tabular-nums">{stats.currentStreak}</span>
            <span className="hidden sm:inline text-amber-600/90 font-normal">d</span>
          </div>

          {/* Points */}
          <div
            title={`${stats.totalPoints} points earned`}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold shrink-0"
          >
            <Award className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span className="tabular-nums">{stats.totalPoints}</span>
            <span className="hidden sm:inline text-indigo-600/90 font-normal">pts</span>
          </div>

          {/* AI Generator Button */}
          <button
            type="button"
            onClick={onOpenAIGenerator}
            className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl shadow-xs transition-all active:scale-95 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">AI Practice</span>
            <span className="sm:hidden">AI</span>
          </button>
        </div>
      </div>
    </header>
  );
};
