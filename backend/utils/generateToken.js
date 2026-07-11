const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign(
    { id },                          // payload — what we store inside the token
    process.env.JWT_SECRET,          // secret key to sign the token
    { expiresIn: '30d' }             // token expires in 30 days
  );
};

module.exports = generateToken;