export const AI_EXPERIENCE_START_YEAR = 2020;

export const RESEARCH_AREAS = [
  'Medical Imaging AI',
  'Healthcare AI',
  'Computer Vision',
  'Clinical Large Language Models (LLMs)',
  'Multimodal Learning',
  'Clinical Decision Support',
  'Trustworthy AI'
];

export function getYearsAiExperience(fromYear = AI_EXPERIENCE_START_YEAR) {
  return Math.max(0, new Date().getFullYear() - fromYear);
}
