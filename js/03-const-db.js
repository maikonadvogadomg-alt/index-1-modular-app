// ─────────────────────────────────────────
// STORAGE — IndexedDB com fallback localStorage
// ─────────────────────────────────────────
const DB = (() => {
  const NOME = 'AIStudio';
  const VER  = 1;
  let db = null;

  function abrir() {
    return new Promise((ok, err) => {
      if (db) return ok(db);
      const req = indexedDB.open(NOME, VER);
      req.onupgradeneeded = e => {
        const d = e.target.result;
        if (!d.objectStoreNames.contains('chats'))
          d.createObjectStore('chats', { keyPath: 'id' });
        if (!d.objectStoreNames.contains('config'))
          d.createObjectStore('config', { keyPath: 'chave' });
      };
      req.onsuccess = e => { db = e.target.result; ok(db); };
      req.onerror   = () => err(req.error);
    });
  }

  async function salvarChat(chat) {
    try {
      const d = await abrir();
      return new Promise((ok, err) => {
        const tx = d.transaction('chats', 'readwrite');
        tx.objectStore('chats').put(chat);
        tx.oncomplete = ok;
        tx.onerror = () => err(tx.error);
      });
    } catch {
      // fallback localStorage
      const chats = JSON.parse(localStorage.getItem('ai_chats') || '{}');
      chats[chat.id] = chat;
      localStorage.setItem('ai_chats', JSON.stringify(chats));
    }
  }

  async function listarChats() {
    try {
      const d = await abrir();
      return new Promise((ok, err) => {
        const tx = d.transaction('chats', 'readonly');
        const req = tx.objectStore('chats').getAll();
        req.onsuccess = () => ok(req.result || []);
        req.onerror   = () => err(req.error);
      });
    } catch {
      const chats = JSON.parse(localStorage.getItem('ai_chats') || '{}');
      return Object.values(chats);
    }
  }

  async function carregarChat(id) {
    try {
      const d = await abrir();
      return new Promise((ok, err) => {
        const tx = d.transaction('chats', 'readonly');
        const req = tx.objectStore('chats').get(id);
        req.onsuccess = () => ok(req.result || null);
        req.onerror   = () => err(req.error);
      });
    } catch {
      const chats = JSON.parse(localStorage.getItem('ai_chats') || '{}');
      return chats[id] || null;
    }
  }

  async function apagarChat(id) {
    try {
      const d = await abrir();
      return new Promise((ok, err) => {
        const tx = d.transaction('chats', 'readwrite');
        tx.objectStore('chats').delete(id);
        tx.oncomplete = ok;
        tx.onerror = () => err(tx.error);
      });
    } catch {
      const chats = JSON.parse(localStorage.getItem('ai_chats') || '{}');
      delete chats[id];
      localStorage.setItem('ai_chats', JSON.stringify(chats));
    }
  }

  async function apagarTodosChats() {
    try {
      const d = await abrir();
      return new Promise((ok, err) => {
        const tx = d.transaction('chats', 'readwrite');
        tx.objectStore('chats').clear();
        tx.oncomplete = ok;
        tx.onerror = () => err(tx.error);
      });
    } catch {
      localStorage.removeItem('ai_chats');
    }
  }

  async function salvarConfig(chave, valor) {
    try {
      const d = await abrir();
      return new Promise((ok, err) => {
        const tx = d.transaction('config', 'readwrite');
        tx.objectStore('config').put({ chave, valor });
        tx.oncomplete = ok;
        tx.onerror = () => err(tx.error);
      });
    } catch {
      localStorage.setItem('ai_cfg_' + chave, JSON.stringify(valor));
    }
  }

  async function carregarConfig(chave, padrao = null) {
    try {
      const d = await abrir();
      return new Promise((ok, err) => {
        const tx = d.transaction('config', 'readonly');
        const req = tx.objectStore('config').get(chave);
        req.onsuccess = () => ok(req.result ? req.result.valor : padrao);
        req.onerror   = () => err(req.error);
      });
    } catch {
      const v = localStorage.getItem('ai_cfg_' + chave);
      return v !== null ? JSON.parse(v) : padrao;
    }
  }

  async function limparTudo() {
    try {
      const d = await abrir();
      await new Promise((ok, err) => {
        const tx = d.transaction(['chats','config'], 'readwrite');
        tx.objectStore('chats').clear();
        tx.objectStore('config').clear();
        tx.oncomplete = ok;
        tx.onerror = () => err(tx.error);
      });
    } catch {}
    localStorage.clear();
  }

  return { salvarChat, listarChats, carregarChat, apagarChat,
           apagarTodosChats, salvarConfig, carregarConfig, limparTudo };
})();
