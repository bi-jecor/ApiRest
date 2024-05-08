const { Router } = require('express');
const controller = require('../controllers/fillRate');

const router = Router();
router.get('/', controller._get );
router.post('/getFillRateRange', controller._get_fill_rate_range );
router.post('/getTimeInvoice', controller._get_time_invoice );
router.post('/postTimeInvoice', controller._post_time_invoice );

module.exports = router;