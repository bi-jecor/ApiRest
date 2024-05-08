const { Schema, model} = require('mongoose');

const RolesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    applications: [{
        type: String,
        required: true
    }],
    permissions: [{
        type: String,
        required: true
    }]
});

module.exports = model('Roles', RolesSchema);
