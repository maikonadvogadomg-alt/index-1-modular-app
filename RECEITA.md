# 🧬 Receita para recriar: AI Studio

_Gerada sem IA, lendo 57 arquivo(s). Serve para remontar este app como HTML modular — com qualquer IA, um arquivo por vez._

## 1. O que é

- **Nome:** AI Studio
- **Partes de código:** 35 (2 tela, 31 logica, 0 servidor, 1 dados, 1 estilo)
- **Tem servidor (rotas /api):** não — dá para ser só HTML
- **Peças de fora (bibliotecas):** nenhuma

## 2. Estrutura modular proposta

```
index.html            ← a página; chama os módulos NA ORDEM
css/app.css           ← o visual
js/00-core.js         ← a "locomotiva": cria window.APP (registrar, guardar, avisar)
js/10-const-db.js     ← ───────────────────────────────────────── STORAGE — IndexedDB com fall (era js/03-const-db.js)
js/15-const-id-document-getelementby.js← logica (era js/01-const-id-document-getelementby.js)
js/20-const-id-document-getelementby.js← ───────────────────────────────────────── UTILITÁRIOS GERAIS ───────── (era js/02-const-id-document-getelementby.js)
js/25-function-detectarprovedor-chav.js← ───────────────────────────────────────── DETECTAR PROVEDOR PELA CHAVE (era js/04-function-detectarprovedor-chav.js)
js/30-openai-monica-groq-deepseek-op.js← ───────────────────────────────────────── CHAMADAS DE API ──────────── (era js/05-openai-monica-groq-deepseek-op.js)
js/35-openai-monica-groq-deepseek-op.js← Carregar modelos Ollama dinamicamente (era js/06-openai-monica-groq-deepseek-op.js)
js/40-async-function-chamaria-proved.js← ───────────────────────────────────────── FUNÇÃO PRINCIPAL — CHAMAR IA (era js/07-async-function-chamaria-proved.js)
js/45-const-provedores.js← ───────────────────────────────────────── CONFIGURAÇÃO DOS PROVEDORES  (era js/08-const-provedores.js)
js/50-comprime-imagem-e-retorna-base.js← ───────────────────────────────────────── PROCESSAMENTO DE IMAGEM ──── (era js/09-comprime-imagem-e-retorna-base.js)
js/55-detectar-encoding-e-ler-arquiv.js← ───────────────────────────────────────── PROCESSAMENTO DE ARQUIVOS DE (era js/10-detectar-encoding-e-ler-arquiv.js)
js/60-ler-zip-sem-biblioteca-externa.js← ───────────────────────────────────────── PROCESSAMENTO DE ZIP ─────── (era js/11-ler-zip-sem-biblioteca-externa.js)
js/65-async-function-processaranexo.js← ───────────────────────────────────────── PROCESSAR QUALQUER ARQUIVO A (era js/12-async-function-processaranexo-.js)
js/70-async-function-montarmensagemc.js← ───────────────────────────────────────── MONTAR MENSAGEM COM ANEXOS P (era js/13-async-function-montarmensagemc.js)
js/75-function-criarchat.js← ───────────────────────────────────────── GERENCIAR CHATS ──────────── (era js/14-function-criarchat.js)
js/80-function-montarcontexto-chat-n.js← ───────────────────────────────────────── MONTAR CONTEXTO PARA IA ──── (era js/15-function-montarcontexto-chat-n.js)
js/85-async-function-enviarmensagem.js← ───────────────────────────────────────── ENVIAR MENSAGEM ──────────── (era js/16-async-function-enviarmensagem-.js)
js/90-function-exportarchat.js← ───────────────────────────────────────── EXPORTAR / IMPORTAR CHAT ─── (era js/17-function-exportarchat.js)
js/91-function-exportarconfig.js← ───────────────────────────────────────── EXPORTAR / IMPORTAR CONFIGUR (era js/18-function-exportarconfig.js)
js/92-const-app.js    ← ───────────────────────────────────────── ESTADO GLOBAL DO APP ─────── (era js/19-const-app.js)
js/93-function-renderizarmensagem-ms.js← ───────────────────────────────────────── RENDERIZAÇÃO ─────────────── (era js/20-function-renderizarmensagem-ms.js)
js/94-async-function-abrirchat-id.js← ───────────────────────────────────────── AÇÕES DO CHAT ────────────── (era js/21-async-function-abrirchat-id.js)
js/95-function-togglesidebar.js← ───────────────────────────────────────── SIDEBAR ──────────────────── (era js/22-function-togglesidebar.js)
js/96-function-abrirconfig.js← ───────────────────────────────────────── CONFIGURAÇÕES ────────────── (era js/23-function-abrirconfig.js)
js/97-async-function-popularselectmo.js← ───────────────────────────────────────── SELECT DE MODELOS ────────── (era js/24-async-function-popularselectmo.js)
js/98-function-adicionaranexoui-anex.js← ───────────────────────────────────────── FILA DE ANEXOS (UI) ──────── (era js/25-function-adicionaranexoui-anex.js)
js/98-let-reconhecimento-null.js← logica (era js/26-let-reconhecimento-null.js)
js/98-function-ajustaralturacampo.js← ───────────────────────────────────────── AJUSTAR ALTURA DO CAMPO DE T (era js/27-function-ajustaralturacampo.js)
js/98-function-registrareventos.js← ───────────────────────────────────────── EVENTOS ──────────────────── (era js/28-function-registrareventos.js)
js/98-function-enviarmensagemui.js← ───────────────────────────────────────── ENVIAR MENSAGEM (UI) ─────── (era js/29-function-enviarmensagemui.js)
js/98-async-function-init.js← ───────────────────────────────────────── INICIALIZAÇÃO ────────────── (era js/30-async-function-init.js)
js/98-let-reconhecimento-null.js← ───────────────────────────────────────── VOZ (RECONHECIMENTO DE FALA) (era js/31-let-reconhecimento-null.js)
js/98-async-function-init.js← Iniciar quando DOM estiver pronto (era js/32-async-function-init.js)
js/98-hub.js          ← Index (1)-modular — Index (1)-modular (era hub.html)
js/98-inicio.js       ← AI Studio — AI Studio (era index.html)
js/99-app.js          ← o último: monta a tela com o que embarcou
```

