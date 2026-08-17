import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

async function callGeminiRestAPI(apiKey: string, prompt: string) {
  const cleanKey = apiKey.trim().replace(/^["']|["']$/g, '');
  const modelsToTry = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro', 'gemini-1.0-pro'];

  for (const modelName of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${cleanKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      }
    } catch (e) {
      // Continue to next model
    }
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const { job, candidateProfile, userApiKey } = await req.json();

    if (!job) {
      return NextResponse.json({ error: 'Missing job details' }, { status: 400 });
    }

    const apiKey = userApiKey || process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const skills = candidateProfile?.skills || [
      'AI-powered applications', 'AI APIs', 'Prompt Engineering', 'AI Agent Development', 'AI product integration',
      'Frontend Development', 'Backend Development', 'APIs', 'Database Integration', 'Authentication', 'Next.js', 'React',
      'Antigravity', 'GitHub', 'Vercel', 'Render', 'zen.ai', 'ChatGPT', 'Gemini', 'Automation'
    ];
    const candidateYears = candidateProfile?.experienceYears || 1;
    const candidateRole = candidateProfile?.targetRole || 'AI FULL-STACK WEB DEVELOPER';

    if (apiKey) {
      const prompt = `You are an expert AI Career Coach. Evaluate job fit:

CANDIDATE:
- Role: ${candidateRole}
- Skills: ${skills.join(', ')}
- Experience: ${candidateYears} year

JOB:
- Title: ${job.title}
- Company: ${job.company}
- Requirements: ${job.description || ''}

Return strict JSON format ONLY:
{
  "fitScore": 85,
  "shortlistProbability": 70,
  "pros": ["✓ Verified skill match: Next.js"],
  "cons": ["⚠ High competition"],
  "customCoverLetter": "Dear Hiring Manager...",
  "applicationQA": [{ "q": "Why join?", "a": "My background in..." }]
}`;

      // Direct REST API call
      const restResponseText = await callGeminiRestAPI(apiKey, prompt);
      if (restResponseText) {
        try {
          const cleanJson = restResponseText.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanJson);
          return NextResponse.json(parsed);
        } catch (e) {
          // Fall through
        }
      }

      // SDK Fallback
      const cleanKey = apiKey.trim().replace(/^["']|["']$/g, '');
      const genAI = new GoogleGenerativeAI(cleanKey);
      const candidateModels = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro'];

      for (const modelName of candidateModels) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName });
          const result = await model.generateContent(prompt);
          const respText = result.response.text();
          const cleanJson = respText.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanJson);
          return NextResponse.json(parsed);
        } catch (err: any) {
          // Suppress
        }
      }
    }

    // Server-side fallback calculation
    const descLower = (job.description || '').toLowerCase();
    const titleLower = (job.title || '').toLowerCase();

    let requiredYears = 1;
    if (descLower.includes('5+') || descLower.includes('5 years')) requiredYears = 5;
    else if (descLower.includes('3+') || descLower.includes('3 years')) requiredYears = 3;

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
      cons.push(`❌ Experience Gap: Job requires ${requiredYears}+ years, candidate has ${candidateYears} year (-${gap * 15}% penalty)`);
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
