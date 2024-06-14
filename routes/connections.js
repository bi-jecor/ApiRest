const { Router} = require('express');
const { mongoConnection } = require('../controllers/connection');

const router = Router();

router.get('/mongo', mongoConnection);

module.exports = router;