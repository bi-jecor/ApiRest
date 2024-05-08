const { model, Schema } = require('mongoose');

const NurseryPurchaseSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    documPur: [{
        product: {
            type: Schema.Types.ObjectId, 
            ref: 'NurseryProduct'  
        },
        stock: {
            type: Number,
            default: 1,
            require: true
        }
    }],
    folio: {
        type: String,
        required: true
    },
    date: {
        type: String, 
        required: true
    }
});

module.exports = model('NurseryPurchase', NurseryPurchaseSchema)
