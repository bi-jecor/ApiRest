const {Router} = require('express')
const router = Router();
const { getNurseryBranchs, getNurseryBranchById, getNurseryBranchByName, createNurseryBranch, updateNurseryBranch, deleteNurseryBranch} = require('../controllers/nurseryBranchs')

router.get('/', getNurseryBranchs)
router.get('/branch/:branchId', getNurseryBranchById)
router.get('/branchName/:branchIdName', getNurseryBranchByName)
router.post('/', createNurseryBranch)
router.put('/', updateNurseryBranch)
router.delete('/', deleteNurseryBranch);

module.exports = router;