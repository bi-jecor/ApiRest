const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { createPermission, getPermissions, getPermission, updatePermission, deletePermission, getPermissionsbyApp} = require('../controllers/permissions');

const router = Router();

router.get('/', getPermissions);
router.get('/getPermissionsbyApp/:appId', getPermissionsbyApp);
router.get('/:permissionId', getPermission);

router.post('/', createPermission);

router.put('/:permissionId', updatePermission);

router.delete('/:permissionId', deletePermission);

module.exports = router;
