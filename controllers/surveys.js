const Surveys = require('../models/surveys');

const createSurveys = async (req, res) => {
    console.log('BODY', req.body);
    try {
        const survey = new Surveys({...req.body});
        
        const surveyDB = await survey.save();
        res.json({
            ok: true,
            survey: surveyDB
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg: 'Consulte con su administrador de sistema',
            error
        });
    }
}

const getSurveys = async (req, res) => {
    try {
        const surveys = await Surveys.find();
        return res.json({
            ok: true,
            surveys
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error to get surveys, check with your system Administrator'
        });
    }
} 

const getSurvey = async (req, res) => {
    const surveyId = req.params.surveyId;
    try {
        const survey = await Surveys.findOne({ _id : surveyId });
        return res.json({
            ok: true,
            survey
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error to get surveys, check with your system Administrator'
        });
    }
} 

const updateSurvey = async (req, res) => {
    const survey = req.body;
    console.log(req.body);
    const surveyId = req.params.surveyId;
    try {
        const surveyDb = await Surveys.findOneAndUpdate({'_id' : surveyId}, survey, {new:true});
        return res.json({
            ok: true,
            surve: surveyDb
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error to update surveys, check with your system Administrator'
        });
    }
}

module.exports = {
    createSurveys,
    getSurveys,
    getSurvey,
    updateSurvey
}