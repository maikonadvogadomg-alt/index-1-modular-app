// ─────────────────────────────────────────
// CHAMADAS DE API
// ─────────────────────────────────────────

// OpenAI / Monica / Groq / DeepSeek / OpenRouter (formato compatível)
async function chamarOpenAI(baseURL, chave, modelo, mensagens, config) {
  const resp = await fetch(`${baseURL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${chave}`
    },
    body: JSON.stringify({
      model: modelo,
      messages: mensagens,
      temperature: config.temperatura ?? 0.7,
      max_tokens: config.maxTokens ?? 2048,
      stream: false
    })
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Erro ${resp.status}`);
  }

  const data = await resp.json();
  return {
    texto: data.choices?.[0]?.message?.content || '',
    tokens: data.usage?.total_tokens || 0,
    tokensEntrada: data.usage?.prompt_tokens || 0,
    tokensSaida: data.usage?.completion_tokens || 0
  };
}

// Gemini
async function chamarGemini(chave, modelo, mensagens, config) {
  const partes = mensagens
    .filter(m => m.role !== 'system')
    .map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: Array.isArray(m.content)
        ? m.content.map(p => {
            if (p.type === 'text') return { text: p.text };
            if (p.type === 'image_url') {
              const b64 = p.image_url.url.split(',')[1];
              const mime = p.image_url.url.match(/data:([^;]+)/)?.[1] || 'image/jpeg';
              return { inlineData: { mimeType: mime, data: b64 } };
            }
            return { text: '' };
          })
        : [{ text: m.content }]
    }));

  const systemMsg = mensagens.find(m => m.role === 'system');

  const body = {
    contents: partes,
    generationConfig: {
      temperature: config.temperatura ?? 0.7,
      maxOutputTokens: config.maxTokens ?? 2048
    }
  };

  if (systemMsg) {
    body.systemInstruction = { parts: [{ text: systemMsg.content }] };
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${chave}`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Erro ${resp.status}`);
  }

  const data = await resp.json();
  const texto = data.candidates?.[0]?.content?.parts?.map(p => p.text).join('') || '';
  const tokens = (data.usageMetadata?.totalTokenCount) || 0;
  return { texto, tokens, tokensEntrada: data.usageMetadata?.promptTokenCount || 0, tokensSaida: data.usageMetadata?.candidatesTokenCount || 0 };
}

// Claude
async function chamarClaude(chave, modelo, mensagens, config) {
  const system = mensagens.find(m => m.role === 'system')?.content || '';
  const msgs = mensagens
    .filter(m => m.role !== 'system')
    .map(m => ({
      role: m.role,
      content: Array.isArray(m.content)
        ? m.content.map(p => {
            if (p.type === 'text') return { type: 'text', text: p.text };
            if (p.type === 'image_url') {
              const b64 = p.image_url.url.split(',')[1];
              const mime = p.image_url.url.match(/data:([^;]+)/)?.[1] || 'image/jpeg';
              return { type: 'image', source: { type: 'base64', media_type: mime, data: b64 } };
            }
            return { type: 'text', text: '' };
          })
        : m.content
    }));

  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': chave,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: modelo,
      max_tokens: config.maxTokens ?? 2048,
      system: system || undefined,
      messages: msgs
    })
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Erro ${resp.status}`);
  }

  const data = await resp.json();
  return {
    texto: data.content?.[0]?.text || '',
    tokens: (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0),
    tokensEntrada: data.usage?.input_tokens || 0,
    tokensSaida: data.usage?.output_tokens || 0
  };
}

// Ollama
async function chamarOllama(baseURL, modelo, mensagens, config) {
  const url = baseURL.replace(/\/$/, '') + '/api/chat';
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: modelo,
      messages: mensagens.map(m => ({
        role: m.role,
        content: Array.isArray(m.content)
          ? m.content.map(p => p.type === 'text' ? p.text : '[imagem]').join(' ')
          : m.content
      })),
      stream: false,
      options: {
        temperature: config.temperatura ?? 0.7,
        num_predict: config.maxTokens ?? 2048
      }
    })
  });

  if (!resp.ok) throw new Error(`Ollama erro ${resp.status}`);
  const data = await resp.json();
  return {
    texto: data.message?.content || '',
    tokens: (data.prompt_eval_count || 0) + (data.eval_count || 0),
    tokensEntrada: data.prompt_eval_count || 0,
    tokensSaida: data.eval_count || 0
  };
}
