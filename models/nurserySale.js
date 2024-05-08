const { Schema, model} = require('mongoose');



const NurserySaleSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    documSale: [{
        product: {
            type: Schema.Types.ObjectId, 
            ref: 'NurseryProduct'  
        },
        price: {
            type: Number,
            require: true
        },
        
        quantity: {
            type: Number,
            require: true
        },
        amount: {
            type: Number,
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

module.exports = model('NurserySale', NurserySaleSchema)
