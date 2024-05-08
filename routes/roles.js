const { Router } = require('express');
const { getAllRoles, getRoles, createRoles, updateRoles, deleteRoles } = require('../controllers/roles');
const router = Router();

router.get('/', getAllRoles );
router.get('/:id', getRoles );

router.post('/', createRoles );

router.put('/:id', updateRoles );

router.delete('/:id', deleteRoles );

module.exports = router;
