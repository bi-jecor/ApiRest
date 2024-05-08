const { Router} = require('express');

const { createPricesList, getPricesLists, getPricesList, getPricesListsByUserAndStatus, getPricesListsByOrder, updatePricesList} = require('../controllers/priceLists')

const router = Router();

router.post('/', createPricesList);
router.get('/:date', getPricesLists)
router.get('/getPricesList/:pricesListId', getPricesList)
router.get('/getPricesListsByUserAndStatus/:userId/:status', getPricesListsByUserAndStatus)
router.get('/getPricesListsByOrder/:pricesListOrderId', getPricesListsByOrder)
router.put('/updatePricesList/:pricesListId', updatePricesList)






module.exports = router;