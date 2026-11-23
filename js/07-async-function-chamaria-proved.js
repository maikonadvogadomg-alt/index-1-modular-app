// ─────────────────────────────────────────
// FUNÇÃO PRINCIPAL — CHAMAR IA
// ─────────────────────────────────────────
async function chamarIA(provedorId, modeloId, mensagens, config) {
  const prov = PROVEDORES[provedorId];
  if (!prov) throw new Error('Provedor não encontrado: ' + provedorId);

  const chave = CHAVES[provedorId] || '';

  switch (prov.tipo) {
    case 'openai':
      return chamarOpenAI(prov.baseURL, chave, modeloId, mensagens, config);
    case 'gemini':
      return chamarGemini(chave, modeloId, mensagens, config);
    case 'claude':
      return chamarClaude(chave, modeloId, mensagens, config);
    case 'ollama':
      return chamarOllama(CHAVES.ollama || prov.baseURL, modeloId, mensagens, config);
    default:
      throw new Error('Tipo de provedor desconhecido: ' + prov.tipo);
  }
}

// Testar conexão com provedor
async function testarConexao(provedorId) {
  try {
    const prov = PROVEDORES[provedorId];
    if (!prov) return { ok: false, msg: 'Provedor inválido' };

    if (provedorId === 'ollama') {
      const modelos = await carregarModelosOllama(CHAVES.ollama);
      return modelos.length > 0
        ? { ok: true, msg: `✅ Ollama: ${modelos.length} modelo(s) encontrado(s)` }
        : { ok: false, msg: '❌ Ollama: nenhum modelo encontrado' };
    }

    const chave = CHAVES[provedorId];
    if (!chave) return { ok: false, msg: '❌ Chave não configurada' };

    // Teste leve com 1 token
    const resultado = await chamarIA(provedorId,
      prov.modelos[0]?.id || 'gpt-4o-mini',
      [{ role: 'user', content: 'Olá' }],
      { temperatura: 0, maxTokens: 5 }
    );
    return { ok: true, msg: `✅ ${prov.nome}: conexão OK` };
  } catch (e) {
    return { ok: false, msg: `❌ ${e.message}` };
  }
}
