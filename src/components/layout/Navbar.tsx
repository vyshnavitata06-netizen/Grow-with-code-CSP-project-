'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { LANGUAGES } from '@/lib/data/languages';
import {
  Code2,
  Sparkles,
  Flame,
  Award,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  BookOpen,
  Terminal,
  Trophy
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, progress, setActiveLanguage, logout } = useAuth();
  const pathname = usePathname();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeLangInfo = LANGUAGES.find((l) => l.id === progress.activeLanguage) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-slate-400 hover:text-white md:hidden"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 p-2 shadow-lg shadow-indigo-500/25 transition-transform group-hover:scale-105">
              <Code2 className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
                Grow With Code
              </span>
              <span className="text-[10px] font-semibold text-indigo-400 -mt-1 tracking-wider uppercase">
                Learn • Practice • Excel
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Language Switcher (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 px-3.5 py-1.5 text-sm font-medium text-slate-200 hover:border-slate-700 hover:bg-slate-850 transition-all shadow-inner"
            >
              <span className="text-base">{activeLangInfo.icon}</span>
              <span>{activeLangInfo.name} Roadmap</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>

            {isLangDropdownOpen && (
              <div className="absolute top-full mt-2 w-64 rounded-2xl border border-slate-800 bg-slate-900 p-2 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Select Programming Path
                </div>
                <div className="space-y-1 mt-1 max-h-72 overflow-y-auto">
                  {LANGUAGES.map((lang) => {
                    const pct = progress.languageProgress[lang.id] || 0;
                    return (
                      <button
                        key={lang.id}
                        onClick={() => {
                          setActiveLanguage(lang.id);
                          setIsLangDropdownOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-left transition-colors ${
                          progress.activeLanguage === lang.id
                            ? 'bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30'
                            : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{lang.icon}</span>
                          <div>
                            <div className="text-xs font-semibold">{lang.name}</div>
                            <div className="text-[10px] text-slate-400">{lang.totalTopics} Topics</div>
                          </div>
                        </div>
                        {pct > 0 && (
                          <span className="rounded-md bg-indigo-950 px-2 py-0.5 text-[10px] font-bold text-indigo-400 border border-indigo-800/50">
                            {pct}%
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/ai-mentor"
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-purple-500/20 hover:opacity-95 transition-all hover:scale-[1.02]"
          >
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span>AI Mentor</span>
          </Link>
        </div>

        {/* Right: Stats & Profile */}
        <div className="flex items-center gap-3">
          {/* Streak */}
          <div className="hidden sm:flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 shadow-sm">
            <Flame className="h-4 w-4 text-amber-500 fill-amber-500 animate-bounce" />
            <span>{user?.currentStreak || 3} Day Streak</span>
          </div>

          {/* Points */}
          <div className="hidden sm:flex items-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-300">
            <Trophy className="h-4 w-4 text-indigo-400" />
            <span>{user?.points || 120} pts</span>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2 rounded-xl p-1 hover:bg-slate-800 transition-all border border-slate-800"
            >
              {/* Avatar */}
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 font-bold text-white text-xs shadow-md">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400 hidden sm:block" />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-slate-800 bg-slate-900 p-2 shadow-2xl backdrop-blur-xl z-50">
                <div className="px-3 py-2 border-b border-slate-800">
                  <p className="text-sm font-semibold text-white">{user?.name || 'Learner'}</p>
                  <p className="text-xs text-slate-400 truncate">{user?.email || 'user@growwithcode.com'}</p>
                </div>
                <div className="py-1 space-y-0.5">
                  <Link
                    href="/profile"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                  >
                    <User className="h-4 w-4 text-indigo-400" />
                    <span>My Profile & Badges</span>
                  </Link>
                  <Link
                    href="/certificates"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                  >
                    <Award className="h-4 w-4 text-amber-400" />
                    <span>Certificates</span>
                  </Link>
                </div>
                <div className="pt-1 border-t border-slate-800">
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      logout();
                    }}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-900 px-4 py-4 space-y-3">
          <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">Current Language:</span>
            <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
              <span>{activeLangInfo.icon}</span> {activeLangInfo.name}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-xl bg-slate-800 px-3 py-2 text-xs text-slate-200"
            >
              <BookOpen className="h-4 w-4 text-indigo-400" /> Dashboard
            </Link>
            <Link
              href="/roadmap"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-xl bg-slate-800 px-3 py-2 text-xs text-slate-200"
            >
              <Terminal className="h-4 w-4 text-emerald-400" /> Roadmap
            </Link>
            <Link
              href="/practice"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-xl bg-slate-800 px-3 py-2 text-xs text-slate-200"
            >
              <Code2 className="h-4 w-4 text-blue-400" /> Practice
            </Link>
            <Link
              href="/ai-mentor"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-xl bg-purple-900/50 px-3 py-2 text-xs text-purple-200 border border-purple-700/50"
            >
              <Sparkles className="h-4 w-4 text-purple-400" /> AI Mentor
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
