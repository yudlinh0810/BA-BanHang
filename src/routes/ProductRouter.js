const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/create-products', ProductController.createProduct);
router.put('/update-products/:id', authMiddleware, ProductController.updateProduct);
router.delete('/delete-products/:id', authMiddleware, ProductController.deleteProduct);
router.get('/product-detail/:id', ProductController.getDetail);
router.get('/products/', ProductController.getAllProduct);

module.exports = router;
