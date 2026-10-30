'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { Code2, ArrowRight, Target, Clock, Zap, CheckCircle2 } from 'lucide-react';

export default function OnboardingPage() {
  const { user, completeOnboarding } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('Learn Python & Build AI Projects');
  const [experienceLevel, setExperienceLevel] = useState('Beginner');
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(30);

  const handleFinish = () => {
    completeOnboarding(goal, experienceLevel, dailyGoalMinutes);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 p-3 shadow-xl">
            <Code2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Personalize Your Path</h1>
          <p className="text-xs text-slate-400">Step {step} of 3: Let's set up your personalized coding roadmap.</p>

          {/* Step Progress Bar */}
          <div className="flex gap-2 justify-center pt-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step >= s ? 'w-12 bg-indigo-500' : 'w-4 bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Question Step 1: Goal */}
        {step === 1 && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl space-y-5 animate-in fade-in">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-indigo-400" /> What is your primary learning goal?
              </h2>
              <p className="text-xs text-slate-400">This helps us recommend the best starting topic.</p>
            </div>

            <div className="space-y-2">
              {[
                'Learn Python & Build AI Projects',
                'Build Interactive Websites with JS, HTML & CSS',
                'Master Fundamentals for College/School Coursework',
                'Prepare for Coding Interviews & Career Switch',
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => setGoal(option)}
                  className={`w-full flex items-center justify-between rounded-2xl border p-4 text-xs font-semibold transition-all ${
                    goal === option
                      ? 'border-indigo-500 bg-indigo-950/40 text-white shadow-lg'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <span>{option}</span>
                  {goal === option && <CheckCircle2 className="h-4 w-4 text-indigo-400" />}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-3 text-xs font-bold text-white hover:bg-indigo-500 transition-colors"
            >
              <span>Next Step</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Question Step 2: Experience */}
        {step === 2 && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl space-y-5 animate-in fade-in">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-400" /> What is your coding experience?
              </h2>
              <p className="text-xs text-slate-400">We will adjust lesson pacing based on your background.</p>
            </div>

            <div className="space-y-2">
              {[
                { title: 'Beginner', desc: 'First time coding, eager to learn step-by-step.' },
                { title: 'Intermediate', desc: 'Know basics like variables and loops.' },
                { title: 'Advanced', desc: 'Familiar with programming, looking to master new languages.' },
              ].map((item) => (
                <button
                  key={item.title}
                  onClick={() => setExperienceLevel(item.title)}
                  className={`w-full flex flex-col items-start rounded-2xl border p-4 text-left transition-all ${
                    experienceLevel === item.title
                      ? 'border-indigo-500 bg-indigo-950/40 text-white shadow-lg'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xs font-bold text-white">{item.title}</span>
                  <span className="text-[11px] text-slate-400 mt-0.5">{item.desc}</span>
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 rounded-2xl border border-slate-800 bg-slate-950 py-3 text-xs font-bold text-slate-400 hover:text-white"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-2/3 flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-3 text-xs font-bold text-white hover:bg-indigo-500 transition-colors"
              >
                <span>Next Step</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Question Step 3: Commitment */}
        {step === 3 && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl space-y-5 animate-in fade-in">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Clock className="h-5 w-5 text-cyan-400" /> How much time can you commit daily?
              </h2>
              <p className="text-xs text-slate-400">Consistency is the secret to becoming a great programmer.</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[15, 30, 60].map((mins) => (
                <button
                  key={mins}
                  onClick={() => setDailyGoalMinutes(mins)}
                  className={`flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition-all ${
                    dailyGoalMinutes === mins
                      ? 'border-indigo-500 bg-indigo-950/40 text-indigo-300 font-bold shadow-lg'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-lg font-extrabold text-white">{mins}</span>
                  <span className="text-[10px] text-slate-400">Mins / Day</span>
                </button>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setStep(2)}
                className="w-1/3 rounded-2xl border border-slate-800 bg-slate-950 py-3 text-xs font-bold text-slate-400 hover:text-white"
              >
                Back
              </button>
              <button
                onClick={handleFinish}
                className="w-2/3 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3 text-xs font-extrabold text-slate-950 hover:from-emerald-400 hover:to-teal-500 transition-all shadow-lg"
              >
                <span>Launch My Dashboard</span>
                <CheckCircle2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
