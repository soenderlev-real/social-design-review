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
