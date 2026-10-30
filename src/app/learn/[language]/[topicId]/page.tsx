'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { getTopicById, getRoadmapByLanguage } from '@/lib/data/roadmaps';
import { LANGUAGES } from '@/lib/data/languages';
import { LanguageId } from '@/lib/types';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { CodeEditor } from '@/components/editor/CodeEditor';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  BookOpen,
  Sparkles,
  Lightbulb,
  Play,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function LearnTopicPage() {
  const params = useParams();
  const router = useRouter();
  const language = (params.language as LanguageId) || 'python';
  const topicId = params.topicId as string;

  const { progress, markTopicCompleted } = useAuth();
  const topic = getTopicById(topicId);
  const roadmap = getRoadmapByLanguage(language);

  if (!topic) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-xl font-bold">Topic Not Found</h1>
        <p className="text-xs text-slate-400 mt-1">The requested topic path does not exist.</p>
        <button
          onClick={() => router.push('/dashboard')}
          className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const currentIndex = roadmap.findIndex((t) => t.id === topic.id);
  const prevTopic = currentIndex > 0 ? roadmap[currentIndex - 1] : null;
  const nextTopic = currentIndex < roadmap.length - 1 ? roadmap[currentIndex + 1] : null;

  const isCompleted = progress.completedTopicIds.includes(topic.id);

  const handleCompleteTopic = () => {
    markTopicCompleted(topic.id, language);
    if (nextTopic) {
      router.push(`/learn/${language}/${nextTopic.id}`);
    } else {
      router.push(`/roadmap/${language}`);
    }
  };

  const langInfo = LANGUAGES.find((l) => l.id === language) || LANGUAGES[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full space-y-6">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
              <span>/</span>
              <Link href={`/roadmap/${language}`} className="hover:text-white">{langInfo.name} Roadmap</Link>
              <span>/</span>
              <span className="text-indigo-400 font-semibold">Step {topic.stepNumber}</span>
            </div>

            <div className="flex items-center gap-2">
              {prevTopic && (
                <Link
                  href={`/learn/${language}/${prevTopic.id}`}
                  className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800"
                >
                  <ChevronLeft className="h-3.5 w-3.5" /> Prev
                </Link>
              )}
              {nextTopic && (
                <Link
                  href={`/learn/${language}/${nextTopic.id}`}
                  className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800"
                >
                  Next <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          </div>

          {/* Topic Title Header */}
          <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 p-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
                  <span>{langInfo.icon}</span> Step {topic.stepNumber} of {roadmap.length} • {topic.level}
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {topic.title}
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-2xl">
                  {topic.shortDesc}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-cyan-400" /> {topic.estimatedTime}
                </span>

                {isCompleted ? (
                  <span className="flex items-center gap-1.5 rounded-2xl bg-emerald-950 px-4 py-2 text-xs font-bold text-emerald-400 border border-emerald-800">
                    <CheckCircle2 className="h-4 w-4" /> Completed
                  </span>
                ) : (
                  <button
                    onClick={handleCompleteTopic}
                    className="flex items-center gap-1.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-2 text-xs font-extrabold text-white shadow-md hover:from-indigo-500 hover:to-blue-500 transition-all"
                  >
                    <CheckCircle2 className="h-4 w-4" /> Mark Complete
                  </button>
                )}
              </div>
            </div>

            {/* Key Concepts Tags */}
            <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Key Concepts:</span>
              {topic.keyConcepts.map((concept) => (
                <span
                  key={concept}
                  className="rounded-xl bg-slate-900 px-2.5 py-1 text-[11px] font-semibold text-indigo-300 border border-slate-800"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>

          {/* Theory & Learning Content */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-400" /> Concept Overview & Theory
            </h2>

            <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
              {topic.theoryMaterial}
            </div>
          </div>

          {/* Code Examples */}
          {topic.codeExamples.map((example, idx) => (
            <div key={idx} className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-amber-400" /> Example: {example.title}
              </h3>
              <p className="text-xs text-slate-400">{example.explanation}</p>

              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-emerald-400 overflow-x-auto shadow-inner">
                <pre>{example.code}</pre>
              </div>
            </div>
          ))}

          {/* Topic Practice Challenge */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Play className="h-5 w-5 text-emerald-400 fill-current" /> Topic Practice Problem
                </h2>
                <p className="text-xs text-slate-400">Apply what you learned in this topic using the interactive playground</p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white">{topic.practiceProblem.title}</h3>
                <span className="rounded-full bg-emerald-950 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-800">
                  +{topic.practiceProblem.points} XP
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{topic.practiceProblem.description}</p>

              <div className="space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Instructions:</p>
                <ul className="list-disc list-inside text-xs text-slate-400 space-y-0.5">
                  {topic.practiceProblem.instructions.map((ins, i) => (
                    <li key={i}>{ins}</li>
                  ))}
                </ul>
              </div>

              {/* Code Playground */}
              <div className="mt-4">
                <CodeEditor
                  initialCode={topic.practiceProblem.starterCode}
                  language={language}
                  testCases={topic.practiceProblem.testCases}
                  hints={topic.practiceProblem.hints}
                  points={topic.practiceProblem.points}
                  onSuccess={handleCompleteTopic}
                />
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => router.push(`/roadmap/${language}`)}
              className="text-xs font-semibold text-slate-400 hover:text-white"
            >
              ← Back to Roadmap
            </button>

            <button
              onClick={handleCompleteTopic}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 text-xs font-extrabold text-slate-950 hover:from-emerald-400 hover:to-teal-500 transition-all shadow-xl"
            >
              <span>{nextTopic ? 'Proceed to Next Topic' : 'Finish Course'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
