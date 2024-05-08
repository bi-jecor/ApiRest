const { Router } = require('express');
const controller = require('../controllers/ventasRetiros');

const router = Router(); 

router.get('/', controller._get );  
router.get('/:_id', controller._getOne );  
router.post('/', controller._post );
router.delete('/:_id', controller._delete ); 

module.exports = router;