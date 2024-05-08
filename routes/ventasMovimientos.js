const { Router } = require('express');
const controller = require('../controllers/ventasMovimientos');

const router = Router(); 

router.get('/', controller._get );  
router.get('/:_id', controller._getOne );  
router.get('/kardex/:_id', controller._getOneKardex ); 
router.post('/', controller._post ); 
router.put('/:_id', controller._update ); 
router.delete('/:_id', controller._delete ); 

module.exports = router;