const { Router } = require('express');
const controller = require('../controllers/estacionamientosAperturasCierres');

const router = Router(); 

router.get('/', controller._get ); 
router.get('/:id', controller._getOne ); 
router.get('/resum/:id', controller._getOneResum ); 

router.post('/', controller._post ); 

router.delete('/:id', controller._delete ); 

module.exports = router;