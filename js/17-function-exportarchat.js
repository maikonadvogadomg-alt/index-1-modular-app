// ─────────────────────────────────────────
// EXPORTAR / IMPORTAR CHAT
// ─────────────────────────────────────────
function exportarChat() {
  if (!APP.chatAtual || !APP.chats[APP.chatAtual]) {
    toast('⚠️ Nenhum chat aberto');
    return;
  }
  const chat = APP.chats[APP.chatAtual];
  const json = JSON.stringify(chat, null, 2);
  const nome = `chat-${chat.titulo.slice(0,30).replace(/[^a-z0-9]/gi,'-')}-${Date.now()}.json`;
  baixarArquivo(nome, json);
  toast('✅ Chat exportado!');
}

function importarChat(arquivo) {
  const reader = new FileReader();
  reader.onload = async e => {
    try {
      const chat = JSON.parse(e.target.result);
      if (!chat.id || !chat.msgs) throw new Error('Formato inválido');
      chat.id = gerarId(); // novo id para não sobrescrever
      APP.chats[chat.id] = chat;
      await DB.salvarChat(chat);
      APP.chatAtual = chat.id;
      renderizarListaChats();
      renderizarChat();
      toast('✅ Chat importado!');
    } catch {
      toast('❌ Arquivo inválido');
    }
  };
  reader.readAsText(arquivo);
}
