import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Initialize Google GenAI
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// 1. API Status Check
app.get('/api/gemini/status', (_req: Request, res: Response) => {
  res.json({
    available: !!process.env.GEMINI_API_KEY && !!ai,
    model: 'gemini-3.8-flash',
  });
});

// 2. Generate Dynamic Questions via Gemini
app.post('/api/gemini/generate-questions', async (req: Request, res: Response) => {
  if (!ai || !process.env.GEMINI_API_KEY) {
    res.status(503).json({
      error: 'Gemini API key is not configured. Falling back to internal question bank.',
      fallback: true
    });
    return;
  }

  try {
    const { category, topic, count = 3, difficulty = 'Easy' } = req.body;

    const prompt = `You are an expert technical interviewer preparing beginner-friendly campus placement questions for engineering freshers.
Generate ${count} high-quality, multiple-choice questions for the following category and topic:
- Category: ${category || 'General Aptitude'}
- Topic: ${topic || 'General Aptitude'}
- Difficulty Level: ${difficulty || 'Easy'}

Each question must:
1. Be solvable in under 60 seconds by an engineering student.
2. Have exactly 4 distinct, plausible options (A, B, C, D).
3. Have exactly one verified correct answer index (0 for A, 1 for B, 2 for C, 3 for D).
4. Include a concise step-by-step explanation in simple English.
5. Include a shortcut or quick rule-of-thumb tip.
6. Include a code snippet string if relevant for programming topics.

Return ONLY a valid JSON array of objects adhering strictly to the schema.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              category: { type: Type.STRING },
              topic: { type: Type.STRING },
              difficulty: { type: Type.STRING },
              questionType: { type: Type.STRING },
              questionText: { type: Type.STRING },
              codeSnippet: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              correctAnswer: { type: Type.INTEGER },
              explanation: { type: Type.STRING },
              shortcutTip: { type: Type.STRING },
              whyWrong: { type: Type.STRING },
              estimatedTimeSec: { type: Type.INTEGER },
            },
            required: ['id', 'questionText', 'options', 'correctAnswer', 'explanation'],
          },
        },
      },
    });

    const text = response.text || '[]';
    const parsed = JSON.parse(text);

    // Ensure fields conform to Question format
    const validated = parsed.map((item: any, idx: number) => ({
      id: item.id || `ai-${Date.now()}-${idx}`,
      category: category || 'aptitude',
      topic: topic || 'General Practice',
      difficulty: difficulty || 'Easy',
      questionType: item.codeSnippet ? 'output-prediction' : 'mcq',
      questionText: item.questionText,
      codeSnippet: item.codeSnippet || undefined,
      options: (item.options && item.options.length === 4) ? item.options : ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: typeof item.correctAnswer === 'number' && item.correctAnswer >= 0 && item.correctAnswer <= 3 ? item.correctAnswer : 0,
      explanation: item.explanation || 'Step-by-step reasoning.',
      shortcutTip: item.shortcutTip || 'Work methodically using elimination.',
      whyWrong: item.whyWrong || 'Read the question parameters carefully.',
      estimatedTimeSec: item.estimatedTimeSec || 30,
    }));

    res.json({ questions: validated });
  } catch (error: any) {
    console.error('Gemini question generation error:', error);
    res.status(500).json({
      error: error?.message || 'Failed to generate questions with Gemini.',
      fallback: true
    });
  }
});

// 3. Explain Error or Solution in Simple Terms
app.post('/api/gemini/explain', async (req: Request, res: Response) => {
  if (!ai || !process.env.GEMINI_API_KEY) {
    res.status(503).json({ error: 'Gemini API not available.' });
    return;
  }

  try {
    const { questionText, codeSnippet, selectedOptionText, correctOptionText, category, topic } = req.body;

    const prompt = `As a friendly campus placement mentor, explain this question to a student who picked the wrong answer.
Subject: ${category} - ${topic}
Question: ${questionText}
${codeSnippet ? `Code Snippet:\n${codeSnippet}` : ''}
Student selected: "${selectedOptionText}"
Correct answer: "${correctOptionText}"

Explain clearly and simply:
1. Why the selected answer "${selectedOptionText}" is incorrect.
2. Why "${correctOptionText}" is the right answer.
3. Step-by-step simple walkthrough.
4. The 30-second shortcut or memory trick to never miss this in an actual test.
Keep the tone encouraging, concise, and easy to understand without overly academic jargon.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    res.json({ explanation: response.text });
  } catch (error: any) {
    console.error('Gemini explanation error:', error);
    res.status(500).json({ error: error?.message || 'Failed to generate explanation.' });
  }
});

// 4. Topic Revision Concept Explainer
app.post('/api/gemini/revision-concept', async (req: Request, res: Response) => {
  if (!ai || !process.env.GEMINI_API_KEY) {
    res.status(503).json({ error: 'Gemini API not available.' });
    return;
  }

  try {
    const { topic, category } = req.body;

    const prompt = `Provide a concise 2-minute quick revision guide for the placement topic "${topic}" in "${category}".
Format as JSON with:
- "summary": A 2-sentence explanation of what this concept is.
- "coreRules": An array of 3-4 bullet points of essential formulas or rules.
- "example": A short problem and its 2-line solution.
- "proTip": A placement shortcut or common trap to avoid.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    res.json(JSON.parse(text));
  } catch (error: any) {
    console.error('Gemini revision guide error:', error);
    res.status(500).json({ error: error?.message || 'Failed to generate revision guide.' });
  }
});

// Setup Vite in Dev or static files in Production
async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Smart Placement Prep server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server startup error:', err);
  process.exit(1);
});
