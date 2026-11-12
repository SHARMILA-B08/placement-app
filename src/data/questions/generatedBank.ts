import { Question, CategoryId, Difficulty, QuestionType } from '../../types';

// Programmatically crafted, verified educational questions for every required syllabus topic
export const generatedComprehensiveBank: Question[] = [
  // --- Basic Mathematics: Ages, Simplification, Speed, Work, Compound/Simple Interest, Number System ---
  {
    id: 'gen-math-1',
    category: 'aptitude',
    topic: 'Time and Work',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'P can finish a job in 15 days, and Q can do it in 30 days. How many days will they take together?',
    options: ['8 days', '10 days', '12 days', '15 days'],
    correctAnswer: 1,
    explanation: '(15 * 30) / (15 + 30) = 450 / 45 = 10 days.',
    shortcutTip: 'Formula: (A * B) / (A + B).',
    estimatedTimeSec: 20
  },
  {
    id: 'gen-math-2',
    category: 'aptitude',
    topic: 'Percentages',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'What is 15% of 300?',
    options: ['35', '40', '45', '50'],
    correctAnswer: 2,
    explanation: '0.15 * 300 = 45.',
    shortcutTip: '10% is 30, 5% is 15. 30 + 15 = 45.',
    estimatedTimeSec: 10
  },
  {
    id: 'gen-math-3',
    category: 'aptitude',
    topic: 'Profit and Loss',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'A book bought for $50 is sold for $65. What is the profit percentage?',
    options: ['20%', '25%', '30%', '35%'],
    correctAnswer: 2,
    explanation: 'Profit = 65 - 50 = $15. Profit% = (15 / 50) * 100 = 30%.',
    shortcutTip: '15 / 50 = 30 / 100 = 30%.',
    estimatedTimeSec: 15
  },
  {
    id: 'gen-math-4',
    category: 'aptitude',
    topic: 'Ratio and Proportion',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'If 4 : 5 = x : 35, what is the value of x?',
    options: ['24', '28', '30', '32'],
    correctAnswer: 1,
    explanation: '4 / 5 = x / 35 => x = (4 * 35) / 5 = 4 * 7 = 28.',
    shortcutTip: '5 * 7 = 35, so 4 * 7 = 28.',
    estimatedTimeSec: 15
  },
  {
    id: 'gen-math-5',
    category: 'aptitude',
    topic: 'Average',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'Find the average of 10, 20, 30, 40, and 50.',
    options: ['25', '30', '35', '40'],
    correctAnswer: 1,
    explanation: 'Sum = 150. Count = 5. Average = 150 / 5 = 30.',
    shortcutTip: 'In an evenly spaced series, average is the middle term: 30.',
    estimatedTimeSec: 10
  },
  {
    id: 'gen-math-6',
    category: 'aptitude',
    topic: 'Time, Speed and Distance',
    difficulty: 'Medium',
    questionType: 'mcq',
    questionText: 'How long does it take to cover 180 km at a speed of 45 km/h?',
    options: ['3 hours', '3.5 hours', '4 hours', '4.5 hours'],
    correctAnswer: 2,
    explanation: 'Time = Distance / Speed = 180 / 45 = 4 hours.',
    shortcutTip: '45 * 2 = 90, 90 * 2 = 180, so 4 hours.',
    estimatedTimeSec: 15
  },
  {
    id: 'gen-math-7',
    category: 'aptitude',
    topic: 'Problems on Ages',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'A mother is 3 times as old as her daughter. If the daughter is 12 years old, how old is the mother?',
    options: ['32 years', '34 years', '36 years', '40 years'],
    correctAnswer: 2,
    explanation: 'Mother = 3 * 12 = 36 years.',
    shortcutTip: 'Simple multiplication: 3 * 12 = 36.',
    estimatedTimeSec: 10
  },
  {
    id: 'gen-math-8',
    category: 'aptitude',
    topic: 'Simplification',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'Calculate: 50 - (10 * 3) + 15 / 3',
    options: ['20', '25', '30', '35'],
    correctAnswer: 1,
    explanation: 'Brackets & mult/div: 10 * 3 = 30, 15 / 3 = 5. Expression: 50 - 30 + 5 = 25.',
    shortcutTip: 'BODMAS: 50 - 30 + 5 = 25.',
    estimatedTimeSec: 15
  },
  {
    id: 'gen-math-9',
    category: 'aptitude',
    topic: 'Number System',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'Which of the following is a prime number?',
    options: ['21', '27', '31', '35'],
    correctAnswer: 2,
    explanation: '31 has only two distinct factors: 1 and 31. (21=3*7, 27=3*9, 35=5*7).',
    shortcutTip: 'Check divisibility by 2, 3, 5: 31 is prime.',
    estimatedTimeSec: 10
  },
  {
    id: 'gen-math-10',
    category: 'aptitude',
    topic: 'Simple Interest',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'What is the simple interest on $1,000 at 10% per year for 2 years?',
    options: ['$100', '$150', '$200', '$250'],
    correctAnswer: 2,
    explanation: '(1000 * 10 * 2) / 100 = $200.',
    shortcutTip: '10% of 1000 = 100. Over 2 years = 200.',
    estimatedTimeSec: 10
  },
  {
    id: 'gen-math-11',
    category: 'aptitude',
    topic: 'Compound Interest',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'What is the compound amount on $1,000 for 1 year at 8% per annum compounded annually?',
    options: ['$1,040', '$1,080', '$1,160', '$1,088'],
    correctAnswer: 1,
    explanation: 'For 1 year, CI equals SI: 1000 + (0.08 * 1000) = $1,080.',
    shortcutTip: 'For the first year, CI is identical to SI: $1000 * 1.08 = $1080.',
    estimatedTimeSec: 10
  },

  // --- Logical Reasoning: Number Series, Missing Number, Blood Relations, Coding, Direction ---
  {
    id: 'gen-log-1',
    category: 'number-series',
    topic: 'Number Series',
    difficulty: 'Easy',
    questionType: 'number-series',
    questionText: 'Next term: 5, 10, 15, 20, 25, ?',
    options: ['28', '30', '35', '40'],
    correctAnswer: 1,
    explanation: 'Adding 5 each time: 25 + 5 = 30.',
    shortcutTip: 'Multiples of 5.',
    estimatedTimeSec: 10
  },
  {
    id: 'gen-log-2',
    category: 'number-series',
    topic: 'Number Series',
    difficulty: 'Easy',
    questionType: 'number-series',
    questionText: 'Next term: 64, 32, 16, 8, ?',
    options: ['2', '4', '6', '0'],
    correctAnswer: 1,
    explanation: 'Dividing by 2 at each step: 8 / 2 = 4.',
    shortcutTip: 'Halving sequence: 8 / 2 = 4.',
    estimatedTimeSec: 10
  },
  {
    id: 'gen-log-3',
    category: 'missing-numbers',
    topic: 'Missing Number',
    difficulty: 'Easy',
    questionType: 'missing-number',
    questionText: 'Find the missing number: 12, 16, 20, ?, 28',
    options: ['22', '24', '26', '25'],
    correctAnswer: 1,
    explanation: 'Common difference is +4: 20 + 4 = 24.',
    shortcutTip: 'Arithmetic progression with step +4.',
    estimatedTimeSec: 10
  },
  {
    id: 'gen-log-4',
    category: 'logical',
    topic: 'Odd One Out',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'Find the odd one out: Circle, Square, Triangle, Cube',
    options: ['Circle', 'Square', 'Triangle', 'Cube'],
    correctAnswer: 3,
    explanation: 'Cube is a 3-dimensional solid; Circle, Square, and Triangle are 2-dimensional planar shapes.',
    shortcutTip: '3D shape vs 2D shapes.',
    estimatedTimeSec: 10
  },
  {
    id: 'gen-log-5',
    category: 'logical',
    topic: 'Coding and Decoding',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'If "RED" is coded as "1854", what is the code for "BED"?',
    options: ['254', '2514', '245', '1254'],
    correctAnswer: 0,
    explanation: 'R=18, E=5, D=4 -> "1854". For "BED": B=2, E=5, D=4 -> "254".',
    shortcutTip: 'B is 2, E is 5, D is 4.',
    estimatedTimeSec: 15
  },
  {
    id: 'gen-log-6',
    category: 'logical',
    topic: 'Direction Sense',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'If you walk 5 km South and then 5 km East, in which general direction are you from the starting point?',
    options: ['North-East', 'South-East', 'North-West', 'South-West'],
    correctAnswer: 1,
    explanation: 'South + East = South-East direction.',
    shortcutTip: 'Composite direction: South and East.',
    estimatedTimeSec: 10
  },
  {
    id: 'gen-log-7',
    category: 'logical',
    topic: 'Analogy',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'Doctor : Hospital :: Teacher : ?',
    options: ['Classroom', 'School', 'Library', 'Books'],
    correctAnswer: 1,
    explanation: 'A doctor works primarily in a hospital; a teacher works primarily in a school.',
    shortcutTip: 'Profession : Workplace.',
    estimatedTimeSec: 10
  },
  {
    id: 'gen-log-8',
    category: 'logical',
    topic: 'Ranking',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'In a queue of 20 people, David is 5th from the front. What is his position from the back?',
    options: ['15th', '16th', '17th', '14th'],
    correctAnswer: 1,
    explanation: 'Total = Front + Back - 1 => 20 = 5 + Back - 1 => Back = 16th.',
    shortcutTip: '20 - 5 + 1 = 16.',
    estimatedTimeSec: 15
  },
  {
    id: 'gen-log-9',
    category: 'logical',
    topic: 'Alphabet Series',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'Find the next letter: A, C, E, G, ?',
    options: ['H', 'I', 'J', 'K'],
    correctAnswer: 1,
    explanation: 'Skipping one letter each time (+2): A(1), C(3), E(5), G(7), I(9).',
    shortcutTip: 'Odd position letters: 1, 3, 5, 7, 9 (I).',
    estimatedTimeSec: 10
  },
  {
    id: 'gen-log-10',
    category: 'logical',
    topic: 'Logical Sequences',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'Logical sequence: 1. Application  2. Interview  3. Offer Letter  4. Job Onboarding',
    options: ['1, 2, 3, 4', '2, 1, 3, 4', '1, 3, 2, 4', '4, 1, 2, 3'],
    correctAnswer: 0,
    explanation: 'You apply first (1), attend the interview (2), receive the offer letter (3), and join for onboarding (4).',
    shortcutTip: 'Hiring funnel order.',
    estimatedTimeSec: 10
  },

  // --- Python: Loops, Functions, Dicts, Output, Error Finding ---
  {
    id: 'gen-py-1',
    category: 'python',
    topic: 'Variables and Data Types',
    difficulty: 'Easy',
    questionType: 'output-prediction',
    questionText: 'What is the boolean evaluation of bool("") in Python?',
    codeSnippet: 'print(bool(""))',
    options: ['True', 'False', 'None', 'Error'],
    correctAnswer: 1,
    explanation: 'In Python, empty strings `""`, 0, empty lists `[]`, and `None` are falsy.',
    shortcutTip: 'Empty string is falsy (False).',
    estimatedTimeSec: 10
  },
  {
    id: 'gen-py-2',
    category: 'python',
    topic: 'Lists and Tuples',
    difficulty: 'Easy',
    questionType: 'output-prediction',
    questionText: 'What is the result of [1, 2] + [3, 4] in Python?',
    codeSnippet: 'print([1, 2] + [3, 4])',
    options: ['[4, 6]', '[1, 2, 3, 4]', '[[1, 2], [3, 4]]', 'Error'],
    correctAnswer: 1,
    explanation: 'The `+` operator on lists concatenates them into a new combined list.',
    shortcutTip: '`+` concatenates lists.',
    estimatedTimeSec: 10
  },
  {
    id: 'gen-py-3',
    category: 'python',
    topic: 'Dictionaries',
    difficulty: 'Easy',
    questionType: 'output-prediction',
    questionText: 'What does len() return for this dictionary?',
    codeSnippet: 'user = {"name": "Alice", "role": "Dev", "active": True}\nprint(len(user))',
    options: ['3', '6', '1', 'Error'],
    correctAnswer: 0,
    explanation: '`len()` on a dictionary counts the number of key-value pairs (here 3).',
    shortcutTip: 'Counts total keys = 3.',
    estimatedTimeSec: 10
  },
  {
    id: 'gen-py-4',
    category: 'python',
    topic: 'For and While Loops',
    difficulty: 'Easy',
    questionType: 'output-prediction',
    questionText: 'How many times will this loop print?',
    codeSnippet: 'for ch in "CODE":\n    print(ch)',
    options: ['1', '2', '4', '8'],
    correctAnswer: 2,
    explanation: '"CODE" has 4 characters, so the loop iterates 4 times.',
    shortcutTip: 'Iterates once per character.',
    estimatedTimeSec: 10
  },
  {
    id: 'gen-py-5',
    category: 'python',
    topic: 'Functions',
    difficulty: 'Easy',
    questionType: 'output-prediction',
    questionText: 'What is returned by a Python function without a return statement?',
    codeSnippet: 'def do_nothing():\n    pass\n\nval = do_nothing()\nprint(val)',
    options: ['0', 'None', 'False', 'undefined'],
    correctAnswer: 1,
    explanation: 'Functions in Python without an explicit return statement implicitly return `None`.',
    shortcutTip: 'Default function return value is `None`.',
    estimatedTimeSec: 10
  },
  {
    id: 'gen-py-6',
    category: 'python',
    topic: 'Find Code Error',
    difficulty: 'Easy',
    questionType: 'coding-error',
    questionText: 'What error will occur here?',
    codeSnippet: 'nums = [10, 20, 30]\nprint(nums[3])',
    options: ['KeyError', 'IndexError', 'ValueError', 'TypeError'],
    correctAnswer: 1,
    explanation: 'Valid indices are 0, 1, 2. Accessing index 3 exceeds list bounds and raises `IndexError: list index out of range`.',
    shortcutTip: 'Accessing out-of-bounds index raises IndexError.',
    estimatedTimeSec: 10
  },

  // --- C Programming: Pointers, Arrays, Strings, Printf ---
  {
    id: 'gen-c-1',
    category: 'c',
    topic: 'printf and scanf',
    difficulty: 'Easy',
    questionType: 'output-prediction',
    questionText: 'What is printed by this newline escape sequence?',
    codeSnippet: '#include <stdio.h>\nint main() {\n    printf("Hi\\nBye");\n    return 0;\n}',
    options: ['Hi\\nBye', 'Hi and Bye on two separate lines', 'HiBye', 'Compilation error'],
    correctAnswer: 1,
    explanation: '`\\n` inserts a newline character, placing "Bye" on the line following "Hi".',
    shortcutTip: '\\n = newline.',
    estimatedTimeSec: 10
  },
  {
    id: 'gen-c-2',
    category: 'c',
    topic: 'Variables and Data Types',
    difficulty: 'Easy',
    questionType: 'output-prediction',
    questionText: 'What is the boolean truth value of any non-zero integer in C?',
    codeSnippet: '#include <stdio.h>\nint main() {\n    if (-5) {\n        printf("True");\n    } else {\n        printf("False");\n    }\n    return 0;\n}',
    options: ['True', 'False', 'Error', 'Undefined'],
    correctAnswer: 0,
    explanation: 'In C, 0 is considered false, and ANY non-zero value (including negative numbers like -5) evaluates as true in conditions.',
    shortcutTip: '0 = false, non-zero = true.',
    estimatedTimeSec: 15
  },
  {
    id: 'gen-c-3',
    category: 'c',
    topic: 'Pointers',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'What is the NULL pointer in C typically defined as?',
    options: ['((void *)0)', '1', '-1', 'undefined'],
    correctAnswer: 0,
    explanation: 'In C, NULL is an implementation-defined constant typically defined as `((void *)0)`.',
    shortcutTip: 'NULL represents address 0.',
    estimatedTimeSec: 10
  },
  {
    id: 'gen-c-4',
    category: 'c',
    topic: 'Arrays',
    difficulty: 'Easy',
    questionType: 'output-prediction',
    questionText: 'What is the index of the first element in a C array?',
    options: ['0', '1', '-1', 'Any configured number'],
    correctAnswer: 0,
    explanation: 'C arrays are strictly 0-indexed.',
    shortcutTip: 'Zero-based indexing.',
    estimatedTimeSec: 5
  },

  // --- C++: OOP, Classes, Constructors, I/O ---
  {
    id: 'gen-cpp-1',
    category: 'cpp',
    topic: 'Basic Syntax',
    difficulty: 'Easy',
    questionType: 'output-prediction',
    questionText: 'What does std::endl do in C++ compared to "\\n"?',
    options: [
      'It inserts a newline and also flushes the output stream buffer',
      'It only prints a tab space',
      'It clears the console screen',
      'It allocates memory for the next line'
    ],
    correctAnswer: 0,
    explanation: '`std::endl` writes a newline character to the stream AND flushes the internal buffer.',
    shortcutTip: '`std::endl` = `\\n` + `flush`.',
    estimatedTimeSec: 15
  },
  {
    id: 'gen-cpp-2',
    category: 'cpp',
    topic: 'Basic OOP Concepts',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'Which C++ keyword allows a derived class to override a base class member function dynamically?',
    options: ['virtual', 'override_only', 'dynamic', 'mutable'],
    correctAnswer: 0,
    explanation: 'The `virtual` keyword enables runtime polymorphism and dynamic dispatch in C++.',
    shortcutTip: '`virtual` enables dynamic polymorphism.',
    estimatedTimeSec: 15
  },
  {
    id: 'gen-cpp-3',
    category: 'cpp',
    topic: 'Classes and Objects',
    difficulty: 'Easy',
    questionType: 'output-prediction',
    questionText: 'How do you allocate dynamic memory for a single integer in C++?',
    options: ['int *p = new int;', 'int *p = malloc(int);', 'int p = new int;', 'int *p = allocate(int);'],
    correctAnswer: 0,
    explanation: 'In C++, the `new` operator dynamically allocates memory on the heap and returns a typed pointer.',
    shortcutTip: '`new int;` allocates heap memory.',
    estimatedTimeSec: 15
  },

  // --- Java: OOP, Strings, Exceptions, JVM ---
  {
    id: 'gen-java-1',
    category: 'java',
    topic: 'Java Basics',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'What is the file extension of compiled Java bytecode files?',
    options: ['.java', '.class', '.exe', '.byte'],
    correctAnswer: 1,
    explanation: '`javac` compiles `.java` source code into `.class` bytecode files.',
    shortcutTip: 'Source = .java; Bytecode = .class.',
    estimatedTimeSec: 10
  },
  {
    id: 'gen-java-2',
    category: 'java',
    topic: 'Strings',
    difficulty: 'Easy',
    questionType: 'output-prediction',
    questionText: 'What does "Hello".toLowerCase() return?',
    options: ['HELLO', 'hello', 'Hello', 'Error'],
    correctAnswer: 1,
    explanation: '`toLowerCase()` converts all uppercase characters in the string to lowercase: "hello".',
    shortcutTip: 'Converts to all lowercase letters.',
    estimatedTimeSec: 10
  },
  {
    id: 'gen-java-3',
    category: 'java',
    topic: 'Compilation Errors',
    difficulty: 'Easy',
    questionType: 'coding-error',
    questionText: 'Why does this code throw a NullPointerException at runtime?',
    codeSnippet: 'String text = null;\nSystem.out.println(text.length());',
    options: [
      'Attempting to invoke a method on a null reference',
      'text is not an integer',
      'length is not a valid method on Strings',
      'Strings cannot be printed'
    ],
    correctAnswer: 0,
    explanation: 'Calling any instance method (like `.length()`) on a variable that holds `null` triggers a `NullPointerException`.',
    shortcutTip: 'Method call on null reference = NullPointerException.',
    estimatedTimeSec: 15
  },
  {
    id: 'gen-java-4',
    category: 'java',
    topic: 'Methods',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'What is the entry point method signature required for any standalone Java application?',
    options: [
      'public static void main(String[] args)',
      'public void main(String[] args)',
      'static void main()',
      'public int main(String[] args)'
    ],
    correctAnswer: 0,
    explanation: 'The JVM entry point requires exact signature: `public static void main(String[] args)`.',
    shortcutTip: '`public static void main(String[] args)`.',
    estimatedTimeSec: 15
  }
];

