const { Schema, model } = require('mongoose');

const PermissionSchema = new Schema({
    active: {
        type: Boolean,
        default: true
    },
    name: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    application: {
        type: Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    },
    extras: {
        type: Array
    }
});

module.exports = model('Permission', PermissionSchema);
