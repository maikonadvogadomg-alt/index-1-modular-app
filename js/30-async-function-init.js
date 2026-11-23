// ─────────────────────────────────────────
// INICIALIZAÇÃO
// ─────────────────────────────────────────
async function init() {
  try {
    // Carregar configurações salvas
    await carregarConfiguracoesSalvas();

    // Carregar chats
    await carregarTodosChats();

    // Registrar eventos
    registrarEventos();

    // Popular select de modelos
    await popularSelectModelos();

    // Aplicar configurações na UI
    aplicarConfiguracoes();

    // Renderizar lista de chats
    renderizarListaChats();

    // Abrir último chat se existir
    const chats = Object.values(APP.chats).sort((a,b) => (b.atualizadoEm||0) - (a.atualizadoEm||0));
    if (chats.length > 0) {
      APP.chatAtual = chats[0].id;
      renderizarChat();
    }

    // Sidebar: desktop começa aberto, mobile fechado
    if (window.innerWidth > 640) {
      $('sidebar').classList.remove('fechado');
    }

    console.log('✅ AI Studio iniciado');
  } catch (e) {
    console.error('Erro ao iniciar:', e);
    toast('❌ Erro ao iniciar: ' + e.message, 5000);
  }
}
