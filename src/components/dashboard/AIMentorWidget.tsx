'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Send, Bot, ArrowRight, MessageSquareCode } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const AIMentorWidget: React.FC = () => {
  const [quickQuestion, setQuickQuestion] = useState('');
  const router = useRouter();

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickQuestion.trim()) return;
    router.push(`/ai-mentor?q=${encodeURIComponent(quickQuestion)}`);
  };

  const samplePrompts = [
    'How do Python loops work with range()?',
    'What is the difference between list and tuple?',
    'Explain Object-Oriented Programming simply',
  ];

  return (
    <div className="rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-950/40 via-slate-900 to-indigo-950/40 p-6 shadow-xl backdrop-blur-md relative overflow-hidden">
      <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full bg-purple-500/10 blur-2xl" />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/30 border border-purple-500/40 text-purple-300">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-1.5">
              AI Learning Mentor <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" />
            </h2>
            <p className="text-[11px] text-slate-400">Ask any code question or concept explanation</p>
          </div>
        </div>

        <Link
          href="/ai-mentor"
          className="text-xs font-semibold text-purple-300 hover:text-purple-200 flex items-center gap-1"
        >
          <span>Open Full Chat</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <form onSubmit={handleAsk} className="relative mb-4">
        <input
          type="text"
          value={quickQuestion}
          onChange={(e) => setQuickQuestion(e.target.value)}
          placeholder="Ask GrowBot: e.g. 'Explain Python functions'..."
          className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 pr-10 shadow-inner"
        />
        <button
          type="submit"
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-xl bg-purple-600 text-white hover:bg-purple-500 transition-colors"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>

      <div className="space-y-1.5">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Quick Assistance Prompts:</p>
        <div className="flex flex-wrap gap-1.5">
          {samplePrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => router.push(`/ai-mentor?q=${encodeURIComponent(prompt)}`)}
              className="flex items-center gap-1 rounded-xl border border-purple-900/60 bg-purple-950/40 px-2.5 py-1 text-[11px] text-purple-200 hover:bg-purple-900/60 hover:border-purple-700 transition-colors"
            >
              <MessageSquareCode className="h-3 w-3 text-purple-400" />
              <span>{prompt}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
