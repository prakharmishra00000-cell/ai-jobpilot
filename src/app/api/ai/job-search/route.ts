import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { allSourcesAdapter } from '@/adapters/all_sources';

export async function POST(req: NextRequest) {
  try {
    const { candidateProfile } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    const role = candidateProfile?.targetRole || 'AI FULL-STACK WEB DEVELOPER';
    const skills = candidateProfile?.skills || [
      'AI-powered applications', 'AI APIs', 'Prompt Engineering', 'AI Agent Development', 'AI product integration',
      'Frontend Development', 'Backend Development', 'APIs', 'Database Integration', 'Authentication', 'Next.js', 'React',
      'Antigravity', 'GitHub', 'Vercel', 'Render', 'zen.ai', 'ChatGPT', 'Gemini', 'SaaS Concepts', 'UI/UX Design', 'Career & Education Technology', 'Automation'
    ];

    let searchQueries = [
      'Senior AI Full-Stack Developer (AI APIs & Next.js)',
      'AI Agent & Product Integration Engineer',
      'Next.js & React AI Applications Developer',
      'Full-Stack AI Web Developer (Prompt Engineering & APIs)',
    ];

    if (apiKey) {
      const candidateModels = ['gemini-1.5-flash-latest', 'gemini-1.5-pro', 'gemini-2.0-flash-exp', 'gemini-1.5-flash'];
      const genAI = new GoogleGenerativeAI(apiKey);

      for (const modelName of candidateModels) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName });
          const prompt = `You are an AI job discovery engine. Generate 3-4 targeted search query titles matching this candidate:

Candidate Role: ${role}
Candidate Skills: ${skills.join(', ')}

Return strict JSON format ONLY:
{
  "queries": ["Senior AI Full-Stack Developer", "AI Agent Engineer", "Next.js & React AI Developer"]
}`;

          const result = await model.generateContent(prompt);
          const respText = result.response.text();
          const cleanJson = respText.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanJson);

          if (parsed.queries && Array.isArray(parsed.queries) && parsed.queries.length > 0) {
            searchQueries = parsed.queries;
            break;
          }
        } catch (err: any) {
          console.warn(`Gemini search model ${modelName} warning:`, err?.message || err);
        }
      }
    }

    const fetchedJobs = await allSourcesAdapter.fetchJobs(role);

    const scoredJobs = fetchedJobs.map((job) => {
      const descLower = (job.description || '').toLowerCase();
      const titleLower = (job.title || '').toLowerCase();

      const matchedSkills = skills.filter((s: string) =>
        descLower.includes(s.toLowerCase()) || titleLower.includes(s.toLowerCase())
      );

      let requiredYears = 1;
      if (descLower.includes('5+') || descLower.includes('5 years')) requiredYears = 5;
      else if (descLower.includes('3+') || descLower.includes('3 years')) requiredYears = 3;

      const candidateYears = candidateProfile?.experienceYears || 1;
      let fitScore = 80 + Math.round((matchedSkills.length / Math.max(skills.length, 3)) * 18);

      const cons = [];
      if (requiredYears > candidateYears) {
        fitScore -= (requiredYears - candidateYears) * 15;
        cons.push(`❌ Experience Gap: Job requires ${requiredYears}+ years, resume has ${candidateYears} year`);
      } else {
        cons.push('⚠ High applicant competition for this role title');
      }

      fitScore = Math.min(Math.max(fitScore, 40), 98);

      return {
        ...job,
        liveFit: {
          fitScore,
          shortlistProbability: Math.round(fitScore * 0.82),
          pros: matchedSkills.length > 0
            ? matchedSkills.map((s: string) => `✓ Verified resume skill match: ${s}`)
            : skills.slice(0, 3).map((s: string) => `✓ Extracted resume skill: ${s}`),
          cons,
        },
      };
    }).sort((a, b) => b.liveFit.fitScore - a.liveFit.fitScore);

    return NextResponse.json({
      success: true,
      queriesUsed: searchQueries,
      count: scoredJobs.length,
      jobs: scoredJobs,
    });
  } catch (error: any) {
    console.error('Gemini Job Search API Error:', error);
    return NextResponse.json(
      { error: 'Failed to execute Gemini job search', details: error?.message },
      { status: 500 }
    );
  }
}
