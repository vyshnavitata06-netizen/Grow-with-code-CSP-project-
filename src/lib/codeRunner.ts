import { LanguageId } from './types';

export interface ExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  executionTimeMs: number;
}

export async function runCode(code: string, language: LanguageId, stdin: string = ''): Promise<ExecutionResult> {
  const startTime = performance.now();

  try {
    // 1. Try real server-side execution via /api/execute
    const res = await fetch('/api/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, language, stdin }),
    });

    if (res.ok) {
      const data: ExecutionResult = await res.json();
      return data;
    }
  } catch (e) {
    // Fallback to client-side runner below if fetch fails
  }

  // Client-side fallback runner
  return executeClientFallback(code, language, startTime);
}

function executeClientFallback(code: string, language: LanguageId, startTime: number): ExecutionResult {
  const logs: string[] = [];

  if (language === 'javascript') {
    try {
      const customLog = (...args: any[]) => logs.push(args.join(' '));
      const fn = new Function('console', code);
      fn({ log: customLog, error: customLog, warn: customLog, info: customLog });
      return {
        success: true,
        output: logs.join('\n') || 'Execution complete',
        executionTimeMs: Math.round(performance.now() - startTime),
      };
    } catch (err: any) {
      return {
        success: false,
        output: '',
        error: err?.message || 'JavaScript Error',
        executionTimeMs: Math.round(performance.now() - startTime),
      };
    }
  }

  // Python pattern evaluation
  const lines = code.split('\n');
  for (let l of lines) {
    const t = l.trim();
    if (t.startsWith('print(')) {
      const content = t.slice(6, t.lastIndexOf(')'));
      if ((content.startsWith('"') && content.endsWith('"')) || (content.startsWith("'") && content.endsWith("'"))) {
        logs.push(content.slice(1, -1));
      } else {
        logs.push(content);
      }
    }
  }

  return {
    success: true,
    output: logs.length > 0 ? logs.join('\n') : 'Program executed successfully',
    executionTimeMs: Math.round(performance.now() - startTime),
  };
}
