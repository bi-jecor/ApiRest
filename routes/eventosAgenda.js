const { Router } = require('express');
const controller = require('../controllers/eventosAgenda');

const router = Router(); 

router.get('/', controller._get ); 

router.post('/', controller._post ); 
router.post('/post_one', controller._post_one ); 
router.post('/post_one_details', controller._post_one_details ); 
router.post('/post_delete', controller._post_delete ); 

module.exports = router;