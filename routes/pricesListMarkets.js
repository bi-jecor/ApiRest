const {Router} = require('express');
const { getPricesListMarkets, createPricesListMarket} = require('../controllers/pricesListMarkets');

const router = Router();
router.get('/getPricesListMarkets', getPricesListMarkets);
router.post('/createPricesListMarket', createPricesListMarket);



module.exports = router;