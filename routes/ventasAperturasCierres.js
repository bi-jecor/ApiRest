const { Router } = require('express');
const controller = require('../controllers/ventasAperturasCierres');

const router = Router(); 

router.get('/', controller._get );  
router.get('/:_id', controller._getOne );  
router.get('/corte/:_id', controller._getOneCorte );  
router.post('/totalCorte', controller._getOneTotalCorte );  
router.post('/', controller._post );
router.delete('/:_id', controller._delete ); 

module.exports = router;