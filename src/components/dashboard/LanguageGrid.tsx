'use client';

import React from 'react';
import Link from 'next/link';
import { LANGUAGES } from '@/lib/data/languages';
import { useAuth } from '@/lib/context/AuthContext';
import { ArrowRight, CheckCircle2, Clock, Code, Sparkles } from 'lucide-react';

export const LanguageGrid: React.FC = () => {
  const { progress, setActiveLanguage } = useAuth();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>Explore Programming Languages</span>
          </h2>
          <p className="text-xs text-slate-400">Select any language path to view topic roadmap and practice problems</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {LANGUAGES.map((lang) => {
          const pct = progress.languageProgress[lang.id] || 0;
          const isSelected = progress.activeLanguage === lang.id;

          return (
            <div
              key={lang.id}
              className={`group relative flex flex-col justify-between rounded-3xl border p-5 transition-all duration-200 hover:-translate-y-1 ${
                isSelected
                  ? 'border-indigo-500/60 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 shadow-xl shadow-indigo-500/10'
                  : 'border-slate-800 bg-slate-900/80 hover:border-slate-700 hover:bg-slate-850 shadow-lg'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 text-2xl border border-slate-700 shadow-inner group-hover:scale-110 transition-transform">
                    {lang.icon}
                  </div>
                  <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-bold text-slate-300 border border-slate-700">
                    {lang.level}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {lang.name}
                </h3>
                <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {lang.description}
                </p>

                <div className="mt-4 flex items-center gap-3 text-[11px] font-medium text-slate-400">
                  <span className="flex items-center gap-1">
                    <Code className="h-3.5 w-3.5 text-indigo-400" /> {lang.totalTopics} Topics
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-cyan-400" /> {lang.estimatedHours}h
                  </span>
                </div>
              </div>

              {/* Progress & Actions */}
              <div className="mt-5 pt-3 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-400 text-[10px] font-semibold">Progress</span>
                  <span className="font-bold text-indigo-400">{pct}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden mb-3">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-300"
                    style={{ width: `${Math.max(pct, 0)}%` }}
                  />
                </div>

                <Link
                  href={`/roadmap/${lang.id}`}
                  onClick={() => setActiveLanguage(lang.id)}
                  className={`flex w-full items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md hover:opacity-95'
                      : 'bg-slate-800 text-slate-200 hover:bg-indigo-600 hover:text-white'
                  }`}
                >
                  <span>{pct > 0 ? 'Continue Path' : 'View Roadmap'}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
