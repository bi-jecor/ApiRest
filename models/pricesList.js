const {Schema, model, Types } = require('mongoose');

const PricesListSchema = Schema({
    name: {
        type: String,
    },
    market: {
        type: String,
    },
    
    date : {
        type: Date
    },

    order : {
        type: Schema.Types.ObjectId, 
        ref: 'Priceslistsorder'
    },

    userAsssigned : {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },

    status: {
        type: String,
        default : '1'
    },

    items:[]
})

module.exports = model('Priceslist', PricesListSchema )