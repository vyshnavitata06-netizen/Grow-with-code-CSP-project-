'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserProgress, LanguageId, Badge } from '../types';
import { ALL_BADGES } from '../data/badges';
import { getRoadmapByLanguage } from '../data/roadmaps';
import confetti from 'canvas-confetti';

interface AuthContextType {
  user: UserProfile | null;
  progress: UserProgress;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  login: (name: string, email: string) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
  completeOnboarding: (goal: string, experienceLevel: string, dailyGoalMinutes: number) => void;
  markTopicCompleted: (topicId: string, language: LanguageId) => void;
  markProblemSolved: (problemId: string, language: LanguageId, points: number) => void;
  setActiveLanguage: (language: LanguageId) => void;
  badges: Badge[];
}

const DEFAULT_USER: UserProfile = {
  id: 'usr_guest_101',
  name: 'Alex Learner',
  email: 'alex@growwithcode.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  joinedDate: 'September 2026',
  goal: 'Learn Python & Build AI Projects',
  experienceLevel: 'Beginner',
  dailyGoalMinutes: 30,
  currentStreak: 3,
  lastActiveDate: new Date().toISOString(),
  points: 120,
};

const DEFAULT_PROGRESS: UserProgress = {
  completedTopicIds: ['python-1', 'python-2'],
  solvedProblemIds: ['py-prob-1', 'py-prob-2'],
  activeLanguage: 'python',
  languageProgress: {
    python: 14, // %
    javascript: 0,
    c: 0,
    cpp: 0,
    java: 0,
    html: 0,
    css: 0,
    sql: 0,
  },
  studyMinutesToday: 25,
  unlockedBadges: ['first_step', 'streak_3'],
  earnedCertificates: [],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('gwc_user');
      const savedProgress = localStorage.getItem('gwc_progress');
      const savedOnboarded = localStorage.getItem('gwc_onboarded');

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(DEFAULT_USER);
      }

      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      } else {
        setProgress(DEFAULT_PROGRESS);
      }

      if (savedOnboarded !== null) {
        setIsOnboarded(JSON.parse(savedOnboarded));
      } else {
        setIsOnboarded(true);
      }
    } catch (e) {
      console.error('Failed to load storage:', e);
      setUser(DEFAULT_USER);
      setProgress(DEFAULT_PROGRESS);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    if (user) {
      localStorage.setItem('gwc_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('gwc_user');
    }
    localStorage.setItem('gwc_progress', JSON.stringify(progress));
    localStorage.setItem('gwc_onboarded', JSON.stringify(isOnboarded));
  }, [user, progress, isOnboarded, isLoaded]);

  const login = (name: string, email: string) => {
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: name || 'Code Explorer',
      email: email || 'user@example.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      joinedDate: 'September 2026',
      goal: 'Learn Programming',
      experienceLevel: 'Beginner',
      dailyGoalMinutes: 30,
      currentStreak: 1,
      lastActiveDate: new Date().toISOString(),
      points: 50,
    };
    setUser(newUser);
  };

  const signup = (name: string, email: string) => {
    login(name, email);
    setIsOnboarded(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  const completeOnboarding = (goal: string, experienceLevel: string, dailyGoalMinutes: number) => {
    if (user) {
      setUser({
        ...user,
        goal,
        experienceLevel,
        dailyGoalMinutes,
      });
    }
    setIsOnboarded(true);
  };

  const recalculateProgress = (completedIds: string[], lang: LanguageId): number => {
    const roadmap = getRoadmapByLanguage(lang);
    if (!roadmap.length) return 0;
    const completedCount = roadmap.filter((t) => completedIds.includes(t.id)).length;
    return Math.round((completedCount / roadmap.length) * 100);
  };

  const checkCertificateAward = (updatedProgress: UserProgress, lang: LanguageId) => {
    const roadmap = getRoadmapByLanguage(lang);
    if (!roadmap.length) return;

    const completedAll = roadmap.every((t) => updatedProgress.completedTopicIds.includes(t.id));
    const alreadyHasCert = updatedProgress.earnedCertificates.some((c) => c.language === lang);

    if (completedAll && !alreadyHasCert) {
      // Award certificate!
      const newCert = {
        language: lang,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        certificateId: `GWC-${lang.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
      };

      updatedProgress.earnedCertificates.push(newCert);

      // Trigger celebrate confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch (e) {}
    }
  };

  const markTopicCompleted = (topicId: string, language: LanguageId) => {
    if (progress.completedTopicIds.includes(topicId)) return;

    const newCompleted = [...progress.completedTopicIds, topicId];
    const newLangPct = recalculateProgress(newCompleted, language);

    // Check badges
    const updatedBadges = [...progress.unlockedBadges];
    if (!updatedBadges.includes('first_step')) updatedBadges.push('first_step');

    if (language === 'python') {
      const pythonTopicsCompleted = newCompleted.filter((id) => id.startsWith('python-')).length;
      if (pythonTopicsCompleted >= 3 && !updatedBadges.includes('python_novice')) {
        updatedBadges.push('python_novice');
      }
      if (pythonTopicsCompleted >= 14 && !updatedBadges.includes('python_master')) {
        updatedBadges.push('python_master');
      }
    }

    const updatedProgress: UserProgress = {
      ...progress,
      completedTopicIds: newCompleted,
      languageProgress: {
        ...progress.languageProgress,
        [language]: newLangPct,
      },
      unlockedBadges: updatedBadges,
    };

    checkCertificateAward(updatedProgress, language);
    setProgress(updatedProgress);

    if (user) {
      setUser({
        ...user,
        points: user.points + 20,
      });
    }
  };

  const markProblemSolved = (problemId: string, language: LanguageId, points: number) => {
    if (progress.solvedProblemIds.includes(problemId)) return;

    const newSolved = [...progress.solvedProblemIds, problemId];
    const updatedBadges = [...progress.unlockedBadges];

    if (newSolved.length >= 5 && !updatedBadges.includes('problem_solver')) {
      updatedBadges.push('problem_solver');
    }

    const updatedProgress: UserProgress = {
      ...progress,
      solvedProblemIds: newSolved,
      unlockedBadges: updatedBadges,
    };

    setProgress(updatedProgress);

    if (user) {
      setUser({
        ...user,
        points: user.points + points,
      });
    }

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch (e) {}
  };

  const setActiveLanguage = (language: LanguageId) => {
    setProgress((prev) => ({
      ...prev,
      activeLanguage: language,
    }));
  };

  const badges = ALL_BADGES.map((b) => ({
    ...b,
    unlockedAt: progress.unlockedBadges.includes(b.id) ? 'Unlocked' : undefined,
  }));

  return (
    <AuthContext.Provider
      value={{
        user,
        progress,
        isAuthenticated: !!user,
        isOnboarded,
        login,
        signup,
        logout,
        completeOnboarding,
        markTopicCompleted,
        markProblemSolved,
        setActiveLanguage,
        badges,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
