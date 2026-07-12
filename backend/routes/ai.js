const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');
const Product = require('../models/Product');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// POST /api/ai/chat
router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    // fetch all products from DB
    const products = await Product.find({});

    // format products for AI context
    const productList = products.map(p =>
      `- ${p.name} | Category: ${p.category} | Price: ₹${p.price} | Description: ${p.description}`
    ).join('\n');

    const systemPrompt = `You are a helpful shopping assistant for ShopSwift, an Indian e-commerce store.

You have access to the following products:
${productList}

Rules:
- Only recommend products from the list above
- Always mention the price in ₹ (Indian Rupees)
- Keep responses friendly, concise and helpful
- If asked to filter by price, only show products within that range
- If asked to compare products, give a clear side by side comparison
- If a product is not in the list, say it is not available
- Do not make up products or prices`;

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      max_tokens: 500,
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });

  } catch (error) {
    console.error('AI error:', error.message);
    res.status(500).json({ message: 'AI service error', error: error.message });
  }
});

module.exports = router;