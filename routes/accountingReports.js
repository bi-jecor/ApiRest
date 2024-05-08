const { Router} = require('express');
const { getAllProvidersCharges, getSalesCalculateIeps} = require('../controllers/accountingReports')

const router = Router();
router.get('/getAllProvidersCharges/:date', getAllProvidersCharges );
router.get('/getSalesCalculateIeps/:date1/:date2', getSalesCalculateIeps );
module.exports = router;