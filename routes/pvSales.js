const { Router } = require('express');
const { check } = require('express-validator');
const { sale, getSaleByUser, getSalesByMissing, getSalesByDate, getSaleByUserAndDate} = require('../controllers/pvSales');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.post('/saveSale', sale );
router.get('/getSalesByUser/:user/:store', getSaleByUser );
router.get('/getSalesByDate/:user', getSalesByDate );
router.get('/getSaleByUserAndDate/:user/:store', getSaleByUserAndDate );
router.get('/:userId', getSaleByUser );


module.exports = router;