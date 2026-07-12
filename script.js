const API_URL = 'https://shopswift-backend-tyyp.onrender.com';

// ─── CART ─────────────────────────────────────────────────

let cart = [];

// Load cart on page start
async function loadCart() {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const response = await fetch(`${API_URL}/api/cart`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      cart = data.items || [];
    } catch (error) {
      console.error('Failed to load cart from DB:', error);
      cart = [];
    }
  } else {
    try {
      const stored = JSON.parse(localStorage.getItem('cart'));
      cart = Array.isArray(stored) ? stored : [];
    } catch (e) {
      cart = [];
    }
  }
  updateCart();
}

// Save cart (to DB if logged in, localStorage if not)
async function saveCart() {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      await fetch(`${API_URL}/api/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ items: cart }),
      });
    } catch (error) {
      console.error('Failed to save cart to DB:', error);
    }
  } else {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

// Add item to cart
function addToCart(name, price) {
  const item = cart.find(i => i.name === name);
  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  saveCart();
  updateCart();
  showToast();
}

// Update cart UI
function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `
      <div class="d-flex flex-column w-100">
        <div class="d-flex justify-content-between">
          <strong>${item.name}</strong>
          <strong>₹${item.price * item.qty}</strong>
        </div>
        <div class="mt-2 d-flex justify-content-end align-items-center">
          <button class="btn btn-sm btn-outline-secondary rounded-circle me-2" onclick="decreaseQty(${index})">−</button>
          <span>${item.qty}</span>
          <button class="btn btn-sm btn-outline-secondary rounded-circle ms-2" onclick="increaseQty(${index})">+</button>
        </div>
      </div>
    `;
    cartItems.appendChild(li);
    total += item.price * item.qty;
  });

  cartTotal.textContent = total;
}

// Quantity controls
function increaseQty(index) {
  cart[index].qty++;
  saveCart();
  updateCart();
}

function decreaseQty(index) {
  if (cart[index].qty > 1) {
    cart[index].qty--;
  } else {
    cart.splice(index, 1);
  }
  saveCart();
  updateCart();
}

// Toast notification
function showToast() {
  const toastEl = document.getElementById('cart-toast');
  if (toastEl) {
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }
}

// Scroll to cart
function scrollToCart() {
  const cartTitle = document.getElementById('cart-title');
  if (cartTitle) {
    cartTitle.scrollIntoView({ behavior: 'smooth' });
  }
}

// Show/hide password
function togglePassword() {
  const input = document.getElementById('passwordInput');
  input.type = input.type === 'password' ? 'text' : 'password';
}

// ─── PRODUCTS ─────────────────────────────────────────────

async function fetchProducts() {
  try {
    const response = await fetch(`${API_URL}/api/products`);
    const products = await response.json();

    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
      const col = document.createElement('div');
      col.className = 'col-md-4 mb-4';
      col.innerHTML = `
        <div class="card shadow-sm h-200">
          <img src="${API_URL}/photos/${product.image}" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text text-muted" style="font-size:13px">${product.description}</p>
            <p class="card-text"><strong>₹${product.price}</strong></p>
            <button class="btn btn-primary w-100"
              onclick="addToCart('${product.name}', ${product.price})">
              Add to Cart
            </button>
          </div>
        </div>
      `;
      productList.appendChild(col);
    });

  } catch (error) {
    console.error('Failed to fetch products:', error);
    document.getElementById('product-list').innerHTML =
      '<p class="text-danger">Failed to load products. Make sure backend is running.</p>';
  }
}

// ─── AUTH ─────────────────────────────────────────────────

function toggleAuthForm(e) {
  e.preventDefault();
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const toggleText = document.getElementById('toggle-text');
  const toggleLink = document.getElementById('toggle-auth');
  const modalTitle = document.getElementById('loginModalLabel');
  const errorBox = document.getElementById('auth-error');

  errorBox.classList.add('d-none');

  if (loginForm.classList.contains('d-none')) {
    loginForm.classList.remove('d-none');
    registerForm.classList.add('d-none');
    modalTitle.textContent = 'Welcome Back';
    toggleText.textContent = "Don't have an account?";
    toggleLink.textContent = 'Sign up';
  } else {
    loginForm.classList.add('d-none');
    registerForm.classList.remove('d-none');
    modalTitle.textContent = 'Create Account';
    toggleText.textContent = 'Already have an account?';
    toggleLink.textContent = 'Login';
  }
}

function showAuthError(message) {
  const errorBox = document.getElementById('auth-error');
  errorBox.textContent = message;
  errorBox.classList.remove('d-none');
}

async function handleLogin(e) {
  e.preventDefault();
  const btn = document.getElementById('login-btn');
  btn.textContent = 'Logging in...';
  btn.disabled = true;

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('passwordInput').value;

  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      showAuthError(data.message || 'Login failed');
      btn.textContent = 'Login';
      btn.disabled = false;
      return;
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email }));

    // merge guest cart into DB cart
const guestCart = JSON.parse(localStorage.getItem('cart')) || [];
if (guestCart.length > 0) {
  // fetch existing DB cart first
  const response2 = await fetch(`${API_URL}/api/cart`, {
    headers: { 'Authorization': `Bearer ${data.token}` },
  });
  const dbCartData = await response2.json();
  const dbCart = dbCartData.items || [];

  // merge guest items into DB cart (not into current in-memory cart)
  guestCart.forEach(guestItem => {
    const existing = dbCart.find(i => i.name === guestItem.name);
    if (existing) {
      existing.qty += guestItem.qty;
    } else {
      dbCart.push(guestItem);
    }
  });

  cart = dbCart; // set merged result
  localStorage.removeItem('cart');
  await saveCart();
}

    const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    modal.hide();
    updateNavbar();
    await loadCart();

  } catch (error) {
    showAuthError('Something went wrong. Try again.');
    btn.textContent = 'Login';
    btn.disabled = false;
  }
}

async function handleRegister(e) {
  e.preventDefault();
  const btn = document.getElementById('register-btn');
  btn.textContent = 'Creating account...';
  btn.disabled = true;

  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      showAuthError(data.message || 'Registration failed');
      btn.textContent = 'Create Account';
      btn.disabled = false;
      return;
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email }));

    const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    modal.hide();
    updateNavbar();
    await loadCart();

  } catch (error) {
    showAuthError('Something went wrong. Try again.');
    btn.textContent = 'Create Account';
    btn.disabled = false;
  }
}

function updateNavbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const loginBtn = document.getElementById('navbar-login-btn');

  if (!loginBtn) return;

  if (user) {
    loginBtn.outerHTML = `
      <div class="d-flex align-items-center gap-2">
        <span class="text-dark small">Hi, ${user.name}!</span>
        <button class="btn btn-outline-danger btn-sm" onclick="handleLogout()">Logout</button>
      </div>
    `;
  }
}

function handleLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('cart');
  cart = [];
  updateCart();
  location.reload();
}

// ─── AI CHAT ──────────────────────────────────────────────

function toggleChat() {
  const box = document.getElementById('chat-box');
  const isVisible = box.style.display === 'flex';
  box.style.display = isVisible ? 'none' : 'flex';
  if (!isVisible) {
    document.getElementById('chat-input').focus();
  }
}

function appendMessage(text, isUser) {
  const messages = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.style.cssText = `
    padding: 10px 12px;
    border-radius: 12px;
    font-size: 13px;
    max-width: 85%;
    line-height: 1.5;
    white-space: pre-wrap;
    ${isUser
      ? 'background:#0d6efd;color:white;align-self:flex-end;margin-left:auto'
      : 'background:#f0f4ff;color:#333;align-self:flex-start'}
  `;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function appendTyping() {
  const messages = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.id = 'typing-indicator';
  div.style.cssText = 'background:#f0f4ff;padding:10px 12px;border-radius:12px;font-size:13px;color:#888;max-width:85%';
  div.textContent = 'Thinking...';
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function removeTyping() {
  const typing = document.getElementById('typing-indicator');
  if (typing) typing.remove();
}

async function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  if (!message) return;

  input.value = '';
  appendMessage(message, true);
  appendTyping();

  try {
    const response = await fetch(`${API_URL}/api/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    removeTyping();

    if (data.reply) {
      appendMessage(data.reply, false);
    } else {
      appendMessage('Sorry, I could not get a response. Please try again.', false);
    }
  } catch (error) {
    removeTyping();
    appendMessage('Something went wrong. Please try again.', false);
  }
}

// ─── PAGE LOAD ────────────────────────────────────────────

loadCart();
fetchProducts();
updateNavbar();