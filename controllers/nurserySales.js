const NurserySale = require('../models/nurserySale');
const NurseryCatalog = require('../models/nurseryCatalog');
const {request, response} = require('express')

// ============================================================
// Crear Venta
// ============================================================
const createSale = async (req = request, res = response) => {
    const data = new NurserySale({
        ...req.body
    });
    console.log(data);

    try {
        const saleDB = await data.save();
        return res.json({
            ok: true,
            sale: saleDB
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error to create Sale',
            error
        });
    }
}

// ============================================================
// Obtener Todas las ventas
// ============================================================
const getSales = async(req = request, res = response) => {
    try {
        const salesDB = await NurserySale.find()
                                .populate('user')
        return res.json({
            ok: true,
            sales: salesDB
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error to get Sales',
            error
        });
    }
}

// ============================================================
// Obtener una ventas
// ============================================================
const getSale = async(req = request, res = response) => {
    const saleId = req.params.saleId;
    try {
        const saleDB = await NurserySale.findOne({_id: saleId})
                                        .populate('documSale.product');
        return res.json({
            ok: true,
            sales: saleDB
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error to get Sale',
            error
        });
    }
}

// ============================================================
// Agregar Productos al documento de ventas
// ============================================================

const addProductSale = async(req = request, res = response) => {
    const saleId = req.params.saleId;
    const catalogId = req.params.catalogId;
    const data = req.body
    const sale = {
        ...req.body
    }
    try {
        const purchaseDB = await NurserySale.findOneAndUpdate({_id: saleId},
            {$push: { documSale :
                {
                    "productId": sale.productId,
                    "quantity": sale.quantity,
                    "price": sale.price,
                    "amount": sale.amount,
                }
            }}, {new: true}
        );
        const catalogDB = await NurseryCatalog.findOne({_id: catalogId});
        const productData = await catalogDB.products.find(element => element._id == sale.productId );
        const newStock = productData.stock - sale.quantity;
        const updateCatalog = await NurseryCatalog.findOneAndUpdate({_id: catalogId, "products._id": sale.productId},
        {'products.$.stock': (newStock)}
    );
    return res.json({
        ok: true,
        msg: 'Success'

    });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error to add product in sale',
            error
        });  
    }
}



module.exports = {
    createSale,
    getSales,
    getSale,
    addProductSale
}

