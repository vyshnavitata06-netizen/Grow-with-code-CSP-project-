'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { AIMessage } from '@/lib/types';
import { Bot, Send, Sparkles, User, Code2, RefreshCw, MessageSquare, Lightbulb } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';

function AIMentorContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCode = searchParams.get('code') || '';

  const { user, progress } = useAuth();
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: `Hello ${user?.name || 'Learner'}! I am **GrowBot**, your personal AI Programming Mentor 🤖.\n\nI can help you understand programming concepts, debug your code, suggest practice problems, and guide your learning roadmap for **${progress.activeLanguage.toUpperCase()}**.\n\nWhat would you like to learn today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputQuery, setInputQuery] = useState(initialQuery);
  const [inputCode, setInputCode] = useState(initialCode);
  const [showCodeInput, setShowCodeInput] = useState(!!initialCode);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (initialQuery) {
      handleSend(initialQuery, initialCode);
    }
  }, [initialQuery]);

  const handleSend = async (queryToSend?: string, codeToSend?: string) => {
    const text = queryToSend || inputQuery;
    const code = codeToSend !== undefined ? codeToSend : inputCode;

    if (!text.trim() && !code.trim()) return;

    const userMsg: AIMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      codeSnippet: code || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setInputCode('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/ai/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          code,
          language: progress.activeLanguage,
        }),
      });

      const data = await response.json();
      const aiMsg: AIMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.text || 'I am ready to help you learn!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      const aiMsg: AIMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `### 🤖 GrowBot Mentor\n\nI noticed an issue connecting to the AI server, but here is a quick tip: Keep practicing small steps on your **${progress.activeLanguage.toUpperCase()}** roadmap!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const samplePrompts = [
    'Explain Python Variables & Data Types with examples',
    'How do if/else statements work in Python?',
    'What is the difference between list and dictionary?',
    'Give me a beginner Python practice problem',
  ];

  return (
    <main className="flex-1 p-4 sm:p-6 max-w-5xl mx-auto w-full flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-600/30 border border-purple-500/40 text-purple-300 shadow-lg">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
              AI Mentor Chat <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" />
            </h1>
            <p className="text-xs text-slate-400">Ask questions, request code debugging, or get personalized topic guidance</p>
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Chat History Box */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 scrollbar-thin scrollbar-thumb-slate-800">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-3xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl font-bold text-xs shadow-md ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-br from-indigo-500 to-blue-600 text-white'
                  : 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white border border-purple-400/30'
              }`}
            >
              {msg.sender === 'user' ? 'You' : <Bot className="h-5 w-5" />}
            </div>

            {/* Message Bubble */}
            <div
              className={`rounded-3xl p-4 text-xs sm:text-sm leading-relaxed shadow-lg ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white border border-indigo-500/50'
                  : 'bg-slate-900/90 border border-slate-800 text-slate-200'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>

              {msg.codeSnippet && (
                <div className="mt-3 rounded-2xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-emerald-400 overflow-x-auto">
                  <pre>{msg.codeSnippet}</pre>
                </div>
              )}

              <div className={`mt-2 text-[10px] ${msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-500'} text-right`}>
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 max-w-3xl">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-purple-600/30 border border-purple-500/40 text-purple-300">
              <Bot className="h-5 w-5 animate-spin" />
            </div>
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 text-xs text-slate-400 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" />
              <span>GrowBot is thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      <div className="mb-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Lightbulb className="h-3 w-3 text-amber-400" /> Prompts:
        </span>
        {samplePrompts.map((p) => (
          <button
            key={p}
            onClick={() => handleSend(p)}
            className="rounded-xl border border-purple-900/50 bg-purple-950/40 px-2.5 py-1 text-[11px] text-purple-200 hover:bg-purple-900/60 transition-colors shrink-0"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Code Input Toggle */}
      {showCodeInput && (
        <div className="mb-2 relative">
          <textarea
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Paste code snippet to debug or ask about..."
            className="w-full rounded-2xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-200 focus:border-purple-500 focus:outline-none min-h-[70px]"
          />
        </div>
      )}

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="relative flex items-center"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask GrowBot anything about programming..."
          className="w-full rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-3.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none pr-28 shadow-xl"
        />

        <div className="absolute right-2 flex items-center gap-1">
          <button
            type="button"
            onClick={() => setShowCodeInput(!showCodeInput)}
            className={`p-2 rounded-xl text-xs transition-colors ${
              showCodeInput ? 'bg-purple-900 text-purple-300' : 'text-slate-400 hover:text-white'
            }`}
            title="Toggle Code Input"
          >
            <Code2 className="h-4 w-4" />
          </button>

          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-3.5 py-2 text-xs font-bold text-white hover:from-purple-500 hover:to-indigo-500 transition-all shadow-md"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Send</span>
          </button>
        </div>
      </form>
    </main>
  );
}

export default function AIMentorPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading AI Mentor...</div>}>
          <AIMentorContent />
        </Suspense>
      </div>
    </div>
  );
}
