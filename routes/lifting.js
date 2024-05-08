const {Router} = require('express')
const router = Router();
const {  
    createLifting, 
    getLifting,
    getLiftings,
    getLiftingsByWarehouseAndUser,
    getLiftingsByWarehouseAndConcept,
    getLiftingsByStatus,
    updateLifting,
    deleteLifting
} = require('../controllers/lifting')

router.post('/', createLifting)
router.get('/', getLiftings)
router.get('/getLifting/:liftingId', getLifting)
router.get('/getLiftingsByWarehouseAndUser/:warehouse/:user', getLiftingsByWarehouseAndUser)
router.get('/getLiftingsByWarehouseAndConcept/:warehouse/:concept', getLiftingsByWarehouseAndConcept)
router.get('/getInventoriesByStatus/:status', getLiftingsByStatus)
router.put('/:liftingId', updateLifting)
router.delete('/:liftingId', deleteLifting)

module.exports = router;