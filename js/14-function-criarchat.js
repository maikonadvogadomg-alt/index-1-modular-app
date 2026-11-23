// ─────────────────────────────────────────
// GERENCIAR CHATS
// ─────────────────────────────────────────
function criarChat() {
  const id = gerarId();
  const chat = {
    id,
    titulo: 'Nova conversa',
    msgs: [],
    provedorId: APP.provedorAtual,
    modeloId: APP.modeloAtual,
    criadoEm: Date.now(),
    atualizadoEm: Date.now(),
    totalTokens: 0
  };
  APP.chats[id] = chat;
  return chat;
}

async function salvarChatAtual() {
  if (!APP.chatAtual || !APP.chats[APP.chatAtual]) return;
  await DB.salvarChat(APP.chats[APP.chatAtual]);
}

async function carregarTodosChats() {
  const lista = await DB.listarChats();
  APP.chats = {};
  for (const c of lista) APP.chats[c.id] = c;
}

function gerarTituloChat(primeiraMensagem) {
  const txt = primeiraMensagem.slice(0, 60).trim();
  return txt.length < primeiraMensagem.length ? txt + '…' : txt;
}
