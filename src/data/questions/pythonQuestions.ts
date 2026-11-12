import { Question } from '../../types';

export const pythonQuestions: Question[] = [
  // --- VARIABLES AND DATA TYPES ---
  {
    id: 'py-var-1',
    category: 'python',
    topic: 'Variables and Data Types',
    difficulty: 'Easy',
    questionType: 'output-prediction',
    questionText: 'What is the output of the following Python code snippet?',
    codeSnippet: 'x = 10\ny = "20"\nprint(type(x), type(y))',
    options: [
      "<class 'int'> <class 'str'>",
      "<class 'number'> <class 'string'>",
      "<class 'int'> <class 'int'>",
      "<class 'float'> <class 'str'>"
    ],
    correctAnswer: 0, // A
    explanation: 'In Python, whole numbers without decimal points are dynamically typed as `int`. Anything enclosed in quotes (single or double) is of type `str`. Thus, `type(x)` returns `<class \'int\'>` and `type(y)` returns `<class \'str\'>`.',
    shortcutTip: 'Python uses `int` and `str` (not `number` or `string`).',
    whyWrong: 'Options with `number` or `string` use terminology from JavaScript or SQL, not Python built-in type names.',
    estimatedTimeSec: 20
  },
  {
    id: 'py-var-2',
    category: 'python',
    topic: 'Variables and Data Types',
    difficulty: 'Easy',
    questionType: 'output-prediction',
    questionText: 'What is the value of result after executing this code?',
    codeSnippet: 'a = 15\nb = 4\nresult = a // b',
    options: ['3.75', '3', '4', '3.0'],
    correctAnswer: 1, // B = 3
    explanation: 'The `//` operator in Python performs integer floor division, discarding the fractional part. 15 / 4 = 3.75, so floor division `15 // 4` yields the integer 3.',
    shortcutTip: 'Single slash `/` always returns float (`3.75`). Double slash `//` floors to integer (`3`).',
    whyWrong: '3.75 is the result of standard floating division `a / b`.',
    estimatedTimeSec: 15
  },

  // --- OPERATORS & BOOLEAN LOGIC ---
  {
    id: 'py-op-1',
    category: 'python',
    topic: 'Operators',
    difficulty: 'Easy',
    questionType: 'output-prediction',
    questionText: 'What does this expression evaluate to?',
    codeSnippet: 'print(2 ** 3 ** 2)',
    options: ['64', '512', '36', '256'],
    correctAnswer: 1, // B = 512
    explanation: 'The exponentiation operator `**` in Python is right-associative (evaluated from right to left). `2 ** 3 ** 2` is evaluated as `2 ** (3 ** 2) = 2 ** 9 = 512`.',
    shortcutTip: 'Rule of thumb: Exponents evaluate right-to-left! 3² = 9, then 2⁹ = 512.',
    whyWrong: '(2 ** 3) ** 2 would be 8 ** 2 = 64, which is the wrong left-to-right evaluation order.',
    estimatedTimeSec: 25
  },

  // --- STRINGS ---
  {
    id: 'py-str-1',
    category: 'python',
    topic: 'Strings',
    difficulty: 'Easy',
    questionType: 'output-prediction',
    questionText: 'What will be printed by this code?',
    codeSnippet: 's = "Placement"\nprint(s[1:5])',
    options: ['lace', 'Plac', 'lacem', 'lace '],
    correctAnswer: 0, // A = lace
    explanation: 'String slicing `s[start:stop]` includes index `start` up to but excluding `stop`. Index 0="P", 1="l", 2="a", 3="c", 4="e", 5="m". Slicing `[1:5]` extracts indices 1, 2, 3, 4 which corresponds to "lace".',
    shortcutTip: 'Remember slice `[start:stop]` takes indices from `start` to `stop - 1`. Length is 5 - 1 = 4 characters.',
    whyWrong: 'Index 5 ("m") is excluded.',
    estimatedTimeSec: 20
  },
  {
    id: 'py-str-2',
    category: 'python',
    topic: 'Strings',
    difficulty: 'Easy',
    questionType: 'output-prediction',
    questionText: 'What is the output of the following slice?',
    codeSnippet: 'word = "PYTHON"\nprint(word[::-1])',
    options: ['PYTHON', 'NOHTYP', 'P', 'Error'],
    correctAnswer: 1, // B = NOHTYP
    explanation: 'A step of `-1` in slice syntax `[::-1]` reverses the sequence from end to beginning. Hence, "PYTHON" becomes "NOHTYP".',
    shortcutTip: '`[::-1]` is the canonical Python idiom to reverse any string or list.',
    whyWrong: 'This does not cause an error; it reverses the string.',
    estimatedTimeSec: 15
  },

  // --- LISTS AND TUPLES ---
  {
    id: 'py-list-1',
    category: 'python',
    topic: 'Lists and Tuples',
    difficulty: 'Medium',
    questionType: 'output-prediction',
    questionText: 'What is the output of the following list operations?',
    codeSnippet: 'nums = [1, 2, 3]\nnums.append([4, 5])\nprint(len(nums))',
    options: ['5', '4', '3', 'Error'],
    correctAnswer: 1, // B = 4
    explanation: 'The `append()` method adds its single argument as a single element at the end of the list. Here, the list `[4, 5]` is added as a single nested list element: `[1, 2, 3, [4, 5]]`. Thus, the length is 4.',
    shortcutTip: '`append([4, 5])` adds 1 element (the sublist). To add individual elements and get length 5, use `extend([4, 5])`.',
    whyWrong: '5 would be the length if `extend()` was used instead of `append()`.',
    estimatedTimeSec: 25
  },
  {
    id: 'py-list-2',
    category: 'python',
    topic: 'Lists and Tuples',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'Which of the following data structures is immutable in Python?',
    options: ['List', 'Dictionary', 'Tuple', 'Set'],
    correctAnswer: 2, // C = Tuple
    explanation: 'In Python, a Tuple `(1, 2, 3)` cannot be modified after creation (cannot add, remove, or modify items in place), making it immutable. Lists, Dictionaries, and Sets are mutable.',
    shortcutTip: 'Tuples and Strings are immutable; Lists, Dicts, and Sets are mutable.',
    whyWrong: 'Lists can have elements reassigned (`nums[0] = 99`), whereas tuples raise `TypeError: \'tuple\' object does not support item assignment`.',
    estimatedTimeSec: 15
  },

  // --- DICTIONARIES ---
  {
    id: 'py-dict-1',
    category: 'python',
    topic: 'Dictionaries',
    difficulty: 'Medium',
    questionType: 'output-prediction',
    questionText: 'What happens when accessing a non-existent key in this dictionary?',
    codeSnippet: 'd = {"a": 1, "b": 2}\nval = d.get("c", 0)\nprint(val)',
    options: ['KeyError', 'None', '0', 'False'],
    correctAnswer: 2, // C = 0
    explanation: 'The `dict.get(key, default)` method returns the default value (here `0`) if `key` is not present in the dictionary, avoiding a `KeyError`.',
    shortcutTip: '`d.get(k, default)` safely handles missing keys with fallback `default`. `d["c"]` would raise `KeyError`.',
    whyWrong: 'Direct bracket indexing `d["c"]` throws `KeyError`, but `.get()` handles it gracefully.',
    estimatedTimeSec: 20
  },

  // --- LOOPS & IF-ELSE ---
  {
    id: 'py-loop-1',
    category: 'python',
    topic: 'For and While Loops',
    difficulty: 'Medium',
    questionType: 'output-prediction',
    questionText: 'What will this loop print?',
    codeSnippet: 'total = 0\nfor i in range(1, 5):\n    total += i\nprint(total)',
    options: ['10', '15', '6', '12'],
    correctAnswer: 0, // A = 10
    explanation: '`range(1, 5)` generates integers 1, 2, 3, 4 (stop value 5 is excluded). Sum = 1 + 2 + 3 + 4 = 10.',
    shortcutTip: '`range(start, stop)` stops at `stop - 1`. Here 1 + 2 + 3 + 4 = 10.',
    whyWrong: '15 would be the sum if 5 were included (1 to 5).',
    estimatedTimeSec: 20
  },

  // --- FUNCTIONS ---
  {
    id: 'py-func-1',
    category: 'python',
    topic: 'Functions',
    difficulty: 'Medium',
    questionType: 'output-prediction',
    questionText: 'What is printed by this function call with default argument?',
    codeSnippet: 'def greet(name, msg="Hello"):\n    return f"{msg}, {name}!"\n\nprint(greet("Sara"))',
    options: [
      'None',
      'Hello, Sara!',
      'Sara, Hello!',
      'TypeError: missing required argument'
    ],
    correctAnswer: 1, // B = Hello, Sara!
    explanation: 'When `greet("Sara")` is called, `name` receives `"Sara"` and `msg` defaults to `"Hello"`. The formatted f-string returns `"Hello, Sara!"`.',
    shortcutTip: 'Default parameters kick in when the caller omits the corresponding argument.',
    whyWrong: '`msg` has a default value so no `TypeError` occurs.',
    estimatedTimeSec: 20
  },

  // --- FIND THE ERROR IN PYTHON CODE ---
  {
    id: 'py-err-1',
    category: 'python',
    topic: 'Find Code Error',
    difficulty: 'Easy',
    questionType: 'coding-error',
    questionText: 'Identify the error in the following Python snippet:',
    codeSnippet: 'count = 5\nif count = 5:\n    print("Count is five")',
    options: [
      'Single "=" used instead of comparison operator "=="',
      'Missing parentheses around count = 5',
      'The print function cannot take string arguments',
      'count is a reserved Python keyword'
    ],
    correctAnswer: 0, // A
    explanation: 'In Python conditional statements, equality comparison requires `==`. A single `=` is an assignment statement, which raises a `SyntaxError: invalid syntax` inside an `if` header.',
    shortcutTip: 'Single `=` is assignment; double `==` is comparison.',
    whyWrong: 'Python does not require parentheses around `if` conditions, and `count` is not a keyword.',
    estimatedTimeSec: 20
  },
  {
    id: 'py-err-2',
    category: 'python',
    topic: 'Find Code Error',
    difficulty: 'Medium',
    questionType: 'coding-error',
    questionText: 'What error will be raised when running this code?',
    codeSnippet: 'age = 21\nmessage = "I am " + age + " years old"\nprint(message)',
    options: [
      'TypeError: can only concatenate str (not "int") to str',
      'ValueError: invalid literal for int()',
      'SyntaxError: cannot concatenate',
      'IndexError: string out of range'
    ],
    correctAnswer: 0, // A
    explanation: 'Python is strongly typed and will not implicitly convert the integer `age` into a string during `+` concatenation. It raises `TypeError`. The correct way is `str(age)` or `f"I am {age} years old"`.',
    shortcutTip: 'Always convert non-strings with `str()` before `+` concatenation, or prefer f-strings!',
    whyWrong: 'JavaScript automatically type-coerces numbers to strings in `+`, but Python raises `TypeError`.',
    estimatedTimeSec: 20
  },

  // --- MISSING CODE STATEMENTS ---
  {
    id: 'py-miss-1',
    category: 'python',
    topic: 'Missing Code',
    difficulty: 'Easy',
    questionType: 'missing-code',
    questionText: 'Which statement should replace `____` to print only even numbers?',
    codeSnippet: 'for n in range(1, 10):\n    if ____:\n        print(n)',
    options: ['n % 2 == 0', 'n / 2 == 0', 'n // 2 == 0', 'n % 2 == 1'],
    correctAnswer: 0, // A
    explanation: 'The modulo operator `%` calculates the remainder of division. For any even number, division by 2 leaves a remainder of 0 (`n % 2 == 0`).',
    shortcutTip: 'Even check: `n % 2 == 0`. Odd check: `n % 2 != 0`.',
    whyWrong: '`n % 2 == 1` checks for odd numbers. `n / 2 == 0` checks if n equals 0.',
    estimatedTimeSec: 15
  }
];
