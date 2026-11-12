import { Question } from '../../types';

export const aptitudeQuestions: Question[] = [
  // --- PERCENTAGES ---
  {
    id: 'apt-perc-1',
    category: 'aptitude',
    topic: 'Percentages',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'If 25% of a number is 75, what is 40% of that number?',
    options: ['100', '120', '150', '160'],
    correctAnswer: 1, // B = 120
    explanation: 'Step 1: Let the number be N.\n25% of N = 75  =>  (1/4) * N = 75  =>  N = 300.\nStep 2: 40% of 300 = (40 / 100) * 300 = 120.',
    shortcutTip: 'Notice that 40% is (40/25) = 1.6 times 25%. So simply calculate 75 * 1.6 = 120.',
    whyWrong: 'Choosing 100 or 150 usually results from guessing without finding the base number (300) first.',
    estimatedTimeSec: 35
  },
  {
    id: 'apt-perc-2',
    category: 'aptitude',
    topic: 'Percentages',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'A student scored 360 marks out of 500 in an engineering entrance mock test. What is his percentage score?',
    options: ['70%', '72%', '74%', '75%'],
    correctAnswer: 1, // B = 72%
    explanation: 'Step 1: Formula = (Marks Obtained / Total Marks) * 100.\nStep 2: (360 / 500) * 100 = 360 / 5 = 72%.',
    shortcutTip: 'To divide by 500 and multiply by 100, just divide the marks by 5 (or multiply by 2 and shift decimal: 360 * 2 = 720 -> 72%).',
    whyWrong: 'Check your basic mental math: 360 / 5 = 72, not 70.',
    estimatedTimeSec: 25
  },
  {
    id: 'apt-perc-3',
    category: 'aptitude',
    topic: 'Percentages',
    difficulty: 'Medium',
    questionType: 'mcq',
    questionText: 'The price of a laptop increases by 20% and then decreases by 20%. What is the net change in price?',
    options: ['No change (0%)', '4% decrease', '4% increase', '2% decrease'],
    correctAnswer: 1, // B = 4% decrease
    explanation: 'Step 1: Let initial price = 100.\nAfter 20% increase: 100 + 20 = 120.\nStep 2: After 20% decrease on 120: 120 - (0.20 * 120) = 120 - 24 = 96.\nStep 3: Net change = 100 - 96 = 4% decrease.',
    shortcutTip: 'When a quantity changes by +x% and then -x%, the net change is always a decrease of (x²/100)%. Here: (20² / 100)% = 400 / 100 = 4% decrease.',
    whyWrong: 'Common trap: Assuming the increases and decreases cancel each other out to 0%. The percentage decrease operates on the larger increased value!',
    estimatedTimeSec: 30
  },
  {
    id: 'apt-perc-4',
    category: 'aptitude',
    topic: 'Percentages',
    difficulty: 'Medium',
    questionType: 'mcq',
    questionText: 'If A is 25% taller than B, by what percentage is B shorter than A?',
    options: ['25%', '20%', '16.67%', '30%'],
    correctAnswer: 1, // B = 20%
    explanation: 'Step 1: Let B = 100, then A = 125.\nStep 2: Difference = 125 - 100 = 25.\nStep 3: Percentage B is shorter than A = (25 / 125) * 100 = (1/5) * 100 = 20%.',
    shortcutTip: 'Formula: [R / (100 + R)] * 100 = [25 / 125] * 100 = 20%.',
    whyWrong: 'A classic placement trap: thinking if A is 25% taller, B must be 25% shorter. The base shifts from B to A.',
    estimatedTimeSec: 30
  },

  // --- PROFIT AND LOSS ---
  {
    id: 'apt-pl-1',
    category: 'aptitude',
    topic: 'Profit and Loss',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'A gadget bought for $400 is sold for $500. What is the profit percentage?',
    options: ['20%', '25%', '30%', '15%'],
    correctAnswer: 1, // B = 25%
    explanation: 'Step 1: Cost Price (CP) = $400, Selling Price (SP) = $500.\nStep 2: Profit = SP - CP = 500 - 400 = $100.\nStep 3: Profit% = (Profit / CP) * 100 = (100 / 400) * 100 = 25%.',
    shortcutTip: 'Profit% is always calculated on Cost Price (CP), unless stated otherwise. 100/400 = 1/4 = 25%.',
    whyWrong: 'Do not calculate profit on Selling Price (100/500 = 20%). Standard profit is strictly based on Cost Price.',
    estimatedTimeSec: 25
  },
  {
    id: 'apt-pl-2',
    category: 'aptitude',
    topic: 'Profit and Loss',
    difficulty: 'Medium',
    questionType: 'mcq',
    questionText: 'By selling a smartphone for $720, a shopkeeper incurs a 10% loss. At what price must he sell it to gain 15%?',
    options: ['850', '900', '920', '950'],
    correctAnswer: 2, // C = 920
    explanation: 'Step 1: SP = $720 with 10% loss => CP = 720 / 0.90 = $800.\nStep 2: Desired gain = 15% => New SP = 800 * 1.15 = 800 + 120 = $920.',
    shortcutTip: 'Direct proportion: New SP = 720 * (115 / 90) = 8 * 115 = $920.',
    whyWrong: 'Calculating 15% on 720 gives 108, which leads to 828. You must find Cost Price ($800) first!',
    estimatedTimeSec: 40
  },
  {
    id: 'apt-pl-3',
    category: 'aptitude',
    topic: 'Profit and Loss',
    difficulty: 'Hard',
    questionType: 'mcq',
    questionText: 'If the cost price of 12 pens equals the selling price of 8 pens, what is the profit percentage?',
    options: ['33.33%', '40%', '50%', '60%'],
    correctAnswer: 2, // C = 50%
    explanation: 'Step 1: 12 * CP = 8 * SP => SP / CP = 12 / 8 = 3 / 2.\nStep 2: If CP = 2 units, SP = 3 units => Profit = 1 unit.\nStep 3: Profit% = (1 / 2) * 100 = 50%.',
    shortcutTip: 'Formula: [(Goods Bought - Goods Sold) / Goods Sold] * 100 = [(12 - 8) / 8] * 100 = (4/8) * 100 = 50%.',
    whyWrong: 'Using 12 in the denominator yields (4/12)*100 = 33.33%, which is inverted.',
    estimatedTimeSec: 35
  },

  // --- SIMPLE INTEREST ---
  {
    id: 'apt-si-1',
    category: 'aptitude',
    topic: 'Simple Interest',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'Calculate the Simple Interest on a principal of $2,000 invested at 5% per annum for 3 years.',
    options: ['$250', '$300', '$350', '$400'],
    correctAnswer: 1, // B = $300
    explanation: 'Step 1: Formula SI = (P * R * T) / 100.\nStep 2: SI = (2000 * 5 * 3) / 100 = 20 * 15 = $300.',
    shortcutTip: '5% for 3 years is simply 15% total interest. 15% of 2000 = 300.',
    whyWrong: '5% of 2000 is 100 per year; multiply by 3 years to get 300.',
    estimatedTimeSec: 20
  },
  {
    id: 'apt-si-2',
    category: 'aptitude',
    topic: 'Simple Interest',
    difficulty: 'Medium',
    questionType: 'mcq',
    questionText: 'A sum of money doubles itself in 8 years at simple interest. What is the rate of interest per annum?',
    options: ['10%', '12.5%', '15%', '16%'],
    correctAnswer: 1, // B = 12.5%
    explanation: 'Step 1: If principal is P, Amount becomes 2P. Hence SI = P.\nStep 2: P = (P * R * 8) / 100 => 1 = (8 * R) / 100 => R = 100 / 8 = 12.5%.',
    shortcutTip: 'When a sum multiplies by n times in T years at SI: R = [(n - 1) * 100] / T. Here [(2 - 1) * 100] / 8 = 100 / 8 = 12.5%.',
    whyWrong: '100 / 8 is exactly 12.5%, not 10% or 12%.',
    estimatedTimeSec: 30
  },

  // --- COMPOUND INTEREST ---
  {
    id: 'apt-ci-1',
    category: 'aptitude',
    topic: 'Compound Interest',
    difficulty: 'Medium',
    questionType: 'mcq',
    questionText: 'What is the compound interest on $5,000 for 2 years at 10% per annum, compounded annually?',
    options: ['$1,000', '$1,050', '$1,100', '$1,150'],
    correctAnswer: 1, // B = $1,050
    explanation: 'Step 1: Year 1 interest = 10% of 5,000 = $500.\nNew Principal = $5,500.\nStep 2: Year 2 interest = 10% of 5,500 = $550.\nStep 3: Total CI = 500 + 550 = $1,050.',
    shortcutTip: 'Net effective rate for 2 years at 10% = 10 + 10 + (10*10)/100 = 21%. 21% of 5,000 = $1,050.',
    whyWrong: '$1,000 is the simple interest. Remember compound interest earns interest on interest ($50 extra).',
    estimatedTimeSec: 30
  },
  {
    id: 'apt-ci-2',
    category: 'aptitude',
    topic: 'Compound Interest',
    difficulty: 'Hard',
    questionType: 'mcq',
    questionText: 'The difference between Compound Interest and Simple Interest on a certain sum for 2 years at 5% per annum is $15. Find the sum.',
    options: ['$4,000', '$5,000', '$6,000', '$8,000'],
    correctAnswer: 2, // C = $6,000
    explanation: 'Step 1: Difference formula for 2 years: Diff = P * (R / 100)².\nStep 2: 15 = P * (5 / 100)² = P * (1 / 20)² = P / 400.\nStep 3: P = 15 * 400 = $6,000.',
    shortcutTip: 'Remember the classic 2-year difference formula: CI - SI = P * (R/100)². Directly substitute: P = Diff / (R/100)².',
    whyWrong: 'Check: 5% of 6000 = 300 (year 1). 5% of 300 = 15 (difference in year 2). Exactly 6,000!',
    estimatedTimeSec: 45
  },

  // --- RATIO AND PROPORTION ---
  {
    id: 'apt-rp-1',
    category: 'aptitude',
    topic: 'Ratio and Proportion',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'If A : B = 2 : 3 and B : C = 4 : 5, find the ratio A : B : C.',
    options: ['8 : 12 : 15', '2 : 4 : 5', '6 : 8 : 15', '8 : 10 : 15'],
    correctAnswer: 0, // A = 8 : 12 : 15
    explanation: 'Step 1: Equalize the common term B in both ratios.\nMultiply A:B by 4: (2*4) : (3*4) = 8 : 12.\nMultiply B:C by 3: (4*3) : (5*3) = 12 : 15.\nStep 2: Combine: A : B : C = 8 : 12 : 15.',
    shortcutTip: 'Multiply columns: A = 2*4 = 8, B = 3*4 = 12, C = 3*5 = 15.',
    whyWrong: 'Simply concatenating 2 : 4 : 5 is incorrect because B has different scales in both ratios.',
    estimatedTimeSec: 25
  },
  {
    id: 'apt-rp-2',
    category: 'aptitude',
    topic: 'Ratio and Proportion',
    difficulty: 'Medium',
    questionType: 'mcq',
    questionText: 'Divide $840 among three developers in the ratio 3 : 4 : 5. What is the share of the second developer?',
    options: ['$210', '$280', '$350', '$320'],
    correctAnswer: 1, // B = $280
    explanation: 'Step 1: Sum of ratio terms = 3 + 4 + 5 = 12 parts.\nStep 2: Value of 1 part = 840 / 12 = $70.\nStep 3: Share of second developer (4 parts) = 4 * 70 = $280.',
    shortcutTip: 'Second developer share = (4 / 12) * 840 = (1 / 3) * 840 = $280.',
    whyWrong: '4/12 simplifies to 1/3. One-third of 840 is 280.',
    estimatedTimeSec: 25
  },

  // --- AVERAGE ---
  {
    id: 'apt-avg-1',
    category: 'aptitude',
    topic: 'Average',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'The average of 5 consecutive numbers is 27. What is the largest of these numbers?',
    options: ['27', '28', '29', '30'],
    correctAnswer: 2, // C = 29
    explanation: 'Step 1: In consecutive numbers, the average is the exact middle number (3rd number).\nStep 2: Middle number = 27.\nStep 3: The 5 numbers are 25, 26, 27, 28, 29. The largest is 29.',
    shortcutTip: 'For an odd count of consecutive terms, Average = Middle term. Largest = Average + (n-1)/2 = 27 + 2 = 29.',
    whyWrong: '27 is the average/middle, not the largest.',
    estimatedTimeSec: 20
  },
  {
    id: 'apt-avg-2',
    category: 'aptitude',
    topic: 'Average',
    difficulty: 'Medium',
    questionType: 'mcq',
    questionText: 'The average weight of 24 students in a class is 45 kg. If the teacher’s weight is included, the average increases by 1 kg. What is the teacher’s weight?',
    options: ['65 kg', '68 kg', '70 kg', '72 kg'],
    correctAnswer: 2, // C = 70 kg
    explanation: 'Step 1: Total weight of 24 students = 24 * 45 = 1080 kg.\nStep 2: With teacher, count is 25 and average is 46 kg.\nTotal weight = 25 * 46 = 1150 kg.\nStep 3: Teacher weight = 1150 - 1080 = 70 kg.',
    shortcutTip: 'Shortcut: New weight = New Average + (Old Count * Increase) = 46 + (24 * 1) = 70 kg.',
    whyWrong: 'Calculating 45 + 24 = 69 misses the fact that the teacher also has the new average weight of 46.',
    estimatedTimeSec: 35
  },

  // --- TIME AND WORK ---
  {
    id: 'apt-tw-1',
    category: 'aptitude',
    topic: 'Time and Work',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'A can complete a project in 12 days, and B can complete it in 24 days. Working together, in how many days will they finish the project?',
    options: ['6 days', '8 days', '10 days', '16 days'],
    correctAnswer: 1, // B = 8 days
    explanation: 'Step 1: Work done by A in 1 day = 1/12.\nWork done by B in 1 day = 1/24.\nStep 2: Together in 1 day = (1/12) + (1/24) = (2 + 1) / 24 = 3/24 = 1/8.\nStep 3: Days required = 8 days.',
    shortcutTip: 'Formula: (A * B) / (A + B) = (12 * 24) / (12 + 24) = 288 / 36 = 8 days.',
    whyWrong: 'Average of 12 and 24 is 18, but working together takes LESS time than the faster worker alone!',
    estimatedTimeSec: 25
  },
  {
    id: 'apt-tw-2',
    category: 'aptitude',
    topic: 'Time and Work',
    difficulty: 'Medium',
    questionType: 'mcq',
    questionText: 'Pipe A can fill a tank in 6 hours and Pipe B can empty it in 9 hours. If both are opened together, in how many hours will the tank fill?',
    options: ['15 hours', '18 hours', '12 hours', '24 hours'],
    correctAnswer: 1, // B = 18 hours
    explanation: 'Step 1: Net filling in 1 hour = (1/6) - (1/9).\nLCM(6, 9) = 18.\nStep 2: (3 - 2) / 18 = 1/18 of tank per hour.\nStep 3: Total time required = 18 hours.',
    shortcutTip: 'Formula: (A * B) / (B - A) = (6 * 9) / (9 - 6) = 54 / 3 = 18 hours.',
    whyWrong: 'Remember that Pipe B is emptying, so subtract its rate instead of adding.',
    estimatedTimeSec: 30
  },
  {
    id: 'apt-tw-3',
    category: 'aptitude',
    topic: 'Time and Work',
    difficulty: 'Hard',
    questionType: 'mcq',
    questionText: '8 engineers can build a microservice in 15 days working 6 hours a day. In how many days can 10 engineers finish the same task working 8 hours a day?',
    options: ['8 days', '9 days', '10 days', '12 days'],
    correctAnswer: 1, // B = 9 days
    explanation: 'Step 1: Use formula M1 * D1 * H1 = M2 * D2 * H2.\nStep 2: 8 * 15 * 6 = 10 * D2 * 8.\nStep 3: 720 = 80 * D2 => D2 = 720 / 80 = 9 days.',
    shortcutTip: 'Direct cancellation: (8 * 15 * 6) / (10 * 8) = (15 * 6) / 10 = 90 / 10 = 9 days.',
    whyWrong: 'Ensure you equate total man-hours on both sides.',
    estimatedTimeSec: 40
  },

  // --- TIME, SPEED AND DISTANCE ---
  {
    id: 'apt-tsd-1',
    category: 'aptitude',
    topic: 'Time, Speed and Distance',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'Convert a vehicle speed of 72 km/h into meters per second (m/s).',
    options: ['15 m/s', '20 m/s', '25 m/s', '30 m/s'],
    correctAnswer: 1, // B = 20 m/s
    explanation: 'Step 1: To convert km/h to m/s, multiply by 5/18.\nStep 2: 72 * (5/18) = 4 * 5 = 20 m/s.',
    shortcutTip: 'Multiplier rule: km/h * (5/18) = m/s. Since 72 is 4 * 18, result is 4 * 5 = 20.',
    whyWrong: 'Using 18/5 instead of 5/18 gives a giant number (259.2). Smaller units (m/s) need smaller number.',
    estimatedTimeSec: 15
  },
  {
    id: 'apt-tsd-2',
    category: 'aptitude',
    topic: 'Time, Speed and Distance',
    difficulty: 'Medium',
    questionType: 'mcq',
    questionText: 'A train 150 meters long passes an electric pole in 15 seconds. What is the speed of the train in km/h?',
    options: ['30 km/h', '36 km/h', '40 km/h', '45 km/h'],
    correctAnswer: 1, // B = 36 km/h
    explanation: 'Step 1: Distance = length of train = 150 m. Time = 15 s.\nStep 2: Speed in m/s = 150 / 15 = 10 m/s.\nStep 3: Convert to km/h by multiplying with 18/5: 10 * (18/5) = 2 * 18 = 36 km/h.',
    shortcutTip: 'Speed = 10 m/s. 10 * 3.6 = 36 km/h.',
    whyWrong: '10 m/s is the answer in m/s, not km/h. Always verify the units requested in the question.',
    estimatedTimeSec: 30
  },
  {
    id: 'apt-tsd-3',
    category: 'aptitude',
    topic: 'Time, Speed and Distance',
    difficulty: 'Medium',
    questionType: 'mcq',
    questionText: 'A person travels from city A to B at 40 km/h and returns back at 60 km/h. What is the average speed for the whole journey?',
    options: ['48 km/h', '50 km/h', '52 km/h', '45 km/h'],
    correctAnswer: 0, // A = 48 km/h
    explanation: 'Step 1: When distance is the same both ways, Average Speed = 2xy / (x + y).\nStep 2: (2 * 40 * 60) / (40 + 60) = 4800 / 100 = 48 km/h.',
    shortcutTip: 'Never take the arithmetic mean (40+60)/2 = 50. Harmonic mean formula: 2*40*60/100 = 48 km/h.',
    whyWrong: '50 km/h is the arithmetic mean. Because the traveler spends more time at the slower speed, the average is pulled closer to 40.',
    estimatedTimeSec: 30
  },

  // --- PROBLEMS ON AGES ---
  {
    id: 'apt-age-1',
    category: 'aptitude',
    topic: 'Problems on Ages',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'The ratio of the ages of Priya and Rohan is 4 : 5. If Rohan is 25 years old now, what is Priya’s age?',
    options: ['18 years', '20 years', '22 years', '24 years'],
    correctAnswer: 1, // B = 20 years
    explanation: 'Step 1: Rohan’s age corresponds to 5 parts = 25 years => 1 part = 5 years.\nStep 2: Priya’s age = 4 parts = 4 * 5 = 20 years.',
    shortcutTip: 'Direct proportion: (4 / 5) * 25 = 20.',
    whyWrong: 'Easy ratio division: 25 / 5 = 5. Multiply by 4 gives 20.',
    estimatedTimeSec: 15
  },
  {
    id: 'apt-age-2',
    category: 'aptitude',
    topic: 'Problems on Ages',
    difficulty: 'Medium',
    questionType: 'mcq',
    questionText: 'Father is 4 times as old as his son. In 20 years, he will be twice as old as his son. What is the son’s present age?',
    options: ['8 years', '10 years', '12 years', '15 years'],
    correctAnswer: 1, // B = 10 years
    explanation: 'Step 1: Let son’s present age = x. Father’s age = 4x.\nStep 2: In 20 years: (4x + 20) = 2(x + 20).\n4x + 20 = 2x + 40  =>  2x = 20  =>  x = 10 years.',
    shortcutTip: 'Check options: If son is 10, father is 40. In 20 years, son is 30, father is 60. 60 is twice 30! Fits perfectly.',
    whyWrong: 'Plugging in options is often faster than equation solving for age problems.',
    estimatedTimeSec: 30
  },

  // --- SIMPLIFICATION ---
  {
    id: 'apt-simp-1',
    category: 'aptitude',
    topic: 'Simplification',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'Evaluate using BODMAS: 24 - 4 * (6 - 3) + 16 / 4',
    options: ['12', '16', '20', '28'],
    correctAnswer: 1, // B = 16
    explanation: 'Step 1: Brackets first: (6 - 3) = 3.\nExpression: 24 - 4 * 3 + 16 / 4.\nStep 2: Division and Multiplication: 4 * 3 = 12 and 16 / 4 = 4.\nExpression: 24 - 12 + 4.\nStep 3: Addition/Subtraction from left to right: 12 + 4 = 16.',
    shortcutTip: 'Follow BODMAS strictly: B(Brackets), O(Orders), D(Division), M(Multiplication), A(Addition), S(Subtraction).',
    whyWrong: 'Performing 24 - 4 first gives 20, leading to completely wrong answers.',
    estimatedTimeSec: 25
  },
  {
    id: 'apt-simp-2',
    category: 'aptitude',
    topic: 'Simplification',
    difficulty: 'Medium',
    questionType: 'mcq',
    questionText: 'Find the value of: (999 * 999 - 1) / 1000',
    options: ['996', '998', '999', '1000'],
    correctAnswer: 1, // B = 998
    explanation: 'Step 1: Recognize identity a² - b² = (a - b)(a + b).\nHere a = 999, b = 1.\nStep 2: (999 - 1)(999 + 1) / 1000 = (998)(1000) / 1000 = 998.',
    shortcutTip: 'Algebraic identities eliminate cumbersome long multiplication. a² - 1 = (a - 1)(a + 1).',
    whyWrong: 'Never multiply 999 * 999 by hand in a timed test!',
    estimatedTimeSec: 25
  },

  // --- NUMBER SYSTEM ---
  {
    id: 'apt-num-1',
    category: 'aptitude',
    topic: 'Number System',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'Which of the following numbers is divisible by both 3 and 4?',
    options: ['414', '516', '622', '718'],
    correctAnswer: 1, // B = 516
    explanation: 'Step 1: Rule for 4: Last two digits must be divisible by 4. 16 / 4 = 4 (Passes for 516).\nStep 2: Rule for 3: Sum of digits must be divisible by 3. 5 + 1 + 6 = 12 (Divisible by 3).\nHence, 516 is divisible by both.',
    shortcutTip: 'Divisibility by 12 requires both divisibility by 3 and 4. Check last two digits for 4 first to eliminate quickly.',
    whyWrong: '414 ends in 14 (not divisible by 4). 622 ends in 22. 718 ends in 18.',
    estimatedTimeSec: 25
  },
  {
    id: 'apt-num-2',
    category: 'aptitude',
    topic: 'Number System',
    difficulty: 'Medium',
    questionType: 'mcq',
    questionText: 'Find the greatest common divisor (HCF) of 48 and 72.',
    options: ['12', '16', '24', '36'],
    correctAnswer: 2, // C = 24
    explanation: 'Step 1: Prime factorization:\n48 = 2⁴ * 3\n72 = 2³ * 3².\nStep 2: HCF = lowest powers of common factors = 2³ * 3 = 8 * 3 = 24.',
    shortcutTip: 'Difference between 72 and 48 is 24. Check if 24 divides both 48 and 72: 48/24=2, 72/24=3. Yes, so HCF is 24.',
    whyWrong: '12 divides both, but it is not the *greatest* common divisor.',
    estimatedTimeSec: 25
  },
  {
    id: 'apt-num-3',
    category: 'aptitude',
    topic: 'Number System',
    difficulty: 'Medium',
    questionType: 'mcq',
    questionText: 'Find the least common multiple (LCM) of 12, 18, and 30.',
    options: ['90', '120', '180', '360'],
    correctAnswer: 2, // C = 180
    explanation: 'Step 1: Factorize:\n12 = 2² * 3\n18 = 2 * 3²\n30 = 2 * 3 * 5.\nStep 2: LCM = highest powers of all factors = 2² * 3² * 5 = 4 * 9 * 5 = 180.',
    shortcutTip: 'Check multiples of the largest number (30): 30 (no), 60 (no), 90 (12 no), 120 (18 no), 150 (no), 180 (12*15=180, 18*10=180, 30*6=180).',
    whyWrong: '360 is a common multiple, but not the *least* one.',
    estimatedTimeSec: 30
  },
  {
    id: 'apt-num-4',
    category: 'aptitude',
    topic: 'Number System',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'What is the sum of the first 20 natural numbers (1 + 2 + ... + 20)?',
    options: ['190', '200', '210', '220'],
    correctAnswer: 2, // C = 210
    explanation: 'Step 1: Formula for sum of first n natural numbers = [n * (n + 1)] / 2.\nStep 2: Here n = 20.\nSum = [20 * 21] / 2 = 10 * 21 = 210.',
    shortcutTip: 'Memorize n(n+1)/2. For n=20: 20 * 21 / 2 = 10 * 21 = 210.',
    whyWrong: 'Adding directly is too slow and error-prone.',
    estimatedTimeSec: 20
  },
  {
    id: 'apt-perc-5',
    category: 'aptitude',
    topic: 'Percentages',
    difficulty: 'Hard',
    questionType: 'mcq',
    questionText: 'In a company of 120 employees, 65% are software engineers and 40% are women. What is the maximum possible percentage of women software engineers in the company?',
    options: ['30%', '40%', '65%', '75%'],
    correctAnswer: 1, // B = 40%
    explanation: 'Step 1: All women (40%) could potentially be software engineers since software engineers constitute 65% of the company.\nStep 2: Maximum possible women software engineers is bounded by total women = 40%.',
    shortcutTip: 'The intersection between set A and set B can at most be the size of the smaller set: min(65%, 40%) = 40%.',
    whyWrong: 'The count of women who are software engineers cannot exceed the total number of women in the company.',
    estimatedTimeSec: 30
  },
  {
    id: 'apt-pl-4',
    category: 'aptitude',
    topic: 'Profit and Loss',
    difficulty: 'Medium',
    questionType: 'mcq',
    questionText: 'A retailer offers two successive discounts of 20% and 10% on a gaming monitor. What is the single equivalent discount?',
    options: ['30%', '28%', '25%', '27%'],
    correctAnswer: 1, // B = 28%
    explanation: 'Step 1: Let initial marked price = 100.\nFirst discount of 20% => Price = 80.\nStep 2: Second discount of 10% on 80 => Discount = 8, Price = 72.\nStep 3: Single equivalent discount = 100 - 72 = 28%.',
    shortcutTip: 'Successive discount formula: a + b - (ab / 100) = 20 + 10 - (200 / 100) = 30 - 2 = 28%.',
    whyWrong: 'Never directly add discounts (20 + 10 = 30%). The second discount applies to the discounted price.',
    estimatedTimeSec: 25
  },
  {
    id: 'apt-tw-4',
    category: 'aptitude',
    topic: 'Time and Work',
    difficulty: 'Medium',
    questionType: 'mcq',
    questionText: 'Alex is twice as fast as Ben. If together they finish a coding sprint in 12 days, how long will Alex take alone?',
    options: ['16 days', '18 days', '24 days', '36 days'],
    correctAnswer: 1, // B = 18 days
    explanation: 'Step 1: Efficiency ratio Alex : Ben = 2 : 1. Total efficiency = 3 units/day.\nStep 2: Total work = Efficiency * Days = 3 * 12 = 36 units.\nStep 3: Time taken by Alex alone = 36 / 2 = 18 days.',
    shortcutTip: 'Total work = (2 + 1) * 12 = 36. Alex takes 36 / 2 = 18 days. Ben takes 36 / 1 = 36 days.',
    whyWrong: 'Alex is faster, so he must take less than the average (24). 18 is the exact answer.',
    estimatedTimeSec: 30
  },
  {
    id: 'apt-tsd-4',
    category: 'aptitude',
    topic: 'Time, Speed and Distance',
    difficulty: 'Hard',
    questionType: 'mcq',
    questionText: 'Two trains of length 120m and 180m are running in opposite directions on parallel tracks at 40 km/h and 50 km/h. How long will they take to cross each other completely?',
    options: ['10 seconds', '12 seconds', '15 seconds', '18 seconds'],
    correctAnswer: 1, // B = 12 seconds
    explanation: 'Step 1: Total distance to cover = Sum of train lengths = 120 + 180 = 300 m.\nStep 2: Relative speed (opposite directions) = 40 + 50 = 90 km/h.\nStep 3: Convert 90 km/h to m/s: 90 * (5/18) = 25 m/s.\nStep 4: Time = Distance / Speed = 300 / 25 = 12 seconds.',
    shortcutTip: 'Opposite directions => Add speeds (90 km/h = 25 m/s). Time = (120 + 180) / 25 = 300 / 25 = 12 s.',
    whyWrong: 'Subtracting speeds applies only when moving in the SAME direction. Opposite directions ADD speeds.',
    estimatedTimeSec: 40
  },
  {
    id: 'apt-age-3',
    category: 'aptitude',
    topic: 'Problems on Ages',
    difficulty: 'Hard',
    questionType: 'mcq',
    questionText: 'Ten years ago, the ratio of ages of Maya and Sarah was 3 : 5. Five years from now, the ratio will be 6 : 7. What is Maya’s present age?',
    options: ['20 years', '25 years', '30 years', '35 years'],
    correctAnswer: 1, // B = 25 years
    explanation: 'Step 1: Ten years ago, Maya was 25 - 10 = 15, and Sarah was 35 - 10 = 25. Ratio = 15:25 = 3:5.\nStep 2: In five years, Maya will be 25 + 5 = 30, and Sarah will be 35 + 5 = 35. Ratio = 30:35 = 6:7.\nHence, Maya’s present age is 25 years.',
    shortcutTip: 'Check with option 25: 10 years ago Maya was 15 and Sarah was 25 (ratio 15:25 = 3:5). In 5 years, Maya will be 30 and Sarah will be 35 (ratio 30:35 = 6:7). Perfect match!',
    whyWrong: 'Options checking is the safest and fastest way to solve age word problems.',
    estimatedTimeSec: 40
  },
  {
    id: 'apt-simp-3',
    category: 'aptitude',
    topic: 'Simplification',
    difficulty: 'Easy',
    questionType: 'mcq',
    questionText: 'What is 15% of 60 + 25% of 80?',
    options: ['25', '29', '32', '35'],
    correctAnswer: 1, // B = 29
    explanation: 'Step 1: 15% of 60 = 0.15 * 60 = 9.\nStep 2: 25% of 80 = (1/4) * 80 = 20.\nStep 3: Total = 9 + 20 = 29.',
    shortcutTip: '10% of 60 is 6, 5% is 3, so 15% is 9. 25% of 80 is one quarter of 80 = 20. 9 + 20 = 29.',
    whyWrong: 'Double check mental math: 9 + 20 = 29, not 25.',
    estimatedTimeSec: 20
  }
];
