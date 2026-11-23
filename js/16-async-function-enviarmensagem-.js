// ─────────────────────────────────────────
// ENVIAR MENSAGEM
// ─────────────────────────────────────────
async function enviarMensagem(textoUsuario, anexos = []) {
  if (APP.enviando) return;
  if (!textoUsuario.trim() && anexos.length === 0) return;

  // Verificar provedor/chave
  const provedorId = APP.provedorAtual;
  const modeloId   = APP.modeloAtual;

  if (provedorId !== 'ollama' && !CHAVES[provedorId]) {
    toast('⚠️ Configure a chave de API nas configurações');
    abrirConfig();
    return;
  }

  APP.enviando = true;
  $('btn-enviar').disabled = true;

  // Criar chat se não existir
  if (!APP.chatAtual || !APP.chats[APP.chatAtual]) {
    const chat = criarChat();
    APP.chatAtual = chat.id;
  }

  const chat = APP.chats[APP.chatAtual];

  // Gerar título automático na primeira mensagem
  if (chat.msgs.length === 0 && textoUsuario.trim()) {
    chat.titulo = gerarTituloChat(textoUsuario);
  }

  // Adicionar mensagem do usuário na UI
  const idMsgUsuario = gerarId();
  const descAnexos = anexos.map(a => a.descricao || a.nome).filter(Boolean);

  chat.msgs.push({
    id: idMsgUsuario,
    papel: 'usuario',
    texto: textoUsuario,
    anexos: descAnexos,
    imagensPreview: anexos.filter(a => a.tipo === 'imagem').map(a => a.preview),
    ts: Date.now()
  });

  renderizarMensagem(chat.msgs[chat.msgs.length - 1]);
  scrollParaBaixo();

  // Mostrar indicador de digitando
  const idDigitando = mostrarDigitando();

  try {
    // Montar mensagem com anexos
    const configImg = {
      maxPx: APP.config.maxPxImg,
      qualidade: APP.config.qualidadeImg,
      fallbackImg: APP.config.fallbackImg
    };

    const [msgFormatada] = await montarMensagemComAnexos(
      textoUsuario, anexos, provedorId, modeloId, configImg
    );

    // Montar contexto completo
    const contexto = montarContexto(chat, msgFormatada);

    // Chamar IA
    const resultado = await chamarIA(provedorId, modeloId, contexto, {
      temperatura: APP.config.temperatura,
      maxTokens: APP.config.maxTokens
    });

    // Remover digitando
    removerDigitando(idDigitando);

    // Adicionar resposta
    const idMsgIA = gerarId();
    chat.msgs.push({
      id: idMsgIA,
      papel: 'assistente',
      texto: resultado.texto,
      conteudoIA: resultado.texto,
      tokens: resultado.tokens,
      tokensEntrada: resultado.tokensEntrada,
      tokensSaida: resultado.tokensSaida,
      provedor: provedorId,
      modelo: modeloId,
      ts: Date.now()
    });

    chat.totalTokens = (chat.totalTokens || 0) + (resultado.tokens || 0);
    chat.atualizadoEm = Date.now();

    renderizarMensagem(chat.msgs[chat.msgs.length - 1]);
    scrollParaBaixo();

    // Atualizar badge de tokens
    atualizarBadgeTokens(resultado.tokens);

    // Salvar
    await salvarChatAtual();
    renderizarListaChats();

  } catch (e) {
    removerDigitando(idDigitando);

    // Mensagem de erro amigável
    let msgErro = e.message || 'Erro desconhecido';
    if (msgErro.includes('401') || msgErro.includes('403')) {
      msgErro = '❌ Chave de API inválida ou sem permissão';
    } else if (msgErro.includes('429')) {
      msgErro = '⏳ Limite de requisições atingido. Aguarde um momento.';
    } else if (msgErro.includes('fetch') || msgErro.includes('network') || msgErro.includes('Failed')) {
      msgErro = '🌐 Erro de conexão. Verifique sua internet.';
    }

    chat.msgs.push({
      id: gerarId(),
      papel: 'sistema',
      texto: msgErro,
      ts: Date.now()
    });

    renderizarMensagem(chat.msgs[chat.msgs.length - 1]);
    scrollParaBaixo();
    toast('❌ ' + msgErro, 4000);
  }

  APP.enviando = false;
  $('btn-enviar').disabled = false;
  APP.anexosPendentes = [];
  limparFilaAnexos();
}
