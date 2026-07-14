# 🛍️ ShopSwift — AI-Powered E-Commerce Application

![ShopSwift Banner](photos/c3.jpg)

A full-stack e-commerce web application with real user authentication, per-user cart persistence, and an AI shopping assistant powered by Groq (Llama 3.3).

## 🌐 Live Demo

**👉 [Click here to view the live app](https://mahak1315.github.io/ShopSwift_e-commerce-website/)**

---

## ✨ Features

- 🛒 **21 Products** across 5 categories — Electronics, Clothing, Beauty, Accessories, Footwear
- 🔐 **User Authentication** — Register and login with JWT tokens
- 🧠 **AI Shopping Assistant** — Ask questions like "show me products under ₹1000" or "what electronics do you have?"
- 💾 **Persistent Cart** — Cart saves to MongoDB when logged in, localStorage when logged out
- 🔄 **Guest Cart Merge** — Items added before login are preserved after logging in
- 📱 **Responsive Design** — Works on mobile and desktop
- 🚀 **Fully Deployed** — Backend on Render, Frontend on GitHub Pages

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| HTML5, CSS3 | Structure and styling |
| JavaScript (ES6+) | All frontend logic |
| Bootstrap 5 | UI components and responsive grid |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js | Server runtime |
| Express.js | Web framework and routing |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB object modeling |
| JWT (jsonwebtoken) | Stateless authentication |
| bcryptjs | Password hashing |
| Groq API (Llama 3.3) | AI shopping assistant |

### Deployment
| Platform | What it hosts |
|---------|--------------|
| GitHub Pages | Frontend (index.html, style.css, script.js) |
| Render | Backend (Node.js + Express API) |
| MongoDB Atlas | Database (users, products, carts) |

---

## 🤖 AI Assistant

The AI shopping assistant uses a **RAG-style architecture**:

1. User sends a message via the chat widget
2. Backend fetches all 21 products from MongoDB
3. Products are injected into the AI prompt as context
4. Groq (Llama 3.3 70B) generates a response based on real product data
5. Response is displayed in the chat widget

**Try asking:**
- "Show me products under ₹1000"
- "What electronics do you have?"
- "Compare the two perfumes"
- "Recommend something for gifting under ₹2000"

---

## 📁 Project Structure

```
ShopSwift_e-commerce-website/
├── index.html              # Main page
├── style.css               # Styles
├── script.js               # Frontend logic (cart, auth, products, AI chat)
├── photos/                 # Product images
│
└── backend/
    ├── server.js           # Express server entry point
    ├── seeder.js           # Script to seed products into MongoDB
    ├── config/
    │   └── db.js           # MongoDB connection
    ├── models/
    │   ├── User.js         # User schema with password hashing
    │   ├── Product.js      # Product schema
    │   └── Cart.js         # Per-user cart schema
    ├── routes/
    │   ├── auth.js         # POST /api/auth/register and /login
    │   ├── products.js     # GET /api/products
    │   ├── cart.js         # GET/POST/DELETE /api/cart (protected)
    │   └── ai.js           # POST /api/ai/chat
    ├── middleware/
    │   └── auth.js         # JWT verification middleware
    └── utils/
        └── generateToken.js # JWT token generator
```

---

## 🚀 Running Locally

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free)
- Groq API key (free at console.groq.com)

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/Mahak1315/ShopSwift_e-commerce-website.git
cd ShopSwift_e-commerce-website/backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Fill in your values in .env

# Seed the database with products
npm run seed

# Start the development server
npm run dev
```

### Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GROQ_API_KEY=your_groq_api_key
```

### Frontend Setup

Open `index.html` with Live Server in VS Code, or update `API_URL` in `script.js` to `http://localhost:5000` for local testing.

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login and receive JWT token |

### Products
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | /api/products | Get all products |
| GET | /api/products/:id | Get product by ID |

### Cart (Protected — requires JWT)
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | /api/cart | Get logged-in user's cart |
| POST | /api/cart | Save/update cart |
| DELETE | /api/cart | Clear cart |

### AI
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | /api/ai/chat | Send message to AI assistant |

---

## 👩‍💻 Author

**Mahak**
B.Tech Electronics and Communication Engineering
Punjab Engineering College (PEC), Chandigarh

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