## 3. As partes, uma por uma

| # | Era | Vira | Tipo | O que faz | Usa |
|---|---|---|---|---|---|
| 1 | `js/03-const-db.js` | `js/10-const-db.js` | dados | ───────────────────────────────────────── STORAGE — IndexedDB com fallback localStorage ── | — |
| 2 | `js/01-const-id-document-getelementby.js` | `js/15-const-id-document-getelementby.js` | logica | toast, gerarId, formatarData, formatarTokens | — |
| 3 | `js/02-const-id-document-getelementby.js` | `js/20-const-id-document-getelementby.js` | logica | ───────────────────────────────────────── UTILITÁRIOS GERAIS ───────────────────────────── | — |
| 4 | `js/04-function-detectarprovedor-chav.js` | `js/25-function-detectarprovedor-chav.js` | logica | ───────────────────────────────────────── DETECTAR PROVEDOR PELA CHAVE ─────────────────── | — |
| 5 | `js/05-openai-monica-groq-deepseek-op.js` | `js/30-openai-monica-groq-deepseek-op.js` | logica | ───────────────────────────────────────── CHAMADAS DE API ──────────────────────────────── | — |
| 6 | `js/06-openai-monica-groq-deepseek-op.js` | `js/35-openai-monica-groq-deepseek-op.js` | logica | Carregar modelos Ollama dinamicamente | — |
| 7 | `js/07-async-function-chamaria-proved.js` | `js/40-async-function-chamaria-proved.js` | logica | ───────────────────────────────────────── FUNÇÃO PRINCIPAL — CHAMAR IA ─────────────────── | — |
| 8 | `js/08-const-provedores.js` | `js/45-const-provedores.js` | logica | ───────────────────────────────────────── CONFIGURAÇÃO DOS PROVEDORES ──────────────────── | — |
| 9 | `js/09-comprime-imagem-e-retorna-base.js` | `js/50-comprime-imagem-e-retorna-base.js` | logica | ───────────────────────────────────────── PROCESSAMENTO DE IMAGEM ──────────────────────── | — |
| 10 | `js/10-detectar-encoding-e-ler-arquiv.js` | `js/55-detectar-encoding-e-ler-arquiv.js` | logica | ───────────────────────────────────────── PROCESSAMENTO DE ARQUIVOS DE TEXTO ───────────── | — |
| 11 | `js/11-ler-zip-sem-biblioteca-externa.js` | `js/60-ler-zip-sem-biblioteca-externa.js` | logica | ───────────────────────────────────────── PROCESSAMENTO DE ZIP ─────────────────────────── | — |
| 12 | `js/12-async-function-processaranexo-.js` | `js/65-async-function-processaranexo.js` | logica | ───────────────────────────────────────── PROCESSAR QUALQUER ARQUIVO ANEXADO ───────────── | — |
| 13 | `js/13-async-function-montarmensagemc.js` | `js/70-async-function-montarmensagemc.js` | logica | ───────────────────────────────────────── MONTAR MENSAGEM COM ANEXOS PARA A IA ─────────── | — |
| 14 | `js/14-function-criarchat.js` | `js/75-function-criarchat.js` | logica | ───────────────────────────────────────── GERENCIAR CHATS ──────────────────────────────── | — |
| 15 | `js/15-function-montarcontexto-chat-n.js` | `js/80-function-montarcontexto-chat-n.js` | logica | ───────────────────────────────────────── MONTAR CONTEXTO PARA IA ──────────────────────── | — |
| 16 | `js/16-async-function-enviarmensagem-.js` | `js/85-async-function-enviarmensagem.js` | logica | ───────────────────────────────────────── ENVIAR MENSAGEM ──────────────────────────────── | — |
| 17 | `js/17-function-exportarchat.js` | `js/90-function-exportarchat.js` | logica | ───────────────────────────────────────── EXPORTAR / IMPORTAR CHAT ─────────────────────── | — |
| 18 | `js/18-function-exportarconfig.js` | `js/91-function-exportarconfig.js` | logica | ───────────────────────────────────────── EXPORTAR / IMPORTAR CONFIGURAÇÕES ────────────── | — |
| 19 | `js/19-const-app.js` | `js/92-const-app.js` | logica | ───────────────────────────────────────── ESTADO GLOBAL DO APP ─────────────────────────── | — |
| 20 | `js/20-function-renderizarmensagem-ms.js` | `js/93-function-renderizarmensagem-ms.js` | logica | ───────────────────────────────────────── RENDERIZAÇÃO ─────────────────────────────────── | — |
| 21 | `js/21-async-function-abrirchat-id.js` | `js/94-async-function-abrirchat-id.js` | logica | ───────────────────────────────────────── AÇÕES DO CHAT ────────────────────────────────── | — |
| 22 | `js/22-function-togglesidebar.js` | `js/95-function-togglesidebar.js` | logica | ───────────────────────────────────────── SIDEBAR ──────────────────────────────────────── | — |
| 23 | `js/23-function-abrirconfig.js` | `js/96-function-abrirconfig.js` | logica | ───────────────────────────────────────── CONFIGURAÇÕES ────────────────────────────────── | — |
| 24 | `js/24-async-function-popularselectmo.js` | `js/97-async-function-popularselectmo.js` | logica | ───────────────────────────────────────── SELECT DE MODELOS ────────────────────────────── | — |
| 25 | `js/25-function-adicionaranexoui-anex.js` | `js/98-function-adicionaranexoui-anex.js` | logica | ───────────────────────────────────────── FILA DE ANEXOS (UI) ──────────────────────────── | — |
| 26 | `js/26-let-reconhecimento-null.js` | `js/98-let-reconhecimento-null.js` | logica | iniciarVoz | — |
| 27 | `js/27-function-ajustaralturacampo.js` | `js/98-function-ajustaralturacampo.js` | logica | ───────────────────────────────────────── AJUSTAR ALTURA DO CAMPO DE TEXTO ─────────────── | — |
| 28 | `js/28-function-registrareventos.js` | `js/98-function-registrareventos.js` | logica | ───────────────────────────────────────── EVENTOS ──────────────────────────────────────── | — |
| 29 | `js/29-function-enviarmensagemui.js` | `js/98-function-enviarmensagemui.js` | logica | ───────────────────────────────────────── ENVIAR MENSAGEM (UI) ─────────────────────────── | — |
| 30 | `js/30-async-function-init.js` | `js/98-async-function-init.js` | logica | ───────────────────────────────────────── INICIALIZAÇÃO ────────────────────────────────── | — |
| 31 | `js/31-let-reconhecimento-null.js` | `js/98-let-reconhecimento-null.js` | logica | ───────────────────────────────────────── VOZ (RECONHECIMENTO DE FALA) ─────────────────── | — |
| 32 | `js/32-async-function-init.js` | `js/98-async-function-init.js` | logica | Iniciar quando DOM estiver pronto | — |
| 33 | `hub.html` | `js/98-hub.js` | tela | Index (1)-modular — Index (1)-modular | hub.webmanifest, favicon.ico, icon.svg, apple-touch-icon.png |
| 34 | `css/01-estilo.css` | css/app.css | estilo | ═══════════════════════════════════════ RESET E BASE ═════════════════════════════════════ | — |
| 35 | `index.html` | `js/98-inicio.js` | tela | AI Studio — AI Studio | 01-estilo.css, manifest.json, favicon.ico, icon.svg |

