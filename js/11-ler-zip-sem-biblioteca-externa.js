// ─────────────────────────────────────────
// PROCESSAMENTO DE ZIP
// ─────────────────────────────────────────

// Ler ZIP sem biblioteca externa (usando FileReader + estrutura ZIP manual)
// Para arquivos ZIP simples — lê os arquivos de texto dentro
async function lerZIP(arquivo) {
  return new Promise((ok, err) => {
    const reader = new FileReader();
    reader.onload = async e => {
      try {
        const buffer = e.target.result;
        const bytes = new Uint8Array(buffer);
        const arquivos = [];

        // Procurar assinaturas de arquivos no ZIP (PK\x03\x04)
        let i = 0;
        while (i < bytes.length - 4) {
          // Assinatura de entrada local: 50 4B 03 04
          if (bytes[i] === 0x50 && bytes[i+1] === 0x4B &&
              bytes[i+2] === 0x03 && bytes[i+3] === 0x04) {

            const versao = bytes[i+4] | (bytes[i+5] << 8);
            const flags  = bytes[i+6] | (bytes[i+7] << 8);
            const metodo = bytes[i+8] | (bytes[i+9] << 8);
            const tamComp   = bytes[i+18] | (bytes[i+19] << 8) | (bytes[i+20] << 16) | (bytes[i+21] << 24);
            const tamDescomp= bytes[i+22] | (bytes[i+23] << 8) | (bytes[i+24] << 16) | (bytes[i+25] << 24);
            const tamNome   = bytes[i+26] | (bytes[i+27] << 8);
            const tamExtra  = bytes[i+28] | (bytes[i+29] << 8);

            const nomeBytes = bytes.slice(i+30, i+30+tamNome);
            const nome = new TextDecoder('utf-8').decode(nomeBytes);

            const inicio = i + 30 + tamNome + tamExtra;
            const dados  = bytes.slice(inicio, inicio + tamComp);

            // Só processar arquivos de texto (não pastas, não binários)
            const ehTexto = /\.(txt|md|js|ts|jsx|tsx|html|css|json|xml|csv|py|java|c|cpp|cs|php|rb|go|rs|sql|yaml|yml|env|sh|bat|ini|cfg|conf|log)$/i.test(nome);
            const ehPasta = nome.endsWith('/');

            if (!ehPasta && tamDescomp > 0) {
              if (ehTexto && metodo === 0) {
                // Sem compressão — lê direto
                const texto = new TextDecoder('utf-8').decode(dados);
                arquivos.push({ nome, texto, tamanho: tamDescomp, tipo: 'texto' });
              } else if (ehTexto && metodo === 8) {
                // Deflate — tenta descomprimir
                try {
                  const ds = new DecompressionStream('deflate-raw');
                  const writer = ds.writable.getWriter();
                  const reader2 = ds.readable.getReader();
                  writer.write(dados);
                  writer.close();
                  const chunks = [];
                  let done = false;
                  while (!done) {
                    const { value, done: d } = await reader2.read();
                    if (value) chunks.push(value);
                    done = d;
                  }
                  const total = chunks.reduce((s, c) => s + c.length, 0);
                  const merged = new Uint8Array(total);
                  let offset = 0;
                  for (const c of chunks) { merged.set(c, offset); offset += c.length; }
                  const texto = new TextDecoder('utf-8').decode(merged);
                  arquivos.push({ nome, texto, tamanho: tamDescomp, tipo: 'texto' });
                } catch {
                  arquivos.push({ nome, texto: '[arquivo comprimido — não foi possível extrair]', tamanho: tamDescomp, tipo: 'binario' });
                }
              } else if (!ehTexto) {
                arquivos.push({ nome, texto: null, tamanho: tamDescomp, tipo: 'binario' });
              }
            }

            i = inicio + tamComp;
          } else {
            i++;
          }
        }

        ok(arquivos);
      } catch (e2) {
        err(new Error('Erro ao processar ZIP: ' + e2.message));
      }
    };
    reader.onerror = () => err(new Error('Erro ao ler ZIP'));
    reader.readAsArrayBuffer(arquivo);
  });
}
