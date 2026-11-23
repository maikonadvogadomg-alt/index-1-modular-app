// ─────────────────────────────────────────
// ESTADO GLOBAL DO APP
// ─────────────────────────────────────────
const APP = {
  chatAtual: null,       // id do chat ativo
  chats: {},             // { id: { id, titulo, msgs, criadoEm, atualizadoEm } }
  provedorAtual: 'monica',
  modeloAtual: '',
  enviando: false,
  anexosPendentes: [],   // arquivos prontos para enviar
  config: {
    systemPrompt: 'Você é um assistente jurídico especializado. Responda sempre em português do Brasil de forma clara e objetiva.',
    temperatura: 0.7,
    maxTokens: 2048,
    contexto: 10,        // quantas mensagens anteriores mandar para a IA
    comprimirImg: true,
    qualidadeImg: 80,
    maxPxImg: 1024,
    fallbackImg: true,
    voz: true
  }
};
