const { response, request } = require('express');

const querys = require('../helpers/querys/sugerido');

const guardarRequerimientoCompleto = (req = request, res = response) => {
    const { encabezado, detalle } = req.body;
    const { almacen } = req.params;
    
    querys.guardarRequerimientoCompleto(encabezado, detalle, almacen).then((result) => {
        res.status(200).json({
            message: 'Requerimiento guardado exitosamente',
            data: result,
            ok: true
        });
    }).catch((error) => {
        res.status(500).json({
            message: 'Error al guardar el requerimiento',
            error: error.message,
            ok: false
        });
    });
}

module.exports = {
    guardarRequerimientoCompleto
};