const { response, request, json } = require('express');
var firebird = require('node-firebird');
const conections = require('../database/connections');
const firebirdQuerys = require('../helpers/firebirdQuerys');

const obtenerClientes = (req, res) => {
    const date = req.params.date;
    // const date2 = req.params.date2;

    const all = Promise.allSettled([
       
        firebirdQuerys.obtenerClientes('AC', date)

    ]).then((values) => {

        let data = [];
        let fails = ''
        let emptys = ''
        values.forEach(element => {
            console.log(element);
            if (element.status !== 'rejected') {
                data = [...data, ...element.value]
                if (element.value.length === 0) {
                    emptys = emptys + ' ' + element.value.conection
                }
            } else {
                console.log(element);
                fails = fails + ' ' + element.reason.conection;
            }
        });
        return res.json({
            data,
            fails: fails.trim(),
            emptys: emptys.trim()
        });
    });
}
module.exports = {
    obtenerClientes,
};