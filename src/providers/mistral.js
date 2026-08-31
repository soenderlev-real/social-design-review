import { BaseProvider, buildApiError } from './base';

export class MistralProvider extends BaseProvider {
  supportsVision = true; // via Pixtral models

  getName() { return 'Mistral AI'; }
  validateKey() { return this.apiKey.length > 10; }

  async sendMessage(systemPrompt, userPrompt, images = []) {
    // Large, not Medium: Mistral Large 3 is $0.50/$1.50 per 1M tokens against
    // Medium 3.5's $1.50/$7.50 — five times cheaper on output, and the stronger
    // model. Matches the models the hosted proxy uses.
    const model = images.length > 0
      ? (this.config.model || 'pixtral-large-latest')
      : (this.config.model || 'mistral-large-latest');

    // Build content array — same format as OpenAI
    const content = images.length > 0
      ? [
          { type: 'text', text: userPrompt },
          ...images.map(img => ({
            type: 'image_url',
            image_url: { url: `data:${img.mediaType};base64,${img.base64}` },
          })),
        ]
      : userPrompt;

    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model,
        max_tokens: 2000,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user',   content },
        ],
      }),
    });

    if (!response.ok) {
      throw await buildApiError(response);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  }
}
