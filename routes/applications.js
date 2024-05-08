const { Router} = require('express');
const { check } = require ('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { createApplication, getApplications, getApplication, updateApplication, deleteApplication } = require('../controllers/applications')

const router = Router();

router.post('/',

    [
        check('name', 'Name is required').not().isEmpty(),
        validarCampos
    ],

    createApplication
);

router.get('/:idApplication', getApplication );
router.get('/', getApplications );
router.put('/:idApplication', updateApplication)
router.delete('/:idApplication', deleteApplication)




module.exports = router;