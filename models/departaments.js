const { Schema, model} = require('mongoose');

const DepartmentsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    }
});

module.exports = model('Departments', DepartmentsSchema);
