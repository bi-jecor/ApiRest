const { response, request } = require('express');
const ProductSoldConcentrate = require('../models/productSoldConcentrate');

// ####################### TYPE : GET ###########################
// GET MANY ALL REPORTS
async function getProductSoldConcentrate(req = request, res = response) {
    try {
        const report = await ProductSoldConcentrate.find({})
        return res.json({
            ok: true,
            report
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error to get Reports, check with your system Administrator',
            error
        });
    }
}

const testPost = async (req, res) => {
    try {
        const reports = new ProductSoldConcentrate({ 
            Empresa: "CEDIS",
            Almacen: "ALBERTO CARDENAS",
            Clave_Articulo: "014006",
            Nombre: "ACEITE CRISTAL C/12/ 1 LT.",
            Unidad_Compra: "CJA",
            Contenido_Unidad_Compra: 12,
            porComprar: 0.083333,
            uVendidas: 1,
            Punto_Venta: 1,
            Ventas: 0,
            Existencia: 1.5,
            Compras_Pendientes: 0,
            Estadistica: 0.14,
            Fecha_upd: "08-10-2021 18:36"
        });
        const result = reports.save();

        return res.json({
            ok: true,
            result
        });

    } catch (error) {
        console.log( error );
        return res.status(500).json({
            ok: false,
            msg: 'Error to get Reports, check with your system Administrator',
            error
        });
    }
}

module.exports = {
    getProductSoldConcentrate,
    testPost
}