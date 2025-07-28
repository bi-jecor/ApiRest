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
    obtenerDevoluciones,
    obtenerTicketsNoFacturados,
    obtenerComplementos,
    obtenerComplementos2,    
    obtenerTotalesVenta,
    getAllProvidersChargesCxpDate,
    obtenerCargosClientes,
    obtenerRemisiones,
    obtenerVentasPorImpuesto,
    obtenerRecepciones ,
    obtenerDevolucionesDet
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
router.get('/obtenerComplementos/:fechaInicial/:fechaFinal', obtenerComplementos );
router.get('/obtenerComplementos2/:fechaInicial/:fechaFinal', obtenerComplementos2 );
router.get('/obtenerTotalesVenta', obtenerTotalesVenta );
router.get('/doctosVeDet/', obtenerDoctosVeDet );
router.get('/obtenerDevoluciones/', obtenerDevoluciones );
router.get('/obtenerTicketsNoFacturados/:fechaInicio/:fechaFin', obtenerTicketsNoFacturados );
router.get('/obtenerCargosClientes/:date/', obtenerCargosClientes );
router.get('/obtenerRemisiones/:fechaInicio/:fechaFin', obtenerRemisiones );
router.get('/obtenerVentasPorImpuesto/', obtenerVentasPorImpuesto );
router.get('/obtenerRecepciones/:fechaInicio/:fechaFin', obtenerRecepciones );
router.get('/obtenerDevolucionesDet/:fechaInicio/:fechaFin', obtenerDevolucionesDet );

router.get('/getCustomersBalancesHis/', getCustomersBalancesHis );
router.get('/getAllProvidersChargesCxpHis/', getAllProvidersChargesCxpHis );
router.get('/getAllProvidersChargesCxpDate/:date/', getAllProvidersChargesCxpDate );
router.get('/obtenerCargosClientes/:date/', obtenerCargosClientes );

module.exports = router;
