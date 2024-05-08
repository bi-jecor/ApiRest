const { Schema, model } = require('mongoose');


const AppilcationSchema = Schema({
    active: {
        type: Boolean,
        default: true
    },
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
    img: {
        type: String,
    },

});

module.exports = model('Application', AppilcationSchema);