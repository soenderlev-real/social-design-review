import { BaseProvider } from './base';

export class MistralProvider extends BaseProvider {
  supportsVision = true; // via Pixtral models

  getName() { return 'Mistral AI'; }
  validateKey() { return this.apiKey.length > 10; }

  async sendMessage(systemPrompt, userPrompt, images = []) {
    // Use Pixtral when images are present, otherwise standard text model
    const model = images.length > 0
      ? (this.config.model || 'pixtral-12b-2409')
      : (this.config.model || 'mistral-medium');

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
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  }
}
