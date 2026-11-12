import { Question, CategoryId, PracticeMode } from '../../types';
import { aptitudeQuestions } from './aptitudeQuestions';
import { logicalQuestions } from './logicalQuestions';
import { errorFindingQuestions } from './errorFindingQuestions';
import { pythonQuestions } from './pythonQuestions';
import { cQuestions } from './cQuestions';
import { cppQuestions } from './cppQuestions';
import { javaQuestions } from './javaQuestions';
import { expandedBank } from './expandedBank';
import { generatedComprehensiveBank, generateCategoryFullBank } from './generatedBank';
import { largeBankQuestions } from './largeBank';
import { programmingExtQuestions } from './programmingExt';

// Combine all raw question pools
const rawAllQuestions: Question[] = [
  ...aptitudeQuestions,
  ...logicalQuestions,
  ...errorFindingQuestions,
  ...pythonQuestions,
  ...cQuestions,
  ...cppQuestions,
  ...javaQuestions,
  ...expandedBank,
  ...generatedComprehensiveBank,
  ...generateCategoryFullBank(),
  ...largeBankQuestions,
  ...programmingExtQuestions
];

// Deduplicate by ID
const seenIds = new Set<string>();
export const ALL_QUESTIONS: Question[] = [];

for (const q of rawAllQuestions) {
  if (!seenIds.has(q.id)) {
    seenIds.add(q.id);
    ALL_QUESTIONS.push(q);
  }
}

// Category definition metadata
export interface CategoryMetadata {
  id: CategoryId;
  name: string;
  description: string;
  iconName: string;
  topics: string[];
}

export const CATEGORIES: CategoryMetadata[] = [
  {
    id: 'aptitude',
    name: 'Basic Mathematics',
    description: 'Core arithmetic, percentages, interest, time & work, and quantitative ability.',
    iconName: 'Calculator',
    topics: [
      'Percentages',
      'Profit and Loss',
      'Simple Interest',
      'Compound Interest',
      'Ratio and Proportion',
      'Average',
      'Time and Work',
      'Time, Speed and Distance',
      'Problems on Ages',
      'Simplification',
      'Number System'
    ]
  },
  {
    id: 'logical',
    name: 'Logical Reasoning',
    description: 'Deductive reasoning, relations, coding-decoding, patterns, and sequences.',
    iconName: 'Brain',
    topics: [
      'Coding and Decoding',
      'Blood Relations',
      'Direction Sense',
      'Analogy',
      'Ranking',
      'Alphabet Series',
      'Odd One Out',
      'Logical Sequences'
    ]
  },
  {
    id: 'number-series',
    name: 'Number Series',
    description: 'Arithmetic progressions, doubling differences, squares, and alternate series.',
    iconName: 'TrendingUp',
    topics: ['Number Series']
  },
  {
    id: 'missing-numbers',
    name: 'Missing Numbers',
    description: 'Find missing sequence values, table elements, and recurrence patterns.',
    iconName: 'HelpCircle',
    topics: ['Missing Number', 'Missing Value in Sequence']
  },
  {
    id: 'error-finding',
    name: 'Error Finding',
    description: 'Spot wrong numbers in series, operator mistakes, and faulty sequence patterns.',
    iconName: 'AlertTriangle',
    topics: [
      'Incorrect Number in Series',
      'Wrong Mathematical Operation',
      'Missing Value in Sequence',
      'Incorrect Pattern',
      'Correct Arrangement',
      'Error Finding'
    ]
  },
  {
    id: 'python',
    name: 'Python',
    description: 'Variables, loops, lists, dicts, syntax errors, and output prediction in Python.',
    iconName: 'FileCode2',
    topics: [
      'Variables and Data Types',
      'Input and Output',
      'Operators',
      'If-else',
      'For and While Loops',
      'Strings',
      'Lists and Tuples',
      'Dictionaries',
      'Functions',
      'Basic Output Prediction',
      'Find Code Error',
      'Missing Code'
    ]
  },
  {
    id: 'c',
    name: 'C Programming',
    description: 'printf/scanf, pointers, loops, arrays, memory, and syntax troubleshooting in C.',
    iconName: 'Terminal',
    topics: [
      'Variables and Data Types',
      'printf and scanf',
      'Operators',
      'Conditional Statements',
      'Loops',
      'Arrays',
      'Strings',
      'Functions',
      'Pointers',
      'Output Prediction',
      'Syntax Errors'
    ]
  },
  {
    id: 'cpp',
    name: 'C++',
    description: 'OOP, stream I/O, classes, constructors, references, and C++ idioms.',
    iconName: 'Cpu',
    topics: [
      'Basic Syntax',
      'Variables and Data Types',
      'Input and Output',
      'Operators',
      'If-else',
      'Loops and Arrays',
      'Arrays',
      'Functions',
      'Classes and Objects',
      'Basic OOP Concepts',
      'Output Prediction',
      'Syntax Errors'
    ]
  },
  {
    id: 'java',
    name: 'Java',
    description: 'JVM, OOP, System.out.println, arrays, inheritance, and compilation error finding.',
    iconName: 'Coffee',
    topics: [
      'Java Basics',
      'Variables and Data Types',
      'System.out.println',
      'Operators',
      'If-else',
      'Loops',
      'Arrays',
      'Strings',
      'Methods',
      'Classes and Objects',
      'Constructors',
      'Inheritance Basics',
      'Output Prediction',
      'Compilation Errors'
    ]
  }
];

