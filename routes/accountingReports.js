const { Router} = require('express');
const { getAllProvidersCharges, 
    getSalesCalculateIeps, 
    getCustomersCharges, 
    getCustomersToSap,getProvidersToSap, 
    getAllProvidersChargesCxp,
    getAllProvidersChargesCxpHis,
    getAllProvidersChargesCxpSap,
    getCustomersBalances,
    getCustomersBalancesHis,
    obtenerPagos,
    obtenerDoctosVe,
    obtenerDoctosPagos,
    obtenerDoctosVeDet,   
} = require('../controllers/accountingReports')

const router = Router();
router.get('/getAllProvidersCharges/:date', getAllProvidersCharges );
router.get('/getSalesCalculateIeps/:date1/:date2', getSalesCalculateIeps );
router.get('/getCustomersCharges', getCustomersCharges );
router.get('/getCustomersToSap', getCustomersToSap );
router.get('/getProvidersToSap', getProvidersToSap );
router.get('/getAllProvidersChargesCxp/', getAllProvidersChargesCxp );
router.get('/getAllProvidersChargesCxpSap/', getAllProvidersChargesCxpSap );
router.get('/getCustomersBalances/', getCustomersBalances );
router.get('/getCustomersBalances/', getCustomersBalances );
router.get('/pagos/', obtenerPagos );
router.get('/doctosVe/', obtenerDoctosVe );
router.get('/doctosPagos/:fecha/:fechaFin', obtenerDoctosPagos );


router.get('/doctosVeDet/', obtenerDoctosVeDet );

router.get('/getCustomersBalancesHis/', getCustomersBalancesHis );
router.get('/getAllProvidersChargesCxpHis/', getAllProvidersChargesCxpHis );

module.exports = router;
