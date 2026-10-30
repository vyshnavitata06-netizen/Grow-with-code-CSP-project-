'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getAllPracticeProblems } from '@/lib/data/practiceProblems';
import { LANGUAGES } from '@/lib/data/languages';
import { useAuth } from '@/lib/context/AuthContext';
import { LanguageId } from '@/lib/types';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Code, CheckCircle2, Zap, Search, Filter, ArrowRight, Trophy } from 'lucide-react';

export default function PracticeCatalogPage() {
  const { progress } = useAuth();
  const allProblems = getAllPracticeProblems();

  const [selectedLang, setSelectedLang] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProblems = allProblems.filter((problem) => {
    if (selectedLang !== 'all' && problem.language !== selectedLang) return false;
    if (selectedDifficulty !== 'all' && problem.difficulty !== selectedDifficulty) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        problem.title.toLowerCase().includes(q) ||
        problem.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full space-y-6">
          {/* Header Banner */}
          <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 p-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
                  <Code className="h-4 w-4" /> Practice-Based Learning
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Programming Problem Bank
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-xl">
                  Test your coding knowledge with hands-on practice problems. Solve challenges to earn XP points and unlock achievements!
                </p>
              </div>

              <div className="flex items-center gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                <Trophy className="h-6 w-6 text-amber-400" />
                <div>
                  <div className="text-xs font-bold text-white">
                    {progress.solvedProblemIds.length} / {allProblems.length} Solved
                  </div>
                  <div className="text-[10px] text-slate-400">Total Solved Challenges</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-3xl border border-slate-800 backdrop-blur-md">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search problem title..."
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Language Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <span className="text-[11px] font-bold text-slate-400 shrink-0">Language:</span>
              <button
                onClick={() => setSelectedLang('all')}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  selectedLang === 'all'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              {LANGUAGES.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setSelectedLang(l.id)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1 ${
                    selectedLang === l.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{l.icon}</span> {l.name}
                </button>
              ))}
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[11px] font-bold text-slate-400">Level:</span>
              {['all', 'Easy', 'Medium', 'Hard'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`rounded-xl px-2.5 py-1 text-xs font-bold capitalize transition-all ${
                    selectedDifficulty === diff
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Problem Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProblems.map((prob) => {
              const isSolved = progress.solvedProblemIds.includes(prob.id);
              const langObj = LANGUAGES.find((l) => l.id === prob.language) || LANGUAGES[0];

              return (
                <div
                  key={prob.id}
                  className={`rounded-3xl border p-5 transition-all flex flex-col justify-between shadow-xl ${
                    isSolved
                      ? 'border-emerald-500/40 bg-slate-900/90'
                      : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{langObj.icon}</span>
                        <span className="text-xs font-semibold text-slate-400 uppercase">{prob.language}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                            prob.difficulty === 'Easy'
                              ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                              : prob.difficulty === 'Medium'
                              ? 'bg-amber-950 text-amber-400 border-amber-800'
                              : 'bg-red-950 text-red-400 border-red-800'
                          }`}
                        >
                          {prob.difficulty}
                        </span>

                        {isSolved && (
                          <span className="flex items-center gap-1 rounded-full bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-800">
                            <CheckCircle2 className="h-3 w-3" /> Solved
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white">{prob.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">{prob.description}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400">+{prob.points} XP Points</span>

                    <Link
                      href={`/practice/${prob.id}`}
                      className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-1.5 text-xs font-bold text-white hover:from-indigo-500 hover:to-blue-500 transition-all shadow-md"
                    >
                      <Zap className="h-3.5 w-3.5 fill-current" />
                      <span>{isSolved ? 'Solve Again' : 'Solve Problem'}</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
