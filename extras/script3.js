const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1299,
    image: "https://via.placeholder.com/300x200?text=Headphones",
  },
  {
    id: 2,
    name: "Smartwatch",
    price: 2299,
    image: "https://via.placeholder.com/300x200?text=Smartwatch",
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: 799,
    image: "https://via.placeholder.com/300x200?text=Gaming+Mouse",
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 1499,
    image: "https://via.placeholder.com/300x200?text=Speaker",
  },
  {
    id: 5,
    name: "Fitness Band",
    price: 999,
    image: "https://via.placeholder.com/300x200?text=Fitness+Band",
  }
];

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const priceFilter = document.getElementById("priceFilter");

function displayProducts(filteredProducts) {
  productList.innerHTML = "";
  filteredProducts.forEach(product => {
    const productCard = document.createElement("div");
    productCard.className = "col-lg-4 col-md-6 col-sm-12 mb-4";
    productCard.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 class="card-title">${product.name}</h5>
            <div class="badge bg-success mb-2">₹${product.price}</div>
          </div>
          <button class="btn btn-primary mt-auto">Add to Cart</button>
        </div>
      </div>
    `;
    productList.appendChild(productCard);
  });
}

function sortAndFilterProducts() {
  let keyword = searchInput.value.toLowerCase();
  let sortBy = sortSelect.value;
  let priceRange = priceFilter.value;

  let filtered = products.filter(p => p.name.toLowerCase().includes(keyword));

  if (priceRange === "under1000") {
    filtered = filtered.filter(p => p.price < 1000);
  } else if (priceRange === "1000to2000") {
    filtered = filtered.filter(p => p.price >= 1000 && p.price <= 2000);
  } else if (priceRange === "above2000") {
    filtered = filtered.filter(p => p.price > 2000);
  }

  if (sortBy === "low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  displayProducts(filtered);
}

searchInput.addEventListener("input", sortAndFilterProducts);
sortSelect.addEventListener("change", sortAndFilterProducts);
priceFilter.addEventListener("change", sortAndFilterProducts);

displayProducts(products);