const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');


// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    'http://192.168.29.203:3000',
    'https://mahak1315.github.io',
  ],
  credentials: true,
}));
app.use(express.json());   // allow server to read JSON from requests
app.use('/photos', express.static(path.join(__dirname, '../photos')));

// Test route — just to confirm server is working
app.get('/', (req, res) => {
  res.json({ message: 'ShopSwift API is running' });
});

// Routes 
app.use('/api/products', require('./routes/products'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/ai', require('./routes/ai'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});