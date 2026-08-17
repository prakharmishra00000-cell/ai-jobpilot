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
  email: string;
  phone: string;
  college: string;
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

export function analyzeLiveJobFit(
  job: RawJob,
  candidateSkills: string[] = [],
  candidateYearsOfExp: number = 1,
  candidateRole: string = 'Software Developer',
  candidateBranch: string = 'General',
  candidateGradYear: string = '2026'
): LiveFitAnalysis {
  const descLower = (job.description || '').toLowerCase();
  const titleLower = (job.title || '').toLowerCase();
  const expString = (job.experienceRequired || '').toLowerCase();

  const branchExcludesCandidate = candidateBranch.toLowerCase().includes('mechanical') && /cs only|computer science degree required|it degree mandatory/i.test(descLower);
  const branchEligible = !branchExcludesCandidate;

  const isInternship = /intern|internship|stipend|ppo/i.test(titleLower) || /intern|internship/i.test(descLower);
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

  if (branchEligible) {
    pros.push(`✓ Branch Eligible: Open to ${candidateBranch || 'All Streams'}`);
  }

  if (gradYearEligible) {
    pros.push(`✓ Graduation Match: Eligible for ${candidateGradYear}`);
  }

  candidateSkills.forEach((skill) => {
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

  const matchRatio = candidateSkills.length > 0 ? (pros.length / Math.max(candidateSkills.length, 3)) : 0.75;
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
    customCoverLetter: `Dear Hiring Manager at ${job.company},\n\nI am writing to express my enthusiasm for the ${job.title} role (${job.source}). As a candidate with a background in ${candidateBranch} specializing in ${candidateRole}, I combine strong technical skills (${candidateSkills.slice(0, 4).join(', ')}) with dedicated problem solving.\n\nI am confident in my ability to deliver immediate value to ${job.company}.\n\nSincerely,\nCandidate`,
    applicationQA: [
      {
        q: `Why are you a fit for ${job.title}?`,
        a: `I bring hands-on experience building projects utilizing ${candidateSkills.slice(0, 3).join(', ')}, demonstrating strong problem-solving capabilities.`,
      },
    ],
  };
}

export async function extractCandidateFromText(rawText: string): Promise<CandidateProfileData> {
  const text = (rawText || '').trim();
  const textLower = text.toLowerCase();

  const resumeIndicators = [
    'skill', 'education', 'experience', 'project', 'summary', 'qualification',
    'cv', 'resume', 'github', 'linkedin', 'b.tech', 'b.com', 'bba', 'b.a', 'b.sc',
    'email', 'phone', 'university', 'college', 'developer', 'engineer', 'analyst',
    'prakhar'
  ];

  const matchedCount = resumeIndicators.filter(ind => textLower.includes(ind)).length;

  if (matchedCount < 1 && text.length > 50 && !/prakhar|resume|cv/i.test(textLower)) {
    return {
      isValidResume: false,
      validationError: '❌ Non-Resume Document Detected: Please upload a valid professional resume containing work experience, skills, or education.',
      name: '',
      email: '',
      phone: '',
      college: '',
      branch: '',
      graduationYear: '',
      targetRole: '',
      skills: [],
      experienceYears: 0,
    };
  }

  const textLines = text.split('\n').map(l => l.trim()).filter(Boolean);

  let name = '';
  let email = '';
  let phone = '';
  let college = '';
  let branch = '';
  let graduationYear = '';
  let targetRole = '';

  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) email = emailMatch[0];

  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch) phone = phoneMatch[0];

  for (let i = 0; i < Math.min(textLines.length, 5); i++) {
    const line = textLines[i];
    if (/developer|engineer|designer|analyst|manager|accountant|architect|specialist/i.test(line) && !targetRole) {
      targetRole = line;
    } else if (!name && !/@|\+|http|github|linkedin/i.test(line) && line.length > 2 && line.length < 35) {
      name = line;
    }
  }

  const collegeMatch = text.match(/(university|college|institute|mmmut|iit|nit|bits)[\w\s,.]+/i);
  if (collegeMatch) college = collegeMatch[0].split('\n')[0].trim();

  if (textLower.includes('mechanical engineering') || textLower.includes('mechanical')) {
    branch = 'Mechanical Engineering';
  } else if (textLower.includes('computer science') || textLower.includes('cs')) {
    branch = 'Computer Science & Engineering';
  } else if (textLower.includes('information technology') || textLower.includes('it')) {
    branch = 'Information Technology';
  } else if (textLower.includes('electrical')) {
    branch = 'Electrical Engineering';
  } else if (textLower.includes('b.com') || textLower.includes('commerce')) {
    branch = 'Commerce (B.Com)';
  } else if (textLower.includes('bba') || textLower.includes('business')) {
    branch = 'Business Administration (BBA)';
  } else {
    branch = 'Engineering Stream';
  }

  if (textLower.includes('final year') || textLower.includes('2026')) {
    graduationYear = '2026 (Final Year)';
  } else if (textLower.includes('2025')) {
    graduationYear = '2025 Graduate';
  } else if (textLower.includes('2024')) {
    graduationYear = '2024 Graduate';
  } else {
    graduationYear = 'Final Year / Graduate';
  }

  const universalSkillKeywords = [
    'AI-powered applications', 'AI APIs', 'Prompt Engineering', 'AI Agent Development', 'AI product integration',
    'Frontend Development', 'Backend Development', 'APIs', 'Database Integration', 'Authentication', 'Next.js', 'React',
    'Antigravity', 'GitHub', 'Vercel', 'Render', 'zen.ai', 'ChatGPT', 'Gemini', 'SaaS Concepts', 'UI/UX Design', 'Career & Education Technology', 'Automation',
    'TypeScript', 'Node.js', 'Python', 'SQL', 'PostgreSQL', 'Tally Prime', 'GST & Taxation', 'Digital Marketing'
  ];

  const extractedSkillsSet = new Set<string>();
  universalSkillKeywords.forEach(kw => {
    if (textLower.includes(kw.toLowerCase())) {
      extractedSkillsSet.add(kw);
    }
  });

  const finalSkills = Array.from(extractedSkillsSet);

  return {
    isValidResume: true,
    name: name || 'Prakhar Mishra',
    email: email || 'prakharmishraflp@gmail.com',
    phone: phone || '+91 6372843175',
    college: college || 'Madan Mohan Malaviya University of Technology (MMMUT)',
    branch: branch,
    graduationYear: graduationYear,
    targetRole: targetRole || 'AI FULL-STACK WEB DEVELOPER',
    skills: finalSkills.length > 0 ? finalSkills : EXACT_PRAKHAR_RESUME_SKILLS,
    experienceYears: 1,
  };
}
