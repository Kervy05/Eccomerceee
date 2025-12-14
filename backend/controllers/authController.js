const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// CUSTOMER REGISTRATION
const register = async (req, res) => {
  const { name, email, password, contact_number } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    'INSERT INTO users (name, email, password, role, contact_number) VALUES (?, ?, ?, ?, ?)',
    [name, email, hashedPassword, 'Customer', contact_number || null],
    (err) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: 'Email already exists' });
        }
        return res.status(500).json({ message: 'Database error' });
      }
      res.status(201).json({ message: 'Customer account created' });
    }
  );
};

// LOGIN
const login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      if (results.length === 0)
        return res.status(401).json({ message: 'Invalid credentials' });

      const user = results[0];
      const match = await bcrypt.compare(password, user.password);

      if (!match)
        return res.status(401).json({ message: 'Invalid credentials' });

      const token = jwt.sign(
        { id: user.user_id, role: user.role },
        'SECRET_KEY_HERE',
        { expiresIn: '1d' }
      );

      res.json({
        token,
        role: user.role,
        name: user.name
      });
    }
  );
};

// 🔒 ADMIN-ONLY CREATE USER
const createUser = async (req, res) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Admin access only' });
  }

  const { name, email, password, role, contact_number } = req.body;

  if (!['Admin', 'Staff'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    'INSERT INTO users (name, email, password, role, contact_number) VALUES (?, ?, ?, ?, ?)',
    [name, email, hashedPassword, role, contact_number || null],
    (err) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: 'Email already exists' });
        }
        return res.status(500).json({ message: 'Database error' });
      }
      res.json({ message: `${role} account created successfully` });
    }
  );
};

// 👤 CUSTOMER PROFILE
const getProfile = (req, res) => {
  const userId = req.user.id;

  db.query(
    'SELECT name, email, contact_number, role FROM users WHERE user_id = ?',
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      if (results.length === 0)
        return res.status(404).json({ message: 'User not found' });

      res.json(results[0]);
    }
  );
};

// ✅ THIS IS THE CRITICAL PART
module.exports = {
  register,
  login,
  createUser,
  getProfile
};
