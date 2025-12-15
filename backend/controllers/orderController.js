const db = require('../db');

// 🛒 CHECKOUT
exports.checkout = (req, res) => {
  const userId = req.user.id;

  // 1. Get cart
  db.query(
    'SELECT cart_id FROM cart WHERE user_id = ?',
    [userId],
    (err, carts) => {
      if (err || carts.length === 0)
        return res.status(400).json({ message: 'Cart empty' });

      const cartId = carts[0].cart_id;

      // 2. Get cart items
      db.query(
        'SELECT product_id, quantity FROM cart_items WHERE cart_id = ?',
        [cartId],
        (err, items) => {
          if (err || items.length === 0)
            return res.status(400).json({ message: 'Cart empty' });

          // 3. Create order
          db.query(
            'INSERT INTO orders (user_id, total_amount) VALUES (?, 0)',
            [userId],
            (err, result) => {
              if (err) return res.status(500).json(err);

              const orderId = result.insertId;

              // 4. Insert order items
              items.forEach(item => {
                db.query(
                  `INSERT INTO order_items 
                   (order_id, product_id, quantity, subtotal)
                   VALUES (?, ?, ?, 0)`,
                  [orderId, item.product_id, item.quantity]
                );
              });

              // 5. Compute total
              db.query(
                `
                UPDATE orders
                SET total_amount = (
                  SELECT SUM(oi.quantity * p.price)
                  FROM order_items oi
                  JOIN products p ON oi.product_id = p.product_id
                  WHERE oi.order_id = ?
                )
                WHERE order_id = ?
                `,
                [orderId, orderId]
              );

              // 6. Clear cart
              db.query('DELETE FROM cart_items WHERE cart_id = ?', [cartId]);
              db.query('DELETE FROM cart WHERE cart_id = ?', [cartId]);

              res.json({ message: 'Order placed' });
            }
          );
        }
      );
    }
  );
};

// 📦 ORDER HISTORY
exports.getOrders = (req, res) => {
  const userId = req.user.id;

  db.query(
    'SELECT * FROM orders WHERE user_id = ? ORDER BY order_date DESC',
    [userId],
    (err, orders) => {
      if (err) return res.status(500).json(err);
      res.json(orders);
    }
  );
};
