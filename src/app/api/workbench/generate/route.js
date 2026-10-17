import { NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/workbench/auth';
import { WORKBENCH_DEFAULT_CONFIG } from '@/lib/workbench/styleConfig';
import { parseResponsesApiResponse, logWorkbenchDiagnostics } from '@/lib/workbench/responsesParser';

export const maxDuration = 60;

const MAX_CLARIFICATION_LENGTH = 2000;

export async function POST(req) {
  // 1. Independent authentication & authorization check
  const { authorized, error } = await verifyAdminAuth(req);
  if (!authorized) {
    return NextResponse.json({ error: error || 'Unauthorized' }, { status: 401 });
  }

  // 2. Server-side API key check
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    return NextResponse.json(
      {
        error: 'MISSING_API_KEY',
        message: 'OpenAI API key is missing. Please add OPENAI_API_KEY to your server environment (.env).',
        requiredEnvVar: 'OPENAI_API_KEY',
      },
      { status: 503 }
    );
  }

  // 3. Request parsing & input validation
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON request body.' }, { status: 400 });
  }

  const {
    suggestion,
    note = '',
    image = null,
    userClarification = '',
    customInstructions = '',
  } = body;

  if (!suggestion || typeof suggestion !== 'object' || !suggestion.title) {
    return NextResponse.json(
      { error: 'A valid selected suggestion object is required to generate a draft.' },
      { status: 400 }
    );
  }

  const cleanClarification = typeof userClarification === 'string'
    ? userClarification.trim().slice(0, MAX_CLARIFICATION_LENGTH)
    : '';

  const hasImage = typeof image === 'string' && image.startsWith('data:image/');

  const instructions = `${WORKBENCH_DEFAULT_CONFIG.systemPrompt}

WRITING STYLE RULES:
${WORKBENCH_DEFAULT_CONFIG.startingRules.map((r, i) => `${i + 1}. ${r}`).join('\n')}

FEW-SHOT EXAMPLES OF GOOD POSTS ON VONPORAT.COM:
${WORKBENCH_DEFAULT_CONFIG.fewShotExamples
  .map(
    (ex, i) => `Example ${i + 1} (${ex.category}): "${ex.title}"
