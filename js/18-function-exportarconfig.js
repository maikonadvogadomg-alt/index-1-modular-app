// ─────────────────────────────────────────
// EXPORTAR / IMPORTAR CONFIGURAÇÕES
// ─────────────────────────────────────────
function exportarConfig() {
  const dados = {
    config: APP.config,
    provedorAtual: APP.provedorAtual,
    modeloAtual: APP.modeloAtual,
    exportadoEm: new Date().toISOString()
    // Chaves NÃO são exportadas por segurança
  };
  baixarArquivo(`aistudio-config-${Date.now()}.json`, JSON.stringify(dados, null, 2));
  toast('✅ Configurações exportadas (sem chaves)');
}

function importarConfig(arquivo) {
  const reader = new FileReader();
  reader.onload = async e => {
    try {
      const dados = JSON.parse(e.target.result);
      if (dados.config) Object.assign(APP.config, dados.config);
      if (dados.provedorAtual) APP.provedorAtual = dados.provedorAtual;
      if (dados.modeloAtual) APP.modeloAtual = dados.modeloAtual;
      await salvarConfiguracoes();
      aplicarConfiguracoes();
      toast('✅ Configurações importadas!');
    } catch {
      toast('❌ Arquivo de configuração inválido');
    }
  };
  reader.readAsText(arquivo);
}
