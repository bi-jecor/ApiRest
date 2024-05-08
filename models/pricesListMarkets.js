const {Schema, model} = require('mongoose');

const PricesListMarketSchema = Schema({
    name: {
        type: String,
    }
})

module.exports = model('PricesListMarket', PricesListMarketSchema )