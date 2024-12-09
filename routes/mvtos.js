const { Router } = require('express');
const { obtenerArticulosRequerimiento,obtenerRequerimiento, obtenerTraspaso, obtenerArticulosTraspaso} = require('../controllers/mvtos')

const router = Router();


router.get('/obtenerArticulosRequerimiento/:folio', obtenerArticulosRequerimiento);
router.get('/obtenerRequerimiento/:folio', obtenerRequerimiento);
router.get('/obtenerTraspaso/:folio', obtenerTraspaso);
router.get('/obtenerArticulosTraspaso/:folio', obtenerArticulosTraspaso);

module.exports = router;
