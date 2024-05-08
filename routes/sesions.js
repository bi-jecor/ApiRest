const { Router } = require('express');
const { verifySesion } = require('../controllers/sesions');
const router = Router();

router.post('/verifySesion', verifySesion );


module.exports = router;
