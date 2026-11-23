// ─────────────────────────────────────────
// PROCESSAR QUALQUER ARQUIVO ANEXADO
// ─────────────────────────────────────────
async function processarAnexo(arquivo, configImg) {
  const nome = arquivo.name;
  const tipo = arquivo.type;
  const tamanhoMB = arquivo.size / 1024 / 1024;

  // Limite de 50MB
  if (tamanhoMB > 50) {
    throw new Error(`Arquivo muito grande: ${tamanhoMB.toFixed(1)}MB (máx 50MB)`);
  }

  // IMAGEM
  if (tipo.startsWith('image/')) {
    const imgData = await comprimirImagem(arquivo, configImg.maxPx, configImg.qualidade);
    return {
      tipo: 'imagem',
      nome,
      dados: imgData,
      preview: imgData.dataURL,
      descricao: `Imagem: ${nome} (${imgData.largura}×${imgData.altura}px, ${imgData.tamanhoKB}KB após compressão)`
    };
  }

  // ZIP
  if (nome.endsWith('.zip') || tipo === 'application/zip' || tipo === 'application/x-zip-compressed') {
    const arquivos = await lerZIP(arquivo);
    const textos = arquivos.filter(a => a.tipo === 'texto');
    const binarios = arquivos.filter(a => a.tipo === 'binario');

    let resumo = `📦 ZIP: ${nome}\n`;
    resumo += `Total: ${arquivos.length} arquivo(s) — ${textos.length} texto(s), ${binarios.length} binário(s)\n\n`;

    for (const arq of textos) {
      const preview = arq.texto.slice(0, 3000);
      const cortado = arq.texto.length > 3000;
      resumo += `── ${arq.nome} (${(arq.tamanho/1024).toFixed(1)}KB)\n`;
      resumo += preview;
      if (cortado) resumo += `\n... [${arq.texto.length - 3000} caracteres omitidos]`;
      resumo += '\n\n';
    }

    if (binarios.length > 0) {
      resumo += `Arquivos binários (não lidos): ${binarios.map(b => b.nome).join(', ')}`;
    }

    return {
      tipo: 'zip',
      nome,
      texto: resumo,
      arquivos,
      descricao: `ZIP com ${arquivos.length} arquivo(s)`
    };
  }

  // TEXTO / CÓDIGO / JSON etc.
  const texto = await lerArquivoTexto(arquivo);
  const limite = 50000; // ~50k chars
  const cortado = texto.length > limite;

  return {
    tipo: 'arquivo',
    nome,
    texto: cortado ? texto.slice(0, limite) + `\n\n... [${texto.length - limite} caracteres omitidos]` : texto,
    tamanhoOriginal: texto.length,
    descricao: `Arquivo: ${nome} (${(arquivo.size/1024).toFixed(1)}KB)`
  };
}
