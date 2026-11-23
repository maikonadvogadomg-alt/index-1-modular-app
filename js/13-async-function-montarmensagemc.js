// ─────────────────────────────────────────
// MONTAR MENSAGEM COM ANEXOS PARA A IA
// ─────────────────────────────────────────
async function montarMensagemComAnexos(textoUsuario, anexos, provedorId, modeloId, config) {
  if (!anexos || anexos.length === 0) {
    return [{ role: 'user', content: textoUsuario }];
  }

  const temVisao = modeloSuportaVisao(provedorId, modeloId);
  const usarFallbackImg = config.fallbackImg !== false;

  // Construir partes da mensagem
  const partes = [];
  const textosExtras = [];

  for (const anexo of anexos) {
    if (anexo.tipo === 'imagem') {
      if (temVisao) {
        // Manda imagem diretamente para a IA ver
        partes.push({
          type: 'image_url',
          image_url: { url: anexo.dados.dataURL }
        });
        textosExtras.push(`[Imagem anexada: ${anexo.nome}]`);
      } else if (usarFallbackImg) {
        // IA não tem visão — descreve em texto
        toast('🔄 Convertendo imagem em texto...');
        const descricao = await imagemParaTexto(anexo.dados, provedorId, modeloId, config);
        textosExtras.push(descricao);
      } else {
        textosExtras.push(`[Imagem: ${anexo.nome} — IA atual não suporta visão]`);
      }
    } else if (anexo.tipo === 'zip' || anexo.tipo === 'arquivo') {
      textosExtras.push(`\n\n${anexo.texto}`);
    }
  }

  // Montar conteúdo final
  const textoFinal = [textoUsuario, ...textosExtras].filter(Boolean).join('\n\n');

  // Se tem imagens diretas, usar formato multipart
  if (partes.length > 0) {
    const content = [
      { type: 'text', text: textoFinal },
      ...partes
    ];
    return [{ role: 'user', content }];
  }

  return [{ role: 'user', content: textoFinal }];
}
