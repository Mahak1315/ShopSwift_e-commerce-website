const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
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
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    // clear existing products first
    await Product.deleteMany({});
    console.log('Existing products cleared');

    // insert all products
    await Product.insertMany(products);
    console.log('Products seeded successfully');

    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDB();