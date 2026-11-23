// ─────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────
function toggleSidebar() {
  const sidebar = $('sidebar');
  const overlay = $('overlay-sidebar');
  const aberto = sidebar.classList.toggle('aberto');
  overlay.classList.toggle('visivel', aberto);
  // Desktop: empurra o main
  if (window.innerWidth > 640) {
    sidebar.classList.toggle('fechado', !aberto);
  }
}

function fecharSidebarMobile() {
  if (window.innerWidth <= 640) {
    $('sidebar').classList.remove('aberto');
    $('overlay-sidebar').classList.remove('visivel');
  }
}
