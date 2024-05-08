const { Router } = require('express');
const { 
        createNurseryProvider, getNurseryProviders, getNurseryProvider, updateNurseryProvider
    } = require('../controllers/nurseryProviders');
const router = Router();


router.post('/', createNurseryProvider);
router.get('/', getNurseryProviders);
router.get('/provider/:providerId', getNurseryProvider);
router.put('/provider/:providerId', updateNurseryProvider);






module.exports = router;
