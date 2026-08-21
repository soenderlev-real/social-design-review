import { BaseProvider } from './base';

export class LLMBaseProvider extends BaseProvider {
  supportsVision = true; // via vision-capable models in the LLMBase catalog

  getName() { return 'LLMBase'; }
  validateKey() { return this.apiKey.length > 10; }

  async sendMessage(systemPrompt, userPrompt, images = []) {
    // Switch to a vision-capable model from the catalog when images are attached
    const model = images.length > 0
      ? (this.config.model || 'qwen/qwen3-vl-30b-a3b-instruct')
      : (this.config.model || 'moonshotai/kimi-k3');

    const content = images.length > 0
      ? [
          { type: 'text', text: userPrompt },
          ...images.map(img => ({
            type: 'image_url',
            image_url: { url: `data:${img.mediaType};base64,${img.base64}` },
          })),
        ]
      : userPrompt;

    const response = await fetch('https://api.llmbase.ai/v1/chat/completions', {
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
