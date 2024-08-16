const { Router} = require('express');
const { check } = require ('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {getUsers, getUser, createUser, deleteUser, updateUser, updatePasswordUser, getUsersByDepartament, getUsersByDepartaments,updateManyUser } = require('../controllers/user');

const router = Router();

router.get('/', getUsers);
router.get('/:userId', getUser);
router.get('/Departament/:value', getUsersByDepartament);
router.post('/', 
    [
        check('name', 'Name is required').not().isEmpty(),
        check('lastname', 'Lastname is required').not().isEmpty(),
        check('password', 'Password is required').not().isEmpty(),
        check('store', 'Store is required').not().isEmpty(),
        check('departament', 'Departament is required').not().isEmpty(),
        validarCampos
    ],
    createUser
);
router.post('/getUsersByDepartaments', getUsersByDepartaments);
router.put('/updatePassword/:userId', updatePasswordUser);
router.delete('/:userId', deleteUser);
router.put('/updateManyUsers', updateManyUser);
router.put('/:userId', updateUser);

module.exports = router;



