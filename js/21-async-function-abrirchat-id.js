// ─────────────────────────────────────────
// AÇÕES DO CHAT
// ─────────────────────────────────────────
async function abrirChat(id) {
  APP.chatAtual = id;
  renderizarListaChats();
  renderizarChat();
  fecharSidebarMobile();
}

async function novoChat() {
  const chat = criarChat();
  APP.chatAtual = chat.id;
  renderizarListaChats();
  renderizarChat();
  $('campo-texto').focus();
  fecharSidebarMobile();
}

async function apagarChat(id, evento) {
  if (evento) evento.stopPropagation();
  if (!confirm('Apagar esta conversa?')) return;
  await DB.apagarChat(id);
  delete APP.chats[id];
  if (APP.chatAtual === id) {
    APP.chatAtual = null;
  }
  renderizarListaChats();
  renderizarChat();
  toast('🗑️ Conversa apagada');
}

async function regenerarMensagem(idMsg) {
  if (!APP.chatAtual || !APP.chats[APP.chatAtual]) return;
  const chat = APP.chats[APP.chatAtual];

  // Encontrar índice da mensagem
  const idx = chat.msgs.findIndex(m => m.id === idMsg);
  if (idx < 0) return;

  // Pegar a mensagem do usuário anterior
  let idxUsuario = idx - 1;
  while (idxUsuario >= 0 && chat.msgs[idxUsuario].papel !== 'usuario') idxUsuario--;
  if (idxUsuario < 0) return;

  const msgUsuario = chat.msgs[idxUsuario];

  // Remover mensagens a partir da resposta
  chat.msgs.splice(idx);
  $('msg-' + idMsg)?.remove();

  // Reenviar
  await enviarMensagem(msgUsuario.texto, []);
}

function abrirLightbox(src) {
  $('lightbox-img').src = src;
  $('lightbox').classList.add('aberto');
}
