import { BaseProvider } from './base';

export class TogetherProvider extends BaseProvider {
  supportsVision = false; // Together text-only; images are skipped, PDF text is included

  getName() {
    return 'Together.ai (Open models)';
  }

  validateKey() {
    return this.apiKey.length > 10;
  }

  async sendMessage(systemPrompt, userPrompt) {
    const response = await fetch('https://api.together.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.config.model || 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo',
        max_tokens: 2000,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '';
    return text;
  }
}
