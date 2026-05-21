import { AnthropicProvider } from './anthropic';
import { OpenAIProvider } from './openai';
import { MistralProvider } from './mistral';
import { GroqProvider } from './groq';
import { TogetherProvider } from './together';
import { OllamaProvider } from './ollama';

export const PROVIDERS = [
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

  return new providerDef.constructor(apiKey, config);
}
