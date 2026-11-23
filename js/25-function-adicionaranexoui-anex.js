// ─────────────────────────────────────────
// FILA DE ANEXOS (UI)
// ─────────────────────────────────────────
function adicionarAnexoUI(anexo) {
  const fila = $('fila-anexos');
  fila.classList.add('visivel');

  const div = document.createElement('div');
  div.className = 'anexo-preview';
  div.id = 'anexo-' + anexo.id;

  let icone = '📄';
  let preview = '';
  if (anexo.tipo === 'imagem') {
    icone = '🖼️';
    preview = `<img src="${anexo.preview}" alt="">`;
  } else if (anexo.tipo === 'zip') {
    icone = '📦';
  }

  div.innerHTML = `
    ${preview}
    <span class="anexo-preview-nome" title="${sanitizarHTML(anexo.nome)}">${icone} ${sanitizarHTML(anexo.nome)}</span>
    <button class="anexo-preview-remover" onclick="removerAnexo('${anexo.id}')" title="Remover">✕</button>
  `;

  fila.appendChild(div);
}

function removerAnexo(id) {
  APP.anexosPendentes = APP.anexosPendentes.filter(a => a.id !== id);
  $('anexo-' + id)?.remove();
  if (APP.anexosPendentes.length === 0) {
    $('fila-anexos').classList.remove('visivel');
  }
}

function limparFilaAnexos() {
  APP.anexosPendentes = [];
  $('fila-anexos').innerHTML = '';
  $('fila-anexos').classList.remove('visivel');
}
