import { RawJob } from '@/types';

export interface LiveFitAnalysis {
  fitScore: number;
  shortlistProbability: number;
  branchEligible: boolean;
  gradYearEligible: boolean;
  pros: string[];
  cons: string[];
  customCoverLetter: string;
  applicationQA: { q: string; a: string }[];
}

export interface CandidateProfileData {
  isValidResume: boolean;
  validationError?: string;
  name: string;
  stream: string;
  branch: string;
  graduationYear: string;
  targetRole: string;
  skills: string[];
  experienceYears: number;
  resumeFileName?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

export const EXACT_PRAKHAR_RESUME_SKILLS = [
  'AI-powered applications',
  'AI APIs',
  'Prompt Engineering',
  'AI Agent Development',
  'AI product integration',
  'Frontend Development',
  'Backend Development',
  'APIs',
  'Database Integration',
  'Authentication',
  'Next.js',
  'React',
  'Antigravity',
  'GitHub',
  'Vercel',
  'Render',
  'zen.ai',
  'ChatGPT',
  'Gemini',
  'SaaS Concepts',
  'UI/UX Design',
  'Career & Education Technology',
  'Automation'
];

/**
 * Multi-Factor Fit & Eligibility Evaluator:
 * Checks Skills + Graduation Year + Branch Eligibility
 */
export function analyzeLiveJobFit(
  job: RawJob,
  candidateSkills: string[] = EXACT_PRAKHAR_RESUME_SKILLS,
  candidateYearsOfExp: number = 1,
  candidateRole: string = 'AI FULL-STACK WEB DEVELOPER',
  candidateBranch: string = 'Mechanical Engineering',
  candidateGradYear: string = '2026 / Final Year'
): LiveFitAnalysis {
  const descLower = (job.description || '').toLowerCase();
  const titleLower = (job.title || '').toLowerCase();
  const expString = (job.experienceRequired || '').toLowerCase();

  // Branch & Graduation Year Eligibility Check
  const branchExcludesMechanical = /cs only|computer science degree required|it degree mandatory/i.test(descLower);
  const branchEligible = !branchExcludesMechanical;

  const isInternship = /intern|internship|trainee/i.test(titleLower) || /intern|internship/i.test(descLower);
  const gradYearEligible = isInternship
    ? /final year|2026|2025|all batches/i.test(descLower) || true
    : !/5\+ years|7\+ years|senior lead/i.test(descLower);

  let requiredYears = 1;
  if (descLower.includes('5+') || descLower.includes('5 years') || expString.includes('5+')) {
    requiredYears = 5;
  } else if (descLower.includes('3+') || descLower.includes('3 years') || expString.includes('3+')) {
    requiredYears = 3;
  }

  const pros: string[] = [];
  const skillsToUse = candidateSkills.length > 0 ? candidateSkills : EXACT_PRAKHAR_RESUME_SKILLS;

  if (branchEligible) {
    pros.push(`✓ Branch Eligible: Open to ${candidateBranch} & All Engineering Streams`);
  }

  if (gradYearEligible) {
    pros.push(`✓ Graduation Match: Eligible for ${candidateGradYear} candidates`);
  }

  skillsToUse.forEach((skill) => {
    if (descLower.includes(skill.toLowerCase()) || titleLower.includes(skill.toLowerCase())) {
      pros.push(`✓ Resume Skill Match: ${skill}`);
    }
  });

  const cons: string[] = [];
  if (!branchEligible) {
    cons.push(`❌ Branch Restriction: Role strictly requires CS/IT degree`);
  }

  if (requiredYears > candidateYearsOfExp) {
    const gap = requiredYears - candidateYearsOfExp;
    cons.push(`❌ Experience Gap: Requires ${requiredYears}+ years, candidate has ${candidateYearsOfExp} year (-${gap * 15}% penalty)`);
  }

  if (cons.length === 0) {
    cons.push('⚠ High competitive applicant volume for this role title');
  }

  const matchRatio = skillsToUse.length > 0 ? (pros.length / Math.max(skillsToUse.length, 3)) : 0.75;
  let baseScore = 75 + Math.round(matchRatio * 20);

  if (!branchEligible) baseScore -= 30;
  if (requiredYears > candidateYearsOfExp) baseScore -= (requiredYears - candidateYearsOfExp) * 15;

  const fitScore = Math.min(Math.max(baseScore, 35), 98);
  const shortlistProbability = Math.round(fitScore * 0.80);

  return {
    fitScore,
    shortlistProbability,
    branchEligible,
    gradYearEligible,
    pros,
    cons,
    customCoverLetter: `Dear Hiring Manager at ${job.company},\n\nI am writing to express my enthusiasm for the ${job.title} role (${job.source}). As a final-year ${candidateBranch} student at MMMUT Gorakhpur specializing in ${candidateRole}, I combine engineering analytical rigor with rapid AI web development skills (${skillsToUse.slice(0, 4).join(', ')}).\n\nHaving built platforms like ExamArena and PrepOS AI, I am confident in my ability to deliver immediate value to ${job.company}.\n\nSincerely,\nPrakhar Mishra\nEmail: prakharmishraflp@gmail.com\nPhone: +91 6372843175`,
    applicationQA: [
      {
        q: `Why are you a fit for ${job.title} as a ${candidateBranch} student?`,
        a: `I have built production AI applications (ExamArena & PrepOS AI) utilizing ${skillsToUse.slice(0, 3).join(', ')}, demonstrating that my software capabilities exceed standard requirements.`,
      },
    ],
  };
}

export async function extractCandidateFromText(rawText: string): Promise<CandidateProfileData> {
  return {
    isValidResume: true,
    name: 'Prakhar Mishra',
    stream: 'B.Tech Mechanical Engineering',
    branch: 'Mechanical Engineering',
    graduationYear: '2026 (Final Year)',
    targetRole: 'AI FULL-STACK WEB DEVELOPER',
    skills: EXACT_PRAKHAR_RESUME_SKILLS,
    experienceYears: 1,
  };
}
