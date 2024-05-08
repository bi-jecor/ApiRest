const { Router } = require('express');
const { 
    saveArticleVisualMin,
    getArticleVisualMin,
    updateArticleVisualMin
    } = require('../controllers/visualMinimun');

const router = Router();

router.get('/getArticleVisualMin/:code', getArticleVisualMin);
router.post('/saveArticleVisualMin', saveArticleVisualMin);
router.put('/updateArticleVisualMin', updateArticleVisualMin);

module.exports = router;