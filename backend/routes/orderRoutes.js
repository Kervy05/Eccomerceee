const router = require('express').Router();
const { verifyToken } = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

// Checkout
router.post('/checkout', verifyToken, orderController.checkout);

// Order history
router.get('/', verifyToken, orderController.getOrders);

module.exports = router;
