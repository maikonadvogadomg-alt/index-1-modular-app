// Carregar modelos Ollama dinamicamente
async function carregarModelosOllama(urlBase) {
  try {
    const url = (urlBase || 'http://localhost:11434').replace(/\/$/, '') + '/api/tags';
    const resp = await fetch(url, { signal: AbortSignal.timeout(4000) });
    if (!resp.ok) return [];
    const data = await resp.json();
    return (data.models || []).map(m => ({
      id: m.name,
      nome: m.name,
      visao: m.name.includes('vision') || m.name.includes('llava') || m.name.includes('minicpm')
    }));
  } catch { return []; }
}
