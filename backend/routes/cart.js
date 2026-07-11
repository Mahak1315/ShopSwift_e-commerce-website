const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const { protect } = require('../middleware/auth');

// All cart routes require login
// protect middleware runs first, verifies JWT, attaches req.user

// GET /api/cart — get current user's cart
router.get('/', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.json({ items: [] }); // no cart yet = empty cart
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/cart — save entire cart (replaces existing)
router.post('/', protect, async (req, res) => {
  try {
    const { items } = req.body;

    // find existing cart or create new one
    let cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      cart.items = items; // replace items
      await cart.save();
    } else {
      cart = await Cart.create({ user: req.user._id, items });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/cart — clear user's cart
router.delete('/', protect, async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user._id });
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;