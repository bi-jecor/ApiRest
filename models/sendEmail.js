const { Schema, model } = require('mongoose');

const EmailSchema = Schema({
    shortDescription: {
        type: String,
        required: true,
    },
    urgencyLevel: {
        type: String,
        required: true,
    },
    departament: {
        type: String,
        required: true,
    },
    problemCategory: {
        type: String,
        required: true,
    }
});

module.exports = model('Email', EmailSchema)