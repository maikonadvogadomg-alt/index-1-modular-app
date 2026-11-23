// ─────────────────────────────────────────
// EVENTOS
// ─────────────────────────────────────────
function registrarEventos() {
  // Menu / sidebar
  $('btn-menu').addEventListener('click', toggleSidebar);
  $('overlay-sidebar').addEventListener('click', fecharSidebarMobile);

  // Novo chat
  $('btn-novo-chat').addEventListener('click', novoChat);

  // Config
  $('btn-config').addEventListener('click', abrirConfig);
  $('btn-abrir-config').addEventListener('click', abrirConfig);
  $('btn-fechar-config').addEventListener('click', fecharConfig);

  // Salvar chaves
  $('btn-salvar-chaves').addEventListener('click', salvarConfiguracoes);

  // Testar conexão
  $('btn-testar-conexao').addEventListener('click', async () => {
    toast('🔌 Testando...');
    const pid = APP.provedorAtual;
    const res = await testarConexao(pid);
    toast(res.msg, 4000);
  });

  // Sliders
  $('cfg-temperatura').addEventListener('input', e => {
    $('cfg-temp-val').textContent = e.target.value;
  });
  $('cfg-qualidade').addEventListener('input', e => {
    $('cfg-qualidade-val').textContent = e.target.value;
  });

  // Toggles
  $$('.toggle').forEach(t => {
    t.addEventListener('click', () => t.classList.toggle('ativo'));
  });

  // Select de modelo
  $('select-modelo').addEventListener('change', e => {
    const [pid, mid] = e.target.value.split('::');
    APP.provedorAtual = pid;
    APP.modeloAtual   = mid;
    DB.salvarConfig('provedor', pid);
    DB.salvarConfig('modelo', mid);
  });

  // Campo de texto
  $('campo-texto').addEventListener('input', ajustarAlturaCampo);
  $('campo-texto').addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      enviarMensagemUI();
    }
  });

  // Botão enviar
  $('btn-enviar').addEventListener('click', enviarMensagemUI);

  // Botão voz
  $('btn-voz').addEventListener('click', iniciarVoz);

  // Anexar arquivo
  $('btn-anexar').addEventListener('click', () => $('input-arquivo').click());
  $('input-arquivo').addEventListener('change', async e => {
    const arquivos = Array.from(e.target.files);
    e.target.value = '';

    for (const arq of arquivos) {
      try {
        toast('⏳ Processando ' + arq.name + '...');
        const anexo = await processarAnexo(arq, {
          maxPx: APP.config.maxPxImg,
          qualidade: APP.config.qualidadeImg
        });
        anexo.id = gerarId();
        APP.anexosPendentes.push(anexo);
        adicionarAnexoUI(anexo);
        toast('✅ ' + arq.name + ' pronto!');
      } catch (err) {
        toast('❌ ' + err.message, 4000);
      }
    }
  });

  // Exportar/Importar chat
  $('btn-exportar-chat').addEventListener('click', exportarChat);
  $('btn-importar-chat').addEventListener('click', () => $('input-importar-chat').click());
  $('input-importar-chat').addEventListener('change', e => {
    if (e.target.files[0]) importarChat(e.target.files[0]);
    e.target.value = '';
  });

  // Exportar/Importar config
  $('btn-exportar-config').addEventListener('click', exportarConfig);
  $('btn-importar-config').addEventListener('click', () => $('input-importar-config').click());
  $('input-importar-config').addEventListener('change', e => {
    if (e.target.files[0]) importarConfig(e.target.files[0]);
    e.target.value = '';
  });

  // Limpar chats
  $('btn-limpar-chats').addEventListener('click', async () => {
    if (!confirm('Apagar TODOS os chats? Esta ação não pode ser desfeita.')) return;
    await DB.apagarTodosChats();
    APP.chats = {};
    APP.chatAtual = null;
    renderizarListaChats();
    renderizarChat();
    toast('🗑️ Todos os chats apagados');
  });

  // Resetar tudo
  $('btn-limpar-tudo').addEventListener('click', async () => {
    if (!confirm('RESETAR TUDO? Chaves, chats e configurações serão apagados!')) return;
    await DB.limparTudo();
    location.reload();
  });

  // Lightbox
  $('lightbox').addEventListener('click', () => $('lightbox').classList.remove('aberto'));

  // Sugestões da tela vazia
  $$('.sugestao-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $('campo-texto').value = btn.dataset.texto;
      ajustarAlturaCampo();
      $('campo-texto').focus();
    });
  });

  // Drag & Drop de arquivos
  const main = $('main');
  main.addEventListener('dragover', e => { e.preventDefault(); main.style.outline = '2px dashed var(--primaria)'; });
  main.addEventListener('dragleave', () => { main.style.outline = ''; });
  main.addEventListener('drop', async e => {
    e.preventDefault();
    main.style.outline = '';
    const arquivos = Array.from(e.dataTransfer.files);
    for (const arq of arquivos) {
      try {
        const anexo = await processarAnexo(arq, { maxPx: APP.config.maxPxImg, qualidade: APP.config.qualidadeImg });
        anexo.id = gerarId();
        APP.anexosPendentes.push(anexo);
        adicionarAnexoUI(anexo);
        toast('✅ ' + arq.name + ' adicionado!');
      } catch (err) {
        toast('❌ ' + err.message, 4000);
      }
    }
  });
}
