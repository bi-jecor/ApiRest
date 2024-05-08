const { Router } = require('express');
const controller = require('../controllers/estacionamientosTiendas');

const router = Router(); 

router.get('/', controller._get ); 
router.get('/:id', controller._getOne ); 
router.put('/:id', controller._update ); 

module.exports = router;