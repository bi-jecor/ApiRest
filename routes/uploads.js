const { Router} = require('express');
const expressFileUpload = require('express-fileupload');
const { fileUpload, getImg, getImgName} = require('../controllers/uploads')

const router = Router();
router.use(expressFileUpload());

router.put('/', fileUpload);
router.get('/getFile/:fileName', getImg);
router.get('/getFileName/:fileName', getImgName);

module.exports = router;



