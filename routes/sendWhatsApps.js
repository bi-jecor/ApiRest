const {Router} = require('express')
const { sendWhatsApp, connectApi } = require('../controllers/sendWhatsApps')
const router = Router();

router.get('/', connectApi);
router.post('/', sendWhatsApp);

module.exports = router;