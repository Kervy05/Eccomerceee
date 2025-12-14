const router = require('express').Router();
const { verifyToken } = require('../middleware/authMiddleware');
const order = require('../controllers/orderController');

router.post('/checkout', verifyToken, order.checkout);

module.exports = router;
