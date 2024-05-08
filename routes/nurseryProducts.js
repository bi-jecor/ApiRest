const {Router} = require('express');
const router = Router();
const {createProduct, getProducts, getProductsById, updateProduct, deletedProduct } = require('../controllers/nurseryProducts')

router.post('/', createProduct )
router.get('/', getProducts);
router.get('/product/:productId/', getProductsById);
router.put('/product/:productId', updateProduct);
router.delete('/product/:productId', deletedProduct);

module.exports = router;
