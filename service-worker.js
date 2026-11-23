// service-worker.js — gerado pelo Mini SK em 23/11/2026, 18:07:37
// Não precisa mexer: ele guarda sozinho o que o app usa.
const PREFIXO = 'sk-index-1-modular-';
const CACHE = PREFIXO + 'mwtrbnep';
// Lista feita automaticamente (para funcionar sem internet logo após instalar)
const GUARDAR = [
  "./",
  "./css/01-estilo.css",
  "./favicon.ico",
  "./hub.html",
  "./hub.webmanifest",
  "./icons/apple-touch-icon.png",
  "./icons/icon-16.png",
  "./icons/icon-32.png",
  "./icons/icon-48.png",
  "./icons/icon-72.png",
  "./icons/icon-96.png",
  "./icons/icon-128.png",
  "./icons/icon-144.png",
  "./icons/icon-152.png",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-384.png",
  "./icons/icon-512.png",
  "./icons/icon.svg",
  "./icons/maskable-192.png",
  "./icons/maskable-512.png",
  "./icons/maskable.svg",
  "./index.html",
  "./js/01-const-id-document-getelementby.js",
  "./js/02-const-id-document-getelementby.js",
  "./js/03-const-db.js",
  "./js/04-function-detectarprovedor-chav.js",
  "./js/05-openai-monica-groq-deepseek-op.js",
  "./js/06-openai-monica-groq-deepseek-op.js",
  "./js/07-async-function-chamaria-proved.js",
  "./js/08-const-provedores.js",
  "./js/09-comprime-imagem-e-retorna-base.js",
  "./js/10-detectar-encoding-e-ler-arquiv.js",
  "./js/11-ler-zip-sem-biblioteca-externa.js",
  "./js/12-async-function-processaranexo-.js",
  "./js/13-async-function-montarmensagemc.js",
  "./js/14-function-criarchat.js",
  "./js/15-function-montarcontexto-chat-n.js",
  "./js/16-async-function-enviarmensagem-.js",
  "./js/17-function-exportarchat.js",
  "./js/18-function-exportarconfig.js",
  "./js/19-const-app.js",
  "./js/20-function-renderizarmensagem-ms.js",
  "./js/21-async-function-abrirchat-id.js",
  "./js/22-function-togglesidebar.js",
  "./js/23-function-abrirconfig.js",
  "./js/24-async-function-popularselectmo.js",
  "./js/25-function-adicionaranexoui-anex.js",
  "./js/26-let-reconhecimento-null.js",
  "./js/27-function-ajustaralturacampo.js",
  "./js/28-function-registrareventos.js",
  "./js/29-function-enviarmensagemui.js",
  "./js/30-async-function-init.js",
  "./js/31-let-reconhecimento-null.js",
  "./js/32-async-function-init.js",
  "./manifest.json",
  "./PLANO.md"
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(GUARDAR.map((u) => c.add(u).catch(() => null)))));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((ks) => Promise.all(ks.filter((k) => k.startsWith(PREFIXO) && k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Primeiro a internet (sempre a versão nova); sem internet, a cópia guardada.
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req).then((res) => {
      if (res.ok) { const copia = res.clone(); caches.open(CACHE).then((c) => c.put(req, copia)); }
      // Igual ao Workbox da Replit: página que não existe (rota do app) abre o index
      if (res.status === 404 && req.mode === 'navigate') return caches.match('./').then((r) => r || fetch('./'));
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || (req.mode === 'navigate' ? caches.match('./') : undefined)))
  );
});
