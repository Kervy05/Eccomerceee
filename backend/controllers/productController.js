const db = require('../db');

// 📦 GET ALL PRODUCTS
exports.getProducts = (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// ➕ ADD PRODUCT (ADMIN)
exports.addProduct = (req, res) => {
  const { product_name, price, description } = req.body;

  if (!product_name || !price) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  db.query(
    'INSERT INTO products (product_name, price, description) VALUES (?, ?, ?)',
    [product_name, price, description || null],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Product added' });
    }
  );
};

// ❌ DELETE PRODUCT (ADMIN)
exports.deleteProduct = (req, res) => {
  const id = req.params.id;

  db.query(
    'DELETE FROM products WHERE product_id = ?',
    [id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Product deleted' });
    }
  );
};
