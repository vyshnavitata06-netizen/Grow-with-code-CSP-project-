import { LanguageId, RoadmapTopic } from '../types';
import { PYTHON_ROADMAP } from './pythonRoadmap';
import { OTHER_ROADMAPS } from './otherRoadmaps';

export function getRoadmapByLanguage(lang: LanguageId): RoadmapTopic[] {
  if (lang === 'python') {
    return PYTHON_ROADMAP;
  }
  return OTHER_ROADMAPS[lang] || [];
}

export function getAllTopics(): RoadmapTopic[] {
  const all: RoadmapTopic[] = [...PYTHON_ROADMAP];
  Object.values(OTHER_ROADMAPS).forEach((list) => {
    all.push(...list);
  });
  return all;
}

export function getTopicById(topicId: string): RoadmapTopic | undefined {
  return getAllTopics().find((t) => t.id === topicId);
}
