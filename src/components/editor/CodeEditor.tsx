'use client';

import React, { useState } from 'react';
import { runCode, ExecutionResult } from '@/lib/codeRunner';
import { LanguageId, PracticeTestCase } from '@/lib/types';
import { Play, CheckCircle2, XCircle, RotateCcw, Copy, Sparkles, Lightbulb, Terminal, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CodeEditorProps {
  initialCode: string;
  language: LanguageId;
  testCases?: PracticeTestCase[];
  hints?: string[];
  points?: number;
  onSuccess?: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode,
  language,
  testCases = [],
  hints = [],
  points = 20,
  onSuccess,
}) => {
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [testResults, setTestResults] = useState<{ id: string; passed: boolean; actual: string; expected: string }[]>([]);
  const [activeTab, setActiveTab] = useState<'output' | 'testcases' | 'hints'>('output');
  const [activeHintIndex, setActiveHintIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const handleRun = async () => {
    setIsRunning(true);
    setActiveTab('output');
    try {
      const res = await runCode(code, language);
      setResult(res);

      // Evaluate against test cases
      if (testCases.length > 0) {
        const evaluated = testCases.map((tc) => {
          const actualOutput = (res.output || '').trim().replace(/\r\n/g, '\n');
          const expectedOutput = (tc.expectedOutput || '').trim().replace(/\r\n/g, '\n');
          const passed = actualOutput === expectedOutput || actualOutput.includes(expectedOutput);
          return {
            id: tc.id,
            passed,
            actual: actualOutput,
            expected: expectedOutput,
          };
        });
        setTestResults(evaluated);
      }
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    setIsRunning(true);
    setActiveTab('testcases');
    try {
      const res = await runCode(code, language);
      setResult(res);

      let allPassed = true;
      if (testCases.length > 0) {
        const evaluated = testCases.map((tc) => {
          const actualOutput = (res.output || '').trim().replace(/\r\n/g, '\n');
          const expectedOutput = (tc.expectedOutput || '').trim().replace(/\r\n/g, '\n');
          const passed = actualOutput === expectedOutput || actualOutput.includes(expectedOutput);
          if (!passed) allPassed = false;
          return {
            id: tc.id,
            passed,
            actual: actualOutput,
            expected: expectedOutput,
          };
        });
        setTestResults(evaluated);

        if (allPassed && onSuccess) {
          onSuccess();
        }
      } else {
        if (res.success && onSuccess) {
          onSuccess();
        }
      }
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    setResult(null);
    setTestResults([]);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lineNumbers = code.split('\n').map((_, i) => i + 1);

  return (
    <div className="flex flex-col rounded-3xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
      {/* Editor Toolbar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-3 w-3 rounded-full bg-red-500/80" />
          <span className="flex h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="flex h-3 w-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
            {language} Interactive Playground
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-850 px-2.5 py-1 text-xs text-slate-300 hover:bg-slate-800 transition-colors"
          >
            <Copy className="h-3.5 w-3.5" />
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-850 px-2.5 py-1 text-xs text-slate-300 hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={() => router.push(`/ai-mentor?code=${encodeURIComponent(code)}`)}
            className="flex items-center gap-1.5 rounded-xl bg-purple-900/60 border border-purple-700/50 px-3 py-1 text-xs font-bold text-purple-200 hover:bg-purple-800 transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            <span>AI Debug</span>
          </button>
        </div>
      </div>

      {/* Code Input Window */}
      <div className="relative flex min-h-[240px] max-h-[400px] bg-slate-950 font-mono text-sm leading-6">
        {/* Line Numbers */}
        <div className="select-none py-3 px-3 text-right text-slate-600 border-r border-slate-900 bg-slate-950/50 min-w-[40px]">
          {lineNumbers.map((n) => (
            <div key={n}>{n}</div>
          ))}
        </div>

        {/* Text Area */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="w-full resize-none bg-transparent py-3 px-4 text-slate-200 font-mono focus:outline-none scrollbar-thin scrollbar-thumb-slate-800"
        />
      </div>

      {/* Execution Action Bar */}
      <div className="flex flex-wrap items-center justify-between border-t border-b border-slate-800 bg-slate-900/80 px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('output')}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${
              activeTab === 'output' ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="h-3.5 w-3.5" /> Console Output
          </button>

          {testCases.length > 0 && (
            <button
              onClick={() => setActiveTab('testcases')}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${
                activeTab === 'testcases' ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              <CheckCircle2 className="h-3.5 w-3.5" /> Test Cases ({testResults.filter((t) => t.passed).length}/{testCases.length})
            </button>
          )}

          {hints.length > 0 && (
            <button
              onClick={() => setActiveTab('hints')}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${
                activeTab === 'hints' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-amber-300'
              }`}
            >
              <Lightbulb className="h-3.5 w-3.5 text-amber-400" /> Hints ({hints.length})
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-bold text-white hover:bg-slate-700 transition-all disabled:opacity-50"
          >
            <Play className="h-3.5 w-3.5 fill-current text-emerald-400" />
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </button>

          <button
            onClick={handleSubmit}
            disabled={isRunning}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 text-xs font-bold text-slate-950 hover:from-emerald-400 hover:to-teal-500 transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Submit (+{points} XP)</span>
          </button>
        </div>
      </div>

      {/* Output / Test Cases / Hints Panel */}
      <div className="bg-slate-950 p-4 min-h-[120px] max-h-[220px] overflow-y-auto">
        {activeTab === 'output' && (
          <div>
            {!result ? (
              <div className="text-xs text-slate-500 italic flex items-center gap-2 py-4 justify-center">
                <Terminal className="h-4 w-4" /> Click "Run Code" or "Submit" to see stdout output
              </div>
            ) : (
              <div className="font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-900 pb-1">
                  <span>Status: {result.success ? '✅ Success' : '❌ Error'}</span>
                  <span>Time: {result.executionTimeMs} ms</span>
                </div>

                {result.output && (
                  <pre className="text-slate-200 whitespace-pre-wrap leading-relaxed">{result.output}</pre>
                )}

                {result.error && (
                  <div className="rounded-xl border border-red-500/30 bg-red-950/40 p-3 text-red-300 flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
                    <pre className="whitespace-pre-wrap">{result.error}</pre>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'testcases' && (
          <div className="space-y-3">
            {testResults.length === 0 ? (
              <div className="text-xs text-slate-400 text-center py-4">
                Run or Submit code to evaluate test cases.
              </div>
            ) : (
              testResults.map((tc, idx) => (
                <div
                  key={tc.id}
                  className={`rounded-2xl border p-3 text-xs ${
                    tc.passed
                      ? 'border-emerald-500/30 bg-emerald-950/30 text-emerald-300'
                      : 'border-red-500/30 bg-red-950/30 text-red-300'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold mb-1">
                    <span className="flex items-center gap-1.5">
                      {tc.passed ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <XCircle className="h-4 w-4 text-red-400" />}
                      Test Case #{idx + 1}
                    </span>
                    <span className="text-[10px] uppercase font-bold">{tc.passed ? 'PASSED' : 'FAILED'}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2 font-mono text-[11px] bg-slate-950/80 p-2 rounded-xl">
                    <div>
                      <span className="text-slate-500 block text-[9px]">EXPECTED OUTPUT:</span>
                      <span className="text-slate-300">{tc.expected}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px]">YOUR OUTPUT:</span>
                      <span className={tc.passed ? 'text-emerald-400' : 'text-red-400'}>{tc.actual || '(empty)'}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'hints' && (
          <div className="space-y-3">
            {hints.length === 0 ? (
              <p className="text-xs text-slate-400">No hints available for this problem.</p>
            ) : (
              <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-4 text-xs text-amber-200 space-y-2">
                <div className="flex items-center justify-between font-bold">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <Lightbulb className="h-4 w-4" /> Hint #{activeHintIndex + 1} of {hints.length}
                  </span>
                  {hints.length > 1 && (
                    <button
                      onClick={() => setActiveHintIndex((prev) => (prev + 1) % hints.length)}
                      className="text-[10px] font-bold underline text-amber-300"
                    >
                      Next Hint →
                    </button>
                  )}
                </div>
                <p className="leading-relaxed">{hints[activeHintIndex]}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
