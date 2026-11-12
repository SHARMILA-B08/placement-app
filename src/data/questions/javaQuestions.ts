import { Question } from '../../types';

export const javaQuestions: Question[] = [
  // --- JAVA BASICS & SYSTEM.OUT.PRINTLN ---
  {
    id: 'java-basic-1',
    category: 'java',
    topic: 'System.out.println',
    difficulty: 'Easy',
    questionType: 'output-prediction',
    questionText: 'What is the output of the following Java print statement?',
    codeSnippet: 'public class Test {\n    public static void main(String[] args) {\n        System.out.println("Result: " + 10 + 20);\n    }\n}',
    options: ['Result: 30', 'Result: 1020', 'Result: 10 20', 'Compilation error'],
    correctAnswer: 1, // B = Result: 1020
    explanation: 'The `+` operator evaluates from left to right. First, `"Result: " + 10` evaluates to the string `"Result: 10"`. Next, `"Result: 10" + 20` treats 20 as a string concatenation, producing `"Result: 1020"`. To get 30, parentheses are required: `"Result: " + (10 + 20)`.',
    shortcutTip: 'String + number results in string concatenation! If a string is on the left, following numbers are concatenated as text unless parenthesized.',
    whyWrong: 'Without parentheses around `10 + 20`, arithmetic addition is not performed.',
    estimatedTimeSec: 25
  },
  {
    id: 'java-basic-2',
    category: 'java',
    topic: 'Java Basics',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'Why is Java known as a platform-independent language?',
    options: [
      'Java code is executed directly by the computer BIOS',
      'Java compiler generates bytecode which is executed by the Java Virtual Machine (JVM)',
      'Java does not use memory management or garbage collection',
      'Java programs only run inside web browsers'
    ],
    correctAnswer: 1, // B
    explanation: 'Java compiler converts source code (`.java`) into bytecode (`.class`), which can run on any platform with a compatible JVM ("Write Once, Run Anywhere").',
    shortcutTip: 'Source code -> Bytecode -> JVM interprets on host OS.',
    whyWrong: 'Java does not compile directly to machine-specific assembly or execute in the BIOS.',
    estimatedTimeSec: 20
  },

  // --- STRINGS IN JAVA ---
  {
    id: 'java-str-1',
    category: 'java',
    topic: 'Strings',
    difficulty: 'Medium',
    questionType: 'output-prediction',
    questionText: 'What is the output of comparing strings with == versus .equals()?',
    codeSnippet: 'public class StringTest {\n    public static void main(String[] args) {\n        String s1 = new String("Java");\n        String s2 = new String("Java");\n        System.out.println((s1 == s2) + " " + s1.equals(s2));\n    }\n}',
    options: ['true true', 'false true', 'true false', 'false false'],
    correctAnswer: 1, // B = false true
    explanation: 'In Java, `==` compares reference memory addresses. Since `new String()` explicitly creates two distinct objects in heap memory, `s1 == s2` is `false`. The `.equals()` method compares the actual textual content ("Java" equals "Java"), which is `true`.',
    shortcutTip: 'In Java: `==` compares memory references; `.equals()` compares string content.',
    whyWrong: '`s1 == s2` is false because `new` creates two distinct memory references.',
    estimatedTimeSec: 25
  },

  // --- ARRAYS AND LOOPS ---
  {
    id: 'java-arr-1',
    category: 'java',
    topic: 'Arrays',
    difficulty: 'Easy',
    questionType: 'output-prediction',
    questionText: 'What is the value of nums.length in Java?',
    codeSnippet: 'int[] nums = {10, 20, 30, 40};\nSystem.out.println(nums.length);',
    options: ['3', '4', '5', 'nums.length() with parentheses is required'],
    correctAnswer: 1, // B = 4
    explanation: 'In Java, arrays have a built-in public final field `length` (without parentheses). For Strings, it is a method `.length()`. For `nums`, the length is 4.',
    shortcutTip: 'Array uses field `.length`; String uses method `.length()`; Collections use `.size()`.',
    whyWrong: 'There are 4 elements in the array.',
    estimatedTimeSec: 15
  },

  // --- INHERITANCE AND KEYWORDS ---
  {
    id: 'java-oop-1',
    category: 'java',
    topic: 'Inheritance Basics',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'Which keyword is used in Java to inherit a class?',
    options: ['implements', 'extends', 'inherits', 'super'],
    correctAnswer: 1, // B = extends
    explanation: 'In Java, a subclass inherits from a superclass using the `extends` keyword. The `implements` keyword is used to implement an `interface`.',
    shortcutTip: 'Class inheritance: `extends`. Interface implementation: `implements`.',
    whyWrong: '`inherits` is not a Java keyword. `implements` is for interfaces.',
    estimatedTimeSec: 15
  },
  {
    id: 'java-oop-2',
    category: 'java',
    topic: 'Classes and Objects',
    difficulty: 'Medium',
    questionType: 'mcq',
    questionText: 'Can a constructor in Java be declared "private"?',
    options: [
      'No, constructors must always be public',
      'Yes, often used to prevent external instantiation in Singleton patterns or utility classes',
      'No, it causes a compilation error',
      'Yes, but only in abstract classes'
    ],
    correctAnswer: 1, // B
    explanation: 'Yes, constructors can be private. Private constructors prevent objects of the class from being instantiated from outside the class, which is fundamental to the Singleton design pattern and utility classes (like `java.lang.Math`).',
    shortcutTip: 'Private constructor = Singleton pattern or static-only utility class.',
    whyWrong: 'Constructors can have any valid access modifier in Java (public, protected, default, private).',
    estimatedTimeSec: 20
  },

  // --- FIND COMPILATION ERRORS ---
  {
    id: 'java-err-1',
    category: 'java',
    topic: 'Compilation Errors',
    difficulty: 'Easy',
    questionType: 'coding-error',
    questionText: 'What error will occur when compiling this Java code?',
    codeSnippet: 'public class Main {\n    public static void main(String[] args) {\n        final int MAX = 100;\n        MAX = 200;\n        System.out.println(MAX);\n    }\n}',
    options: [
      'Compilation error: cannot assign a value to final variable MAX',
      'Runtime exception: FinalModificationException',
      'Prints 200 without issues',
      'Prints 100 because reassignment is silently ignored'
    ],
    correctAnswer: 0, // A
    explanation: 'In Java, a variable declared with the `final` keyword can only be assigned once. Attempting to reassign `MAX = 200;` triggers a compile-time error: `cannot assign a value to final variable MAX`.',
    shortcutTip: '`final` variables in Java are constant and immutable after initialization.',
    whyWrong: 'This is caught at compile-time by javac, not at runtime.',
    estimatedTimeSec: 15
  },
  {
    id: 'java-err-2',
    category: 'java',
    topic: 'Compilation Errors',
    difficulty: 'Medium',
    questionType: 'coding-error',
    questionText: 'Why does this static method fail to compile?',
    codeSnippet: 'public class Student {\n    int rollNo = 101;\n    \n    public static void display() {\n        System.out.println(rollNo);\n    }\n}',
    options: [
      'Compilation error: non-static variable rollNo cannot be referenced from a static context',
      'Compilation error: display() must return an int',
      'Compilation error: rollNo is not public',
      'It compiles and runs successfully'
    ],
    correctAnswer: 0, // A
    explanation: 'A `static` method belongs to the class itself and can be called without any instance of the class. Because no object instance exists, it cannot directly access non-static instance fields like `rollNo`.',
    shortcutTip: 'Static methods CANNOT access instance (non-static) variables or methods directly without an object reference.',
    whyWrong: '`rollNo` is an instance member, so static `display()` cannot see it without an object instance.',
    estimatedTimeSec: 25
  }
];
