import { Question } from '../../types';

export const programmingExtQuestions: Question[] = [
  // --- PYTHON SUBTOPICS ---
  {
    id: 'pe-py-1',
    category: 'python',
    topic: 'Operators',
    difficulty: 'Easy',
    questionType: 'output-prediction',
    questionText: 'What is the value of 5 == 5.0 in Python?',
    options: ['True', 'False', 'TypeError', 'SyntaxError'],
    correctAnswer: 0,
    explanation: 'Python compares numeric value across int and float. 5 and 5.0 represent the same numerical quantity, so `5 == 5.0` is `True`.',
    shortcutTip: 'Value equality `==` ignores numeric type difference (int vs float).',
    estimatedTimeSec: 10
  },
  {
    id: 'pe-py-2',
    category: 'python',
    topic: 'Strings',
    difficulty: 'Easy',
    questionType: 'output-prediction',
    questionText: 'What does "abc" * 2 produce in Python?',
    options: ['abc2', 'abcabc', 'aabbcc', 'Error'],
    correctAnswer: 1,
    explanation: 'String multiplication repeats the string n times.',
    shortcutTip: '"abc" * 2 = "abcabc".',
    estimatedTimeSec: 10
  },
  {
    id: 'pe-py-3',
    category: 'python',
    topic: 'Lists and Tuples',
    difficulty: 'Easy',
    questionType: 'output-prediction',
    questionText: 'What does nums.pop() do on a Python list nums?',
    options: [
      'Removes and returns the last element',
      'Removes the first element',
      'Empties the whole list',
      'Reverses the list'
    ],
    correctAnswer: 0,
    explanation: '`list.pop()` without an index argument removes and returns the last item from the list.',
    shortcutTip: 'pop() defaults to removing the last element (index -1).',
    estimatedTimeSec: 10
  },
  {
    id: 'pe-py-4',
    category: 'python',
    topic: 'Dictionaries',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'Which of the following can be used as a dictionary key in Python?',
    options: ['[1, 2] (List)', '{"a": 1} (Dict)', '(1, 2) (Tuple)', '{1, 2} (Set)'],
    correctAnswer: 2,
    explanation: 'Dictionary keys in Python must be hashable and immutable. Tuples containing immutable elements are hashable, whereas Lists, Dictionaries, and Sets are mutable and unhashable.',
    shortcutTip: 'Only immutable types (str, int, tuple) can be dictionary keys.',
    estimatedTimeSec: 15
  },
  {
    id: 'pe-py-5',
    category: 'python',
    topic: 'Find Code Error',
    difficulty: 'Easy',
    questionType: 'coding-error',
    questionText: 'What will happen when executing: int("hello")?',
    options: ['ValueError', 'TypeError', 'Returns 0', 'Returns None'],
    correctAnswer: 0,
    explanation: 'Passing a non-numeric string to `int()` raises a `ValueError: invalid literal for int() with base 10`.',
    shortcutTip: 'Invalid string to number conversion raises ValueError.',
    estimatedTimeSec: 10
  },

  // --- C SUBTOPICS ---
  {
    id: 'pe-c-1',
    category: 'c',
    topic: 'Variables and Data Types',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'In C, which header file is required to use boolean types (bool, true, false)?',
    options: ['<stdbool.h>', '<boolean.h>', '<bool.h>', '<stdio.h>'],
    correctAnswer: 0,
    explanation: 'Standard C99 introduced `<stdbool.h>` which defines `bool`, `true`, and `false`.',
    shortcutTip: '<stdbool.h> for bool in C.',
    estimatedTimeSec: 10
  },
  {
    id: 'pe-c-2',
    category: 'c',
    topic: 'printf and scanf',
    difficulty: 'Easy',
    questionType: 'output-prediction',
    questionText: 'What is the format specifier to print a double or float with 2 decimal places in C?',
    options: ['%.2f', '%2f', '%f.2', '%d.2'],
    correctAnswer: 0,
    explanation: '`%.2f` specifies a floating point number formatted to two digits after the decimal point.',
    shortcutTip: '`%.Nf` sets precision to N digits.',
    estimatedTimeSec: 10
  },
  {
    id: 'pe-c-3',
    category: 'c',
    topic: 'Loops',
    difficulty: 'Easy',
    questionType: 'output-prediction',
    questionText: 'What does the continue statement do in a C loop?',
    options: [
      'Exits the loop immediately',
      'Skips the rest of the current iteration and jumps to the next loop cycle',
      'Restarts the program',
      'Pauses the thread'
    ],
    correctAnswer: 1,
    explanation: '`continue` skips remaining statements in the current iteration and proceeds directly to the next iteration (evaluating the loop condition/increment).',
    shortcutTip: '`break` exits the loop; `continue` skips to next iteration.',
    estimatedTimeSec: 15
  },
  {
    id: 'pe-c-4',
    category: 'c',
    topic: 'Pointers',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'What is a pointer variable in C?',
    options: [
      'A variable that stores the memory address of another variable',
      'A variable that points to a line in source code',
      'A floating point number with infinite precision',
      'A built-in GUI cursor coordinate'
    ],
    correctAnswer: 0,
    explanation: 'A pointer is a variable whose value is the physical or virtual memory address of another variable.',
    shortcutTip: 'Pointer = memory address holder.',
    estimatedTimeSec: 10
  },
  {
    id: 'pe-c-5',
    category: 'c',
    topic: 'Syntax Errors',
    difficulty: 'Easy',
    questionType: 'syntax-error',
    questionText: 'What is wrong with this C macro definition: `#define MAX 100;`?',
    options: [
      'The trailing semicolon (;) will be expanded into code, likely causing syntax errors',
      'MAX must be in lowercase',
      '#define requires an equals sign: #define MAX = 100',
      'Macros cannot define numbers'
    ],
    correctAnswer: 0,
    explanation: 'C preprocessor `#define` directives do not end with semicolons. If a semicolon is included, substituting `MAX` replaces it with `100;`, which often produces compiler syntax errors like `int arr[100;];`.',
    shortcutTip: 'Never put a semicolon at the end of a #define macro line.',
    estimatedTimeSec: 20
  },

  // --- C++ SUBTOPICS ---
  {
    id: 'pe-cpp-1',
    category: 'cpp',
    topic: 'Basic Syntax',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'Which C++ keyword is used to declare a constant that cannot be altered during execution?',
    options: ['constant', 'const', 'immutable', 'final'],
    correctAnswer: 1,
    explanation: 'In C++, `const` is the keyword used to declare read-only constant variables and parameters.',
    shortcutTip: '`const` in C++.',
    estimatedTimeSec: 10
  },
  {
    id: 'pe-cpp-2',
    category: 'cpp',
    topic: 'Classes and Objects',
    difficulty: 'Easy',
    questionType: 'output-prediction',
    questionText: 'What pointer inside a member function refers to the invoking object itself in C++?',
    options: ['this', 'self', 'me', 'super'],
    correctAnswer: 0,
    explanation: '`this` is an implicit pointer accessible within non-static member functions that points to the object on which the function was called.',
    shortcutTip: '`this` pointer refers to current object in C++ and Java.',
    estimatedTimeSec: 10
  },
  {
    id: 'pe-cpp-3',
    category: 'cpp',
    topic: 'Functions',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'What does the "inline" keyword suggest to the C++ compiler?',
    options: [
      'To insert the function code directly at the call site to eliminate function call overhead',
      'To run the function on a background thread',
      'To prevent the function from taking parameters',
      'To enforce single-line code formatting'
    ],
    correctAnswer: 0,
    explanation: '`inline` suggests that the compiler expand the function body at every point of invocation to save the overhead of stack frame creation and jumping.',
    shortcutTip: '`inline` substitutes function code directly at call sites.',
    estimatedTimeSec: 15
  },
  {
    id: 'pe-cpp-4',
    category: 'cpp',
    topic: 'Basic OOP Concepts',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'What is an abstract class in C++?',
    options: [
      'A class that has at least one pure virtual function (e.g. virtual void fn() = 0;)',
      'A class without any methods',
      'A class that cannot be inherited',
      'A class with only private members'
    ],
    correctAnswer: 0,
    explanation: 'In C++, any class containing at least one pure virtual function (`= 0`) is an abstract class and cannot be instantiated directly.',
    shortcutTip: 'Pure virtual function (`= 0`) makes a class abstract.',
    estimatedTimeSec: 15
  },

  // --- JAVA SUBTOPICS ---
  {
    id: 'pe-java-1',
    category: 'java',
    topic: 'Java Basics',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'What does JVM stand for?',
    options: [
      'Java Virtual Machine',
      'Java Variable Manager',
      'Java Visual Mode',
      'Java Vector Module'
    ],
    correctAnswer: 0,
    explanation: 'JVM stands for Java Virtual Machine.',
    shortcutTip: 'Java Virtual Machine.',
    estimatedTimeSec: 5
  },
  {
    id: 'pe-java-2',
    category: 'java',
    topic: 'Strings',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'Are String objects in Java mutable or immutable?',
    options: [
      'Immutable (cannot be changed after creation)',
      'Mutable (can be modified in place)',
      'Mutable only if declared without final',
      'Depends on whether they are in the String pool'
    ],
    correctAnswer: 0,
    explanation: 'In Java, `String` is completely immutable. Any string modification methods (like `.concat()`, `.replace()`) return a brand new String object rather than mutating the original.',
    shortcutTip: 'Strings in Java are immutable. Use StringBuilder for mutable strings.',
    estimatedTimeSec: 15
  },
  {
    id: 'pe-java-3',
    category: 'java',
    topic: 'Constructors',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'Which keyword is used in a subclass constructor to invoke the superclass constructor in Java?',
    options: ['super()', 'parent()', 'base()', 'this()'],
    correctAnswer: 0,
    explanation: '`super()` invokes the constructor of the direct superclass. If used, it must be the first statement in the constructor.',
    shortcutTip: '`super()` calls parent constructor; `this()` calls another constructor in same class.',
    estimatedTimeSec: 15
  },
  {
    id: 'pe-java-4',
    category: 'java',
    topic: 'Compilation Errors',
    difficulty: 'Easy',
    questionType: 'coding-error',
    questionText: 'What happens if a Java file named "Student.java" contains a public class named "Employee"?',
    options: [
      'Compilation error: the public class must be declared in a file matching its name: Employee.java',
      'It compiles with a warning',
      'The file is automatically renamed by javac',
      'No error; class name and file name can be completely different'
    ],
    correctAnswer: 0,
    explanation: 'In Java, a public top-level class must reside in a file whose base name matches the class name exactly, case-sensitively (`Employee.java`).',
    shortcutTip: 'Public class name must match file name exactly.',
    estimatedTimeSec: 15
  },
  {
    id: 'pe-java-5',
    category: 'java',
    topic: 'Methods',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'Can static methods in Java access the "this" keyword?',
    options: [
      'No, because static methods belong to the class and there is no "this" object instance in scope',
      'Yes, "this" refers to the class object',
      'Yes, if called from another static method',
      'Only in final classes'
    ],
    correctAnswer: 0,
    explanation: '`this` refers to the current object instance. Since static methods belong to the class rather than any particular instance, `this` is not defined in static context.',
    shortcutTip: 'Static methods have NO `this` reference.',
    estimatedTimeSec: 15
  }
];
