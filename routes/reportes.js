const { Router } = require('express');
const { obtenerClientes } = require('../controllers/reportes');
const router = Router();
router.get('/obtenerClientes', obtenerClientes);
module.exports = router;
// router.get('/:date/:date2', obtenerClientes);