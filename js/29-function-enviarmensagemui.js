// ─────────────────────────────────────────
// ENVIAR MENSAGEM (UI)
// ─────────────────────────────────────────
function enviarMensagemUI() {
  const campo = $('campo-texto');
  const texto = campo.value.trim();
  const anexos = [...APP.anexosPendentes];

  if (!texto && anexos.length === 0) return;

  campo.value = '';
  ajustarAlturaCampo();

  enviarMensagem(texto, anexos);
}
