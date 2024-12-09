const { response, request, json } = require('express');
const firebirdQuerys = require('../helpers/firebirdQuerys');

const  obtenerArticulosRequerimiento = (req = request, res = response) => {
        const {folio} = req.params;
        firebirdQuerys.obtenerArticulosReq( 'AC', folio )
        .then(data => {
            return res.json({
                data,
            });
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
        firebirdQuerys.obtenerTraspaso( 'AC', folio )
        .then(data => {
            return res.json({
                data,
            });
        })
}
const  obtenerArticulosTraspaso = (req = request, res = response) => {
        const {folio} = req.params;
        firebirdQuerys.obtenerArticulosTraspaso( 'AC', folio )
        .then(data => {
            return res.json({
                data,
            });
        })
}



module.exports = {
    obtenerArticulosRequerimiento,
    obtenerRequerimiento,
    obtenerTraspaso,
    obtenerArticulosTraspaso
}