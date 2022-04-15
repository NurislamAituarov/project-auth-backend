const jwt = require('jsonwebtoken');
const { secret } = require('../config');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(400).json({ message: 'Auth error ' });
    }
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(400).json({ message: 'Server Auth error ' });
  }
};
