'use client';

import React from 'react';
import { useAuth } from '@/lib/context/AuthContext';
import { Flame, Trophy, CheckCircle, Code, Clock, Sparkles } from 'lucide-react';

export const StatsOverview: React.FC = () => {
  const { user, progress } = useAuth();

  const completedTopicsCount = progress.completedTopicIds.length;
  const solvedProblemsCount = progress.solvedProblemIds.length;
  const dailyGoalPct = Math.min(Math.round(((progress.studyMinutesToday || 25) / (user?.dailyGoalMinutes || 30)) * 100), 100);

  const stats = [
    {
      title: 'Active Streak',
      value: `${user?.currentStreak || 3} Days`,
      subtitle: 'Keep coding daily!',
      icon: Flame,
      color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
      iconBg: 'bg-amber-500/20 text-amber-400',
    },
    {
      title: 'Topics Mastered',
      value: `${completedTopicsCount} / 14`,
      subtitle: 'Python Roadmap',
      icon: CheckCircle,
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
      iconBg: 'bg-emerald-500/20 text-emerald-400',
    },
    {
      title: 'Problems Solved',
      value: `${solvedProblemsCount} Challenges`,
      subtitle: 'Hands-on practice',
      icon: Code,
      color: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400',
      iconBg: 'bg-blue-500/20 text-blue-400',
    },
    {
      title: 'Total XP Points',
      value: `${user?.points || 120} XP`,
      subtitle: 'Level 2 Explorer',
      icon: Trophy,
      color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400',
      iconBg: 'bg-purple-500/20 text-purple-400',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 p-6 shadow-2xl">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
              <Sparkles className="h-4 w-4" /> Welcome back to your learning hub
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready to code today, <span className="bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent">{user?.name || 'Learner'}</span>?
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-xl">
              Goal: {user?.goal || 'Learn Python & Build Coding Skills'}. Continue your structured roadmap or solve a practice problem to boost your streak!
            </p>
          </div>

          {/* Daily Goal Progress */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 min-w-[220px] shadow-lg">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-indigo-400" /> Daily Target
              </span>
              <span className="text-indigo-400">{dailyGoalPct}%</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${dailyGoalPct}%` }}
              />
            </div>
            <p className="mt-2 text-[10px] text-slate-400 text-right">
              {progress.studyMinutesToday} / {user?.dailyGoalMinutes || 30} mins studied today
            </p>
          </div>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className={`rounded-2xl border bg-gradient-to-br ${item.color} p-4 shadow-sm backdrop-blur-md transition-transform hover:scale-[1.01]`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">{item.title}</span>
                <div className={`rounded-xl p-2 ${item.iconBg}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-2">
                <div className="text-xl font-extrabold text-white tracking-tight">{item.value}</div>
                <div className="text-[10px] font-medium text-slate-400 mt-0.5">{item.subtitle}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
