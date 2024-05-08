const { Router } = require('express');
const controller = require('../controllers/averageCost');

const router = Router();
router.get('/', controller._get );
router.post('/', controller._post );
router.post('/filter', controller._filter );

module.exports = router;