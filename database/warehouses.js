var firebird = require('node-firebird');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const fir_password = process.env.FIR_PASSWORD

const almacenPrueba = {
    // CONFIG
    brancheId : 848194,
    customerCode : '1122',
    customerId : 5580,
    addrCustomerId : 5581,
    addrConsigneeId : 5581,
    warehouseId : 181614,
    condPayment : 179027,
    sellerId : 678138,
    wayShipment : 179011,

    provId : 2132123,
    provFolio : '000000125',
    provKey : null,
}


module.exports = {
    almacenPrueba
};