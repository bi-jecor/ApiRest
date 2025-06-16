const { Router } = require('express');
const controller = require('../controllers/forecast');

const router = Router();
router.get('/', controller._get );

router.post('/filter', controller._filter );
/*Decalara ruta de metodo para actualizar l relacion de articulo proveedor */
router.post('/forecastActProvArticulo', controller._getActProveedorArticulo ); 
/*Declara ruta para consultar existencia, costo y folios d proveedor FORECAST*/
router.post('/forecastBySupplier', controller._get_forecast_by_supplier );
router.post('/createPurchaseOrder', controller._create_purchase_order );
router.post('/updateForecastConfig', controller._update_forecast_config );
router.post('/updateSupplierArticles', controller._update_supplier_articles );
router.post('/updateVisualMin', controller._update_visual_min );
router.post('/updateSupplierImported', controller._update_supplier_imported );
router.post('/deleteArticleSupplier', controller._delete_article_supplier);
router.put('/:id', controller._update_provedores_config );
router.post('/OrdenCompra', controller.frkOrdenCompra);
router.post('/OrdenCompraDet', controller.frkOrdenCompraDet);

module.exports = router;