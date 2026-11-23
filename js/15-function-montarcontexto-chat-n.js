// ─────────────────────────────────────────
// MONTAR CONTEXTO PARA IA
// ─────────────────────────────────────────
function montarContexto(chat, novaMensagem) {
  const msgs = [];

  // System prompt
  if (APP.config.systemPrompt) {
    msgs.push({ role: 'system', content: APP.config.systemPrompt });
  }

  // Histórico limitado pelo contexto configurado
  const historico = chat.msgs.slice(-APP.config.contexto * 2);
  for (const m of historico) {
    // Não incluir mensagens de sistema/erro no contexto
    if (m.papel === 'sistema') continue;
    msgs.push({
      role: m.papel === 'usuario' ? 'user' : 'assistant',
      content: m.conteudoIA || m.texto
    });
  }

  // Nova mensagem do usuário (já formatada com anexos)
  msgs.push(novaMensagem);

  return msgs;
}
