const { Router } = require('express');
const {createNurseryPurchase, getPurchases, getPurchase, addProduct} = require('../controllers/nurseryPurchases')

const router = Router();

router.post('/', createNurseryPurchase);
router.get('/', getPurchases);
router.get('/purchase/:purchaseId', getPurchase);
router.put('/purchase/:purchaseId/:catalogId', addProduct);



module.exports = router;
