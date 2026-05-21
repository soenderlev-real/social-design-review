import { BaseProvider } from './base';

export class OpenAIProvider extends BaseProvider {
  supportsVision = true;

  getName() { return 'OpenAI (GPT-4)'; }
  validateKey() { return this.apiKey.startsWith('sk-') && this.apiKey.length > 20; }

  async sendMessage(systemPrompt, userPrompt, images = []) {
    // Build content array — text first, then images
    const content = [{ type: 'text', text: userPrompt }];

    for (const img of images) {
      content.push({
        type:      'image_url',
        image_url: { url: `data:${img.mediaType};base64,${img.base64}` },
      });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model:      this.config.model || 'gpt-4o',
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
