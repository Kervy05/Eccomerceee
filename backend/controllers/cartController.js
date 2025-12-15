const db = require('../db');

// ➕ ADD TO CART
exports.add = (req, res) => {
  const userId = req.user.id;
  const { product_id } = req.body;

  // 1️⃣ Get or create cart
  db.query(
    'SELECT cart_id FROM cart WHERE user_id = ?',
    [userId],
    (err, rows) => {
      if (err) return res.status(500).json(err);

      if (rows.length === 0) {
        db.query(
          'INSERT INTO cart (user_id) VALUES (?)',
          [userId],
          (err, result) => {
            if (err) return res.status(500).json(err);
            addItem(result.insertId);
          }
        );
      } else {
        addItem(rows[0].cart_id);
      }
    }
  );

  function addItem(cartId) {
    db.query(
      'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, 1)',
      [cartId, product_id],
      err => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Added to cart' });
      }
    );
  }
};

// 🛒 GET CART
exports.get = (req, res) => {
  const userId = req.user.id;

  db.query(
    `
    SELECT 
      ci.cart_item_id,
      p.product_name AS name,
      p.price
    FROM cart c
    JOIN cart_items ci ON c.cart_id = ci.cart_id
    JOIN products p ON ci.product_id = p.product_id
    WHERE c.user_id = ?
    `,
    [userId],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
};

// ❌ REMOVE ITEM
exports.remove = (req, res) => {
  const id = req.params.id;

  db.query(
    'DELETE FROM cart_items WHERE cart_item_id = ?',
    [id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Item removed' });
    }
  );
};
 exports.updateQuantity = (req, res) => {
  const { quantity } = req.body;
  const cartItemId = req.params.id;

  if (quantity < 1) {
    return res.status(400).json({ message: 'Invalid quantity' });
  }

  db.query(
    'UPDATE cart_items SET quantity = ? WHERE cart_item_id = ?',
    [quantity, cartItemId],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Quantity updated' });
    }
  );
};
