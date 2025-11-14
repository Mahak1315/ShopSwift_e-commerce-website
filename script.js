// Load cart from localStorage
let cart;
try {
  const stored = JSON.parse(localStorage.getItem("cart"));
  cart = Array.isArray(stored) ? stored : [];
} catch (e) {
  cart = [];
}

// Add item to cart
function addToCart(name, price) {
  const item = cart.find(i => i.name === name);
  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  saveAndUpdate();
  showToast();
}

// Update cart UI
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item";

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
  saveAndUpdate();
}

function decreaseQty(index) {
  if (cart[index].qty > 1) {
    cart[index].qty--;
  } else {
    cart.splice(index, 1);
  }
  saveAndUpdate();
}

// Save to localStorage and refresh UI
function saveAndUpdate() {
  localStorage.setItem("cart", JSON.stringify(cart));
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
  const cartTitle = document.getElementById("cart-title");
  if (cartTitle) {
    cartTitle.scrollIntoView({ behavior: "smooth" });
  }
}

// Show/hide password
function togglePassword() {
  const input = document.getElementById("passwordInput");
  input.type = input.type === "password" ? "text" : "password";
}

// On load
updateCart();
