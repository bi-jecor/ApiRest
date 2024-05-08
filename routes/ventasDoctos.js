const { Router } = require('express');
const controller = require('../controllers/ventasDoctos');

const router = Router(); 

router.get('/', controller._get );  
router.get('/:_id', controller._getOne );  
router.post('/postOne', controller._postOne );  
router.post('/', controller._post ); 
router.put('/:_id', controller._update ); 

module.exports = router;