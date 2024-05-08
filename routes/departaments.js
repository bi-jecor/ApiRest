const { Router } = require('express');
const { getAllDepartments, getDepartments, createDepartments, updateDepartments, deleteDepartments } = require('../controllers/departaments');
const router = Router();

router.get('/', getAllDepartments );
router.get('/:id', getDepartments );

router.post('/', createDepartments );

router.put('/:id', updateDepartments );

router.delete('/:id', deleteDepartments );

module.exports = router;
