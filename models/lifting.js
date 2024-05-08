const { Schema, model } = require('mongoose');

const liftingSchema = new Schema({

    concept: {
        type: String,
        required: true
    },
    
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

    status: {
        type: String,
        default : '1'
    },

    date: {
        type: Date,
        default : new Date()
    }

});

module.exports = model('Lifting', liftingSchema);