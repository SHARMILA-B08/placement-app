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
  Target
} from 'lucide-react';
import { CategoryId, UserStats } from '../types';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string, categoryId?: CategoryId) => void;
  stats: UserStats;
  mobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  stats,
  mobileMenuOpen,
  onCloseMobileMenu,
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

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={onCloseMobileMenu}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-slate-900 text-slate-200 border-r border-slate-800 transition-transform duration-200 ease-in-out md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        } flex flex-col justify-between overflow-y-auto`}
      >
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
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors ${
                      isActive
                        ? 'bg-indigo-600 text-white font-semibold'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5" />}
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
                    onClick={() => handleItemClick(item.id, item.categoryId)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors ${
                      isActive
                        ? 'bg-indigo-600 text-white font-semibold'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0 text-indigo-400" />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5" />}
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
                    onClick={() => handleItemClick(item.id, item.categoryId)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors ${
                      isActive
                        ? 'bg-indigo-600 text-white font-semibold'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0 text-purple-400" />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Sidebar: Daily Practice Goal Box */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60">
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

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-400" />
                {stats.currentStreak}d Streak
              </span>
              <span>{progressPercent}% Done</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
