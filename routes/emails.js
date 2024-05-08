const {Router} = require('express')
const router = Router();

const { 
    createEmail,
    getEmail,
    updateEmail
    } = require('../controllers/emails');

router.post('/createEmail', createEmail);
router.get('/getEmail/:id', getEmail);
router.put('/updateEmail/:id', updateEmail);

module.exports = router;