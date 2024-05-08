const { Schema, model} = require('mongoose');

const NurseryBranch = new Schema({
    name: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    }
});

module.exports = model('Nurserybranch', NurseryBranch)