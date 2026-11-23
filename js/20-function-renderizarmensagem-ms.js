// ─────────────────────────────────────────
// RENDERIZAÇÃO
// ─────────────────────────────────────────
function renderizarMensagem(msg) {
  const container = $('mensagens');

  // Esconder tela vazia
  const telaVazia = $('tela-vazia');
  if (telaVazia) telaVazia.style.display = 'none';

  const div = document.createElement('div');
  div.className = `msg ${msg.papel}`;
  div.id = 'msg-' + msg.id;

  const avatar = msg.papel === 'usuario' ? '👤' :
                 msg.papel === 'assistente' ? '🤖' : 'ℹ️';

  let conteudoHTML = '';

  // Previews de imagem
  if (msg.imagensPreview && msg.imagensPreview.length > 0) {
    conteudoHTML += '<div class="msg-anexos">';
    for (const src of msg.imagensPreview) {
      conteudoHTML += `<img class="preview-img" src="${src}" onclick="abrirLightbox('${src}')" title="Clique para ampliar">`;
    }
    conteudoHTML += '</div>';
  }

  // Chips de anexos
  if (msg.anexos && msg.anexos.length > 0) {
    conteudoHTML += '<div class="msg-anexos">';
    for (const a of msg.anexos) {
      const tipo = a.startsWith('Imagem') ? 'imagem' : a.startsWith('ZIP') ? 'zip' : 'arquivo';
      const icone = tipo === 'imagem' ? '🖼️' : tipo === 'zip' ? '📦' : '📄';
      conteudoHTML += `<span class="anexo-chip ${tipo}">${icone} ${sanitizarHTML(a)}</span>`;
    }
    conteudoHTML += '</div>';
  }

  // Texto da mensagem
  if (msg.papel === 'usuario') {
    conteudoHTML += `<div class="msg-balao">${sanitizarHTML(msg.texto).replace(/\n/g,'<br>')}</div>`;
  } else if (msg.papel === 'assistente') {
    conteudoHTML += `<div class="msg-balao">${markdownParaHTML(msg.texto)}</div>`;
  } else {
    conteudoHTML += `<div class="msg-balao">${sanitizarHTML(msg.texto)}</div>`;
  }

  // Meta (hora + tokens)
  let meta = `<span>${formatarData(msg.ts)}</span>`;
  if (msg.tokens) {
    meta += `<span title="Tokens usados">${formatarTokens(msg.tokens)} tokens</span>`;
  }
  if (msg.modelo) {
    meta += `<span title="Modelo usado">${msg.modelo}</span>`;
  }

  // Ações
  let acoes = '';
  if (msg.papel !== 'sistema') {
    acoes = `<div class="msg-acoes">
      <button class="btn-acao-msg" onclick="copiarTexto(${JSON.stringify(msg.texto)})" title="Copiar">📋</button>
      ${msg.papel === 'assistente' ? `<button class="btn-acao-msg" onclick="regenerarMensagem('${msg.id}')" title="Regenerar">🔄</button>` : ''}
    </div>`;
  }

  div.innerHTML = `
    <div class="msg-avatar">${avatar}</div>
    <div class="msg-conteudo">
      ${conteudoHTML}
      <div class="msg-meta">${meta}${acoes}</div>
    </div>
  `;

  container.appendChild(div);
}

function renderizarChat() {
  const container = $('mensagens');
  // Limpar mensagens (manter tela vazia)
  const telaVazia = $('tela-vazia');
  container.innerHTML = '';
  if (telaVazia) {
    container.appendChild(telaVazia);
  }

  if (!APP.chatAtual || !APP.chats[APP.chatAtual]) {
    if (telaVazia) telaVazia.style.display = '';
    return;
  }

  const chat = APP.chats[APP.chatAtual];
  if (telaVazia) telaVazia.style.display = 'none';

  for (const msg of chat.msgs) {
    renderizarMensagem(msg);
  }
  scrollParaBaixo();
}

function renderizarListaChats() {
  const lista = $('lista-chats');
  lista.innerHTML = '';

  const chats = Object.values(APP.chats)
    .sort((a, b) => (b.atualizadoEm || 0) - (a.atualizadoEm || 0));

  if (chats.length === 0) {
    lista.innerHTML = '<div style="padding:16px;font-size:12px;color:var(--texto2);text-align:center">Nenhuma conversa ainda</div>';
    return;
  }

  for (const chat of chats) {
    const div = document.createElement('div');
    div.className = 'chat-item' + (chat.id === APP.chatAtual ? ' ativo' : '');
    div.innerHTML = `
      <span>💬</span>
      <span class="chat-item-titulo" title="${sanitizarHTML(chat.titulo)}">${sanitizarHTML(chat.titulo)}</span>
      <button class="chat-item-apagar" title="Apagar" onclick="apagarChat('${chat.id}', event)">🗑️</button>
    `;
    div.addEventListener('click', () => abrirChat(chat.id));
    lista.appendChild(div);
  }
}

function mostrarDigitando() {
  const id = 'dig-' + gerarId();
  const div = document.createElement('div');
  div.className = 'msg assistente';
  div.id = id;
  div.innerHTML = `
    <div class="msg-avatar">🤖</div>
    <div class="msg-conteudo">
      <div class="msg-balao">
        <div class="digitando"><span></span><span></span><span></span></div>
      </div>
    </div>
  `;
  $('mensagens').appendChild(div);
  scrollParaBaixo();
  return id;
}

function removerDigitando(id) {
  const el = $(id);
  if (el) el.remove();
}

function scrollParaBaixo() {
  const el = $('mensagens');
  setTimeout(() => el.scrollTop = el.scrollHeight, 50);
}

function atualizarBadgeTokens(tokens) {
  const badge = $('badge-tokens');
  if (!tokens) return;
  badge.style.display = '';
  badge.textContent = formatarTokens(tokens) + ' tokens';
}
