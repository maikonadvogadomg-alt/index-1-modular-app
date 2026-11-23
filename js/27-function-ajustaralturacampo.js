// ─────────────────────────────────────────
// AJUSTAR ALTURA DO CAMPO DE TEXTO
// ─────────────────────────────────────────
function ajustarAlturaCampo() {
  const campo = $('campo-texto');
  campo.style.height = 'auto';
  campo.style.height = Math.min(campo.scrollHeight, 160) + 'px';
}
