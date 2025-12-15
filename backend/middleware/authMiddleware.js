const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'No token provided' });

  const token = header.split(' ')[1];

  jwt.verify(token, 'SECRET_KEY_HERE', (err, user) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.user = user; // { id, role }
    next();
  });
};
