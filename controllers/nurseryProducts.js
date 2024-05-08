const {request, response} = require('express');
const { DataSessionInstance } = require('twilio/lib/rest/wireless/v1/sim/dataSession');
const  NurseryProduct  = require('../models/nurseryProduct');

// ============================================================
// Agregar Cargador
// ============================================================
const createProduct = async (req, res ) => {
    const data = new NurseryProduct({
        ...req.body
    });

    try {

        const productDB = await data.save();
        return res.json({
            ok:true,
            productDB
        });


    } catch (error) {
        return res.status(500).json({
            ok:false,
            productDB
        });
    }
}

// ============================================================
// Obtener Productos
// ============================================================
const getProducts = async (req, res) => {
    try {

        const productsDB = await NurseryProduct.find();
        return res.json({
            ok:true,
            products: productsDB
        });
        
    } catch (error) {
        return res.json({
            ok:false,
            msg: 'Error to get Products',
            error
        });
    }
}

// ============================================================
// Obtener Producto Por Id
// ============================================================
const getProductsById = async (req = request , res= response) => {
    const productId = req.params.productId
    try {
        const productDB = await NurseryProduct.findOne({_id: productId});
        return res.json({
            ok:true,
            product: productDB
        })
    } catch (error) {
        return res.json({
            ok:false,
            msg: 'Error to get Product',
            error
        });
    }
}

// ============================================================
// Editar Producto
// ============================================================
const updateProduct = async (req, res) => {
    const productId = req.params.productId;
    const data = new NurseryProduct({
        ...req.body
    });
    try {
        const productDB = await NurseryProduct.findOneAndUpdate({_id: productId},  data , {new: true});
        return res.json({
            ok:true,
            product: productDB
        })
    } catch (error) {
        return res.json({
            ok:false,
            msg: 'Error to update product',
            error
        });
    }
}

// ============================================================
// Eliminar Producto
// ============================================================
const deletedProduct = async(req, res) => {
    const productId = req.params.productId;
    try {
        const productDeleted = await NurseryProduct.findOneAndRemove(productId)
        return res.json({
            ok:true,
            product: productDeleted
        })
    } catch (error) {
        return res.json({
            ok:false,
            msg: 'Error to deleted product',
            error
        });
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProductsById,
    updateProduct,
    deletedProduct
}