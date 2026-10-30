import { RoadmapTopic } from '../types';

export const PYTHON_ROADMAP: RoadmapTopic[] = [
  {
    id: 'python-1',
    language: 'python',
    stepNumber: 1,
    title: 'Introduction to Python',
    shortDesc: 'Learn what Python is, why it is popular, and write your first Hello World script.',
    estimatedTime: '30 mins',
    level: 'Beginner',
    summary: 'Python is a high-level, interpreted, dynamically typed programming language created by Guido van Rossum.',
    keyConcepts: [
      'High-level & Interpreted Language',
      'Python Syntax & Readability',
      'The print() function',
      'Comments with # symbol',
    ],
    theoryMaterial: `
### What is Python?
Python is one of the most popular programming languages in the world. It is clean, easy to read, and widely used in Web Development, Data Science, Artificial Intelligence, and Automation.

### Key Features of Python:
1. **Easy to Learn & Read**: Python's syntax closely resembles natural English language.
2. **Interpreted**: Code is executed line by line, making debugging simpler.
3. **Cross-Platform**: Runs seamlessly on Windows, macOS, Linux, and Web browsers.
4. **Huge Ecosystem**: Thousands of open-source libraries available for every domain.

### Your First Line of Python:
\`\`\`python
# This is a comment in Python
print("Welcome to Grow With Code!")
\`\`\`
`,
    codeExamples: [
      {
        title: 'Printing Text',
        code: 'print("Hello, Python Explorer!")\nprint("Learning code step-by-step.")',
        explanation: 'The print() function displays whatever text is enclosed in double or single quotes onto the terminal output.',
      },
    ],
    practiceProblem: {
      id: 'py-prob-1',
      title: 'Greeting The Learner',
      language: 'python',
      topicId: 'python-1',
      difficulty: 'Easy',
      description: 'Write a Python program that prints exact text "Hello, Grow With Code!" to the output.',
      instructions: [
        'Use the print() function.',
        'Ensure exact capitalization and punctuation: "Hello, Grow With Code!"',
      ],
      starterCode: '# Write your code below\nprint("Hello...")',
      solutionCode: 'print("Hello, Grow With Code!")',
      hints: [
        'Check the spelling of "Hello, Grow With Code!" inside the quotes.',
        'Use print("Hello, Grow With Code!")',
      ],
      testCases: [
        {
          id: 'tc-1',
          input: '',
          expectedOutput: 'Hello, Grow With Code!',
        },
      ],
      points: 10,
    },
  },

  {
    id: 'python-2',
    language: 'python',
    stepNumber: 2,
    title: 'Variables & Data Types',
    shortDesc: 'Understand variables, numbers, strings, booleans, and type conversion.',
    estimatedTime: '45 mins',
    level: 'Beginner',
    summary: 'Variables store data values in memory. Python automatically detects the data type.',
    keyConcepts: [
      'Variable assignment with =',
      'Integers (int), Floats (float), Strings (str)',
      'Booleans (True/False)',
      'Checking types with type()',
    ],
    theoryMaterial: `
### What is a Variable?
A variable is a named container for holding data values. Unlike compiled languages like C or Java, Python does not require explicit type declaration!

\`\`\`python
user_name = "Alex"      # String (str)
age = 20                # Integer (int)
gpa = 3.85              # Floating point number (float)
is_enrolled = True      # Boolean (bool)
\`\`\`

### Fundamental Data Types in Python:
- **int**: Whole numbers (e.g. 10, -5, 1000)
- **float**: Decimals (e.g. 3.14, -0.5)
- **str**: Text wrapped in quotes (e.g. "Hello")
- **bool**: Logical state (True or False)
`,
    codeExamples: [
      {
        title: 'Declaring Variables and Checking Types',
        code: 'age = 22\nname = "Maya"\nprint(name, "is", age, "years old.")\nprint(type(age))\nprint(type(name))',
        explanation: 'Python evaluates the type of the value assigned and type() displays the class of the object.',
      },
    ],
    practiceProblem: {
      id: 'py-prob-2',
      title: 'Calculate Total Score',
      language: 'python',
      topicId: 'python-2',
      difficulty: 'Easy',
      description: 'Create two variables: `math_score = 85` and `science_score = 92`. Calculate and print their sum.',
      instructions: [
        'Define `math_score = 85`',
        'Define `science_score = 92`',
        'Print the sum of both variables (85 + 92 = 177).',
      ],
      starterCode: '# Declare your variables and calculate the sum\nmath_score = 85\nscience_score = 92\n',
      solutionCode: 'math_score = 85\nscience_score = 92\ntotal = math_score + science_score\nprint(total)',
      hints: [
        'Add math_score and science_score using the + operator.',
        'Use print(math_score + science_score)',
      ],
      testCases: [
        {
          id: 'tc-2',
          input: '',
          expectedOutput: '177',
        },
      ],
      points: 15,
    },
  },

  {
    id: 'python-3',
    language: 'python',
    stepNumber: 3,
    title: 'Input & Output Operations',
    shortDesc: 'Receive user input using input() and format output strings with f-strings.',
    estimatedTime: '40 mins',
    level: 'Beginner',
    summary: 'Master standard input handling with input() and modern string formatting with f-strings.',
    keyConcepts: [
      'Reading strings with input()',
      'Converting input types: int(input()) or float(input())',
      'Modern f-strings: f"Hello {name}"',
      'Custom print separators and end markers',
    ],
    theoryMaterial: `
### Reading User Input
The \`input()\` function stops execution and waits for user input from the console. Note: \`input()\` always returns data as a **string**!

\`\`\`python
name = input("Enter your name: ")
print(f"Welcome to Grow With Code, {name}!")
\`\`\`

### Type Conversion for Numerical Input
To perform math operations on user input, convert it to \`int\` or \`float\`:
\`\`\`python
age = int(input("Enter your age: "))
next_age = age + 1
print(f"Next year you will be {next_age}")
\`\`\`
`,
    codeExamples: [
      {
        title: 'F-string formatting',
        code: 'name = "Dev"\nscore = 98\nprint(f"Student {name} achieved a score of {score}%.")',
        explanation: 'f-strings allow embedding variables directly inside string curly braces.',
      },
    ],
    practiceProblem: {
      id: 'py-prob-3',
      title: 'Format User Profile',
      language: 'python',
      topicId: 'python-3',
      difficulty: 'Easy',
      description: 'Given variables `city = "Tokyo"` and `temp = 24`, print "The temperature in Tokyo is 24 degrees C."',
      instructions: [
        'Use variables `city = "Tokyo"` and `temp = 24`.',
        'Use an f-string to print: `The temperature in Tokyo is 24 degrees C.`',
      ],
      starterCode: 'city = "Tokyo"\ntemp = 24\n# Print formatted string\n',
      solutionCode: 'city = "Tokyo"\ntemp = 24\nprint(f"The temperature in {city} is {temp} degrees C.")',
      hints: [
        'Use f"The temperature in {city} is {temp} degrees C."',
      ],
      testCases: [
        {
          id: 'tc-3',
          input: '',
          expectedOutput: 'The temperature in Tokyo is 24 degrees C.',
        },
      ],
      points: 15,
    },
  },

  {
    id: 'python-4',
    language: 'python',
    stepNumber: 4,
    title: 'Operators & Expressions',
    shortDesc: 'Learn arithmetic, comparison, logical, and assignment operators.',
    estimatedTime: '45 mins',
    level: 'Beginner',
    summary: 'Operators perform operations on values and variables.',
    keyConcepts: [
      'Arithmetic: +, -, *, /, // (floor division), % (modulo), ** (exponent)',
      'Comparison: ==, !=, >, <, >=, <=',
      'Logical: and, or, not',
      'Assignment: +=, -=, *=',
    ],
    theoryMaterial: `
### Arithmetic Operators
- \`+\` Addition (5 + 3 = 8)
- \`-\` Subtraction (5 - 3 = 2)
- \`*\` Multiplication (5 * 3 = 15)
- \`/\` Division (7 / 2 = 3.5)
- \`//\` Floor Division (7 // 2 = 3)
- \`%\` Modulo / Remainder (7 % 2 = 1)
- \`**\` Exponentiation (2 ** 3 = 8)

### Logical Operators
- **and**: Returns True if both conditions are True.
- **or**: Returns True if at least one condition is True.
- **not**: Reverses the boolean result.
`,
    codeExamples: [
      {
        title: 'Even or Odd with Modulo Operator',
        code: 'num = 14\nrem = num % 2\nprint("Remainder when divided by 2:", rem)\nprint("Is even:", rem == 0)',
        explanation: 'The % operator yields the remainder. If num % 2 equals 0, the number is even.',
      },
    ],
    practiceProblem: {
      id: 'py-prob-4',
      title: 'Area and Perimeter of a Rectangle',
      language: 'python',
      topicId: 'python-4',
      difficulty: 'Easy',
      description: 'Given `length = 10` and `width = 5`, compute the area (length * width) and print it.',
      instructions: [
        'Set `length = 10` and `width = 5`.',
        'Calculate `area = length * width`.',
        'Print area.',
      ],
      starterCode: 'length = 10\nwidth = 5\n# Compute area and print\n',
      solutionCode: 'length = 10\nwidth = 5\narea = length * width\nprint(area)',
      hints: [
        'Multiply length and width with * operator.',
      ],
      testCases: [
        {
          id: 'tc-4',
          input: '',
          expectedOutput: '50',
        },
      ],
      points: 15,
    },
  },

  {
    id: 'python-5',
    language: 'python',
    stepNumber: 5,
    title: 'Conditional Statements',
    shortDesc: 'Make decisions in your programs using if, elif, and else statements.',
    estimatedTime: '50 mins',
    level: 'Beginner',
    summary: 'Branch execution based on boolean conditions and indentation.',
    keyConcepts: [
      'if, elif, and else syntax',
      'Python Indentation rules (4 spaces)',
      'Nested conditional statements',
      'Ternary operator: value_if_true if condition else value_if_false',
    ],
    theoryMaterial: `
### Decision Making in Python
Conditionals allow your code to execute different paths based on conditions:

\`\`\`python
score = 85

if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
else:
    print("Grade: Need Practice")
\`\`\`

> ⚠️ **Important**: Python relies on **indentation** (whitespace) to define code blocks! Always keep your indentations consistent (4 spaces).
`,
    codeExamples: [
      {
        title: 'Check Voting Eligibility',
        code: 'age = 19\nif age >= 18:\n    print("Eligible to vote")\nelse:\n    print("Not eligible yet")',
        explanation: 'The code checks if age is greater than or equal to 18.',
      },
    ],
    practiceProblem: {
      id: 'py-prob-5',
      title: 'Positive, Negative, or Zero',
      language: 'python',
      topicId: 'python-5',
      difficulty: 'Easy',
      description: 'Given `number = -7`, print "Negative" if number < 0, "Positive" if number > 0, or "Zero" if number == 0.',
      instructions: [
        'Set `number = -7`.',
        'Check conditions using if/elif/else.',
        'Print "Negative".',
      ],
      starterCode: 'number = -7\n# Write conditional logic\n',
      solutionCode: 'number = -7\nif number > 0:\n    print("Positive")\nelif number < 0:\n    print("Negative")\nelse:\n    print("Zero")',
      hints: [
        'Check if number < 0 then print("Negative")',
      ],
      testCases: [
        {
          id: 'tc-5',
          input: '',
          expectedOutput: 'Negative',
        },
      ],
      points: 20,
    },
  },

  {
    id: 'python-6',
    language: 'python',
    stepNumber: 6,
    title: 'Loops (for & while)',
    shortDesc: 'Automate repetitive tasks using for loops, while loops, range(), break, and continue.',
    estimatedTime: '55 mins',
    level: 'Beginner',
    summary: 'Loops repeat a block of code multiple times or iterate over sequences.',
    keyConcepts: [
      'range(start, stop, step) function',
      'for item in sequence loop',
      'while condition loop',
      'break and continue control keywords',
    ],
    theoryMaterial: `
### 1. The \`for\` Loop
Used for iterating over a sequence (list, string, range):

\`\`\`python
for i in range(1, 6):
    print(f"Step {i}")
\`\`\`

### 2. The \`while\` Loop
Executes as long as a condition remains True:

\`\`\`python
count = 3
while count > 0:
    print(f"Countdown: {count}")
    count -= 1
print("Blastoff!")
\`\`\`
`,
    codeExamples: [
      {
        title: 'Sum of First N Numbers',
        code: 'total = 0\nfor i in range(1, 6):\n    total += i\nprint("Sum 1 to 5:", total)',
        explanation: 'range(1, 6) generates numbers 1, 2, 3, 4, 5. total accumulates the sum (15).',
      },
    ],
    practiceProblem: {
      id: 'py-prob-6',
      title: 'Print Even Numbers 2 to 10',
      language: 'python',
      topicId: 'python-6',
      difficulty: 'Medium',
      description: 'Use a loop to print all even numbers from 2 up to 10 (2, 4, 6, 8, 10), each on a new line.',
      instructions: [
        'Use range(2, 11, 2) or a while loop.',
        'Print each even number.',
      ],
      starterCode: '# Print even numbers from 2 to 10\n',
      solutionCode: 'for num in range(2, 11, 2):\n    print(num)',
      hints: [
        'range(2, 11, 2) starts at 2, goes up to 10 with step size 2.',
      ],
      testCases: [
        {
          id: 'tc-6',
          input: '',
          expectedOutput: '2\n4\n6\n8\n10',
        },
      ],
      points: 20,
    },
  },

  {
    id: 'python-7',
    language: 'python',
    stepNumber: 7,
    title: 'Functions & Scope',
    shortDesc: 'Write reusable blocks of code using def, parameters, return statements, and local vs global scope.',
    estimatedTime: '60 mins',
    level: 'Intermediate',
    summary: 'Functions structure code into modular, readable, and reusable units.',
    keyConcepts: [
      'Defining functions with def statement',
      'Arguments & Parameters',
      'Return values',
      'Default parameter values',
      'Local vs Global scope',
    ],
    theoryMaterial: `
### Creating Functions
Functions are declared using the \`def\` keyword:

\`\`\`python
def greet_user(name="Learner"):
    return f"Hello, {name}! Ready to code?"

message = greet_user("Sophia")
print(message)
\`\`\`

### Local vs Global Scope
Variables created inside a function exist only within that function (local scope), while variables declared outside belong to the global scope.
`,
    codeExamples: [
      {
        title: 'Calculate Square of a Number',
        code: 'def square(num):\n    return num * num\n\nresult = square(6)\nprint("Square of 6 is:", result)',
        explanation: 'square() takes a parameter num and returns its square value.',
      },
    ],
    practiceProblem: {
      id: 'py-prob-7',
      title: 'Write a Multiplication Function',
      language: 'python',
      topicId: 'python-7',
      difficulty: 'Easy',
      description: 'Define a function named `multiply(a, b)` that returns `a * b`. Then call `multiply(4, 5)` and print the result.',
      instructions: [
        'Define `def multiply(a, b):`',
        'Return `a * b`.',
        'Print the result of calling `multiply(4, 5)`.',
      ],
      starterCode: '# Define multiply function and call it\n',
      solutionCode: 'def multiply(a, b):\n    return a * b\n\nprint(multiply(4, 5))',
      hints: [
        'Return a * b inside multiply function, then call print(multiply(4, 5))',
      ],
      testCases: [
        {
          id: 'tc-7',
          input: '',
          expectedOutput: '20',
        },
      ],
      points: 20,
    },
  },

  {
    id: 'python-8',
    language: 'python',
    stepNumber: 8,
    title: 'Lists & List Comprehensions',
    shortDesc: 'Store ordered collections of elements, modify lists, and write concise list comprehensions.',
    estimatedTime: '55 mins',
    level: 'Intermediate',
    summary: 'Lists are mutable ordered sequences in Python.',
    keyConcepts: [
      'Creating lists: [elem1, elem2]',
      'Indexing & Slicing: list[0], list[1:3]',
      'List methods: append(), remove(), pop(), sort()',
      'List comprehensions: [x*2 for x in numbers]',
    ],
    theoryMaterial: `
### Working with Lists
Lists are ordered, mutable (changeable) sequences:

\`\`\`python
fruits = ["apple", "banana", "cherry"]
fruits.append("date")         # Add item
fruits[0] = "avocado"         # Modify item
print(fruits)                 # ['avocado', 'banana', 'cherry', 'date']
\`\`\`

### List Comprehensions
A fast, elegant way to build lists in one line:
\`\`\`python
squares = [x**2 for x in range(1, 6)]
print(squares) # [1, 4, 9, 16, 25]
\`\`\`
`,
    codeExamples: [
      {
        title: 'Filter Even Numbers with List Comprehension',
        code: 'numbers = [1, 2, 3, 4, 5, 6, 7, 8]\nevens = [num for num in numbers if num % 2 == 0]\nprint("Evens:", evens)',
        explanation: 'List comprehension iterates over numbers and keeps only items where num % 2 == 0.',
      },
    ],
    practiceProblem: {
      id: 'py-prob-8',
      title: 'Find Maximum in a List',
      language: 'python',
      topicId: 'python-8',
      difficulty: 'Easy',
      description: 'Given `scores = [78, 92, 85, 99, 64]`, find and print the maximum score using the max() function.',
      instructions: [
        'Set `scores = [78, 92, 85, 99, 64]`.',
        'Print `max(scores)`.',
      ],
      starterCode: 'scores = [78, 92, 85, 99, 64]\n# Print max score\n',
      solutionCode: 'scores = [78, 92, 85, 99, 64]\nprint(max(scores))',
      hints: [
        'Use the built-in max() function: print(max(scores))',
      ],
      testCases: [
        {
          id: 'tc-8',
          input: '',
          expectedOutput: '99',
        },
      ],
      points: 20,
    },
  },

  {
    id: 'python-9',
    language: 'python',
    stepNumber: 9,
    title: 'Tuples & Sets',
    shortDesc: 'Work with immutable tuples and unique item sets for high-efficiency data structures.',
    estimatedTime: '45 mins',
    level: 'Intermediate',
    summary: 'Tuples store immutable ordered data; Sets store unique unordered items.',
    keyConcepts: [
      'Tuples with parenthesis: (1, 2, 3)',
      'Tuple immutability & unpacking',
      'Sets with curly braces: {1, 2, 3}',
      'Set mathematical operations: union, intersection, difference',
    ],
    theoryMaterial: `
### Tuples (Immutable)
Tuples cannot be modified after creation, making them safe for fixed data like coordinates:
\`\`\`python
point = (10, 20)
x, y = point  # Tuple unpacking
print(f"X: {x}, Y: {y}")
\`\`\`

### Sets (Unique Elements)
Sets automatically eliminate duplicate items:
\`\`\`python
tags = {"python", "coding", "python", "web"}
print(tags)  # {'python', 'coding', 'web'}
\`\`\`
`,
    codeExamples: [
      {
        title: 'Removing Duplicates with Set',
        code: 'raw_ids = [101, 102, 101, 103, 102]\nunique_ids = list(set(raw_ids))\nunique_ids.sort()\nprint("Unique sorted IDs:", unique_ids)',
        explanation: 'Converting list to set strips duplicates, then converting back to list allows sorting.',
      },
    ],
    practiceProblem: {
      id: 'py-prob-9',
      title: 'Count Unique Items',
      language: 'python',
      topicId: 'python-9',
      difficulty: 'Easy',
      description: 'Given `items = ["apple", "banana", "apple", "orange", "banana"]`, count how many unique items exist using a set and len() function.',
      instructions: [
        'Convert `items` to a set using `set(items)`.',
        'Print the length of the set.',
      ],
      starterCode: 'items = ["apple", "banana", "apple", "orange", "banana"]\n# Count unique items\n',
      solutionCode: 'items = ["apple", "banana", "apple", "orange", "banana"]\nprint(len(set(items)))',
      hints: [
        'Use len(set(items))',
      ],
      testCases: [
        {
          id: 'tc-9',
          input: '',
          expectedOutput: '3',
        },
      ],
      points: 20,
    },
  },

  {
    id: 'python-10',
    language: 'python',
    stepNumber: 10,
    title: 'Dictionaries',
    shortDesc: 'Store key-value mappings, access dictionary entries, and iterate over keys and values.',
    estimatedTime: '50 mins',
    level: 'Intermediate',
    summary: 'Dictionaries store data in key-value pairs for ultra-fast lookup.',
    keyConcepts: [
      'Creating dicts: {"key": "value"}',
      'Accessing & updating values',
      'get() method with fallback values',
      'Iterating with keys(), values(), items()',
    ],
    theoryMaterial: `
### Dictionary Basics
Dictionaries map unique keys to values:

\`\`\`python
student = {
    "name": "Alex",
    "course": "Python",
    "marks": 95
}

# Access value
print(student["name"])

# Safe access with get()
print(student.get("gpa", "N/A"))

# Update/Add value
student["level"] = "Intermediate"
\`\`\`
`,
    codeExamples: [
      {
        title: 'Iterating through dictionary items',
        code: 'prices = {"laptop": 800, "mouse": 25, "keyboard": 60}\nfor item, price in prices.items():\n    print(f"{item.capitalize()}: ${price}")',
        explanation: 'items() returns pairs of (key, value) during loop iteration.',
      },
    ],
    practiceProblem: {
      id: 'py-prob-10',
      title: 'Lookup Capital City',
      language: 'python',
      topicId: 'python-10',
      difficulty: 'Easy',
      description: 'Given dictionary `capitals = {"France": "Paris", "Japan": "Tokyo", "India": "New Delhi"}`, print the capital of Japan.',
      instructions: [
        'Define the dictionary `capitals`.',
        'Print `capitals["Japan"]`.',
      ],
      starterCode: 'capitals = {"France": "Paris", "Japan": "Tokyo", "India": "New Delhi"}\n# Print capital of Japan\n',
      solutionCode: 'capitals = {"France": "Paris", "Japan": "Tokyo", "India": "New Delhi"}\nprint(capitals["Japan"])',
      hints: [
        'Access dictionary entry with capitals["Japan"]',
      ],
      testCases: [
        {
          id: 'tc-10',
          input: '',
          expectedOutput: 'Tokyo',
        },
      ],
      points: 20,
    },
  },

  {
    id: 'python-11',
    language: 'python',
    stepNumber: 11,
    title: 'Strings & String Manipulation',
    shortDesc: 'Master string methods, slicing, formatting, splitting, joining, and casing.',
    estimatedTime: '45 mins',
    level: 'Intermediate',
    summary: 'Strings are immutable text sequences with rich built-in manipulation methods.',
    keyConcepts: [
      'String Slicing: text[start:end:step]',
      'Methods: upper(), lower(), strip(), replace()',
      'Splitting & Joining: split(), join()',
      'Searching: find(), count(), startswith(), endswith()',
    ],
    theoryMaterial: `
### Common String Methods
\`\`\`python
text = "  Grow With Code  "

print(text.strip())              # Removes leading/trailing whitespace
print(text.upper())              # " GROW WITH CODE "
print(text.replace("Code", "AI"))# "  Grow With AI  "

words = text.strip().split()     # ['Grow', 'With', 'Code']
print("-".join(words))           # "Grow-With-Code"
\`\`\`
`,
    codeExamples: [
      {
        title: 'Reverse a string using slicing',
        code: 'word = "Python"\nreversed_word = word[::-1]\nprint("Reversed:", reversed_word)',
        explanation: 'slicing with step -1[::-1] reverses any string.',
      },
    ],
    practiceProblem: {
      id: 'py-prob-11',
      title: 'Reverse and Uppercase String',
      language: 'python',
      topicId: 'python-11',
      difficulty: 'Easy',
      description: 'Given `msg = "python"`, reverse it and print it in UPPERCASE ("NOHTYP").',
      instructions: [
        'Set `msg = "python"`.',
        'Reverse using `msg[::-1]`.',
        'Convert to uppercase using `.upper()`.',
        'Print the result.',
      ],
      starterCode: 'msg = "python"\n# Reverse and convert to upper\n',
      solutionCode: 'msg = "python"\nprint(msg[::-1].upper())',
      hints: [
        'Use msg[::-1].upper()',
      ],
      testCases: [
        {
          id: 'tc-11',
          input: '',
          expectedOutput: 'NOHTYP',
        },
      ],
      points: 20,
    },
  },

  {
    id: 'python-12',
    language: 'python',
    stepNumber: 12,
    title: 'Exception Handling',
    shortDesc: 'Handle runtime errors gracefully using try, except, else, and finally blocks.',
    estimatedTime: '45 mins',
    level: 'Intermediate',
    summary: 'Prevent program crashes by catching and managing exceptions safely.',
    keyConcepts: [
      'try and except blocks',
      'Catching specific exceptions (ValueError, ZeroDivisionError)',
      'else block (runs when no error occurs)',
      'finally block (always executes)',
      'Raising custom exceptions with raise',
    ],
    theoryMaterial: `
### Handling Errors Gracefully
Without exception handling, an unhandled error crashes your application.

\`\`\`python
try:
    num1 = 10
    num2 = 0
    result = num1 / num2
except ZeroDivisionError:
    print("Cannot divide by zero!")
else:
    print(f"Result is {result}")
finally:
    print("Execution complete.")
\`\`\`
`,
    codeExamples: [
      {
        title: 'Safe Integer Conversion',
        code: 'val_str = "100"\ntry:\n    val = int(val_str)\n    print("Converted successfully:", val)\nexcept ValueError:\n    print("Invalid integer string")',
        explanation: 'The try block attempts int() conversion and catches ValueError if input is not a number.',
      },
    ],
    practiceProblem: {
      id: 'py-prob-12',
      title: 'Handle Division by Zero',
      language: 'python',
      topicId: 'python-12',
      difficulty: 'Medium',
      description: 'Write code that attempts to divide 50 by 0. Catch `ZeroDivisionError` and print "Error: Division by zero caught!".',
      instructions: [
        'Use a try block with `50 / 0`.',
        'Catch `ZeroDivisionError`.',
        'Print "Error: Division by zero caught!".',
      ],
      starterCode: '# Use try/except to catch ZeroDivisionError\n',
      solutionCode: 'try:\n    res = 50 / 0\nexcept ZeroDivisionError:\n    print("Error: Division by zero caught!")',
      hints: [
        'Wrap 50 / 0 inside a try block.',
      ],
      testCases: [
        {
          id: 'tc-12',
          input: '',
          expectedOutput: 'Error: Division by zero caught!',
        },
      ],
      points: 25,
    },
  },

  {
    id: 'python-13',
    language: 'python',
    stepNumber: 13,
    title: 'File Handling',
    shortDesc: 'Read, write, append, and manage files safely using Python with statement.',
    estimatedTime: '50 mins',
    level: 'Advanced',
    summary: 'Persist data to disk files using open(), read(), write(), and context managers.',
    keyConcepts: [
      'Opening files with open(filename, mode)',
      'Modes: "r" (read), "w" (write), "a" (append)',
      'The with context manager for auto-closing files',
      'Reading lines with readlines()',
    ],
    theoryMaterial: `
### Safe File Access with \`with\` statement
Using \`with\` ensures the file is automatically closed even if errors occur:

\`\`\`python
# Writing to a file
with open("notes.txt", "w") as file:
    file.write("Python makes file handling easy!\\n")

# Reading from a file
with open("notes.txt", "r") as file:
    content = file.read()
    print(content)
\`\`\`
`,
    codeExamples: [
      {
        title: 'Simulating File Reading & String Output',
        code: 'lines = ["Line 1: Python\\n", "Line 2: Data\\n"]\nfor line in lines:\n    print(line.strip())',
        explanation: 'strip() removes newline characters from read lines.',
      },
    ],
    practiceProblem: {
      id: 'py-prob-13',
      title: 'Format File Lines',
      language: 'python',
      topicId: 'python-13',
      difficulty: 'Medium',
      description: 'Given list `raw_data = ["  python ", " javascript  ", "  html "]`, clean each string with `.strip()` and print them joined by comma (e.g., "python, javascript, html").',
      instructions: [
        'Use list comprehension or a loop with `.strip()`.',
        'Join cleaned strings with `", "`.',
        'Print the result.',
      ],
      starterCode: 'raw_data = ["  python ", " javascript  ", "  html "]\n# Clean and join strings\n',
      solutionCode: 'raw_data = ["  python ", " javascript  ", "  html "]\ncleaned = [item.strip() for item in raw_data]\nprint(", ".join(cleaned))',
      hints: [
        'Use [item.strip() for item in raw_data] and ", ".join(...)',
      ],
      testCases: [
        {
          id: 'tc-13',
          input: '',
          expectedOutput: 'python, javascript, html',
        },
      ],
      points: 25,
    },
  },

  {
    id: 'python-14',
    language: 'python',
    stepNumber: 14,
    title: 'Object-Oriented Programming (OOP)',
    shortDesc: 'Understand Classes, Objects, __init__ constructor, methods, and Inheritance.',
    estimatedTime: '70 mins',
    level: 'Advanced',
    summary: 'OOP organizes programs into real-world objects containing data (attributes) and actions (methods).',
    keyConcepts: [
      'Classes & Object instantiation',
      'Constructor __init__(self, ...)',
      'Instance methods & self parameter',
      'Encapsulation & Abstraction',
      'Inheritance & Polymorphism',
    ],
    theoryMaterial: `
### Object-Oriented Principles
A **Class** is a blueprint, and an **Object** is an instance of that blueprint.

\`\`\`python
class Student:
    def __init__(self, name, score):
        self.name = name
        self.score = score
        
    def get_grade(self):
        return "Pass" if self.score >= 50 else "Fail"

s1 = Student("Alex", 88)
print(s1.name, "-", s1.get_grade())
\`\`\`

### Inheritance
Classes can inherit attributes and methods from a parent class:
\`\`\`python
class Developer(Student):
    def code(self):
        print(f"{self.name} is writing code!")
\`\`\`
`,
    codeExamples: [
      {
        title: 'Create a Car Class',
        code: 'class Car:\n    def __init__(self, brand, model):\n        self.brand = brand\n        self.model = model\n    def start(self):\n        print(f"{self.brand} {self.model} is starting!")\n\nmy_car = Car("Tesla", "Model 3")\nmy_car.start()',
        explanation: '__init__ initializes attributes when an object is instantiated.',
      },
    ],
    practiceProblem: {
      id: 'py-prob-14',
      title: 'Create a Rectangle Class',
      language: 'python',
      topicId: 'python-14',
      difficulty: 'Hard',
      description: 'Create a class `Rectangle` with `__init__(self, width, height)` and a method `area(self)` that returns `width * height`. Create an object with width 6 and height 4, then print its area.',
      instructions: [
        'Define `class Rectangle:`.',
        'Define `__init__(self, width, height): self.width = width; self.height = height`.',
        'Define `area(self): return self.width * self.height`.',
        'Create instance `r = Rectangle(6, 4)` and print `r.area()`.',
      ],
      starterCode: '# Define Rectangle class\n\n# Create object and print area\n',
      solutionCode: 'class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n    def area(self):\n        return self.width * self.height\n\nr = Rectangle(6, 4)\nprint(r.area())',
      hints: [
        'Inside class Rectangle, define def area(self): return self.width * self.height',
      ],
      testCases: [
        {
          id: 'tc-14',
          input: '',
          expectedOutput: '24',
        },
      ],
      points: 30,
    },
  },
];
