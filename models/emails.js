const { Schema, model } = require('mongoose');

const EmailSchema = Schema({

    departament: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required: true,
    },
    
    message: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        required: true,
    },

    emails : {
        type : [Array],
        default : [],
        required : true
    },
    
    startDate : {
        type : String,
        required : true
    },

    link : {
        type : String,
        required : false
    },

    type : {
        type : String,
        required : true
    }
    
});

module.exports = model('Email', EmailSchema)