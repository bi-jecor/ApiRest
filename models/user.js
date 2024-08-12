const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    microsip: {
        type: String
    },
    email: {
        type:String
    },
    img: {
        type: String,
    },
    user: {
        type: String
    },
    active: {
         type: Boolean,
         default: true
    },
    nss: {
        type: String
    },

    numberNom: {
        type: String
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Roles',
    },
    store: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
    },
    departament: [{
        type: Schema.Types.ObjectId,
        ref: 'Departments',
    }],
    // departament: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Departments',
    // },
    email: {
        type: String,
    },
    superUser: {
        type: Boolean,
        default: false,        
    },
    settings: {
        type: Object,
        default: null
    },
    applications: [{
        type: Schema.Types.ObjectId,
        ref: 'Application',
    }],
    permissions: [{
        type: Schema.Types.ObjectId,
        ref: 'Permission',
    }],
});
module.exports = model('User', UserSchema);