## 4. Montar passo a passo (cada bloco é um pedido pronto: 📋 Copiar → colar na IA)

### Passo 0 — combinar as regras com a IA

```text
Vamos recriar o app "AI Studio" como HTML MODULAR, que abre pelo index.html, sem servidor e sem nada da Replit.
Regras: (1) index.html chama os arquivos js/ na ordem, antes do </body>; (2) js/00-core.js cria window.APP com APP.registrar(modulo), APP.guardar(chave, valor) em IndexedDB/localStorage e APP.avisar(texto); (3) cada arquivo js/NN-nome.js cuida de UM assunto, começa com (function (APP) { e termina com })(window.APP); (4) js/99-app.js vem por último e monta a tela com os módulos registrados; (5) textos em português do Brasil.
Vou pedir UM arquivo por vez. Responda só com o arquivo completo, sem cortar nada. Primeiro: crie index.html, css/app.css e js/00-core.js.
```

### Passo 1 — `js/10-const-db.js` (era `js/03-const-db.js`, 148 linhas)

```text
Crie js/10-const-db.js. Ele faz: ───────────────────────────────────────── STORAGE — IndexedDB com fallback localStorage ─────────────────────────────────────────.
No app original ele tinha estas funções/partes: abrir, salvarChat, listarChats, carregarChat, apagarChat, apagarTodosChats, salvarConfig, carregarConfig, limparTudo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 2 — `js/15-const-id-document-getelementby.js` (era `js/01-const-id-document-getelementby.js`, 120 linhas)

```text
Crie js/15-const-id-document-getelementby.js. Ele é uma parte de logica do app.
No app original ele tinha estas funções/partes: toast, gerarId, formatarData, formatarTokens, copiarTexto, baixarArquivo, sanitizarHTML, markdownParaHTML.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 3 — `js/20-const-id-document-getelementby.js` (era `js/02-const-id-document-getelementby.js`, 6 linhas)

```text
Crie js/20-const-id-document-getelementby.js. Ele faz: ───────────────────────────────────────── UTILITÁRIOS GERAIS ─────────────────────────────────────────.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 4 — `js/25-function-detectarprovedor-chav.js` (era `js/04-function-detectarprovedor-chav.js`, 21 linhas)

```text
Crie js/25-function-detectarprovedor-chav.js. Ele faz: ───────────────────────────────────────── DETECTAR PROVEDOR PELA CHAVE ─────────────────────────────────────────.
No app original ele tinha estas funções/partes: detectarProvedor, modeloSuportaVisao.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 5 — `js/30-openai-monica-groq-deepseek-op.js` (era `js/05-openai-monica-groq-deepseek-op.js`, 168 linhas)

```text
Crie js/30-openai-monica-groq-deepseek-op.js. Ele faz: ───────────────────────────────────────── CHAMADAS DE API ─────────────────────────────────────────.
No app original ele tinha estas funções/partes: chamarOpenAI, chamarGemini, chamarClaude, chamarOllama.
Ele chamava estes endereços: ${baseURL}/chat/completions, https://api.anthropic.com/v1/messages. Em HTML, ligue cada um à função equivalente do módulo certo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 6 — `js/35-openai-monica-groq-deepseek-op.js` (era `js/06-openai-monica-groq-deepseek-op.js`, 15 linhas)

```text
Crie js/35-openai-monica-groq-deepseek-op.js. Ele faz: Carregar modelos Ollama dinamicamente.
No app original ele tinha estas funções/partes: carregarModelosOllama.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 7 — `js/40-async-function-chamaria-proved.js` (era `js/07-async-function-chamaria-proved.js`, 51 linhas)

