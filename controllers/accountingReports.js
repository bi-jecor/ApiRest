const { response, request, json } = require('express');
var firebird = require('node-firebird');
const conections = require('../database/connections');
const firebirdQuerys = require('../helpers/firebirdQuerys');
const accountingReports = require('../helpers/accountingReports');
const { formatDateToString } = require('../helpers/formatDate');


const getAllProvidersCharges = (req, res) => {
    const date = req.params.date;
    // const date2 = req.params.date2;

    const all = Promise.allSettled([
        accountingReports.getProvidersCharges('G32', date),
        accountingReports.getProvidersCharges('AC', date),
        accountingReports.getProvidersCharges('COLIMA', date),
        accountingReports.getProvidersCharges('VILLA', date),
        accountingReports.getProvidersCharges('COLINAS', date),
        accountingReports.getProvidersCharges('TURCIO', date),
        accountingReports.getProvidersCharges('CHAVEZC', date),
        accountingReports.getProvidersCharges('PAEZ', date),
    ]).then((values) => {

        let data = [];
        let fails = ''
        let emptys = ''
        values.forEach(element => {
            console.log(element);
            if (element.status !== 'rejected') {
                data = [...data, ...element.value.charges]
                if (element.value.charges.length === 0) {
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

const getSalesCalculateIeps = (req, res = response) => {
    const date1 = req.params.date1;
    const date2 = req.params.date2;
    const all = Promise.allSettled([
        // firebirdQuerys.getSalesCalculateIeps('G32H', date1, date2), 
        firebirdQuerys.getSalesCalculateIeps('G32', date1, date2),
        firebirdQuerys.getSalesCalculateIeps('AC', date1, date2),
        firebirdQuerys.getSalesCalculateIeps('PAEZ', date1, date2),
        firebirdQuerys.getSalesCalculateIeps('TURCIO', date1, date2),
        firebirdQuerys.getSalesCalculateIeps('COLIMA', date1, date2),
        firebirdQuerys.getSalesCalculateIeps('COLIMAH', date1, date2),
        firebirdQuerys.getSalesCalculateIeps('VILLA', date1, date2),
        firebirdQuerys.getSalesCalculateIeps('VILLAH', date1, date2),
        firebirdQuerys.getSalesCalculateIeps('COLINAS', date1, date2),
        firebirdQuerys.getSalesCalculateIeps('TIANGUIS', date1, date2),

    ]).then((values) => {
        let data = [];
        let fails = ''
        values.forEach(element => {
            if (element.status !== 'rejected') {
                data = [...data, ...element.value]
            } else {
                console.log(element);
                fails = fails + ' ' + element.reason.connection;
            }
        });
        return res.json({
            data,
            fails: fails.trim(),
        });
    })
}

const getCustomersCharges = (req, res = response) => {
    const all = Promise.allSettled([
        firebirdQuerys.getCustomersCharges('G32'),
        // firebirdQuerys.getCustomersCharges('AC'), 

    ]).then((values) => {
        let data = [];
        let dataUnify = [];
        let fails = ''
        console.log('data', data);
        values.forEach(element => {
            if (element.status !== 'rejected') {
                data = [...data, ...element.value]
            } else {
                console.log(element);
                fails = fails + ' ' + element.reason.connection;
            }
        });
        return res.json({
            data,
            fails: fails.trim(),
        });
    })
}

const getCustomersToSap = (req, res = response) => {
    const all = Promise.allSettled([
        firebirdQuerys.getCustomersToSap('G32'),
        firebirdQuerys.getCustomersToSap('AC'),
        firebirdQuerys.getCustomersToSap('COLIMA'),
        firebirdQuerys.getCustomersToSap('VILLA'),
        firebirdQuerys.getCustomersToSap('COLINAS'),
        firebirdQuerys.getCustomersToSap('TURCIO'),
        firebirdQuerys.getCustomersToSap('PAEZ'),
    ]).then((values) => {
        console.log(values);
        
        let data = [];
        let dataUnify = [];
        let fails = ''
        values.forEach(element => {
            if (element.status !== 'rejected') {
                data = [...data, ...element.value]
            } else {
                // console.log(element);
                fails = fails + ' ' + element.reason.connection;
            }
        });

        data.forEach(customer => {
            const exist = dataUnify.find(item => item.cardName === customer.cardName && item.federalTax === customer.federalTax);
            if (exist === undefined) {
                console.log('no existe', customer);
                
                dataUnify.push(customer)
            }
        });

        return res.json({
            data: dataUnify,
            fails: fails.trim(),
        });
    });
}

const getProvidersToSap = (req, res = response) => {
    const all = Promise.allSettled([
        firebirdQuerys.getProvidersToSap('AC'),
        firebirdQuerys.getProvidersToSap('G32'),
        firebirdQuerys.getProvidersToSap('COLIMA'),
        firebirdQuerys.getProvidersToSap('VILLA'),
        firebirdQuerys.getProvidersToSap('COLINAS'),
        firebirdQuerys.getProvidersToSap('TURCIO'),
        firebirdQuerys.getProvidersToSap('PAEZ'),
    ]).then((values) => {
        console.log(values);
        let data = [];
        let dataUnify = [];
        let fails = ''
        values.forEach(element => {
            if (element.status !== 'rejected') {
                data = [...data, ...element.value]
            } else {
                console.log(element);
                fails = fails + ' ' + element.reason.connection;
            }
        });
        data.forEach(provider => {
            const exist = dataUnify.find(item => item.cardName === provider.cardName);
            if (exist === undefined) {
                dataUnify.push(provider)
            }
        });
        return res.json({
            data: dataUnify,
            fails: fails.trim(),
        });
    });
}

const getAllProvidersChargesCxp = (req, res) => {
    const all = Promise.allSettled([
        firebirdQuerys.getProvidersChargesCxp('G32'),
        firebirdQuerys.getProvidersChargesCxp('AC'),
        firebirdQuerys.getProvidersChargesCxp('COLIMA'),
        firebirdQuerys.getProvidersChargesCxp('VILLA'),
        firebirdQuerys.getProvidersChargesCxp('COLINAS'),
        firebirdQuerys.getProvidersChargesCxp('TURCIO'),
        firebirdQuerys.getProvidersChargesCxp('PAEZ'),
        firebirdQuerys.getProvidersChargesCxp('CHAVEZC'),
    ]).then((values) => {

        let data = [];
        let fails = ''
        let emptys = ''
        values.forEach(element => {

            if (element.status !== 'rejected') {
                data = [...data, ...element.value.charges]
                if (element.value.charges.length === 0) {
                    emptys = emptys + ' ' + element.value.connection
                }
            } else {
                fails = fails + ' ' + element.reason.connection;
            }
        });
        return res.json({
            data,
            fails: fails.trim(),
            emptys: emptys.trim()
        });
    });
}

const getAllProvidersChargesCxpDate = (req, res) => {
    const date = req.params.date
    const all = Promise.allSettled([
        firebirdQuerys.getProvidersChargesCxpDate('G32',date),
        firebirdQuerys.getProvidersChargesCxpDate('AC',date),
        firebirdQuerys.getProvidersChargesCxpDate('COLIMA',date),
        firebirdQuerys.getProvidersChargesCxpDate('VILLA',date),
        firebirdQuerys.getProvidersChargesCxpDate('COLINAS',date),
        firebirdQuerys.getProvidersChargesCxpDate('TURCIO',date),
        firebirdQuerys.getProvidersChargesCxpDate('PAEZ',date),
        firebirdQuerys.getProvidersChargesCxpDate('CHAVEZC',date),
    ]).then((values) => {

        let data = [];
        let fails = ''
        let emptys = ''
        values.forEach(element => {

            if (element.status !== 'rejected') {
                data = [...data, ...element.value.charges]
                if (element.value.charges.length === 0) {
                    emptys = emptys + ' ' + element.value.connection
                }
            } else {
                fails = fails + ' ' + element.reason.connection;
            }
        });
        return res.json({
            data,
            fails: fails.trim(),
            emptys: emptys.trim()
        });
    });
}

const getAllProvidersChargesCxpHis = (req, res) => {
    const all = Promise.allSettled([
        firebirdQuerys.getProvidersChargesCxpHis('G32'),
        firebirdQuerys.getProvidersChargesCxpHis('AC'),
        firebirdQuerys.getProvidersChargesCxpHis('ACH'),
        firebirdQuerys.getProvidersChargesCxpHis('COLIMA'),
        firebirdQuerys.getProvidersChargesCxpHis('VILLA'),
        firebirdQuerys.getProvidersChargesCxpHis('COLINAS'),
        firebirdQuerys.getProvidersChargesCxpHis('TURCIO'),
        firebirdQuerys.getProvidersChargesCxpHis('PAEZ'),
        firebirdQuerys.getProvidersChargesCxpHis('CHAVEZC'),
    ]).then((values) => {

        let data = [];
        let fails = ''
        let emptys = ''
        values.forEach(element => {

            if (element.status !== 'rejected') {
                data = [...data, ...element.value.charges]
                if (element.value.charges.length === 0) {
                    emptys = emptys + ' ' + element.value.connection
                }
            } else {
                fails = fails + ' ' + element.reason.connection;
            }
        });
        return res.json({
            data,
            fails: fails.trim(),
            emptys: emptys.trim()
        });
    });
}

const getAllProvidersChargesCxpSap = (req, res) => {
    const all = Promise.allSettled([
        // firebirdQuerys.getProvidersChargesCxpSap('G32'),
        firebirdQuerys.getProvidersChargesCxpSap('AC'),
        // firebirdQuerys.getProvidersChargesCxpSap('COLIMA'),
        // firebirdQuerys.getProvidersChargesCxpSap('VILLA'),
        // firebirdQuerys.getProvidersChargesCxpSap('COLINAS'),
        // firebirdQuerys.getProvidersChargesCxpSap('TURCIO'),
        // firebirdQuerys.getProvidersChargesCxpSap('PAEZ'),
        // firebirdQuerys.getProvidersChargesCxpSap('CHAVEZC'),
    ]).then((values) => {

        let data = [];
        let fails = ''
        let emptys = ''
        values.forEach(element => {

            if (element.status !== 'rejected') {
                data = [...data, ...element.value.charges]
                if (element.value.charges.length === 0) {
                    emptys = emptys + ' ' + element.value.connection
                }
            } else {
                fails = fails + ' ' + element.reason.connection;
            }
        });
        return res.json({
            data,
            fails: fails.trim(),
            emptys: emptys.trim()
        });
    });
}

const getCustomersBalances = (req = request, res = response) => {
    const date = req.params.date
    const all = Promise.all([
        firebirdQuerys.getCustomersBalances2('AC', date),
        firebirdQuerys.getCustomersBalances2('G32', date),
        firebirdQuerys.getCustomersBalances2('CHAVEZC', date),
        firebirdQuerys.getCustomersBalances2('TURCIO', date),
        firebirdQuerys.getCustomersBalances2('TURCIOM', date),
        firebirdQuerys.getCustomersBalances2('PAEZ', date),
        firebirdQuerys.getCustomersBalances2('COLIMA', date),
        firebirdQuerys.getCustomersBalances2('VILLA', date),
        firebirdQuerys.getCustomersBalances2('COLINAS', date),

    ]).then(cargosPorSucursal => {
        let cargos = [];
        const s = cargosPorSucursal.forEach(cargoXC => {
            cargos = [...cargos, ...cargoXC]
        })
        return res.json({
            CustomersBalances: cargos
        });
    })
}

const getCustomersBalancesHis = (req = request, res = response) => {
    const date = req.params.date
    const all = Promise.all([
        firebirdQuerys.getCustomersBalancesHis('AC', date),
        firebirdQuerys.getCustomersBalancesHis('ACH', date),
        firebirdQuerys.getCustomersBalancesHis('G32', date),
        firebirdQuerys.getCustomersBalancesHis('G32H', date),
        firebirdQuerys.getCustomersBalancesHis('CHAVEZC', date),
        firebirdQuerys.getCustomersBalancesHis('TURCIO', date),
        firebirdQuerys.getCustomersBalancesHis('PAEZ', date),
        firebirdQuerys.getCustomersBalancesHis('COLIMA', date),
        firebirdQuerys.getCustomersBalancesHis('VILLA', date),
        firebirdQuerys.getCustomersBalancesHis('COLINAS', date),

    ]).then(cargosPorSucursal => {
        let cargos = [];
        const s = cargosPorSucursal.forEach(cargoXC => {
            cargos = [...cargos, ...cargoXC]
        })
        return res.json({
            CustomersBalances: cargos
        });
    })
}

const obtenerPagos = (req = request, res = response) => {
    console.log('Entro');
    
    const date = req.params.date
    const all = Promise.all([
        firebirdQuerys.obtenerPagos('AC', date),
        firebirdQuerys.obtenerPagos('G32', date),
        firebirdQuerys.obtenerPagos('CHAVEZC', date),
        firebirdQuerys.obtenerPagos('TURCIO', date),
        firebirdQuerys.obtenerPagos('TURCIOM', date),
        firebirdQuerys.obtenerPagos('PAEZ', date),
        firebirdQuerys.obtenerPagos('COLIMA', date),
        firebirdQuerys.obtenerPagos('VILLA', date),
        firebirdQuerys.obtenerPagos('COLINAS', date),

    ]).then(cargosPorSucursal => {
        let cargos = [];
        const s = cargosPorSucursal.forEach(cargoXC => {
            cargos = [...cargos, ...cargoXC]
        })
        return res.json({
            CustomersBalances: cargos
        });
    })
        .catch(error => {
            return res.status(500).json({
                error
            });
        })
}

const obtenerDoctosVe = (req = request, res = response) => {
    const date = req.params.date
    const all = Promise.all([
        firebirdQuerys.obtenerDoctosVe('AC', date),
        firebirdQuerys.obtenerDoctosVe('G32', date),
        firebirdQuerys.obtenerDoctosVe('CHAVEZC', date),
        firebirdQuerys.obtenerDoctosVe('TURCIO', date),
        firebirdQuerys.obtenerDoctosVe('TURCIOM', date),
        firebirdQuerys.obtenerDoctosVe('PAEZ', date),
        firebirdQuerys.obtenerDoctosVe('COLIMA', date),
        firebirdQuerys.obtenerDoctosVe('VILLA', date),
        firebirdQuerys.obtenerDoctosVe('COLINAS', date),
        firebirdQuerys.obtenerDoctosVe('ESTACIONAMIENTO', date),
    ]).then(doctosPorSucursal => {
        let doctos = [];
        const s = doctosPorSucursal.forEach(docto => {
            doctos = [...doctos, ...docto]
        })
        return res.json({
            doctosVe: doctos
        });
    })
        .catch(error => {
            return res.status(500).json({
                error
            });
        })
}

const obtenerDoctosPagos = (req = request, res = response) => {
    const {fecha, fechaFin} = req.params
    console.log(formatDateToString(fecha),formatDateToString(fecha))
    const all = Promise.all([
        firebirdQuerys.obtenerDoctosPagos('AC',fecha,fechaFin),
        // firebirdQuerys.obtenerDoctosPagos('G32', date),
        // firebirdQuerys.obtenerDoctosPagos('CHAVEZC', date),
        // firebirdQuerys.obtenerDoctosPagos('TURCIO', date),
        // firebirdQuerys.obtenerDoctosPagos('PAEZ', date),
        // firebirdQuerys.obtenerDoctosPagos('COLIMA', date),
        // firebirdQuerys.obtenerDoctosPagos('VILLA', date),
        // firebirdQuerys.obtenerDoctosPagos('COLINAS', date),

    ]).then(doctosPorSucursal => {
        let doctos = [];
        const s = doctosPorSucursal.forEach(docto => {
            doctos = [...doctos, ...docto]
        })
        return res.json({
            cargos_clientes: doctos
        });
    })
        .catch(error => {
            return res.status(500).json({
                error
            });
        })
}

const obtenerDoctosVeDet = (req = request, res = response) => {
    const date = req.params.date
    const all = Promise.all([
        firebirdQuerys.obtenerDoctosVeDet('AC', date),
        firebirdQuerys.obtenerDoctosVeDet('G32', date),
        firebirdQuerys.obtenerDoctosVeDet('CHAVEZC', date),
        firebirdQuerys.obtenerDoctosVeDet('TURCIO', date),
        firebirdQuerys.obtenerDoctosVeDet('PAEZ', date),
        firebirdQuerys.obtenerDoctosVeDet('COLIMA', date),
        firebirdQuerys.obtenerDoctosVeDet('VILLA', date),
        firebirdQuerys.obtenerDoctosVeDet('COLINAS', date),

    ]).then(doctosPorSucursal => {
        let doctos = [];
        const s = doctosPorSucursal.forEach(docto => {
            doctos = [...doctos, ...docto]
        })
        return res.json({
            doctosVe: doctos
        });
    })
        .catch(error => {
            return res.status(500).json({
                error
            });
        })
}

const obtenerDevoluciones = (req = request, res = response) => {
    const date = req.params.date
    const all = Promise.all([
        firebirdQuerys.obtenerDevoluciones('AC', date),
        firebirdQuerys.obtenerDevoluciones('G32', date),
        firebirdQuerys.obtenerDevoluciones('CHAVEZC', date),
        firebirdQuerys.obtenerDevoluciones('TURCIO', date),
        firebirdQuerys.obtenerDevoluciones('PAEZ', date),
        firebirdQuerys.obtenerDevoluciones('COLIMA', date),
        firebirdQuerys.obtenerDevoluciones('VILLA', date),
        firebirdQuerys.obtenerDevoluciones('COLINAS', date),

    ]).then(doctosPorSucursal => {
        let doctos = [];
        const s = doctosPorSucursal.forEach(docto => {
            doctos = [...doctos, ...docto]
        })
        return res.json({
            doctosVe: doctos
        });
    })
        .catch(error => {
            return res.status(500).json({
                error
            });
        })
}

const obtenerTicketsNoFacturados = (req = request, res = response) => {
    const fechaInicio = req.params.fechaInicio;
    const fechaFin = req.params.fechaFin;
    console.log(fechaInicio,fechaFin);
    
    const all = Promise.all([
        firebirdQuerys.obtenerTicketsNoFacturados('AC', fechaInicio, fechaFin),
        firebirdQuerys.obtenerTicketsNoFacturados('G32', fechaInicio, fechaFin),
        firebirdQuerys.obtenerTicketsNoFacturados('TURCIO', fechaInicio, fechaFin),
        firebirdQuerys.obtenerTicketsNoFacturados('TURCIOM', fechaInicio, fechaFin),
        firebirdQuerys.obtenerTicketsNoFacturados('PAEZ', fechaInicio, fechaFin),
        firebirdQuerys.obtenerTicketsNoFacturados('CHAVEZC', fechaInicio, fechaFin),
        firebirdQuerys.obtenerTicketsNoFacturados('COLIMA', fechaInicio, fechaFin),
        firebirdQuerys.obtenerTicketsNoFacturados('VILLA', fechaInicio, fechaFin),
        firebirdQuerys.obtenerTicketsNoFacturados('COLINAS', fechaInicio, fechaFin),

    ]).then(doctosPorSucursal => {
        let doctos = [];
        const s = doctosPorSucursal.forEach(docto => {
            doctos = [...doctos, ...docto]
        });
        console.log(doctos);
        
        return res.json({
            doctosVe: doctos
        });
    })
        .catch(error => {
            console.log(error);
            
            return res.status(500).json({
                error
            });
        })
}

const obtenerComplementos = (req = request, res = response) => {
    const {fechaInicial, fechaFinal} = req.params
    console.log(fechaInicial, fechaFinal);
    const all = Promise.all([
        firebirdQuerys.obtenerComplementos('AC', fechaInicial, fechaFinal),
        firebirdQuerys.obtenerComplementos('G32', fechaInicial, fechaFinal),
        firebirdQuerys.obtenerComplementos('CHAVEZC', fechaInicial, fechaFinal),
        firebirdQuerys.obtenerComplementos('TURCIO', fechaInicial, fechaFinal),
        firebirdQuerys.obtenerComplementos('PAEZ',fechaInicial, fechaFinal),
        firebirdQuerys.obtenerComplementos('COLIMA',fechaInicial, fechaFinal),
        firebirdQuerys.obtenerComplementos('VILLA',fechaInicial, fechaFinal),
        firebirdQuerys.obtenerComplementos('COLINAS',fechaInicial, fechaFinal),

    ]).then(doctosPorSucursal => {
        let doctos = [];
        const s = doctosPorSucursal.forEach(docto => {
            doctos = [...doctos, ...docto]
        })
        return res.json({
            doctosVe: doctos
        });
    })
        .catch(error => {
            return res.status(500).json({
                error
            });
        })
}

const obtenerComplementos2 = (req = request, res = response) => {
    const { fechaInicio, fechaFin } = req.params;
    const all = Promise.all([
        firebirdQuerys.obtenerComplementos2('AC', fechaInicio, fechaFin),
        firebirdQuerys.obtenerComplementos2('G32',fechaInicio, fechaFin),
        firebirdQuerys.obtenerComplementos2('CHAVEZC',fechaInicio, fechaFin),
        firebirdQuerys.obtenerComplementos2('TURCIO',fechaInicio, fechaFin),
        firebirdQuerys.obtenerComplementos2('PAEZ',fechaInicio, fechaFin),
        firebirdQuerys.obtenerComplementos2('COLIMA',fechaInicio, fechaFin),
        firebirdQuerys.obtenerComplementos2('VILLA',fechaInicio, fechaFin),
        firebirdQuerys.obtenerComplementos2('COLINAS',fechaInicio, fechaFin),

    ]).then(doctosPorSucursal => {
        let doctos = [];
        const s = doctosPorSucursal.forEach(docto => {
            doctos = [...doctos, ...docto]
        })
        return res.json({
            complementos: doctos
        });
    })
        .catch(error => {
            return res.status(500).json({
                error
            });
        })
}

const obtenerTotalesVenta = (req = request, res = response) => {
    const date = req.params.date
    const all = Promise.all([
        firebirdQuerys.obtenerTotalesVenta('COLIMA',),


    ]).then(doctosPorSucursal => {
        let doctos = [];
        const s = doctosPorSucursal.forEach(docto => {
            doctos = [...doctos, ...docto]
        })
        return res.json({
            doctosVe: doctos
        });
    })
        .catch(error => {
            return res.status(500).json({
                error
            });
        })
}


const obtenerCargosClientes = (req = request, res = response) => {
    const date = req.params.date
    const all = Promise.all([
        firebirdQuerys.getCustomersBalances2('AC', date),
        firebirdQuerys.getCustomersBalances2('G32', date),
        firebirdQuerys.getCustomersBalances2('CHAVEZC', date),
        // firebirdQuerys.getCustomersBalances2('TURCIO', date),
        firebirdQuerys.getCustomersBalances2('TURCIOM', date),
        firebirdQuerys.getCustomersBalances2('PAEZ', date),
        firebirdQuerys.getCustomersBalances2('COLIMA', date),
        firebirdQuerys.getCustomersBalances2('VILLA', date),
        firebirdQuerys.getCustomersBalances2('COLINAS', date),

    ]).then(cargosPorSucursal => {
        let cargos = [];
        const s = cargosPorSucursal.forEach(cargoXC => {
            cargos = [...cargos, ...cargoXC]
        })
        return res.json({
            CustomersBalances: cargos
        });
    })
}

const obtenerRemisiones = (req = request, res = response) => {
    const { fechaInicio, fechaFin } = req.params;
    const all = Promise.all([
        firebirdQuerys.obtenerRemisiones('AC', fechaInicio, fechaFin),
        firebirdQuerys.obtenerRemisiones('G32', fechaInicio, fechaFin),
        firebirdQuerys.obtenerRemisiones('CHAVEZC', fechaInicio, fechaFin),
        firebirdQuerys.obtenerRemisiones('TURCIO', fechaInicio, fechaFin),
        firebirdQuerys.obtenerRemisiones('TURCIOM', fechaInicio, fechaFin),
        firebirdQuerys.obtenerRemisiones('PAEZ', fechaInicio, fechaFin),
        firebirdQuerys.obtenerRemisiones('COLIMA', fechaInicio, fechaFin),
        firebirdQuerys.obtenerRemisiones('VILLA', fechaInicio, fechaFin),
        firebirdQuerys.obtenerRemisiones('COLINAS', fechaInicio, fechaFin),

    ]).then(cargosPorSucursal => {
        let cargos = [];
        const s = cargosPorSucursal.forEach(cargoXC => {
            cargos = [...cargos, ...cargoXC]
        })
        return res.json({
            CustomersBalances: cargos
        });
    })
}

const obtenerVentasPorImpuesto = (req = request, res = response) => {
    const { fechaInicio, fechaFin } = req.params;
    const all = Promise.all([
        firebirdQuerys.obtenerVentasPorImpuesto('AC'),
        firebirdQuerys.obtenerVentasPorImpuesto('G32'),
        firebirdQuerys.obtenerVentasPorImpuesto('CHAVEZC'),
        firebirdQuerys.obtenerVentasPorImpuesto('TURCIO'),
        firebirdQuerys.obtenerVentasPorImpuesto('TURCIOM'),
        firebirdQuerys.obtenerVentasPorImpuesto('PAEZ'),
        firebirdQuerys.obtenerVentasPorImpuesto('COLIMA'),
        firebirdQuerys.obtenerVentasPorImpuesto('VILLA'),
        firebirdQuerys.obtenerVentasPorImpuesto('COLINAS'),

    ]).then(cargosPorSucursal => {
        let cargos = [];
        const s = cargosPorSucursal.forEach(cargoXC => {
            cargos = [...cargos, ...cargoXC]
        })
        return res.json({
            CustomersBalances: cargos
        });
    })
}

const obtenerRecepciones = (req = request, res = response) => {
        const { fechaInicio, fechaFin } = req.params;
    const all = Promise.all([
    firebirdQuerys.obtenerRecepciones('AC', fechaInicio,fechaFin),
        firebirdQuerys.obtenerRecepciones('G32', fechaInicio,fechaFin),
        firebirdQuerys.obtenerRecepciones('CHAVEZC', fechaInicio,fechaFin),
        firebirdQuerys.obtenerRecepciones('TURCIO', fechaInicio,fechaFin),
        firebirdQuerys.obtenerRecepciones('TURCIOM', fechaInicio,fechaFin),
        firebirdQuerys.obtenerRecepciones('PAEZ', fechaInicio,fechaFin),
        firebirdQuerys.obtenerRecepciones('COLIMA', fechaInicio,fechaFin),
        firebirdQuerys.obtenerRecepciones('VILLA', fechaInicio,fechaFin),
        firebirdQuerys.obtenerRecepciones('COLINAS', fechaInicio,fechaFin),

    ]).then(cargosPorSucursal => {
        let cargos = [];
        const s = cargosPorSucursal.forEach(cargoXC => {
            cargos = [...cargos, ...cargoXC]
        })
        return res.json({
            CustomersBalances: cargos
        });
    })
}


const obtenerDevolucionesDet = (req = request, res = response) => {
    const fechaInicio = req.params.fechaInicio;
    const fechaFin = req.params.fechaFin;
    const all = Promise.all([
        // firebirdQuerys.obtenerDevolucionesDet('AC', fechaInicio, fechaFin),
        firebirdQuerys.obtenerDevolucionesDet('G32', fechaInicio, fechaFin),
        firebirdQuerys.obtenerDevolucionesDet('CHAVEZC', fechaInicio, fechaFin),
        firebirdQuerys.obtenerDevolucionesDet('TURCIO', fechaInicio, fechaFin),
        firebirdQuerys.obtenerDevolucionesDet('PAEZ', fechaInicio, fechaFin),
        firebirdQuerys.obtenerDevolucionesDet('COLIMA', fechaInicio, fechaFin),
        firebirdQuerys.obtenerDevolucionesDet('VILLA', fechaInicio, fechaFin),
        firebirdQuerys.obtenerDevolucionesDet('COLINAS', fechaInicio, fechaFin),

    ]).then(doctosPorSucursal => {
        let doctos = [];
        const s = doctosPorSucursal.forEach(docto => {
            doctos = [...doctos, ...docto]
        })
        return res.json({
            doctosVe: doctos
        });
    })
        .catch(error => {
            return res.status(500).json({
                error
            });
        });
}



module.exports = {
    getAllProvidersCharges,
    getSalesCalculateIeps,
    getCustomersCharges,
    getCustomersToSap,
    getProvidersToSap,
    getAllProvidersChargesCxp,
    getAllProvidersChargesCxpHis,
    getAllProvidersChargesCxpSap,
    getCustomersBalances,
    getCustomersBalancesHis,
    obtenerPagos,
    obtenerDoctosVe,
    obtenerDoctosPagos,
    obtenerDoctosVeDet,
    obtenerDevoluciones,
    obtenerTicketsNoFacturados,
    obtenerComplementos,
    obtenerComplementos2,
    obtenerTotalesVenta,
    getAllProvidersChargesCxpDate,
    obtenerCargosClientes,
    obtenerRemisiones,
    obtenerVentasPorImpuesto,
    obtenerRecepciones,
    obtenerDevolucionesDet,
}
