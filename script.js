/* ── NAVBAR SHRINK ── */
window.addEventListener('scroll', () => {
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 60);
});

/* ── HERO SLIDESHOW ── */
const slides  = document.querySelectorAll('.hero-slide');
const dotsWrap = document.getElementById('heroDots');
let current = 0, timer;

slides.forEach((_, i) => {
  const d = document.createElement('button');
  d.className = 'hero-dot' + (i === 0 ? ' active' : '');
  d.onclick = () => goTo(i);
  dotsWrap.appendChild(d);
});

function goTo(n) {
  slides[current].classList.remove('active');
  dotsWrap.children[current].classList.remove('active');
  current = (n + slides.length) % slides.length;
  slides[current].classList.add('active');
  dotsWrap.children[current].classList.add('active');
  clearInterval(timer);
  timer = setInterval(() => goTo(current + 1), 5000);
}

timer = setInterval(() => goTo(current + 1), 5000);

/* ── CARDÁPIO ── */
const pratos = [
  { nome:"Feijoada Completa",  desc:"Feijão preto, carnes selecionadas, couve refogada, farofa e laranja.",         preco:"R$ 59,90", img:"https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80", cat:"tradicional" },
  { nome:"Moqueca Baiana",     desc:"Peixe fresco no leite de coco, azeite de dendê e pimentões coloridos.",        preco:"R$ 69,90", img:"https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=80", cat:"tradicional" },
  { nome:"Frango Caipira",     desc:"Frango caipira ao forno com ervas frescas, alho assado e batata rústica.",     preco:"R$ 52,90", img:"https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?w=600&q=80", cat:"grelha"      },
  { nome:"Picanha na Brasa",   desc:"Picanha grelhada no ponto certo, com arroz branco e vinagrete especial.",      preco:"R$ 79,90", img:"https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80", cat:"grelha"      },
  { nome:"Feijão Tropeiro",    desc:"Feijão com bacon, linguiça, couve e ovo — do jeito mineiro de ser.",           preco:"R$ 48,90", img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80", cat:"tradicional" },
  { nome:"Pudim de Leite",     desc:"Pudim cremoso com calda de caramelo artesanal, feito na hora.",                preco:"R$ 18,90", img:"https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80", cat:"sobremesa"   },
  { nome:"Costela no Bafo",    desc:"Costela bovina assada lentamente por 12h, desfiada na hora.",                  preco:"R$ 84,90", img:"https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80", cat:"grelha"      },
  { nome:"Brigadeiro Gourmet", desc:"Trio de brigadeiros artesanais: chocolate belga, pistache e maracujá.",        preco:"R$ 22,90", img:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80", cat:"sobremesa"   },
];

function filtrar(btn, cat) {
  document.querySelectorAll('.ftab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  const lista = cat === 'todos' ? pratos : pratos.filter(p => p.cat === cat);
  document.getElementById('pratosGrid').innerHTML = lista.map(p => `
    <div class="col-sm-6 col-lg-3">
      <div class="prato-card">
        <img src="${p.img}" alt="${p.nome}" loading="lazy">
        <div class="prato-body">
          <div class="prato-nome">${p.nome}</div>
          <div class="prato-desc">${p.desc}</div>
          <div class="prato-preco">${p.preco}</div>
        </div>
      </div>
    </div>
  `).join('');
}

filtrar(document.querySelector('.ftab'), 'todos');

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));