```text
Crie js/40-async-function-chamaria-proved.js. Ele faz: ───────────────────────────────────────── FUNÇÃO PRINCIPAL — CHAMAR IA ─────────────────────────────────────────.
No app original ele tinha estas funções/partes: chamarIA, testarConexao.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 8 — `js/45-const-provedores.js` (era `js/08-const-provedores.js`, 109 linhas)

```text
Crie js/45-const-provedores.js. Ele faz: ───────────────────────────────────────── CONFIGURAÇÃO DOS PROVEDORES ─────────────────────────────────────────.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 9 — `js/50-comprime-imagem-e-retorna-base.js` (era `js/09-comprime-imagem-e-retorna-base.js`, 100 linhas)

```text
Crie js/50-comprime-imagem-e-retorna-base.js. Ele faz: ───────────────────────────────────────── PROCESSAMENTO DE IMAGEM ─────────────────────────────────────────.
No app original ele tinha estas funções/partes: comprimirImagem, imagemParaTexto.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 10 — `js/55-detectar-encoding-e-ler-arquiv.js` (era `js/10-detectar-encoding-e-ler-arquiv.js`, 32 linhas)

```text
Crie js/55-detectar-encoding-e-ler-arquiv.js. Ele faz: ───────────────────────────────────────── PROCESSAMENTO DE ARQUIVOS DE TEXTO ─────────────────────────────────────────.
No app original ele tinha estas funções/partes: lerArquivoTexto.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 11 — `js/60-ler-zip-sem-biblioteca-externa.js` (era `js/11-ler-zip-sem-biblioteca-externa.js`, 90 linhas)

