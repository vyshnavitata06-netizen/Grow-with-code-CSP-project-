'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/context/AuthContext';
import { getRoadmapByLanguage } from '@/lib/data/roadmaps';
import { LANGUAGES } from '@/lib/data/languages';
import { LanguageId, RoadmapTopic } from '@/lib/types';
import { CheckCircle2, Play, Lock, Clock, BookOpen, ChevronRight, Award, Sparkles } from 'lucide-react';

export const RoadmapView: React.FC<{ initialLanguage?: LanguageId }> = ({ initialLanguage }) => {
  const { progress, markTopicCompleted, setActiveLanguage } = useAuth();
  const [selectedLang, setSelectedLang] = useState<LanguageId>(initialLanguage || progress.activeLanguage);

  const langInfo = LANGUAGES.find((l) => l.id === selectedLang) || LANGUAGES[0];
  const topics = getRoadmapByLanguage(selectedLang);
  const completedIds = progress.completedTopicIds;

  const handleSelectLang = (lang: LanguageId) => {
    setSelectedLang(lang);
    setActiveLanguage(lang);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
              <span>{langInfo.icon}</span> {langInfo.name} Learning Roadmap
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Structured {langInfo.name} Step-by-Step Path
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-2xl">
              Follow our curated topic order. Master each core concept through theoretical reading, interactive code examples, and practice problems.
            </p>
          </div>

          <Link
            href={`/learn/${selectedLang}/${topics[0]?.id || ''}`}
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-3 text-xs font-extrabold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-blue-500 transition-all hover:scale-[1.02] shrink-0"
          >
            <Play className="h-4 w-4 fill-current" />
            <span>Start from Step 1</span>
          </Link>
        </div>

        {/* Language Tabs */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-t border-slate-800/80 pt-4">
          {LANGUAGES.map((l) => {
            const isActive = selectedLang === l.id;
            return (
              <button
                key={l.id}
                onClick={() => handleSelectLang(l.id)}
                className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold transition-all shrink-0 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-400/30'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                <span>{l.icon}</span>
                <span>{l.name}</span>
                <span className="text-[10px] opacity-70">({l.totalTopics})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Roadmap Diagram Nodes */}
      <div className="relative max-w-4xl mx-auto py-4">
        {/* Connecting Vertical Line */}
        <div className="absolute left-6 sm:left-1/2 top-10 bottom-10 w-1 -translate-x-1/2 bg-gradient-to-b from-indigo-500 via-blue-500 to-slate-800 rounded-full z-0 opacity-50" />

        <div className="space-y-8 relative z-10">
          {topics.map((topic, index) => {
            const isCompleted = completedIds.includes(topic.id);
            const isNext = !isCompleted && (index === 0 || completedIds.includes(topics[index - 1].id));
            const isRightSide = index % 2 === 1;

            return (
              <div
                key={topic.id}
                className={`flex flex-col sm:flex-row items-start sm:items-center ${
                  isRightSide ? 'sm:flex-row-reverse' : ''
                } gap-6`}
              >
                {/* Topic Card */}
                <div className="w-full sm:w-[calc(50%-2.5rem)] ml-12 sm:ml-0">
                  <div
                    className={`group rounded-3xl border p-5 transition-all duration-300 shadow-xl ${
                      isCompleted
                        ? 'border-emerald-500/40 bg-slate-900/90 hover:border-emerald-500'
                        : isNext
                        ? 'border-indigo-500/80 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 shadow-indigo-500/20 ring-2 ring-indigo-500/30'
                        : 'border-slate-800 bg-slate-900/50 opacity-80 hover:opacity-100 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400">
                        Topic {topic.stepNumber} of {topics.length}
                      </span>

                      {isCompleted ? (
                        <span className="flex items-center gap-1 rounded-full bg-emerald-950 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-800">
                          <CheckCircle2 className="h-3 w-3" /> Completed
                        </span>
                      ) : isNext ? (
                        <span className="flex items-center gap-1 rounded-full bg-indigo-950 px-2.5 py-0.5 text-[10px] font-bold text-indigo-300 border border-indigo-700 animate-pulse">
                          <Sparkles className="h-3 w-3 text-indigo-400" /> Up Next
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-bold text-slate-400">
                          <Lock className="h-3 w-3" /> Upcoming
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {topic.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {topic.shortDesc}
                    </p>

                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800/80">
                      <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-cyan-400" /> {topic.estimatedTime}
                      </span>

                      <Link
                        href={`/learn/${selectedLang}/${topic.id}`}
                        className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                          isNext
                            ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-md'
                            : 'bg-slate-800 text-slate-200 hover:bg-indigo-600 hover:text-white'
                        }`}
                      >
                        <span>{isCompleted ? 'Review Lesson' : 'Start Topic'}</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Node Center Icon */}
                <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-2xl border-2 bg-slate-950 shadow-2xl z-20">
                  {isCompleted ? (
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/30">
                      <CheckCircle2 className="h-6 w-6 stroke-[2.5]" />
                    </div>
                  ) : isNext ? (
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 text-white font-bold shadow-lg shadow-indigo-500/50 animate-pulse">
                      <Play className="h-5 w-5 fill-current ml-0.5" />
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-slate-500 font-bold border border-slate-800">
                      {topic.stepNumber}
                    </div>
                  )}
                </div>

                {/* Spacer for 2-column alignment */}
                <div className="hidden sm:block w-[calc(50%-2.5rem)]" />
              </div>
            );
          })}
        </div>

        {/* Certificate Completion Node Banner at the Bottom */}
        <div className="mt-12 text-center relative z-20">
          <div className="inline-flex flex-col items-center justify-center rounded-3xl border border-amber-500/40 bg-gradient-to-b from-amber-950/60 to-slate-950 p-6 max-w-md shadow-2xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 mb-3 shadow-lg">
              <Award className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-white">Course Certificate of Completion</h3>
            <p className="text-xs text-slate-400 mt-1">
              Finish all topics in {langInfo.name} to unlock your verifiable digital certificate!
            </p>

            <Link
              href="/certificates"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors shadow-md"
            >
              <span>View My Certificates</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
