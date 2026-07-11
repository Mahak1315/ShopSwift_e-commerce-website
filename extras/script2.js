const products = [
  { id: 1, name: 'Smartphone', price: 16989, category: 'Electronics', rating: 4, image: 'https://via.placeholder.com/150x200?text=Phone' },
  { id: 2, name: 'T-Shirt', price: 489, category: 'Clothing', rating: 4, image: 'https://via.placeholder.com/150x200?text=T-Shirt' },
  { id: 3, name: 'Laptop', price: 9989, category: 'Electronics', rating: 4, image: 'https://via.placeholder.com/150x200?text=Laptop' },
  { id: 4, name: 'Book', price: 298, category: 'Books', rating: 5, image: 'https://via.placeholder.com/150x200?text=Book' }
];

let cart = JSON.parse(localStorage.getItem('cart')) || {};
let currentFilter = 'all';

function renderProducts() {
  const list = document.getElementById('product-list');
  list.innerHTML = '';
  const filtered = currentFilter === 'all' ? products : products.filter(p => p.category === currentFilter);
  filtered.forEach(prod => {
    const stars = '★'.repeat(prod.rating) + '☆'.repeat(5 - prod.rating);
    const col = document.createElement('div');
    col.className = 'col-md-3';
    col.innerHTML = `
      <div class="product-card text-center d-flex flex-column justify-content-between h-100">
        <img src="${prod.image}" class="img-fluid mb-2" alt="${prod.name}" />
        <h6>${prod.name}</h6>
        <p>₹${prod.price}</p>
        <div class="mb-2"><span class="star">${stars}</span></div>
        <button class="btn btn-primary btn-sm mt-auto" onclick="addToCart(${prod.id})">Add to Cart</button>
      </div>
    `;
    list.appendChild(col);
  });
}

function renderCart() {
  const cartEl = document.getElementById('cart-items');
  const cartCount = document.querySelector('.cart-count');
  cartEl.innerHTML = '';
  let total = 0;
  let count = 0;
  for (let id in cart) {
    const item = products.find(p => p.id == id);
    const qty = cart[id];
    total += item.price * qty;
    count += qty;
    cartEl.innerHTML += `
      <div class="d-flex justify-content-between align-items-center mb-2">
        <span>${item.name}</span>
        <div>
          <button class="btn btn-sm btn-outline-secondary" onclick="changeQty(${id}, -1)">-</button>
          <span class="mx-2">${qty}</span>
          <button class="btn btn-sm btn-outline-secondary" onclick="changeQty(${id}, 1)">+</button>
          ₹${item.price * qty}
        </div>
      </div>`;
  }
  document.getElementById('cart-total').innerText = total;
  cartCount.innerText = count;
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  renderCart();
}

function changeQty(id, change) {
  if (cart[id]) {
    cart[id] += change;
    if (cart[id] <= 0) delete cart[id];
    renderCart();
  }
}

function filterProducts(cat) {
  currentFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  renderProducts();
}

function sortProducts(order) {
  products.sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price);
  renderProducts();
}

renderProducts();
renderCart();