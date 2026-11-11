import { useState, useMemo, useEffect } from 'react';
import { 
  TIET_REGULATIONS, 
} from './data/tietRegulations';
import type { RegulationStatute } from './data/tietRegulations';
import { searchRegulations } from './lib/searchEngine';
import { SearchHeader } from './components/SearchHeader';
import { RegulationCard } from './components/RegulationCard';
import { AppealDrafterModal } from './components/AppealDrafterModal';
import { AttendanceCalculator } from './components/AttendanceCalculator';
import { 
  Scale, 
  FileText, 
  Calculator, 
  BookMarked, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Info,
  Building,
  GraduationCap,
  Award
} from 'lucide-react';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilterLabel, setActiveFilterLabel] = useState('All Statutes');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeView, setActiveView] = useState<'explorer' | 'calculator' | 'handbook'>('explorer');
  const [appealModalStatute, setAppealModalStatute] = useState<RegulationStatute | null>(null);

  // Light Mode default, Dark Mode toggle
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('syllabusgpt_theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('syllabusgpt_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('syllabusgpt_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // Search results
  const searchResults = useMemo(() => {
    return searchRegulations(
      searchQuery, 
      selectedCategory === 'All' ? undefined : selectedCategory
    );
  }, [searchQuery, selectedCategory]);

  const handleFilterSelect = (query: string, label: string) => {
    setActiveFilterLabel(label);
    setSearchQuery(query);
    if (activeView !== 'explorer') {
      setActiveView('explorer');
    }
  };

  const handleDraftAppeal = (statute: RegulationStatute) => {
    setAppealModalStatute(statute);
  };

  const categories = [
    'All',
    'Attendance & Leaves',
    'Medical & Emergency',
    'Detention & Appeals',
    'Examinations & Grading',
    'Hostel & Campus Life',
    'Placements & Internships'
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-slate-900 selection:text-white dark:selection:bg-amber-400 dark:selection:text-slate-950 transition-colors duration-200">
      {/* Search Header */}
      <SearchHeader
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (activeFilterLabel !== 'Custom') setActiveFilterLabel('Custom');
        }}
        activeFilter={activeFilterLabel}
        onFilterSelect={handleFilterSelect}
        resultsCount={searchResults.length}
        totalCount={TIET_REGULATIONS.length}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Primary Navigation Bar - Frosted Sticky Navigation */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 shadow-2xs transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto py-2.5 gap-4">
            {/* View Tabs */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveView('explorer')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeView === 'explorer'
                    ? 'bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Scale className="w-3.5 h-3.5 text-amber-400 dark:text-slate-950" />
                Statute Search &amp; Explorer
              </button>

              <button
                onClick={() => setActiveView('calculator')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeView === 'calculator'
                    ? 'bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                Attendance &amp; Duty Leave Forecaster
              </button>

              <button
                onClick={() => setActiveView('handbook')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeView === 'handbook'
                    ? 'bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <BookMarked className="w-3.5 h-3.5" />
                Handbook Statute Directory
              </button>
            </div>

            {/* Quick Helper Status */}
            <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Verbatim TIET Gazette • Client-Side Precision Engine</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Bento Grid KPI Stat Tiles (Shown on Explorer View when not searching) */}
        {activeView === 'explorer' && !searchQuery && selectedCategory === 'All' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-6">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-2xs">
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookMarked className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                Senate Gazette
              </div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">
                {TIET_REGULATIONS.length} Statutes
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Codified regulations synced</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-2xs">
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Statute Precision
              </div>
              <div className="text-xl font-bold font-mono text-emerald-700 dark:text-emerald-400 mt-1">
                100% Verbatim
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Zero hallucination guarantee</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-2xs">
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                EST Threshold
              </div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">
                75.0% Mandatory
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">§ 4.1.2 Condonation up to 65%</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-2xs">
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Duty Waiver (OD)
              </div>
              <div className="text-xl font-bold font-mono text-amber-700 dark:text-amber-400 mt-1">
                § 4.2.1 Granted
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Automatic attendance waiver</p>
            </div>
          </div>
        )}

        {activeView === 'calculator' && (
          <div>
            <div className="mb-4">
              <button
                onClick={() => setActiveView('explorer')}
                className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 font-semibold cursor-pointer"
              >
                ← Back to Statute Search
              </button>
            </div>
            <AttendanceCalculator onDraftDutyLeave={handleDraftAppeal} />
          </div>
        )}

        {activeView === 'handbook' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-slate-900 dark:bg-slate-800 text-amber-400 flex items-center justify-center font-bold font-mono text-lg border border-transparent dark:border-slate-700">
                  §
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Official Academic Regulations &amp; Student Rights Corpus
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Comprehensive institutional regulations codified under Senate directives for undergraduate and postgraduate scholars.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-5">
                {TIET_REGULATIONS.map((statute) => (
                  <div
                    key={statute.id}
                    onClick={() => {
                      setSearchQuery(statute.section);
                      setActiveView('explorer');
                    }}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-xs transition-all cursor-pointer group shadow-2xs"
                  >
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-mono font-bold text-slate-900 dark:text-amber-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                        {statute.section}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        Page {statute.pageNumber}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                      {statute.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 line-clamp-2 leading-relaxed">
                      {statute.studentSummary}
                    </p>
                    <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-700 dark:text-slate-300 font-semibold">
                      <span>View Statute &amp; Draft Appeal</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeView === 'explorer' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Main Stream: Search Results & Regulation Cards */}
            <div className="lg:col-span-8 space-y-4">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 shadow-xs font-bold'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 shadow-2xs'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Statute of the Day Highlight */}
              {!searchQuery && selectedCategory === 'All' && (
                <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs relative overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold font-mono tracking-wider uppercase text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800/60">
                          Featured Statute • Institutional Representation
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">TIET Academic Rights Portal</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                        Know Your Right: Attendance Exemption under § 4.2.1
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                        TIET students representing the institute in inter-university technical meets, conferences, or competitions have statutory entitlement to Duty Leave (OD) under Senate Regulations.
                      </p>
                    </div>

                    <button
                      onClick={() => handleFilterSelect('duty leave competition representation 4.2.1', 'Duty Leave & OD')}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-slate-900 hover:bg-slate-800 dark:bg-amber-400 dark:hover:bg-amber-300 dark:text-slate-950 text-white transition-all shadow-xs shrink-0 cursor-pointer"
                    >
                      <span>Explore § 4.2.1</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-400 dark:text-slate-950" />
                    </button>
                  </div>
                </div>
              )}

              {/* Results List */}
              {searchResults.length > 0 ? (
                <div>
                  {searchResults.map((result) => (
                    <RegulationCard
                      key={result.statute.id}
                      statute={result.statute}
                      confidencePercent={searchQuery ? result.confidencePercent : undefined}
                      onDraftAppeal={handleDraftAppeal}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 text-center space-y-3 shadow-2xs">
                  <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center">
                    <Info className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    No verbatim statute matched "{searchQuery}"
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                    Try searching for terms like "duty leave", "medical certificate", "48 hour detention", "curfew waiver", "summer credits", or "re-evaluation".
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setSearchQuery('')}
                      className="px-4 py-2 text-xs font-bold rounded-lg bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-amber-300 cursor-pointer shadow-xs"
                    >
                      Clear Search &amp; View All Statutes
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar: Legal Quick Actions & Campus Jurisdiction */}
            <div className="lg:col-span-4 space-y-4">
              {/* Quick Appeal Generator Card */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs space-y-3.5">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Formal Representation Drafter
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Need to submit an urgent official petition to DOAA or HOD? Choose any statute and click <strong>"Draft Formal Representation"</strong> to generate a formatted institutional letter ready to copy or print.
                </p>

                <div className="space-y-2 pt-1">
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Frequent Representations:
                  </div>
                  {TIET_REGULATIONS.slice(0, 3).map((st) => (
                    <button
                      key={st.id}
                      onClick={() => handleDraftAppeal(st)}
                      className="w-full text-left p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all text-xs flex items-center justify-between group cursor-pointer shadow-2xs"
                    >
                      <div className="space-y-0.5 pr-2">
                        <span className="font-mono font-bold text-slate-900 dark:text-amber-400 text-[11px]">
                          {st.section}
                        </span>
                        <p className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                          {st.title}
                        </p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Attendance Forecaster Mini-Card */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <Calculator className="w-4 h-4 text-slate-800 dark:text-slate-200" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Detention Forecaster
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Calculate how missing lectures for institutional competitions, conferences, or medical emergencies impacts your aggregate 75% attendance.
                </p>
                <button
                  onClick={() => setActiveView('calculator')}
                  className="w-full py-2 px-3 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Launch Attendance Engine</span>
                </button>
              </div>

              {/* TIET Administrative Authorities Directory */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  <Building className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                  Campus Statutory Authorities
                </div>
                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-900 dark:text-white">Office of DOAA</span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Admin Block Room 104 • Attendance &amp; Duty Leave Waivers</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-900 dark:text-white">Controller of Examinations (COE)</span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Admin Block Ground Floor • Grade Scrutiny &amp; Makeup EST</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-900 dark:text-white">Campus Health Centre</span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Near Hostel G • 5-Day Medical Verification Counter</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-900 dark:text-white">Chief Warden Residence Council</span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Hostel Central Wing • Curfew &amp; Late Entry Dispensation</p>
                  </div>
                </div>
              </div>

              {/* Legal Precision Guarantee */}
              <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  Zero AI Hallucination Architecture
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Every citation, page number, and statute text is drawn verbatim from the official published TIET Academic Regulations Gazette. Nothing is fabricated.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Official Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-white">SyllabusGPT</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span>Built for Students &amp; Faculty at TIET Patiala</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Legal Precision &amp; Student Rights Explorer • Verified against TIET Academic Regulations &amp; Student Handbook
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-300">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Back to Top ↑
            </a>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="font-mono text-slate-800 dark:text-amber-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[11px] border border-slate-200 dark:border-slate-700">
              Gazette Ref: § 4.2.1 / § 5.1.3 / § 7.4.2 / § 8.3 / § 11.2
            </span>
          </div>
        </div>
      </footer>

      {/* 1-Click Appeal Drafter Modal */}
      <AppealDrafterModal
        statute={appealModalStatute}
        isOpen={!!appealModalStatute}
        onClose={() => setAppealModalStatute(null)}
      />
    </div>
  );
}

export default App;
