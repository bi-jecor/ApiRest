const {Router} = require('express')
const router = Router();

const {guardarRequerimientoCompleto} = require('../controllers/sugerido');

router.post('/guardarRequerimientoCompleto/:almacen', guardarRequerimientoCompleto);


module.exports = router;
