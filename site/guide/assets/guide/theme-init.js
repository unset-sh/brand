// Apply the saved appearance before paint without a remote script or inline policy exception.
try {
  document.documentElement.dataset.theme = localStorage.getItem('unset-brand-theme') === 'light' ? 'light' : 'dark';
} catch {}
