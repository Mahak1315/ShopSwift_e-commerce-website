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
app.use(cors());           // allow frontend to call this backend
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


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});