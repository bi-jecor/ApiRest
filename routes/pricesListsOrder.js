const { Router} = require('express');

const { createPricesListOrder, getPricesListOrders, getPricesListOrder, updatePricesListOrder} = require('../controllers/priceListsOrders')

const router = Router();

router.post('/', createPricesListOrder);

router.get('/', getPricesListOrders)

router.get('/getPricesListOrder/:pricesListOrderId', getPricesListOrder)

router.put('/updatePricesListOrder/:pricesListOrderId', updatePricesListOrder)

module.exports = router;