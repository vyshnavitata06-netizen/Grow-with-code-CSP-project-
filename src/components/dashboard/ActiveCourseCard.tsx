'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/context/AuthContext';
import { getRoadmapByLanguage } from '@/lib/data/roadmaps';
import { LANGUAGES } from '@/lib/data/languages';
import { Play, CheckCircle2, ArrowRight, BookOpen } from 'lucide-react';

export const ActiveCourseCard: React.FC = () => {
  const { progress } = useAuth();

  const activeLangId = progress.activeLanguage;
  const langInfo = LANGUAGES.find((l) => l.id === activeLangId) || LANGUAGES[0];
  const roadmap = getRoadmapByLanguage(activeLangId);

  // Find next uncompleted topic
  const nextTopic = roadmap.find((t) => !progress.completedTopicIds.includes(t.id)) || roadmap[0];
  const activePct = progress.languageProgress[activeLangId] || 0;

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 text-2xl border border-slate-700 shadow-inner">
            {langInfo.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">{langInfo.name} Learning Path</h2>
              <span className="rounded-full bg-indigo-950 px-2.5 py-0.5 text-[10px] font-bold text-indigo-300 border border-indigo-800">
                Primary Roadmap
              </span>
            </div>
            <p className="text-xs text-slate-400">{langInfo.totalTopics} Topics • {langInfo.estimatedHours} Hours Course</p>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <div className="text-xl font-extrabold text-indigo-400">{activePct}%</div>
          <div className="text-[10px] font-semibold text-slate-400">Completed</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6 space-y-1.5">
        <div className="flex justify-between text-xs font-semibold text-slate-400">
          <span>Overall Path Progress</span>
          <span>{progress.completedTopicIds.filter((id) => id.startsWith(activeLangId)).length} / {roadmap.length} Topics</span>
        </div>
        <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 rounded-full transition-all duration-500"
            style={{ width: `${Math.max(activePct, 4)}%` }}
          />
        </div>
      </div>

      {/* Next Up Topic Highlight */}
      {nextTopic && (
        <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-indigo-950/50 to-slate-900 p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" /> Next Topic to Learn
            </span>
            <span className="text-xs font-medium text-slate-400">Step {nextTopic.stepNumber} of {roadmap.length}</span>
          </div>

          <h3 className="text-base font-bold text-white">{nextTopic.title}</h3>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2">{nextTopic.shortDesc}</p>

          <div className="mt-4 flex items-center justify-between pt-2 border-t border-indigo-900/40">
            <div className="text-xs text-slate-400 font-medium">
              ⏱️ Approx. {nextTopic.estimatedTime}
            </div>

            <Link
              href={`/learn/${activeLangId}/${nextTopic.id}`}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:from-indigo-500 hover:to-blue-500 transition-all hover:scale-[1.02]"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Start Learning</span>
            </Link>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-xs">
        <Link
          href={`/roadmap/${activeLangId}`}
          className="flex items-center gap-1 font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <span>View Full Roadmap Diagram</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
};