```text
Crie js/60-ler-zip-sem-biblioteca-externa.js. Ele faz: ───────────────────────────────────────── PROCESSAMENTO DE ZIP ─────────────────────────────────────────.
No app original ele tinha estas funções/partes: lerZIP.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 12 — `js/65-async-function-processaranexo.js` (era `js/12-async-function-processaranexo-.js`, 70 linhas)

```text
Crie js/65-async-function-processaranexo.js. Ele faz: ───────────────────────────────────────── PROCESSAR QUALQUER ARQUIVO ANEXADO ─────────────────────────────────────────.
No app original ele tinha estas funções/partes: processarAnexo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 13 — `js/70-async-function-montarmensagemc.js` (era `js/13-async-function-montarmensagemc.js`, 52 linhas)

```text
Crie js/70-async-function-montarmensagemc.js. Ele faz: ───────────────────────────────────────── MONTAR MENSAGEM COM ANEXOS PARA A IA ─────────────────────────────────────────.
No app original ele tinha estas funções/partes: montarMensagemComAnexos.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 14 — `js/75-function-criarchat.js` (era `js/14-function-criarchat.js`, 35 linhas)

```text
Crie js/75-function-criarchat.js. Ele faz: ───────────────────────────────────────── GERENCIAR CHATS ─────────────────────────────────────────.
No app original ele tinha estas funções/partes: criarChat, salvarChatAtual, carregarTodosChats, gerarTituloChat.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 15 — `js/80-function-montarcontexto-chat-n.js` (era `js/15-function-montarcontexto-chat-n.js`, 28 linhas)

```text
Crie js/80-function-montarcontexto-chat-n.js. Ele faz: ───────────────────────────────────────── MONTAR CONTEXTO PARA IA ─────────────────────────────────────────.
No app original ele tinha estas funções/partes: montarContexto.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 16 — `js/85-async-function-enviarmensagem.js` (era `js/16-async-function-enviarmensagem-.js`, 135 linhas)

```text
Crie js/85-async-function-enviarmensagem.js. Ele faz: ───────────────────────────────────────── ENVIAR MENSAGEM ─────────────────────────────────────────.
No app original ele tinha estas funções/partes: enviarMensagem.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 17 — `js/90-function-exportarchat.js` (era `js/17-function-exportarchat.js`, 35 linhas)

```text
Crie js/90-function-exportarchat.js. Ele faz: ───────────────────────────────────────── EXPORTAR / IMPORTAR CHAT ─────────────────────────────────────────.
No app original ele tinha estas funções/partes: exportarChat, importarChat.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 18 — `js/91-function-exportarconfig.js` (era `js/18-function-exportarconfig.js`, 33 linhas)

```text
Crie js/91-function-exportarconfig.js. Ele faz: ───────────────────────────────────────── EXPORTAR / IMPORTAR CONFIGURAÇÕES ─────────────────────────────────────────.
No app original ele tinha estas funções/partes: exportarConfig, importarConfig.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 19 — `js/92-const-app.js` (era `js/19-const-app.js`, 23 linhas)

```text
Crie js/92-const-app.js. Ele faz: ───────────────────────────────────────── ESTADO GLOBAL DO APP ─────────────────────────────────────────.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 20 — `js/93-function-renderizarmensagem-ms.js` (era `js/20-function-renderizarmensagem-ms.js`, 160 linhas)

```text
Crie js/93-function-renderizarmensagem-ms.js. Ele faz: ───────────────────────────────────────── RENDERIZAÇÃO ─────────────────────────────────────────.
No app original ele tinha estas funções/partes: renderizarMensagem, renderizarChat, renderizarListaChats, mostrarDigitando, removerDigitando, scrollParaBaixo, atualizarBadgeTokens.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 21 — `js/94-async-function-abrirchat-id.js` (era `js/21-async-function-abrirchat-id.js`, 60 linhas)

