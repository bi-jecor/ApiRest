const { Router} = require('express');
const router = Router();

const { getProductSoldConcentrate, testPost } = require('../controllers/reports.jecor');

// ####################### TYPE : GET ###########################
router.get( '/ProductSoldConcentrate/', getProductSoldConcentrate )

// // ####################### TYPE : POST ###########################
router.post( '/ProductSoldConcentrate/', testPost);

// // ####################### TYPE : PUT ###########################
// router.put( '/:reportId', test )

// // ####################### TYPE : DELETE ###########################
// router.delete( '/:reportId', test )


module.exports = router;