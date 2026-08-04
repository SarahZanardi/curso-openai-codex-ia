const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
  menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false');
}));
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(item => observer.observe(item));

// Posicionamento profissional da instrutora
const instructorRole = document.querySelector('.instructor .role');
if (instructorRole) instructorRole.textContent = 'Data Engineer · Analytics & Data Specialist';
const instructorText = document.querySelector('.instructor-copy > p:not(.eyebrow):not(.role)');
if (instructorText) instructorText.textContent = 'Data Engineer apaixonada por transformar dados em soluções práticas. Atua com Microsoft Fabric, Data Platforms, Oracle OCI, Google Cloud (GCP), SQL e PySpark — conectando engenharia, automação e Inteligência Artificial para resolver problemas reais.';
if (instructorText) {
  const tags = document.createElement('div');
  tags.className = 'stack-tags';
  ['Microsoft Fabric','Data Platforms','Oracle OCI','Google Cloud','SQL','PySpark'].forEach(label => { const tag = document.createElement('span'); tag.textContent = label; tags.appendChild(tag); });
  instructorText.after(tags);
}