```text
Crie js/94-async-function-abrirchat-id.js. Ele faz: ───────────────────────────────────────── AÇÕES DO CHAT ─────────────────────────────────────────.
No app original ele tinha estas funções/partes: abrirChat, novoChat, apagarChat, regenerarMensagem, abrirLightbox.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 22 — `js/95-function-togglesidebar.js` (era `js/22-function-togglesidebar.js`, 21 linhas)

```text
Crie js/95-function-togglesidebar.js. Ele faz: ───────────────────────────────────────── SIDEBAR ─────────────────────────────────────────.
No app original ele tinha estas funções/partes: toggleSidebar, fecharSidebarMobile.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 23 — `js/96-function-abrirconfig.js` (era `js/23-function-abrirconfig.js`, 79 linhas)

```text
Crie js/96-function-abrirconfig.js. Ele faz: ───────────────────────────────────────── CONFIGURAÇÕES ─────────────────────────────────────────.
No app original ele tinha estas funções/partes: abrirConfig, fecharConfig, aplicarConfiguracoes, salvarConfiguracoes, carregarConfiguracoesSalvas.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 24 — `js/97-async-function-popularselectmo.js` (era `js/24-async-function-popularselectmo.js`, 46 linhas)

```text
Crie js/97-async-function-popularselectmo.js. Ele faz: ───────────────────────────────────────── SELECT DE MODELOS ─────────────────────────────────────────.
No app original ele tinha estas funções/partes: popularSelectModelos.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 25 — `js/98-function-adicionaranexoui-anex.js` (era `js/25-function-adicionaranexoui-anex.js`, 43 linhas)

```text
Crie js/98-function-adicionaranexoui-anex.js. Ele faz: ───────────────────────────────────────── FILA DE ANEXOS (UI) ─────────────────────────────────────────.
No app original ele tinha estas funções/partes: adicionarAnexoUI, removerAnexo, limparFilaAnexos.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 26 — `js/98-let-reconhecimento-null.js` (era `js/26-let-reconhecimento-null.js`, 41 linhas)

```text
Crie js/98-let-reconhecimento-null.js. Ele é uma parte de logica do app.
No app original ele tinha estas funções/partes: iniciarVoz.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 27 — `js/98-function-ajustaralturacampo.js` (era `js/27-function-ajustaralturacampo.js`, 9 linhas)

```text
Crie js/98-function-ajustaralturacampo.js. Ele faz: ───────────────────────────────────────── AJUSTAR ALTURA DO CAMPO DE TEXTO ─────────────────────────────────────────.
No app original ele tinha estas funções/partes: ajustarAlturaCampo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 28 — `js/98-function-registrareventos.js` (era `js/28-function-registrareventos.js`, 155 linhas)

```text
Crie js/98-function-registrareventos.js. Ele faz: ───────────────────────────────────────── EVENTOS ─────────────────────────────────────────.
No app original ele tinha estas funções/partes: registrarEventos.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 29 — `js/98-function-enviarmensagemui.js` (era `js/29-function-enviarmensagemui.js`, 16 linhas)

```text
Crie js/98-function-enviarmensagemui.js. Ele faz: ───────────────────────────────────────── ENVIAR MENSAGEM (UI) ─────────────────────────────────────────.
No app original ele tinha estas funções/partes: enviarMensagemUI.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 30 — `js/98-async-function-init.js` (era `js/30-async-function-init.js`, 42 linhas)

```text
Crie js/98-async-function-init.js. Ele faz: ───────────────────────────────────────── INICIALIZAÇÃO ─────────────────────────────────────────.
No app original ele tinha estas funções/partes: init.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 31 — `js/98-let-reconhecimento-null.js` (era `js/31-let-reconhecimento-null.js`, 6 linhas)

```text
Crie js/98-let-reconhecimento-null.js. Ele faz: ───────────────────────────────────────── VOZ (RECONHECIMENTO DE FALA) ─────────────────────────────────────────.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 32 — `js/98-async-function-init.js` (era `js/32-async-function-init.js`, 3 linhas)

```text
Crie js/98-async-function-init.js. Ele faz: Iniciar quando DOM estiver pronto.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 33 — `js/98-hub.js` (era `hub.html`, 81 linhas)

