const { Router } = require('express');
const { getAllStores, getStores, createStores, updateStores, deleteStores } = require('../controllers/stores');
const router = Router();

router.get('/', getAllStores );
router.get('/:id', getStores );

router.post('/', createStores );

router.put('/:id', updateStores );

router.delete('/:id', deleteStores );

module.exports = router;
