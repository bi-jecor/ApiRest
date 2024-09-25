const { Router } = require('express');
const { 
    cretateClient, 
    addClientDir, 
    getTiposClientes, 
    getZonesClients, 
    getVendors, 
    getCollectors, 
    getPaymentConditions, 
    getCitys,
    getCoins,
    getExistArts,
    getOrdersCm,
    getOrderData,
    getPricesListCatalog,
    insertIntoOrderCm,
    updateDoctoCmAmount, 
    getJecInventarioMovil,
    updateJecInventarioMovil,
    getJecInventariosMovil,
    updateJecInventarioArticuloCantidad,
    getExistencias,
    getFullCatalog,
    getFullCatalog2,
    getCatalogForPriceChecker,
    getFullCatalog3,
    getArticleCategories,
    get_jec_venta_by_date,
    createDoctoCm,
    insertDoctoVeDet,
    getArticlesByFolioVe,
    getDataToPolicy,
    getDataToPolicyByDay,
    getDataToPolicyByDB,
    getTotalCm,
    getClientByRfc,
    getClientFiscalName,
    updateDataFiscalClientMicrosip,
    getMovtosByArticles,
    test,
    getCustomersBalances,
    getCustomersBalancesToday,
    getCustomersBalancesByDb,
    getConsecutiveP,
    createDoctoP,
    updateLastFolioP,
    getLastFolioCm,
    insertDoctoCm,
    updateLastFolioCm,
    insertDoctoCmDet,
    getProviders,
    getArticlesToHealer,
    getMarks,
    getStockByArticle,
    getArticleIdByCodeAndCategoryId,
    getTaxIdByName,
    updateArticle,
    updateArticlePurchase,
    updateArticleSatKey,
    deleteArticleTaxes,
    getTaxesIds,
    insertArticleTaxes,
    deleteArticleKeys,
    getArticleRolesId,
    insertArticleKeys,
    deleteArticleSubcategories,
    getArticleSubcategoryId,
    insertArticleSubcategory,
    updateArticleToHealer,
    getArticleStockByWarehouse,
    getJecStockListExisByWarehouse,
    getJecStockListGraphByWarehouse,
    obtenerListaPrecios
    } = require('../controllers/cedis');

const router = Router();

router.post('/client', cretateClient);
router.put('/client/:id', addClientDir);
router.get('/getTiposClientes', getTiposClientes);
router.get('/getZonesClients', getZonesClients);
router.get('/getVendors', getVendors);
router.get('/getCollectors', getCollectors);
router.get('/getPaymentConditions', getPaymentConditions);
router.get('/getCitys', getCitys);
router.get('/getCoins', getCoins);
router.get('/getExistArts', getExistArts);
router.post('/getOrdersCm', getOrdersCm);
router.post('/getOrderData', getOrderData);
router.get('/getPricesListCatalog', getPricesListCatalog);
router.post('/createDoctoCm', createDoctoCm);
router.post('/insertDoctoVeDet/:conection/:docto_ve_id', insertDoctoVeDet);
router.get('/getArticlesByFolioVe/:conection/:folio', getArticlesByFolioVe);
router.post('/insertIntoOrderCm', insertIntoOrderCm);
router.post('/updateDoctoCmAmount', updateDoctoCmAmount);
router.get('/getJecInventarioMovil/:sucursal/:consecutivo', getJecInventarioMovil);
router.get('/getJecInventariosMovil', getJecInventariosMovil);
router.get('/getExistencias/:microsipName/:conectionName', getExistencias);
router.get('/getFullCatalog', getFullCatalog);
router.get('/getFullCatalog2/:connection', getFullCatalog2);
router.get('/getFullCatalog3', getFullCatalog3);
router.get('/getCatalogForPriceChecker', getCatalogForPriceChecker);
router.get('/getArticleCategories', getArticleCategories);
router.get('/getJecVentaByDate/:initialDate/:finalDate', get_jec_venta_by_date);
router.put('/updateJecInventarioMovil', updateJecInventarioMovil);
router.put('/updateJecInventarioArticuloCantidad/:inventarioId/:cantidad', updateJecInventarioArticuloCantidad);
router.get('/getDataToPolicy/:date1/:date2', getDataToPolicy); 
router.get('/getDataToPolicyByDay/:date1/:date2/', getDataToPolicyByDay);
router.get('/getDataToPolicyByDb/:date1/:date2/:conection', getDataToPolicyByDB);
router.get('/getTotalCm/:conection/:date1/:date2', getTotalCm);
router.get('/getClientByRfc/:rfc', getClientByRfc);
router.get('/getClientFiscalName/:rfc', getClientFiscalName);
router.post('/updateDataFiscalClientMicrosip', updateDataFiscalClientMicrosip);
router.post('/getMovtosByArticles/:microsipId/:conectionName', getMovtosByArticles);
router.get('/test', test);
router.get('/getCustomersBalances/:date', getCustomersBalances);
router.get('/getCustomersBalancesToday', getCustomersBalancesToday);
router.get('/getCustomersBalancesByDb/:date/:conection', getCustomersBalancesByDb);
router.get('/getConsecutiveP/:conection/:serie', getConsecutiveP);
router.post('/createDoctoP/:conection/:folio', createDoctoP);
router.put('/updateLastFolioP/:conection/:folioId/:consecutive', updateLastFolioP);
router.get('/getLastFolioCm/:conection/:type/:serie', getLastFolioCm);
router.post('/insertDoctoCm/:conection', insertDoctoCm);
router.put('/updateLastFolioCm/:conection/:folioId/:consecutive', updateLastFolioCm);
router.post('/insertDoctoCmDet/:conection/:docId', insertDoctoCmDet);
router.get('/getProviders/', getProviders);
router.get('/getArticlesToHealer/:min/:max/:provider', getArticlesToHealer);
router.get('/getMarks', getMarks);
router.get('/getStockByArticle/:conection/:code', getStockByArticle);
router.get('/getArticleIdByCodeAndCategoryId/:conection/', getArticleIdByCodeAndCategoryId);
router.get('/getTaxIdByName/:conection/:taxName', getTaxIdByName);
router.put('/updateArticle/:conection', updateArticle);
router.put('/updateArticlePurchase/:conection', updateArticlePurchase);
router.put('/updateArticleSatKey/:conection', updateArticleSatKey);
router.post('/deleteArticleTaxes/:conection', deleteArticleTaxes);
router.post('/getTaxesIds/:conection', getTaxesIds);
router.post('/insertArticleTaxes/:conection', insertArticleTaxes);
router.post('/deleteArticleKeys/:conection', deleteArticleKeys);
router.post('/getArticleRolesId/:conection', getArticleRolesId);
router.post('/insertArticleKeys/:conection', insertArticleKeys);
router.post('/deleteArticleSubcategories/:conection', deleteArticleSubcategories);
router.post('/getArticleSubcategoryId/:conection', getArticleSubcategoryId);
router.post('/insertArticleSubcategory/:conection', insertArticleSubcategory);
router.put('/updateArticleToHealer/:conection', updateArticleToHealer);
router.get('/getStockByArticle/:conection/:code', getStockByArticle);

router.get('/getArticleStockByWarehouse/:articleCode', getArticleStockByWarehouse);
router.get('/getJecStockListExisByWarehouse', getJecStockListExisByWarehouse);
router.get('/getJecStockListGraphByWarehouse', getJecStockListGraphByWarehouse);
router.get('/listaPrecios', obtenerListaPrecios);




module.exports = router;
