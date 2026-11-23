function toast(msg, tempo = 2500) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('visivel');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('visivel'), tempo);
}

function gerarId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function formatarData(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString('pt-BR', { day:'2-digit', month:'2-digit' })
    + ' ' + d.toLocaleTimeString('pt-BR', { hour:'2-digit', minute:'2-digit' });
}

function formatarTokens(n) {
  if (!n) return '0';
  if (n >= 1000) return (n/1000).toFixed(1) + 'k';
  return n.toString();
}

function copiarTexto(txt) {
  navigator.clipboard.writeText(txt)
    .then(() => toast('✅ Copiado!'))
    .catch(() => {
      const el = document.createElement('textarea');
      el.value = txt;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      toast('✅ Copiado!');
    });
}

function baixarArquivo(nome, conteudo, tipo = 'application/json') {
  const blob = new Blob([conteudo], { type: tipo });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = nome;
  a.click();
  URL.revokeObjectURL(url);
}

function sanitizarHTML(txt) {
  return txt
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Markdown simples para HTML
function markdownParaHTML(txt) {
  if (!txt) return '';
  let h = txt;

  // Blocos de código com linguagem
  h = h.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) => {
    const l = lang || 'código';
    const id = gerarId();
    return `<pre data-lang="${l}"><code>${sanitizarHTML(code.trim())}</code>`
      + `<button class="btn-copiar-codigo" onclick="copiarTexto(document.getElementById('c${id}').textContent)">`
      + `Copiar</button></pre>`;
  });

  // Código inline
  h = h.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Negrito e itálico
  h = h.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  h = h.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  h = h.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Títulos
  h = h.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  h = h.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  h = h.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Blockquote
  h = h.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');

  // Listas não ordenadas
  h = h.replace(/^[\*\-] (.+)$/gm, '<li>$1</li>');
  h = h.replace(/(<li>.*<\/li>\n?)+/g, m => `<ul>${m}</ul>`);

  // Listas ordenadas
  h = h.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

  // Linha horizontal
  h = h.replace(/^---+$/gm, '<hr>');

  // Links
  h = h.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

  // Parágrafos (linhas duplas)
  h = h.replace(/\n\n+/g, '</p><p>');
  h = '<p>' + h + '</p>';

  // Quebras simples dentro de parágrafos
  h = h.replace(/\n/g, '<br>');

  // Limpar p vazios
  h = h.replace(/<p>\s*<\/p>/g, '');
  h = h.replace(/<p>(<h[1-6]>)/g, '$1');
  h = h.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
  h = h.replace(/<p>(<ul>)/g, '$1');
  h = h.replace(/(<\/ul>)<\/p>/g, '$1');
  h = h.replace(/<p>(<pre>)/g, '$1');
  h = h.replace(/(<\/pre>)<\/p>/g, '$1');
  h = h.replace(/<p>(<blockquote>)/g, '$1');
  h = h.replace(/(<\/blockquote>)<\/p>/g, '$1');
  h = h.replace(/<p>(<hr>)<\/p>/g, '$1');

  return h;
}
