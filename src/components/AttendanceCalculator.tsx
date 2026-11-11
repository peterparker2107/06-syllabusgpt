import React, { useState } from 'react';
import { Calculator, ShieldAlert, CheckCircle, AlertTriangle, ArrowRight, Scale, BookOpen } from 'lucide-react';
import { TIET_REGULATIONS } from '../data/tietRegulations';
import type { RegulationStatute } from '../data/tietRegulations';

interface AttendanceCalculatorProps {
  onDraftDutyLeave: (statute: RegulationStatute) => void;
}

export const AttendanceCalculator: React.FC<AttendanceCalculatorProps> = ({ onDraftDutyLeave }) => {
  const [totalHeld, setTotalHeld] = useState<number>(36);
  const [totalAttended, setTotalAttended] = useState<number>(29);
  const [missedForDutyLeave, setMissedForDutyLeave] = useState<number>(6);

  // Calculations
  const currentPct = totalHeld > 0 ? (totalAttended / totalHeld) * 100 : 0;
  
  // If missed without waiver (held increases by missed, attended stays same)
  const projectedHeld = totalHeld + missedForDutyLeave;
  const projectedWithoutWaiverPct = projectedHeld > 0 ? (totalAttended / projectedHeld) * 100 : 0;

  // With Statute § 4.2.1 Duty Waiver:
  // Missed lectures are treated as "Present on Institutional Duty"
  const attendedWithWaiver = totalAttended + missedForDutyLeave;
  const projectedWithWaiverPct = projectedHeld > 0 ? (attendedWithWaiver / projectedHeld) * 100 : 0;

  // Find relevant statutes
  const dutyStatute = TIET_REGULATIONS.find(r => r.id === 'tiet-reg-4-2-1') || TIET_REGULATIONS[0];

  const getStatus = (pct: number) => {
    if (pct >= 75) {
      return {
        level: 'Safe EST Clearance',
        color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
        icon: CheckCircle,
        message: 'Safe from EST Detention. Satisfies mandatory 75% threshold.',
        remedy: 'Maintain regular attendance to preserve semester buffer.'
      };
    } else if (pct >= 65) {
      return {
        level: 'Conditional Condonation Band',
        color: 'text-amber-800 bg-amber-50 border-amber-200',
        icon: AlertTriangle,
        message: 'Within 65% - 74.9% band: Detention risk unless DOAA condones.',
        remedy: 'Protected under Statute § 4.1.2 (Dean Discretion) with valid medical or duty certification.'
      };
    } else {
      return {
        level: 'Statutory Detention Bar',
        color: 'text-rose-800 bg-rose-50 border-rose-200',
        icon: ShieldAlert,
        message: 'Below 65% statutory threshold. Automatic Detention bar.',
        remedy: 'Handbook § 4.1.2 expressly bars condonation below 65.0%. Immediate duty leave waiver required!'
      };
    }
  };

  const withoutStatus = getStatus(projectedWithoutWaiverPct);
  const withStatus = getStatus(projectedWithWaiverPct);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden mb-6">
      <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-b from-slate-50/80 dark:from-slate-800/40 to-white dark:to-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-900 dark:bg-slate-800 text-amber-400 flex items-center justify-center shrink-0 shadow-2xs border border-transparent dark:border-slate-700">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-sans tracking-tight">
                Attendance &amp; Duty Leave Forecaster
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                Simulate your EST detention threshold before &amp; after invoking Statute § 4.2.1 (Institutional Duty Leave)
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
            <Scale className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            § 4.1.2 &amp; § 4.2.1 Engine
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {/* Bento Grid Input Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-50/70 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 font-sans">
              1. Lectures Conducted So Far
            </label>
            <input
              type="number"
              min={1}
              value={totalHeld}
              onChange={(e) => setTotalHeld(Math.max(1, parseInt(e.target.value) || 0))}
              className="w-full px-3 py-2 text-sm font-mono font-bold rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-amber-400 shadow-2xs"
            />
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 block font-sans">From Webkiosk subject tally</span>
          </div>

          <div className="bg-slate-50/70 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 font-sans">
              2. Lectures Currently Attended
            </label>
            <input
              type="number"
              min={0}
              max={totalHeld}
              value={totalAttended}
              onChange={(e) => setTotalAttended(Math.min(totalHeld, Math.max(0, parseInt(e.target.value) || 0)))}
              className="w-full px-3 py-2 text-sm font-mono font-bold rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-amber-400 shadow-2xs"
            />
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 block font-sans">
              Current: <strong className="text-slate-900 dark:text-white font-mono">{currentPct.toFixed(1)}%</strong>
            </span>
          </div>

          <div className="bg-slate-50/70 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 font-sans">
              3. Lectures Missed for Event
            </label>
            <input
              type="number"
              min={0}
              value={missedForDutyLeave}
              onChange={(e) => setMissedForDutyLeave(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full px-3 py-2 text-sm font-mono font-bold rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-amber-400 shadow-2xs"
            />
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 block font-sans">
              e.g., 6 lectures for sanctioned event
            </span>
          </div>
        </div>

        {/* Comparison Result Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Scenario A: Without Duty Leave */}
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/20">
            <div className="flex items-center justify-between pb-2 border-b border-rose-200/50 dark:border-rose-900/40">
              <span className="text-xs font-bold text-rose-900 dark:text-rose-300 uppercase tracking-wider font-sans">
                Scenario A: Without Statute § 4.2.1
              </span>
              <span className="text-xs font-mono font-semibold text-rose-700 dark:text-rose-400 bg-rose-100/70 dark:bg-rose-900/50 px-2 py-0.5 rounded">
                Unsanctioned
              </span>
            </div>

            <div className="my-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono text-rose-950 dark:text-rose-200">
                {projectedWithoutWaiverPct.toFixed(1)}%
              </span>
              <span className="text-xs text-rose-700 dark:text-rose-400 font-medium font-sans">
                ({totalAttended} / {projectedHeld} lectures)
              </span>
            </div>

            <div className={`p-2.5 rounded-lg border text-xs font-medium ${withoutStatus.color} dark:bg-slate-900/80 dark:border-rose-800/60 flex items-start gap-2`}>
              <withoutStatus.icon className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold font-sans text-rose-900 dark:text-rose-300">{withoutStatus.level}</p>
                <p className="text-[11px] mt-0.5 leading-snug font-sans text-rose-800 dark:text-rose-400">{withoutStatus.message}</p>
              </div>
            </div>
          </div>

          {/* Scenario B: With Duty Leave Waiver */}
          <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-200/50 dark:border-emerald-900/40">
              <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5 font-sans">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Scenario B: With Statute § 4.2.1 Invocation
              </span>
              <span className="text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-900/50 px-2 py-0.5 rounded">
                OD Regularized
              </span>
            </div>

            <div className="my-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono text-emerald-950 dark:text-emerald-200">
                {projectedWithWaiverPct.toFixed(1)}%
              </span>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium font-sans">
                ({attendedWithWaiver} / {projectedHeld} lectures credited)
              </span>
            </div>

            <div className={`p-2.5 rounded-lg border text-xs font-medium ${withStatus.color} dark:bg-slate-900/80 dark:border-emerald-800/60 flex items-start gap-2`}>
              <withStatus.icon className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold font-sans text-emerald-900 dark:text-emerald-300">{withStatus.level}</p>
                <p className="text-[11px] mt-0.5 leading-snug font-sans text-emerald-800 dark:text-emerald-400">{withStatus.message}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-sans">
            <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>
              Invoking <strong className="font-mono text-slate-900 dark:text-white">§ 4.2.1</strong> protects your attendance from dropping by{' '}
              <strong className="text-emerald-700 dark:text-emerald-400 font-mono font-bold">
                +{(projectedWithWaiverPct - projectedWithoutWaiverPct).toFixed(1)}%
              </strong>.
            </span>
          </div>

          <button
            onClick={() => onDraftDutyLeave(dutyStatute)}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-slate-900 hover:bg-slate-800 dark:bg-amber-400 dark:hover:bg-amber-300 dark:text-slate-950 text-white shadow-xs transition-all shrink-0 cursor-pointer"
          >
            <span>Draft § 4.2.1 Waiver Letter</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
