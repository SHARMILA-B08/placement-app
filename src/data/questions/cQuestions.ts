import { Question } from '../../types';

export const cQuestions: Question[] = [
  // --- VARIABLES AND DATA TYPES ---
  {
    id: 'c-var-1',
    category: 'c',
    topic: 'Variables and Data Types',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'What is the format specifier used in printf() to print a single character in C?',
    options: ['%s', '%c', '%d', '%f'],
    correctAnswer: 1, // B = %c
    explanation: 'In C, `%c` is used for single characters (`char`), `%s` for strings (`char[]`), `%d` for signed integers (`int`), and `%f` for floating-point numbers (`float`).',
    shortcutTip: '%c = character, %s = string, %d = decimal integer, %f = float.',
    whyWrong: '%s is for null-terminated strings, not single char primitives.',
    estimatedTimeSec: 15
  },
  {
    id: 'c-var-2',
    category: 'c',
    topic: 'printf and scanf',
    difficulty: 'Easy',
    questionType: 'syntax-error',
    questionText: 'Why is the following scanf() call problematic?',
    codeSnippet: 'int age;\nscanf("%d", age);',
    options: [
      'Missing the address-of operator (&) before age: &age',
      'scanf cannot read integers',
      'age must be initialized to 0 first',
      'The format specifier must be %i instead of %d'
    ],
    correctAnswer: 0, // A
    explanation: '`scanf()` requires pointers (memory addresses) to store inputs. Passing `age` passes its uninitialized value rather than its memory location, resulting in undefined behavior or a segmentation fault. The correct call is `scanf("%d", &age);`.',
    shortcutTip: 'Remember: `scanf` needs the address `&var` so it knows where in memory to write the user input.',
    whyWrong: 'Without `&`, scanf tries to write to an arbitrary memory address pointed to by the uninitialized value of age.',
    estimatedTimeSec: 20
  },

  // --- OPERATORS & EVALUATION ---
  {
    id: 'c-op-1',
    category: 'c',
    topic: 'Operators',
    difficulty: 'Medium',
    questionType: 'output-prediction',
    questionText: 'What is the output of the following C code?',
    codeSnippet: '#include <stdio.h>\nint main() {\n    int a = 5;\n    int b = a++;\n    printf("%d %d", a, b);\n    return 0;\n}',
    options: ['5 5', '6 5', '6 6', '5 6'],
    correctAnswer: 1, // B = 6 5
    explanation: 'In post-increment (`a++`), the current value of `a` (5) is first assigned to `b`, and then `a` is incremented to 6. Thus, `a` becomes 6 and `b` receives 5.',
    shortcutTip: 'Post-increment (`a++`): Use original value first, increment afterwards. Pre-increment (`++a`): Increment first, use new value.',
    whyWrong: '6 6 occurs if pre-increment `++a` was used instead.',
    estimatedTimeSec: 25
  },
  {
    id: 'c-op-2',
    category: 'c',
    topic: 'Operators',
    difficulty: 'Easy',
    questionType: 'output-prediction',
    questionText: 'What does this program print?',
    codeSnippet: '#include <stdio.h>\nint main() {\n    int x = 7 / 2;\n    printf("%d", x);\n    return 0;\n}',
    options: ['3.5', '3', '4', 'Compilation error'],
    correctAnswer: 1, // B = 3
    explanation: 'In C, dividing two integers (`7 / 2`) results in integer truncation where the decimal part is discarded, giving 3.',
    shortcutTip: 'Integer division in C truncates toward zero: 7 / 2 = 3.',
    whyWrong: '3.5 requires at least one floating-point operand (e.g. `7.0 / 2`).',
    estimatedTimeSec: 15
  },

  // --- CONDITIONALS & SWITCH ---
  {
    id: 'c-cond-1',
    category: 'c',
    topic: 'Conditional Statements',
    difficulty: 'Medium',
    questionType: 'output-prediction',
    questionText: 'What is printed by this code due to missing break statements?',
    codeSnippet: '#include <stdio.h>\nint main() {\n    int num = 2;\n    switch(num) {\n        case 1: printf("One ");\n        case 2: printf("Two ");\n        case 3: printf("Three ");\n        default: printf("Default");\n    }\n    return 0;\n}',
    options: [
      'Two ',
      'Two Three Default',
      'Two Three ',
      'Default'
    ],
    correctAnswer: 1, // B = Two Three Default
    explanation: 'In C `switch` statements, if a `case` matches and does not contain a `break`, execution falls through to all subsequent cases and the default case. Here, matching case 2 prints "Two ", then falls through to case 3 ("Three ") and default ("Default").',
    shortcutTip: 'Switch fallthrough: Missing `break` executes every following branch until the closing brace or a `break` is encountered.',
    whyWrong: 'Without `break`, the switch statement does NOT automatically exit after matching case 2.',
    estimatedTimeSec: 25
  },

  // --- LOOPS ---
  {
    id: 'c-loop-1',
    category: 'c',
    topic: 'Loops',
    difficulty: 'Easy',
    questionType: 'output-prediction',
    questionText: 'How many times will "Hello" be printed?',
    codeSnippet: '#include <stdio.h>\nint main() {\n    int i = 0;\n    while(i < 3) {\n        printf("Hello ");\n        i++;\n    }\n    return 0;\n}',
    options: ['2 times', '3 times', '4 times', 'Infinite times'],
    correctAnswer: 1, // B = 3 times
    explanation: 'The loop executes for `i = 0`, `i = 1`, and `i = 2`. When `i` becomes 3, condition `3 < 3` is false and the loop terminates. Total iterations = 3.',
    shortcutTip: 'For `i = 0; i < N; i++`, the loop body runs exactly N times.',
    whyWrong: 'Notice strict inequality `< 3`. Iterations are 0, 1, 2 (3 times).',
    estimatedTimeSec: 15
  },

  // --- ARRAYS AND STRINGS ---
  {
    id: 'c-arr-1',
    category: 'c',
    topic: 'Arrays',
    difficulty: 'Easy',
    questionType: 'output-prediction',
    questionText: 'What is printed by this array indexing in C?',
    codeSnippet: '#include <stdio.h>\nint main() {\n    int arr[5] = {10, 20, 30, 40, 50};\n    printf("%d", arr[2]);\n    return 0;\n}',
    options: ['10', '20', '30', '40'],
    correctAnswer: 2, // C = 30
    explanation: 'C arrays use zero-based indexing. `arr[0]` is 10, `arr[1]` is 20, and `arr[2]` is 30.',
    shortcutTip: 'Index 2 is the 3rd element in a 0-indexed array.',
    whyWrong: '20 is at index 1, not index 2.',
    estimatedTimeSec: 15
  },
  {
    id: 'c-str-1',
    category: 'c',
    topic: 'Strings',
    difficulty: 'Medium',
    questionType: 'mcq',
    questionText: 'What character marks the end of a string in C?',
    options: ['\\n (newline)', '\\0 (null terminator)', 'EOF', 'Space character'],
    correctAnswer: 1, // B = \0
    explanation: 'In C, strings are null-terminated character arrays. The null byte `\'\\0\'` (ASCII 0) denotes the end of the string, allowing standard library functions like `strlen()` and `printf("%s")` to know where the text finishes.',
    shortcutTip: 'Strings in C must always end with the null terminator `\'\\0\'`.',
    whyWrong: '\\n is a line feed newline character, which is just regular string content.',
    estimatedTimeSec: 15
  },

  // --- POINTERS (BASIC INTRODUCTION) ---
  {
    id: 'c-ptr-1',
    category: 'c',
    topic: 'Pointers',
    difficulty: 'Medium',
    questionType: 'output-prediction',
    questionText: 'What is the output of the following pointer code?',
    codeSnippet: '#include <stdio.h>\nint main() {\n    int val = 25;\n    int *ptr = &val;\n    *ptr = 50;\n    printf("%d", val);\n    return 0;\n}',
    options: ['25', '50', 'Address of val', 'Segmentation fault'],
    correctAnswer: 1, // B = 50
    explanation: '`ptr` stores the memory address of `val`. Dereferencing `*ptr = 50;` modifies the value stored at that address, so `val` becomes 50.',
    shortcutTip: '`&` gives address, `*` accesses the value at that address. Modifying `*ptr` directly changes the original variable.',
    whyWrong: 'val was overwritten through the pointer dereference, so it is no longer 25.',
    estimatedTimeSec: 25
  },

  // --- FIND SYNTAX ERRORS ---
  {
    id: 'c-err-1',
    category: 'c',
    topic: 'Syntax Errors',
    difficulty: 'Easy',
    questionType: 'syntax-error',
    questionText: 'Which line in the following code contains a syntax error?',
    codeSnippet: '1: #include <stdio.h>\n2: int main() {\n3:     int x = 10\n4:     printf("%d", x);\n5:     return 0;\n6: }',
    options: ['Line 1', 'Line 2', 'Line 3', 'Line 5'],
    correctAnswer: 2, // C = Line 3
    explanation: 'In C, every statement must end with a semicolon (`;`). Line 3 is missing a terminating semicolon after `int x = 10`.',
    shortcutTip: 'Missing semicolon at end of statement is the most common beginner C syntax error.',
    whyWrong: 'Line 3 lacks `;`. Line 4 and 5 are syntactically valid.',
    estimatedTimeSec: 15
  }
];
