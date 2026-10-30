'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { Code2, ArrowRight, Lock, Mail, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('alex@growwithcode.com');
  const [password, setPassword] = useState('password123');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login('Alex Learner', email);
    router.push('/dashboard');
  };

  const handleGuestLogin = () => {
    login('Guest Explorer', 'guest@growwithcode.com');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 p-3 shadow-xl shadow-indigo-500/25">
            <Code2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Grow With Code</h1>
          <p className="text-xs text-slate-400">Welcome back! Log in to continue your learning path.</p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  className="w-full rounded-2xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-4 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 py-3 text-xs font-extrabold text-white hover:from-indigo-500 hover:to-blue-500 transition-all shadow-lg shadow-indigo-500/20"
            >
              <span>Log In to Account</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">OR</span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          <button
            onClick={handleGuestLogin}
            className="w-full flex items-center justify-center gap-2 rounded-2xl border border-indigo-500/30 bg-indigo-950/40 py-2.5 text-xs font-bold text-indigo-300 hover:bg-indigo-900/60 transition-colors"
          >
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span>Continue as Guest Demo User</span>
          </button>

          <p className="text-center text-xs text-slate-400 pt-2">
            Don't have an account?{' '}
            <Link href="/signup" className="font-bold text-indigo-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