Excerpt: ${ex.excerpt}
Sample Body:
${ex.bodySample}`
  )
  .join('\n\n')}

${customInstructions ? `USER SESSION DIRECTIVES:\n${customInstructions.slice(0, 1000)}\n` : ''}

Generate a complete, publishable draft adhering strictly to the json_schema.
The content should be 3-6 paragraphs of substantial, authentic, first-person craft writing.
Use natural paragraph breaks and optional ## subheadings where helpful.
Do not use marketing superlatives. Ground the text in the observed realities and next steps.`;

  let promptText = `Please write the full content draft based on this selected suggestion:
TITLE: ${suggestion.title}
FORMAT: ${suggestion.format}
ANGLE: ${suggestion.angle}
CATEGORY: ${suggestion.suggestedCategory}
TAGS: ${(suggestion.suggestedTags || []).join(', ')}

SOURCE NOTE FROM PATRIK:
"${note || 'Visual work in progress.'}"
`;

  if (cleanClarification) {
    promptText += `\nADDITIONAL CONTEXT / CLARIFICATION FROM PATRIK:\n"${cleanClarification}"\n`;
  }

  promptText += `\nDraft the complete text in English. Ensure the tone is calm, personal, and focuses on what was done, what was noticed, and what comes next.`;

  const contentBlocks = [
    {
      type: 'input_text',
      text: promptText,
    },
  ];

  if (hasImage) {
    contentBlocks.push({
      type: 'input_image',
      image_url: image,
    });
  }

  const model = process.env.OPENAI_MODEL || WORKBENCH_DEFAULT_CONFIG.defaultModel;

  const requestPayload = {
    model,
    instructions,
    input: [
      {
        role: 'user',
        content: contentBlocks,
      },
    ],
    text: {
      format: {
        type: 'json_schema',
        name: 'workbench_draft',
        strict: true,
        schema: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Refined, polished title for the post or update.',
            },
            excerpt: {
              type: 'string',
              description: 'A concise 1-2 sentence lead summary (around 120-150 characters).',
            },
            contentMarkdown: {
              type: 'string',
              description: 'The full draft body in markdown format with clear paragraphs and optional ## headings.',
            },
            suggestedCategory: {
              type: 'string',
              description: 'Canonical category name: Music, Visual Art, Making, Technology, Process, or Personal.',
            },
            tags: {
              type: 'array',
              items: { type: 'string' },
              description: 'Relevant tags.',
            },
            seoTitle: {
              type: 'string',
              description: 'SEO Title (max 60 chars).',
            },
            metaDescription: {
              type: 'string',
              description: 'Meta Description (max 160 chars).',
            },
            formatAdvice: {
              type: 'string',
              description: 'Actionable note on how to use this draft if used outside the blog.',
            },
          },
          required: [
            'title',
            'excerpt',
            'contentMarkdown',
            'suggestedCategory',
            'tags',
            'seoTitle',
            'metaDescription',
            'formatAdvice',
          ],
          additionalProperties: false,
        },
      },
    },
  };

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestPayload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[Workbench Generate] OpenAI API error:', response.status, errText);
      let errMsg = `OpenAI API returned status ${response.status}`;
      try {
        const errJson = JSON.parse(errText);
        if (errJson?.error?.message) {
          errMsg = errJson.error.message;
        }
      } catch {
        // use raw text
      }
      return NextResponse.json(
        { error: `Draft generation failed: ${errMsg}` },
        { status: response.status >= 500 ? 502 : 400 }
      );
    }

    const resData = await response.json();

    const parsedResult = parseResponsesApiResponse(resData, {
      httpStatus: response.status,
      httpHeaders: response.headers,
    });

    logWorkbenchDiagnostics('generate', {
      httpStatus: response.status,
      responseStatus: parsedResult.status,
      requestId: parsedResult.requestId,
      outputItemTypes: parsedResult.outputItemTypes,
      incompleteReason: parsedResult.incompleteReason,
      hasError: !parsedResult.success,
      errorMessage: parsedResult.error,
    });

    if (!parsedResult.success) {
      return NextResponse.json(
        { error: parsedResult.error || 'AI returned an empty or invalid draft.' },
        { status: 502 }
      );
    }

    let parsed;
    try {
      parsed = JSON.parse(parsedResult.text);
    } catch {
      return NextResponse.json(
        { error: 'Malformed AI response: Output could not be parsed as valid JSON.' },
        { status: 502 }
      );
    }

    // Strict validation of draft output to prevent creating an invalid post
    if (!parsed?.title || typeof parsed.title !== 'string' || !parsed.title.trim()) {
      return NextResponse.json(
        { error: 'AI draft validation failed: Generated title is missing or empty.' },
        { status: 502 }
      );
    }

    if (!parsed?.contentMarkdown || typeof parsed.contentMarkdown !== 'string' || parsed.contentMarkdown.trim().length < 30) {
      return NextResponse.json(
        { error: 'AI draft validation failed: Generated draft content is too short or empty.' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      status: 'ok',
      draft: {
        title: parsed.title.trim(),
        excerpt: typeof parsed.excerpt === 'string' ? parsed.excerpt.trim() : '',
        contentMarkdown: parsed.contentMarkdown.trim(),
        suggestedCategory: parsed.suggestedCategory || suggestion.suggestedCategory || 'Making',
        tags: Array.isArray(parsed.tags) ? parsed.tags.filter((t) => typeof t === 'string') : (suggestion.suggestedTags || []),
        seoTitle: parsed.seoTitle?.trim() || parsed.title.trim(),
        metaDescription: parsed.metaDescription?.trim() || parsed.excerpt?.trim() || '',
        formatAdvice: typeof parsed.formatAdvice === 'string' ? parsed.formatAdvice.trim() : '',
      },
    });
  } catch (err) {
    console.error('[Workbench Generate] Internal error:', err);
    return NextResponse.json(
      { error: err?.message || 'An unexpected error occurred while generating the draft.' },
      { status: 500 }
    );
  }
}