```text
Crie js/98-hub.js. Ele faz: Index (1)-modular — Index (1)-modular.
No app original ele tinha estas funções/partes: rec, esc, card, show.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 34 — `js/98-inicio.js` (era `index.html`, 242 linhas)

```text
Crie js/98-inicio.js. Ele faz: AI Studio — AI Studio.
Ele usa o que já foi criado em: js/15-const-id-document-getelementby.js, js/20-const-id-document-getelementby.js, js/10-const-db.js, js/25-function-detectarprovedor-chav.js, js/30-openai-monica-groq-deepseek-op.js, js/35-openai-monica-groq-deepseek-op.js, js/40-async-function-chamaria-proved.js, js/45-const-provedores.js, js/50-comprime-imagem-e-retorna-base.js, js/55-detectar-encoding-e-ler-arquiv.js, js/60-ler-zip-sem-biblioteca-externa.js, js/65-async-function-processaranexo.js, js/70-async-function-montarmensagemc.js, js/75-function-criarchat.js, js/80-function-montarcontexto-chat-n.js, js/85-async-function-enviarmensagem.js, js/90-function-exportarchat.js, js/91-function-exportarconfig.js, js/92-const-app.js, js/93-function-renderizarmensagem-ms.js, js/94-async-function-abrirchat-id.js, js/95-function-togglesidebar.js, js/96-function-abrirconfig.js, js/97-async-function-popularselectmo.js, js/98-function-adicionaranexoui-anex.js, js/98-let-reconhecimento-null.js, js/98-function-ajustaralturacampo.js, js/98-function-registrareventos.js, js/98-function-enviarmensagemui.js, js/98-async-function-init.js, js/98-let-reconhecimento-null.js, js/98-async-function-init.js (pelo APP).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 35 — `js/99-app.js` e conferir

```text
Crie js/99-app.js: ele olha APP.modulos e monta o menu/abas com um botão para cada módulo. Depois, me mande o index.html atualizado com todos os <script src="js/…"> na ordem certa: js/00-core.js, js/10-const-db.js, js/15-const-id-document-getelementby.js, js/20-const-id-document-getelementby.js, js/25-function-detectarprovedor-chav.js, js/30-openai-monica-groq-deepseek-op.js, js/35-openai-monica-groq-deepseek-op.js, js/40-async-function-chamaria-proved.js, js/45-const-provedores.js, js/50-comprime-imagem-e-retorna-base.js, js/55-detectar-encoding-e-ler-arquiv.js, js/60-ler-zip-sem-biblioteca-externa.js, js/65-async-function-processaranexo.js, js/70-async-function-montarmensagemc.js, js/75-function-criarchat.js, js/80-function-montarcontexto-chat-n.js, js/85-async-function-enviarmensagem.js, js/90-function-exportarchat.js, js/91-function-exportarconfig.js, js/92-const-app.js, js/93-function-renderizarmensagem-ms.js, js/94-async-function-abrirchat-id.js, js/95-function-togglesidebar.js, js/96-function-abrirconfig.js, js/97-async-function-popularselectmo.js, js/98-function-adicionaranexoui-anex.js, js/98-let-reconhecimento-null.js, js/98-function-ajustaralturacampo.js, js/98-function-registrareventos.js, js/98-function-enviarmensagemui.js, js/98-async-function-init.js, js/98-let-reconhecimento-null.js, js/98-async-function-init.js, js/98-hub.js, js/98-inicio.js, js/99-app.js.
```

## 5. Conferir no final

- [ ] Abrir o index.html na prévia: aparece a tela sem erro (▤ console vazio)?
- [ ] Cada botão abre a sua parte?
- [ ] Fechar e abrir de novo: os dados continuam?
- [ ] Nada com "replit", "REPL_", "@workspace" no código (🏗️ Preparar confere).
- [ ] 📱 PWA → deixar instalável; 📦 APK ou 🖥️ .exe.
