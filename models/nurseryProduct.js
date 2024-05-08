const {Schema, model} = require('mongoose');

const NurseryProductSchema = new Schema({

    name: {
        type: String,
        require: true,
        unique: true
    },

    code: {
        type: String,
        required: true,
        unique: true
    },

    price: {
        type: Number,
        required: true
    }
});

module.exports = model('NurseryProduct', NurseryProductSchema);