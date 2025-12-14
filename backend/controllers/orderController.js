const db = require('../db');

exports.checkout = (req, res) => {
  const userId = req.user.id;

  db.query(
    'SELECT cart_id FROM cart WHERE user_id = ?',
    [userId],
    (err, carts) => {
      if (carts.length === 0) return res.json({ message: 'Cart empty' });

      const cartId = carts[0].cart_id;

      db.query(
        `SELECT p.product_id, p.price, ci.quantity
         FROM cart_items ci
         JOIN products p ON ci.product_id = p.product_id
         WHERE ci.cart_id = ?`,
        [cartId],
        (err, items) => {
          const total = items.reduce(
            (sum, i) => sum + i.price * i.quantity,
            0
          );

          db.query(
            'INSERT INTO orders (user_id, total_amount) VALUES (?, ?)',
            [userId, total],
            (err, result) => {
              const orderId = result.insertId;

              items.forEach(i => {
                db.query(
                  `INSERT INTO order_items
                   (order_id, product_id, quantity, subtotal)
                   VALUES (?, ?, ?, ?)`,
                  [orderId, i.product_id, i.quantity, i.price * i.quantity]
                );
              });

              db.query('DELETE FROM cart_items WHERE cart_id = ?', [cartId]);
              res.json({ message: 'Order placed successfully' });
            }
          );
        }
      );
    }
  );
};
