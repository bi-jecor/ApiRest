const {model, Schema} = require('mongoose');

const NurseryProviderSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    tel: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
});

module.exports = model('Provider',  NurseryProviderSchema);
