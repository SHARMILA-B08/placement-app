import { Question } from '../../types';

export const cppQuestions: Question[] = [
  // --- BASIC SYNTAX & I/O ---
  {
    id: 'cpp-io-1',
    category: 'cpp',
    topic: 'Input and Output',
    difficulty: 'Easy',
    questionType: 'output-prediction',
    questionText: 'Which operator is used with std::cout for stream insertion in C++?',
    options: ['>>', '<<', '::', '->'],
    correctAnswer: 1, // B = <<
    explanation: '`<<` is the stream insertion operator used with `std::cout` to send data to standard output. `>>` is the stream extraction operator used with `std::cin`.',
    shortcutTip: 'Mnemonic: `cout <<` pushes data OUT to the screen; `cin >>` pulls data IN from keyboard.',
    whyWrong: '`>>` is extraction for `cin`. `::` is scope resolution, and `->` is member access via pointer.',
    estimatedTimeSec: 15
  },
  {
    id: 'cpp-io-2',
    category: 'cpp',
    topic: 'Basic Syntax',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'What is the purpose of "using namespace std;" in a C++ program?',
    options: [
      'It imports external C++ packages from the internet',
      'It allows using names from the standard namespace without prefixing "std::"',
      'It enables multi-threading in the standard runtime',
      'It allocates dynamic memory on the heap'
    ],
    correctAnswer: 1, // B
    explanation: '`using namespace std;` brings all identifiers from the `std` namespace into the current scope, so you can write `cout`, `cin`, and `vector` directly without writing `std::cout` each time.',
    shortcutTip: '`using namespace std;` avoids typing `std::` everywhere.',
    whyWrong: 'It does not import external network packages or enable multi-threading.',
    estimatedTimeSec: 20
  },

  // --- CLASSES AND OBJECTS ---
  {
    id: 'cpp-oop-1',
    category: 'cpp',
    topic: 'Classes and Objects',
    difficulty: 'Medium',
    questionType: 'mcq',
    questionText: 'By default, what is the access specifier for members of a "class" in C++?',
    options: ['public', 'private', 'protected', 'internal'],
    correctAnswer: 1, // B = private
    explanation: 'In C++, members of a `class` are `private` by default if no access specifier is specified. In contrast, members of a `struct` are `public` by default.',
    shortcutTip: 'Class = default private. Struct = default public.',
    whyWrong: 'In languages like Java or C#, defaults differ, but in C++ class members default to private.',
    estimatedTimeSec: 20
  },
  {
    id: 'cpp-oop-2',
    category: 'cpp',
    topic: 'Basic OOP Concepts',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'Which OOP principle is demonstrated when data variables are declared private and accessible only via public getters/setters?',
    options: ['Polymorphism', 'Inheritance', 'Encapsulation', 'Abstraction'],
    correctAnswer: 2, // C = Encapsulation
    explanation: 'Encapsulation is the bundling of data and the methods that operate on that data into a single unit (class), while restricting direct access to some of the object’s components using access modifiers.',
    shortcutTip: 'Data hiding + bundling data with methods = Encapsulation.',
    whyWrong: 'Inheritance is code reuse between parent and child classes. Polymorphism is many forms (overriding/overloading).',
    estimatedTimeSec: 20
  },

  // --- OUTPUT PREDICTION ---
  {
    id: 'cpp-out-1',
    category: 'cpp',
    topic: 'Functions',
    difficulty: 'Medium',
    questionType: 'output-prediction',
    questionText: 'What is the output of this C++ pass-by-reference function?',
    codeSnippet: '#include <iostream>\nusing namespace std;\n\nvoid modify(int &x) {\n    x = x * 2;\n}\n\nint main() {\n    int a = 10;\n    modify(a);\n    cout << a;\n    return 0;\n}',
    options: ['10', '20', '0', 'Compilation error'],
    correctAnswer: 1, // B = 20
    explanation: 'The parameter `int &x` receives `a` by reference (an alias to `a`). When `x = x * 2` runs, the original variable `a` in `main` is directly modified to 20.',
    shortcutTip: '`&` in parameter list means pass-by-reference; modifications affect caller’s variable.',
    whyWrong: '10 would be printed only if `x` was passed by value (`int x`) instead of reference (`int &x`).',
    estimatedTimeSec: 25
  },
  {
    id: 'cpp-out-2',
    category: 'cpp',
    topic: 'Operators',
    difficulty: 'Medium',
    questionType: 'output-prediction',
    questionText: 'What will be output by the following code?',
    codeSnippet: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int x = 5;\n    bool res = (x == 5) && (++x > 5);\n    cout << x << " " << res;\n    return 0;\n}',
    options: ['5 1', '6 1', '6 true', '5 0'],
    correctAnswer: 1, // B = 6 1
    explanation: '`(x == 5)` is true, so logical AND `&&` evaluates the right operand. In `(++x > 5)`, pre-increment changes `x` to 6, and `6 > 5` is true (1). In C++, boolean true prints as `1` by default unless `boolalpha` is enabled. Output is `6 1`.',
    shortcutTip: 'Both sides evaluated because left is true. In C++, `cout << true` displays `1`.',
    whyWrong: 'Notice `cout` outputs `1` rather than the text word `"true"` unless `std::boolalpha` is set.',
    estimatedTimeSec: 30
  },

  // --- CONSTRUCTORS & DESTRUCTORS ---
  {
    id: 'cpp-cons-1',
    category: 'cpp',
    topic: 'Classes and Objects',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'What is a characteristic of a constructor in C++?',
    options: [
      'It must specify a return type of void',
      'It has the same name as the class and has no return type',
      'It can only be invoked manually via the dot operator',
      'A class cannot have more than one constructor'
    ],
    correctAnswer: 1, // B
    explanation: 'In C++, constructors have the exact same name as the class and do not have any return type (not even `void`). They are called automatically when an object of the class is instantiated.',
    shortcutTip: 'Constructor: Same name as class, NO return type, runs on instantiation.',
    whyWrong: 'Constructors can be overloaded (multiple constructors), and cannot specify `void`.',
    estimatedTimeSec: 20
  },

  // --- LOOPS AND ARRAYS ---
  {
    id: 'cpp-arr-1',
    category: 'cpp',
    topic: 'Loops and Arrays',
    difficulty: 'Easy',
    questionType: 'output-prediction',
    questionText: 'What does this C++ range-based for loop print?',
    codeSnippet: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int nums[] = {2, 4, 6};\n    for (int n : nums) {\n        cout << n * 2 << " ";\n    }\n    return 0;\n}',
    options: ['2 4 6 ', '4 8 12 ', '4 8 ', '2 4 '],
    correctAnswer: 1, // B = 4 8 12
    explanation: 'The range-based for loop iterates over each element of `nums`. In each iteration, it outputs `n * 2`: 2*2=4, 4*2=8, 6*2=12.',
    shortcutTip: 'Modern C++ range loop iterates through all elements sequentially.',
    whyWrong: 'Each element is multiplied by 2 before outputting.',
    estimatedTimeSec: 15
  }
];
