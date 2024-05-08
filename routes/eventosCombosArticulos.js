const { Router } = require('express');
const controller = require('../controllers/eventosCombosArticulos');

const router = Router(); 

router.get('/', controller._get ); 
router.get('/:id', controller._getOne ); 

router.post('/', controller._post ); 
router.post('/post_delete', controller._post_delete ); 

module.exports = router;