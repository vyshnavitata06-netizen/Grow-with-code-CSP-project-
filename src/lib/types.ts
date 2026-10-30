export type LanguageId = 'python' | 'javascript' | 'c' | 'cpp' | 'java' | 'html' | 'css' | 'sql';

export interface LanguageInfo {
  id: LanguageId;
  name: string;
  icon: string;
  description: string;
  category: 'Backend' | 'Frontend' | 'Database' | 'Systems';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  totalTopics: number;
  estimatedHours: number;
  color: string;
  badge: string;
}

export interface PracticeTestCase {
  id: string;
  input: string;
  expectedOutput: string;
  hidden?: boolean;
}

export interface PracticeProblem {
  id: string;
  title: string;
  language: LanguageId;
  topicId?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  instructions: string[];
  starterCode: string;
  solutionCode: string;
  hints: string[];
  testCases: PracticeTestCase[];
  points: number;
}

export interface RoadmapTopic {
  id: string;
  language: LanguageId;
  stepNumber: number;
  title: string;
  shortDesc: string;
  estimatedTime: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  keyConcepts: string[];
  theoryMaterial: string; // Markdown / formatted text
  codeExamples: {
    title: string;
    code: string;
    explanation: string;
  }[];
  practiceProblem: PracticeProblem;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinedDate: string;
  goal: string;
  experienceLevel: string;
  dailyGoalMinutes: number;
  currentStreak: number;
  lastActiveDate: string;
  points: number;
}

export interface UserProgress {
  completedTopicIds: string[]; // e.g. "python-1", "python-2"
  solvedProblemIds: string[]; // e.g. "py-prob-1"
  activeLanguage: LanguageId;
  languageProgress: Record<LanguageId, number>; // Percentage completed 0..100
  studyMinutesToday: number;
  unlockedBadges: string[];
  earnedCertificates: {
    language: LanguageId;
    date: string;
    certificateId: string;
  }[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'streak' | 'topic' | 'problem' | 'special';
  unlockedAt?: string;
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  codeSnippet?: string;
  topicSuggestion?: string;
}
