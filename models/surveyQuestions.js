const {Schema, model} = require('mongoose');

const SurveyQuestionSchema = Schema({
    question: {
        type: String,
        required: true
    },

    survey: {
        type: Schema.Types.ObjectId,
        ref: 'Survey'
    },

    asnwerTemplate: {
        type: [],
        default : 1,
        required: true
    },

    order: {
        type: String,
        required: false
    },

    tag : {
        type : String,
        required : true
    }
});

module.exports = model('SurveyQuestion', SurveyQuestionSchema);
