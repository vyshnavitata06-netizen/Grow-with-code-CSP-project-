import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: NextRequest) {
  try {
    const { prompt, code, language = 'python', history = [] } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are GrowBot, the AI Programming Mentor for "Grow With Code", a beginner-friendly web platform.
Your job is to explain programming concepts clearly, debug code, offer step-by-step guidance, and recommend next learning topics.
Keep your responses encouraging, formatted in concise Markdown, and easy for beginners to understand.
Language context: ${language}.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `${systemInstruction}\nUser Question: ${prompt}\n${code ? `User Code Snippet:\n\`\`\`${language}\n${code}\n\`\`\`` : ''}` }] }
        ],
      });

      const text = response.text || 'I am ready to help you learn coding!';
      return NextResponse.json({ text });
    }

    // Fallback AI Mentor Engine when API Key is not configured
    let reply = `### 🤖 GrowBot AI Mentor\n\n`;

    const lower = (prompt || '').toLowerCase();

    if (lower.includes('loop') || lower.includes('for') || lower.includes('while')) {
      reply += `Loops in **${language.toUpperCase()}** repeat a block of code multiple times.\n\n` +
        `**Key Syntax Example:**\n` +
        `\`\`\`${language}\n` +
        `for i in range(1, 6):\n` +
        `    print(f"Step {i}")\n` +
        `\`\`\`\n\n` +
        `**Tip:** Use a \`for\` loop when you know how many times to repeat, and a \`while\` loop when repeating until a condition changes!`;
    } else if (lower.includes('function') || lower.includes('def') || lower.includes('return')) {
      reply += `Functions are reusable blocks of code declared with \`def\` in Python.\n\n` +
        `\`\`\`python\n` +
        `def multiply(a, b):\n` +
        `    return a * b\n\n` +
        `print(multiply(4, 5)) # Outputs 20\n` +
        `\`\`\`\n\n` +
        `Functions keep your code clean, modular, and DRY (Don't Repeat Yourself).`;
    } else if (lower.includes('debug') || code) {
      reply += `Let's inspect your code snippet together!\n\n` +
        `**Code Checklist:**\n` +
        `1. Check indentation (Python requires 4 spaces for blocks).\n` +
        `2. Ensure quotes match around text strings.\n` +
        `3. Verify variable names are spelled correctly.\n\n` +
        `Your logic looks promising! Try running it in the interactive code runner below.`;
    } else {
      reply += `Great question about programming! Here is a structured guidance tip:\n\n` +
        `1. **Practice daily**: Consistency builds muscle memory.\n` +
        `2. **Break down problems**: Solve small sub-problems step-by-step.\n` +
        `3. **Test your code**: Use print statements to verify variable states.\n\n` +
        `What topic would you like to explore next in your **${language.toUpperCase()}** roadmap?`;
    }

    return NextResponse.json({ text: reply });
  } catch (err: any) {
    return NextResponse.json(
      { text: 'Hello learner! I am GrowBot. Let me know what programming question you have!' },
      { status: 200 }
    );
  }
}
