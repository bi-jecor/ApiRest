const { Schema, model } = require('mongoose');

const ReportSchema = Schema({
    urgencyLevel: {
        type: Number,
        required: true,
    },

    category: {
        type: String,
    },

    problemCategory: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },
    
    departament: {
        type: Schema.Types.ObjectId, 
        ref: 'Departments'
    },

    state: {
        type: Number,
        required: true,
    },

    creator: { 
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },

    departamentOrigin: {
        type: Schema.Types.ObjectId, 
        ref: 'Departments'
    },

    time: {
        type: Date,
        required: true,
    },

    startTime:     {
        type: Date,
    },

    assigned: { 
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },

    endTime:     {
        type: Date,
    },
    
    cancel: { 
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },

    cancelTime:     {
        type: Date,
    },

    answer: {
        type: String
    },
    
    answerFace: {
        type: Number
    },

    authorized: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },

    answerTime: {
        type: Number
    },
    collaborates: [{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }],
    file: {
        type: String
    },
    fileDescription: {
        type: String
    },
    evidences: {
        
    },
    extra: {
        type: String,
        default: null,
        required: false,
    }
},{
    timestamps: true
});

module.exports = model('Report', ReportSchema)