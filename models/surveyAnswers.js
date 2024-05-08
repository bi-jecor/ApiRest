const {Schema, model} = require('mongoose');

const SurveyAnswersSchema = Schema({
    answer: {
        type: String,
        required: true
    },

    survey: {
        type: Schema.Types.ObjectId,
        ref: 'Survey'
    },
    surveyQuestion: {
        type: Schema.Types.ObjectId,
        ref: 'SurveyQuestion'
    },

    departament: {
        type: String,
        required: false
    },

    gender: {
        type: String,
        required: false
    },

    age: {
        type: String,
        required: false
    },

    seniority: {
        type: String,
        required: false
    },
    warehouse : {
        type: String,
        required: false
    }

});

module.exports = model('SurveyAnswer', SurveyAnswersSchema);
