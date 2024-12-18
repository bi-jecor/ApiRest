const { response, request, json } = require('express');
const firebirdQuerys = require('../helpers/firebirdQuerys');

const  obtenerNombreArticuloPorClave = (req = request, res = response) => {
        const {clave} = req.params;
        firebirdQuerys.obtenerNombreArticuloPorClave( 'AC', clave )
        .then(data => {
            return res.json({
                data,
            });
        })
        .catch(err => {
            console.log(err);
            return res.status(err.claveError).json({
                err
            });
            
        })
}
const  obtenerArticulosRequerimiento = (req = request, res = response) => {
        const {folio} = req.params;
        firebirdQuerys.obtenerArticulosReq( 'AC', folio )
        .then(data => {
            return res.json({
                data,
            });
        })
        .catch(err => {
            console.log(err);
            
        })
}

const  obtenerRequerimiento = (req = request, res = response) => {
        const {folio} = req.params;
        firebirdQuerys.obtenerRequerimiento( 'AC', folio )
        .then(data => {
            return res.json({
                data,
            });
        })
}


const  obtenerTraspaso = (req = request, res = response) => {
        const {folio} = req.params;
        firebirdQuerys.obtenerTraspaso( 'G32', folio )
        .then(data => {
            return res.json({
                data,
            });
        });
}

const  obtenerArticulosTraspaso = (req = request, res = response) => {
        const {folio} = req.params;
        firebirdQuerys.obtenerArticulosTraspaso( 'G32', folio )
        .then(data => {
            return res.json({
                data,
            });
        });
}



module.exports = {
    obtenerNombreArticuloPorClave,
    obtenerArticulosRequerimiento,
    obtenerRequerimiento,
    obtenerTraspaso,
    obtenerArticulosTraspaso
}