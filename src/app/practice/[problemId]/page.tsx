'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProblemById } from '@/lib/data/practiceProblems';
import { useAuth } from '@/lib/context/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { CodeEditor } from '@/components/editor/CodeEditor';
import { CheckCircle2, ChevronLeft, Zap, Sparkles, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function PracticeProblemPage() {
  const params = useParams();
  const router = useRouter();
  const problemId = params.problemId as string;

  const { progress, markProblemSolved } = useAuth();
  const problem = getProblemById(problemId);

  if (!problem) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-xl font-bold">Problem Not Found</h1>
        <p className="text-xs text-slate-400 mt-1">The requested problem could not be found.</p>
        <button
          onClick={() => router.push('/practice')}
          className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold"
        >
          Return to Practice Bank
        </button>
      </div>
    );
  }

  const isSolved = progress.solvedProblemIds.includes(problem.id);

  const handleSuccess = () => {
    markProblemSolved(problem.id, problem.language, problem.points);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 max-w-5xl mx-auto w-full space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center justify-between">
            <Link
              href="/practice"
              className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" /> Back to Problem Bank
            </Link>

            {isSolved && (
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-950 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-800">
                <CheckCircle2 className="h-4 w-4" /> Solved Problem
              </span>
            )}
          </div>

          {/* Problem Header */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                  {problem.language} Problem Challenge
                </span>
                <h1 className="text-2xl font-extrabold text-white tracking-tight">{problem.title}</h1>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-950 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-800">
                  {problem.difficulty}
                </span>
                <span className="rounded-full bg-indigo-950 px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-800">
                  +{problem.points} XP
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{problem.description}</p>

            <div className="space-y-1 pt-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Instructions:</p>
              <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
                {problem.instructions.map((ins, idx) => (
                  <li key={idx}>{ins}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Code Playground */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="h-4 w-4 text-emerald-400 fill-current" /> Write Your Code Solution
            </h2>

            <CodeEditor
              initialCode={problem.starterCode}
              language={problem.language}
              testCases={problem.testCases}
              hints={problem.hints}
              points={problem.points}
              onSuccess={handleSuccess}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
