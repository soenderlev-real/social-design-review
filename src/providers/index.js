import { AnthropicProvider } from './anthropic';
import { OpenAIProvider } from './openai';
import { GeminiProvider } from './gemini';
import { MistralProvider } from './mistral';
import { HostedMistralProvider } from './hostedMistral';
import { GroqProvider } from './groq';
import { TogetherProvider } from './together';
import { LLMBaseProvider } from './llmbase';
import { OllamaProvider } from './ollama';

export const PROVIDERS = [
  {
    id: 'hosted-mistral',
    name: 'Free for Rebuild Helsinki (Mistral Large)',
    description: 'No API key needed · EU-hosted · shared key, fair-use limited',
    category: 'hosted',
    supportsVision: true,
    hostedKey: true,          // key lives server-side; the UI hides the key field
    keyPlaceholder: null,
    constructor: HostedMistralProvider,
    docs: 'https://mistral.ai',
  },
  {
    id: 'anthropic',
    name: 'Anthropic (Claude)',
    description: 'Claude Sonnet 4 - excellent for analysis',
    category: 'cloud',
    supportsVision: true,
    keyPlaceholder: 'sk-ant-...',
    constructor: AnthropicProvider,
    docs: 'https://console.anthropic.com',
  },
  {
    id: 'openai',
    name: 'OpenAI (GPT-4)',
    description: 'GPT-4o - very capable, widely used',
    category: 'cloud',
    supportsVision: true,
    keyPlaceholder: 'sk-...',
    constructor: OpenAIProvider,
    docs: 'https://platform.openai.com/api-keys',
  },
  {
    id: 'gemini',
    name: 'Google (Gemini)',
    description: 'Gemini 2.5 Pro - strong multimodal reasoning',
    category: 'cloud',
    supportsVision: true,
    keyPlaceholder: 'AIza...',
    constructor: GeminiProvider,
    docs: 'https://aistudio.google.com/apikey',
  },
  {
    id: 'mistral',
    name: 'Mistral AI',
    description: 'European alternative · vision via Pixtral',
    category: 'cloud',
    supportsVision: true,
    keyPlaceholder: 'your-mistral-key',
    constructor: MistralProvider,
    docs: 'https://console.mistral.ai',
  },
  {
    id: 'together',
    name: 'Together.ai',
    description: 'Open-source models, low cost',
    category: 'cloud',
    supportsVision: false,
    keyPlaceholder: 'your-together-key',
    constructor: TogetherProvider,
    docs: 'https://www.together.ai',
  },
  {
    id: 'llmbase',
    name: 'LLMBase',
    description: 'EU-hosted, GDPR-compliant · 40+ models incl. GPT, Claude, Gemini',
    category: 'cloud',
    supportsVision: true,
    keyPlaceholder: 'your-llmbase-key',
    constructor: LLMBaseProvider,
    docs: 'https://llmbase.ai/docs/inference/chat-completions/',
  },
  {
    id: 'ollama',
    name: 'Ollama (Local)',
    description: 'Run models locally - free, private, no API key',
    category: 'local',
    supportsVision: true,
    keyPlaceholder: 'http://localhost:11434',
    constructor: OllamaProvider,
    docs: 'https://ollama.ai',
    isLocal: true,
  },
];

export function getProviderById(id) {
  return PROVIDERS.find(p => p.id === id);
}

export function createProvider(id, apiKey, config = {}) {
  const providerDef = getProviderById(id);
  if (!providerDef) throw new Error(`Unknown provider: ${id}`);

  // Special handling for Ollama
  if (id === 'ollama') {
    const endpoint = config.endpoint || apiKey; // for Ollama, apiKey is actually the endpoint
    const modelName = config.modelName || 'mistral';
    return new OllamaProvider(endpoint, modelName, config);
  }

  // Hosted providers carry no user key — the server holds it
  if (providerDef.hostedKey) return new providerDef.constructor(null, config);

  return new providerDef.constructor(apiKey, config);
}
