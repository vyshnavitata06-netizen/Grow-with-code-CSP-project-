import { RoadmapTopic, LanguageId } from '../types';

export const OTHER_ROADMAPS: Record<Exclude<LanguageId, 'python'>, RoadmapTopic[]> = {
  javascript: [
    {
      id: 'js-1',
      language: 'javascript',
      stepNumber: 1,
      title: 'JavaScript Fundamentals & Console Output',
      shortDesc: 'Understand let, const, var, console.log and JS primitive data types.',
      estimatedTime: '35 mins',
      level: 'Beginner',
      summary: 'JavaScript powers interactive features on websites and backend servers.',
      keyConcepts: ['Variables with const & let', 'console.log() output', 'Strings & Numbers', 'Template Literals `${var}`'],
      theoryMaterial: 'JavaScript is a lightweight, dynamic scripting language.',
      codeExamples: [
        { title: 'Hello JS', code: 'const message = "Hello, Grow With Code!";\nconsole.log(message);', explanation: 'const declares immutable references.' }
      ],
      practiceProblem: {
        id: 'js-prob-1',
        title: 'Console Log Greeting',
        language: 'javascript',
        topicId: 'js-1',
        difficulty: 'Easy',
        description: 'Print "JavaScript is awesome!" to console.',
        instructions: ['Use console.log("JavaScript is awesome!")'],
        starterCode: 'console.log("...")',
        solutionCode: 'console.log("JavaScript is awesome!");',
        hints: ['Check exact string punctuation.'],
        testCases: [{ id: 'tc-js-1', input: '', expectedOutput: 'JavaScript is awesome!' }],
        points: 10
      }
    },
    {
      id: 'js-2',
      language: 'javascript',
      stepNumber: 2,
      title: 'JS Functions & Arrow Functions',
      shortDesc: 'Write reusable functions using ES6 arrow syntax.',
      estimatedTime: '45 mins',
      level: 'Beginner',
      summary: 'Functions are first-class citizens in JavaScript.',
      keyConcepts: ['function keyword', 'Arrow functions () => {}', 'Return statements', 'Parameters & Default values'],
      theoryMaterial: 'Arrow functions offer concise syntax for inline callbacks.',
      codeExamples: [
        { title: 'Arrow function', code: 'const add = (a, b) => a + b;\nconsole.log(add(10, 20));', explanation: 'Implicit return when body is single expression.' }
      ],
      practiceProblem: {
        id: 'js-prob-2',
        title: 'Square Number Arrow Function',
        language: 'javascript',
        topicId: 'js-2',
        difficulty: 'Easy',
        description: 'Create an arrow function `const square = n => n * n;` and log `square(7)`.',
        instructions: ['Log the result of square(7) (49).'],
        starterCode: 'const square = n => n * n;\n// console.log ...',
        solutionCode: 'const square = n => n * n;\nconsole.log(square(7));',
        hints: ['console.log(square(7))'],
        testCases: [{ id: 'tc-js-2', input: '', expectedOutput: '49' }],
        points: 15
      }
    }
  ],
  c: [
    {
      id: 'c-1',
      language: 'c',
      stepNumber: 1,
      title: 'Introduction to C & printf',
      shortDesc: 'Learn C main function, headers, #include <stdio.h>, and return 0.',
      estimatedTime: '40 mins',
      level: 'Beginner',
      summary: 'C is the procedural programming foundation created by Dennis Ritchie.',
      keyConcepts: ['#include <stdio.h>', 'int main() entry point', 'printf() and newline \\n', 'return 0;'],
      theoryMaterial: 'C requires explicit compilation and structured syntax.',
      codeExamples: [
        { title: 'Hello C', code: '#include <stdio.h>\n\nint main() {\n    printf("Hello C World!\\n");\n    return 0;\n}', explanation: 'stdio.h provides standard input/output functions.' }
      ],
      practiceProblem: {
        id: 'c-prob-1',
        title: 'C Print Message',
        language: 'c',
        topicId: 'c-1',
        difficulty: 'Easy',
        description: 'Print "Welcome to C Programming" using printf.',
        instructions: ['Include main function and printf.'],
        starterCode: '#include <stdio.h>\n\nint main() {\n    // Print message\n    return 0;\n}',
        solutionCode: '#include <stdio.h>\n\nint main() {\n    printf("Welcome to C Programming");\n    return 0;\n}',
        hints: ['Use printf("Welcome to C Programming");'],
        testCases: [{ id: 'tc-c-1', input: '', expectedOutput: 'Welcome to C Programming' }],
        points: 10
      }
    }
  ],
  cpp: [
    {
      id: 'cpp-1',
      language: 'cpp',
      stepNumber: 1,
      title: 'C++ Basics & iostream',
      shortDesc: 'Learn std::cout, std::cin, namespaces, and std::endl.',
      estimatedTime: '45 mins',
      level: 'Beginner',
      summary: 'C++ expands C with object-oriented and generic features.',
      keyConcepts: ['#include <iostream>', 'std::cout <<', 'using namespace std;', 'Variables & Types'],
      theoryMaterial: 'C++ is widely used for high performance software and competitive coding.',
      codeExamples: [
        { title: 'C++ Output', code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello C++!" << endl;\n    return 0;\n}', explanation: 'cout prints output streams.' }
      ],
      practiceProblem: {
        id: 'cpp-prob-1',
        title: 'C++ Output Stream',
        language: 'cpp',
        topicId: 'cpp-1',
        difficulty: 'Easy',
        description: 'Print "C++ Fast & Efficient" using cout.',
        instructions: ['Use cout << "C++ Fast & Efficient";'],
        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // cout message\n    return 0;\n}',
        solutionCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "C++ Fast & Efficient";\n    return 0;\n}',
        hints: ['Use cout << "C++ Fast & Efficient";'],
        testCases: [{ id: 'tc-cpp-1', input: '', expectedOutput: 'C++ Fast & Efficient' }],
        points: 10
      }
    }
  ],
  java: [
    {
      id: 'java-1',
      language: 'java',
      stepNumber: 1,
      title: 'Java Classes & System.out.println',
      shortDesc: 'Structure Java classes, public static void main, and print statements.',
      estimatedTime: '45 mins',
      level: 'Beginner',
      summary: 'Java is a statically typed, class-based object-oriented language.',
      keyConcepts: ['public class Main', 'public static void main(String[] args)', 'System.out.println()'],
      theoryMaterial: 'Java code is compiled into bytecode for the Java Virtual Machine (JVM).',
      codeExamples: [
        { title: 'Java Main Class', code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello Java!");\n    }\n}', explanation: 'Every Java application starts inside main method.' }
      ],
      practiceProblem: {
        id: 'java-prob-1',
        title: 'Print Java Message',
        language: 'java',
        topicId: 'java-1',
        difficulty: 'Easy',
        description: 'Print "Java Platform Independent" using System.out.println.',
        instructions: ['Use System.out.println("Java Platform Independent"); inside main.'],
        starterCode: 'public class Main {\n    public static void main(String[] args) {\n        // Your code\n    }\n}',
        solutionCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Java Platform Independent");\n    }\n}',
        hints: ['System.out.println("Java Platform Independent");'],
        testCases: [{ id: 'tc-java-1', input: '', expectedOutput: 'Java Platform Independent' }],
        points: 10
      }
    }
  ],
  html: [
    {
      id: 'html-1',
      language: 'html',
      stepNumber: 1,
      title: 'HTML Skeleton & Text Tags',
      shortDesc: 'Master headings, paragraphs, lists, links, and image elements.',
      estimatedTime: '30 mins',
      level: 'Beginner',
      summary: 'HTML forms the semantic document layout of web pages.',
      keyConcepts: ['<!DOCTYPE html>', '<h1> to <h6> headings', '<p> paragraph tag', '<a> links and <img> images'],
      theoryMaterial: 'HTML uses tags enclosed in angle brackets to define content structures.',
      codeExamples: [
        { title: 'Basic HTML Page', code: '<h1>Grow With Code</h1>\n<p>Learn web development step-by-step!</p>', explanation: 'Headings provide visual hierarchy.' }
      ],
      practiceProblem: {
        id: 'html-prob-1',
        title: 'Create Heading and Paragraph',
        language: 'html',
        topicId: 'html-1',
        difficulty: 'Easy',
        description: 'Write an HTML snippet with `<h1>Title</h1>` and `<p>Content</p>`.',
        instructions: ['Output exact heading <h1>Title</h1> and paragraph <p>Content</p>.'],
        starterCode: '<h1>...</h1>\n<p>...</p>',
        solutionCode: '<h1>Title</h1>\n<p>Content</p>',
        hints: ['Ensure exact tags <h1>Title</h1> and <p>Content</p>.'],
        testCases: [{ id: 'tc-html-1', input: '', expectedOutput: '<h1>Title</h1>\n<p>Content</p>' }],
        points: 10
      }
    }
  ],
  css: [
    {
      id: 'css-1',
      language: 'css',
      stepNumber: 1,
      title: 'CSS Selectors & Styling',
      shortDesc: 'Understand color, background, font-size, margin, padding, and selectors.',
      estimatedTime: '35 mins',
      level: 'Beginner',
      summary: 'CSS controls the presentation and visual design of HTML documents.',
      keyConcepts: ['Element, Class (.class), ID (#id) selectors', 'Color & font properties', 'Box Model (content, padding, border, margin)'],
      theoryMaterial: 'CSS rules consist of a selector and declaration block.',
      codeExamples: [
        { title: 'CSS Styling', code: 'h1 {\n  color: #3b82f6;\n  font-size: 24px;\n}', explanation: 'Targets all h1 tags and sets blue text color.' }
      ],
      practiceProblem: {
        id: 'css-prob-1',
        title: 'Button Styling Rule',
        language: 'css',
        topicId: 'css-1',
        difficulty: 'Easy',
        description: 'Write a CSS rule for `.btn` setting `background-color: blue;` and `color: white;`.',
        instructions: ['Write `.btn { background-color: blue; color: white; }`'],
        starterCode: '.btn {\n  /* add styles */\n}',
        solutionCode: '.btn {\n  background-color: blue;\n  color: white;\n}',
        hints: ['Target .btn selector with background-color and color properties.'],
        testCases: [{ id: 'tc-css-1', input: '', expectedOutput: '.btn {\n  background-color: blue;\n  color: white;\n}' }],
        points: 10
      }
    }
  ],
  sql: [
    {
      id: 'sql-1',
      language: 'sql',
      stepNumber: 1,
      title: 'SQL SELECT & WHERE Queries',
      shortDesc: 'Query relational database tables using SELECT, FROM, WHERE, and ORDER BY.',
      estimatedTime: '40 mins',
      level: 'Beginner',
      summary: 'SQL retrieves and manipulates structured data stored in database tables.',
      keyConcepts: ['SELECT columns FROM table', 'Filtering with WHERE condition', 'Sorting with ORDER BY', 'Limiting rows with LIMIT'],
      theoryMaterial: 'SQL statements are written in clear declarative statements.',
      codeExamples: [
        { title: 'Query All Students', code: 'SELECT name, age, score \nFROM students \nWHERE score >= 80 \nORDER BY score DESC;', explanation: 'Retrieves top scoring students.' }
      ],
      practiceProblem: {
        id: 'sql-prob-1',
        title: 'Select Active Users',
        language: 'sql',
        topicId: 'sql-1',
        difficulty: 'Easy',
        description: 'Write a query to select `name` and `email` from `users` table where `status = "active"`.',
        instructions: ['Write `SELECT name, email FROM users WHERE status = "active";`'],
        starterCode: 'SELECT ... FROM users WHERE ...;',
        solutionCode: 'SELECT name, email FROM users WHERE status = "active";',
        hints: ['Use SELECT name, email FROM users WHERE status = "active";'],
        testCases: [{ id: 'tc-sql-1', input: '', expectedOutput: 'SELECT name, email FROM users WHERE status = "active";' }],
        points: 10
      }
    }
  ]
};
