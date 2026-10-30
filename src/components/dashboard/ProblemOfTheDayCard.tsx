'use client';

import React from 'react';
import Link from 'next/link';
import { Target, Zap, ArrowRight, Award } from 'lucide-react';
import { getProblemById } from '@/lib/data/practiceProblems';

export const ProblemOfTheDayCard: React.FC = () => {
  const dailyProblem = getProblemById('py-prob-4') || getProblemById('py-prob-1');

  if (!dailyProblem) return null;

  return (
    <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-950 p-6 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-amber-400">
              Daily Practice Challenge
            </h2>
            <p className="text-xs text-slate-400">Earn +{dailyProblem.points} XP Points</p>
          </div>
        </div>

        <span className="rounded-full bg-emerald-950 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-800">
          {dailyProblem.difficulty}
        </span>
      </div>

      <h3 className="text-base font-bold text-white">{dailyProblem.title}</h3>
      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{dailyProblem.description}</p>

      <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800">
        <span className="text-[11px] text-slate-400">Python • Math & Operators</span>

        <Link
          href={`/practice/${dailyProblem.id}`}
          className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:from-amber-400 hover:to-orange-400 transition-all shadow-md"
        >
          <Zap className="h-3.5 w-3.5 fill-current" />
          <span>Solve Now</span>
        </Link>
      </div>
    </div>
  );
};
