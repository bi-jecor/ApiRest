const { Router} = require('express');
const { getAllProvidersCharges, getSalesCalculateIeps, getCustomersCharges, getCustomersToSap,getProvidersToSap, getAllProvidersChargesCxp} = require('../controllers/accountingReports')

const router = Router();
router.get('/getAllProvidersCharges/:date', getAllProvidersCharges );
router.get('/getSalesCalculateIeps/:date1/:date2', getSalesCalculateIeps );
router.get('/getCustomersCharges', getCustomersCharges );
router.get('/getCustomersToSap', getCustomersToSap );
router.get('/getProvidersToSap', getProvidersToSap );
router.get('/getAllProvidersChargesCxp/', getAllProvidersChargesCxp );
module.exports = router;