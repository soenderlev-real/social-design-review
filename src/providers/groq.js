import { BaseProvider, buildApiError, streamChatCompletions } from './base';

export class GroqProvider extends BaseProvider {
  getName() {
    return 'Groq (Ultra-fast)';
  }

  validateKey() {
    return this.apiKey.length > 10;
  }

  async sendMessage(systemPrompt, userPrompt) {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.config.model || 'mixtral-8x7b-32768',
        max_tokens: 2000,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      throw await buildApiError(response);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '';
    return text;
  }

  async sendMessageStream(systemPrompt, userPrompt, images = [], onChunk) {
    return streamChatCompletions({
      url: 'https://api.groq.com/openai/v1/chat/completions',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: {model: this.config.model || 'mixtral-8x7b-32768',
        max_tokens: 2000,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],},
      onChunk,
    });
  }
}
