const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
  // ─── EXISTING PRODUCTS ───────────────────────────────
  {
    name: 'Wireless Earbuds',
    price: 1999,
    image: 'earbuds.jpg',
    category: 'Electronics',
    description: 'High quality wireless earbuds with noise cancellation',
  },
  {
    name: 'Smartwatch',
    price: 2999,
    image: 'smartwatch1.jpg',
    category: 'Electronics',
    description: 'Feature-packed smartwatch with health tracking',
  },
  {
    name: 'Sneakers',
    price: 2499,
    image: 'snearker.jpg',
    category: 'Footwear',
    description: 'Comfortable and stylish sneakers for everyday use',
  },
  {
    name: 'Backpack',
    price: 1299,
    image: 'b1.jpg',
    category: 'Accessories',
    description: 'Spacious and durable backpack for college and travel',
  },
  {
    name: 'Water Bottle',
    price: 499,
    image: 'waterbottle.jpg',
    category: 'Accessories',
    description: 'Insulated water bottle that keeps drinks cold for 24 hours',
  },

  // ─── ELECTRONICS ─────────────────────────────────────
  {
    name: 'Smartphone',
    price: 24999,
    image: 'smartphone.jpg',
    category: 'Electronics',
    description: 'Latest smartphone with 5G, 128GB storage and 50MP camera',
  },
  {
    name: 'Headphones',
    price: 3499,
    image: 'headphones.jpg',
    category: 'Electronics',
    description: 'Over-ear headphones with deep bass and 30-hour battery life',
  },
  {
    name: 'Camera',
    price: 34999,
    image: 'camera.jpg',
    category: 'Electronics',
    description: 'DSLR camera with 24MP sensor, perfect for photography enthusiasts',
  },
  {
    name: 'Laptop',
    price: 54999,
    image: 'laptop.jpg',
    category: 'Electronics',
    description: 'Lightweight laptop with Intel i5, 16GB RAM and 512GB SSD',
  },

  // ─── ACCESSORIES ─────────────────────────────────────
  {
    name: 'Gold Earrings',
    price: 899,
    image: 'earring.jpg',
    category: 'Accessories',
    description: 'Elegant gold-toned earrings suitable for daily wear and occasions',
  },
  {
    name: 'Pearl Necklace',
    price: 1299,
    image: 'necklace.jpg',
    category: 'Accessories',
    description: 'Classic pearl necklace that adds elegance to any outfit',
  },
  {
    name: 'Statement Necklace',
    price: 999,
    image: 'necklace1.jpg',
    category: 'Accessories',
    description: 'Bold statement necklace perfect for parties and events',
  },
  {
    name: 'Handbag',
    price: 2199,
    image: 'purse.jpg',
    category: 'Accessories',
    description: 'Stylish handbag with multiple compartments for everyday use',
  },
  {
    name: 'Perfume',
    price: 1799,
    image: 'perfume.jpg',
    category: 'Accessories',
    description: 'Long-lasting floral fragrance perfect for everyday wear',
  },
  {
    name: 'Perfume Gift Set',
    price: 2499,
    image: 'perfume1.jpg',
    category: 'Accessories',
    description: 'Premium perfume gift set with two complementary fragrances',
  },

  // ─── BEAUTY ──────────────────────────────────────────
  {
    name: 'Vitamin C Serum',
    price: 799,
    image: 'serum.jpg',
    category: 'Beauty',
    description: 'Brightening vitamin C serum that reduces dark spots and evens skin tone',
  },
  {
    name: 'Moisturising Cream',
    price: 599,
    image: 'cream.jpg',
    category: 'Beauty',
    description: 'Deep hydration cream with SPF 30, suitable for all skin types',
  },

  // ─── CLOTHING ────────────────────────────────────────
  {
    name: 'Casual Shirt',
    price: 899,
    image: 'shirt.jpg',
    category: 'Clothing',
    description: 'Breathable cotton casual shirt available in multiple colours',
  },
  {
    name: 'Crop Top',
    price: 699,
    image: 'top.jpg',
    category: 'Clothing',
    description: 'Trendy crop top perfect for casual outings and college wear',
  },
  {
    name: 'Hoodie',
    price: 1499,
    image: 'hoodie.jpg',
    category: 'Clothing',
    description: 'Cosy fleece hoodie with kangaroo pocket, perfect for winters',
  },
  {
    name: 'Floral Dress',
    price: 1899,
    image: 'dress.jpg',
    category: 'Clothing',
    description: 'Elegant floral dress suitable for casual outings and parties',
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    await Product.deleteMany({});
    console.log('Existing products cleared');

    await Product.insertMany(products);
    console.log(`${products.length} products seeded successfully`);

    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDB();