# ShopSwift — E-Commerce Web Application

![ShopSwift Banner](https://raw.githubusercontent.com/Mahak1315/ShopSwift_e-commerce-website/main/photos/c3.jpg)

A full-stack e-commerce application with user authentication, persistent cart management, and an AI-powered shopping assistant.

🔗 **[View Live Application](https://mahak1315.github.io/ShopSwift_e-commerce-website/)**

---

## Overview

ShopSwift is a complete e-commerce platform featuring 21 products across 5 categories. Users can browse products, manage a cart, create an account, and interact with an AI assistant that answers product-related queries in natural language.

---

## Features

- **Product Catalogue** — 21 products across Electronics, Clothing, Beauty, Accessories, and Footwear
- **User Authentication** — Secure register and login with JWT-based session management
- **Smart Cart** — Cart persists in MongoDB for logged-in users; falls back to localStorage for guests. Guest cart merges on login
- **AI Shopping Assistant** — Natural language product queries powered by Groq (Llama 3.3 70B)
- **Responsive UI** — Works across desktop and mobile browsers

---

## Tech Stack

### Frontend
```
HTML5 · CSS3 · JavaScript (ES6+) · Bootstrap 5
```

### Backend
```
Node.js · Express.js · MongoDB Atlas · Mongoose
JWT Authentication · bcryptjs · Groq API
```

### Deployment
```
Frontend → GitHub Pages
Backend  → Render
Database → MongoDB Atlas
```

---

## API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/products | — | Fetch all products |
| GET | /api/products/:id | — | Fetch single product |
| POST | /api/auth/register | — | Create new account |
| POST | /api/auth/login | — | Login and receive token |
| GET | /api/cart | ✅ | Get user's cart |
| POST | /api/cart | ✅ | Save cart |
| DELETE | /api/cart | ✅ | Clear cart |
| POST | /api/ai/chat | — | Query AI assistant |

---

## Project Structure

```
ShopSwift_e-commerce-website/
├── index.html
├── style.css
├── script.js
├── photos/
└── backend/
    ├── server.js
    ├── config/db.js
    ├── models/
    │   ├── User.js
    │   ├── Product.js
    │   └── Cart.js
    ├── routes/
    │   ├── auth.js
    │   ├── products.js
    │   ├── cart.js
    │   └── ai.js
    ├── middleware/auth.js
    └── utils/generateToken.js
```

---

## Local Setup

```bash
# Clone the repo
git clone https://github.com/Mahak1315/ShopSwift_e-commerce-website.git

# Install backend dependencies
cd ShopSwift_e-commerce-website/backend
npm install

# Configure environment variables
# Create a .env file with the following:
# PORT=5000
# MONGO_URI=your_mongodb_uri
# JWT_SECRET=your_secret_key
# GROQ_API_KEY=your_groq_key

# Seed the database
npm run seed

# Start the server
npm run dev
```
