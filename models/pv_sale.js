const { Schema, model } = require('mongoose');

const PVSaleSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    userMicrosip : {
        type : String,
        required : true
    },

    serie: {
        type: String, 
        required : true
    },

    detail: [{}],

    warehouse: {
        type: String
    },

    total: {
        type: Number,
        required: true
    },
    
    date: {
        type: Date,
        required : true
    },

    isInvoice : {
        type : Boolean,
        required : true
    },

    // isSale : {
    //     type : Boolean,
    //     required : true
    // },

    description : {
        type : String,
        required : false
    }

});

module.exports =  model('PVSales', PVSaleSchema);