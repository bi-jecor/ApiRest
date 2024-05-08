const {Schema, model} = require('mongoose');

const SurveySchema = Schema({
    name: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    departament: {
        type: String,
        required: true
        
    },

    rangeMin: {
        type: Number,
        default : 1,
        required: false
    },

    rangeMax: {
        type: Number,
        required: false
    },

    active: {
        type: Boolean,
        required: true
    },

    tags : {
        type: [],
        required: true
    },

    answerTemplate: {
        type: [],
        default : 1,
        required: false
    },
});

module.exports = model('Survey', SurveySchema);
