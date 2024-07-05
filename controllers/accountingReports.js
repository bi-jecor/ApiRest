const {response, request, json} = require('express');
var firebird = require('node-firebird');
const conections =  require('../database/connections');
const firebirdQuerys = require('../helpers/firebirdQuerys');


const accountingReports = require('../helpers/accountingReports')

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
        let fails =  ''
        let emptys =  ''
        values.forEach(element => {
            console.log(element);
            if (element.status !== 'rejected') {
                data = [...data, ...element.value.charges]
                if(element.value.charges.length === 0){
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

const getSalesCalculateIeps = (req, res=response) => {
    const date1 = req.params.date1;
    const date2 = req.params.date2;
     const all = Promise.allSettled([
        // firebirdQuerys.getSalesCalculateIeps('G32H', date1, date2), 
        firebirdQuerys.getSalesCalculateIeps('G32', date1, date2), 
        firebirdQuerys.getSalesCalculateIeps('AC',  date1, date2),
        firebirdQuerys.getSalesCalculateIeps('PAEZ',  date1, date2),
        firebirdQuerys.getSalesCalculateIeps('TURCIO',  date1, date2),
        firebirdQuerys.getSalesCalculateIeps('COLIMA',  date1, date2),
        firebirdQuerys.getSalesCalculateIeps('COLIMAH',  date1, date2),
        firebirdQuerys.getSalesCalculateIeps('VILLA',  date1, date2),
        firebirdQuerys.getSalesCalculateIeps('VILLAH',  date1, date2),
        firebirdQuerys.getSalesCalculateIeps('COLINAS',  date1, date2),
        firebirdQuerys.getSalesCalculateIeps('TIANGUIS',  date1, date2),

     ]).then( (values) => {
        let data = [];
        let fails =  ''
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

const getCustomersCharges = (req, res=response) => {
    const all = Promise.allSettled([
       firebirdQuerys.getCustomersCharges('G32'), 
       // firebirdQuerys.getCustomersCharges('AC'), 

    ]).then( (values) => {
       let data = [];
       let dataUnify = [];
       let fails =  ''
       console.log('data',data);
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

const getCustomersToSap = (req, res=response) => {
    const all = Promise.allSettled([
       firebirdQuerys.getCustomersToSap('G32'), 
       firebirdQuerys.getCustomersToSap('AC'), 
       firebirdQuerys.getCustomersToSap('COLIMA'), 
       firebirdQuerys.getCustomersToSap('VILLA'), 
       firebirdQuerys.getCustomersToSap('COLINAS'), 
       firebirdQuerys.getCustomersToSap('TURCIO'), 
       firebirdQuerys.getCustomersToSap('PAEZ'), 
    ]).then( (values) => {
       let data = [];
       let dataUnify = [];
       let fails =  ''
       values.forEach(element => {
           if (element.status !== 'rejected') {
               data = [...data, ...element.value]
           } else {
               console.log(element);
              fails = fails + ' ' + element.reason.connection;
           }
       });

       data.forEach(customer => {
           const exist = dataUnify.find( item => item.name === customer.name && item.rfc === customer.rfc );

           if (exist === undefined) {
               dataUnify.push(customer)
           }
       })
       return res.json({
           data: dataUnify,
           fails: fails.trim(),
       });
    });
}

const getProvidersToSap = (req, res=response) => {
    const all = Promise.allSettled([
       firebirdQuerys.getProvidersToSap('AC'),
       firebirdQuerys.getProvidersToSap('G32'), 
       firebirdQuerys.getProvidersToSap('COLIMA'), 
       firebirdQuerys.getProvidersToSap('VILLA'), 
       firebirdQuerys.getProvidersToSap('COLINAS'), 
       firebirdQuerys.getProvidersToSap('TURCIO'), 
       // firebirdQuerys.getProvidersToSap('PAEZ'),
    ]).then( (values) => {
       console.log(values);
       let data = [];
       let dataUnify = [];
       let fails =  ''
       values.forEach(element => {
           if (element.status !== 'rejected') {
               data = [...data, ...element.value]
           } else {
               console.log(element);
              fails = fails + ' ' + element.reason.connection;
           }
       });
       data.forEach(provider => {
           const exist = dataUnify.find( item => item.cardName === provider.cardName);
           if (exist === undefined) {
               dataUnify.push(provider)
           }
       });
       return res.json({
           data : dataUnify,
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
        let fails =  ''
        let emptys =  ''
        values.forEach(element => {
            
            if (element.status !== 'rejected') {
                data = [...data, ...element.value.charges]
                if(element.value.charges.length === 0){
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

module.exports = { 
    getAllProvidersCharges,
    getSalesCalculateIeps,
    getCustomersCharges,
    getCustomersToSap,
    getProvidersToSap,
    getAllProvidersChargesCxp
}
