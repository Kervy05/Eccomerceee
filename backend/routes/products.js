const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const productController = require('../controllers/productController');

// ✅ GET all products (Customer browsing)
router.get('/', verifyToken, productController.getProducts);

module.exports = router;
