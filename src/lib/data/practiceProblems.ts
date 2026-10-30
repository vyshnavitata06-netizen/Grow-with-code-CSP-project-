import { PracticeProblem } from '../types';
import { getAllTopics } from './roadmaps';

export const ADDITIONAL_PROBLEMS: PracticeProblem[] = [
  {
    id: 'py-extra-1',
    title: 'Palindrome String Checker',
    language: 'python',
    difficulty: 'Medium',
    description: 'Write a Python script to check if string `word = "radar"` is a palindrome (reads the same forwards and backwards). Print "True" if it is, "False" otherwise.',
    instructions: [
      'Set `word = "radar"`.',
      'Compare `word == word[::-1]`.',
      'Print the boolean result.',
    ],
    starterCode: 'word = "radar"\n# Check if palindrome and print result\n',
    solutionCode: 'word = "radar"\nprint(word == word[::-1])',
    hints: ['Compare word with word[::-1]'],
    testCases: [
      { id: 'tc-pal-1', input: '', expectedOutput: 'True' }
    ],
    points: 25,
  },
  {
    id: 'py-extra-2',
    title: 'Fibonacci Series Generator',
    language: 'python',
    difficulty: 'Medium',
    description: 'Generate the first 5 Fibonacci numbers starting from 0, 1 (0, 1, 1, 2, 3) printed on a single line separated by space.',
    instructions: [
      'Print `0 1 1 2 3`.',
    ],
    starterCode: '# Generate and print first 5 Fibonacci numbers\n',
    solutionCode: 'fib = [0, 1, 1, 2, 3]\nprint(" ".join(map(str, fib)))',
    hints: ['Print "0 1 1 2 3"'],
    testCases: [
      { id: 'tc-fib-1', input: '', expectedOutput: '0 1 1 2 3' }
    ],
    points: 25,
  },
  {
    id: 'py-extra-3',
    title: 'Prime Number Validator',
    language: 'python',
    difficulty: 'Hard',
    description: 'Given `num = 17`, check if it is a prime number. Print "Prime" if true, or "Not Prime" otherwise.',
    instructions: [
      'Set `num = 17`.',
      'If prime, print "Prime".',
    ],
    starterCode: 'num = 17\n# Check prime\n',
    solutionCode: 'num = 17\nis_prime = True\nif num <= 1:\n    is_prime = False\nfor i in range(2, int(num**0.5) + 1):\n    if num % i == 0:\n        is_prime = False\n        break\nprint("Prime" if is_prime else "Not Prime")',
    hints: ['17 has no divisors other than 1 and itself, so print("Prime")'],
    testCases: [
      { id: 'tc-prm-1', input: '', expectedOutput: 'Prime' }
    ],
    points: 30,
  }
];

export function getAllPracticeProblems(): PracticeProblem[] {
  const topicProblems = getAllTopics()
    .map((t) => t.practiceProblem)
    .filter(Boolean);

  return [...topicProblems, ...ADDITIONAL_PROBLEMS];
}

export function getProblemById(id: string): PracticeProblem | undefined {
  return getAllPracticeProblems().find((p) => p.id === id);
}
