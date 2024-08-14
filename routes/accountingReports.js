const { Router} = require('express');
const { getAllProvidersCharges, 
    getSalesCalculateIeps, 
    getCustomersCharges, 
    getCustomersToSap,getProvidersToSap, 
    getAllProvidersChargesCxp,
    getCustomersBalances,
    obtenerPagos
} = require('../controllers/accountingReports')

const router = Router();
router.get('/getAllProvidersCharges/:date', getAllProvidersCharges );
router.get('/getSalesCalculateIeps/:date1/:date2', getSalesCalculateIeps );
router.get('/getCustomersCharges', getCustomersCharges );
router.get('/getCustomersToSap', getCustomersToSap );
router.get('/getProvidersToSap', getProvidersToSap );
router.get('/getAllProvidersChargesCxp/', getAllProvidersChargesCxp );
router.get('/getCustomersBalances/', getCustomersBalances );
router.get('/getCustomersBalances/', getCustomersBalances );
router.get('/pagos/', obtenerPagos );
module.exports = router;