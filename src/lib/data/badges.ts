import { Badge } from '../types';

export const ALL_BADGES: Badge[] = [
  {
    id: 'first_step',
    title: 'First Code Written',
    description: 'Complete your first topic or practice problem on Grow With Code.',
    icon: '🐣',
    category: 'topic',
  },
  {
    id: 'python_novice',
    title: 'Python Novice',
    description: 'Complete 3 topics in the Python roadmap.',
    icon: '🐍',
    category: 'topic',
  },
  {
    id: 'python_master',
    title: 'Python Master',
    description: 'Complete all 14 topics in the Python roadmap and earn your certificate.',
    icon: '👑',
    category: 'special',
  },
  {
    id: 'problem_solver',
    title: 'Problem Solver',
    description: 'Solve 5 practice programming problems.',
    icon: '🎯',
    category: 'problem',
  },
  {
    id: 'streak_3',
    title: '3-Day Streak',
    description: 'Maintain a learning streak for 3 consecutive days.',
    icon: '🔥',
    category: 'streak',
  },
  {
    id: 'streak_7',
    title: '7-Day Champion',
    description: 'Maintain a learning streak for 7 consecutive days.',
    icon: '⚡',
    category: 'streak',
  },
  {
    id: 'ai_explorer',
    title: 'AI Learner',
    description: 'Ask a question to the AI Mentor for learning guidance.',
    icon: '🤖',
    category: 'special',
  },
];
