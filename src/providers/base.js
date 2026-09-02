/**
 * Base provider interface for LLM analysis.
 * All providers implement this same interface.
 */
export class BaseProvider {
  constructor(apiKey, config = {}) {
    this.apiKey = apiKey;
    this.config = config;
  }

  /**
   * Send a message to the LLM and get a response.
   * @param {string} systemPrompt - System instructions
   * @param {string} userPrompt - User message
   * @returns {Promise<string>} - The LLM response text
   */
  async sendMessage(systemPrompt, userPrompt) {
    throw new Error('sendMessage() must be implemented by subclass');
  }

  /**
   * Stream a reply, calling onChunk with each new piece of text as it arrives.
   * Resolves with the complete text.
   *
   * The default implementation does not stream — it waits for the whole reply
   * and emits it once. That keeps every provider working: a provider that has
   * not implemented streaming still behaves exactly as it did before, just
   * without the incremental rendering.
   *
   * @param {string} systemPrompt
   * @param {string} userPrompt
   * @param {Array}  images
   * @param {(chunk: string) => void} onChunk
   * @returns {Promise<string>}
   */
  async sendMessageStream(systemPrompt, userPrompt, images = [], onChunk) {
    const text = await this.sendMessage(systemPrompt, userPrompt, images);
    if (text) onChunk?.(text);
    return text;
  }

  /**
   * Validate that the API key is correctly formatted (sanity check).
   * @returns {boolean}
   */
  validateKey() {
    throw new Error('validateKey() must be implemented by subclass');
  }

  /**
   * Get a human-friendly name for the provider.
   */
  getName() {
    throw new Error('getName() must be implemented by subclass');
  }
}

/**
 * Build an Error from a failed API response, preserving what the caller needs
 * to decide whether to retry.
 *
 * Providers throw bare Errors, which loses the status code — so a 429 (wait and
 * retry) became indistinguishable from a 401 (never retry). This attaches:
 *   .status        HTTP status
 *   .retryAfterMs  how long the server asked us to wait, when it says so
 *
 * OpenAI and Mistral put the wait in the message text ("Please try again in
 * 5.572s") rather than only in a Retry-After header, so both are parsed.
 */
export async function buildApiError(response, fallbackMessage) {
  const body = await response.json().catch(() => ({}));
  const message =
    body.error?.message || body.message || fallbackMessage || `API error: ${response.status}`;

  const err = new Error(message);
  err.status = response.status;

  let waitMs = null;

  const header = response.headers?.get?.('retry-after');
  if (header) {
    const seconds = parseFloat(header);
    if (Number.isFinite(seconds)) waitMs = seconds * 1000;
  }

  if (waitMs === null) {
    const m = message.match(/try again in\s+([\d.]+)\s*(ms|s|m)\b/i);
    if (m) {
      const n = parseFloat(m[1]);
      const unit = m[2].toLowerCase();
      waitMs = unit === 'ms' ? n : unit === 'm' ? n * 60000 : n * 1000;
    }
  }

  err.retryAfterMs = waitMs;
  return err;
}

/**
 * Parse analysis response text into structured sections.
 * Handles multiple formatting styles across different LLM providers.
 */
