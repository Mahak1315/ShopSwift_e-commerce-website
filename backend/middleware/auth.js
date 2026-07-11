const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // check if token is in the Authorization header
  // format: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // extract the token (remove "Bearer " prefix)
      token = req.headers.authorization.split(' ')[1];

      // verify the token using our secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // find the user from the token's id and attach to request
      // we exclude the password field
      req.user = await User.findById(decoded.id).select('-password');

      next(); // move to the actual route handler
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };