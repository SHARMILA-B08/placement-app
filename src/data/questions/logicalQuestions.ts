import { Question } from '../../types';

export const logicalQuestions: Question[] = [
  // --- NUMBER SERIES ---
  {
    id: 'log-ns-1',
    category: 'number-series',
    topic: 'Number Series',
    difficulty: 'Easy',
    questionType: 'number-series',
    questionText: 'Find the next number in the series: 3, 7, 15, 31, 63, ?',
    options: ['95', '125', '127', '129'],
    correctAnswer: 2, // C = 127
    explanation: 'Step 1: Look at the difference pattern:\n7 - 3 = 4\n15 - 7 = 8\n31 - 15 = 16\n63 - 31 = 32\nStep 2: The difference doubles each time: 4, 8, 16, 32, 64.\nStep 3: Next number = 63 + 64 = 127.',
    shortcutTip: 'Notice the alternative rule: multiply by 2 and add 1. (3*2+1=7, 7*2+1=15, 15*2+1=31, 31*2+1=63, 63*2+1=127) or (2^(n+1) - 1).',
    whyWrong: '63 + 32 = 95 assumes the difference does not double. The difference itself doubles every step.',
    estimatedTimeSec: 25
  },
  {
    id: 'log-ns-2',
    category: 'number-series',
    topic: 'Number Series',
    difficulty: 'Easy',
    questionType: 'number-series',
    questionText: 'Find the next term in the series: 2, 6, 12, 20, 30, 42, ?',
    options: ['52', '54', '56', '58'],
    correctAnswer: 2, // C = 56
    explanation: 'Step 1: Consecutive product pattern: n * (n + 1)\n1*2 = 2\n2*3 = 6\n3*4 = 12\n4*5 = 20\n5*6 = 30\n6*7 = 42\nStep 2: Next term = 7 * 8 = 56.',
    shortcutTip: 'Differences are +4, +6, +8, +10, +12, +14. 42 + 14 = 56.',
    whyWrong: '42 + 12 = 54 repeats the previous difference instead of incrementing by 2.',
    estimatedTimeSec: 20
  },
  {
    id: 'log-ns-3',
    category: 'number-series',
    topic: 'Number Series',
    difficulty: 'Medium',
    questionType: 'number-series',
    questionText: 'What comes next in the alternating series: 4, 18, 8, 14, 12, 10, ?',
    options: ['14', '16', '6', '8'],
    correctAnswer: 1, // B = 16
    explanation: 'Step 1: Notice two interleaved series:\nSeries 1 (odd positions): 4, 8, 12, ? (adding 4 each time)\nSeries 2 (even positions): 18, 14, 10 (subtracting 4 each time)\nStep 2: The missing term is in Series 1: 12 + 4 = 16.',
    shortcutTip: 'When numbers alternately rise and fall, suspect two interleaved sub-series.',
    whyWrong: 'Looking at direct adjacent differences causes confusion. Separate odd and even indices.',
    estimatedTimeSec: 30
  },
  {
    id: 'log-ns-4',
    category: 'number-series',
    topic: 'Number Series',
    difficulty: 'Hard',
    questionType: 'number-series',
    questionText: 'Find the next number: 1, 8, 27, 64, 125, ?',
    options: ['196', '216', '225', '256'],
    correctAnswer: 1, // B = 216
    explanation: 'Step 1: Recognize standard cubic numbers n³:\n1³ = 1, 2³ = 8, 3³ = 27, 4³ = 64, 5³ = 125.\nStep 2: The next term is 6³ = 216.',
    shortcutTip: 'Memorize cubes up to 10: 1, 8, 27, 64, 125, 216, 343, 512, 729, 1000.',
    whyWrong: '196 is 14², 225 is 15², and 256 is 16². The series is pure cubes, so 6³ = 216.',
    estimatedTimeSec: 15
  },

  // --- MISSING NUMBERS ---
  {
    id: 'log-mn-1',
    category: 'missing-numbers',
    topic: 'Missing Number',
    difficulty: 'Easy',
    questionType: 'missing-number',
    questionText: 'Find the missing number: 8, 15, 29, 57, ?, 225',
    options: ['111', '113', '115', '117'],
    correctAnswer: 1, // B = 113
    explanation: 'Step 1: Check relation between consecutive terms:\n8 * 2 - 1 = 15\n15 * 2 - 1 = 29\n29 * 2 - 1 = 57\nStep 2: 57 * 2 - 1 = 114 - 1 = 113.\nStep 3: Verification: 113 * 2 - 1 = 226 - 1 = 225 (Matches!).',
    shortcutTip: 'Formula pattern is 2x - 1. Simply double 57 (=114) and subtract 1 (=113).',
    whyWrong: '57 * 2 = 114, but don’t forget the -1 deduction.',
    estimatedTimeSec: 25
  },
  {
    id: 'log-mn-2',
    category: 'missing-numbers',
    topic: 'Missing Number',
    difficulty: 'Medium',
    questionType: 'missing-number',
    questionText: 'In a 3x3 matrix: Row 1 = [4, 9, 2], Row 2 = [3, 5, 7], Row 3 = [8, 1, ?]. The sum of each row and column is 15. What is ?',
    options: ['4', '5', '6', '7'],
    correctAnswer: 2, // C = 6
    explanation: 'Step 1: Check Row 3: 8 + 1 + ? = 15.\nStep 2: 9 + ? = 15 => ? = 15 - 9 = 6.\nStep 3: Check Column 3: 2 + 7 + 6 = 15 (Verified, magic square of order 3).',
    shortcutTip: 'In a Lo Shu magic square, every row, column and diagonal sums to 15. 15 - (8 + 1) = 6.',
    whyWrong: 'Basic subtraction error: 15 - 9 = 6.',
    estimatedTimeSec: 20
  },
  {
    id: 'log-mn-3',
    category: 'missing-numbers',
    topic: 'Missing Number',
    difficulty: 'Hard',
    questionType: 'missing-number',
    questionText: 'Find the missing number in the sequence: 5, 11, 24, 51, 106, ?',
    options: ['217', '219', '221', '223'],
    correctAnswer: 0, // A = 217
    explanation: 'Step 1: Identify the recurrence:\n5 * 2 + 1 = 11\n11 * 2 + 2 = 24\n24 * 2 + 3 = 51\n51 * 2 + 4 = 106\nStep 2: Next term = 106 * 2 + 5 = 212 + 5 = 217.',
    shortcutTip: 'Pattern is (previous * 2) + n, where n increments: +1, +2, +3, +4, +5.',
    whyWrong: 'Adding a constant offset instead of the incrementing sequence leads to 216 or 218.',
    estimatedTimeSec: 35
  },

  // --- ODD ONE OUT ---
  {
    id: 'log-ooo-1',
    category: 'logical',
    topic: 'Odd One Out',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'Find the odd one out among the following numbers: 27, 64, 125, 144, 216',
    options: ['64', '125', '144', '216'],
    correctAnswer: 2, // C = 144
    explanation: 'Step 1: 27 = 3³, 64 = 4³, 125 = 5³, 216 = 6³ (all are perfect cubes).\nStep 2: 144 is 12² (a perfect square, but not a cube of an integer).\nHence, 144 is the odd one out.',
    shortcutTip: 'All other numbers are cubes: 3³, 4³, 5³, 6³. Only 144 is not a cube.',
    whyWrong: '64 is both 8² and 4³, so it still fits the cube rule.',
    estimatedTimeSec: 20
  },
  {
    id: 'log-ooo-2',
    category: 'logical',
    topic: 'Odd One Out',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'Find the odd one out: Python, Java, HTML, C++',
    options: ['Python', 'Java', 'HTML', 'C++'],
    correctAnswer: 2, // C = HTML
    explanation: 'Python, Java, and C++ are general-purpose programming languages with logical flow control, variables, and execution logic. HTML is a markup language for structuring web pages.',
    shortcutTip: 'Programming vs Markup language distinction.',
    whyWrong: 'HTML is not a programming language; it cannot perform mathematical computations or loops on its own.',
    estimatedTimeSec: 15
  },

  // --- CODING AND DECODING ---
  {
    id: 'log-cd-1',
    category: 'logical',
    topic: 'Coding and Decoding',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'If "CLOUD" is coded as "ENQWF", how is "LOGIC" coded in the same language?',
    options: ['NQKKE', 'NQIKE', 'MQKKE', 'NQKKF'],
    correctAnswer: 1, // B = NQIKE
    explanation: 'Step 1: Letter shift pattern:\nC (+2) -> E\nL (+2) -> N\nO (+2) -> Q\nU (+2) -> W\nD (+2) -> F\nStep 2: Apply +2 shift to "LOGIC":\nL(12) + 2 = 14 (N)\nO(15) + 2 = 17 (Q)\nG(7) + 2 = 9 (I)\nI(9) + 2 = 11 (K)\nC(3) + 2 = 5 (E)\nResult is "NQIKE".',
    shortcutTip: 'Every letter shifts forward by 2 positions (+2). G(7)+2 = 9 (I).',
    whyWrong: 'Be precise with alphabet positions: G is the 7th letter, 7+2 = 9 (I), not K.',
    estimatedTimeSec: 30
  },
  {
    id: 'log-cd-2',
    category: 'logical',
    topic: 'Coding and Decoding',
    difficulty: 'Medium',
    questionType: 'mcq',
    questionText: 'If "DATA" is written as "41201", how is "BYTE" written?',
    options: ['225205', '224205', '225195', '226205'],
    correctAnswer: 0, // A = 225205
    explanation: 'Step 1: Letter positions in English alphabet:\nD = 4, A = 1, T = 20, A = 1 -> "41201".\nStep 2: Find positions for "BYTE":\nB = 2, Y = 25, T = 20, E = 5 -> "225205".',
    shortcutTip: 'Direct alphanumeric index substitution: B(2), Y(25), T(20), E(5).',
    whyWrong: 'Y is the 25th letter (not 24th or 26th).',
    estimatedTimeSec: 25
  },

  // --- BLOOD RELATIONS ---
  {
    id: 'log-br-1',
    category: 'logical',
    topic: 'Blood Relations',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'Pointing to a photograph, Rohit said, "She is the daughter of my grandfather’s only son." How is the girl in the photograph related to Rohit?',
    options: ['Sister', 'Mother', 'Aunt', 'Cousin'],
    correctAnswer: 0, // A = Sister
    explanation: 'Step 1: Break down the statement from the end:\n"My grandfather’s only son" = Rohit’s father.\nStep 2: "Daughter of Rohit’s father" = Rohit’s sister (or Rohit herself if Rohit were female, but Rohit is referring to a girl).\nHence, she is Rohit’s sister.',
    shortcutTip: '“Grandfather’s only son” is always Father. “Daughter of father” = Sister.',
    whyWrong: 'Since it specified *only* son, there are no uncles, so she cannot be a cousin.',
    estimatedTimeSec: 25
  },
  {
    id: 'log-br-2',
    category: 'logical',
    topic: 'Blood Relations',
    difficulty: 'Medium',
    questionType: 'mcq',
    questionText: 'A is B’s brother. C is A’s mother. D is C’s father. E is B’s son. How is D related to A?',
    options: ['Grandfather', 'Father', 'Uncle', 'Great Grandfather'],
    correctAnswer: 0, // A = Grandfather
    explanation: 'Step 1: C is A’s mother.\nStep 2: D is C’s father (Mother’s father).\nStep 3: Mother’s father is Maternal Grandfather (Grandfather).',
    shortcutTip: 'A -> Mother C -> Father D. D is the grandfather of A.',
    whyWrong: 'D is one generation above mother, making him the grandfather, not father.',
    estimatedTimeSec: 25
  },

  // --- DIRECTION SENSE ---
  {
    id: 'log-ds-1',
    category: 'logical',
    topic: 'Direction Sense',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'A software engineer walks 10 km North, turns right and walks 6 km, then turns right again and walks 10 km. How far is he from his starting point?',
    options: ['4 km', '6 km', '10 km', '16 km'],
    correctAnswer: 1, // B = 6 km
    explanation: 'Step 1: Moving 10 km North and later 10 km South (after two right turns) cancels out vertical displacement.\nStep 2: The only net displacement is 6 km to the East.\nHence, distance from starting point = 6 km.',
    shortcutTip: 'The path forms three sides of a rectangle (10, 6, 10). The remaining side back to start is 6 km.',
    whyWrong: '16 km is the total path walked in the first two legs, not the displacement.',
    estimatedTimeSec: 20
  },
  {
    id: 'log-ds-2',
    category: 'logical',
    topic: 'Direction Sense',
    difficulty: 'Medium',
    questionType: 'mcq',
    questionText: 'Starting from point P, Aman walks 3 m North, then turns East and walks 4 m. How far is he in a straight line from point P?',
    options: ['5 m', '7 m', '6 m', '8 m'],
    correctAnswer: 0, // A = 5 m
    explanation: 'Step 1: North and East movements form a right-angled triangle.\nStep 2: Use Pythagorean theorem: Hypotenuse = √(3² + 4²) = √(9 + 16) = √25 = 5 m.',
    shortcutTip: 'Standard Pythagorean triplet: 3-4-5. Straight line distance is 5 m.',
    whyWrong: '3 + 4 = 7 is total distance walked, not straight-line displacement.',
    estimatedTimeSec: 15
  },

  // --- ANALOGY ---
  {
    id: 'log-an-1',
    category: 'logical',
    topic: 'Analogy',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'Compiler : Code :: Translator : ?',
    options: ['Computer', 'Language', 'Keyboard', 'Algorithm'],
    correctAnswer: 1, // B = Language
    explanation: 'A compiler translates source code into machine language. Analogously, a translator translates one human spoken/written language to another.',
    shortcutTip: 'Relationship: Processor / Converter : Medium of expression.',
    whyWrong: 'A translator converts Language, just as a compiler converts Code.',
    estimatedTimeSec: 15
  },
  {
    id: 'log-an-2',
    category: 'logical',
    topic: 'Analogy',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: '8 : 64 :: 11 : ?',
    options: ['110', '121', '132', '144'],
    correctAnswer: 1, // B = 121
    explanation: 'The pattern is n : n².\n8² = 64.\n11² = 121.',
    shortcutTip: 'Square the first number: 11 * 11 = 121.',
    whyWrong: '8 * 8 = 64 is squaring, so 11 * 11 = 121 (not 11 * 10 = 110).',
    estimatedTimeSec: 15
  },

  // --- RANKING ---
  {
    id: 'log-rk-1',
    category: 'logical',
    topic: 'Ranking',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'In a coding contest leaderboard of 40 students, Ananya ranks 12th from the top. What is her rank from the bottom?',
    options: ['28th', '29th', '30th', '31st'],
    correctAnswer: 1, // B = 29th
    explanation: 'Step 1: Formula: Total = Rank from Top + Rank from Bottom - 1.\nStep 2: 40 = 12 + Bottom - 1 => 40 = 11 + Bottom.\nStep 3: Bottom = 40 - 11 = 29th.',
    shortcutTip: 'Total - Top + 1 = 40 - 12 + 1 = 29.',
    whyWrong: 'Simply calculating 40 - 12 = 28 forgets that Ananya is counted in both perspectives, requiring +1.',
    estimatedTimeSec: 25
  },

  // --- ALPHABET SERIES ---
  {
    id: 'log-as-1',
    category: 'logical',
    topic: 'Alphabet Series',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'Complete the series: B, E, H, K, N, ?',
    options: ['P', 'Q', 'R', 'S'],
    correctAnswer: 1, // B = Q
    explanation: 'Step 1: Look at alphabet indices:\nB(2) -> E(5) -> H(8) -> K(11) -> N(14).\nStep 2: Each step adds +3 positions.\nStep 3: 14 + 3 = 17. The 17th letter of alphabet is Q.',
    shortcutTip: 'Every 3rd letter. After N (14): O, P, Q (17).',
    whyWrong: 'P is 16 (+2). We need +3 from N, which is Q.',
    estimatedTimeSec: 20
  },

  // --- LOGICAL SEQUENCES ---
  {
    id: 'log-ls-1',
    category: 'logical',
    topic: 'Logical Sequences',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'Arrange in logical sequence of software development: 1. Coding  2. Requirements  3. Testing  4. Deployment  5. Design',
    options: ['2, 5, 1, 3, 4', '2, 1, 5, 3, 4', '1, 2, 5, 3, 4', '5, 2, 1, 3, 4'],
    correctAnswer: 0, // A = 2, 5, 1, 3, 4
    explanation: 'The classic SDLC waterfall order is:\n1st: Requirements Gathering (2)\n2nd: Architecture & Design (5)\n3rd: Coding / Implementation (1)\n4th: Testing & Verification (3)\n5th: Deployment / Release (4).',
    shortcutTip: 'Requirements (2) must precede Design (5), which precedes Coding (1), then Testing (3), then Deployment (4).',
    whyWrong: 'You cannot code (1) before designing (5), or deploy (4) before testing (3).',
    estimatedTimeSec: 25
  },
  {
    id: 'log-ns-5',
    category: 'number-series',
    topic: 'Number Series',
    difficulty: 'Medium',
    questionType: 'number-series',
    questionText: 'Identify the next term: 7, 10, 8, 11, 9, 12, ?',
    options: ['10', '11', '13', '14'],
    correctAnswer: 0, // A = 10
    explanation: 'Pattern: Alternating +3 and -2.\n7 + 3 = 10\n10 - 2 = 8\n8 + 3 = 11\n11 - 2 = 9\n9 + 3 = 12\nNext operation is -2: 12 - 2 = 10.',
    shortcutTip: 'Odd terms: 7, 8, 9, 10. Even terms: 10, 11, 12. Next is 4th odd term = 10.',
    whyWrong: '12 + 3 = 15 would be adding 3, but the sequence alternates +3 then -2.',
    estimatedTimeSec: 20
  },
  {
    id: 'log-mn-4',
    category: 'missing-numbers',
    topic: 'Missing Number',
    difficulty: 'Easy',
    questionType: 'missing-number',
    questionText: 'Fill in the blank: 3, 9, 27, 81, ?',
    options: ['162', '243', '256', '324'],
    correctAnswer: 1, // B = 243
    explanation: 'Powers of 3:\n3¹ = 3\n3² = 9\n3³ = 27\n3⁴ = 81\n3⁵ = 81 * 3 = 243.',
    shortcutTip: 'Multiply by 3 at each step: 81 * 3 = 243.',
    whyWrong: '81 * 2 = 162 assumes doubling, but previous steps multiply by 3 (9*3=27, 27*3=81).',
    estimatedTimeSec: 15
  }
];
