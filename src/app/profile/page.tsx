'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/context/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { UserCheck, Award, Flame, Trophy, Clock, CheckCircle2, Save, Sparkles } from 'lucide-react';

export default function ProfilePage() {
  const { user, progress, badges, completeOnboarding } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [goal, setGoal] = useState(user?.goal || 'Learn Python & Build Projects');
  const [experienceLevel, setExperienceLevel] = useState(user?.experienceLevel || 'Beginner');
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(user?.dailyGoalMinutes || 30);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    completeOnboarding(goal, experienceLevel, Number(dailyGoalMinutes));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full space-y-6">
          {/* Header Banner */}
          <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 p-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-2xl font-bold text-white shadow-xl">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold text-white tracking-tight">{user?.name || 'Learner'}</h1>
                  <p className="text-xs text-slate-400">{user?.email || 'user@growwithcode.com'} • Member since {user?.joinedDate || '2026'}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-2xl bg-amber-500/10 px-4 py-2 text-xs font-bold text-amber-400 border border-amber-500/30">
                  <Flame className="h-4 w-4 fill-current" /> {user?.currentStreak || 3} Day Streak
                </span>
                <span className="flex items-center gap-1.5 rounded-2xl bg-indigo-500/10 px-4 py-2 text-xs font-bold text-indigo-300 border border-indigo-500/30">
                  <Trophy className="h-4 w-4" /> {user?.points || 120} XP
                </span>
              </div>
            </div>
          </div>

          {/* Badges & Achievements */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-400" /> Badges & Achievements
                </h2>
                <p className="text-xs text-slate-400">Unlock badges by reaching coding milestones</p>
              </div>

              <span className="text-xs font-bold text-indigo-400">
                {progress.unlockedBadges.length} / {badges.length} Unlocked
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {badges.map((badge) => {
                const isUnlocked = progress.unlockedBadges.includes(badge.id);

                return (
                  <div
                    key={badge.id}
                    className={`rounded-2xl border p-4 transition-all flex items-start gap-3 ${
                      isUnlocked
                        ? 'border-amber-500/40 bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-950 shadow-lg'
                        : 'border-slate-800 bg-slate-950/60 opacity-60'
                    }`}
                  >
                    <div className="text-3xl shrink-0">{badge.icon}</div>

                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold text-white">{badge.title}</h3>
                        {isUnlocked && (
                          <span className="text-[9px] font-bold text-amber-400 bg-amber-950/60 border border-amber-800 px-1.5 py-0.5 rounded-md">
                            Unlocked
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{badge.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Edit Profile & Learning Settings Form */}
          <form onSubmit={handleSave} className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-indigo-400" /> Learning Settings & Preferences
                </h2>
                <p className="text-xs text-slate-400">Customize your study goals and daily targets</p>
              </div>

              {savedSuccess && (
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> Preferences Saved!
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Learning Goal</label>
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Experience Level</label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-white focus:border-indigo-500 focus:outline-none"
                >
                  <option value="Beginner">Beginner (New to Coding)</option>
                  <option value="Intermediate">Intermediate (Some Experience)</option>
                  <option value="Advanced">Advanced (Building Projects)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Daily Study Target (Minutes)</label>
                <input
                  type="number"
                  value={dailyGoalMinutes}
                  onChange={(e) => setDailyGoalMinutes(Number(e.target.value))}
                  className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition-colors shadow-lg"
              >
                <Save className="h-4 w-4" /> Save Profile Preferences
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