export function parseAnalysisResponse(text) {
  const sections = {};
  let score = null;

  // Try to extract score — handle many formats:
  // "### Score: 4", "**Score: 4/5**", "Score: 4", "SCORE: 4", "score 4 out of 5", "4/5"
  const scorePatterns = [
    /(?:###|##|#)?\s*\*{0,2}score\*{0,2}[:\s]+(\d)/i,   // ### Score: 4 or **Score:** 4
    /\bscore[:\s]+(\d)\s*(?:\/\s*5|out of 5)?/i,        // score: 4/5 or score 4 out of 5
    /\brating[:\s]+(\d)\s*(?:\/\s*5)?/i,                // rating: 3/5
    /\b(\d)\s*\/\s*5\b/,                                 // bare 4/5
  ];

  for (const pattern of scorePatterns) {
    const m = text.match(pattern);
    if (m) {
      const n = parseInt(m[1], 10);
      if (n >= 1 && n <= 5) { score = n; break; }
    }
  }

  // Default if nothing matched
  if (score === null) score = 3;

  // Split by any heading style: ###, ##, **, or ALLCAPS lines
  // Normalise to a consistent split token first
  const normalised = text
    .replace(/^#{1,4}\s+/gm, '__SECTION__ ')    // ### Heading -> __SECTION__ Heading
    .replace(/^\*{1,2}(.+?)\*{1,2}\s*$/gm, '__SECTION__ $1')  // **Heading** -> __SECTION__ Heading
    .replace(/^([A-Z][A-Z\s&]{4,}):?\s*$/gm, '__SECTION__ $1'); // ALLCAPS HEADING -> __SECTION__

  const parts = normalised.split('__SECTION__');

  for (const part of parts) {
    if (!part.trim()) continue;
    const lines = part.split('\n');
    const header = lines[0].replace(/[:#*]/g, '').trim().toLowerCase();
    const body = lines.slice(1).join('\n').trim();
    if (!body) continue;

    if (header.includes('strength') || header.includes('positive') || header.includes('what') && header.includes('good')) {
      sections.strengths = body;
    } else if (header.includes('assessment') || header.includes('overview') || header.includes('analysis')) {
      sections.assessment = body;
    } else if (header.includes('dark pattern') || header.includes('antipattern') || header.includes('concerns')) {
      sections.darkPatterns = body;
    } else if (header.includes('interface') || header.includes('ui pattern') || header.includes('ui note')) {
      sections.interfacePatterns = body;
    } else if (header.includes('recommendation') || header.includes('suggestion') || header.includes('improvement')) {
      sections.recommendations = body;
    } else if (header.includes('european') || header.includes('europe') || header.includes('perspective')) {
      sections.europeanPerspective = body;
    }
    // score lines are intentionally skipped — already extracted above
  }

  // Last resort: if no sections matched at all, treat the whole text as the assessment
  if (!sections.assessment && text.length > 50) {
    sections.assessment = text;
  }

  return { ...sections, score, raw: text };
}

/**
 * Parse a design-mode response into structured sections.
 * Sections: Design Considerations / Suggestions / Watch Out For / European Perspective
 */
export function parseDesignResponse(text) {
  const sections = {};

  const normalised = text
    .replace(/^#{1,4}\s+/gm, '__SECTION__ ')
    .replace(/^\*{1,2}(.+?)\*{1,2}\s*$/gm, '__SECTION__ $1')
    .replace(/^([A-Z][A-Z\s&]{4,}):?\s*$/gm, '__SECTION__ $1');

  const parts = normalised.split('__SECTION__');

  for (const part of parts) {
    if (!part.trim()) continue;
    const lines = part.split('\n');
    const header = lines[0].replace(/[:#*]/g, '').trim().toLowerCase();
    const body = lines.slice(1).join('\n').trim();
    if (!body) continue;

    if (header.includes('design consideration') || (header.includes('consideration') && !header.includes('watch'))) {
      sections.considerations = body;
    } else if (header.includes('interface') || header.includes('ui pattern')) {
      sections.interfacePatterns = body;
    } else if (header.includes('suggestion') || header.includes('recommendation') || header.includes('approach')) {
      sections.suggestions = body;
    } else if (header.includes('watch out') || header.includes('pitfall') || header.includes('avoid') || header.includes('dark pattern')) {
      sections.watchOutFor = body;
    } else if (header.includes('european') || header.includes('europe') || header.includes('perspective')) {
      sections.europeanPerspective = body;
    }
  }

  if (!sections.considerations && !sections.suggestions && text.length > 50) {
    sections.suggestions = text;
  }

  return { ...sections, raw: text };
}

/**
 * Read a Server-Sent Events body, handing each `data:` payload to onEvent.
 *
 * Chunk boundaries do not respect line boundaries, so a partial line is carried
 * over to the next read rather than being parsed as JSON and thrown away —
 * getting this wrong drops tokens silently in the middle of a sentence.
 */
export async function readSSE(response, onEvent) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';   // keep the trailing partial line

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('data:')) continue;
      const payload = trimmed.slice(5).trim();
      if (!payload || payload === '[DONE]') continue;
      try {
        onEvent(JSON.parse(payload));
      } catch {
        // A malformed frame is not worth killing the stream over.
      }
    }
  }
}

/**
 * Streaming for any OpenAI-compatible /chat/completions endpoint —
 * OpenAI, Mistral, Groq, Together and LLMBase all share this wire format.
 */
export async function streamChatCompletions({ url, headers, body, onChunk }) {
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...body, stream: true }),
  });

  if (!response.ok) throw await buildApiError(response);

  let full = '';
  await readSSE(response, evt => {
    const piece = evt.choices?.[0]?.delta?.content;
    if (piece) { full += piece; onChunk?.(piece); }
  });
  return full;
}
