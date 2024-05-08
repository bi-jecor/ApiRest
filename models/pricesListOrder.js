const {Schema, model, Types } = require('mongoose');

const PricesListOrderSchema = Schema({
    name: {
        type: String,
    },

    date : {
        type: Date
    },
    items:[]


})

module.exports = model('Priceslistsorder', PricesListOrderSchema )