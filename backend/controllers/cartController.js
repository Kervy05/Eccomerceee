const db = require('../db');

//  ADD TO CART
exports.add = (req, res) => {
  const userId = req.user.id;
  const { product_id } = req.user.id;

  if (!userId || !product_id) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  // Check if product already in cart
  db.query(
    'SELECT cart_id FROM cart WHERE user_id = ? AND product_id = ?',
    [userId, product_id],
    (err, rows) => {
      if (err) return res.status(500).json(err);

      // If exists → increase quantity
      if (rows.length > 0) {
        const cartId = rows[0].cart_id;

        db.query(
          'UPDATE cart_items SET quantity = quantity + 1 WHERE cart_id = ?',
          [cartId],
          err => {
            if (err) return res.status(500).json(err);
            return res.json({ message: 'Cart updated' });
          }
        );

      } else {
        // Insert new cart row
        db.query(
          'INSERT INTO cart (user_id, product_id) VALUES (?, ?)',
          [userId, product_id],
          (err, result) => {
            if (err) return res.status(500).json(err);

            const cartId = result.insertId;

            db.query(
              'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, 1)',
              [cartId, product_id],
              err => {
                if (err) return res.status(500).json(err);
                res.json({ message: 'Added to cart' });
              }
            );
          }
        );
      }
    }
  );
};

//  GET CART
exports.get = (req, res) => {
  const userId = req.user.id;

  db.query(
    `
    SELECT 
      ci.cart_item_id,
      p.product_name AS name,
      p.price,
      ci.quantity
    FROM cart c
    JOIN cart_items ci ON c.cart_id = ci.cart_id
    JOIN products p ON c.product_id = p.product_id
    WHERE c.user_id = ?
    `,
    [userId],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
};

//  REMOVE ITEM
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

//  UPDATE QUANTITY
exports.updateQuantity = (req, res) => {
  const { quantity } = req.body;
  const cartItemId = req.params.id;

  if (quantity < 1) {
    return res.status(400).json({ message: 'Invalid quantity' });
  }

  db.query(
    'UPDATE cart_items SET quantity = ? WHERE cart_item_id = ?',
    [quantity, cartItemId],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Quantity updated' });
    }
  );
};
