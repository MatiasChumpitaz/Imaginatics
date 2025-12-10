// script.js - comportamiento básico: renderiza productos, búsqueda y carrito simple

const products = [
  { id:1, title:"Mc Donalds - 01", price:53, img:"img/mc donalds pagina.jpg", category:"comics", tag:"-25%"},
  { id:2, title:"Toy Story 30 Aniv - 02", price:53, img:"img/toy story pagina.jpg", category:"peliculas", tag:"-25%"},
  { id:3, title:"Superman (2025) - 03", price:53, img:"img/superman pagina.jpg", category:"comics", tag:"-25%"},
  { id:4, title:"Gato Space - 04", price:53, img:"img/gato pagina.jpg", category:"dibujos", tag:"-25%"},
  { id:5, title:"Los Simpsons - 01", price:53, img:"img/los simpsons pagina.jpg", category:"peliculas", tag:"-25%"},
  { id:6, title:"La La Land", price:53, img:"img/la la land pagina.jpg", category:"peliculas", tag:"-25%"},
  { id:7, title:"Cristiano Ronaldo", price:53, img:"img/cristiano ronaldo pagina.jpg", category:"deportes", tag:"-25%"},
  { id:8, title:"Adele", price:53, img:"img/adele pagina.jpg", category:"musica", tag:"-25%"},
];

const productGrid = document.getElementById('product-grid');
const bestGrid = document.getElementById('best-grid');
const cartCount = document.getElementById('cart-count');
const searchInput = document.getElementById('search');

let cart = [];

// render cards
function renderProducts(list, container){
  container.innerHTML = '';
  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="tag">${p.tag}</div>
      <img src="${p.img}" alt="${p.title}" loading="lazy" />
      <h4 class="product-title">${p.title}</h4>
      <div class="product-price">Oferta: S/${p.price}</div>
      <div class="product-actions">
        <button class="btn btn-cart" data-id="${p.id}">Añadir</button>
        <button class="btn btn-buy" data-id="${p.id}">Comprar</button>
      </div>
    `;
    container.appendChild(card);
  });

  // attach event listeners
  container.querySelectorAll('.btn-cart').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = Number(e.currentTarget.dataset.id);
      addToCart(id);
    });
  });
  container.querySelectorAll('.btn-buy').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = Number(e.currentTarget.dataset.id);
      // simple buy action: open whatsapp with message
      const prod = products.find(pp=>pp.id===id);
      const msg = encodeURIComponent(`Hola, quiero comprar: ${prod.title} (S/${prod.price})`);
      window.open(`https://wa.me/51960113229?text=${msg}`, '_blank');
    });
  });
}

function addToCart(id){
  cart.push(id);
  cartCount.textContent = cart.length;
  // small feedback
  alert('Producto añadido al carrito');
}

// initial render: show first 4 as "nuevos", and last 4 as "más pedidos"
renderProducts(products.slice(0,4), productGrid);
renderProducts(products.slice(4,8), bestGrid);

// search
searchInput.addEventListener('input', (e) => {
  const q = e.target.value.trim().toLowerCase();
  const filtered = products.filter(p => p.title.toLowerCase().includes(q) || p.category.includes(q));
  renderProducts(filtered.slice(0,8), productGrid);
});

// ver todos button
document.getElementById('ver-todos').addEventListener('click', () => {
  renderProducts(products, productGrid);
});
