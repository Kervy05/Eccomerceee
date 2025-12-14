const router = require('express').Router();
const { verifyToken } = require('../middleware/authMiddleware');
const cart = require('../controllers/cartController');

router.post('/add', verifyToken, cart.addToCart);
router.get('/', verifyToken, cart.getCart);

module.exports = router;
