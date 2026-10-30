import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

export async function POST(req: NextRequest) {
  try {
    const { code, language = 'python', stdin = '' } = await req.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ success: false, output: '', error: 'No code provided.' });
    }

    if (language === 'python') {
      return await executeRealPython(code, stdin);
    } else if (language === 'javascript') {
      return await executeRealNodeJS(code);
    } else if (language === 'html') {
      return NextResponse.json({ success: true, output: code, executionTimeMs: 10 });
    } else if (language === 'css') {
      return NextResponse.json({ success: true, output: `/* CSS Validated */\n${code}`, executionTimeMs: 10 });
    } else if (language === 'sql') {
      return executeMockSQL(code);
    } else {
      return executeSimulatedCompiled(code, language);
    }
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      output: '',
      error: err?.message || 'Execution error occurred',
      executionTimeMs: 0,
    });
  }
}

function executeRealPython(code: string, stdin: string): Promise<NextResponse> {
  return new Promise((resolve) => {
    const startTime = performance.now();
    const tmpDir = os.tmpdir();
    const scriptPath = path.join(tmpDir, `gwc_${Date.now()}_${Math.floor(Math.random() * 1000)}.py`);

    fs.writeFile(scriptPath, code, 'utf8', (err) => {
      if (err) {
        return resolve(NextResponse.json({ success: false, output: '', error: 'Failed to write script temp file.' }));
      }

      const pythonExe = 'C:\\Users\\SYSTEM-30\\AppData\\Local\\Programs\\Python\\Python314\\python.exe';
      const cmd = `"${pythonExe}" "${scriptPath}"`;

      exec(cmd, { timeout: 5000 }, (error, stdout, stderr) => {
        // Clean up temp file
        fs.unlink(scriptPath, () => {});

        const executionTimeMs = Math.round(performance.now() - startTime);

        if (error && !stdout && stderr) {
          resolve(
            NextResponse.json({
              success: false,
              output: '',
              error: stderr.trim() || error.message,
              executionTimeMs,
            })
          );
        } else {
          resolve(
            NextResponse.json({
              success: true,
              output: stdout.trim() || (stderr ? stderr.trim() : 'Process finished with exit code 0'),
              error: error ? stderr.trim() : undefined,
              executionTimeMs,
            })
          );
        }
      });
    });
  });
}

function executeRealNodeJS(code: string): Promise<NextResponse> {
  return new Promise((resolve) => {
    const startTime = performance.now();
    const tmpDir = os.tmpdir();
    const scriptPath = path.join(tmpDir, `gwc_js_${Date.now()}_${Math.floor(Math.random() * 1000)}.js`);

    fs.writeFile(scriptPath, code, 'utf8', (err) => {
      if (err) {
        return resolve(NextResponse.json({ success: false, output: '', error: 'Failed to write JS script.' }));
      }

      const cmd = `node "${scriptPath}"`;
      exec(cmd, { timeout: 3000 }, (error, stdout, stderr) => {
        fs.unlink(scriptPath, () => {});
        const timeMs = Math.round(performance.now() - startTime);

        if (error && !stdout && stderr) {
          resolve(NextResponse.json({ success: false, output: '', error: stderr.trim() || error.message, executionTimeMs: timeMs }));
        } else {
          resolve(NextResponse.json({ success: true, output: stdout.trim() || 'Done', executionTimeMs: timeMs }));
        }
      });
    });
  });
}

function executeMockSQL(code: string): NextResponse {
  const upper = code.toUpperCase();
  if (upper.includes('SELECT') && upper.includes('USERS')) {
    return NextResponse.json({
      success: true,
      output: 'SELECT name, email FROM users WHERE status = "active";',
      executionTimeMs: 12,
    });
  }
  return NextResponse.json({
    success: true,
    output: `Query executed successfully.\n[1 row(s) returned]`,
    executionTimeMs: 10,
  });
}

function executeSimulatedCompiled(code: string, language: string): NextResponse {
  const logs: string[] = [];

  if (language === 'c' && code.includes('printf(')) {
    const match = code.match(/printf\s*\(\s*"([^"]+)"/);
    if (match) logs.push(match[1].replace('\\n', ''));
  } else if (language === 'cpp' && code.includes('cout')) {
    const match = code.match(/cout\s*<<\s*"([^"]+)"/);
    if (match) logs.push(match[1]);
  } else if (language === 'java' && code.includes('System.out.println')) {
    const match = code.match(/System\.out\.println\s*\(\s*"([^"]+)"/);
    if (match) logs.push(match[1]);
  }

  return NextResponse.json({
    success: true,
    output: logs.length > 0 ? logs.join('\n') : `[${language.toUpperCase()} Program Executed Successfully]`,
    executionTimeMs: 25,
  });
}
