import { BaseProvider, buildApiError } from './base';

/**
 * Mistral via this deployment's own /api/mistral proxy — no API key required
 * from the user. The key lives in a server environment variable; nothing
 * key-shaped is ever present in the browser.
 *
 * Errors are built with buildApiError so a 429 from the shared key carries its
 * status and retry hint into the existing withRetry backoff, exactly as a
 * bring-your-own-key provider does.
 */
export class HostedMistralProvider extends BaseProvider {
  supportsVision = true;

  getName() { return 'Mistral (hosted)'; }
  validateKey() { return true; } // no key to validate

  async sendMessage(systemPrompt, userPrompt, images = []) {
    const response = await fetch('/api/mistral', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemPrompt,
        userPrompt,
        images: images.map(i => ({ base64: i.base64, mediaType: i.mediaType })),
      }),
    });

    if (!response.ok) {
      throw await buildApiError(response);
    }

    const data = await response.json();
    return data.text || '';
  }
}
