const { Router} = require('express');
const { check } = require ('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { createReport, getReport, updateReport, deleteReport, getAll, getReports, getReportsWithRange, getMissingValue, getReportsToExcel, updateReportv2, filter, getReportsFilter } = require('../controllers/reports')
const expressFileUpload = require('express-fileupload');

const router = Router();
router.use(expressFileUpload());

// ####################### TYPE : GET ###########################
router.get( '/', getAll )
router.get( '/termino/:departament/:start/:end', getReports )
router.get( '/:departament/:start/:end', getReportsWithRange )
router.get( '/:reportId', getReport )
router.get( '/missingValue/:id', getMissingValue )
router.get( '/excel/:departament', getReportsToExcel )

// ####################### TYPE : POST ###########################
router.post( '/', createReport);
router.post( '/getReportsFilter', getReportsFilter )
router.post( '/filter', filter);

// ####################### TYPE : PUT ###########################
router.put( '/:reportId', updateReport )
router.put( '/v2/:reportId', updateReportv2 )

// ####################### TYPE : DELETE ###########################
router.delete( '/:reportId', deleteReport )


module.exports = router;