const {Router} = require('express')
const router = Router();
const {  createInventory, getInventory, getInventories, getInventoriesByStatus, getInventoriesByWarehouseAndUser, updateInventory, getInventoriesByWarehouse } = require('../controllers/inventory')

router.post('/', createInventory)
router.get('/', getInventories)
router.get('/getInventory/:inventoryId', getInventory)
router.get('/getInventoriesByWarehouse/:warehouse', getInventoriesByWarehouse)
router.get('/getInventoriesByWarehouseAndUser/:warehouse/:user', getInventoriesByWarehouseAndUser)
router.get('/getInventoriesByStatus/:status', getInventoriesByStatus)
router.put('/:inventoryId', updateInventory)


module.exports = router;