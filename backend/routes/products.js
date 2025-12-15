const express = require('express');
const router = express.Router();

const {
  getProducts,
  addProduct,
  deleteProduct
} = require('../controllers/productController');

const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// PUBLIC
router.get('/', getProducts);

// ADMIN ONLY
router.post('/', verifyToken, isAdmin, addProduct);
router.delete('/:id', verifyToken, isAdmin, deleteProduct);

module.exports = router;