// Helper functions for question retrieval
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getAllQuestions(): Question[] {
  return ALL_QUESTIONS;
}

export function getQuestionsByCategory(categoryId: CategoryId): Question[] {
  return ALL_QUESTIONS.filter((q) => q.category === categoryId);
}

export function getQuestionsByTopic(topic: string): Question[] {
  return ALL_QUESTIONS.filter(
    (q) => q.topic.toLowerCase() === topic.toLowerCase()
  );
}

export function getRandomQuestions(count: number, categoryId?: CategoryId): Question[] {
  const pool = categoryId ? getQuestionsByCategory(categoryId) : ALL_QUESTIONS;
  return shuffleArray(pool).slice(0, Math.min(count, pool.length));
}

export function getQuickPracticeQuestions(count = 10): Question[] {
  return shuffleArray(ALL_QUESTIONS).slice(0, count);
}

export function getDailyChallengeQuestions(count = 20): Question[] {
  // Balanced mix: 10 aptitude/logical + 10 programming
  const aptLogicalPool = ALL_QUESTIONS.filter(
    (q) =>
      q.category === 'aptitude' ||
      q.category === 'logical' ||
      q.category === 'number-series' ||
      q.category === 'missing-numbers' ||
      q.category === 'error-finding'
  );
  const progPool = ALL_QUESTIONS.filter(
    (q) =>
      q.category === 'python' ||
      q.category === 'c' ||
      q.category === 'cpp' ||
      q.category === 'java'
  );

  const half = Math.floor(count / 2);
  const selectedApt = shuffleArray(aptLogicalPool).slice(0, half);
  const selectedProg = shuffleArray(progPool).slice(0, count - half);

  return shuffleArray([...selectedApt, ...selectedProg]);
}

export function getProgrammingChallengeQuestions(
  lang: 'python' | 'c' | 'cpp' | 'java',
  count = 10
): Question[] {
  const pool = ALL_QUESTIONS.filter((q) => q.category === lang);
  return shuffleArray(pool).slice(0, Math.min(count, pool.length));
}

export function getMockTestQuestions(count = 30): Question[] {
  // Comprehensive mock test distribution across all major sections
  const aptitude = shuffleArray(getQuestionsByCategory('aptitude')).slice(0, 8);
  const logical = shuffleArray([
    ...getQuestionsByCategory('logical'),
    ...getQuestionsByCategory('number-series'),
    ...getQuestionsByCategory('missing-numbers')
  ]).slice(0, 8);
  const errorFinding = shuffleArray(getQuestionsByCategory('error-finding')).slice(0, 4);
  const programming = shuffleArray([
    ...getQuestionsByCategory('python'),
    ...getQuestionsByCategory('c'),
    ...getQuestionsByCategory('cpp'),
    ...getQuestionsByCategory('java')
  ]).slice(0, 10);

  const combined = [...aptitude, ...logical, ...errorFinding, ...programming];
  return shuffleArray(combined).slice(0, count);
}

export function getErrorCorrectionQuestions(count = 15): Question[] {
  const pool = ALL_QUESTIONS.filter(
    (q) =>
      q.category === 'error-finding' ||
      q.questionType === 'coding-error' ||
      q.questionType === 'syntax-error' ||
      q.questionType === 'incorrect-number' ||
      q.topic.toLowerCase().includes('error') ||
      q.topic.toLowerCase().includes('missing')
  );
  return shuffleArray(pool).slice(0, Math.min(count, pool.length));
}

export function getWeakTopicDrillQuestions(topic: string, count = 3): Question[] {
  const directMatches = ALL_QUESTIONS.filter(
    (q) => q.topic.toLowerCase() === topic.toLowerCase()
  );
  if (directMatches.length >= count) {
    return shuffleArray(directMatches).slice(0, count);
  }
  // Fallback to same category
  const fallbackCat = directMatches[0]?.category || 'aptitude';
  const catMatches = ALL_QUESTIONS.filter((q) => q.category === fallbackCat);
  return shuffleArray([...directMatches, ...catMatches]).slice(0, count);
}
