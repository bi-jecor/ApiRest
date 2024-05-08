const {request, response} = require('express')
const NurseryPurchase = require('../models/nurseryPurchase');
const NurseryCatalog = require('../models/nurseryCatalog');

// ============================================================
// Crear una nueva compra
// ============================================================
const createNurseryPurchase = async (req = request, res= response) => {
    var purchase = new NurseryPurchase({
        ...req.body
    });
    try {
        const purchaseDB = await purchase.save();
        return res.json({
            ok: true,
            purchase: purchaseDB
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg:' Error to create Purchase'
        });
    }
}

// ============================================================
// Obtener las Compras
// ============================================================
const getPurchases = async (req = request, res = response) => {
    try {
        const purchasesDB = await NurseryPurchase.find()
                                    .populate('user');
        return res.json({
            ok: true,
            purchasesDB
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error to get purchases',
            error
      });  
    }
}

// ============================================================
// Obtener una compra
// ============================================================
const getPurchase = async (req= request, res = response) => {
    const purchaseId = req.params.purchaseId
    try {
        const purchaseDB = await NurseryPurchase.findOne({_id: purchaseId});
        return res.json({
            ok: true,
            purchase: purchaseDB
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error to get purchase',
            error
      });  
    }
}

// ============================================================
// Agregar producto a documento de compra
// ============================================================
const addProduct = async (req = request, res = response) => {
    const purchaseId = req.params.purchaseId;
    const catalogId = req.params.catalogId;
    const data = req.body
    const purchase = {
        ...data
    }
    try {
        const purchaseDB = await NurseryPurchase.findOneAndUpdate({_id: purchase.productId},
            {$push: {documPur :
                {
                    "product": data.productId, 
                    "quantity": data.quantity, 
                }
            }}, {new: true}
        );
        const catalogDB = await NurseryCatalog.findOne({_id: catalogId});
        const productData = await catalogDB.products.find(element => element._id == purchase.productId );
        const stock = productData.stock;
        const updateCatalog = await NurseryCatalog.findOneAndUpdate({_id: catalogId, "products._id": purchase.productId},
            {'products.$.stock': (stock + data.quantity)}
        );
        return res.json({
            ok: true,
            msg: 'Success'

        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error to add product in purchase',
            error
      });  
    }
}

module.exports = {
    createNurseryPurchase,
    getPurchases,
    getPurchase,
    addProduct
}