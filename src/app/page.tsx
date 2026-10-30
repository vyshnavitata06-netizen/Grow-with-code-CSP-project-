'use client';

import React from 'react';
import Link from 'next/link';
import {
  Code2,
  Sparkles,
  ArrowRight,
  GitFork,
  Terminal,
  Award,
  CheckCircle2,
  Bot,
  Flame,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { LANGUAGES } from '@/lib/data/languages';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 p-2 shadow-lg shadow-indigo-500/25">
              <Code2 className="h-6 w-6 text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
              Grow With Code
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-500/20 hover:from-indigo-500 hover:to-blue-500 transition-all hover:scale-[1.02]"
            >
              <span>Launch Dashboard</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/60 px-4 py-1.5 text-xs font-bold text-indigo-300 shadow-inner">
            <Sparkles className="h-4 w-4 text-indigo-400 animate-pulse" />
            <span>Interactive Web-Based Programming Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Learn Programming <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Step-by-Step</span> with Hands-On Practice
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Grow With Code provides a structured learning roadmap, interactive code runner, practice problem bank, progress tracking, and an integrated AI Mentor to help you master coding.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 px-8 py-4 text-sm font-extrabold text-white shadow-xl shadow-indigo-500/30 hover:scale-[1.03] transition-all"
            >
              <Zap className="h-5 w-5 fill-current" />
              <span>Start Learning Free</span>
            </Link>

            <Link
              href="/roadmap"
              className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/90 px-8 py-4 text-sm font-bold text-slate-200 hover:bg-slate-850 hover:text-white transition-all shadow-lg"
            >
              <GitFork className="h-5 w-5 text-indigo-400" />
              <span>Explore Python Roadmap</span>
            </Link>
          </div>

          {/* Quick Language Pills */}
          <div className="pt-10">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Supported Programming Languages:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {LANGUAGES.map((l) => (
                <div
                  key={l.id}
                  className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-1.5 text-xs font-semibold text-slate-300 shadow-sm"
                >
                  <span>{l.icon}</span>
                  <span>{l.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-16 bg-slate-900/40 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Everything You Need to Become a Confident Coder
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Designed for absolute beginners and intermediate students with structured guidance every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                <GitFork className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Structured Topic Roadmaps</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Step-by-step learning path covering 14 core Python topics from basic variables to Object-Oriented Programming (OOP), plus roadmaps for 7 other languages.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
                <Terminal className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Interactive Code Playground</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Run code live directly in your browser with instant stdout output, automated test cases, and error tracebacks.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
                <Bot className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Integrated AI Learning Mentor</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Get intelligent explanations, code debugging guidance, practice hints, and next-step recommendations powered by GrowBot AI.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-600/20 text-amber-400 border border-amber-500/30">
                <Flame className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Streaks & Gamification</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Earn XP points, unlock badges, maintain daily study streaks, and monitor your progress across all language roadmaps.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Verifiable Certificates</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Earn downloadable digital certificates of completion with custom verification codes upon completing a language track.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Responsive & Beginner Friendly</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clean, modern interface designed to work smoothly across desktops, tablets, and mobile devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-indigo-400" />
            <span className="font-bold text-white">Grow With Code</span>
            <span>© 2026. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
            <Link href="/roadmap" className="hover:text-white">Roadmap</Link>
            <Link href="/practice" className="hover:text-white">Practice</Link>
            <Link href="/ai-mentor" className="hover:text-white">AI Mentor</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
