'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { Code2, ArrowRight, Lock, Mail, User, Sparkles } from 'lucide-react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(name || 'Code Explorer', email || 'user@growwithcode.com');
    router.push('/onboarding');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 p-3 shadow-xl shadow-indigo-500/25">
            <Code2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Create Free Account</h1>
          <p className="text-xs text-slate-400">Join Grow With Code to start your structured coding journey!</p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Learner"
                  className="w-full rounded-2xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-4 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full rounded-2xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-4 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-4 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 py-3 text-xs font-extrabold text-white hover:from-indigo-500 hover:to-blue-500 transition-all shadow-lg shadow-indigo-500/20"
            >
              <span>Create Account & Start Onboarding</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 pt-2">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-indigo-400 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
