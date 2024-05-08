const {request, response} = require('express');
const NurseryCatalog = require('../models/nurseryCatalog');

// ============================================================
// Crear Catalogo
// ============================================================
const createCatalog = async (req = request, res = response) => {
    const data = new NurseryCatalog({
        ...req.body
    });

    try {
        const catalogoDB = await data.save();
        return res.json({
            ok: true,
            calalog: catalogoDB
        })
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Error to get catalogs',
            error
        });
    }
}

// ============================================================
// Obtener Catalogos
// ============================================================
const getCatalogs = async(req= request, res= response) => {
    try {
        const catalogsDB = await NurseryCatalog.find();
        return res.json({
            ok: true,
            catalogs: catalogsDB
        });
    } catch (error) {
        return res.json({
            ok: false,
            msg: 'Error to get catalogs',
            error
        });
    }
}

// ============================================================
// Obtener Catalogos por sucursal
// ============================================================
const getCatalogsByBranch = async(req= request, res= response) => {
    const branchId = req.params.branchId;
    try {
        const catalogsDB = await NurseryCatalog.find({'branch': branchId});
        return res.json({
            ok: true,
            catalogs: catalogsDB
        });
    } catch (error) {
        return res.json({
            ok: false,
            msg: 'Error to get catalogs',
            error
        });
    }
}

// ============================================================
// Obtener Catalogo por ID
// ============================================================
const getCatalogById = async(req= request, res= response) => {
    const catalogId = req.params.catalogId;
    try {
        const catalogDB = await NurseryCatalog.findOne({_id: catalogId})
                                    .populate('products.product');

        return res.json({
            ok: true,
            catalog: catalogDB
        });
    } catch (error) {
        return res.json({
            ok: false,
            msg: 'Error to get catalog by Id',
            error
        });
    }
}

// ============================================================
// Actualizar Catalogo por ID
// ============================================================
const updateCatalogById = async(req= request, res= response) => {
    const catalogId = req.params.catalogId;
    const data = new NurseryCatalog({
        ...req.body
    })
    try {
        const catalogDB = await NurseryCatalog.findOneAndUpdate({_id: catalogId}, data, {new: true});
        return res.json({
            ok: true,
            catalog: catalogDB
        });
    } catch (error) {
        return res.json({
            ok: false,
            msg: 'Error to update catalog by Id',
            error
        });
    }
}
// ============================================================
// Eliminar Catalogo por ID
// ============================================================
const deleteCatalogById = async(req= request, res= response) => {
    const catalogId = req.params.catalogId;

    try {
        const catalogDB = await NurseryCatalog.findOneAndRemove({_id: catalogId}, data, {new: true});
        return res.json({
            ok: true,
            catalog: catalogDB
        });
    } catch (error) {
        return res.json({
            ok: false,
            msg: 'Error to remove catalog by Id',
            error
        });
    }
}

// ============================================================
// Agregar producto al catalogo
// ============================================================
const addProduct = async (req= request, res = response) => {
    const catalogId = req.params.catalogId;
    var data = req.body
    console.log('Data',data);
    try {
        const productDB = await NurseryCatalog.findOneAndUpdate({ _id: catalogId},
            {$push: {products:
                {"product": data.product, "branch": data.branch}
            }},
            {new: true}
        );
        
        return res.json({
            ok: true,
            product: productDB
        });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error to add product',
            error
        })
    }
}



module.exports = {
    createCatalog,
    getCatalogs,
    getCatalogById,
    getCatalogsByBranch,
    updateCatalogById,
    deleteCatalogById,
    addProduct
}