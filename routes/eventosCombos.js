const { Router } = require('express');
const controller = require('../controllers/eventosCombos');

const router = Router(); 

router.get('/', controller._get ); 

router.post('/', controller._post ); 
router.post('/post_delete', controller._post_delete ); 
router.post('/post_delete_image', controller._post_delete_image ); 

router.put('/:id', controller._put ); 


module.exports = router;