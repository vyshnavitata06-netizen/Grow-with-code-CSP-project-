'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  GitFork,
  Code,
  Sparkles,
  Award,
  UserCheck,
  Flame,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';
import { LANGUAGES } from '@/lib/data/languages';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { progress } = useAuth();

  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Structured Roadmap',
      href: '/roadmap',
      icon: GitFork,
    },
    {
      name: 'Practice Problems',
      href: '/practice',
      icon: Code,
    },
    {
      name: 'AI Mentor',
      href: '/ai-mentor',
      icon: Sparkles,
      badge: 'AI Powered',
    },
    {
      name: 'Certificates',
      href: '/certificates',
      icon: Award,
    },
    {
      name: 'My Profile & Badges',
      href: '/profile',
      icon: UserCheck,
    },
  ];

  const activeLang = LANGUAGES.find((l) => l.id === progress.activeLanguage) || LANGUAGES[0];
  const activePct = progress.languageProgress[progress.activeLanguage] || 0;

  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-slate-800 bg-slate-950/60 p-4 min-h-[calc(100vh-4rem)]">
      
      {/* Navigation Links */}
      <div className="space-y-1">
        <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
          Platform Menu
        </p>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600/30 to-blue-600/20 text-white font-semibold border border-indigo-500/30 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-4 w-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="rounded-full bg-purple-900/60 px-2 py-0.5 text-[9px] font-bold text-purple-300 border border-purple-700/50">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Active Language Card in Sidebar */}
      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/80 p-3.5 shadow-inner">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">{activeLang.icon}</span>
            <div>
              <p className="text-xs font-bold text-white">{activeLang.name} Track</p>
              <p className="text-[10px] text-slate-400">{activeLang.totalTopics} Topics Roadmap</p>
            </div>
          </div>
          <span className="text-xs font-bold text-indigo-400">{activePct}%</span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 transition-all duration-500"
            style={{ width: `${Math.max(activePct, 5)}%` }}
          />
        </div>

        <Link
          href={`/roadmap/${progress.activeLanguage}`}
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-indigo-600/20 py-2 text-[11px] font-semibold text-indigo-300 hover:bg-indigo-600/30 transition-colors border border-indigo-500/30"
        >
          <Zap className="h-3.5 w-3.5 text-indigo-400" />
          <span>Continue Roadmap</span>
        </Link>
      </div>

      {/* Footer Info */}
      <div className="mt-auto pt-4 border-t border-slate-900 text-center">
        <div className="flex items-center justify-center gap-1 text-[10px] font-semibold text-slate-500">
          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
          <span>Grow With Code v1.0 • Next.js</span>
        </div>
      </div>
    </aside>
  );
};
