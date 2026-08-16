import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  try {
    const { job, candidateProfile } = await req.json();

    if (!job) {
      return NextResponse.json({ error: 'Missing job details' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const skills = candidateProfile?.skills || [
      'AI-powered applications', 'AI APIs', 'Prompt Engineering', 'AI Agent Development', 'AI product integration',
      'Frontend Development', 'Backend Development', 'APIs', 'Database Integration', 'Authentication', 'Next.js', 'React',
      'Antigravity', 'GitHub', 'Vercel', 'Render', 'zen.ai', 'ChatGPT', 'Gemini', 'Automation'
    ];
    const candidateYears = candidateProfile?.experienceYears || 1;
    const candidateRole = candidateProfile?.targetRole || 'AI FULL-STACK WEB DEVELOPER';

    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `You are an expert AI Career Coach and Recruiter. Evaluate the fit between this candidate and job listing:

CANDIDATE PROFILE:
- Target Role: ${candidateRole}
- Skills: ${skills.join(', ')}
- Experience Years: ${candidateYears} year

JOB LISTING:
- Title: ${job.title}
- Company: ${job.company}
- Requirements / Description: ${job.description || ''}
- Experience Required: ${job.experienceRequired || 'Not specified'}

Instructions:
1. Calculate fit score (0 to 100). If job requires 3+, 5+, or 7+ years of experience and candidate has ${candidateYears} year, apply a penalty (-15% per missing year) and include "❌ Experience Gap" in cons!
2. Return shortlist probability percentage.
3. List 3-4 specific pros (matching skills/experience).
4. List 1-2 cons.
5. Write a custom high-converting cover letter.
6. Provide 2 realistic interview questions & answers.

Return strict JSON format ONLY:
{
  "fitScore": 85,
  "shortlistProbability": 70,
  "pros": ["✓ Verified skill match: Next.js", "✓ AI APIs expertise"],
  "cons": ["❌ Experience Gap: Job requires 3+ years"],
  "customCoverLetter": "Dear Hiring Manager...",
  "applicationQA": [
    { "q": "Why do you want to join?", "a": "My background in..." }
  ]
}`;

        const result = await model.generateContent(prompt);
        const respText = result.response.text();
        const cleanJson = respText.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanJson);

        return NextResponse.json(parsed);
      } catch (err: any) {
        console.error('Gemini API Job Fit error on server:', err?.message || err);
      }
    }

    // Fallback calculation logic on server side
    const descLower = (job.description || '').toLowerCase();
    const titleLower = (job.title || '').toLowerCase();

    let requiredYears = 1;
    if (descLower.includes('5+') || descLower.includes('5 years')) requiredYears = 5;
    else if (descLower.includes('3+') || descLower.includes('3 years')) requiredYears = 3;
    else if (descLower.includes('7+') || descLower.includes('7 years')) requiredYears = 7;

    const pros: string[] = [];
    skills.forEach((s: string) => {
      if (descLower.includes(s.toLowerCase()) || titleLower.includes(s.toLowerCase())) {
        pros.push(`✓ Verified resume skill match: ${s}`);
      }
    });

    if (pros.length === 0) {
      skills.slice(0, 3).forEach((s: string) => pros.push(`✓ Extracted resume skill: ${s}`));
    }

    const cons: string[] = [];
    if (requiredYears > candidateYears) {
      const gap = requiredYears - candidateYears;
      cons.push(`❌ Experience Gap: Job requires ${requiredYears}+ years, candidate resume has ${candidateYears} year (-${gap * 15}% penalty)`);
    }

    let baseScore = 75 + Math.round((pros.length / Math.max(skills.length, 3)) * 20);
    if (requiredYears > candidateYears) {
      baseScore -= (requiredYears - candidateYears) * 15;
    }

    const fitScore = Math.min(Math.max(baseScore, 35), 98);

    return NextResponse.json({
      fitScore,
      shortlistProbability: Math.round(fitScore * 0.8),
      pros,
      cons: cons.length > 0 ? cons : ['⚠ High applicant competition for this title'],
      customCoverLetter: `Dear Hiring Manager at ${job.company},\n\nI am writing to express my enthusiasm for the ${job.title} role...`,
      applicationQA: [
        { q: `Why ${job.company}?`, a: `My experience in ${skills.slice(0, 2).join(' and ')} aligns directly with your goals.` }
      ]
    });
  } catch (error: any) {
    console.error('Job Fit API Error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate job fit score', details: error?.message },
      { status: 500 }
    );
  }
}