// Combine more comprehensive topic coverage to ensure 200+ distinct questions
export function generateCategoryFullBank(): Question[] {
  const extraQuestions: Question[] = [];

  // Aptitude: Ratio, Averages, Simplification, Ages
  const mathTopics = [
    { topic: 'Percentages', q: 'A shirt originally priced at $80 is on 25% clearance sale. What is the sale price?', opts: ['$55', '$60', '$65', '$70'], ans: 1, exp: '25% of 80 = 20. 80 - 20 = $60.' },
    { topic: 'Profit and Loss', q: 'Selling an item for $180 yields a 20% profit. What was the cost price?', opts: ['$140', '$150', '$160', '$170'], ans: 1, exp: '1.20 * CP = 180 => CP = 180 / 1.2 = $150.' },
    { topic: 'Ratio and Proportion', q: 'The ratio of boys to girls in a coding bootcamp is 3:2. If there are 30 boys, how many girls are there?', opts: ['$15', '20', '25', '30'], ans: 1, exp: '3 parts = 30 => 1 part = 10. 2 parts = 20 girls.' },
    { topic: 'Average', q: 'The average of three numbers is 15. If two of the numbers are 10 and 15, what is the third?', opts: ['15', '20', '25', '30'], ans: 1, exp: 'Sum = 3 * 15 = 45. 45 - (10 + 15) = 20.' },
    { topic: 'Time and Work', q: 'A can paint a room in 4 hours, B can paint it in 12 hours. Together, how long do they take?', opts: ['2 hours', '3 hours', '4 hours', '6 hours'], ans: 1, exp: '(4 * 12) / (4 + 12) = 48 / 16 = 3 hours.' },
    { topic: 'Time, Speed and Distance', q: 'A car travels at 60 km/h for 2.5 hours. How far does it travel?', opts: ['120 km', '150 km', '160 km', '180 km'], ans: 1, exp: 'Distance = 60 * 2.5 = 150 km.' },
    { topic: 'Problems on Ages', q: 'Sam is twice as old as Ben. If Ben is 14 years old, what was Sam’s age 5 years ago?', opts: ['21 years', '23 years', '25 years', '28 years'], ans: 1, exp: 'Sam is 2 * 14 = 28 now. 5 years ago: 28 - 5 = 23 years.' },
    { topic: 'Simplification', q: 'Evaluate: 100 / (5 * 4) + 12', opts: ['15', '17', '20', '25'], ans: 1, exp: '5 * 4 = 20. 100 / 20 = 5. 5 + 12 = 17.' },
    { topic: 'Number System', q: 'What is the smallest three-digit prime number?', opts: ['101', '103', '107', '109'], ans: 0, exp: '100 is composite (even), 101 has no divisors up to √101 (~10), so 101 is the smallest 3-digit prime.' },
    { topic: 'Simple Interest', q: 'Simple interest on $500 at 4% for 3 years is:', opts: ['$50', '$60', '$70', '$80'], ans: 1, exp: '(500 * 4 * 3) / 100 = 5 * 12 = $60.' },
    { topic: 'Compound Interest', q: 'Compound interest on $200 at 10% for 1 year is:', opts: ['$10', '$20', '$30', '$40'], ans: 1, exp: '10% of 200 = $20.' }
  ];

  mathTopics.forEach((item, idx) => {
    extraQuestions.push({
      id: `gen-math-extra-${idx + 1}`,
      category: 'aptitude',
      topic: item.topic,
      difficulty: 'Easy',
      questionType: 'mcq',
      questionText: item.q,
      options: item.opts as [string, string, string, string],
      correctAnswer: item.ans,
      explanation: item.exp,
      estimatedTimeSec: 25
    });
  });

  // Logical Reasoning additional
  const logicalTopics = [
    { topic: 'Number Series', q: 'Find the next number: 9, 18, 36, 72, ?', opts: ['108', '144', '128', '156'], ans: 1, exp: 'Each term doubles: 72 * 2 = 144.' },
    { topic: 'Missing Number', q: 'Find the missing number: 10, 20, 30, ?, 50', opts: ['35', '40', '45', '42'], ans: 1, exp: 'Adding 10: 30 + 10 = 40.' },
    { topic: 'Odd One Out', q: 'Find the odd one out: 13, 17, 19, 21', opts: ['13', '17', '19', '21'], ans: 3, exp: '21 is composite (3 * 7); the others are prime numbers.' },
    { topic: 'Coding and Decoding', q: 'If "GO" is "715", what is "NO"?', opts: ['1415', '1315', '1515', '1416'], ans: 0, exp: 'N=14, O=15 -> "1415".' },
    { topic: 'Blood Relations', q: 'A’s father is B’s son. How is B related to A?', opts: ['Father', 'Grandfather', 'Brother', 'Uncle'], ans: 1, exp: 'Father’s father is Grandfather.' },
    { topic: 'Direction Sense', q: 'Facing North, you turn 180 degrees clockwise. Which direction are you facing?', opts: ['East', 'South', 'West', 'North'], ans: 1, exp: 'Opposite of North is South.' },
    { topic: 'Analogy', q: 'Key : Lock :: Password : ?', opts: ['Computer', 'Account', 'Firewall', 'Login'], ans: 1, exp: 'A key unlocks a lock; a password unlocks an account.' },
    { topic: 'Ranking', q: 'If Liam is 3rd in a line of 10 people, how many people are behind him?', opts: ['6', '7', '8', '9'], ans: 1, exp: '10 - 3 = 7 people.' },
    { topic: 'Alphabet Series', q: 'Next letter: C, F, I, L, ?', opts: ['M', 'N', 'O', 'P'], ans: 2, exp: 'Adding 3: C(3), F(6), I(9), L(12), O(15).' },
    { topic: 'Logical Sequences', q: 'Arrange: 1. Code  2. Compile  3. Execute  4. Debug', opts: ['1, 2, 3, 4', '2, 1, 3, 4', '1, 3, 2, 4', '4, 1, 2, 3'], ans: 0, exp: 'Code -> Compile -> Execute -> Debug.' }
  ];

  logicalTopics.forEach((item, idx) => {
    extraQuestions.push({
      id: `gen-log-extra-${idx + 1}`,
      category: item.topic === 'Number Series' ? 'number-series' : item.topic === 'Missing Number' ? 'missing-numbers' : 'logical',
      topic: item.topic,
      difficulty: 'Easy',
      questionType: item.topic === 'Number Series' ? 'number-series' : item.topic === 'Missing Number' ? 'missing-number' : 'mcq',
      questionText: item.q,
      options: item.opts as [string, string, string, string],
      correctAnswer: item.ans,
      explanation: item.exp,
      estimatedTimeSec: 20
    });
  });

  // Error Finding additional
  const errorTopics = [
    { q: 'Identify the wrong term: 1, 4, 9, 16, 26, 36', opts: ['9', '16', '26', '36'], ans: 2, exp: 'Squares: 1, 4, 9, 16, 25 (given 26), 36. 26 is wrong.' },
    { q: 'Identify the incorrect operation: 20 ? 5 = 4', opts: ['+', '-', '/', '*'], ans: 2, exp: '20 / 5 = 4.' },
    { q: 'Find the missing value: 50, 45, 40, ?, 30', opts: ['32', '35', '38', '36'], ans: 1, exp: 'Subtracting 5 each time: 40 - 5 = 35.' },
    { q: 'Identify the broken pattern: AA, BB, CC, EE, FF', opts: ['AA', 'CC', 'EE', 'FF'], ans: 2, exp: 'EE skipped DD in consecutive letter pairs.' },
    { q: 'Choose the correct order of data structures by LIFO vs FIFO:', opts: ['Stack is LIFO, Queue is FIFO', 'Stack is FIFO, Queue is LIFO', 'Both are FIFO', 'Both are LIFO'], ans: 0, exp: 'Stack = Last In First Out (LIFO); Queue = First In First Out (FIFO).' }
  ];

  errorTopics.forEach((item, idx) => {
    extraQuestions.push({
      id: `gen-err-extra-${idx + 1}`,
      category: 'error-finding',
      topic: 'Error Finding',
      difficulty: 'Easy',
      questionType: 'incorrect-number',
      questionText: item.q,
      options: item.opts as [string, string, string, string],
      correctAnswer: item.ans,
      explanation: item.exp,
      estimatedTimeSec: 20
    });
  });

  // Programming languages expansion
  const progQuestions = [
    // Python
    { cat: 'python' as CategoryId, topic: 'Variables and Data Types', q: 'What is the type of 3.14 in Python?', opts: ['int', 'float', 'double', 'decimal'], ans: 1, exp: 'Floating point numbers with decimals are of type float in Python.' },
    { cat: 'python' as CategoryId, topic: 'Operators', q: 'What is the output of 10 % 3 in Python?', opts: ['1', '3', '0', '3.33'], ans: 0, exp: '10 divided by 3 is 3 with remainder 1.' },
    { cat: 'python' as CategoryId, topic: 'Strings', q: 'What does "python".upper() return?', opts: ['Python', 'PYTHON', 'python', 'Error'], ans: 1, exp: 'upper() converts all characters to uppercase: "PYTHON".' },
    { cat: 'python' as CategoryId, topic: 'Lists and Tuples', q: 'What is the index of the last element in list my_list in Python?', opts: ['-1', '0', 'len(my_list)', 'last'], ans: 0, exp: 'Negative indexing: -1 accesses the last element.' },
    { cat: 'python' as CategoryId, topic: 'Functions', q: 'Which keyword defines a function in Python?', opts: ['function', 'def', 'func', 'define'], ans: 1, exp: 'def keyword defines functions in Python.' },

    // C
    { cat: 'c' as CategoryId, topic: 'Variables and Data Types', q: 'Which header file is needed for printf in C?', opts: ['<stdlib.h>', '<stdio.h>', '<conio.h>', '<string.h>'], ans: 1, exp: '<stdio.h> provides standard input/output functions.' },
    { cat: 'c' as CategoryId, topic: 'Operators', q: 'What does ++x (pre-increment) do in C?', opts: ['Increments x after using its value', 'Increments x first, then yields new value', 'Multiplies x by 2', 'Does not change x'], ans: 1, exp: 'Pre-increment modifies value before expression evaluation.' },
    { cat: 'c' as CategoryId, topic: 'Arrays', q: 'If int arr[5] is declared, what is the valid index range?', opts: ['1 to 5', '0 to 4', '0 to 5', '-1 to 4'], ans: 1, exp: 'Array indices range from 0 to size-1 (0 to 4).' },
    { cat: 'c' as CategoryId, topic: 'Functions', q: 'What must a C function specify before its name?', opts: ['Return type', 'Parameter count', 'Memory size', 'Namespace'], ans: 0, exp: 'Return type like int, void, float, etc.' },
    { cat: 'c' as CategoryId, topic: 'Pointers', q: 'Which operator dereferences a pointer to get its value?', opts: ['&', '*', '->', '.'], ans: 1, exp: '* is the dereference operator.' },

    // C++
    { cat: 'cpp' as CategoryId, topic: 'Basic Syntax', q: 'Which header file provides cout and cin in C++?', opts: ['<stdio.h>', '<iostream>', '<conio.h>', '<ostream>'], ans: 1, exp: '<iostream> provides standard stream objects.' },
    { cat: 'cpp' as CategoryId, topic: 'Basic OOP Concepts', q: 'What is the mechanism of deriving a new class from an existing class?', opts: ['Inheritance', 'Encapsulation', 'Polymorphism', 'Abstraction'], ans: 0, exp: 'Inheritance enables derived classes to acquire members of base classes.' },
    { cat: 'cpp' as CategoryId, topic: 'Classes and Objects', q: 'What is an instance of a class called?', opts: ['Method', 'Object', 'Variable', 'Function'], ans: 1, exp: 'An object is a concrete instance of a class blueprint.' },
    { cat: 'cpp' as CategoryId, topic: 'Input and Output', q: 'Which operator is used with cin for reading input?', opts: ['<<', '>>', '::', '->'], ans: 1, exp: 'cin >> var extracts input from standard input.' },
    { cat: 'cpp' as CategoryId, topic: 'Functions', q: 'What is a function declared inside a class called in C++?', opts: ['Member function (method)', 'Subroutine', 'Constructor', 'Struct'], ans: 0, exp: 'Functions belonging to a class are member functions.' },

    // Java
    { cat: 'java' as CategoryId, topic: 'Java Basics', q: 'Which component executes Java bytecode?', opts: ['JDK', 'JVM', 'JRE Editor', 'Javac'], ans: 1, exp: 'The Java Virtual Machine (JVM) executes compiled bytecode.' },
    { cat: 'java' as CategoryId, topic: 'Variables and Data Types', q: 'Which of the following is NOT a primitive data type in Java?', opts: ['int', 'boolean', 'String', 'char'], ans: 2, exp: 'String is a reference class type, not a primitive.' },
    { cat: 'java' as CategoryId, topic: 'Operators', q: 'What is the result of 15 / 2 in Java integer division?', opts: ['7.5', '7', '8', '7.0'], ans: 1, exp: 'Integer division truncates decimal part to 7.' },
    { cat: 'java' as CategoryId, topic: 'Classes and Objects', q: 'Which keyword creates a new object instance in Java?', opts: ['create', 'new', 'instance', 'alloc'], ans: 1, exp: 'The new keyword instantiates objects on the heap.' },
    { cat: 'java' as CategoryId, topic: 'Inheritance Basics', q: 'What is the root superclass of all classes in Java?', opts: ['java.lang.Class', 'java.lang.Object', 'java.lang.Root', 'java.lang.System'], ans: 1, exp: 'Object is the top root ancestor of all Java classes.' }
  ];

  progQuestions.forEach((item, idx) => {
    extraQuestions.push({
      id: `gen-prog-extra-${idx + 1}`,
      category: item.cat,
      topic: item.topic,
      difficulty: 'Easy',
      questionType: 'mcq',
      questionText: item.q,
      options: item.opts as [string, string, string, string],
      correctAnswer: item.ans,
      explanation: item.exp,
      estimatedTimeSec: 20
    });
  });

  return extraQuestions;
}
