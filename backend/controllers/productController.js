const db = require('../db');

// 📦 GET ALL PRODUCTS
const getProducts = (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(results);
  });
};

module.exports = {
  getProducts
};
