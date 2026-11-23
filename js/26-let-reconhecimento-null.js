function iniciarVoz() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { toast('⚠️ Seu navegador não suporta reconhecimento de voz'); return; }

  if (gravando) {
    reconhecimento?.stop();
    return;
  }

  reconhecimento = new SR();
  reconhecimento.lang = 'pt-BR';
  reconhecimento.continuous = false;
  reconhecimento.interimResults = false;

  reconhecimento.onstart = () => {
    gravando = true;
    $('btn-voz').classList.add('gravando');
    toast('🎤 Ouvindo...');
  };

  reconhecimento.onresult = e => {
    const texto = e.results[0][0].transcript;
    const campo = $('campo-texto');
    campo.value += (campo.value ? ' ' : '') + texto;
    ajustarAlturaCampo();
  };

  reconhecimento.onend = () => {
    gravando = false;
    $('btn-voz').classList.remove('gravando');
  };

  reconhecimento.onerror = e => {
    gravando = false;
    $('btn-voz').classList.remove('gravando');
    if (e.error !== 'no-speech') toast('❌ Erro no microfone: ' + e.error);
  };

  reconhecimento.start();
}
