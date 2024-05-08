const { Schema, model } = require('mongoose');

const NurseryCatalogSchema = new Schema({
    
    branch: {
        type: Schema.Types.ObjectId,
        ref: 'Nurserybranch',
        required: true
     },

    name :{
        type: String,
        required: true
    },

    products:[{
        product: {
            type: Schema.Types.ObjectId, 
            ref: 'NurseryProduct'  
        },
        stock: {
            type: Number,
            default: 0,
            require: true
        }
    }]
});

module.exports = model('NurseryCatalog', NurseryCatalogSchema);