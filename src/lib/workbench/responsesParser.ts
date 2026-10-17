// Robust parser and extractor for OpenAI Responses API (/v1/responses) responses

export interface ExtractedResponse {
  success: boolean;
  text: string;
  error?: string;
  refusal?: string;
  status: string;
  requestId: string;
  outputItemTypes: string[];
  incompleteReason?: string;
}

export interface ParseOptions {
  httpStatus?: number;
  httpHeaders?: Headers | Record<string, string>;
}

/**
 * Parses raw JSON returned by OpenAI Responses API (POST /v1/responses).
 * Correctly navigates the output array where messages are wrapped in:
 * resData.output[i].content[j].text (where type === 'output_text')
 *
 * Also handles:
 * - Top-level response statuses (completed, incomplete, failed, cancelled)
 * - Model refusals (type === 'refusal')
 * - Incomplete responses (e.g. max_output_tokens)
 * - Multiple content parts
 * - Backward-compatible fallbacks (output_text shortcut or flat output blocks)
 */
export function parseResponsesApiResponse(
  resData: any,
  options?: ParseOptions
): ExtractedResponse {
  const httpStatus = options?.httpStatus || 200;
  let requestId = (typeof resData?.id === 'string' ? resData.id : '') || '';

  if (!requestId && options?.httpHeaders) {
    if (typeof (options.httpHeaders as Headers).get === 'function') {
      requestId = (options.httpHeaders as Headers).get('x-request-id') || '';
    } else if (typeof options.httpHeaders === 'object') {
      requestId = (options.httpHeaders as Record<string, string>)['x-request-id'] || '';
    }
  }

  const responseStatus = typeof resData?.status === 'string' ? resData.status : 'unknown';
  const outputItemTypes: string[] = [];

  // 1. Check if OpenAI explicitly returned a failed status
  if (responseStatus === 'failed') {
    const errorMsg = resData?.error?.message || 'OpenAI Responses API reported a failed request status.';
    return {
      success: false,
      text: '',
      error: errorMsg,
      status: responseStatus,
      requestId,
      outputItemTypes,
    };
  }

  // 2. Check if OpenAI reported an incomplete generation
  let incompleteReason: string | undefined;
  if (responseStatus === 'incomplete') {
    incompleteReason = resData?.incomplete_details?.reason || 'Unknown incomplete reason';
  }

  // 3. Extract text and check for refusals across output items
  let extractedText = '';
  let refusalMessage = '';

  if (Array.isArray(resData?.output)) {
    for (const item of resData.output) {
      if (!item || typeof item !== 'object') continue;

      const itemType = item.type || 'unknown';
      outputItemTypes.push(itemType);

      // Check item-level refusal
      if (typeof item.refusal === 'string' && item.refusal.trim()) {
        refusalMessage = item.refusal.trim();
      }

      // Standard Responses API: item is a message with a content array
      if (Array.isArray(item.content)) {
        for (const part of item.content) {
          if (!part || typeof part !== 'object') continue;

          if (part.type === 'output_text' && typeof part.text === 'string') {
            extractedText += part.text;
          } else if (part.type === 'refusal' && typeof part.refusal === 'string') {
            refusalMessage = part.refusal.trim();
          } else if (typeof part.text === 'string') {
            extractedText += part.text;
          }
        }
      }

      // Fallback: direct text property on the output item itself
      if (typeof item.text === 'string' && !extractedText) {
        extractedText += item.text;
      }
    }
  }

  // Fallback: SDK-style top-level output_text property
  if (!extractedText && typeof resData?.output_text === 'string') {
    extractedText = resData.output_text;
  }

  // Fallback: Check if message.content exists at root (legacy completion compatibility)
  if (!extractedText && Array.isArray(resData?.choices)) {
    const choice = resData.choices[0];
    if (typeof choice?.message?.content === 'string') {
      extractedText = choice.message.content;
    }
  }

  // 4. Handle refusal
  if (refusalMessage) {
    return {
      success: false,
      text: '',
      refusal: refusalMessage,
      error: `Model declined to answer: ${refusalMessage}`,
      status: responseStatus,
      requestId,
      outputItemTypes,
    };
  }

  // 5. Handle incomplete response if text is empty or cut off
  if (responseStatus === 'incomplete' && !extractedText.trim()) {
    return {
      success: false,
      text: '',
      error: `AI response was incomplete (${incompleteReason || 'max output tokens reached'}).`,
      status: responseStatus,
      requestId,
      outputItemTypes,
      incompleteReason,
    };
  }

  // 6. Handle empty text output
  if (!extractedText.trim()) {
    return {
      success: false,
      text: '',
      error: 'AI returned an empty response. The model did not produce output text.',
      status: responseStatus,
      requestId,
      outputItemTypes,
      incompleteReason,
    };
  }

  return {
    success: true,
    text: extractedText,
    status: responseStatus,
    requestId,
    outputItemTypes,
    incompleteReason,
  };
}

/**
 * Minimal server-side diagnostics logger.
 * STRICT PRIVACY: Logs ONLY httpStatus, responseStatus, requestId, and outputItemTypes.
 * Never logs credentials, photos, user notes, or generated content.
 */
export function logWorkbenchDiagnostics(
  endpointName: string,
  info: {
    httpStatus: number;
    responseStatus: string;
    requestId: string;
    outputItemTypes: string[];
    incompleteReason?: string;
    hasError?: boolean;
    errorMessage?: string;
  }
) {
  const parts = [
    `[Workbench AI: ${endpointName}]`,
    `HTTP ${info.httpStatus}`,
    `status: ${info.responseStatus}`,
    `reqId: ${info.requestId || 'n/a'}`,
    `outputTypes: [${info.outputItemTypes.join(', ')}]`,
  ];

  if (info.incompleteReason) {
    parts.push(`incompleteReason: ${info.incompleteReason}`);
  }

  if (info.hasError) {
    parts.push(`error: ${info.errorMessage || 'unknown'}`);
    console.warn(parts.join(' | '));
  } else {
    console.log(parts.join(' | '));
  }
}
