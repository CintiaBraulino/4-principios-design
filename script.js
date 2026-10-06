const progress = document.getElementById('progress');
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');

function updateProgress(){
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}
window.addEventListener('scroll', updateProgress, {passive:true});
updateProgress();

menuBtn.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));

const principleData = {
  contraste: {title:'Contraste', text:'Use diferenças de tamanho, peso, cor, forma ou direção para estabelecer uma hierarquia clara. Contraste não é enfeite: é uma ferramenta de atenção.'},
  repeticao: {title:'Repetição', text:'Repita padrões, componentes, estilos e comportamentos para criar unidade. O usuário reconhece o sistema e aprende mais rápido como ele funciona.'},
  alinhamento: {title:'Alinhamento', text:'Nada deve parecer colocado por acaso. Um eixo comum conecta elementos, cria ordem e ajuda o olhar a percorrer a interface.'},
  proximidade: {title:'Proximidade', text:'Elementos relacionados devem formar grupos perceptíveis. A distância entre blocos também comunica: aproxima para relacionar, separa para diferenciar.'}
};
const cards = document.querySelectorAll('.principle-card');
const detailTitle = document.getElementById('detailTitle');
const detailText = document.getElementById('detailText');
cards.forEach(card => {
  const activate = () => {
    cards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    const data = principleData[card.dataset.principle];
    detailTitle.textContent = data.title;
    detailText.textContent = data.text;
  };
  card.addEventListener('click', activate);
  card.addEventListener('mouseenter', activate);
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const toggleButtons = document.querySelectorAll('.toggle-btn');
const demo = document.getElementById('demoInterface');
toggleButtons.forEach(btn => btn.addEventListener('click', () => {
  toggleButtons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  demo.classList.toggle('problem', btn.dataset.view === 'problem');
  demo.classList.toggle('solution', btn.dataset.view === 'solution');
}));

demo.classList.add('problem');

// Pequeno efeito de movimento no herói, respeitando preferência de movimento reduzido.
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  const art = document.querySelector('.hero-art');
  window.addEventListener('pointermove', e => {
    const x = (e.clientX / window.innerWidth - .5) * 8;
    const y = (e.clientY / window.innerHeight - .5) * 8;
    art.style.transform = `translate(${x}px, ${y}px)`;
  }, {passive:true});
}
