import { Question, CategoryId, Difficulty } from '../types';

export interface AIServiceStatus {
  available: boolean;
  model: string;
}

export async function checkGeminiStatus(): Promise<AIServiceStatus> {
  try {
    const res = await fetch('/api/gemini/status');
    if (!res.ok) return { available: false, model: 'offline' };
    return await res.json();
  } catch {
    return { available: false, model: 'offline' };
  }
}

export async function generateAIQuestions(
  category: CategoryId,
  topic: string,
  count = 3,
  difficulty: Difficulty = 'Easy'
): Promise<{ questions: Question[]; error?: string; fallback?: boolean }> {
  try {
    const res = await fetch('/api/gemini/generate-questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, topic, count, difficulty }),
    });

    const data = await res.json();
    if (!res.ok || data.error) {
      return {
        questions: [],
        error: data.error || 'Unable to connect to AI generation server.',
        fallback: true,
      };
    }
    return { questions: data.questions || [] };
  } catch (err: any) {
    return {
      questions: [],
      error: err?.message || 'Network error connecting to AI engine.',
      fallback: true,
    };
  }
}

export async function requestAIDetailedExplanation(params: {
  questionText: string;
  codeSnippet?: string;
  selectedOptionText: string;
  correctOptionText: string;
  category: string;
  topic: string;
}): Promise<string | null> {
  try {
    const res = await fetch('/api/gemini/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.explanation || null;
  } catch {
    return null;
  }
}

export async function fetchTopicRevisionGuide(
  topic: string,
  category: string
): Promise<{
  summary?: string;
  coreRules?: string[];
  example?: string;
  proTip?: string;
} | null> {
  try {
    const res = await fetch('/api/gemini/revision-concept', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, category }),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
