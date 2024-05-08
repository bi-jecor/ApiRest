const { Router } = require('express');
const controller = require('../controllers/estacionamientosDoctos');

const router = Router(); 

router.get('/', controller._get ); 
router.post('/', controller._post ); 
router.post('/one', controller._getOne ); 
router.post('/post_historial', controller._post_historical ); 
router.put('/:id', controller._update ); 
router.delete('/:id', controller._delete ); 

module.exports = router;