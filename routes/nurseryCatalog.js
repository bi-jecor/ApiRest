const {Router} = require('express');
const {createCatalog, getCatalogs, getCatalogById, getCatalogsByBranch, updateCatalogById, deleteCatalogById, addProduct} = require('../controllers/nurseryCatalog');
const { createProduct } = require('../controllers/nurseryProducts');
const router = Router();

router.post('/', createCatalog);
router.post('/addProduct/:catalogId', addProduct);
router.get('/', getCatalogs);
router.get('/catalog/:catalogId', getCatalogById);
router.get('/catalogByBranch/:branchId', getCatalogsByBranch);
router.put('/catalog/:catalogId', updateCatalogById);
router.delete('/catalog/:catalogId', deleteCatalogById);

module.exports = router