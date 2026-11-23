// ─────────────────────────────────────────
// SELECT DE MODELOS
// ─────────────────────────────────────────
async function popularSelectModelos() {
  const select = $('select-modelo');
  select.innerHTML = '';

  // Verificar Ollama
  if (CHAVES.ollama || PROVEDORES.ollama.baseURL) {
    const modelosOllama = await carregarModelosOllama(CHAVES.ollama);
    PROVEDORES.ollama.modelos = modelosOllama;
  }

  // Montar grupos por provedor
  const ordem = ['monica', 'gemini', 'claude', 'groq', 'openai', 'deepseek', 'openrouter', 'ollama'];

  for (const pid of ordem) {
    const prov = PROVEDORES[pid];
    if (!prov || prov.modelos.length === 0) continue;

    // Só mostrar provedores com chave configurada (exceto Ollama)
    if (pid !== 'ollama' && !CHAVES[pid]) continue;

    const grupo = document.createElement('optgroup');
    grupo.label = prov.nome;

    for (const m of prov.modelos) {
      const opt = document.createElement('option');
      opt.value = `${pid}::${m.id}`;
      opt.textContent = m.nome + (m.visao ? ' 👁️' : '');
      if (pid === APP.provedorAtual && m.id === APP.modeloAtual) opt.selected = true;
      grupo.appendChild(opt);
    }

    select.appendChild(grupo);
  }

  // Se nenhum selecionado, selecionar primeiro disponível
  if (!select.value && select.options.length > 0) {
    select.selectedIndex = 0;
    const [pid, mid] = select.value.split('::');
    APP.provedorAtual = pid;
    APP.modeloAtual   = mid;
  }
}
