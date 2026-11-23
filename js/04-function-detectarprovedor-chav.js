// ─────────────────────────────────────────
// DETECTAR PROVEDOR PELA CHAVE
// ─────────────────────────────────────────
function detectarProvedor(chave) {
  if (!chave) return null;
  if (chave.startsWith('AIza'))    return 'gemini';
  if (chave.startsWith('sk-ant-')) return 'claude';
  if (chave.startsWith('gsk_'))    return 'groq';
  if (chave.startsWith('sk-or-'))  return 'openrouter';
  if (chave.startsWith('sk-'))     return 'monica'; // Monica e OpenAI usam sk-
  return null;
}

// Verificar se modelo suporta visão
function modeloSuportaVisao(provedorId, modeloId) {
  const prov = PROVEDORES[provedorId];
  if (!prov) return false;
  const m = prov.modelos.find(x => x.id === modeloId);
  return m ? m.visao : false;
}
