const SurveyQuestion = require('../models/surveyQuestions');

const createSurveyQuestion = async (req, res) => {
    try {
        const surveyQuestion = new SurveyQuestion({...req.body});
        const surveyQuestionDb = await surveyQuestion.save();

        return res.json({
            ok:true,
            surveyQuestion: surveyQuestionDb
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error to create surveys, check with your system Administrator',
            error
        });
    }
}

const getSurveyQuestions = async (req, res) => {
    try {
        const surveyQuestionsDb = await SurveyQuestion.find();
        return res.json({
            ok:true,
            surveyQuestions: surveyQuestionsDb
        });
        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Error to get survey questions, check with your system Administrator',
            error
        });
    }
}
const getSurveyQuestionsBySurveyId = async (req, res) => {
    try {
        const surveyId = req.params.surveyId;
        const surveyQuestionsDb = await SurveyQuestion.find({'survey' : surveyId });
        return res.json({
            ok:true,
            surveyQuestions: surveyQuestionsDb
        });
        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Error to get survey questions, check with your system Administrator',
            error
        });
    }
}

const getSurveyQuestion = async (req, res) => {
    const surveyQuestionId = req.params.surveyQuestionId;
    const surveyQuestion = {...req.body};
    try {
        const surveyQuestionDb = await SurveysQuestion.findOne({'_id': surveyQuestionId}, surveyQuestion, {new:true});
        return res.json({
            ok:true,
            surveyQuestion: surveyQuestionDb
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error to get survey questions, check with your system Administrator',
            error
        });
    }
}


module.exports = {
    createSurveyQuestion,
    getSurveyQuestions,
    getSurveyQuestionsBySurveyId,
    getSurveyQuestion
}