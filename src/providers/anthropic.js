import { BaseProvider } from './base';

export class AnthropicProvider extends BaseProvider {
  supportsVision = true;

  getName() { return 'Anthropic (Claude)'; }
  validateKey() { return this.apiKey.startsWith('sk-ant-'); }

  async sendMessage(systemPrompt, userPrompt, images = []) {
    // Build content array — text first, then images
    const content = [{ type: 'text', text: userPrompt }];

    for (const img of images) {
      content.push({
        type: 'image',
        source: {
          type:       'base64',
          media_type: img.mediaType,
          data:       img.base64,
        },
      });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':                          'application/json',
        'x-api-key':                             this.apiKey,
        'anthropic-version':                     '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model:      this.config.model || 'claude-sonnet-4-6',
        max_tokens: 2000,
        system:     systemPrompt,
        messages:   [{ role: 'user', content }],
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    return data.content?.[0]?.text || '';
  }
}
