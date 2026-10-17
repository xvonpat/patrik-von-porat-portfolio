import { NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/workbench/auth';
import { WORKBENCH_DEFAULT_CONFIG } from '@/lib/workbench/styleConfig';

export async function GET(req) {
  const { authorized, payload, error } = await verifyAdminAuth(req);
  if (!authorized) {
    return NextResponse.json({ error: error || 'Unauthorized' }, { status: 401 });
  }

  // Fetch real categories from Payload CMS
  let categories = [];
  try {
    const categoriesResult = await payload.find({
      collection: 'categories',
      limit: 50,
      sort: 'createdAt',
    });
    categories = categoriesResult.docs.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      accent: cat.accent,
      description: cat.description,
    }));
  } catch (err) {
    console.warn('[Workbench Config] Could not load categories from db, using fallbacks:', err?.message);
    categories = [
      { id: 'music', name: 'Music', slug: 'music', accent: 'purple', description: 'Guitars, releases, and audio production' },
      { id: 'visual-art', name: 'Visual Art', slug: 'visual-art', accent: 'purple', description: 'Graphite drawing and tattoo studies' },
      { id: 'making', name: 'Making', slug: 'making', accent: 'purple', description: 'Resin 3D printing and physical crafting' },
      { id: 'technology', name: 'Technology', slug: 'technology', accent: 'cyan', description: 'Web systems and digital tooling' },
      { id: 'process', name: 'Process', slug: 'process', accent: 'cyan', description: 'Lean Six Sigma and systems thinking' },
      { id: 'personal', name: 'Personal', slug: 'personal', accent: 'purple', description: 'Reflections and behind the scenes' },
    ];
  }

  const isApiKeyConfigured = Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim() !== '');

  return NextResponse.json({
    status: 'ok',
    isApiKeyConfigured,
    requiredEnvVar: 'OPENAI_API_KEY',
    activeModel: process.env.OPENAI_MODEL || WORKBENCH_DEFAULT_CONFIG.defaultModel,
    startingRules: WORKBENCH_DEFAULT_CONFIG.startingRules,
    projectKnowledge: WORKBENCH_DEFAULT_CONFIG.projectKnowledge,
    fewShotExamples: WORKBENCH_DEFAULT_CONFIG.fewShotExamples,
    categories,
  });
}
