import { Question } from '../../types';

export const errorFindingQuestions: Question[] = [
  // --- FIND THE INCORRECT NUMBER IN A SERIES ---
  {
    id: 'err-inc-1',
    category: 'error-finding',
    topic: 'Incorrect Number in Series',
    difficulty: 'Easy',
    questionType: 'incorrect-number',
    questionText: 'Find the incorrect number in the given series: 2, 5, 10, 17, 26, 38, 50',
    options: ['17', '26', '38', '50'],
    correctAnswer: 2, // C = 38
    explanation: 'Step 1: Check pattern of n² + 1:\n1² + 1 = 2\n2² + 1 = 5\n3² + 1 = 10\n4² + 1 = 17\n5² + 1 = 26\n6² + 1 = 37 (Given is 38)\n7² + 1 = 50.\nStep 2: 38 should be 37. Hence, 38 is the incorrect number.',
    shortcutTip: 'Check consecutive differences: +3, +5, +7, +9, should be +11 (26+11=37), then +13 (37+13=50). 38 breaks the chain.',
    whyWrong: '26 + 11 = 37, not 38.',
    estimatedTimeSec: 25
  },
  {
    id: 'err-inc-2',
    category: 'error-finding',
    topic: 'Incorrect Number in Series',
    difficulty: 'Medium',
    questionType: 'incorrect-number',
    questionText: 'Find the wrong number in the series: 3, 6, 11, 18, 28, 38, 51',
    options: ['11', '18', '28', '38'],
    correctAnswer: 2, // C = 28
    explanation: 'Step 1: Inspect differences:\n6 - 3 = 3\n11 - 6 = 5\n18 - 11 = 7\nNext should be +9: 18 + 9 = 27 (Given: 28!)\nNext: 27 + 11 = 38 (Matches!)\nNext: 38 + 13 = 51 (Matches!).\nStep 2: 28 is wrong; it should be 27.',
    shortcutTip: 'Consecutive odd numbers added: +3, +5, +7, +9, +11, +13. 18 + 9 = 27.',
    whyWrong: 'If 28 were correct, the next jump to 38 would be 10, breaking odd number differences.',
    estimatedTimeSec: 30
  },
  {
    id: 'err-inc-3',
    category: 'error-finding',
    topic: 'Incorrect Number in Series',
    difficulty: 'Hard',
    questionType: 'incorrect-number',
    questionText: 'Find the erroneous number in the geometric series: 4, 12, 36, 108, 324, 970',
    options: ['36', '108', '324', '970'],
    correctAnswer: 3, // D = 970
    explanation: 'Step 1: Check the multiplication factor: each term is multiplied by 3.\n4 * 3 = 12\n12 * 3 = 36\n36 * 3 = 108\n108 * 3 = 324\n324 * 3 = 972.\nStep 2: The given number is 970, which should be 972.',
    shortcutTip: 'Check last digit: 4 * 3 = 12 (ends in 2). 970 ends in 0, impossible for power of 3 multiplication here.',
    whyWrong: '324 is correctly 108 * 3. 324 * 3 = 972, not 970.',
    estimatedTimeSec: 25
  },

  // --- IDENTIFY THE WRONG MATHEMATICAL OPERATION ---
  {
    id: 'err-op-1',
    category: 'error-finding',
    topic: 'Wrong Mathematical Operation',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'Which mathematical sign should replace "*" to make the equation true?\n16 * 4 + 5 = 9',
    options: ['+', '-', '/', 'x'],
    correctAnswer: 2, // C = /
    explanation: 'Step 1: Test division (/):\n16 / 4 + 5 = 4 + 5 = 9.\nStep 2: Both sides equal 9.\nHence, the correct operation is division (/).',
    shortcutTip: 'Notice the result 9 is smaller than 16, so the operation on 16 and 4 must reduce 16. 16 / 4 = 4, 4 + 5 = 9.',
    whyWrong: '16 + 4 + 5 = 25; 16 - 4 + 5 = 17; 16 * 4 + 5 = 69.',
    estimatedTimeSec: 20
  },
  {
    id: 'err-op-2',
    category: 'error-finding',
    topic: 'Wrong Mathematical Operation',
    difficulty: 'Medium',
    questionType: 'mcq',
    questionText: 'The following equation was calculated incorrectly: 5 + 3 * 4 = 32. What error was committed?',
    options: [
      'Multiplication was evaluated before addition',
      'Addition was evaluated before multiplication (ignored precedence)',
      '3 was squared instead of multiplied',
      'The numbers were inverted'
    ],
    correctAnswer: 1, // B
    explanation: 'Step 1: If done correctly by BODMAS: 5 + (3 * 4) = 5 + 12 = 17.\nStep 2: If addition is done first: (5 + 3) * 4 = 8 * 4 = 32.\nStep 3: The error is evaluating addition before multiplication, violating operator precedence.',
    shortcutTip: 'Operator precedence in arithmetic and coding dictates * and / before + and -.',
    whyWrong: 'Evaluating multiplication first yields 17, which is the mathematically correct answer.',
    estimatedTimeSec: 25
  },

  // --- FIND THE MISSING VALUE IN A SEQUENCE ---
  {
    id: 'err-seq-1',
    category: 'error-finding',
    topic: 'Missing Value in Sequence',
    difficulty: 'Easy',
    questionType: 'missing-number',
    questionText: 'Find the missing value to balance the sequence: 100, 96, 88, 76, ?, 40',
    options: ['60', '62', '64', '66'],
    correctAnswer: 0, // A = 60
    explanation: 'Step 1: Differences between consecutive terms:\n100 - 96 = -4\n96 - 88 = -8\n88 - 76 = -12\nStep 2: The subtraction amount increases by 4 each time (-4, -8, -12, -16, -20).\nStep 3: Missing value = 76 - 16 = 60.\nStep 4: Check next: 60 - 20 = 40 (Valid!).',
    shortcutTip: 'Differences: -4, -8, -12, -16. 76 - 16 = 60.',
    whyWrong: '76 - 14 = 62 assumes difference increases by 2 instead of 4.',
    estimatedTimeSec: 25
  },
  {
    id: 'err-seq-2',
    category: 'error-finding',
    topic: 'Missing Value in Sequence',
    difficulty: 'Medium',
    questionType: 'missing-number',
    questionText: 'Which number replaces the question mark in the sequence: 1, 4, 13, 40, 121, ?',
    options: ['364', '362', '360', '358'],
    correctAnswer: 0, // A = 364
    explanation: 'Step 1: Recurrence formula: Previous * 3 + 1\n1 * 3 + 1 = 4\n4 * 3 + 1 = 13\n13 * 3 + 1 = 40\n40 * 3 + 1 = 121\nStep 2: Next term = 121 * 3 + 1 = 363 + 1 = 364.',
    shortcutTip: 'Pattern is 3x + 1. Triple 121 (=363) and add 1 (=364).',
    whyWrong: '121 * 3 = 363, do not forget +1.',
    estimatedTimeSec: 25
  },

  // --- IDENTIFY THE INCORRECT PATTERN ---
  {
    id: 'err-pat-1',
    category: 'error-finding',
    topic: 'Incorrect Pattern',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'Which letter cluster violates the pattern: AZ, BY, CX, DW, EV, FU, HS?',
    options: ['EV', 'FU', 'HS', 'DW'],
    correctAnswer: 2, // C = HS
    explanation: 'Step 1: Each pair consists of letters equidistant from start and end of alphabet (opposites):\nA(1) - Z(26)\nB(2) - Y(25)\nC(3) - X(24)\nD(4) - W(23)\nE(5) - V(22)\nF(6) - U(21)\nStep 2: The next letter in sequence is G(7). The opposite of G is T(20) -> "GT".\nGiven is "HS", which skips G entirely!',
    shortcutTip: 'Alphabetical order of first letters: A, B, C, D, E, F, should be G! HS starts with H instead of G.',
    whyWrong: 'While H and S are indeed reverse pairs, the initial letter skipped G.',
    estimatedTimeSec: 30
  },

  // --- CHOOSE THE CORRECT ARRANGEMENT ---
  {
    id: 'err-arr-1',
    category: 'error-finding',
    topic: 'Correct Arrangement',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'Select the correct ascending memory hierarchy speed (fastest to slowest):',
    options: [
      'Registers > Cache (L1/L2) > RAM > Solid State Drive (SSD)',
      'RAM > Registers > Cache > SSD',
      'Cache > Registers > RAM > SSD',
      'SSD > RAM > Cache > Registers'
    ],
    correctAnswer: 0, // A
    explanation: 'Memory hierarchy by access latency:\n1. CPU Registers (fastest, ~0.5 ns)\n2. CPU Cache L1/L2/L3 (~1-10 ns)\n3. Main Memory / RAM (~50-100 ns)\n4. Secondary Storage / SSD (~50-100 µs).',
    shortcutTip: 'Registers are inside the CPU core, Cache is on-chip, RAM is off-chip bus, SSD is storage drive.',
    whyWrong: 'Cache is fast, but CPU registers are closest and fastest of all.',
    estimatedTimeSec: 20
  },
  {
    id: 'err-inc-4',
    category: 'error-finding',
    topic: 'Incorrect Number in Series',
    difficulty: 'Medium',
    questionType: 'incorrect-number',
    questionText: 'Identify the wrong number: 16, 22, 30, 45, 52, 66',
    options: ['22', '30', '45', '52'],
    correctAnswer: 2, // C = 45
    explanation: 'Step 1: Inspect differences:\n22 - 16 = 6\n30 - 22 = 8\nNext difference should be +10: 30 + 10 = 40 (Given: 45!)\nNext: 40 + 12 = 52 (Matches!)\nNext: 52 + 14 = 66 (Matches!).\nStep 2: 45 should be 40. Hence, 45 is the incorrect number.',
    shortcutTip: 'Even differences: +6, +8, +10, +12, +14. 30 + 10 = 40.',
    whyWrong: 'All numbers in the valid series must be even since we add even integers to an even starting number.',
    estimatedTimeSec: 25
  }
];
