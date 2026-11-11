import React from 'react';
import { Search, X, BookOpen, Scale, Sparkles, Command, Sun, Moon } from 'lucide-react';
import { QUICK_TOPIC_FILTERS } from '../data/tietRegulations';

interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: string;
  onFilterSelect: (query: string, label: string) => void;
  resultsCount: number;
  totalCount: number;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterSelect,
  resultsCount,
  totalCount,
  isDark,
  onToggleTheme,
}) => {
  return (
    <header className="relative border-b border-slate-200/90 dark:border-slate-800/90 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md pt-7 pb-6 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      {/* Top Banner & Institutional Seal */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-slate-900 dark:bg-slate-800 text-amber-400 flex items-center justify-center shadow-sm border border-slate-800 dark:border-slate-700 shrink-0">
              <Scale className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans">
                  Syllabus<span className="text-amber-600 dark:text-amber-400 font-black">GPT</span>
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                  <Sparkles className="w-3 h-3 text-amber-500" /> TIET Academic Legal Terminal
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 font-sans">
                Authoritative statutory intelligence for TIET Academic Regulations &amp; Student Rights.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="flex items-center gap-2.5 text-xs font-sans text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-2xs">
              <BookOpen className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
              <span className="font-semibold text-slate-900 dark:text-white">Student Handbook Codified</span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-medium">100% Verbatim Gazette</span>
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-amber-400 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer shadow-2xs flex items-center gap-1.5 text-xs font-semibold"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-700" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Search Input Bar - High-End Legal Terminal */}
        <div className="mt-5 max-w-4xl mx-auto">
          <div className="relative flex items-center">
            <div className="absolute left-4 pointer-events-none text-slate-400 dark:text-slate-500">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Ask any statute question (e.g., 'Duty leave for inter-university competitions § 4.2.1', 'Medical condonation band § 5.1.3', '48-hour detention notice')..."
              className="w-full pl-11 pr-24 py-3.5 text-sm sm:text-base rounded-xl bg-slate-50/70 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 shadow-xs focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-slate-800 dark:focus:border-slate-600 focus:ring-4 focus:ring-slate-900/5 transition-all font-sans"
            />
            
            <div className="absolute right-3.5 flex items-center gap-1.5">
              {searchQuery ? (
                <button
                  onClick={() => onSearchChange('')}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-400 font-mono text-[10px] shadow-2xs">
                  <Command className="w-2.5 h-2.5" /> K
                </kbd>
              )}
            </div>
          </div>

          {/* Quick Filter Pills */}
          <div className="mt-3.5 flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1 hidden sm:inline font-sans">
              Statute Fast-Links:
            </span>
            {QUICK_TOPIC_FILTERS.map((chip) => {
              const isActive = activeFilter === chip.label;
              return (
                <button
                  key={chip.label}
                  onClick={() => onFilterSelect(chip.query, chip.label)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer font-sans ${
                    isActive
                      ? 'bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 shadow-xs border border-slate-900 dark:border-amber-400 font-bold'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 shadow-2xs'
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>

          {/* Search Result Counter & Status */}
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-sans">
            <div>
              {searchQuery ? (
                <span>
                  Found <strong className="text-slate-900 dark:text-slate-200 font-semibold">{resultsCount}</strong> authoritative statute{resultsCount === 1 ? '' : 's'} matching "{searchQuery}"
                </span>
              ) : (
                <span>
                  Showing all <strong className="text-slate-900 dark:text-slate-200 font-semibold">{totalCount}</strong> codified academic statutes and procedural rights
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 hidden md:block">
              Exact matches prioritized by statutory authority
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
