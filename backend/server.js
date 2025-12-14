const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');



const app = express();

app.use(cors());
app.use(express.json());
app.use('/products', productRoutes);
app.use('/cart', require('./routes/cartRoutes'));
// server.js
app.use('/orders', require('./routes/orderRoutes'));




// ✅ Express routes ONLY
app.use('/auth', authRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
