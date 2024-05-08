const {Schema, model } = require('mongoose');

const AisleOrderSchema = Schema({
    name: {
        type: String,
    },
    
    warehouse : {
        type: String
    },

    list : {
        type: Array
    },

    date : {
        type: Date
    },

    status : {
        type: String,
    }, 

    user : {
        type : String
    },

    userAssigned : {
        type : String
    },

    lastModificationDate : {
        type: Date
    }

});

module.exports = model('AisleOrder', AisleOrderSchema )