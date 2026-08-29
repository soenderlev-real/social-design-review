import { BaseProvider, buildApiError } from './base';

export class GeminiProvider extends BaseProvider {
  supportsVision = true;

  getName() { return 'Google (Gemini)'; }
  validateKey() { return this.apiKey.startsWith('AIza') && this.apiKey.length > 20; }

  async sendMessage(systemPrompt, userPrompt, images = []) {
    const model = this.config.model || 'gemini-2.5-pro';

    const parts = [{ text: userPrompt }];
    for (const img of images) {
      parts.push({
        inline_data: { mime_type: img.mediaType, data: img.base64 },
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: [{ role: 'user', parts }],
          generationConfig: { maxOutputTokens: 2000 },
        }),
      }
    );

    if (!response.ok) {
      throw await buildApiError(response);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }
}
