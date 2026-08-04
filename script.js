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

const syllabus = [
  ['Fundamentos e arquitetura', 'Compreenda como o OpenAI Codex funciona e onde aplicá-lo.'],
  ['Engenharia de prompts', 'Crie e otimize prompts para obter códigos mais precisos.'],
  ['Aplicações completas', 'Desenvolva projetos práticos com assistência de IA.'],
  ['Debug automatizado', 'Identifique, debuge e corrija erros com mais agilidade.'],
  ['Análise de dados', 'Aplique o Codex em tarefas complexas com dados e SQL.'],
  ['Automação de processos', 'Transforme tarefas repetitivas em fluxos inteligentes.'],
  ['Segurança e mitigação', 'Adote boas práticas e reduza riscos no desenvolvimento.'],
  ['Projeto final hands-on', 'Consolide o aprendizado criando uma solução real.']
];
document.querySelectorAll('.learning-card').forEach((card, index) => {
  if (!syllabus[index]) return;
  const title = card.querySelector('h3'); const description = card.querySelector('p');
  if (title) title.textContent = syllabus[index][0];
  if (description) description.textContent = syllabus[index][1];
});
const portrait = document.querySelector('.portrait-inner');
if (portrait) portrait.innerHTML = '<img src="assets/sarah-zanardi.jfif" alt="Sarah Zanardi, Data Engineer" loading="lazy">';

// Navegação contextual e retorno rápido ao topo
const header = document.querySelector('.site-header');
const sectionLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const linkedSections = sectionLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
const updateNavigation = () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 16);
  let current = linkedSections[0]?.id;
  linkedSections.forEach(section => { if (window.scrollY >= section.offsetTop - 150) current = section.id; });
  sectionLinks.forEach(link => {
    const active = link.getAttribute('href') === `#${current}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
  });
};
window.addEventListener('scroll', updateNavigation, { passive: true });
updateNavigation();

const backToTop = document.createElement('a');
backToTop.className = 'back-to-top';
backToTop.href = '#inicio';
backToTop.setAttribute('aria-label', 'Voltar ao início');
backToTop.textContent = '↑';
document.body.appendChild(backToTop);
window.addEventListener('scroll', () => backToTop.classList.toggle('show', window.scrollY > 650), { passive: true });
