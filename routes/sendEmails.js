const { Router} = require('express');
const {sendEmail} = require('../controllers/sendEmails')
const router = Router();

router.post('/', sendEmail);

module.exports = router;