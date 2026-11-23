// ─────────────────────────────────────────
// CONFIGURAÇÕES
// ─────────────────────────────────────────
function abrirConfig() {
  $('painel-config').classList.add('aberto');
}

function fecharConfig() {
  $('painel-config').classList.remove('aberto');
}

function aplicarConfiguracoes() {
  // Preencher campos
  $('cfg-chave-openai').value   = CHAVES.monica || CHAVES.openai || '';
  $('cfg-chave-gemini').value   = CHAVES.gemini || '';
  $('cfg-chave-claude').value   = CHAVES.claude || '';
  $('cfg-url-ollama').value     = CHAVES.ollama || 'http://localhost:11434';
  $('cfg-system-prompt').value  = APP.config.systemPrompt || '';
  $('cfg-temperatura').value    = APP.config.temperatura ?? 0.7;
  $('cfg-temp-val').textContent = APP.config.temperatura ?? 0.7;
  $('cfg-max-tokens').value     = APP.config.maxTokens ?? 2048;
  $('cfg-contexto').value       = APP.config.contexto ?? 10;
  $('cfg-qualidade').value      = APP.config.qualidadeImg ?? 80;
  $('cfg-qualidade-val').textContent = APP.config.qualidadeImg ?? 80;
  $('cfg-tamanho-img').value    = APP.config.maxPxImg ?? 1024;

  $('toggle-comprimir').classList.toggle('ativo', APP.config.comprimirImg !== false);
  $('toggle-fallback-img').classList.toggle('ativo', APP.config.fallbackImg !== false);

  // Popular select de modelos
  popularSelectModelos();
}

async function salvarConfiguracoes() {
  // Chaves
  const chaveOpenAI = $('cfg-chave-openai').value.trim();
  if (chaveOpenAI) {
    // Detectar se é Monica ou OpenAI
    const provDetectado = detectarProvedor(chaveOpenAI);
    if (provDetectado === 'monica' || provDetectado === 'openai') {
      CHAVES.monica = chaveOpenAI;
      CHAVES.openai = chaveOpenAI;
    }
  }
  CHAVES.gemini  = $('cfg-chave-gemini').value.trim();
  CHAVES.claude  = $('cfg-chave-claude').value.trim();
  CHAVES.ollama  = $('cfg-url-ollama').value.trim() || 'http://localhost:11434';

  // Config
  APP.config.systemPrompt  = $('cfg-system-prompt').value.trim();
  APP.config.temperatura   = parseFloat($('cfg-temperatura').value);
  APP.config.maxTokens     = parseInt($('cfg-max-tokens').value);
  APP.config.contexto      = parseInt($('cfg-contexto').value);
  APP.config.qualidadeImg  = parseInt($('cfg-qualidade').value);
  APP.config.maxPxImg      = parseInt($('cfg-tamanho-img').value);
  APP.config.comprimirImg  = $('toggle-comprimir').classList.contains('ativo');
  APP.config.fallbackImg   = $('toggle-fallback-img').classList.contains('ativo');

  // Salvar no IndexedDB
  await DB.salvarConfig('chaves', CHAVES);
  await DB.salvarConfig('app_config', APP.config);
  await DB.salvarConfig('provedor', APP.provedorAtual);
  await DB.salvarConfig('modelo', APP.modeloAtual);

  toast('✅ Configurações salvas!');
  popularSelectModelos();
}

async function carregarConfiguracoesSalvas() {
  const chaves = await DB.carregarConfig('chaves', {});
  Object.assign(CHAVES, chaves);

  const cfg = await DB.carregarConfig('app_config', {});
  Object.assign(APP.config, cfg);

  APP.provedorAtual = await DB.carregarConfig('provedor', 'monica');
  APP.modeloAtual   = await DB.carregarConfig('modelo', '');
}
