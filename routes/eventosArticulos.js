const { Router } = require('express');
const controller = require('../controllers/eventosArticulos');

const router = Router(); 

router.get('/', controller._get ); 
router.get('/get_articles_actives', controller._get_articles_actives ); 

router.post('/', controller._post ); 
router.post('/post_articles_actives', controller._post_catalogue_articles_actives ); 
router.post('/post_articles_available', controller._post_articles_available ); 
router.post('/post_delete', controller._post_delete ); 
router.post('/post_delete_image', controller._post_delete_image ); 

router.put('/:id', controller._put ); 


module.exports = router;