import React from 'react';
import {
  LayoutDashboard,
  Calculator,
  Brain,
  TrendingUp,
  HelpCircle,
  AlertTriangle,
  FileCode2,
  Terminal,
  Cpu,
  Coffee,
  CheckSquare,
  BarChart3,
  BookOpen,
  ChevronRight,
  Flame,
  Target,
  X
} from 'lucide-react';
import { CategoryId, UserStats } from '../types';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string, categoryId?: CategoryId) => void;
  stats: UserStats;
  mobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
  collapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  stats,
  mobileMenuOpen,
  onCloseMobileMenu,
  collapsed = false,
}) => {
  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'mock', label: 'Mock Tests', icon: CheckSquare },
    { id: 'performance', label: 'Performance', icon: BarChart3 },
    { id: 'revision', label: 'Revision', icon: BookOpen },
  ];

  const aptitudeNavItems = [
    { id: 'category-aptitude', categoryId: 'aptitude' as CategoryId, label: 'Aptitude', icon: Calculator },
    { id: 'category-logical', categoryId: 'logical' as CategoryId, label: 'Logical Reasoning', icon: Brain },
    { id: 'category-number-series', categoryId: 'number-series' as CategoryId, label: 'Number Series', icon: TrendingUp },
    { id: 'category-missing-numbers', categoryId: 'missing-numbers' as CategoryId, label: 'Missing Numbers', icon: HelpCircle },
    { id: 'category-error-finding', categoryId: 'error-finding' as CategoryId, label: 'Error Finding', icon: AlertTriangle },
  ];

  const programmingNavItems = [
    { id: 'category-python', categoryId: 'python' as CategoryId, label: 'Python', icon: FileCode2 },
    { id: 'category-c', categoryId: 'c' as CategoryId, label: 'C Programming', icon: Terminal },
    { id: 'category-cpp', categoryId: 'cpp' as CategoryId, label: 'C++', icon: Cpu },
    { id: 'category-java', categoryId: 'java' as CategoryId, label: 'Java', icon: Coffee },
  ];

  const handleItemClick = (id: string, categoryId?: CategoryId) => {
    onNavigate(id, categoryId);
    onCloseMobileMenu();
  };

  const progressPercent = Math.min(
    100,
    Math.round((stats.todayAttempted / stats.dailyGoal) * 100)
  );

  const renderNavLinks = () => (
    <div className="p-4 space-y-6">
      {/* Main App Navigation */}
      <div>
        <div className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Core
        </div>
        <div className="space-y-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-xl cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Aptitude & Reasoning Navigation */}
      <div>
        <div className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Aptitude & Reasoning
        </div>
        <div className="space-y-1">
          {aptitudeNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleItemClick(item.id, item.categoryId)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-xl cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0 text-indigo-400" />
                  <span className="truncate">{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Programming Navigation */}
      <div>
        <div className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Programming
        </div>
        <div className="space-y-1">
          {programmingNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleItemClick(item.id, item.categoryId)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-xl cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0 text-purple-400" />
                  <span className="truncate">{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderGoalWidget = () => (
    <div className="p-4 border-t border-slate-800 bg-slate-950/60 shrink-0">
      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
          <span className="flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-indigo-400" />
            Daily Goal
          </span>
          <span className="tabular-nums font-semibold text-white">
            {stats.todayAttempted} / {stats.dailyGoal}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
          <span className="flex items-center gap-1">
            <Flame className="w-3 h-3 text-amber-400" />
            {stats.currentStreak}d Streak
          </span>
          <span>{progressPercent}%</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Mobile Drawer Overlay (Slide-over on Mobile screens) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            onClick={onCloseMobileMenu}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-slate-900 text-slate-200 shadow-2xl flex flex-col justify-between z-50">
            {/* Mobile Header Inside Drawer */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  SP
                </div>
                <div>
                  <span className="font-bold text-sm text-white block">Smart Placement</span>
                  <span className="text-[11px] text-slate-400">Prep Menu</span>
                </div>
              </div>
              <button
                type="button"
                onClick={onCloseMobileMenu}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Nav Links */}
            <div className="flex-1 overflow-y-auto">
              {renderNavLinks()}
            </div>

            {/* Goal Widget */}
            {renderGoalWidget()}
          </div>
        </div>
      )}

      {/* 2. Desktop In-Flow Sidebar (NOT fixed, so content CANNOT overlap) */}
      {!collapsed && (
        <aside
          className="hidden md:flex w-56 xl:w-64 shrink-0 flex-col justify-between bg-slate-900 text-slate-200 border-r border-slate-800 sticky top-16 h-[calc(100vh-4rem)] z-20"
          aria-label="Sidebar navigation"
        >
          <div className="flex-1 overflow-y-auto">
            {renderNavLinks()}
          </div>
          {renderGoalWidget()}
        </aside>
      )}
    </>
  );
};
