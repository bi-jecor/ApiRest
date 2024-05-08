const { Router } = require('express');
const controller = require('../controllers/ventasExistencias');

const router = Router(); 

router.get('/', controller._get );  
router.get('/:_id', controller._getOne ); 

router.post('/ExistenciasProducto', controller._postExistenciasProducto ); 

module.exports = router;