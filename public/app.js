const el = document.getElementById('buildTime');
if (el) {
  el.textContent = new Date().toLocaleString();
}
