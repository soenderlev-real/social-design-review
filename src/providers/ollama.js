import { BaseProvider } from './base';

export class OllamaProvider extends BaseProvider {
  // Vision depends on the chosen model (LLaVA, bakllava, etc.)
  // We optimistically pass images and let Ollama handle it gracefully.
  supportsVision = true;

  constructor(endpoint, modelName, config = {}) {
    super('', config);
    this.endpoint  = endpoint  || 'http://localhost:11434';
    this.modelName = modelName || 'mistral';
  }

  getName()     { return `Ollama (${this.modelName})`; }
  validateKey() { return !!this.modelName && !!this.endpoint; }

  async sendMessage(systemPrompt, userPrompt, images = []) {
    const message = { role: 'user', content: userPrompt };

    // Ollama vision: pass raw base64 strings in the `images` array
    if (images.length > 0) {
      message.images = images.map(img => img.base64);
    }

    const response = await fetch(`${this.endpoint}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model:    this.modelName,
        messages: [
          { role: 'system', content: systemPrompt },
          message,
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(
        err.error?.message ||
        `Ollama error: ${response.status}. Is Ollama running at ${this.endpoint}?`
      );
    }

    const data = await response.json();
    return data.message?.content || '';
  }

  async testConnection() {
    try {
      const response = await fetch(`${this.endpoint}/api/tags`, {
        signal: AbortSignal.timeout(5000),
      });
      if (!response.ok) return { ok: false, error: 'Ollama endpoint not responding' };
      const data = await response.json();
      return { ok: true, models: data.models || [] };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }
}
