const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const cartController = require('../controllers/cartController');

router.post('/add', verifyToken, cartController.add);
router.get('/', verifyToken, cartController.get);
router.delete('/:id', verifyToken, cartController.remove);
router.put('/:id', verifyToken, cartController.updateQuantity);


module.exports = router;
