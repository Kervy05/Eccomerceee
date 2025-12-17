const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', auth.register);
router.post('/login', auth.login);
// Customer profile (logged-in users)
router.get('/profile', verifyToken, auth.getProfile);


console.log('verifyToken:', verifyToken);

// Admin-only route
router.post('/create-user', verifyToken, auth.createUser);

module.exports = router;
