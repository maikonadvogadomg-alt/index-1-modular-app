// ─────────────────────────────────────────
// CONFIGURAÇÃO DOS PROVEDORES
// ─────────────────────────────────────────
const PROVEDORES = {
  monica: {
    nome: 'Monica',
    baseURL: 'https://api.monica.im/v1',
    tipo: 'openai',
    modelos: [
      { id: 'gpt-4o',              nome: 'GPT-4o (Monica)',        visao: true  },
      { id: 'gpt-4o-mini',         nome: 'GPT-4o Mini (Monica)',   visao: true  },
      { id: 'claude-3-5-sonnet',   nome: 'Claude 3.5 Sonnet',      visao: true  },
      { id: 'claude-3-5-haiku',    nome: 'Claude 3.5 Haiku',       visao: true  },
      { id: 'gemini-1.5-pro',      nome: 'Gemini 1.5 Pro',         visao: true  },
      { id: 'gemini-2.0-flash',    nome: 'Gemini 2.0 Flash',       visao: true  },
      { id: 'gemini-2.5-flash',    nome: 'Gemini 2.5 Flash',       visao: true  },
      { id: 'deepseek-v3',         nome: 'DeepSeek V3',            visao: false },
      { id: 'deepseek-r1',         nome: 'DeepSeek R1',            visao: false },
      { id: 'o1-mini',             nome: 'O1 Mini',                visao: false },
      { id: 'o3-mini',             nome: 'O3 Mini',                visao: false },
    ]
  },
  openai: {
    nome: 'OpenAI',
    baseURL: 'https://api.openai.com/v1',
    tipo: 'openai',
    modelos: [
      { id: 'gpt-4o',              nome: 'GPT-4o',                 visao: true  },
      { id: 'gpt-4o-mini',         nome: 'GPT-4o Mini',            visao: true  },
      { id: 'gpt-4-turbo',         nome: 'GPT-4 Turbo',            visao: true  },
      { id: 'o1-mini',             nome: 'O1 Mini',                visao: false },
      { id: 'o3-mini',             nome: 'O3 Mini',                visao: false },
    ]
  },
  gemini: {
    nome: 'Google Gemini',
    baseURL: 'https://generativelanguage.googleapis.com/v1beta',
    tipo: 'gemini',
    modelos: [
      { id: 'gemini-2.5-flash-preview-05-20', nome: 'Gemini 2.5 Flash', visao: true },
      { id: 'gemini-2.0-flash',               nome: 'Gemini 2.0 Flash', visao: true },
      { id: 'gemini-1.5-pro',                 nome: 'Gemini 1.5 Pro',   visao: true },
      { id: 'gemini-1.5-flash',               nome: 'Gemini 1.5 Flash', visao: true },
    ]
  },
  claude: {
    nome: 'Anthropic Claude',
    baseURL: 'https://api.anthropic.com/v1',
    tipo: 'claude',
    modelos: [
      { id: 'claude-opus-4-5',          nome: 'Claude Opus 4.5',        visao: true  },
      { id: 'claude-sonnet-4-5',        nome: 'Claude Sonnet 4.5',      visao: true  },
      { id: 'claude-haiku-3-5',         nome: 'Claude Haiku 3.5',       visao: true  },
      { id: 'claude-3-5-sonnet-20241022', nome: 'Claude 3.5 Sonnet',    visao: true  },
      { id: 'claude-3-5-haiku-20241022',  nome: 'Claude 3.5 Haiku',     visao: true  },
    ]
  },
  ollama: {
    nome: 'Ollama (local)',
    baseURL: 'http://localhost:11434',
    tipo: 'ollama',
    modelos: [] // carregados dinamicamente
  },
  groq: {
    nome: 'Groq',
    baseURL: 'https://api.groq.com/openai/v1',
    tipo: 'openai',
    modelos: [
      { id: 'llama-3.3-70b-versatile',  nome: 'Llama 3.3 70B',          visao: false },
      { id: 'llama-3.1-8b-instant',     nome: 'Llama 3.1 8B Instant',   visao: false },
      { id: 'mixtral-8x7b-32768',       nome: 'Mixtral 8x7B',           visao: false },
      { id: 'gemma2-9b-it',             nome: 'Gemma 2 9B',             visao: false },
    ]
  },
  deepseek: {
    nome: 'DeepSeek',
    baseURL: 'https://api.deepseek.com/v1',
    tipo: 'openai',
    modelos: [
      { id: 'deepseek-chat',   nome: 'DeepSeek Chat',    visao: false },
      { id: 'deepseek-reasoner', nome: 'DeepSeek R1',    visao: false },
    ]
  },
  openrouter: {
    nome: 'OpenRouter',
    baseURL: 'https://openrouter.ai/api/v1',
    tipo: 'openai',
    modelos: [
      { id: 'anthropic/claude-3.5-sonnet',       nome: 'Claude 3.5 Sonnet',   visao: true  },
      { id: 'google/gemini-2.0-flash-exp:free',  nome: 'Gemini 2.0 Flash',    visao: true  },
      { id: 'meta-llama/llama-3.3-70b-instruct', nome: 'Llama 3.3 70B',       visao: false },
      { id: 'deepseek/deepseek-r1',              nome: 'DeepSeek R1',          visao: false },
      { id: 'mistralai/mistral-nemo:free',       nome: 'Mistral Nemo (free)',  visao: false },
    ]
  }
};

// Estado global das chaves
const CHAVES = {
  openai:      '',
  gemini:      '',
  claude:      '',
  ollama:      'http://localhost:11434',
  groq:        '',
  deepseek:    '',
  openrouter:  '',
  monica:      ''
};
