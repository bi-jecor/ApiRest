const {Router} = require('express');

const {createSale, getSales, getSale, addProductSale} = require('../controllers/nurserySales')
const router = Router();

router.post('/', createSale)
router.get('/', getSales)
router.get('/sale/:saleId', getSale)
router.put('/sale/:saleId/:catalogId', addProductSale)



module.exports = router