const { Schema, model } = require('mongoose');

const inventorySchema = new Schema({
    
    serie :{
        type: String,
        required: true
    },
    warehouseId: {
        type: String,
        required: true
    },

    warehouse: {
        type: String,
        required: true
    },
    elaborated : {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    items:[

    ],
    concept: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default : '1'
    },

    date: {
        type: Date
    }

});

module.exports = model('Inventory', inventorySchema);