const db = require('../db');

// ➕ Add item to cart
exports.addToCart = (req, res) => {
  const userId = req.user.id;
  const { product_id, quantity } = req.body;

  // 1️⃣ Get or create cart
  db.query(
    'SELECT cart_id FROM cart WHERE user_id = ?',
    [userId],
    (err, carts) => {
      if (err) return res.status(500).json(err);

      const createItem = (cartId) => {
        db.query(
          `INSERT INTO cart_items (cart_id, product_id, quantity)
           VALUES (?, ?, ?)
           ON DUPLICATE KEY UPDATE quantity = quantity + ?`,
          [cartId, product_id, quantity || 1, quantity || 1],
          () => res.json({ message: 'Added to cart' })
        );
      };

      if (carts.length === 0) {
        db.query(
          'INSERT INTO cart (user_id) VALUES (?)',
          [userId],
          (err, result) => createItem(result.insertId)
        );
      } else {
        createItem(carts[0].cart_id);
      }
    }
  );
};

// 📄 View cart
exports.getCart = (req, res) => {
  const userId = req.user.id;

  db.query(
    `SELECT ci.cart_item_id, p.name, p.price, ci.quantity,
            (p.price * ci.quantity) AS subtotal
     FROM cart c
     JOIN cart_items ci ON c.cart_id = ci.cart_id
     JOIN products p ON ci.product_id = p.product_id
     WHERE c.user_id = ?`,
    [userId],
    (err, results) => res.json(results)
  );
};
