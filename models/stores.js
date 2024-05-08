const { Schema, model} = require('mongoose');

const StoreSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    addres: {
        type: String,
    },
    state: {
        type: String,
    },
    description: {
        type: String,
    }
});

module.exports = model('Store', StoreSchema);
