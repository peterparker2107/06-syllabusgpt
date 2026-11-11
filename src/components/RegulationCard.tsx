import React, { useState } from 'react';
import type { RegulationStatute } from '../data/tietRegulations';
import { 
  FileText, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  AlertCircle, 
  Send, 
  Building2, 
  Bookmark, 
  Sparkles 
} from 'lucide-react';

interface RegulationCardProps {
  statute: RegulationStatute;
  confidencePercent?: number;
  searchHighlight?: string[];
  onDraftAppeal: (statute: RegulationStatute) => void;
}

export const RegulationCard: React.FC<RegulationCardProps> = ({
  statute,
  confidencePercent,
  onDraftAppeal,
}) => {
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [copiedClause, setCopiedClause] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const citationString = `${statute.section} • Page ${statute.pageNumber} • ${statute.documentName}`;

  const handleCopyCitation = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(citationString);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  const handleCopyClause = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`"${statute.verbatimClause}" — Ref: ${citationString}`);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 2000);
  };

  // Color code statute level with refined, high-contrast tokens
  const getBadgeStyle = (level: string) => {
    switch (level) {
      case 'Statutory Right':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Conditional Discretion':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Appeals Protocol':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'Mandatory Procedure':
        return 'bg-slate-100 text-slate-800 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all duration-200 overflow-hidden mb-4">
      {/* Card Header */}
      <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-b from-slate-50/60 dark:from-slate-800/40 to-white dark:to-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="space-y-2 flex-1">
            {/* Citation Pill & Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-slate-900 dark:bg-slate-800 text-white shadow-2xs border border-transparent dark:border-slate-700">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                {statute.section}
              </span>

              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                Page {statute.pageNumber}
              </span>

              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getBadgeStyle(statute.statuteLevel)}`}>
                <ShieldCheck className="w-3 h-3 mr-1" />
                {statute.statuteLevel}
              </span>

              {confidencePercent && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                  <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                  {confidencePercent}% Relevance
                </span>
              )}
            </div>

            {/* Title */}
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug tracking-tight font-sans">
              {statute.title}
            </h2>

            {/* Authority & Category Tag */}
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-sans">
              <span className="inline-flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                <Building2 className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                Jurisdiction: <span className="font-semibold text-slate-900 dark:text-white">{statute.authority}</span>
              </span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                {statute.category}
              </span>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-1.5 self-end sm:self-start shrink-0">
            <button
              onClick={handleCopyCitation}
              title="Copy official citation"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-2xs transition-colors cursor-pointer"
            >
              {copiedCitation ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold font-sans">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400 dark:text-slate-400" />
                  <span className="font-sans">Cite</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              title={isBookmarked ? 'Bookmarked' : 'Bookmark statute'}
              className={`p-1.5 rounded-lg text-xs border transition-colors cursor-pointer ${
                isBookmarked 
                  ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800' 
                  : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 space-y-4">
        {/* High-Contrast Verbatim Legal Clause */}
        <div>
          <div className="flex items-center justify-between pb-1.5">
            <span className="text-xs font-sans font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              Verbatim Gazette Statute (Official Codification)
            </span>
            <button
              onClick={handleCopyClause}
              className="text-xs text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 flex items-center gap-1 font-medium cursor-pointer"
            >
              {copiedClause ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              {copiedClause ? 'Clause Copied' : 'Copy Clause'}
            </button>
          </div>
          <blockquote className="statute-quote p-4 rounded-r-lg text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed italic border-l-4 border-slate-900 dark:border-amber-400 bg-slate-50/80 dark:bg-slate-950/80">
            "{statute.verbatimClause}"
          </blockquote>
        </div>

        {/* Student Plain-Language Rights Summary */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">
            <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            Plain-Language Rights &amp; Remedies Summary:
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            {statute.studentSummary}
          </p>
        </div>

        {/* Collapsible Key Conditions & Action Protocol */}
        <div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border-t border-slate-100 dark:border-slate-800 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span>Mandatory Statutory Prerequisites &amp; Action Protocol</span>
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-1.5 py-0.5 rounded text-[10px] font-mono border border-slate-200 dark:border-slate-700">
                {statute.keyConditions.length + statute.actionSteps.length} items
              </span>
            </span>
            {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {isExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 pb-1">
              {/* Conditions Box */}
              <div className="bg-white dark:bg-slate-800/80 p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-2xs">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Prerequisites to Claim Benefit:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {statute.keyConditions.map((cond, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-slate-900 dark:text-amber-400 font-bold mt-0.5">•</span>
                      <span>{cond}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Checklist Box */}
              <div className="bg-slate-50/70 dark:bg-slate-800/50 p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-2xs">
                <h4 className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
                  Procedural Action Protocol:
                </h4>
                <ol className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {statute.actionSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="font-mono font-bold text-blue-800 dark:text-blue-300 bg-blue-100/70 dark:bg-blue-900/50 px-1 rounded text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Card Footer Actions */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 flex-wrap">
            {statute.tags.slice(0, 4).map(tag => (
              <span key={tag} className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                #{tag}
              </span>
            ))}
          </div>

          {/* 1-Click Appeal Drafter Button */}
          <button
            onClick={() => onDraftAppeal(statute)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-slate-950 text-white shadow-xs hover:shadow transition-all group cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 text-amber-400 dark:text-slate-950" />
            <span>Draft Formal Representation Letter</span>
          </button>
        </div>
      </div>
    </div>
  );
};
