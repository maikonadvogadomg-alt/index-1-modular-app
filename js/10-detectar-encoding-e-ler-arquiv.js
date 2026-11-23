// ─────────────────────────────────────────
// PROCESSAMENTO DE ARQUIVOS DE TEXTO
// ─────────────────────────────────────────

// Detectar encoding e ler arquivo como texto
function lerArquivoTexto(arquivo) {
  return new Promise((ok, err) => {
    const reader = new FileReader();

    // Tentar UTF-8 primeiro
    reader.onload = e => {
      let texto = e.target.result;

      // Verificar se tem caracteres ilegíveis (encoding errado)
      const ilegivel = (texto.match(/[^\x00-\x7F\u00C0-\u024F\u0400-\u04FF]/g) || []).length;
      const total = texto.length;

      if (ilegivel / total > 0.1 && total > 100) {
        // Tentar Latin-1 / Windows-1252
        const reader2 = new FileReader();
        reader2.onload = e2 => ok(e2.target.result);
        reader2.onerror = () => ok(texto); // fallback para UTF-8
        reader2.readAsText(arquivo, 'windows-1252');
      } else {
        ok(texto);
      }
    };
    reader.onerror = () => err(new Error('Erro ao ler arquivo'));
    reader.readAsText(arquivo, 'utf-8');
  });
}
