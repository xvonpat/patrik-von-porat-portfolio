import { NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/workbench/auth';
import { WORKBENCH_DEFAULT_CONFIG, buildWorkbenchPromptInstructions } from '@/lib/workbench/styleConfig';
import { parseResponsesApiResponse, logWorkbenchDiagnostics } from '@/lib/workbench/responsesParser';
import { resolveWorkbenchImages } from '@/lib/workbench/imageHelper';

export const maxDuration = 60;

const MAX_CLARIFICATION_LENGTH = 2000;

export async function POST(req) {
  // 1. Independent authentication & authorization check
  const { authorized, error } = await verifyAdminAuth(req);
  if (!authorized) {
    return NextResponse.json({ error: error || 'Unauthorized' }, { status: 401 });
  }

  // 2. Server-side API key check
  const apiKey = process.env.OPENAI_API_KEY || process.env.openai_api_key;
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
    images = [],
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

  const resolvedImages = await resolveWorkbenchImages(images, image, 6);

  const instructions = buildWorkbenchPromptInstructions({
    mode: 'generate',
    customInstructions,
    suggestionFormat: suggestion.format,
  });

  let promptText = `Please write the full content draft based on this selected suggestion:
TITLE: ${suggestion.title}
TARGET FORMAT: ${suggestion.format || 'Blog Post'}
ANGLE: ${suggestion.angle}
CATEGORY: ${suggestion.suggestedCategory}
TAGS: ${(suggestion.suggestedTags || []).join(', ')}

SOURCE MATERIAL (OBSERVATIONS / THOUGHTS FROM PATRIK):
"${note || 'Visual work in progress.'}"
`;

  if (cleanClarification) {
    promptText += `\nADDITIONAL AUTHOR CLARIFICATION:\n"${cleanClarification}"\n`;
  }

  promptText += `\nDraft the complete text in English strictly following the Voice Preservation Principle:
"When rewriting rough notes, improve clarity and readability without replacing the author's original thoughts, personality, or perspective. The goal is to make the author easier to understand, not to make them sound like someone else."

Ensure the tone is calm, personal, and grounded. Focus on what was done, what was noticed/learned, and what comes next.
Include platform-adapted captions for Instagram and X in the socialCaptions field without marketing hype, and note any critical clarification question in clarificationQuestion if essential facts are missing.`;

  const contentBlocks = [
    {
      type: 'input_text',
      text: promptText,
    },
  ];

  for (const img of resolvedImages) {
    contentBlocks.push({
      type: 'input_image',
      image_url: img.openAiUrl,
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
              description: 'Natural, clear title for the post or update.',
            },
            excerpt: {
              type: 'string',
              description: 'A concise 1-2 sentence lead summary (around 120-150 characters).',
            },
            contentMarkdown: {
              type: 'string',
              description: 'The full draft body in markdown format with clear paragraphs and optional ## headings. Let the source material determine length and structure.',
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
              description: 'Actionable note on format, length, or how to use this draft.',
            },
            socialCaptions: {
              type: 'object',
              description: 'Platform-adapted captions preserving the same voice and facts without marketing hype.',
              properties: {
                instagram: {
                  type: 'string',
                  description: 'Conversational caption for Instagram focused on the visual work with minimal tags and no promotional hype.',
                },
                x: {
                  type: 'string',
                  description: 'Short, direct post for X focusing on one clear observation or learning (within 280 characters).',
                },
              },
              required: ['instagram', 'x'],
              additionalProperties: false,
            },
            clarificationQuestion: {
              type: 'string',
              description: 'If essential information was missing that materially affects accuracy, a single focused follow-up question. Otherwise an empty string.',
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
            'socialCaptions',
            'clarificationQuestion',
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
