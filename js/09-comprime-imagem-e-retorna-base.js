// ─────────────────────────────────────────
// PROCESSAMENTO DE IMAGEM
// ─────────────────────────────────────────

// Comprime imagem e retorna base64
function comprimirImagem(arquivo, maxPx, qualidade) {
  return new Promise((ok, err) => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;

        // Redimensionar mantendo proporção
        if (width > maxPx || height > maxPx) {
          if (width > height) {
            height = Math.round(height * maxPx / width);
            width = maxPx;
          } else {
            width = Math.round(width * maxPx / height);
            height = maxPx;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataURL = canvas.toDataURL('image/jpeg', qualidade / 100);
        const tamanhoKB = Math.round(dataURL.length * 0.75 / 1024);

        ok({
          dataURL,
          largura: width,
          altura: height,
          tamanhoKB,
          nome: arquivo.name,
          tipo: 'image/jpeg'
        });
      };
      img.onerror = () => err(new Error('Imagem inválida'));
      img.src = e.target.result;
    };
    reader.onerror = () => err(new Error('Erro ao ler arquivo'));
    reader.readAsDataURL(arquivo);
  });
}

// Converter imagem para descrição de texto (fallback para IAs sem visão)
async function imagemParaTexto(imgData, provedorId, modeloId, config) {
  // Usa uma IA com visão para descrever a imagem
  // Tenta Gemini Flash (gratuito) primeiro, depois o provedor atual
  const provedoresComVisao = ['gemini', 'monica', 'openai', 'claude'];
  let provedorVisao = null;
  let modeloVisao = null;

  // Verificar se provedor atual tem visão
  if (modeloSuportaVisao(provedorId, modeloId)) {
    provedorVisao = provedorId;
    modeloVisao = modeloId;
  } else {
    // Procurar provedor com chave configurada e visão
    for (const pid of provedoresComVisao) {
      if (CHAVES[pid] && PROVEDORES[pid]) {
        const m = PROVEDORES[pid].modelos.find(x => x.visao);
        if (m) { provedorVisao = pid; modeloVisao = m.id; break; }
      }
    }
  }

  if (!provedorVisao) {
    return `[Imagem: ${imgData.nome} — ${imgData.largura}×${imgData.altura}px, ${imgData.tamanhoKB}KB. Nenhuma IA com visão disponível para descrever.]`;
  }

  try {
    const msgs = [
      {
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: { url: imgData.dataURL }
          },
          {
            type: 'text',
            text: 'Descreva detalhadamente o conteúdo desta imagem. Se houver texto, transcreva-o integralmente. Se for um documento jurídico, destaque os elementos importantes.'
          }
        ]
      }
    ];

    const resultado = await chamarIA(provedorVisao, modeloVisao, msgs, { temperatura: 0.3, maxTokens: 1024 });
    return `[Descrição da imagem "${imgData.nome}"]\n${resultado.texto}`;
  } catch (e) {
    return `[Imagem: ${imgData.nome} — ${imgData.largura}×${imgData.altura}px. Erro ao descrever: ${e.message}]`;
  }
}
