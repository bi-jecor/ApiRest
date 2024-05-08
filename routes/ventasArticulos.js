const { Router } = require('express');
const controller = require('../controllers/ventasArticulos');

const router = Router(); 

router.get('/', controller._get ); 
router.post('/', controller._post ); 
router.post('/post_import', controller._post_import ); 
router.put('/:_id', controller._update ); 

module.exports = router;