const { Router } = require('express');
const {getAisleOrder, getAisleOrders, getAisleOrdersByUser, getAisleOrdersDate, getAisleOrdersReport,  createAisle, updateAisleOrder, deleteAisleOrder, getAisleOrdersToDelete} = require('../controllers/aisle')
const router = Router();

router.post('/', createAisle);
router.get('/aisleOrder/:aisleOrderId', getAisleOrder);
router.get('/getAisleOrders/:warehouse', getAisleOrders);
router.get('/getAisleOrdersByUser/:branch/:user', getAisleOrdersByUser);
router.get('/getAisleOrdersDate', getAisleOrdersDate);
router.get('/getAisleOrdersToDelete/:year/', getAisleOrdersToDelete);
router.get('/getAisleOrdersReport/', getAisleOrdersReport);
router.put('/updateAisleOrders/:aisleOrderId', updateAisleOrder);
router.delete('/deleteAisleOrders/:aisleOrderId', deleteAisleOrder);

module.exports = router;

